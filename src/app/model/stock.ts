import { Product } from './product';

export interface Stock {
  id?: number;
  quantity: number;
  updateDate?: string | Date;
  product?: Product;
}
