import { DiscountType } from '@prisma/client';
import IDiscount from '../interface';

export default class PercentDiscount extends IDiscount {
  constructor(private readonly value: number) {
    super();
  }

  apply(amount: number): number {
    if (this.value < 0 || this.value > 100) {
      throw new Error('Invalid percentage value');
    }
    return amount - (amount * this.value) / 100;
  }

  getType(): DiscountType {
    return DiscountType.PERCENT;
  }
}
