import { Inject, Injectable } from '@nestjs/common';
import { BRAND_REPOSITORY, REDIS_CLIENT } from 'src/core/constants';
import BrandRepository from '../../domains/repositories/abstraction';
import { BrandAlreadyExistsError } from '../error';
import { CreateBrandDto } from '../dto/CreateBrandDto';
import { slugify } from 'src/modules/category/application/shared/utils';
import { IUseCase } from 'src/core/types';
import Brand from '../../domains/entities/Brand';
import type { ICacheClient } from 'src/infra/caching/type';

@Injectable()
export class CreateBrandUseCase implements IUseCase<CreateBrandDto, Brand> {
  constructor(
    @Inject(BRAND_REPOSITORY) private readonly repo: BrandRepository,
    @Inject(REDIS_CLIENT) private readonly cache: ICacheClient,
  ) {}

  async handle(data: CreateBrandDto) {
    const exists = await this.repo.findByTitle(data.title);
    if (exists) {
      throw new BrandAlreadyExistsError(data.title);
    }

    const slug = slugify(data.title);

    const brand = await this.repo.create({
      slug,
      isActive: true,
      createdAt: new Date(),
      description: data.description,
      id: crypto.randomUUID(),
      logo: data.logo,
      title: data.title,
      updatedAt: new Date(),
    });
    await this.cache.delete('brands');
    return brand;
  }
}
