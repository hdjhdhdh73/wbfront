export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  category_id: number;
  image_url: string;
  create_time?: string;
}

export interface ProductCreate {
  name: string;
  price: number;
  description?: string;
  category_id: number;
  image_url?: string;
}