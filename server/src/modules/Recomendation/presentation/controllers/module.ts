import { Module } from '@nestjs/common';
import { RecommendationController } from './recommendation.controller';
import { GetRecomendationUseCase } from '../../application/use-cases/get-recommendation.usecase';

@Module({
  controllers: [RecommendationController],
  providers: [GetRecomendationUseCase],
})
export class RecommendationModule {}
