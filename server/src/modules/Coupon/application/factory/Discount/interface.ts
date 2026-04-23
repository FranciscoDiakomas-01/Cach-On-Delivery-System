import { DiscountType } from '@prisma/client';

export default abstract class IDiscount {
  abstract apply(amount: number): number;
  abstract getType(): DiscountType;
}
