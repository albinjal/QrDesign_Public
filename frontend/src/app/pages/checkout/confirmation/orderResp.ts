

export interface OrderResp {
  html: string;
  amount: number;
  id: string;
  items: KlarnaItem[];
  tax: number;
}

export interface KlarnaItem {
  quantity: number;
  total_amount: number;
  reference: string;
  name: string;
}
