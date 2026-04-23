import { EventType } from 'src/modules/Recomendation/domain/entities/events';

export default abstract class EventRepository {
  abstract register(data: {
    userId: string;
    productId: string;
    event: EventType;
  }): Promise<void>;
}
