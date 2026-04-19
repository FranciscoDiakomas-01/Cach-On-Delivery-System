import { Module } from '@nestjs/common';
import PrismaModule from './infra/database/Prisma/prisma.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CachingModule } from './infra/caching/module';
import CategoryModule from './modules/category/presentation/http/category.module';
import AuthModule from './modules/Auth/presentation/http/module';
import { envSchema } from './core/config/env';

@Module({
  imports: [
    PrismaModule,
    CachingModule,
    CategoryModule,
    AuthModule,
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
export class AppModule {}
