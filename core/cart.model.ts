import * as firebase from '../../../node_modules/firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface Cart {
  cart?: Array<CartItem>;
  created?: any;
  items?: number;
  totalmomsprice?: number;
  totalmoms?: number;
  nomomsprice?: number;
  delivery?: number;
  numberofcanvas?: number;
  numverofposter?: number;
  deliverymoms?: number;
  deliverynet?: number;
}


export interface CartItem {
  prodID: string;
  type: string;
  size: string;
  color: string;
  quantity: number;
  qr_code: string;
  prodimg?: string;
  prodname?: string;
  prodprice?: number;
  nomomsprice?: number;
  momsprice?: number;
  viewcolor?: string;
  viewdim?: string;
  singleprice?: number;
  itemmoms?: number;
}

// export interface CompCart {
//   cart?: Array<CompCartItem>;
// }
//
// export interface CompCartItem {
//   prodID: string;
//   type: string;
//   size: string;
//   color: string;
//   quantity: number;
//   qr_code: string;
//   prodimg: string;
//   prodname: string;
//   prodprice: string;
// }
