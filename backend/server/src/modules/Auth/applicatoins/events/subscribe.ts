import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AUTH_REPOSITORY } from 'src/core/constants';
import AuthRepository from '../../domains/repositories/abstraction';

@Injectable()
export default class AuthEventSubService {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly repository: AuthRepository,
  ) {}
  @OnEvent('auth.forgot', { async: true })
  public async forgot(payload: any) {}
}
