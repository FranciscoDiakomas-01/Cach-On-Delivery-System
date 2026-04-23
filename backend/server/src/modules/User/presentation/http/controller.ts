/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  ParseUUIDPipe,
  Patch,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import CreateDeliveryManDto from '../../application/dto/createDelivery';
import { CreateDeliveryManUseCase } from '../../application/use-cases/createDeliveryManUseCase';
import UpdateProfileDto from '../../application/dto/updateProfile';
import { UpdateProfileUseCase } from '../../application/use-cases/updateUserUseCase';
import { ToggleActiveUserUseCase } from '../../application/use-cases/toogleUserUseCase';
import {
  GetUserByUniqueIdUseCase,
  GetUsersUseCase,
} from '../../application/use-cases/getUsersUseCase';
import { UpdateCredentialsUseCase } from '../../application/use-cases/updateCredentialsUsecase';
import UpdateCredentialDto from '../../application/dto/updateCredential';
import { AdminGuard } from './guards/AdminGuard';
import { CurrentUserId } from 'src/modules/Auth/presentation/http/decorator';
import { PaginationDto } from 'src/core/dto/PaginationDto';

@Controller('user')
export class UserController {
  constructor(
    private readonly CreateUC: CreateDeliveryManUseCase,
    private readonly UpdateProfileUC: UpdateProfileUseCase,
    private readonly ToggleActiveUC: ToggleActiveUserUseCase,
    private readonly GetUC: GetUsersUseCase,
    private readonly GetByUniquUc: GetUserByUniqueIdUseCase,
    private readonly UpdateCredntialsUC: UpdateCredentialsUseCase,
  ) {}

  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({
    summary: 'Criar um delivery man',
  })
  async create(@Body() data: CreateDeliveryManDto) {
    await this.CreateUC.execute(data);
    return {
      message: 'Senha definida com sucesso',
    };
  }

  @Put('/profile')
  @ApiOperation({
    summary: 'Atualizar perfil do usuário',
    description: 'Permite atualizar as informações do perfil do usuário.',
  })
  async updateProfile(
    @Body() dto: UpdateProfileDto,
    @CurrentUserId() id: string,
  ) {
    await this.UpdateProfileUC.execute(id, dto);
    return {
      message: 'Perfil atualizado com sucesso',
    };
  }

  @Patch(':id/toogle-active')
  @UseGuards(AdminGuard)
  @ApiOperation({
    summary: 'Ativar ou desativar usuário',
    description: 'Permite ativar ou desativar um usuário.',
  })
  async toggleActive(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.ToggleActiveUC.execute(id);
    return {
      message: 'Status do usuário atualizado com sucesso',
    };
  }

  @Get()
  @UseGuards(AdminGuard)
  @ApiOperation({
    summary: 'Listar usuários',
    description: 'Permite listar todos os usuários cadastrados.',
  })
  async getAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query() q: PaginationDto,
  ) {
    return await this.GetUC.execute({
      limit,
      page,
    });
  }

  @Get('/me')
  @ApiOperation({
    summary: 'Obter meu perfil',
    description:
      'Permite obter as informações do perfil do usuário autenticado.',
  })
  async getMe(@CurrentUserId() id: string) {
    return this.GetByUniquUc.execute(id);
  }
  @Get(':id')
  @UseGuards(AdminGuard)
  @ApiOperation({
    summary: 'Obter usuário por ID',
    description:
      'Permite obter as informações de um usuário específico por ID.',
  })
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.GetByUniquUc.execute(id);
  }

  @Put('/credentials')
  @ApiOperation({
    summary: 'Atualizar credenciais do usuário',
    description: 'Permite atualizar as credenciais (senha) do usuário.',
  })
  async updateCredentials(
    @CurrentUserId() id: string,
    @Body() dto: UpdateCredentialDto,
  ) {
    await this.UpdateCredntialsUC.execute(id, dto);
    return {
      message: 'Credenciais atualizadas com sucesso',
    };
  }
}
