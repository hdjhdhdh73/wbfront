export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  product_name: string;
  product_price: number;
  total_price: number;
}

export interface CartItemCreate {
  product_id: number;
  quantity?: number;
}