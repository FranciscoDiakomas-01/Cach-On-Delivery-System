import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import GetCartUseCase from '../../application/useCase/getCardUseCase';
import AddToCartUseCase from '../../application/useCase/addtoCardUseCase';
import RemoveFromCartUseCase from '../../application/useCase/removeToCardUseCase';
import { ApiOperation } from '@nestjs/swagger';
import { ToCartDto } from '../../application/dto';
import { CurrentUserId } from 'src/modules/Auth/presentation/http/decorator';

@Controller('cart')
export default class CartController {
  constructor(
    private readonly GetUc: GetCartUseCase,
    private readonly AddUc: AddToCartUseCase,
    private readonly RemoveUc: RemoveFromCartUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Adicinar um item ao carrinho',
    description: 'Adicinar um item ao carrinho',
  })
  async addToCart(@Body() dto: ToCartDto, @CurrentUserId() userId: string) {
    return await this.AddUc.execute(dto, userId);
  }

  @Patch()
  @ApiOperation({
    summary: 'Remover um item do carrinho',
    description: 'Remover um item do carrinho',
  })
  async removeFromCart(
    @Body() dto: ToCartDto,
    @CurrentUserId() userId: string,
  ) {
    return await this.RemoveUc.execute(dto, userId);
  }

  @Get()
  @ApiOperation({
    summary: 'Obter o carrinho',
    description: 'Obter o carrinho',
  })
  async getCart(@CurrentUserId() userId: string) {
    return await this.GetUc.execute(userId);
  }
}
