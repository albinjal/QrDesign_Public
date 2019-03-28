import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {FirestoreService} from './store.service';
import FieldValue = firebase.firestore.FieldValue;
import * as firebase from 'firebase/app';
import {Cart, CartItem} from './cart.model';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private cookie: CookieService, private storeservice: FirestoreService<any>) {
  }

  private cartpipe(cart: Cart) {
    cart.items = 0;
    cart.totalmomsprice = 0;
    cart.totalmoms = 0;
    cart.nomomsprice = 0;
    cart.numberofcanvas = 0;
    cart.numverofposter = 0;
    const cartItems = cart.cart;
    for (const item of cartItems) {
      cart.items = cart.items + item.quantity;
      item.nomomsprice = item.quantity * item.prodprice / 100;
      item.momsprice = item.quantity * item.prodprice * 1.25 / 100;
      item.singleprice = item.prodprice * 1.25 / 100;
      item.itemmoms = item.nomomsprice * 0.25;
      cart.totalmomsprice = cart.totalmomsprice + item.momsprice;
      cart.totalmoms = cart.totalmoms + item.itemmoms;
      cart.nomomsprice = cart.nomomsprice + item.nomomsprice;
      if (item.type === 'canvas') {
        cart.numberofcanvas = cart.numberofcanvas + item.quantity;
      } else {
        cart.numverofposter = cart.numverofposter + item.quantity;
      }
    }
    cart.delivery = 249 + cart.numberofcanvas * 100 + cart.numverofposter * 50;
    cart.deliverymoms = cart.delivery * 0.2;
    cart.deliverynet = cart.delivery * 0.8;
    cart.totalmomsprice = cart.totalmomsprice + cart.delivery;
    cart.totalmoms = Math.round(cart.totalmoms + cart.deliverymoms);
    cart.nomomsprice = Math.round(cart.nomomsprice + cart.deliverynet);
    return cart;
  }

  // Cookie inställningar krävs
  onSiteInit(): Promise<Observable<Cart>> {
    return new Promise((resolve, reject) => {
        if (!this.cookie.check('cartid')) {
          console.log('creating doc');
          this.storeservice.insert('Cookies', {created: FieldValue.serverTimestamp(), cart: []})
            .then(value => {
              console.log('creating cookie');
              this.cookie.set('cartid', value['id'], 2);
              resolve(this.storeservice.get('Cookies', value['id']).pipe(
                map((cart: Cart) => cart = this.cartpipe(cart))
              ));
            }).catch(reason => reason);
        } else {
          resolve(this.storeservice.get('Cookies', this.cookie.get('cartid')).pipe(
            map((cart: Cart) => cart = this.cartpipe(cart)
            )));
        }
      }
    );
  }

  currentCart(cartID: string): Observable<Cart> {
    return this.storeservice.get('Cookies', cartID).pipe(
      map((cart: Cart) => cart = this.cartpipe(cart)
      )
    );
  }

  removeitem(cartid: string, item: CartItem) {
    this.storeservice.update('Cookies', cartid, {
      cart: FieldValue.arrayRemove({
        'prodID': item.prodID, 'type': item.type, 'size': item.size,
        'color': item.color, 'quantity': item.quantity, 'qr_code': item.qr_code, 'prodimg': item.prodimg,
        'prodname': item.prodname, 'prodprice': item.prodprice, 'viewcolor': item.viewcolor,
        'viewdim': item.viewdim
      })
    });
  }

//    currentCompleteCart(): Observable<CompCart> {
//      return new Observable<CompCart>(subscriber => {
//        this.currentCart().subscribe(value => {
//          const latestcompcart = [];
//          for (const item of value.cart) {
//            this.storeservice.get('Products', item.prodID).toPromise().then((product: Product) => {
//              const imgpath = product.
//              const completecartitem = {
//                prodID: item.prodID,
//                type: item.type,
//                size: item.size,
//                color: item.color,
//                quantity: item.quantity,
//                qr_code: item.qr_code,
//                prodimg: imgpath,
//
//              };
//            });
//          }
//
//        });
//      });
//
//    }

  addItemToCart(item: CartItem): Promise<void> {
    return this.storeservice.update('Cookies', this.cookie.get('cartid'), {'cart': FieldValue.arrayUnion(item)});
  }
  renderSnippet(snippet): any {
    const checkoutContainer = document.getElementById('my-checkout-container');
    if (checkoutContainer) {
      checkoutContainer.innerHTML = snippet;
      const scriptsTags = checkoutContainer.getElementsByTagName('script');
      // This is necessary otherwise the scripts tags are not going to be evaluated
      for (let i = 0; i < scriptsTags.length; i++) {
        const parentNode = scriptsTags[i].parentNode;
        const newScriptTag = document.createElement('script');
        newScriptTag.type = 'text/javascript';
        newScriptTag.text = scriptsTags[i].text;
        parentNode.removeChild(scriptsTags[i]);
        parentNode.appendChild(newScriptTag);
      }
      return snippet;
    }
    return '';
  }
}

