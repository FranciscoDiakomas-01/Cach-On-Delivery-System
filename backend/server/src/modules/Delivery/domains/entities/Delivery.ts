import Order from 'src/modules/Order/domain/entities/Order';
import { DeliveryStatus } from './DeliveryStatus';
import DeliveryAssignment from './DeliveryAssignment';

export default interface Delivery {
  id: string;
  orderId: string;
  status: DeliveryStatus;
  expiresAt: Date;
  confirmedAt: Date | undefined;
  deliveredAt: Date | undefined;
  createdAt: Date;
  order: Order;
  assignment: DeliveryAssignment[];
}
