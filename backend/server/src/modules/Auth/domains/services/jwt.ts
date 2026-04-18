/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as jwt from 'jsonwebtoken';

export default class JwtService {
  private static readonly secret = process.env.JWT_SECRET as string;

  static sign(payload: object): string {
    if (!this.secret) {
      throw new Error('JWT_SECRET not defined');
    }
    return jwt.sign(payload, this.secret, {
      expiresIn: '7d',
    });
  }

  static verify<T = any>(token: string): T {
    try {
      return jwt.verify(token, this.secret) as T;
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
}
