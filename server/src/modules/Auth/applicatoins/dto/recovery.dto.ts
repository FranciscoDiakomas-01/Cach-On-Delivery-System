import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RecoveryDTO {
  @IsStrongPassword()
  @IsNotEmpty()
  @ApiProperty()
  password!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  token!: string;
}
