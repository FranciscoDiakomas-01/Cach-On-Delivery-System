import { Inject, Injectable } from '@nestjs/common';
import UpdateProfileDto from '../dto/updateProfile';
import { USER_REPOSITORY } from 'src/core/constants';
import UserRepository from '../../domains/repositories/abstraction';
import {
  UserInactiveException,
  UserNotFoundException,
} from 'src/modules/Auth/applicatoins/shared/error';

@Injectable()
export class UpdateProfileUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  async execute(userId: string, data: UpdateProfileDto) {
    const existingUser = await this.userRepo.getByUniqueId(data.email);
    if (!existingUser || existingUser.id !== userId) {
      throw new UserNotFoundException();
    }

    if (!existingUser.isActive) {
      throw new UserInactiveException();
    }
    return this.userRepo.updateProfile(userId, data);
  }
}
