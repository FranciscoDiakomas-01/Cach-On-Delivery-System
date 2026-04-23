import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import CartRepository from '../../domains/repositories/abstraction';
import { CART_REPOSITORY } from 'src/core/constants';

@Injectable()
export default class GetCartUseCase {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartRepository,
  ) {}

  public async execute(userId: string) {
    const [cart] = await Promise.all([
      this.cartRepository.getCartByUserId(userId),
    ]);

    if (!cart) {
      throw new BadRequestException({
        message: 'Carrinho não encontrado para o usuário',
      });
    }
    console.log(cart);
    if (!cart.isActive) {
      throw new BadRequestException({
        message: 'Não possuis um carrinho ativo',
      });
    }
    return {
      data: cart,
    };
  }
}
