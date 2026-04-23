import { Module } from '@nestjs/common';
import { ReviewController } from './controller';
import {
  CreateReviewUseCase,
  GetReviewsByOrderUseCase,
} from '../../application/usecase/usecases';
import OrderModule from 'src/modules/Order/presentation/http/module';
import { UserModule } from 'src/modules/User/presentation/http/module';

@Module({
  controllers: [ReviewController],
  providers: [CreateReviewUseCase, GetReviewsByOrderUseCase],
  imports: [OrderModule, UserModule],
})
export class ReviewModule {}
