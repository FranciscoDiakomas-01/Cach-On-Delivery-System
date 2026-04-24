import { ICategory } from "./category";
import { Product } from "./Product";
import { EventType } from "./events";

export default interface Event {
  type: EventType;
  createdAt: Date;
  userId: string;
  productId: string;
  product: Product & { category: ICategory };
}
