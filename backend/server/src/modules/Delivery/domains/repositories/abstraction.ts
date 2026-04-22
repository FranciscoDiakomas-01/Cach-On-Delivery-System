import { AssignmentStatus } from '../entities/AssignmentStatus';
import Delivery from '../entities/Delivery';
import DeliveryAssignment from '../entities/DeliveryAssignment';
import { DeliveryStatus } from '../entities/DeliveryStatus';

export default abstract class DeliveryRepository {
  abstract create(data: { orderId: string; expiresAt: Date }): Promise<void>;
  abstract findById(id: string): Promise<Delivery | null>;
  abstract findByOrderId(orderId: string): Promise<Delivery | null>;
  abstract updateStatus(params: {
    deliveryId: string;
    status: DeliveryStatus;
  }): Promise<void>;
  abstract confirmDelivery(deliveryId: string): Promise<void>;
  abstract markAsDelivered(deliveryId: string): Promise<void>;
  abstract markAsExpired(deliveryId: string): Promise<void>;
  abstract findExpiredDeliveries(date: Date): Promise<any[]>;
  abstract assignDelivery(params: {
    deliveryId: string;
    userId: string;
    distance?: number;
  }): Promise<void>;
  abstract updateAssignmentStatus(params: {
    assignmentId: string;
    status: AssignmentStatus;
  }): Promise<void>;
  abstract completeAssignment(assignmentId: string): Promise<void>;
  abstract findAssignmentsByDelivery(
    deliveryId: string,
  ): Promise<DeliveryAssignment[]>;
  abstract findAssignmentsByUser(userId: string): Promise<any[]>;
  abstract findAvailableDeliveries(): Promise<any[]>;
  abstract findUserActiveDelivery(userId: string): Promise<any | null>;
}
