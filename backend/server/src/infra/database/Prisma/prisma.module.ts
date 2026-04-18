import { Global, Module } from '@nestjs/common';
import PrismaCategoryRepository from './repositories/category.repo';
import { AUTH_REPOSITORY, CATEGORY_REPOSITORY } from 'src/core/constants';
import { PrismaService } from './prisma';
import PrismaAuthRepository from './repositories/PrismaAuthRepository';
@Global()
@Module({
  providers: [
    {
      provide: CATEGORY_REPOSITORY,
      useClass: PrismaCategoryRepository,
    },
    {
      provide: AUTH_REPOSITORY,
      useClass: PrismaAuthRepository,
    },
    PrismaService,
  ],
  exports: [CATEGORY_REPOSITORY, PrismaService, AUTH_REPOSITORY],
})
export default class PrismaModule {}
