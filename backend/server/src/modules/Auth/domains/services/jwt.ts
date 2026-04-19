/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export default class JwtService {
  private readonly secret = process.env.JWT_SECRET as string;

  sign(payload: object): string {
    if (!this.secret) {
      throw new Error('JWT_SECRET not defined');
    }
    return jwt.sign(payload, this.secret, {
      expiresIn: '7d',
    });
  }

  verify<T = any>(token: string): T {
    try {
      return jwt.verify(token, this.secret) as T;
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
}
