import { Inject, Injectable } from '@nestjs/common';
import { IPagination, IPagintionProps, IUseCase } from 'src/core/types';
import WishlistRepository from '../../domain/repositories/abstraction';
import { WISHLIST_REPOSITORY } from 'src/core/constants';
import { Product } from 'src/modules/Product/domains/entities/Product';

@Injectable()
export default class GetWishListUseCase implements IUseCase<
  { userId: string; pagination: IPagintionProps },
  IPagination<Product>
> {
  constructor(
    @Inject(WISHLIST_REPOSITORY)
    private readonly repo: WishlistRepository,
  ) {}

  public async handle(props: {
    userId: string;
    pagination: IPagintionProps;
  }): Promise<IPagination<Product>> {
    const { userId, pagination } = props;
    const data = await this.repo.getList(userId, pagination);
    return data;
  }
}
