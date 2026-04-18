import { IPagination, IUseCase } from 'src/core/types';
import { ICategory } from '../../domains/interface';
import { Inject, Injectable } from '@nestjs/common';
import { CATEGORY_REPOSITORY, REDIS_CLIENT } from '../../../../core/constants';
import CategoryRepository from '../../domains/repositories';
import type { ICacheClient } from '../../../../infra/caching/type';

@Injectable()
export default class GetCategoryUseCase implements IUseCase<
  undefined,
  IPagination<ICategory>
> {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly repository: CategoryRepository,
    @Inject(REDIS_CLIENT)
    private readonly redis: ICacheClient,
  ) {}

  public async handle(): Promise<IPagination<ICategory>> {
    const cachedData = await this.redis.get<ICategory[]>('categories');
    if (cachedData) {
      return {
        items: cachedData,
        total: cachedData.length,
        limit: null,
        page: null,
        hasNexPage: null,
        hasPrevPage: null,
      };
    }
    const data = await this.repository.get();
    return {
      items: data,
      total: data.length,
      limit: null,
      page: null,
      hasNexPage: null,
      hasPrevPage: null,
    };
  }
}
