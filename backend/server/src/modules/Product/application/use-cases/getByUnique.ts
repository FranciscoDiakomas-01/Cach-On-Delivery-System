import { IUseCase } from 'src/core/types';
import { Product } from '../../domains/entities/Product';
import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from 'src/core/constants';
import ProductRepository from '../../domains/repositories/abstraction';
import { ProductInactiveException, ProductNotFoundException } from '../erros';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export default class GetProductByUniqueUseCase implements IUseCase<
  { unique: string; userId: string },
  Product
> {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repo: ProductRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async handle({
    unique,
    userId,
  }: {
    unique: string;
    userId: string;
  }): Promise<Product> {
    const product = await this.repo.getByUnique(unique);
    if (!product) {
      throw new ProductNotFoundException(unique);
    }
    if (!product.isActive) {
      throw new ProductInactiveException();
    }
    this.eventEmitter.emit('product.clicked', {
      userid: userId,
      productid: product.id,
    });
    return product;
  }
}
