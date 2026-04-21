import { IPagination, IPagintionProps } from 'src/core/types';
import Order from '../entities/Order';
import { OrderStatus } from '../entities/OrderStatus';

export default abstract class OrderRepository {
  abstract get(pagination: IPagintionProps): Promise<IPagination<Order>>;
  abstract getByUser(
    userId: string,
    pagination: IPagintionProps,
  ): Promise<IPagination<Order>>;
  abstract getById(id: string): Promise<Order | null>;
  abstract create(order: Order): Promise<Order>;
  abstract updateStatus(orderId: string, status: OrderStatus): Promise<Order>;
  abstract getExpiredOrders(date: Date): Promise<Order[]>;
  abstract exists(id: string): Promise<boolean>;
}
