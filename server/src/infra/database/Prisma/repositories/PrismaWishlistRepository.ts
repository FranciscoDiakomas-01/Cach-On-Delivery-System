import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import WishlistRepository from 'src/modules/Wishlist/domain/repositories/abstraction';
import { IPagintionProps, IPagination } from 'src/core/types';
import { Product } from 'src/modules/Product/domains/entities/Product';

@Injectable()
export default class PrismaWishlistRepository implements WishlistRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async addToList(productId: string, userId: string): Promise<void> {
    await this.prisma.wishlist.create({
      data: {
        productId,
        userId,
      },
    });
  }
  public async removeToList(productId: string, userId: string): Promise<void> {
    await this.prisma.wishlist.deleteMany({
      where: {
        userId,
        productId,
      },
    });
  }
  public async getList(
    userId: string,
    pagination: IPagintionProps,
  ): Promise<IPagination<Product>> {
    const page = pagination.page ?? 1;
    const limit = pagination.limit ?? 10;
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.wishlist.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
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
      }),
      this.prisma.wishlist.count({
        where: {
          userId,
        },
      }),
    ]);

    const hasNextPage = page * limit < total;
    const hasPrevPage = page > 1;
    return {
      items: data as any as Product[],
      total,
      page,
      limit,
      hasPrevPage,
      hasNexPage: hasNextPage,
    };
  }
  public async isInList(productId: string, userId: string): Promise<boolean> {
    const wish = await this.prisma.wishlist.findFirst({
      where: {
        userId,
        productId,
      },
    });
    return !!wish;
  }
}
