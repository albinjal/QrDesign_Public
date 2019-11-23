// Imports
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const request = require("request");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const nodemailer = require("nodemailer");

// ------------------------------------------------------------------------------------------------------
//File Constants:

const auther = functions.config().klarna.auth;
// const auther = functions.config().klarnaplayground.auth;
const taxrate = 2500;
const endpoint = "https://api.klarna.com/";
// "https://api.playground.klarna.com/";
// "https://api.klarna.com/";

const compname = "QrDesign";
const purchcountry = "SE";
const currency = "sek";
const language = "sv-se";
const urls = {
  terms: "https://qrdesign.se/info/legalt",
  checkout: "https://qrdesign.se/kassa",
  confirmation: "https://qrdesign.se/kassa/konfirmation/{checkout.order.id}",
  push:
    "https://us-central1-artshop-b3081.cloudfunctions.net/push/?id={checkout.order.id}"
};
//TODO: Update the urls when needed
const destination = ["jaldevik@qrdesign.se", "janzen@qrdesign.se"];
let transporter = nodemailer.createTransport({
  service: "one",
  auth: {
      user: functions.config().mail.mail,
      pass: functions.config().mail.pass
  }
});

// ------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------

// Functions:

const calcDeliveryCost = items => {
    let cost = items.some(item => item.type === "canvas") ? 103.2 : 63.2;
  return cost;
};

const checkUser = async uid => {
  const value = await db
    .collection("Orders")
    .doc(uid)
    .get();

  if (value.data() === null) {
    return false;
  } else {
    return value.data();
  }
};

// ------------------------------------------------------------------------------------------------------

function getdonewithid(id) {
  return new Promise((resolve, reject) => {
    const headers = {
      Authorization: auther
    };
    let options = {
      url: endpoint + "ordermanagement/v1/orders/" + id,
      method: "Get",
      headers: headers
    };
    // /Start the request

    request(options, (error, response, body) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(JSON.parse(body));
      }
    });
  });
}

// ------------------------------------------------------------------------------------------------------

async function createInternalOrder(klarna) {
  const id = klarna["order_id"];
  return new Promise(async (resolve, reject) => {
    return db
      .collection("Orders")
      .where("klarnaid", "==", id)
      .get()
      .then(async doc => {
        if (doc.size !== 1) {
          return null;
        }
        data = doc.docs[0].data();
        const internalorder = {
          created: admin.firestore.Timestamp.fromMillis(Date.now()),
          uid: data.uid,
          klarnaid: id,
          missingQR: data.orderdata.some(item => item.pickLater),
          finalklarna: klarna,
          orders: data.orderdata,
          handled: false,
          delivered: false
        };
        await db
          .collection("CompletedOrders")
          .doc(id)
          .set(internalorder);
        return data;
      })
      .then(data => {
        if (data) {
          db.collection("Orders")
            .doc(data.uid)
            .delete();
          console.log("order created");
          return resolve("order created");
        }
        return reject("Cant find Order in order collecton");
      })
      .catch(reason => reject(console.log(reason)));
  });
}

// ------------------------------------------------------------------------------------------------------

function clenseUserData(user) {
  const prods = [];
  user.cart.forEach(item => {
    prods.push({
      color: item["color"],
      prodID: item["prodID"],
      prodimg: item["prodimg"],
      prodname: item["prodname"],
      qr_code: item["qr_code"],
      quantity: item["quantity"],
      size: item["size"],
      type: item["type"],
      qrType: item.qrType,
      pickLater: item.pickLater
    });
  });
  return {
    products: prods,
    discountCode: user.discountCode
  };
}

// ------------------------------------------------------------------------------------------------------
const gatherOrderData = async user => {
  // Returns a Promise<List<Object>> where Object is a merge between a clients order and the product document
  const gatherProducts = async clientprodlist => {
    let references = [];
    clientprodlist.forEach(value => {
      references.push(db.collection("Products").doc(value["prodID"]));
    });
    // Get data from firestore
    return db.getAll(...references).then(results => {
      // Data collected, time to format:
      const completeData = [];
      //Merge all collected data
      results.forEach(proddoc => {
        const clientProd = clientprodlist.find(element => {
          return element["prodID"] === proddoc.id;
        });
        completeData.push({ ...clientProd, ...proddoc.data() });
      });
      return completeData;
    });
  };

  const proms = [];
  proms.push(
    ...[
      gatherProducts(user.products),
      checkDiscountCode(user.discountCode, false),
      calcDeliveryCost(user.products)
    ]
  );
  const data = await Promise.all(proms);

  return {
    products: data[0],
    discount: data[1],
    deliveryCost: Math.round(data[2] * 1.25)
  };
};

// ------------------------------------------------------------------------------------------------------

