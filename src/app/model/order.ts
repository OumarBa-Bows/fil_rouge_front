import { User } from './user';

export interface Order {
  id?: number;
  totalAmount: number;
  status: string;
  orderDate?: string | Date;
  customer?: User;
}
