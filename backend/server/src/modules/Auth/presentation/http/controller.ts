import { Body, Controller, Post } from '@nestjs/common';
import AuthService from './service';
import { ApiOperation } from '@nestjs/swagger';
import { LoginDto } from '../../applicatoins/dto/login.dto';

@Controller('v1/auth')
export default class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login em conta',
  })
  public async login(@Body() data: LoginDto) {
    return await this.service.login(data);
  }
}
