import { IUser } from 'src/modules/User/domains/entities/User';
import { AssignmentStatus } from './AssignmentStatus';

export default interface DeliveryAssignment {
  id: string;
  deliveryId: string;
  userId: string;
  status: AssignmentStatus;
  distance: number | undefined;
  assignedAt: Date;
  completedAt: Date | undefined;
  user: IUser;
}
