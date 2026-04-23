import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import UserRepository from '../../domains/repositories/abstraction';
import {
  UserInactiveException,
  UserNotFoundException,
} from 'src/modules/Auth/applicatoins/shared/error';
import { IPagintionProps } from 'src/core/types';
import UserRole from '../../domains/entities/UserRole';

@Injectable()
export class GetUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  async execute(props: IPagintionProps) {
    return await this.userRepo.get(props);
  }
}

@Injectable()
export class GetUserByUniqueIdUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  async execute(uniqueId: string) {
    const existingUser = await this.userRepo.getByUniqueId(uniqueId);
    if (!existingUser) {
      throw new UserNotFoundException();
    }
    const isMyProfile = existingUser.id === uniqueId;
    const canViewProfile = isMyProfile || existingUser.role === UserRole.ADMIN;
    if (!canViewProfile) {
      throw new UserInactiveException();
    }

    return existingUser;
  }
}
