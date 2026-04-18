import { EventType } from './entities/events';

export const Weights: Record<EventType, number> = {
  VIEW: 1,
  CLICK: 2,
  SEARCH: 3,
  ADD_TO_CART: 6,
  WISHLIST: 5,
  CHECKOUT: 8,
  PURCHASE: 12,
  REMOVE_FROM_CART: -4,
} as const;
