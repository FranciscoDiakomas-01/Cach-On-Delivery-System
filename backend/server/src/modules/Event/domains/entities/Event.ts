import Category from 'src/modules/category/domains/entities/category';
import { Product } from 'src/modules/Product/domains/entities/Product';
import { EventType } from 'src/modules/Recomendation/domain/entities/events';

export default interface Event {
  type: EventType;
  createdAt: Date;
  userId: string;
  productId: string;
  product: Product & { category: Category };
}
