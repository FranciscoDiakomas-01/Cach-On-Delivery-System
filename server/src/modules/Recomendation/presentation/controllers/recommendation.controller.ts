import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetRecomendationUseCase } from '../../application/use-cases/get-recommendation.usecase';
import { ApiOperation } from '@nestjs/swagger';

@Controller('recommendations')
export class RecommendationController {
  constructor(private readonly useCase: GetRecomendationUseCase) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Get recommendations for a user' })
  async getRecommendations(
    @Param('userId') userId: string,
    @Query('page') page: number,
  ) {
    return this.useCase.handle({
      userId,
      page: Number(page) || 1,
    });
  }
}
