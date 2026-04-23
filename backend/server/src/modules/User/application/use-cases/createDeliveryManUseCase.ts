import { Inject, Injectable } from '@nestjs/common';
import ForgotUseCase from 'src/modules/Auth/applicatoins/use-cases/forgotUseCase';
import UserRepository from '../../domains/repositories/abstraction';
import CreateDeliveryManDto from '../dto/createDelivery';
import { EmailAlreadyInUseException } from 'src/modules/Auth/applicatoins/shared/error';
import AuthProvider from 'src/modules/Auth/domains/entities/AuthProvider';
import UserRole from '../../domains/entities/UserRole';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { USER_REPOSITORY } from 'src/core/constants';

@Injectable()
export class CreateDeliveryManUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
    private readonly ForgotUseCase: ForgotUseCase,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(data: CreateDeliveryManDto) {
    const existingUser = await this.userRepo.getByUniqueId(data.email);
    if (existingUser) {
      throw new EmailAlreadyInUseException();
    }
    const user = await this.userRepo.createDeliveryMan({
      authProvider: AuthProvider.APP,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      id: crypto.randomUUID(),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: UserRole.DELIVERY,
      cart: [],
      customerOrders: [],
      deliveryOrders: [],
      events: [],
      notifications: undefined,
      reviews: [],
    });
    const { raw, expiresAt } = await this.ForgotUseCase.handle({
      email: user.email,
      canEmit: false,
    });

    this.eventEmitter.emit('new.deliveryman', {
      userId: user.id,
      email: user.email,
      token: raw,
      expiresAt,
      name: `${user.firstName} ${user.lastName}`,
    });
    return {
      message:
        'Enviamos um email para o entregador com as instruções para criar uma senha e acessar a plataforma',
      sucess: true,
    };
  }
}
