import { Injectable } from '@nestjs/common';
import EventRepository from 'src/modules/Event/domains/repositories/abstraction';
import { PrismaService } from '../prisma';
import { EventType } from 'src/modules/Recomendation/domain/entities/events';
import { EventTypes } from '@prisma/client';

@Injectable()
export default class PrismaEventRepository implements EventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async register(data: {
    userId: string;
    productId: string;
    event: EventType;
  }): Promise<void> {
    await this.prisma.event.create({
      data: {
        userId: data.userId,
        productId: data.productId,
        type: data.event as EventTypes,
      },
    });
  }
}
