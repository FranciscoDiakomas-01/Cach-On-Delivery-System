import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { GetRecomendationUseCase } from '../../application/use-cases/get-recommendation.usecase';

@Controller('recommendations')
export class RecommendationController {
  constructor(private readonly useCase: GetRecomendationUseCase) {}

  @Get(':userId')
  async getRecommendations(
    @Query('limit', new ParseIntPipe()) limit: number,
    @Param('userId') userId: string,
    @Query('page') page: number,
    @Query('cursor') cursor?: string,
  ) {
    return this.useCase.handle({
      userId,
      limit: Number(limit) || 10,
      cursor,
      page: Number(page) || 1,
    });
  }
}
