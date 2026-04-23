export enum EventType {
  VIEW = 'VIEW',
  WISHLIST = 'WISHLIST',
  CHECKOUT = 'CHECKOUT',
  PURCHASE = 'PURCHASE',
  UNCHEKOUT = 'UNCHEKOUT',
}

export interface ProductEventPayload {
  userId: string;
  productId: string;
  timestamp?: Date;
  metadata?: Record<string, any>;
}
