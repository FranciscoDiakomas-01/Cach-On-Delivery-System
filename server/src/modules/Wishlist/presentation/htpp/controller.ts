/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import ToggleToWishListUseCase from '../../application/usecase/toggletoListUseCase';
import GetWishListUseCase from '../../application/usecase/getMyListUseCase';
import { CurrentUserId } from 'src/modules/Auth/presentation/http/decorator';
import { ApiOperation } from '@nestjs/swagger';
import { PaginationDto } from 'src/core/dto/PaginationDto';

@Controller('wishlist')
export default class WishlistController {
  constructor(
    private readonly toogleUC: ToggleToWishListUseCase,
    private readonly getUC: GetWishListUseCase,
  ) {}

  @Post(':productid')
  @ApiOperation({
    summary: 'Adiciona ou remove um produto da lista de desejo',
  })
  public async toogle(
    @Param('productid', new ParseUUIDPipe()) productId: string,
    @CurrentUserId() userId: string,
  ) {
    return await this.toogleUC.handle({
      productId,
      userId,
    });
  }

  @Get()
  @ApiOperation({
    summary: 'Lista de desejo',
  })
  public async get(
    @CurrentUserId() userId: string,
    @Query() query: PaginationDto,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.getUC.handle({
      userId,
      pagination: {
        limit,
        page,
        search: undefined,
      },
    });
  }
}
