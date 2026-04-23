import { IPagination, IPagintionProps } from 'src/core/types';
import { Product } from 'src/modules/Product/domains/entities/Product';

export default abstract class WishlistRepository {
  abstract addToList(productId: string, userId: string): Promise<void>;
  abstract removeToList(productId: string, userId: string): Promise<void>;
  abstract getList(
    userId: string,
    pagination: IPagintionProps,
  ): Promise<IPagination<Product>>;
  abstract isInList(productId: string, userId: string): Promise<boolean>;
}
