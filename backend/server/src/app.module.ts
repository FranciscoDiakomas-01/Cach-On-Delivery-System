import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import PrismaModule from './infra/database/Prisma/prisma.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CachingModule } from './infra/caching/module';
import CategoryModule from './modules/category/presentation/http/category.module';
import AuthModule from './modules/Auth/presentation/http/module';
import { envSchema } from './core/config/env';
import EmailModule from './infra/emails/module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { AuthMiddleware } from './modules/Auth/presentation/http/middleware';
import { ProductModule } from './modules/Product/presentation/htpp/module';
import { BrandModule } from './modules/Brands/presentation/module';
import { EventModule } from './modules/Event/module';
import WishListModule from './modules/Wishlist/presentation/htpp/module';
import { RecommendationModule } from './modules/Recomendation/presentation/controllers/module';

@Module({
  imports: [
    PrismaModule,
    CachingModule,
    CategoryModule,
    AuthModule,
    EmailModule,
    ProductModule,
    BrandModule,
    EventModule,
    WishListModule,
    RecommendationModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validate(config) {
        envSchema.parse(config);
        return config;
      },
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'auth/*path', method: RequestMethod.ALL })
      .exclude({ path: 'category', method: RequestMethod.GET })
      .exclude({ path: 'products', method: RequestMethod.GET })
      .exclude({ path: 'category/*path', method: RequestMethod.GET })
      .exclude({ path: 'products/*path', method: RequestMethod.GET })
      .exclude({ path: 'category', method: RequestMethod.GET })
      .exclude({ path: 'recommendations/*path', method: RequestMethod.GET })

      .forRoutes('*');
  }
}
