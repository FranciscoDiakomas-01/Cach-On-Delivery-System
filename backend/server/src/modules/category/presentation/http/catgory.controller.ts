import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import CategoryService from './category.service';
import { UpdateCategoryDto } from '../../application/dto/update';
import { CreateCategoryDto } from '../../application/dto/create';
import { ApiOperation } from '@nestjs/swagger';

@Controller('category')
export default class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  @ApiOperation({
    summary: 'Listagem de categorias',
  })
  public async get() {
    const data = await this.service.get();
    return data;
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Detalhe de categoria',
  })
  public async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.service.getById(id);
  }
  @Put('/:id')
  @ApiOperation({
    summary: 'toogle de categoria',
  })
  public async toogle(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.service.toogle(id);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Actualização de categoria',
  })
  public async update(
    @Body() data: UpdateCategoryDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.service.update(data, id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criação de categoria',
  })
  public async create(@Body() data: CreateCategoryDto) {
    return await this.service.create(data);
  }
}
