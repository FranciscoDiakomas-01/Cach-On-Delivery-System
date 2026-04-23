import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Paymethod } from '../../domain/entities/Paymethod';
import { CreateAddressDto } from './CreateAddressDto';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateOrderDTO {
  @IsOptional()
  @IsString()
  @ApiProperty()
  couponId?: string;

  @IsEnum(Paymethod)
  @ApiProperty({
    enum: Paymethod,
  })
  paymentMethod!: Paymethod;

  @ValidateNested()
  @ApiProperty()
  @Type(() => CreateAddressDto)
  address!: CreateAddressDto;
}
