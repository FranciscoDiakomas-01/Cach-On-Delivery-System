import Coupon from '../entities/Coupun';

export default abstract class CouponRepository {
  abstract create(coupon: Coupon): Promise<Coupon>;
  abstract findByUnique(unique: string): Promise<Coupon | null>;
  abstract get(): Promise<Coupon[]>;
  abstract update(coupon: Coupon): Promise<void>;
  abstract toogleActive(id: string, isActive: boolean): Promise<void>;
  abstract incrementUsesCount(id: string): Promise<void>;
}
