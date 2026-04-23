import { Injectable } from '@nestjs/common';
import RecommendationRepository from 'src/modules/Recomendation/domain/repositories/abstraction';
import { PrismaService } from '../prisma';
import { Product } from 'src/modules/Product/domains/entities/Product';
import { IPagination, IPagintionProps } from 'src/core/types';
import Event from 'src/modules/Event/domains/entities/Event';

@Injectable()
export class PrismaRecommendationRepository extends RecommendationRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async getUserEvents(userId: string) {
    const events = await this.prisma.event.findMany({
      where: { userId },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return events as any as Event[];
  }
  public async getInteractedProducts(productIds: string[]): Promise<Product[]> {
    return (await this.prisma.product.findMany({
      where: {
        id: { in: productIds },
        isActive: true,
        available: { gt: 0 },
      },
    })) as any as Product[];
  }
  public async getSimilarProducts(
    categoryIds: string[],
    excludeIds: string[],
    pagination: IPagintionProps,
  ): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: {
        categoryId: { in: categoryIds },
        id: { notIn: excludeIds },
        isActive: true,
        available: { gt: 0 },
      },
      take: pagination.limit,
      skip: (pagination.page - 1) * pagination.limit,
    });
    return products as any as Product[];
  }
  public async getUnInteractedProducts(
    userId: string,
    pagination: IPagintionProps,
  ): Promise<IPagination<Product>> {
    const interacted = await this.prisma.event.findMany({
      where: { userId },
      select: {
        productId: true,
      },
      distinct: ['productId'],
    });
    const { limit, page } = pagination;
    const interactedIds = interacted.map((e) => e.productId);

    const [total, products] = await Promise.all([
      this.prisma.product.count({
        where: {
          id: { notIn: interactedIds },
          isActive: true,
          available: { gt: 0 },
        },
      }),
      this.prisma.product.findMany({
        where: {
          id: { notIn: interactedIds },
          isActive: true,
          available: { gt: 0 },
        },
        take: limit,
        skip: (page - 1) * limit,
      }),
    ]);

    return {
      hasNexPage: total > page * limit,
      hasPrevPage: total > (page - 1) * limit,
      items: products as any as Product[],
      limit,
      page,
      total,
    };
  }
}
