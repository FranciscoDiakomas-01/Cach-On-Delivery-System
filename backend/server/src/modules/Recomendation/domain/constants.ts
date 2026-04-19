import { EventType } from './entities/events';

export const Weights: Record<EventType, number> = {
  VIEW: 2,
  WISHLIST: 5,
  CHECKOUT: 8,
  PURCHASE: 12,
  UNCHEKOUT: -4,
} as const;
