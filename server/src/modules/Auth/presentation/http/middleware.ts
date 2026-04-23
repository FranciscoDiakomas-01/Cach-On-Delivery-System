/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractToken(req);
    if (!token) {
      throw new UnauthorizedException('Token inválido');
    }
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
        sub: string;
      };
      req.headers['x-user-id'] = payload.sub;
      next();
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
  private extractToken(req: Request): string | null {
    const bearer = req.headers.authorization?.split(' ')[1];
    const cookie = req.cookies?.accessToken;
    return bearer || cookie;
  }
}
