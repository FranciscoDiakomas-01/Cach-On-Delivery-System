import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ORDER_REPOSITORY, USER_REPOSITORY } from 'src/core/constants';
import OrderRepository from '../../domain/repositories/abstractration';
import UserRepository from 'src/modules/User/domains/repositories/abstraction';
import UserRole from 'src/modules/User/domains/entities/UserRole';
import { IPagintionProps } from 'src/core/types';

@Injectable()
export default class GetOrdersUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  public async getById(userId: string, id: string) {
    const [user, order] = await Promise.all([
      this.userRepository.getByUniqueId(userId),
      this.orderRepository.getById(id),
    ]);

    if (!user || !user.isActive) {
      throw new UnauthorizedException({
        message: 'Não possuis permição para consultar este conteúdo',
      });
    }
    if (!order) {
      throw new NotFoundException({
        message: 'Pedido não ecnontrado',
      });
    }
    const isAdmin = user.role === UserRole.ADMIN;
    const isOwner = order.customerId === userId;
    const isDelivery = order.deliveryManId === userId;
    if (!isAdmin && !isOwner && !isDelivery) {
      throw new UnauthorizedException({
        message: 'Não possuis permição para consultar este conteúdo',
      });
    }

    return {
      data: order,
    };
  }
  public async get(pagination: IPagintionProps, userId: string) {
    const user = await this.userRepository.getByUniqueId(userId);
    if (!user || !user.isActive) {
      throw new UnauthorizedException({
        message: 'Não possuis permição para consultar este conteúdo',
      });
    }
    if (user.role === UserRole.ADMIN) {
      return await this.orderRepository.get(pagination);
    }
    return await this.orderRepository.getByUser(userId, pagination);
  }
}
