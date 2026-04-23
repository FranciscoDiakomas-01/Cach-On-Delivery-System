import { DiscountType } from 'src/modules/Coupon/domain/interfaces';
import PercentDiscount from './strategies/Percent';
import FixedDiscount from './strategies/Fixed';
import IDiscount from './interface';

export default class DiscountFactory {
  private readonly strategy: Map<DiscountType, IDiscount> = new Map();
  constructor(private readonly value: number) {
    this.strategy.set(DiscountType.PERCENT, new PercentDiscount(this.value));
    this.strategy.set(DiscountType.FIXED, new FixedDiscount(this.value));
  }
  public apply(type: DiscountType, amount: number): number {
    const discount = this.strategy.get(type);
    if (!discount) {
      throw new Error(`No  discount strategy found for type: ${type}`);
    }
    return discount.apply(amount);
  }
}
