import { IUseCase } from 'src/core/types';
import UpdateOrderDto from '../dto/UpdateOrderDto';
import Order from '../../domain/entities/Order';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ORDER_REPOSITORY, USER_REPOSITORY } from 'src/core/constants';
import OrderRepository from '../../domain/repositories/abstractration';
import { EventEmitter2 } from '@nestjs/event-emitter';
import UserRepository from 'src/modules/User/domains/repositories/abstraction';
import {
  UserInactiveException,
  UserNotFoundException,
} from 'src/modules/Auth/applicatoins/shared/error';
import UserRole from 'src/modules/User/domains/entities/UserRole';
import OrderStatusProcessorFactory from '../services/transaction/factory';

@Injectable()
export default class UpdateOrderUseCase implements IUseCase<
  UpdateOrderDto & { userId: string },
  Order
> {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly eventEmmiter: EventEmitter2,
  ) {}

  public async handle(
    data: UpdateOrderDto & { userId: string },
  ): Promise<Order> {
    const [user, order] = await Promise.all([
      this.userRepository.getByUniqueId(data.userId),
      this.orderRepository.getById(data.orderId),
    ]);

    if (!user) throw new UserNotFoundException();
    if (!user.isActive) throw new UserInactiveException();

    if (user.role == UserRole.CUSTOMER && order?.costumerId !== data.userId) {
      throw new UnauthorizedException({
        message: 'Você não tem permisão para executar esta acção',
      });
    }
    if (!order) {
      throw new NotFoundException({
        message: 'pedido não encontrado',
      });
    }

    if (!order.delivery) {
      throw new NotFoundException({
        message: 'O serviço de entrega ainda não foi incializado',
      });
    }

    // verify if is the associeted delivery

    const updater = OrderStatusProcessorFactory.create(
      data.status,
      this.orderRepository,
      this.eventEmmiter,
    );
    const updatedOrder = await updater.process(order);
    return updatedOrder;
  }
}
