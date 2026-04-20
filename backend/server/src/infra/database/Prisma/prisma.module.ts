import { Global, Module } from '@nestjs/common';
import PrismaCategoryRepository from './repositories/category.repo';
import {
  AUTH_REPOSITORY,
  BRAND_REPOSITORY,
  CATEGORY_REPOSITORY,
  COUPON_REPOSITORY,
  EVENT_REPOSITORY,
  PRODUCT_REPOSITORY,
  RECOMMENDATION_REPOSITORY,
  USER_REPOSITORY,
  WISHLIST_REPOSITORY,
} from 'src/core/constants';
import { PrismaService } from './prisma';
import PrismaAuthRepository from './repositories/PrismaAuthRepository';
import { PrismaProductRepository } from './repositories/PrismaProductRepository';
import PrismaBrandRepository from './repositories/PrismaBrandRepository';
import PrismaEventRepository from './repositories/PrismaEventRepository';
import PrismaWishlistRepository from './repositories/PrismaWishlistRepository';
import { PrismaRecommendationRepository } from './repositories/PrismaRecommendationRepository';
import PrismaCouponRepository from './repositories/PrismaCouponRepository';
import PrismaUserRepository from './repositories/PrismaUserRepository';
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
    {
      provide: PRODUCT_REPOSITORY,
      useClass: PrismaProductRepository,
    },
    {
      provide: BRAND_REPOSITORY,
      useClass: PrismaBrandRepository,
    },
    {
      provide: EVENT_REPOSITORY,
      useClass: PrismaEventRepository,
    },
    {
      provide: WISHLIST_REPOSITORY,
      useClass: PrismaWishlistRepository,
    },
    {
      provide: RECOMMENDATION_REPOSITORY,
      useClass: PrismaRecommendationRepository,
    },
    {
      provide: COUPON_REPOSITORY,
      useClass: PrismaCouponRepository,
    },
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },

    PrismaService,
  ],
  exports: [
    CATEGORY_REPOSITORY,
    COUPON_REPOSITORY,
    PrismaService,
    AUTH_REPOSITORY,
    PRODUCT_REPOSITORY,
    BRAND_REPOSITORY,
    EVENT_REPOSITORY,
    WISHLIST_REPOSITORY,
    RECOMMENDATION_REPOSITORY,
    USER_REPOSITORY,
  ],
})
export default class PrismaModule {}
