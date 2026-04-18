import { Module } from '@nestjs/common';
import CreateCategoryUseCase from '../../application/use-cases/createCategoryUsecase';
import CategoryService from './category.service';
import GetCategoryByIdUseCase from '../../application/use-cases/getCategoryByIdUsecase';
import GetCategoryUseCase from '../../application/use-cases/getCategoryUsecase';
import UpdateCategoryUseCase from '../../application/use-cases/updateCategoryUseCase';
import CategoryController from './catgory.controller';

@Module({
  providers: [
    CreateCategoryUseCase,
    CategoryService,
    GetCategoryByIdUseCase,
    GetCategoryUseCase,
    UpdateCategoryUseCase,
  ],
  exports: [
    CreateCategoryUseCase,
    CategoryService,
    GetCategoryByIdUseCase,
    GetCategoryUseCase,
    UpdateCategoryUseCase,
  ],
  controllers: [CategoryController],
})
export default class CategoryModule {}
