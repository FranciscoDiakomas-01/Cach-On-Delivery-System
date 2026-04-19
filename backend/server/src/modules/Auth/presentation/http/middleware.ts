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
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Auth Header não passado');
    }

    const [, token] = authHeader.split(' ');

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
}
