import { IUseCase } from 'src/core/types';
import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from 'src/core/constants';
import ProductRepository from '../../domains/repositories/abstraction';
import { ProductNotFoundException } from '../erros';

@Injectable()
export default class ToogleProductUseCase implements IUseCase<string, void> {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repo: ProductRepository,
  ) {}

  public async handle(unique: string): Promise<void> {
    const product = await this.repo.getByUnique(unique);
    if (!product) {
      throw new ProductNotFoundException(unique);
    }
    if (product.isActive) {
      await this.repo.deactivate(product.id);
      return;
    }
    await this.repo.activate(product.id);
  }
}
