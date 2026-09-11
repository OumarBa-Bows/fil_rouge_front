import {Product} from '../model/product';

export interface CategoryDTO {
  id?: number;
  name: string;
  description?: string;
  products?: Product[];
}
