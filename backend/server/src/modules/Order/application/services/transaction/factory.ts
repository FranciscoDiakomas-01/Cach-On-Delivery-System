import { EventEmitter2 } from '@nestjs/event-emitter';
import UpdateOrderStatusService from './interface';
import {
  CancelOrderService,
  ConfirmOrderService,
  DeliverOrderService,
  PendingOrderService,
  ProcessingOrderService,
  RefundOrderService,
} from './states';
import { OrderStatus } from 'src/modules/Order/domain/entities/OrderStatus';
import OrderRepository from 'src/modules/Order/domain/repositories/abstractration';

export default class OrderStatusProcessorFactory {
  private constructor() {}

  static create(
    statusType: OrderStatus,
    repo: OrderRepository,
    eventEmitter: EventEmitter2,
  ): UpdateOrderStatusService {
    const serviceMap: Record<OrderStatus, UpdateOrderStatusService> = {
      CANCELLED: new CancelOrderService(repo, eventEmitter),
      CONFIRMED: new ConfirmOrderService(repo, eventEmitter),
      DELIVERED: new DeliverOrderService(repo, eventEmitter),
      PENDING: new PendingOrderService(repo),
      PROCESSING: new ProcessingOrderService(repo, eventEmitter),
      REFUNDED: new RefundOrderService(repo, eventEmitter),
    };
    return serviceMap[statusType];
  }
}
