import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CreateReviewUseCase,
  GetReviewsByOrderUseCase,
} from '../../application/usecase/usecases';
import CreateReviewDto from '../../application/dto/CreateReviewDto';
import { CurrentUserId } from 'src/modules/Auth/presentation/http/decorator';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly createReview: CreateReviewUseCase,
    private readonly getByOrder: GetReviewsByOrderUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar review' })
  @ApiResponse({ status: 201, description: 'Review criada com sucesso' })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação ou regra de negócio',
  })
  async create(@Body() dto: CreateReviewDto, @CurrentUserId() userId: string) {
    return this.createReview.handle({
      ...dto,
      userId,
    });
  }

  @Get('order/:orderId')
  @ApiOperation({ summary: 'Buscar reviews por order' })
  @ApiResponse({ status: 200, description: 'Lista de reviews da order' })
  async get(
    @Param('orderId') orderId: string,
    @CurrentUserId() userId: string,
  ) {
    return this.getByOrder.handle(orderId, userId);
  }
}
