/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import type { IOAuthService, OAuthUser } from '../interface';
import AuthProvider from 'src/modules/Auth/domains/entities/AuthProvider';
import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export class GoogleOAuthService implements IOAuthService {
  private clientId = process.env.GOOGLE_CLIENT_ID!;
  private clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
  private redirectUri = process.env.GOOGLE_REDIRECT_URI!;

  constructor(private readonly config: ConfigService) {
    this.clientId = this.config.get<string>('GOOGLE_CLIENT_ID')!;
    this.clientSecret = this.config.get<string>('GOOGLE_CLIENT_SECRET')!;
    this.redirectUri = this.config.get<string>('GOOGLE_REDIRECT_URI')!;
  }

  getAuthUrl(): string {
    return (
      `https://accounts.google.com/o/oauth2/v2/auth` +
      `?client_id=${this.clientId}` +
      `&redirect_uri=${this.redirectUri}` +
      `&response_type=code` +
      `&scope=email profile`
    );
  }

  async login(code: string): Promise<OAuthUser> {
    try {
      const tokenResponse = await axios.post(
        'https://oauth2.googleapis.com/token',
        {
          code,
          client_id: this.clientId,
          client_secret: this.clientSecret,
          redirect_uri: this.redirectUri,
          grant_type: 'authorization_code',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const { access_token } = tokenResponse.data;

      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      const user = userInfo.data;

      return {
        provider: AuthProvider.GOOGLE,
        email: user.email,
        name: user.name,
        avatar: user.picture,
      };
    } catch (error) {
      console.error('Google OAuth Error:', error);
      throw new BadRequestException({
        message: 'Autenticação com google falhou',
      });
    }
  }
}
