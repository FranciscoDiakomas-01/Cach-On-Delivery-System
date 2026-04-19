import { IPagination, IPagintionProps, IUseCase } from 'src/core/types';
import { Product } from '../../domains/entities/Product';
import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from 'src/core/constants';
import ProductRepository from '../../domains/repositories/abstraction';

@Injectable()
export class FindProductsByCategoryUseCase implements IUseCase<
  { categoryId: string; pagination: IPagintionProps },
  IPagination<Product>
> {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repo: ProductRepository,
  ) {}

  async handle({
    categoryId,
    pagination,
  }: {
    categoryId: string;
    pagination: IPagintionProps;
  }) {
    return this.repo.findByCategory(categoryId, pagination);
  }
}
