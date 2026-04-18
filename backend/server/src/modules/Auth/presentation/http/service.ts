import { Injectable } from '@nestjs/common';
import LoginUseCase from '../../applicatoins/use-cases/loginUseCase';
import { LoginDto } from '../../applicatoins/dto/login.dto';

@Injectable()
export default class AuthService {
  constructor(private readonly LoginUseCase: LoginUseCase) {}

  public async login(data: LoginDto) {
    const response = await this.LoginUseCase.handle(data);
    return {
      data: response,
    };
  }
}
