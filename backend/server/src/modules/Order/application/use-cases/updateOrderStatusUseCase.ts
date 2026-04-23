/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { IUseCase } from 'src/core/types';
import UpdateOrderDto from '../dto/UpdateOrderDto';
import Order from '../../domain/entities/Order';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CART_REPOSITORY,
  ORDER_REPOSITORY,
  USER_REPOSITORY,
} from 'src/core/constants';
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
import CartRepository from 'src/modules/Cart/domains/repositories/abstraction';
import { IUser } from 'src/modules/User/domains/entities/User';

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
    @Inject(CART_REPOSITORY)
    private readonly cartRepo: CartRepository,
  ) {}

  private readonly permissions: Record<
    UserRole,
    Record<OrderStatus, OrderStatus[]>
  > = {
    ADMIN: {
      PENDING: Object.values(OrderStatus),
      PROCESSING: Object.values(OrderStatus),
      DELIVERED: Object.values(OrderStatus),
      CANCELLED: Object.values(OrderStatus),
      EXPIRED: Object.values(OrderStatus),
      REFUNDED: Object.values(OrderStatus),
    },
    CUSTOMER: {
      PENDING: [OrderStatus.CANCELLED],
      PROCESSING: [OrderStatus.CANCELLED],
      DELIVERED: [],
      CANCELLED: [],
      EXPIRED: [],
      REFUNDED: [],
    },

    DELIVERY: {
      PENDING: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
      PROCESSING: [OrderStatus.DELIVERED, OrderStatus.CANCELLED],
      DELIVERED: [],
      CANCELLED: [],
      EXPIRED: [],
      REFUNDED: [],
    },
  };

  private readonly transactions: Record<OrderStatus, OrderStatus[]> = {
    CANCELLED: [],
    DELIVERED: [],
    EXPIRED: [],
    PENDING: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
    PROCESSING: [OrderStatus.DELIVERED, OrderStatus.CANCELLED],
    REFUNDED: [OrderStatus.DELIVERED],
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

    this.validatePermission(user, order, data.status);
    this.validateState(order.status, data.status);
    this.validateOwnership(user, order, data);
    this.validateCustomerRule(user, order, data.status);
    const updater = OrderStatusProcessorFactory.create(
      data.status,
      this.orderRepository,
      this.eventEmmiter,
      this.cartRepo,
    );
    const updatedOrder = await updater.process(order);
    return updatedOrder;
  }
  private validateOwnership(
    user: IUser,
    order: Order,
    data: UpdateOrderDto & { userId: string },
  ) {
    if (user.role === UserRole.CUSTOMER && order.customerId !== data.userId) {
      throw new UnauthorizedException({
        message: 'Você não tem permissão',
      });
    }

    if (
      user.role === UserRole.DELIVERY &&
      order.deliveryManId !== data.userId
    ) {
      throw new UnauthorizedException({
        message: 'Você não tem permissão',
      });
    }
  }
  private validateState(current: OrderStatus, next: OrderStatus) {
    const allowed = this.transactions[current];

    if (!allowed.includes(next)) {
      throw new UnauthorizedException({
        message: `Não é possível mudar de ${current} para ${next}`,
      });
    }
  }
  private validatePermission(user: any, order: Order, nextStatus: OrderStatus) {
    const allowed = this.permissions[user.role]?.[order.status] ?? [];

    if (!allowed.includes(nextStatus)) {
      throw new UnauthorizedException({
        message: `Role ${user.role} não pode mudar de ${order.status} para ${nextStatus}`,
      });
    }
  }
  private validateCustomerRule(user: IUser, order: Order, next: OrderStatus) {
    if (user.role !== UserRole.CUSTOMER) return;

    const allowed = [OrderStatus.CANCELLED];

    if (!allowed.includes(next)) {
      throw new UnauthorizedException({
        message: 'Cliente só pode cancelar pedidos',
      });
    }
  }
}
