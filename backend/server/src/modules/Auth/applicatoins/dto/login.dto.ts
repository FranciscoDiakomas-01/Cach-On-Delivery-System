/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { IsEnum, IsString, ValidateIf, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import AuthProvider from '../../domains/entities/AuthProvider';

export class LoginDto {
  @ApiProperty({
    enum: AuthProvider,
    example: AuthProvider.APP,
  })
  @IsEnum(AuthProvider)
  provider!: AuthProvider;

  @ApiPropertyOptional({
    description: 'OAuth code (required if provider is not APP)',
    example: 'google-oauth-code',
  })
  @ValidateIf((o) => o.provider !== AuthProvider.APP)
  @IsString()
  code?: string;

  @ApiPropertyOptional({
    description: 'User email (required if provider is APP)',
    example: 'user@email.com',
  })
  @ValidateIf((o) => o.provider === AuthProvider.APP)
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'User password (required if provider is APP)',
    example: '123456',
  })
  @ValidateIf((o) => o.provider === AuthProvider.APP)
  @IsString()
  password?: string;
}
