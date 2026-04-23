import { EventType } from './entities/events';

export const Weights: Record<EventType, number> = {
  VIEW: 2,
  WISHLIST: 5,
  CHECKOUT: 8,
  PURCHASE: 12,
  UNCHEKOUT: -4,
} as const;

export const MAX_EVENTS_PER_TYPE = {
  VIEW: 10,
  WISHLIST: 5,
  CHECKOUT: 3,
  PURCHASE: 2,
  UNCHEKOUT: 2,
} as const;
