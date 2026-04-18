/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import { IAuthReturnType, IAuthStrategie } from '../../../domains/interface';
import AuthRepository from '../../../domains/repositories/abstraction';
import JwtService from '../../../domains/services/jwt';
import AuthProvider from '../../../domains/entities/AuthProvider';
import {
  InvalidCredentialsException,
  UserNotFoundException,
} from '../../shared/error';

export default class GithubAuth implements IAuthStrategie<{ code: string }> {
  constructor(private readonly repo: AuthRepository) {}
  public async login(data: { code: string }): Promise<IAuthReturnType> {
    if (!data?.code) {
      throw new InvalidCredentialsException();
    }
    const tokenData = await this.exchangeCodeForToken(data.code);
    const githubUser = await this.getGithubUser(tokenData.access_token);
    if (!githubUser.email) {
      throw new InvalidCredentialsException();
    }
    const user = await this.repo.getByEmail(githubUser.email);

    if (!user) {
      throw new UserNotFoundException();
    }

    if (user.authProvider !== AuthProvider.GITHUB) {
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
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    return response.data as {
      access_token: string;
      token_type: string;
      scope: string;
    };
  }
  private async getGithubUser(accessToken: string) {
    const response = await axios.get('https://api.github.com/user', {
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
      (e: any) => e.primary === true,
    );

    return {
      id: response.data.id,
      email: primaryEmail?.email,
      name: response.data.name,
      avatar: response.data.avatar_url,
    };
  }
}
