/* eslint-disable @typescript-eslint/no-unsafe-return */
import { GithubOAuthService } from './strategies/GitHub';
import { GoogleOAuthService } from './strategies/Google';
import { IOAuthService } from './interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class OAuthFactory {
  constructor(private readonly config: ConfigService) {}
  create(provider: string): IOAuthService {
    const strategies = {
      google: new GoogleOAuthService(this.config),
      github: new GithubOAuthService(this.config),
    };
    return strategies[provider];
  }
}
