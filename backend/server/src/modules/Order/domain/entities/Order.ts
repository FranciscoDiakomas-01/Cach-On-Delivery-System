import { Coupon } from '@prisma/client';
import Cart from 'src/modules/Cart/domains/entities/Cart';
import { IUser } from 'src/modules/User/domains/entities/User';
import { OrderStatus } from './OrderStatus';
import { Paymethod } from './Paymethod';
import Adress from './Adress';

export default interface Order {
  id: string;
  costumerId: string;
  status: OrderStatus;
  cartId: string;
  coupunId: string | undefined;
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: Paymethod;
  paidAt: Date | undefined;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
  cart: Cart;
  coupon: Coupon | undefined;
  address: Adress;
  delivery: any;
}
