import { IUseCase } from 'src/core/types';
import { ICategory } from '../../domains/interface';
import { Inject, Injectable } from '@nestjs/common';
import { CATEGORY_REPOSITORY, REDIS_CLIENT } from '../../../../core/constants';
import CategoryRepository from '../../domains/repositories';
import type { ICacheClient } from 'src/infra/caching/type';
import Category from '../../domains/entities/category';
import { UpdateCategoryDto } from '../dto/update';
import CategoryNotFound, { CategoryAlreadyxistError } from '../shared/errors';

@Injectable()
export default class UpdateCategoryUseCase implements IUseCase<
  UpdateCategoryDto & { id: string },
  ICategory
> {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly repository: CategoryRepository,
    @Inject(REDIS_CLIENT)
    private readonly redis: ICacheClient,
  ) {}

  public async handle(
    data: UpdateCategoryDto & { id: string },
  ): Promise<ICategory> {
    const [category, existing] = await Promise.all([
      this.repository.findById(data.id),
      this.repository.getByTitle(data.title),
    ]);

    if (existing && existing.id !== data.id) {
      throw new CategoryAlreadyxistError();
    }
    if (!category) {
      throw new CategoryNotFound('child');
    }
    const updatedCategory = new Category({
      createdAt: category.createdAt,
      description: data.description ?? category.description,
      id: data.id,
      imageUrl: data.imageUrl!,
      isActive: data.isActive!,
      isFeatured: data.isFeatured!,
      level: category.parentId! ? 1 : 0,
      parentId: category.parentId!,
      slug: category.slug,
      title: data.title ?? category.title,
      updatedAt: new Date(),
    });
    await this.repository.save(updatedCategory);
    await this.redis.delete('categories');
    return updatedCategory.get();
  }
}
