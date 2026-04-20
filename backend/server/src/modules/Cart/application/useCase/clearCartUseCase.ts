import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import CartRepository from '../../domains/repositories/abstraction';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  CART_REPOSITORY,
  PRODUCT_REPOSITORY,
  USER_REPOSITORY,
} from 'src/core/constants';
import UserRepository from 'src/modules/User/domains/repositories/abstraction';
import {
  UserInactiveException,
  UserNotFoundException,
} from 'src/modules/Auth/applicatoins/shared/error';
import UserRole from 'src/modules/User/domains/entities/UserRole';
import ProductRepository from 'src/modules/Product/domains/repositories/abstraction';

@Injectable()
export default class ClearCartUseCase {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute(userId: string) {
    const [cart, user] = await Promise.all([
      this.cartRepository.getCartByUserId(userId),
      this.userRepository.getByUniqueId(userId),
    ]);
    if (!cart) {
      throw new BadRequestException({
        message: 'Carrinho não encontrado para o usuário',
      });
    }
    if (!user) {
      throw new UserNotFoundException();
    }
    if (!user.isActive) {
      throw new UserInactiveException();
    }
    if (user.role !== UserRole.CUSTOMER) {
      throw new BadRequestException({
        message: 'Apenas clientes podem adicionar itens ao carrinho',
      });
    }
    if (cart.order) {
      throw new BadRequestException({
        message: 'Não é possível limpar o carrinho de um pedido já existente',
      });
    }
    await this.cartRepository.clearCart(cart.id);
    for (const item of cart.items) {
      await this.productRepository.releaseStock(item.productId, item.quantity);
    }
    const poductIds = cart.items.map((item) => item.productId);
    poductIds.forEach((productId) => {
      this.eventEmitter.emit('cart.item.removed', {
        userid: userId,
        productid: productId,
      });
    });
    return {
      message: 'Produto removido do carrinho com sucesso',
    };
  }
}
