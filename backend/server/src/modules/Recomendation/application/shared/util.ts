/* eslint-disable @typescript-eslint/no-unsafe-return */
import Event from 'src/modules/Event/domains/entities/Event';
import { Weights } from '../../domain/constants';

export const decay = (createdAt: Date) => {
  const days = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  return Math.exp(-days / 7);
};

export function calculateScore(events: Event[]) {
  return events.reduce((acc, event) => {
    const weight = Weights[event.type];
    const timeFactor = decay(event.createdAt);
    return acc + weight * timeFactor;
  }, 0);
}

type Cursor = {
  score: number;
  productId: string;
};

export function encodeCursor(cursor: Cursor) {
  return Buffer.from(JSON.stringify(cursor)).toString('base64');
}

export function decodeCursor(cursor: string): Cursor {
  return JSON.parse(Buffer.from(cursor, 'base64').toString());
}
