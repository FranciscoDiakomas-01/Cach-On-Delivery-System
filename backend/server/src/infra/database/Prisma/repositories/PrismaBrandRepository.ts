import { Injectable } from '@nestjs/common';
import BrandRepository from 'src/modules/Brands/domains/repositories/abstraction';
import Brand from 'src/modules/Brands/domains/entities/Brand';
import { PrismaService } from '../prisma';

@Injectable()
export default class PrismaBrandRepository implements BrandRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Brand): Promise<Brand> {
    return this.prisma.brand.create({ data });
  }

  findById(id: string): Promise<Brand | null> {
    return this.prisma.brand.findUnique({
      where: { id },
      include: {
        _count: true,
      },
    });
  }

  findBySlug(slug: string): Promise<Brand | null> {
    return this.prisma.brand.findUnique({ where: { slug } });
  }

  findByTitle(title: string): Promise<Brand | null> {
    return this.prisma.brand.findUnique({ where: { title } });
  }

  getAll(): Promise<Brand[]> {
    return this.prisma.brand.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        isActive: true,
      },
    });
  }

  async update(id: string, data: Partial<Brand>): Promise<Brand> {
    return this.prisma.brand.update({
      where: { id },
      data,
    });
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
