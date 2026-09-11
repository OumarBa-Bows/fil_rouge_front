import { Category } from './category';
import { Stock } from './stock';
import { Document } from './document';

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock?: Stock;
  updateAt?: string | Date;
  category?: Category;
  document?: Document;
  badge?: string;
  oldPrice?: number;
  rating?: number;
}
