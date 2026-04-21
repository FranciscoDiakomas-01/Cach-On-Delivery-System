import {
  BadGatewayException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUseCase } from 'src/core/types';
import Order from '../../domain/entities/Order';
import CreateOrderDTO from '../dto/createOrderDto';
import {
  CART_REPOSITORY,
  COUPON_REPOSITORY,
  ORDER_REPOSITORY,
  USER_REPOSITORY,
} from 'src/core/constants';
import OrderRepository from '../../domain/repositories/abstractration';
import { EventEmitter2 } from '@nestjs/event-emitter';
import CartRepository from 'src/modules/Cart/domains/repositories/abstraction';
import UserRepository from 'src/modules/User/domains/repositories/abstraction';
import {
  UserInactiveException,
  UserNotFoundException,
} from 'src/modules/Auth/applicatoins/shared/error';
import CouponRepository from 'src/modules/Coupon/domain/repositories/abstraction';
import Coupon from 'src/modules/Coupon/domain/entities/Coupun';
import {
  InactiveCounpunError,
  NotFoundCoupunError,
} from 'src/modules/Coupon/application/shared/error';
import DiscountFactory from 'src/modules/Coupon/application/factory/Discount/factory';
import Adress from '../../domain/entities/Adress';
import { OrderStatus } from '../../domain/entities/OrderStatus';

@Injectable()
export default class CreateOrderUseCase implements IUseCase<
  CreateOrderDTO & { userId: string },
  Order
> {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepository,
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(COUPON_REPOSITORY)
    private readonly couponRepo: CouponRepository,
    private readonly eventEmmiter: EventEmitter2,
  ) {}
  public async handle(
    data: CreateOrderDTO & { userId: string },
  ): Promise<Order> {
    const [user, cart] = await Promise.all([
      this.userRepository.getByUniqueId(data.userId),
      this.cartRepository.getCartByUserId(data.userId),
    ]);

    if (!user) throw new UserNotFoundException();
    if (!user.isActive) throw new UserInactiveException();
    if (!cart)
      throw new NotFoundException({ message: 'Carrinho não encontrado' });

    let total = 0;

    for (const item of cart.items) {
      total += item.quantity * item.product.price;
    }

    let subtotal = total;
    let discounted = 0;
    let coupon: Coupon | null = null;

    if (data.couponId) {
      coupon = await this.couponRepo.findByUnique(data.couponId);
      if (!coupon) throw new NotFoundCoupunError();

      if (!coupon.isActive) throw new InactiveCounpunError();

      if (coupon.usedCount >= coupon.maxUses) {
        throw new BadGatewayException({
          message: 'Coupon atingiu o limite',
        });
      }

      if (total < coupon.minPurchase && coupon.minPurchase !== 0) {
        throw new BadGatewayException({
          message: `Mínimo: ${coupon.minPurchase}`,
        });
      }

      subtotal = new DiscountFactory(total).apply(coupon.type);
      discounted = total - subtotal;
    }
    const address = data.address as any as Adress;
    const order = await this.orderRepository.create({
      id: crypto.randomUUID(),
      costumerId: user.id,
      cartId: cart.id,
      cart,
      address: address,
      paymentMethod: data.paymentMethod,
      subtotal,
      total,
      discount: discounted,
      coupunId: coupon?.id,
      coupon: undefined,
      status: OrderStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
      user,
      delivery: undefined,
      paidAt: undefined,
    });

    if (coupon) {
      await this.couponRepo.incrementUsesCount(coupon.id);
    }
    this.eventEmmiter.emit('order.created', { order });
    return order;
  }
}
