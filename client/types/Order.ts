import { OrderStatus } from "./OrderStatus";
import { Paymethod } from "./Paymethod";
import Adress from "./Adress";
import { IUser } from "./User";
import Cart from "./Cart";
import Coupon from "./Coupun";

export default interface Order {
  id: string;
  customerId: string;
  status: OrderStatus;
  cartId: string;
  couponId: string | undefined;
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
  deliveryManId: string;
}
