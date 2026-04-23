import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  Min,
  IsUUID,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class ToCartDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID of the product to add to the cart',
    example: 'prod_12345',
  })
  productId!: string;

  @IsInt()
  @ApiProperty({
    description: 'Quantity of the product to add',
    example: 2,
  })
  @IsPositive()
  @Min(1)
  quantity!: number;
}
