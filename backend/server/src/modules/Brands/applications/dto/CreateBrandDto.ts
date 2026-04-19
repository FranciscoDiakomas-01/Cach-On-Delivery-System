import { IsString, IsOptional, MinLength, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({
    example: 'Nike',
    description: 'Nome da brand',
  })
  @IsString()
  @MinLength(2)
  title!: string;

  @ApiProperty({
    example: 'Marca global de artigos desportivos',
    description: 'Descrição da brand',
  })
  @IsString()
  @MinLength(5)
  description!: string;

  @ApiPropertyOptional({
    example: 'https://logo.com/nike.png',
    description: 'URL do logo da brand',
  })
  @IsOptional()
  @IsUrl()
  logo!: string;
}
