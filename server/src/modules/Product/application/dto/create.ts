import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 15 Pro' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Latest Apple smartphone with A17 chip' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 'brand_uuid_here' })
  @IsString()
  @IsUUID()
  brandId!: string;

  @ApiProperty({ example: 999.99 })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiPropertyOptional({ example: 1200 })
  @IsNumber()
  @IsOptional()
  compareAtPrice?: number;

  @ApiPropertyOptional({ example: 'https://image.com/product.png' })
  @IsString()
  imageUrl!: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @Min(0)
  @IsPositive()
  available!: number;

  @ApiPropertyOptional({ example: '2026-12-31T00:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  expiresAt?: Date;

  @ApiProperty({ example: 'category_uuid' })
  @IsString()
  @IsUUID()
  categoryId!: string;
}
