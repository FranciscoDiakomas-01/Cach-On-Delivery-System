/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUseCase } from 'src/core/types';
import { LoginDto } from '../dto/login.dto';
import { IAuthReturnType } from '../../domains/interface';
import { Inject, Injectable } from '@nestjs/common';
import AuthRepository from '../../domains/repositories/abstraction';
import { AUTH_REPOSITORY } from 'src/core/constants';
import PasswordHasher from '../../domains/services/encript';
import JwtService from '../../domains/services/jwt';
import {
  InvalidCredentialsException,
  UserInactiveException,
  UserNotFoundException,
} from '../shared/error';

@Injectable()
export default class LoginUseCase implements IUseCase<
  LoginDto,
  IAuthReturnType
> {
  constructor(
    private readonly PasswordHasher: PasswordHasher,
    private readonly JwtService: JwtService,
    @Inject(AUTH_REPOSITORY) private readonly repo: AuthRepository,
  ) {}

  public async handle(data: LoginDto): Promise<IAuthReturnType> {
    const user = await this.repo.getByEmail(data.email);
    if (!user) {
      throw new UserNotFoundException();
    }
    if (!user.isActive) {
      throw new UserInactiveException();
    }

    const isPasswordMatch = await this.PasswordHasher.compare(
      data.password,
      user.password ?? '',
    );
    if (!isPasswordMatch) {
      throw new InvalidCredentialsException();
    }
    const token = this.JwtService.sign({
      sub: user.id,
      role: user.role,
    });

    const { password, ...publicUser } = user;
    return {
      entitie: publicUser,
      token,
    };
  }
}
