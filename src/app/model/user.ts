import { Role } from './role';
import { Order } from './order';

export interface User {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  roles?: Role[];
  createdAt?: string | Date;
  orders?: Order[];
}
