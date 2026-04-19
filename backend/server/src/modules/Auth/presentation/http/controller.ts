import { Body, Controller, Post } from '@nestjs/common';
import AuthService from './service';
import { ApiOperation } from '@nestjs/swagger';
import { LoginDto } from '../../applicatoins/dto/login.dto';
import { ForgotDto } from '../../applicatoins/dto/forgot.dto';
import { RecoveryDTO } from '../../applicatoins/dto/recovery.dto';

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
  @Post('forgot')
  @ApiOperation({
    summary: 'Forgot em conta',
  })
  public async forgot(@Body() data: ForgotDto) {
    return await this.service.forgot(data);
  }
  @Post('recovery')
  @ApiOperation({
    summary: 'Recovery em conta',
  })
  public async recovery(@Body() data: RecoveryDTO) {
    return await this.service.recovery(data);
  }
}
