import { Module } from '@nestjs/common';
import CreateCategoryUseCase from '../../application/use-cases/createCategoryUsecase';
import CategoryService from './category.service';
import GetCategoryByIdUseCase from '../../application/use-cases/getCategoryByIdUsecase';
import GetCategoryUseCase from '../../application/use-cases/getCategoryUsecase';
import UpdateCategoryUseCase from '../../application/use-cases/updateCategoryUseCase';
import CategoryController from './catgory.controller';
import ToglgleCategoryUseCase from '../../application/use-cases/toglgleCategoryUseCase';

@Module({
  providers: [
    CreateCategoryUseCase,
    CategoryService,
    GetCategoryByIdUseCase,
    GetCategoryUseCase,
    UpdateCategoryUseCase,
    ToglgleCategoryUseCase,
  ],
  exports: [
    CreateCategoryUseCase,
    CategoryService,
    GetCategoryByIdUseCase,
    GetCategoryUseCase,
    UpdateCategoryUseCase,
    ToglgleCategoryUseCase,
  ],
  controllers: [CategoryController],
})
export default class CategoryModule {}
