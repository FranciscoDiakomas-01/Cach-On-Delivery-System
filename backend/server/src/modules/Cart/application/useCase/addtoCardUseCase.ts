/* eslint-disable prefer-const */
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import CartRepository from '../../domains/repositories/abstraction';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  CART_REPOSITORY,
  PRODUCT_REPOSITORY,
  USER_REPOSITORY,
} from 'src/core/constants';
import { ToCartDto } from '../dto';
import UserRepository from 'src/modules/User/domains/repositories/abstraction';
import {
  UserInactiveException,
  UserNotFoundException,
} from 'src/modules/Auth/applicatoins/shared/error';
import UserRole from 'src/modules/User/domains/entities/UserRole';
import ProductRepository from 'src/modules/Product/domains/repositories/abstraction';
import {
  ProductNotFoundException,
  ProductOutOfStockException,
} from 'src/modules/Product/application/erros';

@Injectable()
export default class AddToCartUseCase {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute(dto: ToCartDto, userId: string) {
    const { productId, quantity } = dto;
    let [cart, user, product] = await Promise.all([
      this.cartRepository.getCartByUserId(userId),
      this.userRepository.getByUniqueId(userId),
      this.productRepository.getByUnique(productId),
    ]);
    if (quantity < 1) {
      throw new BadRequestException({
        message: 'A quantidade deve ser pelo menos 1',
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
    if (!product) {
      throw new ProductNotFoundException(productId);
    }
    if (!product.isActive) {
      throw new BadRequestException({
        message: 'Produto indisponível para compra',
      });
    }
    const available = product.available - product.reserved;

    if (available < quantity) {
      throw new ProductOutOfStockException(productId);
    }
    if (!cart) {
      await this.cartRepository.markCartAsInactive(userId);
      cart = await this.cartRepository.createCart(userId);
    }
    const existingItem = cart.items.find(
      (item) => item.productId === productId,
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.available) {
        throw new ProductOutOfStockException(productId);
      }
      await this.cartRepository.updateItemQuantity(
        cart.id,
        productId,
        existingItem.quantity + quantity,
      );
    }
    await this.cartRepository.addItemToCart(cart.id, productId, quantity);
    this.eventEmitter.emit('cart.item.added', {
      userid: userId,
      productid: productId,
    });
    return {
      message: 'Produto adicionado ao carrinho com sucesso',
    };
  }
}
