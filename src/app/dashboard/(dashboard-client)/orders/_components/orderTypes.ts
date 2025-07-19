export interface ProductInfo {
  price: number;
  quantity: number;
}

export interface OrderData {
  order_id: string;
  orderId: string;
  date: string;
  status: string;
  total: string;
  discount: number | string;
  net_total: number | string;
  items: number;
}

export interface TOrder {
  _id: string;
  orderId: string;
  createdAt: string;
  status: string;
  data: {
    totalCost: number;
    discount: number;
    netCost: number;
    productsInfo: ProductInfo[];
  };
}

export interface OrderListResult {
  statusCode: number;
  response: boolean;
  message: string;
  data: {
    total: number;
    pages: number;
    orders: TOrder[];
  };
}
