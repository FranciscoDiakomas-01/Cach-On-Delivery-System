import { Inject, Injectable } from '@nestjs/common';
import { AUTH_REPOSITORY } from 'src/core/constants';
import { IUseCase } from 'src/core/types';
import AuthRepository from '../../domains/repositories/abstraction';
import { UserNotFoundException } from '../shared/error';
import RecoveryTokenService from '../../domains/services/recovery';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class ForgotUseCase implements IUseCase<
  { email: string; canEmit: boolean },
  { raw: string; expiresAt: Date }
> {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly repository: AuthRepository,
    private readonly tokenService: RecoveryTokenService,
    private readonly eventEmitter: EventEmitter2,
    private readonly config: ConfigService,
  ) {}

  public async handle({
    email,
    canEmit = true,
  }: {
    email: string;
    canEmit: boolean;
  }): Promise<{ raw: string; expiresAt: Date }> {
    const user = await this.repository.getByEmail(email);
    if (!user || !user.isActive) {
      throw new UserNotFoundException();
    }
    await this.repository.markRecoveryTokenAsUsed(user.id);
    const { raw, hash } = this.tokenService.generate();
    const expiresInMinutes = this.config.get<number>('RECOVERY_EXPIRES', 10);
    const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);
    await this.repository.createRecoveryToken({
      token: hash,
      userId: user.id,
      expiresAt,
    });
    if (canEmit) {
      this.eventEmitter.emit('auth.forgot', {
        userId: user.id,
        email: user.email,
        token: raw,
        expiresAt,
        name: `${user.firstName} ${user.lastName}`,
      });
    }
    return { raw, expiresAt };
  }
}
