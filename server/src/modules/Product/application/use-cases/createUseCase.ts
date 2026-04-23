import { IUseCase } from 'src/core/types';
import { Product } from '../../domains/entities/Product';
import { Inject, Injectable } from '@nestjs/common';
import {
  BRAND_REPOSITORY,
  CATEGORY_REPOSITORY,
  PRODUCT_REPOSITORY,
} from 'src/core/constants';
import ProductRepository from '../../domains/repositories/abstraction';
import { CreateProductDto } from '../dto/create';
import {
  generateSKU,
  slugify,
} from 'src/modules/category/application/shared/utils';
import CategoryRepository from 'src/modules/category/domains/repositories';
import CategoryNotFound from 'src/modules/category/application/shared/errors';
import BrandRepository from 'src/modules/Brands/domains/repositories/abstraction';
import { BrandNotFoundError } from 'src/modules/Brands/applications/error';

@Injectable()
export default class CreateProductUseCase implements IUseCase<
  CreateProductDto,
  Product
> {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repo: ProductRepository,
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepo: CategoryRepository,

    @Inject(BRAND_REPOSITORY) private readonly brandRepo: BrandRepository,
  ) {}

  public async handle(dto: CreateProductDto): Promise<Product> {
    const [category, slug, brand] = await Promise.all([
      this.categoryRepo.findById(dto.categoryId),
      this.generateUniqueSlug(dto.title),
      this.brandRepo.findById(dto.brandId),
    ]);
    if (!brand || !brand.isActive) {
      throw new BrandNotFoundError(dto.brandId);
    }
    if (!category || !category.isActive) {
      throw new CategoryNotFound('parent');
    }
    const sku = generateSKU(dto.title);
    const product = await this.repo.create({
      available: dto.available,
      isActive: true,
      brandId: dto.brandId,
      categoryId: category.id,
      createdAt: new Date(),
      description: dto.description,
      isFeatured: true,
      price: dto.price,
      id: crypto.randomUUID(),
      reserved: 0,
      sellCount: 0,
      sku,
      slug,
      title: dto.title,
      updatedAt: new Date(),
      compareAtPrice: dto.compareAtPrice,
      expiresAt: dto.expiresAt,
      imageUrl: dto.imageUrl,
    });
    return product;
  }

  private async generateUniqueSlug(title: string): Promise<string> {
    const baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 1;
    while (await this.repo.isLugDisponible(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    return slug;
  }
}
