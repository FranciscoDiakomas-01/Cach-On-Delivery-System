import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/types';
import WishlistRepository from '../../domain/repositories/abstraction';
import { WISHLIST_REPOSITORY } from 'src/core/constants';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export default class ToggleToWishListUseCase implements IUseCase<
  { userId: string; productId: string },
  any
> {
  constructor(
    @Inject(WISHLIST_REPOSITORY)
    private readonly repo: WishlistRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async handle(data: {
    userId: string;
    productId: string;
  }): Promise<any> {
    const { productId, userId } = data;
    const isIn = await this.repo.isInList(productId, userId);

    if (isIn) {
      await this.repo.removeToList(productId, userId);
      return {
        message: 'Removido da lista',
      };
    }
    await this.repo.addToList(productId, userId);
    this.eventEmitter.emit('product.wishlist', {
      userid: userId,
      productid: productId,
    });
    return {
      message: 'Adicionado a lista',
    };
  }
}
