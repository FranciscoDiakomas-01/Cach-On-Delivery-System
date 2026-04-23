import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotDto {
  @ApiProperty({
    description: 'User email ',
    example: 'user@email.com',
  })
  @IsEmail()
  email!: string;
}
