import { IPagination, IPagintionProps, IUseCase } from 'src/core/types';
import { Product } from '../../domains/entities/Product';
import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from 'src/core/constants';
import ProductRepository from '../../domains/repositories/abstraction';

@Injectable()
export default class GetProductUseCase implements IUseCase<
  IPagintionProps,
  IPagination<Product>
> {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repo: ProductRepository,
  ) {}

  public async handle(props: IPagintionProps): Promise<IPagination<Product>> {
    let { limit } = props;
    const { page, search } = props;
    if (limit >= 30) {
      limit = 10;
    }
    const data = await this.repo.get({
      limit,
      page,
      search,
    });
    return data;
  }
}
