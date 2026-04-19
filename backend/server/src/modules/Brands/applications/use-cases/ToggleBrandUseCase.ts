import { IUseCase } from 'src/core/types';
import { BRAND_REPOSITORY, REDIS_CLIENT } from 'src/core/constants';
import BrandRepository from '../../domains/repositories/abstraction';
import { Inject, Injectable } from '@nestjs/common';
import { BrandNotFoundError } from '../error';
import type { ICacheClient } from 'src/infra/caching/type';

@Injectable()
export class ToggleBrandUseCase implements IUseCase<string, void> {
  constructor(
    @Inject(BRAND_REPOSITORY) private readonly repo: BrandRepository,
    @Inject(REDIS_CLIENT) private readonly cache: ICacheClient,
  ) {}

  async handle(id: string) {
    const brand = await this.repo.findById(id);

    if (!brand) {
      throw new BrandNotFoundError(id);
    }
    if (brand.isActive) {
      await this.repo.deactivate(id);
    } else {
      await this.repo.activate(id);
    }
    await this.cache.delete('brands');
  }
}
