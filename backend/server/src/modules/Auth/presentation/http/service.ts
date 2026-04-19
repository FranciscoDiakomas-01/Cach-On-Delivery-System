import { Injectable } from '@nestjs/common';
import LoginUseCase from '../../applicatoins/use-cases/loginUseCase';
import { LoginDto } from '../../applicatoins/dto/login.dto';
import ForgotUseCase from '../../applicatoins/use-cases/forgotUseCase';
import { ForgotDto } from '../../applicatoins/dto/forgot.dto';
import RecoveryUseCase from '../../applicatoins/use-cases/recoverieUseCase';
import { RecoveryDTO } from '../../applicatoins/dto/recovery.dto';
import OAuthFactoryUseCase from '../../applicatoins/use-cases/oauthUseCase';
import AuthProvider from '../../domains/entities/AuthProvider';
import OauthCallbackUseCase from '../../applicatoins/use-cases/oauthCallbackUseCase';
import { OAuthProviderDto } from '../../applicatoins/dto/oauth.dto';
import RegisterUseCase from '../../applicatoins/use-cases/registerUseCase';
import RegisterDto from '../../applicatoins/dto/register.dto';

@Injectable()
export default class AuthService {
  constructor(
    private readonly LoginUseCase: LoginUseCase,
    private readonly ForgotUseCase: ForgotUseCase,
    private readonly RecoveryUseCase: RecoveryUseCase,
    private readonly OAuthFactoryUseCase: OAuthFactoryUseCase,
    private readonly OauthCallbackUseCase: OauthCallbackUseCase,
    private readonly RegisterUseCase: RegisterUseCase,
  ) {}

  public async register(data: RegisterDto) {
    const response = await this.RegisterUseCase.handle(data);
    return {
      data: response,
    };
  }
  public async login(data: LoginDto) {
    const response = await this.LoginUseCase.handle(data);
    return {
      data: response,
    };
  }

  public socialLogin(provider: AuthProvider) {
    const response = this.OAuthFactoryUseCase.handle(provider);
    return response;
  }

  public async callback(data: OAuthProviderDto) {
    const response = await this.OauthCallbackUseCase.handle(data);
    return {
      data: response,
    };
  }
  public async forgot(data: ForgotDto) {
    await this.ForgotUseCase.handle(data.email);
    return {
      message: `Enviamos um email para ${data.email} com as informações de recuperação de conta`,
    };
  }
  public async recovery(data: RecoveryDTO) {
    await this.RecoveryUseCase.handle(data);
    return {
      message: `Sua senha foi redefinida`,
    };
  }
}
