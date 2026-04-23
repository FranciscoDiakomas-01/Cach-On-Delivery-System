/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import BrandRepository from 'src/modules/Brands/domains/repositories/abstraction';
import Brand from 'src/modules/Brands/domains/entities/Brand';
import { PrismaService } from '../prisma';

@Injectable()
export default class PrismaBrandRepository implements BrandRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Brand): Promise<Brand> {
    const created = await this.prisma.brand.create({ data });
    return created as any as Brand;
  }

  async findById(id: string): Promise<Brand | null> {
    return (await this.prisma.brand.findUnique({
      where: { id },
      include: {
        _count: true,
      },
    })) as any as Brand | null;
  }

  async findBySlug(slug: string): Promise<Brand | null> {
    return (await this.prisma.brand.findFirst({
      where: { slug },
    })) as any as Brand | null;
  }

  async findByTitle(title: string): Promise<Brand | null> {
    return (await this.prisma.brand.findUnique({
      where: { title },
    })) as any as Brand | null;
  }

  async getAll(): Promise<Brand[]> {
    return (await this.prisma.brand.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        isActive: true,
      },
    })) as any as Brand[];
  }

  async update(id: string, data: Partial<Brand>): Promise<Brand> {
    return (await this.prisma.brand.update({
      where: { id },
      data,
    })) as any as Brand;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.brand.delete({ where: { id } });
  }

  async activate(id: string): Promise<void> {
    await this.prisma.brand.update({
      where: { id },
      data: { isActive: true },
    });
  }

  async deactivate(id: string): Promise<void> {
    await this.prisma.brand.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async existsBySlug(slug: string): Promise<boolean> {
    const brand = await this.prisma.brand.findUnique({
      where: { slug },
    });

    return !!brand;
  }
}
