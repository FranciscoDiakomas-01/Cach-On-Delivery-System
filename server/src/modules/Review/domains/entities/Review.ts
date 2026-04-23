import Order from 'src/modules/Order/domain/entities/Order';
import { IUser } from 'src/modules/User/domains/entities/User';

export default interface Review {
  readonly id: string;
  userId: string;
  orderId: string;
  rating: number;
  content: string;
  readonly createdAt: Date;
  user: IUser | undefined;
  order: Order | undefined;
}
