import Event from 'src/modules/Event/domains/entities/Event';
import { Product } from 'src/modules/Product/domains/entities/Product';
export default abstract class RecommendationRepository {
  abstract getUserEvents(userId: string): Promise<Event[]>;
  abstract getProductsByIds(ids: string[]): Promise<Product[]>;
}
