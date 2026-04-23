import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export default class CreateDeliveryManDto {
  @ApiProperty({
    example: 'Francisco',
    description: 'First name of the user',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  firstName!: string;

  @ApiProperty({
    example: 'Diakomas',
    description: 'Last name of the user',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  lastName!: string;

  @ApiProperty({
    example: 'francisco@gmail.com',
    description: 'User email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}
