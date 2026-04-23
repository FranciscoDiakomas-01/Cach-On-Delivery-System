import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  page!: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  limit!: number;

  @IsOptional()
  @IsString()
  search?: string;
}
