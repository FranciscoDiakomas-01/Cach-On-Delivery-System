import { Module } from '@nestjs/common';
import AuthService from './service';
import LoginUseCase from '../../applicatoins/use-cases/loginUseCase';
import AuthController from './controller';
import ForgotUseCase from '../../applicatoins/use-cases/forgotUseCase';
import RecoveryTokenService from '../../domains/services/recovery';
import PasswordHasher from '../../domains/services/encript';
import JwtService from '../../domains/services/jwt';
import AuthEventSubService from '../../applicatoins/events/subscribe';
import RecoveryUseCase from '../../applicatoins/use-cases/recoverieUseCase';
import OAuthFactoryUseCase from '../../applicatoins/use-cases/oauthUseCase';
import OAuthFactory from '../../applicatoins/OAuth/factory/oauth.factory';
import OauthCallbackUseCase from '../../applicatoins/use-cases/oauthCallbackUseCase';
import RegisterUseCase from '../../applicatoins/use-cases/registerUseCase';

@Module({
  providers: [
    AuthService,
    LoginUseCase,
    ForgotUseCase,
    RecoveryTokenService,
    PasswordHasher,
    JwtService,
    AuthEventSubService,
    RecoveryUseCase,
    OAuthFactoryUseCase,
    OAuthFactory,
    OauthCallbackUseCase,
    RegisterUseCase,
  ],
  exports: [
    AuthModule,
    LoginUseCase,
    ForgotUseCase,
    RecoveryTokenService,
    PasswordHasher,
    JwtService,
    AuthEventSubService,
    RecoveryUseCase,
    OAuthFactoryUseCase,
    OAuthFactory,
    OauthCallbackUseCase,
    RegisterUseCase,
  ],
  controllers: [AuthController],
})
export default class AuthModule {}
