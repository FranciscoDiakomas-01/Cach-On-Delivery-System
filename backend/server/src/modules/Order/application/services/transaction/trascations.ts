export const transitions = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['PROCESSING', 'CANCELLED'],
  PROCESSING: ['DELIVERED'],
  DELIVERED: ['REFUNDED'],
} as const;
