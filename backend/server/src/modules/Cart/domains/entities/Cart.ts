import { IUser } from 'src/modules/User/domains/entities/User';
import CartItem from './CartItem';
import Order from 'src/modules/Order/domain/entities/Order';

export default interface Cart {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
  order: Order;
  items: CartItem[];
  isActive: boolean;
}
