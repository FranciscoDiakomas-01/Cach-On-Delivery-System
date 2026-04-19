import { IUseCase } from 'src/core/types';
import AuthProvider from '../../domains/entities/AuthProvider';
import { BadRequestException, Injectable } from '@nestjs/common';
import OAuthFactory from '../OAuth/factory/oauth.factory';

@Injectable()
export default class OAuthFactoryUseCase implements IUseCase<
  AuthProvider,
  string
> {
  constructor(private readonly OAuthFactory: OAuthFactory) {}
  public handle(data: AuthProvider): string {
    const toStringProvider = String(data).toLocaleLowerCase();
    const strategy = this.OAuthFactory.create(toStringProvider);
    if (!strategy) {
      throw new BadRequestException({
        messsage: 'OAuth provider não implementado',
        data,
      });
    }
    return strategy.getAuthUrl();
  }
}
