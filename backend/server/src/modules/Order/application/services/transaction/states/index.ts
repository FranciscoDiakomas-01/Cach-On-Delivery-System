import { OrderStatus } from 'src/modules/Order/domain/entities/OrderStatus';
import UpdateOrderStatusService from '../interface';
import Order from 'src/modules/Order/domain/entities/Order';
import { BadRequestException } from '@nestjs/common';
import OrderRepository from 'src/modules/Order/domain/repositories/abstractration';
import { EventEmitter2 } from '@nestjs/event-emitter';

export class ConfirmOrderService extends UpdateOrderStatusService {
  constructor(
    private readonly provider: OrderRepository,
    private readonly eventEmmiter: EventEmitter2,
  ) {
    super(provider);
  }

  getStatus(): OrderStatus {
    return OrderStatus.CONFIRMED;
  }

  async process(order: Order): Promise<Order> {
    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException({
        message: 'Apenas pedidos pendentes podem ser confirmados',
      });
    }
    const data = await this.provider.updateStatus(
      order.id,
      OrderStatus.CONFIRMED,
    );
    this.eventEmmiter.emit('order.confirmated', {
      order,
    });
    return data as any as Order;
  }
}

export class CancelOrderService extends UpdateOrderStatusService {
  constructor(
    private readonly provider: OrderRepository,
    private readonly eventEmmiter: EventEmitter2,
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
    const data = await this.provider.updateStatus(
      order.id,
      OrderStatus.CANCELLED,
    );
    this.eventEmmiter.emit('order.canceled', {
      order,
    });
    return data as any as Order;
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
    if (order.status !== OrderStatus.CONFIRMED) {
      throw new BadRequestException({
        message: 'Apenas pedidos confirmados podem ir para processamento',
      });
    }

    const data = await this.provider.updateStatus(
      order.id,
      OrderStatus.PROCESSING,
    );

    this.eventEmmiter.emit('order.processing', { order });
    return data as any as Order;
  }
}

export class DeliverOrderService extends UpdateOrderStatusService {
  constructor(
    private readonly provider: OrderRepository,
    private readonly eventEmmiter: EventEmitter2,
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

    const data = await this.provider.updateStatus(
      order.id,
      OrderStatus.DELIVERED,
    );

    this.eventEmmiter.emit('order.delivered', { order });
    return data as any as Order;
  }
}

export class RefundOrderService extends UpdateOrderStatusService {
  constructor(
    private readonly provider: OrderRepository,
    private readonly eventEmmiter: EventEmitter2,
  ) {
    super(provider);
  }

  getStatus(): OrderStatus {
    return OrderStatus.REFUNDED;
  }

  async process(order: Order): Promise<Order> {
    if (order.status !== OrderStatus.DELIVERED) {
      throw new BadRequestException({
        message: 'Só pedidos entregues podem ser reembolsados',
      });
    }

    const data = await this.provider.updateStatus(
      order.id,
      OrderStatus.REFUNDED,
    );

    this.eventEmmiter.emit('order.refunded', { order });
    return data as any as Order;
  }
}