async function createKlarnaObject(user) {
  // should be array
  completeData = await gatherOrderData(user);
  // Reformat to klarna format
  const orderlines = [];

  let orderamount = 0;
  let ordertax = 0;
  completeData.products.forEach(product => {
    const brutprice =
      product["types"][product["type"]]["dimensions"][product["size"]]["price"];
    const unitprice = Math.round((brutprice * taxrate) / 10000 + brutprice);
    const totalDiscount = unitprice * product.quantity * completeData.discount;
    const totalamount = unitprice * product.quantity - totalDiscount;
    const totalTax = totalamount - (totalamount * 10000) / (10000 + taxrate);
    orderlines.push({
      type: "physical",
      reference: `${product.size}:${product.type}:${product.prodID}`,
      name: `${product.size} ${product.name} ${product.type}`,
      quantity: product.quantity,
      total_discount_amount: totalDiscount,
      quantity_unit: "pcs",
      unit_price: unitprice,
      tax_rate: taxrate,
      total_amount: totalamount,
      total_tax_amount: totalTax,
      product_url: `https://qrdesign.se/butik/produkt-detaljer/${product.prodID}/${product.type}`,
      image_url: product.prodimg
    });
    orderamount += totalamount;
    ordertax += totalTax;
  });

  // Delivery
  const deliveryCost = completeData.deliveryCost * 100;
  orderlines.push({
    type: "shipping_fee",
    name: "Frakt",
    quantity: 1,
    unit_price: deliveryCost,
    tax_rate: taxrate,
    total_amount: deliveryCost,
    total_tax_amount: deliveryCost * 0.2
  });
  orderamount += deliveryCost;
  ordertax += deliveryCost * 0.2;

  // Final
  return {
    name: compname,
    purchase_country: purchcountry,
    purchase_currency: currency,
    locale: language,
    order_amount: orderamount,
    order_tax_amount: ordertax,
    order_lines: orderlines,
    merchant_urls: urls
  };
}

// ------------------------------------------------------------------------------------------------------

function sendNewToKlararna(klarnaobj) {
  // Post to klarna
  const headers = {
    Authorization: auther,
    "Content-Type": "application/json"
  };
  let options = {
    url: endpoint + "checkout/v3/orders",
    method: "POST",
    headers: headers,
    body: JSON.stringify(klarnaobj)
  };
  ///Start the request
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      const answ = JSON.parse(body);

      if (!error) {
        return resolve(answ);
      } else {
        return reject(error);
      }
    });
  });
}

// ------------------------------------------------------------------------------------------------------

async function updateFB(klarnaobj, user, uid) {
  if (user) {
    return db
      .collection("Orders")
      .doc(user.uid)
      .set({
        latestklarna: klarnaobj,
        uid: user.uid,
        orderdata: user.products,
        klarnaid: klarnaobj["order_id"],
        created: admin.firestore.Timestamp.fromMillis(Date.now())
      });
  } else {
    return db
      .collection("Orders")
      .doc(uid)
      .update({
        latestklarna: klarnaobj,
        klarnaid: klarnaobj["order_id"],
        created: admin.firestore.Timestamp.fromMillis(Date.now())
      });
  }
}

// ------------------------------------------------------------------------------------------------------

function getpending(id) {
  return new Promise((resolve, reject) => {
    const headers = {
      Authorization: auther
    };
    let options = {
      url: endpoint + "checkout/v3/orders/" + id,
      method: "Get",
      headers: headers
    };
    // /Start the request

    request(options, (error, response, body) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(JSON.parse(body));
      }
    });
  });
}

// ------------------------------------------------------------------------------------------------------

function setpending(klarnaobj, klarnaid) {
  const headers = {
    Authorization: auther,
    "Content-Type": "application/json"
  };
  let options = {
    url: endpoint + "checkout/v3/orders/" + klarnaid,
    method: "POST",
    headers: headers,
    body: JSON.stringify(klarnaobj)
  };
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (body) {
        const answ = JSON.parse(body);
        if (!error) {
          return resolve(answ);
        } else {
          return reject(error);
        }
      } else {
        return resolve(sendNewToKlararna(klarnaobj));
      }
    });
  });
}
// ------------------------------------------------------------------------------------------------------
async function checkDiscountCode(code, used) {
  if (code) {
    const doc = await db
      .collection("discounts")
      .doc(code)
      .get();
    if (doc.exists) {
      doc.ref.update(
        used
          ? {
              checks: admin.firestore.FieldValue.increment(1),
              uses: admin.firestore.FieldValue.increment(1)
            }
          : {
              checks: admin.firestore.FieldValue.increment(1)
            }
      );
      return doc.get("discount");
    }
  }
  return 0;
}
// ------------------------------------------------------------------------------------------------------
const checkQrCode = async id => {
  const doc = await db
    .collection("WaitingOrders")
    .doc(id)
    .get();
  if (doc.exists) {
    const data = doc.data();
    return {
      firstName: data.finalklarna.billing_address.given_name,
      lastName: data.finalklarna.billing_address.family_name,
      orders: data.orders
    };
  }
  return null;
};
// ------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
// Cloud Functions:

