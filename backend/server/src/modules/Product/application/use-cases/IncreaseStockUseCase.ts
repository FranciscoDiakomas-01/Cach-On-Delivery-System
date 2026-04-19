import { IUseCase } from 'src/core/types';
import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from 'src/core/constants';
import ProductRepository from '../../domains/repositories/abstraction';
import { ProductInactiveException, ProductNotFoundException } from '../erros';

@Injectable()
export class IncreaseStockUseCase implements IUseCase<
  { productId: string; qty: number },
  void
> {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repo: ProductRepository,
  ) {}

  async handle({ productId, qty }: { productId: string; qty: number }) {
    if (qty <= 0) {
      throw new Error('Quantidade inválida');
    }
    const product = await this.repo.getByUnique(productId);
    if (!product) {
      throw new ProductNotFoundException(productId);
    }
    if (!product.isActive) {
      throw new ProductInactiveException();
    }
    await this.repo.increaseStock(productId, qty);
  }
}
