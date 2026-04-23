import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { Request } from 'express';
import { USER_REPOSITORY } from 'src/core/constants';
import UserRole from 'src/modules/User/domains/entities/UserRole';
import UserRepository from 'src/modules/User/domains/repositories/abstraction';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const userId = request.headers['x-user-id'];
    if (!userId || typeof userId !== 'string') {
      throw new UnauthorizedException('User ID not provided');
    }
    const user = await this.userRepo.getByUniqueId(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Access denied: admin only');
    }
    if (!user.isActive) {
      throw new ForbiddenException('User account is inactive');
    }
    return true;
  }
}
