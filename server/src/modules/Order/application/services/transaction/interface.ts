import Order from 'src/modules/Order/domain/entities/Order';
import { OrderStatus } from 'src/modules/Order/domain/entities/OrderStatus';
import OrderRepository from 'src/modules/Order/domain/repositories/abstractration';

export default abstract class UpdateOrderStatusService {
  constructor(private readonly repo: OrderRepository) {}
  abstract process(order: Order): Promise<Order>;
  abstract getStatus(): OrderStatus;
}
