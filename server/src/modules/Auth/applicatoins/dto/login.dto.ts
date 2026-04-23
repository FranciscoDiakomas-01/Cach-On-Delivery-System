import { IsString, IsEmail } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
  @ApiPropertyOptional({
    description: 'User email ',
    example: 'user@email.com',
  })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({
    description: 'User password ',
    example: '123456',
  })
  @IsString()
  password!: string;
}
