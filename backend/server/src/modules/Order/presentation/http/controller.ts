import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import CreateOrderUseCase from '../../application/use-cases/createOrderUsecase';
import GetOrdersUseCase from '../../application/use-cases/getOrderUseCase';
import UpdateOrderUseCase from '../../application/use-cases/updateOrderStatusUseCase';
import CreateOrderDTO from '../../application/dto/createOrderDto';
import { CurrentUserId } from 'src/modules/Auth/presentation/http/decorator';
import { ApiOperation } from '@nestjs/swagger';
import type { IPagintionProps } from 'src/core/types';
import { PaginationPipe } from 'src/core/pipes/pagination.pipe';
import UpdateOrderDto from '../../application/dto/UpdateOrderDto';

@Controller('order')
export default class OrderController {
  constructor(
    private readonly createOrderUc: CreateOrderUseCase,
    private readonly getOrderUC: GetOrdersUseCase,
    private readonly updateOrderUC: UpdateOrderUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um pedido',
  })
  public async create(
    @Body() dto: CreateOrderDTO,
    @CurrentUserId() userId: string,
  ) {
    const data = await this.createOrderUc.handle({
      ...dto,
      userId,
    });

    return {
      data,
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Listagem de pedidos',
  })
  public async getOrders(
    @Query(new PaginationPipe()) q: IPagintionProps,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @CurrentUserId() userId: string,
  ) {
    const data = await this.getOrderUC.get(
      {
        limit,
        page,
        search: '',
      },
      userId,
    );
    return data;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Detalhes de um pedido',
  })
  public async getById(
    @CurrentUserId() userId: string,
    @Param('id', new ParseUUIDPipe()) orderId: string,
  ) {
    const data = await this.getOrderUC.getById(userId, orderId);
    return data;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar status de pedido',
  })
  public async updateOrderStatus(
    @Body() data: UpdateOrderDto,
    @CurrentUserId() userId: string,
  ) {
    const updated = await this.updateOrderUC.handle({
      ...data,
      userId,
    });

    return {
      data: updated,
    };
  }
}
