import { IPagination, IPagintionProps } from 'src/core/types';
import Event from 'src/modules/Event/domains/entities/Event';
import { Product } from 'src/modules/Product/domains/entities/Product';
export default abstract class RecommendationRepository {
  abstract getInteractedProducts(productIds: string[]): Promise<Product[]>;
  abstract getUnInteractedProducts(
    userId: string,
    pagination: IPagintionProps,
  ): Promise<IPagination<Product>>;
  abstract getSimilarProducts(
    categoryIds: string[],
    excludeIds: string[],
    pagination: IPagintionProps,
  ): Promise<Product[]>;
  abstract getUserEvents(userId: string): Promise<Event[]>;
}
