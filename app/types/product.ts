export interface Product {
  _id: string;
  Brand: string;
  Title: string;
  Images: string[];
  Verification: boolean;
  Description: string;
  Price: number;
  Serving: string;
}

export interface ProductFormData extends Omit<Product, '_id' | 'Verification'> {
  _id?: string;
  Verification?: boolean;
}
