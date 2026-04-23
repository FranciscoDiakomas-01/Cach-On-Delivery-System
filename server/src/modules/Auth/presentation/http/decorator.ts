import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

export const CurrentUserId = createParamDecorator(
  (data: keyof any, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    const userId = req.headers['x-user-id'];
    if (!userId) {
      throw new UnauthorizedException('Perfil não indentificado');
    }
    return userId;
  },
);
