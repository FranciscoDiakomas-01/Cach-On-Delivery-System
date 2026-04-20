import { DiscountType } from '../interfaces';

export default interface Coupon {
  id: string;
  code: string;
  type: DiscountType;
  value: number;
  minPurchase: number;
  maxDiscount: number;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
