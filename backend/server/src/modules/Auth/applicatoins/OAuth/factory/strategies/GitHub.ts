/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import { IOAuthService, OAuthUser } from '../interface';
import AuthProvider from 'src/modules/Auth/domains/entities/AuthProvider';
import { ConfigService } from '@nestjs/config';

export class GithubOAuthService implements IOAuthService {
  private clientId = process.env.GOOGLE_CLIENT_ID!;
  private clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
  private redirectUri = process.env.GOOGLE_REDIRECT_URI!;

  constructor(private readonly config: ConfigService) {
    this.clientId = this.config.get<string>('GITHUB_CLIENT_ID')!;
    this.clientSecret = this.config.get<string>('GITHUB_CLIENT_SECRET')!;
    this.redirectUri = this.config.get<string>('GITHUB_REDIRECT_URI')!;
  }
  getAuthUrl(): string {
    return (
      `https://github.com/login/oauth/authorize` +
      `?client_id=${this.clientId}` +
      `&redirect_uri=${this.redirectUri}` +
      `&scope=user:email`
    );
  }
  async login(code: string): Promise<OAuthUser> {
    try {
      const tokenResponse = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      const accessToken = tokenResponse.data.access_token;

      const userResponse = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const emailsResponse = await axios.get(
        'https://api.github.com/user/emails',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const primaryEmail = emailsResponse.data.find(
        (e: any) => e.primary,
      )?.email;

      return {
        provider: AuthProvider.GITHUB,
        email: primaryEmail,
        name: userResponse.data.name || userResponse.data.login,
        avatar: userResponse.data.avatar_url,
      };
    } catch (error) {
      console.error('GitHub OAuth Error:', error);
      throw new Error('GitHub authentication failed');
    }
  }
}
