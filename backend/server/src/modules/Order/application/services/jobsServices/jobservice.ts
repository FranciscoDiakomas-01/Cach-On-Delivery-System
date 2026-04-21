import { Injectable, Inject } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CART_REPOSITORY, ORDER_REPOSITORY } from 'src/core/constants';
import OrderRepository from '../../../domain/repositories/abstractration';
import { OrderStatus } from '../../../domain/entities/OrderStatus';
import Order from '../../../domain/entities/Order';
import CartRepository from 'src/modules/Cart/domains/repositories/abstraction';

@Injectable()
export class OrderExpirationCron {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepo: OrderRepository,
    @Inject(CART_REPOSITORY)
    private readonly cartRepo: CartRepository,
  ) {}

  @Cron('0 */6 * * *')
  async handleExpiredOrders() {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const orders = await this.orderRepo.getExpiredOrders(twoDaysAgo);

    for (const order of orders) {
      if (
        order.status === OrderStatus.DELIVERED ||
        order.status === OrderStatus.CANCELLED ||
        order.status === OrderStatus.REFUNDED
      ) {
        continue;
      }
      await this.cancelOrderAndRestoreStock(order);
    }
  }

  private async cancelOrderAndRestoreStock(order: Order) {
    await Promise.all([
      this.cartRepo.markCartAsInactive(order.cartId),
      this.orderRepo.updateStatus(order.id, OrderStatus.CANCELLED),
    ]);
    for (const item of order.cart.items) {
      await this.cartRepo.releaseStock(item.productId, item.quantity);
    }
  }
}
