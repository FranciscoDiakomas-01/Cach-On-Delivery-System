import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import PasswordHasher from 'src/modules/Auth/domains/services/encript';
import UserRepository from '../../domains/repositories/abstraction';
import { UserInactiveException } from 'src/modules/Auth/applicatoins/shared/error';
import { EventEmitter2 } from '@nestjs/event-emitter';
import UpdateCredentialDto from '../dto/updateCredential';

@Injectable()
export class UpdateCredentialsUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
    private readonly hashService: PasswordHasher,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(userId: string, dto: UpdateCredentialDto) {
    const { currentPassword, newPassword } = dto;

    if (currentPassword === newPassword) {
      throw new BadRequestException({
        message: 'A nova senha deve ser diferente da senha atual',
      });
    }

    const user = await this.userRepo.getByUniqueId(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!user.isActive) {
      throw new UserInactiveException();
    }
    const isMyProfile = userId === user.id;
    if (!isMyProfile) {
      throw new UnauthorizedException({
        message: 'Você não tem permissão para alterar a senha de outro usuário',
      });
    }

    const isPasswordValid = await this.hashService.compare(
      currentPassword,
      user.password || '',
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException({
        message: 'Senha atual incorreta',
      });
    }

    const hashed = await this.hashService.hash(newPassword);
    await this.userRepo.updatePassword(userId, hashed);

    this.eventEmitter.emit('auth.recovery', {
      userId,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
    });
    return { success: true };
  }
}
