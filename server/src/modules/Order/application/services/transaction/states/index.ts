import { OrderStatus } from 'src/modules/Order/domain/entities/OrderStatus';
import UpdateOrderStatusService from '../interface';
import Order from 'src/modules/Order/domain/entities/Order';
import { BadRequestException } from '@nestjs/common';
import OrderRepository from 'src/modules/Order/domain/repositories/abstractration';
import { EventEmitter2 } from '@nestjs/event-emitter';
import CartRepository from 'src/modules/Cart/domains/repositories/abstraction';

export class CancelOrderService extends UpdateOrderStatusService {
  constructor(
    private readonly provider: OrderRepository,
    private readonly eventEmmiter: EventEmitter2,
    private readonly cartRepoSitory: CartRepository,
  ) {
    super(provider);
  }

  getStatus(): OrderStatus {
    return OrderStatus.CANCELLED;
  }

  async process(order: Order): Promise<Order> {
    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException({
        message: 'Apenas pedidos pendentes podem ser cancelados',
      });
    }
    const [data, cart] = await Promise.all([
      this.provider.updateStatus(order.id, OrderStatus.CANCELLED),
      this.cartRepoSitory.getCartByUserId(order.customerId),
    ]);

    if (cart) {
      for (const product of cart.items) {
        await this.cartRepoSitory.releaseStock(
          product.productId,
          product.quantity,
        );
      }
    }
    this.eventEmmiter.emit('order.canceled', {
      order,
    });
    return data;
  }
}

export class PendingOrderService extends UpdateOrderStatusService {
  getStatus(): OrderStatus {
    return OrderStatus.PENDING;
  }

  process(): Promise<Order> {
    throw new BadRequestException({
      message: 'Não é possível voltar para PENDING',
    });
  }
}

export class ExpiresOrderService extends UpdateOrderStatusService {
  getStatus(): OrderStatus {
    return OrderStatus.EXPIRED;
  }

  process(): Promise<Order> {
    throw new BadRequestException({
      message: 'Não é actualizar manualmne para expired',
    });
  }
}

export class ProcessingOrderService extends UpdateOrderStatusService {
  constructor(
    private readonly provider: OrderRepository,
    private readonly eventEmmiter: EventEmitter2,
  ) {
    super(provider);
  }

  getStatus(): OrderStatus {
    return OrderStatus.PROCESSING;
  }

  async process(order: Order): Promise<Order> {
    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException({
        message: 'Apenas pedidos confirmados podem ir para processamento',
      });
    }

    const data = await this.provider.updateStatus(
      order.id,
      OrderStatus.PROCESSING,
    );

    this.eventEmmiter.emit('order.processing', { order });
    return data;
  }
}

export class DeliverOrderService extends UpdateOrderStatusService {
  constructor(
    private readonly provider: OrderRepository,
    private readonly eventEmmiter: EventEmitter2,
    private readonly cartRepoSitory: CartRepository,
  ) {
    super(provider);
  }

  getStatus(): OrderStatus {
    return OrderStatus.DELIVERED;
  }

  async process(order: Order): Promise<Order> {
    if (order.status !== OrderStatus.PROCESSING) {
      throw new BadRequestException({
        message: 'Apenas pedidos em processamento podem ser entregues',
      });
    }

    const [data, cart] = await Promise.all([
      this.provider.updateStatus(order.id, OrderStatus.DELIVERED),
      this.cartRepoSitory.getCartByUserId(order.customerId),
    ]);

    if (cart) {
      for (const product of cart.items) {
        await this.cartRepoSitory.releaseStock(
          product.productId,
          product.quantity,
        );
      }
    }
    this.eventEmmiter.emit('order.delivered', { order });
    return data;
  }
}

export class RefundOrderService extends UpdateOrderStatusService {
  constructor(
    private readonly provider: OrderRepository,
    private readonly eventEmmiter: EventEmitter2,
    private readonly cartRepoSitory: CartRepository,
  ) {
    super(provider);
  }

  getStatus(): OrderStatus {
    return OrderStatus.CANCELLED;
  }

  async process(order: Order): Promise<Order> {
    if (order.status !== OrderStatus.DELIVERED) {
      throw new BadRequestException({
        message: 'Apenas finalizados podem ser reembolsados',
      });
    }
    const [data, cart] = await Promise.all([
      this.provider.updateStatus(order.id, OrderStatus.REFUNDED),
      this.cartRepoSitory.getCartByUserId(order.customerId),
    ]);

    if (cart) {
      for (const product of cart.items) {
        await this.cartRepoSitory.releaseStock(
          product.productId,
          product.quantity,
        );
      }
    }
    this.eventEmmiter.emit('order.canceled', {
      order,
    });
    return data;
  }
}
