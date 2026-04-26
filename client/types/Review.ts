import Order from "./Order";
import { IUser } from "./User";

export default interface Review {
  readonly id: string;
  userId: string;
  orderId: string;
  rating: number;
  content: string;
  readonly createdAt: Date;
  user: IUser;
  order: Order;
}
