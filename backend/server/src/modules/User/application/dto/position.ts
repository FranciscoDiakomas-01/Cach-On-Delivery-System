import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export default class UpdatePositionDto {
  @ApiProperty({
    example: '-23.55052',
    description: 'Latitude of the user location',
  })
  @IsNumber()
  @IsNotEmpty()
  lat!: number;
  @ApiProperty({
    example: '-46.633308',
    description: 'Longitude of the user location',
  })
  @IsNumber()
  @IsNotEmpty()
  long!: number;
}
