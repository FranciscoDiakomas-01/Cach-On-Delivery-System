import { Module } from '@nestjs/common';
import { ProductEventHandler } from './application/handlers/ProductEventHandler';

@Module({
  providers: [ProductEventHandler],
  exports: [ProductEventHandler],
})
export class EventModule {}
