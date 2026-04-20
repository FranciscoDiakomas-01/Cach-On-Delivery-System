import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Patch,
  Put,
  ParseIntPipe,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import CreateProductUseCase from '../../application/use-cases/createUseCase';
import { FindProductsByCategoryUseCase } from '../../application/use-cases/FindProductsByCategoryUseCase';
import GetProductByUniqueUseCase from '../../application/use-cases/getByUnique';
import GetProductUseCase from '../../application/use-cases/getProduct';
import { IncreaseStockUseCase } from '../../application/use-cases/IncreaseStockUseCase';
import ToogleProductUseCase from '../../application/use-cases/ToogleProductUseCase';
import type { IPagintionProps } from 'src/core/types';
import { PaginationPipe } from 'src/core/pipes/pagination.pipe';
import { CreateProductDto } from '../../application/dto/create';
import { UpdateProductUseCase } from '../../application/use-cases/UpdateProductUseCase';
import { CurrentUserId } from 'src/modules/Auth/presentation/http/decorator';
import { AdminGuard } from 'src/modules/User/presentation/http/guards/AdminGuard';

@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(
    private readonly createProductUC: CreateProductUseCase,
    private readonly findByCategoryUC: FindProductsByCategoryUseCase,
    private readonly getByUniqueUC: GetProductByUniqueUseCase,
    private readonly getProductsUC: GetProductUseCase,
    private readonly increaseStockUC: IncreaseStockUseCase,
    private readonly toggleProductUC: ToogleProductUseCase,
    private readonly UpdateProductUC: UpdateProductUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar produtos com paginação' })
  async getAll(@Query(new PaginationPipe()) query: IPagintionProps) {
    return this.getProductsUC.handle(query);
  }

  @Get(':unique')
  @ApiOperation({ summary: 'Buscar produto por dados únicos' })
  async getById(
    @Param('unique') unique: string,
    @CurrentUserId() userId: string,
  ) {
    const data = await this.getByUniqueUC.handle({
      unique,
      userId,
    });
    return data;
  }

  @Get('category/:id')
  @ApiOperation({ summary: 'Listar produtos por categoria' })
  async getByCategory(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query(new PaginationPipe()) query: IPagintionProps,
  ) {
    return this.findByCategoryUC.handle({
      categoryId: id,
      pagination: query,
    });
  }

  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Criar novo produto' })
  async create(@Body() body: CreateProductDto) {
    return this.createProductUC.handle(body);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Actualizar um produto' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: CreateProductDto,
  ) {
    return this.UpdateProductUC.handle({ data, id });
  }

  @Patch(':id/increase-stock')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Aumentar estoque do produto' })
  async increaseStock(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body('qty', new ParseIntPipe()) qty: number,
  ) {
    return this.increaseStockUC.handle({ productId: id, qty });
  }

  @Patch(':id/toggle')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Ativar ou desativar produto' })
  async toggle(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.toggleProductUC.handle(id);
  }
}
