import { IUser } from 'src/modules/User/domains/entities/User';
import CartItem from './CartItem';

export default interface Cart {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
  order: any;
  items: CartItem[];
  isActive: boolean;
}
