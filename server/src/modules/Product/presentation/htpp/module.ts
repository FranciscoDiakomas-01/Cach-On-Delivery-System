import { Module } from '@nestjs/common';
import { ProductController } from './controller';
import CreateProductUseCase from '../../application/use-cases/createUseCase';
import { FindProductsByCategoryUseCase } from '../../application/use-cases/FindProductsByCategoryUseCase';
import GetProductByUniqueUseCase from '../../application/use-cases/getByUnique';
import GetProductUseCase from '../../application/use-cases/getProduct';
import { IncreaseStockUseCase } from '../../application/use-cases/IncreaseStockUseCase';
import ToogleProductUseCase from '../../application/use-cases/ToogleProductUseCase';
import { UpdateProductUseCase } from '../../application/use-cases/UpdateProductUseCase';

@Module({
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    FindProductsByCategoryUseCase,
    GetProductByUniqueUseCase,
    GetProductUseCase,
    IncreaseStockUseCase,
    ToogleProductUseCase,
    UpdateProductUseCase,
  ],
  exports: [
    CreateProductUseCase,
    FindProductsByCategoryUseCase,
    GetProductByUniqueUseCase,
    GetProductUseCase,
    IncreaseStockUseCase,
    ToogleProductUseCase,
    UpdateProductUseCase,
  ],
})
export class ProductModule {}
