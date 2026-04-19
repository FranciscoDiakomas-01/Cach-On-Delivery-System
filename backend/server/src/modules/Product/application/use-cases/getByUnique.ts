import { IUseCase } from 'src/core/types';
import { Product } from '../../domains/entities/Product';
import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from 'src/core/constants';
import ProductRepository from '../../domains/repositories/abstraction';
import { ProductInactiveException, ProductNotFoundException } from '../erros';

@Injectable()
export default class GetProductByUniqueUseCase implements IUseCase<
  string,
  Product
> {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repo: ProductRepository,
  ) {}

  public async handle(unique: string): Promise<Product> {
    const product = await this.repo.getByUnique(unique);
    if (!product) {
      throw new ProductNotFoundException(unique);
    }
    if (!product.isActive) {
      throw new ProductInactiveException();
    }
    return product;
  }
}
