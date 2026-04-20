import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateBrandUseCase } from '../applications/use-cases/CreateBrandUseCase';
import { GetAllBrandsUseCase } from '../applications/use-cases/GetAllBrandsUseCase';
import { UpdateBrandUseCase } from '../applications/use-cases/UpdateBrandUseCase';
import { CreateBrandDto } from '../applications/dto/CreateBrandDto';
import { ToggleBrandUseCase } from '../applications/use-cases/ToggleBrandUseCase';
import { AdminGuard } from 'src/modules/User/presentation/http/guards/AdminGuard';

@Controller('brands')
@ApiTags('Brands')
export class BrandController {
  constructor(
    private readonly createUC: CreateBrandUseCase,
    private readonly getAllUC: GetAllBrandsUseCase,
    private readonly updateUC: UpdateBrandUseCase,
    private readonly toggleUC: ToggleBrandUseCase,
  ) {}

  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Criar brand' })
  create(@Body() dto: CreateBrandDto) {
    return this.createUC.handle(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar brands' })
  async getAll() {
    return await this.getAllUC.handle();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar brand por ID' })
  get(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.getAllUC.getById(id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Atualizar brand' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: CreateBrandDto,
  ) {
    return this.updateUC.handle({
      data: dto,
      id,
    });
  }

  @Patch(':id/toggle')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Ativar/Desativar brand' })
  async toggle(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.toggleUC.handle(id);
    return {
      message: 'actualizado com sucesso',
    };
  }
}
