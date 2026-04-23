import { IUseCase } from 'src/core/types';
import { Inject, Injectable } from '@nestjs/common';
import {
  BRAND_REPOSITORY,
  CATEGORY_REPOSITORY,
  PRODUCT_REPOSITORY,
} from 'src/core/constants';
import ProductRepository from '../../domains/repositories/abstraction';
import { ProductInactiveException, ProductNotFoundException } from '../erros';
import { CreateProductDto } from '../dto/create';
import { Product } from '../../domains/entities/Product';
import CategoryRepository from 'src/modules/category/domains/repositories';
import BrandRepository from 'src/modules/Brands/domains/repositories/abstraction';
import { BrandNotFoundError } from 'src/modules/Brands/applications/error';
import CategoryNotFound from 'src/modules/category/application/shared/errors';

@Injectable()
export class UpdateProductUseCase implements IUseCase<
  { id: string; data: CreateProductDto },
  Product
> {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repo: ProductRepository,
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepo: CategoryRepository,
    @Inject(BRAND_REPOSITORY) private readonly brandRepo: BrandRepository,
  ) {}

  public async handle({
    id,
    data,
  }: {
    id: string;
    data: CreateProductDto;
  }): Promise<Product> {
    const [category, brand, product] = await Promise.all([
      this.categoryRepo.findById(data.categoryId),
      this.brandRepo.findById(data.brandId),
      this.repo.getByUnique(id),
    ]);
    if (!brand || !brand.isActive) {
      throw new BrandNotFoundError(data.brandId);
    }
    if (!category || !category.isActive) {
      throw new CategoryNotFound('parent');
    }
    if (!product) {
      throw new ProductNotFoundException(id);
    }

    if (!product.isActive) {
      throw new ProductInactiveException();
    }
    const updedProduct = await this.repo.update(id, data);
    return updedProduct;
  }
}
