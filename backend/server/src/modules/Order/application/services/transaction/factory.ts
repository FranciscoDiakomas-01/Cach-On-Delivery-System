import { EventEmitter2 } from '@nestjs/event-emitter';
import UpdateOrderStatusService from './interface';
import {
  CancelOrderService,
  DeliverOrderService,
  ExpiresOrderService,
  PendingOrderService,
  ProcessingOrderService,
  RefundOrderService,
} from './states';
import { OrderStatus } from 'src/modules/Order/domain/entities/OrderStatus';
import OrderRepository from 'src/modules/Order/domain/repositories/abstractration';
import CartRepository from 'src/modules/Cart/domains/repositories/abstraction';

export default class OrderStatusProcessorFactory {
  private constructor() {}

  static create(
    statusType: OrderStatus,
    repo: OrderRepository,
    eventEmitter: EventEmitter2,
    cartRepo: CartRepository,
  ): UpdateOrderStatusService {
    const serviceMap: Record<OrderStatus, UpdateOrderStatusService> = {
      CANCELLED: new CancelOrderService(repo, eventEmitter, cartRepo),
      DELIVERED: new DeliverOrderService(repo, eventEmitter, cartRepo),
      PENDING: new PendingOrderService(repo),
      PROCESSING: new ProcessingOrderService(repo, eventEmitter),
      REFUNDED: new RefundOrderService(repo, eventEmitter, cartRepo),
      EXPIRED: new ExpiresOrderService(repo),
    };
    return serviceMap[statusType];
  }
}
