import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID, Max, Min } from 'class-validator';

export default class CreateReviewDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  @IsString()
  orderId!: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  content!: string;
}
