/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { IUseCase } from 'src/core/types';
import AuthProvider from '../../domains/entities/AuthProvider';
import { BadRequestException, Injectable } from '@nestjs/common';
import { IOAuthService } from '../OAuth/factory/interface';

@Injectable()
export default class OAuthFactory implements IUseCase<AuthProvider, string> {
  private readonly strategies: Record<AuthProvider, IOAuthService> = {
    GITHUB,
    GOOGLE,
    APP: null as any,
  };

  public handle(data: AuthProvider): string {
    const strategy = this.strategies[data];

    if (!strategy) {
      throw new BadRequestException({
        messsage: 'OAuth provider não implementado',
        data,
      });
    }
    return strategy.getAuthUrl();
  }
}
