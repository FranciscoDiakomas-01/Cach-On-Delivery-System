import { IUseCase } from 'src/core/types';
import Brand from '../../domains/entities/Brand';
import { BRAND_REPOSITORY, REDIS_CLIENT } from 'src/core/constants';
import BrandRepository from '../../domains/repositories/abstraction';
import { Inject, Injectable } from '@nestjs/common';
import { BrandAlreadyExistsError, BrandNotFoundError } from '../error';
import { CreateBrandDto } from '../dto/CreateBrandDto';
import type { ICacheClient } from 'src/infra/caching/type';
import { slugify } from 'src/modules/category/application/shared/utils';

@Injectable()
export class UpdateBrandUseCase implements IUseCase<
  { id: string; data: CreateBrandDto },
  Brand
> {
  constructor(
    @Inject(BRAND_REPOSITORY) private readonly repo: BrandRepository,
    @Inject(REDIS_CLIENT) private readonly cache: ICacheClient,
  ) {}
  async handle(props: { id: string; data: CreateBrandDto }): Promise<Brand> {
    const { id, data } = props;
    const [exists, brand] = await Promise.all([
      this.repo.findByTitle(data.title),
      this.repo.findById(id),
    ]);

    if (exists && id !== exists.id) {
      throw new BrandAlreadyExistsError(data.title);
    }

    if (!brand) {
      throw new BrandNotFoundError(id);
    }
    const slug = slugify(data.title);
    const updatedBrand = await this.repo.update(id, {
      ...data,
      slug,
    });
    await this.cache.delete('brands');
    return updatedBrand;
  }
}
