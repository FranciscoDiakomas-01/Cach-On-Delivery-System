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
import CreateCoupunUseCase from '../../application/use-cases/createCoupunUsecase';
import GetCouponUseCase from '../../application/use-cases/getCoupunUsecae';
import ToggleCoupunUseCase from '../../application/use-cases/toogleCoupunUseCase';
import UpdateCoupunUseCase from '../../application/use-cases/updateUseCase';
import CreateCoupunDto from '../../application/dto/create';
import { ApiOperation } from '@nestjs/swagger';

@Controller('coupun')
export default class CoupunController {
  constructor(
    private readonly CreateCoupunUseCase: CreateCoupunUseCase,
    private readonly GetCouponUseCase: GetCouponUseCase,
    private readonly ToggleCoupunUseCase: ToggleCoupunUseCase,
    private readonly UpdateCoupunUseCase: UpdateCoupunUseCase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar coupuns',
  })
  public async get() {
    const data = await this.GetCouponUseCase.get();
    return data;
  }

  @Get(':unique')
  @ApiOperation({
    summary: 'Detalhe de coupun',
  })
  public async getUnique(@Param('unique') unique: string) {
    const data = await this.GetCouponUseCase.isDisponible(unique);
    return data;
  }

  @Post()
  @ApiOperation({
    summary: 'Criar de coupun',
  })
  public async create(@Body() data: CreateCoupunDto) {
    const created = await this.CreateCoupunUseCase.handle(data);
    return {
      data: created,
    };
  }
  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar de coupun',
  })
  public async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: CreateCoupunDto,
  ) {
    const updated = await this.UpdateCoupunUseCase.handle({
      ...dto,
      id,
    });
    return updated;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Toogle de coupun',
  })
  public async toogle(@Param('id', new ParseUUIDPipe()) id: string) {
    const message = await this.ToggleCoupunUseCase.handle({
      id,
    });
    return message;
  }
}
