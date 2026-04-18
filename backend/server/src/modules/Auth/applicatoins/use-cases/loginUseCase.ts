/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { IUseCase } from 'src/core/types';
import { LoginDto } from '../dto/login.dto';
import { IAuthReturnType } from '../../domains/interface';
import { Inject, Injectable } from '@nestjs/common';
import AuthRepository from '../../domains/repositories/abstraction';
import { AUTH_REPOSITORY } from 'src/core/constants';
import AuthLoginFactory from '../factory/auth.factory';

@Injectable()
export default class LoginUseCase implements IUseCase<
  LoginDto,
  IAuthReturnType
> {
  constructor(
    @Inject(AUTH_REPOSITORY) private readonly repository: AuthRepository,
  ) {}

  public async handle(data: LoginDto): Promise<IAuthReturnType> {
    const strategy = AuthLoginFactory.create(data.provider, this.repository);
    return strategy.login(data as any);
  }
}
