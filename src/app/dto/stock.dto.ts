import { Product } from '../model/product';

export interface StockDTO {
  id?: number;
  quantity: number;
  updateDate?: string | Date;
  product?: Product;
  location?: string;
}
