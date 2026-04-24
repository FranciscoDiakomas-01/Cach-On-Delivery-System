export enum DiscountType {
  FIXED = "FIXED",
  PERCENT = "PERCENT",
}

export default interface Coupon {
  id: string;
  code: string;
  type: DiscountType;
  value: number;
  minPurchase: number;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
