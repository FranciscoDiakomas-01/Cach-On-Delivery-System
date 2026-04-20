import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import UserRepository from '../../domains/repositories/abstraction';
import { UserNotFoundException } from 'src/modules/Auth/applicatoins/shared/error';

@Injectable()
export class ToggleActiveUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  async execute(userId: string) {
    const existingUser = await this.userRepo.getByUniqueId(userId);
    if (!existingUser || existingUser.id !== userId) {
      throw new UserNotFoundException();
    }
    return this.userRepo.toogleActive(userId, !existingUser.isActive);
  }
}
