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
  ],
  controllers: [AuthController],
})
export default class AuthModule {}
