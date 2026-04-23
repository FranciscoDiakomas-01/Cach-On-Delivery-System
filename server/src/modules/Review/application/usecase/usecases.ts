import {
  Inject,
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import {
  ORDER_REPOSITORY,
  REVIEW_REPOSITORY,
  USER_REPOSITORY,
} from 'src/core/constants';
import OrderRepository from 'src/modules/Order/domain/repositories/abstractration';
import ReviewRepository from '../../domains/repositories/absrtraction';
import { OrderStatus } from 'src/modules/Order/domain/entities/OrderStatus';
import UserRepository from 'src/modules/User/domains/repositories/abstraction';
import {
  UserInactiveException,
  UserNotFoundException,
} from 'src/modules/Auth/applicatoins/shared/error';
import UserRole from 'src/modules/User/domains/entities/UserRole';

@Injectable()
export class CreateReviewUseCase {
  constructor(
    @Inject(REVIEW_REPOSITORY)
    private readonly reviewRepo: ReviewRepository,

    @Inject(ORDER_REPOSITORY)
    private readonly orderRepo: OrderRepository,
  ) {}

  async handle(data: {
    userId: string;
    orderId: string;
    rating: number;
    content: string;
  }) {
    const order = await this.orderRepo.getById(data.orderId);

    if (!order) {
      throw new BadRequestException('Order não encontrada');
    }

    if (order.customerId !== data.userId) {
      throw new BadRequestException(
        'Não podes avaliar uma order que não é tua',
      );
    }

    if (order.status !== OrderStatus.DELIVERED) {
      throw new BadRequestException('Só podes avaliar pedidos entregues');
    }

    const existing = await this.reviewRepo.findByOrderId(data.orderId);
    if (existing.some((r) => r.userId === data.userId)) {
      throw new BadRequestException('Já fizeste review desta order');
    }

    const review = await this.reviewRepo.create({
      id: crypto.randomUUID(),
      userId: data.userId,
      orderId: data.orderId,
      rating: data.rating,
      content: data.content,
      createdAt: new Date(),
      order: order,
      user: undefined,
    });

    return { data: review };
  }
}

@Injectable()
export class GetReviewsByOrderUseCase {
  constructor(
    @Inject(REVIEW_REPOSITORY)
    private repo: ReviewRepository,
    @Inject(ORDER_REPOSITORY)
    private orderRepo: OrderRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  async handle(orderId: string, userId: string) {
    const [user, order] = await Promise.all([
      this.userRepo.getByUniqueId(userId),
      this.orderRepo.getById(orderId),
    ]);

    if (!user) {
      throw new UserNotFoundException();
    }

    if (!user.isActive) {
      throw new UserInactiveException();
    }
    if (!order) {
      throw new BadRequestException('Order não encontrada');
    }

    if (
      (user.role === UserRole.CUSTOMER && order.customerId !== userId) ||
      (user.role === UserRole.DELIVERY && order.deliveryManId !== userId)
    ) {
      throw new ForbiddenException({
        message: 'Não tens permissão para ver este conteudo',
      });
    }

    const reviews = await this.repo.findByOrderId(orderId);

    return { data: reviews };
  }
}
