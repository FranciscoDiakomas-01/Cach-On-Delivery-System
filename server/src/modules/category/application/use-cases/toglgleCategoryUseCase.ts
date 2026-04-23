import { IUseCase } from 'src/core/types';
import { Inject, Injectable } from '@nestjs/common';
import { CATEGORY_REPOSITORY, REDIS_CLIENT } from '../../../../core/constants';
import CategoryRepository from '../../domains/repositories';
import type { ICacheClient } from 'src/infra/caching/type';
import CategoryNotFound from '../shared/errors';

@Injectable()
export default class ToglgleCategoryUseCase implements IUseCase<
  string,
  {
    message: string;
  }
> {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly repository: CategoryRepository,
    @Inject(REDIS_CLIENT)
    private readonly redis: ICacheClient,
  ) {}

  public async handle(id: string): Promise<{
    message: string;
  }> {
    const [category] = await Promise.all([this.repository.findById(id)]);

    if (!category) {
      throw new CategoryNotFound('child');
    }
    await this.repository.toogle(category.id, !category.isActive);
    await this.redis.delete('categories');
    return {
      message: 'Actualizado',
    };
  }
}
