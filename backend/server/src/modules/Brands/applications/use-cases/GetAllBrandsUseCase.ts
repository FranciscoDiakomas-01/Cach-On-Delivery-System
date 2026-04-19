import { IUseCase } from 'src/core/types';
import Brand from '../../domains/entities/Brand';
import { BRAND_REPOSITORY, REDIS_CLIENT } from 'src/core/constants';
import type { ICacheClient } from 'src/infra/caching/type';
import BrandRepository from '../../domains/repositories/abstraction';
import { Inject, Injectable } from '@nestjs/common';
import { BrandNotFoundError } from '../error';

@Injectable()
export class GetAllBrandsUseCase implements IUseCase<
  undefined,
  { data: Brand[] }
> {
  constructor(
    @Inject(BRAND_REPOSITORY) private readonly repo: BrandRepository,
    @Inject(REDIS_CLIENT) private readonly cache: ICacheClient,
  ) {}
  async handle(): Promise<{ data: Brand[] }> {
    const cached = await this.cache.get<Brand[]>('brands');
    if (cached && cached.length > 0) {
      return {
        data: cached,
      };
    }
    const brands = await this.repo.getAll();
    await this.cache.set('brands', brands);
    return {
      data: brands,
    };
  }
  async getById(id: string) {
    const brand = await this.repo.findById(id);
    if (!brand) {
      throw new BrandNotFoundError(id);
    }
    return brand;
  }
}
