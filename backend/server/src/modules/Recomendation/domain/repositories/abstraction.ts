import { IPagination } from 'src/core/types';
import { Product } from 'src/modules/Product/domains/entities/Product';

export abstract class RecommendationRepository {
  abstract getForUser(userId: string): Promise<IPagination<Product>>;
  abstract getForProduct(productId: string): Promise<IPagination<Product>>;
  abstract getTrending(): Promise<IPagination<Product>>;
  abstract save(event): Promise<void>;
  abstract updateScores(): Promise<void>;
}
