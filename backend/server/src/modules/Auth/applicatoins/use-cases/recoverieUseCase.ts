import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AUTH_REPOSITORY } from 'src/core/constants';
import { IUseCase } from 'src/core/types';
import AuthRepository from '../../domains/repositories/abstraction';
import RecoveryTokenService from '../../domains/services/recovery';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InvalidTokenException, UserInactiveException } from '../shared/error';
import { RecoveryDTO } from '../dto/recovery.dto';
import PasswordHasher from '../../domains/services/encript';

@Injectable()
export default class RecoveryUseCase implements IUseCase<RecoveryDTO, void> {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly repository: AuthRepository,
    private readonly tokenService: RecoveryTokenService,
    private readonly eventEmitter: EventEmitter2,
    private readonly PasswordHasher: PasswordHasher,
  ) {}
  public async handle(data: RecoveryDTO): Promise<void> {
    const { password, token } = data;
    const hash = this.tokenService.decifer(token);
    const passwordHash = await this.PasswordHasher.hash(password);
    const recovery = await this.repository.getRecoveryToken(hash);

    if (!recovery) {
      throw new InvalidTokenException();
    }

    const { user, expiresAt, userId, isUsed } = recovery;

    if (!user.isActive) {
      throw new UserInactiveException();
    }

    if (isUsed) {
      throw new BadRequestException({
        message: 'Pedido já usado tente novamente',
      });
    }

    const now = new Date();

    if (now.getTime() > expiresAt.getTime()) {
      await this.repository.markRecoveryTokenAsUsed(userId);
      throw new BadRequestException({
        message: 'Pedido expirado tente novamente',
      });
    }

    await this.repository.updatePassword(userId, passwordHash);
    await this.repository.markRecoveryTokenAsUsed(userId);
    this.eventEmitter.emit('auth.recovery', {
      userId,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
    });
  }
}
