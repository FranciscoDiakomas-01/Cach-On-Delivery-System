import { Module, Global } from '@nestjs/common';
import { RedisService } from './Redis/redis';
import { REDIS_CLIENT } from 'src/core/constants';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useClass: RedisService,
    },
  ],
  exports: [REDIS_CLIENT],
})
export class CachingModule {}
