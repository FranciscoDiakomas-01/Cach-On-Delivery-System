import { Injectable } from '@nestjs/common';
import { IPagination, IPagintionProps } from 'src/core/types';
import OrderRepository from 'src/modules/Order/domain/repositories/abstractration';
import { PrismaService } from '../prisma';
import Order from 'src/modules/Order/domain/entities/Order';
import { Paymethod } from '@prisma/client';
import { OrderStatus } from 'src/modules/Order/domain/entities/OrderStatus';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get({ page, limit }: IPagintionProps): Promise<IPagination<Order>> {
    const [data, total] = await Promise.all([
      this.prisma.order.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.order.count(),
    ]);

    return {
      items: data as any as Order[],
      total,
      page,
      limit,
      hasNexPage: page * limit < total,
      hasPrevPage: page > 1,
    };
  }

  async getByUser(
    userId: string,
    { page, limit }: IPagintionProps,
  ): Promise<IPagination<Order>> {
    const [data, total] = await Promise.all([
      this.prisma.order.findMany({
        where: { costumerId: userId },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.order.count({ where: { costumerId: userId } }),
    ]);

    return {
      items: data as any as Order[],
      total,
      page,
      limit,
      hasNexPage: page * limit < total,
      hasPrevPage: page > 1,
    };
  }

  async getById(id: string): Promise<Order | null> {
    const data = await this.prisma.order.findUnique({ where: { id } });
    return data as Order | null;
  }

  async create(order: Order): Promise<Order> {
    const { address } = order;
    const data = await this.prisma.order.create({
      data: {
        subtotal: order.subtotal,
        paymentMethod: order.paymentMethod as any as Paymethod,
        total: order.total,
        address: {
          create: {
            city: address.city,
            country: 'Angola',
            lat: address.lat,
            lng: address.lng,
            phone: address.phone,
            recipientName: address.recipientName,
            state: address.state,
            street: address.street,
            district: address.district,
            houseNumber: address.houseNumber,
            instructions: address.instructions,
            postalCode: address.postalCode,
            reference: address.reference,
          },
        },
        cartId: order.cartId,
        coupunId: order.coupunId,
        status: 'PENDING',
        costumerId: order.costumerId,
        discount: order.discount,
      },
    });
    return data as any as Order;
  }

  async updateStatus(orderId: string, status: OrderStatus): Promise<Order> {
    const data = await this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    return data as any as Order;
  }

  async getExpiredOrders(date: Date): Promise<Order[]> {
    const data = await this.prisma.order.findMany({
      where: {
        createdAt: {
          lt: date,
        },
        status: {
          notIn: ['DELIVERED', 'CANCELLED', 'REFUNDED'],
        },
      },
      include: {
        cart: {
          include: {
            items: true,
          },
        },
      },
    });
    return data as any as Order[];
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.order.count({
      where: { id },
    });

    return count > 0;
  }
}
