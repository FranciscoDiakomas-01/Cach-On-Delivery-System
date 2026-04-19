import { Module } from '@nestjs/common';
import { BrandController } from './controller';

import { CreateBrandUseCase } from '../applications/use-cases/CreateBrandUseCase';
import { GetAllBrandsUseCase } from '../applications/use-cases/GetAllBrandsUseCase';
import { UpdateBrandUseCase } from '../applications/use-cases/UpdateBrandUseCase';
import { ToggleBrandUseCase } from '../applications/use-cases/ToggleBrandUseCase';
@Module({
  controllers: [BrandController],
  providers: [
    CreateBrandUseCase,
    GetAllBrandsUseCase,
    UpdateBrandUseCase,
    ToggleBrandUseCase,
  ],
})
export class BrandModule {}
