import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import UserRepository from '../../domains/repositories/abstraction';
import {
  UserInactiveException,
  UserNotFoundException,
} from 'src/modules/Auth/applicatoins/shared/error';
import UpdatePositionDto from '../dto/position';

@Injectable()
export class UpdatePositionUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  async execute(userId: string, data: UpdatePositionDto) {
    const existingUser = await this.userRepo.getByUniqueId(userId);
    if (!existingUser) {
      throw new UserNotFoundException();
    }

    if (!existingUser.isActive) {
      throw new UserInactiveException();
    }
    return this.userRepo.updatePosition(userId, {
      lat: data.lat,
      log: data.long,
    });
  }
}
