import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import AuthService from './service';
import { ApiOperation } from '@nestjs/swagger';
import { LoginDto } from '../../applicatoins/dto/login.dto';
import { ForgotDto } from '../../applicatoins/dto/forgot.dto';
import { RecoveryDTO } from '../../applicatoins/dto/recovery.dto';
import type { Response } from 'express';
import AuthProvider from '../../domains/entities/AuthProvider';
import RegisterDto from '../../applicatoins/dto/register.dto';

@Controller('auth')
export default class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Criação de  conta',
  })
  public async register(@Body() dto: RegisterDto, @Res() res: Response) {
    const { data } = await this.service.register(dto);
    res.cookie('accessToken', data.token, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });
    return res.send(data.entitie);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login em conta',
  })
  public async login(@Body() dto: LoginDto, @Res() res: Response) {
    const { data } = await this.service.login(dto);
    res.cookie('accessToken', data.token, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });
    return res.send(data.entitie);
  }

  @Get('social/:provider')
  @ApiOperation({
    summary: 'Get Social login Link',
  })
  public social(
    @Param('provider') provider: AuthProvider,
    @Res() res: Response,
  ) {
    const link = this.service.socialLogin(provider);
    res.redirect(link);
  }

  @Get('callback/:provider')
  @ApiOperation({
    summary: 'Get Social login Link',
  })
  public async callback(
    @Param('provider') provider: string,
    @Query('code') code: string,
    @Res() res: Response,
  ) {
    const { token, entitie } = await this.service.callback({
      code,
      provider,
    });
    res.cookie('accessToken', token, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });
    return res.send(entitie);
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
