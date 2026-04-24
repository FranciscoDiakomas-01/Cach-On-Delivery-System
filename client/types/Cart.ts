import { IUser } from "./User";
import CartItem from "./CartItem";
import Order from "./Order";

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
