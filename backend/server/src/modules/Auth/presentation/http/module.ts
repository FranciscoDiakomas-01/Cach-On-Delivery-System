import { Module } from '@nestjs/common';
import AuthService from './service';
import LoginUseCase from '../../applicatoins/use-cases/loginUseCase';
import AuthController from './controller';

@Module({
  providers: [AuthService, LoginUseCase],
  exports: [AuthModule, LoginUseCase],
  controllers: [AuthController],
})
export default class AuthModule {}
