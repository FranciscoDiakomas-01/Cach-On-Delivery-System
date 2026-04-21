import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsLatitude,
  IsLongitude,
  MaxLength,
} from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty()
  recipientName!: string;

  @IsPhoneNumber('AO')
  @ApiProperty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  country!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  state!: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  city!: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  district?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  street!: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  houseNumber?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  postalCode?: string;

  @IsLatitude()
  lat!: number;

  @IsLongitude()
  @ApiProperty()
  lng!: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  reference?: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  instructions?: string;
}
