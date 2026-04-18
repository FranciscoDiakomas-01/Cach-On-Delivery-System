/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import axios from 'axios';
import { IAuthReturnType, IAuthStrategie } from '../../../domains/interface';
import AuthRepository from '../../../domains/repositories/abstraction';
import JwtService from '../../../domains/services/jwt';
import AuthProvider from '../../../domains/entities/AuthProvider';
import {
  InvalidCredentialsException,
  UserNotFoundException,
} from '../../shared/error';

export default class GoogleAuth implements IAuthStrategie<{ code: string }> {
  constructor(private readonly repo: AuthRepository) {}

  public async login(data: { code: string }): Promise<IAuthReturnType> {
    if (!data?.code) {
      throw new InvalidCredentialsException();
    }
    const tokenData = await this.exchangeCodeForToken(data.code);
    const googleUser = await this.getGoogleUser(tokenData.access_token);
    const user = await this.repo.getByEmail(googleUser.email);
    if (!user) {
      throw new UserNotFoundException();
    }
    if (user.authProvider !== AuthProvider.GOOGLE) {
      throw new InvalidCredentialsException();
    }
    const token = JwtService.sign({
      sub: user.id,
      role: user.role,
    });

    return {
      entitie: user,
      token,
    };
  }
  private async exchangeCodeForToken(code: string) {
    const response = await axios.post(
      'https://oauth2.googleapis.com/token',
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data as {
      access_token: string;
      id_token: string;
    };
  }
  private async getGoogleUser(accessToken: string) {
    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data as {
      id: string;
      email: string;
      name: string;
      picture: string;
    };
  }
}
