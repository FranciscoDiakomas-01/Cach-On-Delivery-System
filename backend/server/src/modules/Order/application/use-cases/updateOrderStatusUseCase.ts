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
import { OrderStatus } from '../../domain/entities/OrderStatus';

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

  private readonly transactions: Record<OrderStatus, OrderStatus[]> = {
    CANCELLED: [],
    DELIVERED: [],
    EXPIRED: [],
    PENDING: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
    PROCESSING: [OrderStatus.DELIVERED, OrderStatus.CANCELLED],
    REFUNDED: [],
  };

  public async handle(
    data: UpdateOrderDto & { userId: string },
  ): Promise<Order> {
    const [user, order] = await Promise.all([
      this.userRepository.getByUniqueId(data.userId),
      this.orderRepository.getById(data.orderId),
    ]);

    if (!user) throw new UserNotFoundException();
    if (!user.isActive) throw new UserInactiveException();

    if (!order) {
      throw new NotFoundException({
        message: 'Pedido não encontrado',
      });
    }

    if (user.role == UserRole.CUSTOMER && order.costumerId !== data.userId) {
      throw new UnauthorizedException({
        message: 'Você não tem permisão para executar esta acção',
      });
    }

    if (user.role == UserRole.DELIVERY && order.deliveryManId !== data.userId) {
      throw new UnauthorizedException({
        message: 'Você não tem permisão para executar esta acção',
      });
    }
    const allowedNext = this.transactions[order.status];
    if (!allowedNext.includes(data.status)) {
      throw new UnauthorizedException({
        message: `Não é possível mudar de ${order.status} para ${data.status}`,
      });
    }
    const updater = OrderStatusProcessorFactory.create(
      data.status,
      this.orderRepository,
      this.eventEmmiter,
    );
    const updatedOrder = await updater.process(order);
    return updatedOrder;
  }
}
