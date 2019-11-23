export interface User {
  uid?: string;
  cart?: CartItem[];
  created?: any;
  items?: number;
  totalmomsprice?: number;
  totalmoms?: number;
  nomomsprice?: number;
}


export interface CartItem {
  prodID: string;
  type: string;
  size: string;
  color: string;
  quantity: number;
  qr_code: string;
  qrType: string;
  prodimg?: string;
  prodname?: string;
  prodprice?: number;
  nomomsprice?: number;
  momsprice?: number;
  viewcolor?: string;
  viewdim?: string;
  singleprice?: number;
  itemmoms?: number;
  pickLater?: boolean;
}
