/* eslint-disable @typescript-eslint/no-unsafe-return */
import { BadRequestException } from '@nestjs/common';
import { GithubOAuthService } from './strategies/GitHub';
import { GoogleOAuthService } from './strategies/Google';

export default class OAuthFactory {
  static strategies = {
    google: new GoogleOAuthService(),
    github: new GithubOAuthService(),
  };
  static create(provider: string) {
    const isIn = provider in Object.keys(OAuthFactory.strategies);
    if (!isIn) {
      throw new BadRequestException({
        message: 'A stratégia de login não foi implementada',
      });
    }
    return OAuthFactory.strategies[provider];
  }
}