exports.checkCode = functions.https.onCall((data, context) => {
  code = data.code;
  return checkDiscountCode(code, false);
});

// ------------------------------------------------------------------------------------------------------

exports.calcDelivery = functions.https.onCall((data, context) => {
  return calcDeliveryCost(data.items);
});

// ------------------------------------------------------------------------------------------------------

exports.push = functions.https.onRequest((req, resp) => {
  resp.set("Access-Control-Allow-Origin", endpoint);
  resp.set("Access-Control-Allow-Methods", "POST");
  const id = req.query.id;
  return getdonewithid(id)
    .then(klarnobj => createInternalOrder(klarnobj))
    .then(value => resp.status(200).send("Created"))
    .catch(reason => resp.status(500).send(reason));
});

// ------------------------------------------------------------------------------------------------------

exports.acknowledge = functions.firestore
  .document("CompletedOrders/{klarnaid}")
  .onCreate((snapshot, context) => {
    const headers = {
      Authorization: auther,
      "Content-Type": "application/json"
    };
    let options = {
      url:
        endpoint + "ordermanagement/v1/orders/" + snapshot.id + "/acknowledge",
      method: "POST",
      headers: headers
    };
    ///Start the request
    return request(options, (error, response, body) => {
      const mes_data = snapshot.data();
      const subj = "Ny Order!";
      const message = JSON.stringify(mes_data);
      const mailOptions = {
        from: "QrBot <botmail@qrdesign.se>",
        to: destination,
        subject: subj,
        html: message
      };

      return transporter.sendMail(mailOptions, (erro, info) => {
        if (erro) {
          return console.log(erro);
        }
        return console.log(info);
      });
    });
  });

// ------------------------------------------------------------------------------------------------------

exports.cleanOrders = functions.firestore
  .document("Orders/{cookieID}")
  .onCreate(async (snapshot, context) => {
    const currentDate = Date.now();
    const tooOld = currentDate - 1000 * 60 * 60 * 24 * 20;
    const tooOldTS = admin.firestore.Timestamp.fromMillis(tooOld);
    try {
      const value = await db
        .collection("Orders")
        .where("created", "<", tooOldTS)
        .get();
      return value.forEach(doc => doc.ref.delete());
    } catch (reason) {
      return console.log(reason);
    }
  });

// ------------------------------------------------------------------------------------------------------
/*
exports.cleanCookies = functions.firestore
  .document("Cookies/{cookieID}")
  .onCreate(async (snapshot, context) => {
    const currentDate = Date.now();
    const tooOld = currentDate - 1000 * 60 * 60 * 24 * 10;
    const tooOldTS = admin.firestore.Timestamp.fromMillis(tooOld);
    try {
      const value = await db
        .collection("Cookies")
        .where("created", "<", tooOldTS)
        .get();
      return value.forEach(doc => doc.ref.delete());
    }
    catch (reason) {
      return console.log(reason);
    }
  });
*/
// ------------------------------------------------------------------------------------------------------

exports.newOrder = functions.https.onCall((data, context) => {
  return new Promise((resolve, reject) => {
    let user = clenseUserData(data);
    user.uid = context.auth.uid;
    const proms = [];
    proms.push(createKlarnaObject(user));
    proms.push(checkUser(user.uid));
    Promise.all(proms)
      .then(values => {
        const klarnaobj = values[0];
        const ordercookie = values[1];
        return ordercookie
          ? setpending(klarnaobj, ordercookie["klarnaid"])
          : sendNewToKlararna(klarnaobj);
      })
      .then(klarnaresp => {
        updateFB(klarnaresp, user, user.uid);
        return resolve(klarnaresp["html_snippet"]);
      })
      .catch(reason => reject(console.log(reason)));
  });
});

// ------------------------------------------------------------------------------------------------------

// Used in confirmation
exports.getwithID = functions.https.onCall(async (data, context) => {
  const id = data.id;
  try {
    const pendingklarna = await getpending(id);
    if (pendingklarna["status"] === "checkout_complete") {
      getdonewithid(id)
        .then(klarnobj => createInternalOrder(klarnobj))
        .catch(reason_1 => console.log(reason_1));
      return pendingklarna["html_snippet"];
    } else {
      return null;
    }
  } catch (reason_2) {
    return console.log(reason_2);
  }
});

// ------------------------------------------------------------------------------------------------------

exports.mailquestion = functions.firestore
  .document("Messages/{messageID}")
  .onCreate((snapshot, context) => {
    const mes_data = snapshot.data();
    const subj = "Meddelande: " + mes_data["subject"];
    const message = JSON.stringify(mes_data);
    const mailOptions = {
      from: "QrBot <botmail@qrdesign.se>",
      to: destination,
      subject: subj,
      html: message
    };

    return transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        return console.log(erro);
      }
      return console.log(info);
    });
  });
// ------------------------------------------------------------------------------------------------------
