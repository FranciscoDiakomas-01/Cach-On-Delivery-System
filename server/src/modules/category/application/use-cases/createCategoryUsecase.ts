import { IUseCase } from 'src/core/types';
import { ICategory } from '../../domains/interface';
import { Inject, Injectable } from '@nestjs/common';
import { CATEGORY_REPOSITORY, REDIS_CLIENT } from '../../../../core/constants';
import CategoryRepository from '../../domains/repositories';
import type { ICacheClient } from 'src/infra/caching/type';
import { CreateCategoryDto } from '../dto/create';
import Category from '../../domains/entities/category';
import { slugify } from '../shared/utils';
import { CategoryAlreadyxistError } from '../shared/errors';

@Injectable()
export default class CreateCategoryUseCase implements IUseCase<
  CreateCategoryDto,
  ICategory
> {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly repository: CategoryRepository,
    @Inject(REDIS_CLIENT)
    private readonly redis: ICacheClient,
  ) {}
  public async handle(data: CreateCategoryDto): Promise<ICategory> {
    const [parent, slug, isExisting] = await Promise.all([
      this.repository.findById(data.parentId ?? ''),
      this.generateUniqueSlug(data.title),
      this.repository.getByTitle(data.title),
    ]);

    if (isExisting) {
      throw new CategoryAlreadyxistError();
    }
    const category = new Category({
      createdAt: new Date(),
      description: data.description,
      id: crypto.randomUUID(),
      imageUrl: data.imageUrl!,
      isActive: data.isActive!,
      isFeatured: data.isFeatured!,
      level: parent?.id ? 1 : 0,
      parentId: data.parentId!,
      slug,
      title: data.title,
      updatedAt: new Date(),
    });
    await this.repository.save(category);
    await this.redis.delete('categories');
    return category.get();
  }

  private async generateUniqueSlug(title: string): Promise<string> {
    const baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 1;

    while (await this.repository.isLugDisponible(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }
}
