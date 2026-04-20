import { Injectable } from '@nestjs/common';
import RecommendationRepository from 'src/modules/Recomendation/domain/repositories/abstraction';
import Event from 'src/modules/Event/domains/entities/Event';
import { PrismaService } from '../prisma';
import { Product } from 'src/modules/Product/domains/entities/Product';

@Injectable()
export class PrismaRecommendationRepository extends RecommendationRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async getUserEvents(userId: string) {
    const data = await this.prisma.event.findMany({
      where: {
        userId,
      },
      include: {
        product: {
          include: {
            category: true,
            brand: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return data as any as Event[];
  }

  public async getProductsByIds(ids: string[]) {
    const data = await this.prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        category: true,
        brand: true,
      },
    });
    return data as any as Product[];
  }
}
