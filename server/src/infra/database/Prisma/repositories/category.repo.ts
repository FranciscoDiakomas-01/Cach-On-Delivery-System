import CategoryRepository from 'src/modules/category/domains/repositories';
import { PrismaService } from '../prisma';
import { ICategory } from 'src/modules/category/domains/interface';
import Category from 'src/modules/category/domains/entities/category';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class PrismaCategoryRepository extends CategoryRepository {
  constructor(private readonly PrismaService: PrismaService) {
    super();
  }
  public async toogle(id: string, status: boolean): Promise<void> {
    await this.PrismaService.category.update({
      where: { id },
      data: {
        isActive: status,
      },
    });
  }
  public async findById(id: string): Promise<ICategory | null> {
    const category = await this.PrismaService.category.findFirst({
      where: {
        id,
      },
      include: {
        parent: true,
        children: true,
      },
    });
    return category;
  }
  public async get(): Promise<ICategory[]> {
    const categories = await this.PrismaService.category.findMany({
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
      where: {
        isActive: true,
      },
    });
    return categories;
  }
  public async save(category: Category): Promise<void> {
    const data = category.get();
    await this.PrismaService.category.upsert({
      where: {
        id: data.id,
      },
      create: {
        ...data,
      },
      update: {
        ...data,
      },
    });
  }

  public async isLugDisponible(slug: string): Promise<boolean> {
    const exists = await this.PrismaService.category.findFirst({
      where: { slug },
    });
    return !!exists;
  }
  public async getByTitle(title: string): Promise<ICategory | null> {
    const category = await this.PrismaService.category.findFirst({
      where: {
        title,
      },
      include: {
        parent: true,
      },
    });
    return category;
  }
}
