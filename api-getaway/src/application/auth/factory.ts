export interface IAuthProviderService<Input, OutPut> {
  login(data: Input): Promise<OutPut>;
}

export enum AuthProvidersType {
  GOOGLE = 'GOOGLE',
  APP = 'APP',
  GITHUB = 'GITHUB',
}

export class AuthFactory {
  static create<Input, OutPut>(
    provider: AuthProvidersType,
  ): IAuthProviderService<Input, OutPut> {
    const app: any = {};

    const authProviders: Record<AuthProvidersType, IAuthProviderService> = {
      APP: app,
      GITHUB: app,
      GOOGLE: app,
    };

    const strategy = authProviders[provider];

    if (!strategy) {
      throw new Error('Auth Provider Not Implemeted');
    }
    return strategy;
  }
}
