import AuthProvider from 'src/modules/Auth/domains/entities/AuthProvider';

export interface IOAuthService {
  login(code: string): Promise<OAuthUser>;
  getAuthUrl(): string;
}

export interface OAuthUser {
  provider: AuthProvider;
  email: string;
  name?: string;
  avatar?: string;
}
