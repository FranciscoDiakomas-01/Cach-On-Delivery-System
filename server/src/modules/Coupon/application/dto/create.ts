import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { DiscountType } from '../../domain/interfaces';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateCoupunDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    enum: DiscountType,
  })
  @IsEnum(DiscountType)
  type!: DiscountType;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @IsPositive()
  value!: number;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @IsPositive()
  minPurchase!: number;
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  @IsPositive()
  maxUses!: number;
}
