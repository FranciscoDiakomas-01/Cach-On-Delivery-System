/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { IPagination, IPagintionProps } from 'src/core/types';
import { Injectable } from '@nestjs/common';
import ProductRepository from 'src/modules/Product/domains/repositories/abstraction';
import { PrismaService } from '../prisma';
import { Product } from 'src/modules/Product/domains/entities/Product';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(pagination: IPagintionProps): Promise<IPagination<Product>> {
    const search = pagination.search;
    const page = pagination.page ?? 1;
    const limit = pagination.limit ?? 10;
    const skip = (page - 1) * limit;
    let where: any = {};
    if (search) {
      where = {
        title: {
          contains: search,
          mode: 'insensitive',
        },
        description: {
          contains: search,
          mode: 'insensitive',
        },
        slug: {
          contains: search,
          mode: 'insensitive',
        },
      };
    }

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        where: {
          ...where,
          isActive: true,
        },
      }),
      this.prisma.product.count({
        where,
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

  async getByUnique(unique: string): Promise<Product | null> {
    return this.prisma.product.findFirst({
      where: {
        OR: [{ id: unique }, { slug: unique }, { sku: unique }],
        isActive: true,
      },
    }) as Promise<Product | null>;
  }

  async create(data: Product): Promise<Product> {
    return this.prisma.product.create({
      data: {
        ...data,
      },
    }) as any as Promise<Product>;
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    return this.prisma.product.update({
      where: { id, isActive: true },
      data,
    }) as any as Promise<Product>;
  }

  async increaseStock(productId: string, qty: number): Promise<void> {
    await this.prisma.product.update({
      where: { id: productId, isActive: true },
      data: {
        available: { increment: qty },
      },
    });
  }

  async decreaseStock(productId: string, qty: number): Promise<void> {
    await this.prisma.product.update({
      where: { id: productId, isActive: true },
      data: {
        available: { decrement: qty },
      },
    });
  }

  async reserveStock(productId: string, qty: number): Promise<void> {
    await this.prisma.product.update({
      where: { id: productId, isActive: true },
      data: {
        available: { decrement: qty },
        reserved: { increment: qty },
      },
    });
  }

  async releaseStock(productId: string, qty: number): Promise<void> {
    await this.prisma.product.update({
      where: { id: productId, isActive: true },
      data: {
        reserved: { decrement: qty },
        available: { increment: qty },
      },
    });
  }

  async activate(productId: string): Promise<void> {
    await this.prisma.product.update({
      where: { id: productId, isActive: true },
      data: {
        isActive: true,
      },
    });
  }

  async deactivate(productId: string): Promise<void> {
    await this.prisma.product.update({
      where: { id: productId, isActive: true },
      data: {
        isActive: false,
      },
    });
  }

  async incrementSellCount(productId: string, qty: number): Promise<void> {
    await this.prisma.product.update({
      where: { id: productId, isActive: true },
      data: {
        sellCount: { increment: qty },
      },
    });
  }

  async findByCategory(
    categoryId: string,
    pagination: IPagintionProps,
  ): Promise<IPagination<Product>> {
    const page = pagination.page ?? 1;
    const limit = pagination.limit ?? 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        where: {
          categoryId,
          isActive: true,
        },
        skip,
        take: limit,
      }),
      this.prisma.product.count({
        where: {
          categoryId,
          isActive: true,
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

  public async isLugDisponible(slug: string): Promise<boolean> {
    const exists = await this.prisma.product.findFirst({
      where: { slug },
    });
    return !!exists;
  }
}
