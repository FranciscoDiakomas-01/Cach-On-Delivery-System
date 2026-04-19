/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { IsString, ValidateIf, IsEmail } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import AuthProvider from '../../domains/entities/AuthProvider';

export class LoginDto {
  @ApiPropertyOptional({
    description: 'User email ',
    example: 'user@email.com',
  })
  @ValidateIf((o) => o.provider === AuthProvider.APP)
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({
    description: 'User password ',
    example: '123456',
  })
  @ValidateIf((o) => o.provider === AuthProvider.APP)
  @IsString()
  password!: string;
}
