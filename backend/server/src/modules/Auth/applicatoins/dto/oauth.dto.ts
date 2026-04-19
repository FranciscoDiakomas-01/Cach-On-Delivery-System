import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OAuthProviderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  provider!: string;
}
