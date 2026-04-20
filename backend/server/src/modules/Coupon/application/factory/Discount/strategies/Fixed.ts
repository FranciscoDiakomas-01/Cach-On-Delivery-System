import { DiscountType } from '@prisma/client';
import IDiscount from '../interface';

export default class FixedDiscount extends IDiscount {
  constructor(private readonly value: number) {
    super();
  }

  apply(amount: number): number {
    if (this.value < 0 || this.value > 100) {
      throw new Error('Invalid fixed value');
    }
    return amount - this.value;
  }

  getType(): DiscountType {
    return DiscountType.FIXED;
  }
}
