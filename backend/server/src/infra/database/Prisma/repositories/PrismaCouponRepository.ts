import CouponRepository from 'src/modules/Coupon/domain/repositories/abstraction';
import { PrismaService } from '../prisma';
import { Injectable } from '@nestjs/common';
import Coupon from 'src/modules/Coupon/domain/entities/Coupun';

@Injectable()
export default class PrismaCouponRepository extends CouponRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }
  public async create(coupon: Coupon): Promise<Coupon> {
    const data = await this.prisma.coupon.create({
      data: {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        isActive: true,
        maxUses: coupon.maxUses,
        maxDiscount: coupon.maxDiscount,
        minPurchase: coupon.minPurchase,
        usedCount: 0,
      },
    });
    return data as any as Coupon;
  }
  public async update(coupon: Coupon): Promise<void> {
    await this.prisma.coupon.update({
      data: {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        maxUses: coupon.maxUses,
        maxDiscount: coupon.maxDiscount,
        minPurchase: coupon.minPurchase,
      },
      where: {
        id: coupon.id,
      },
    });
  }
  public async findByUnique(unique: string): Promise<Coupon | null> {
    return (await this.prisma.coupon.findFirst({
      where: {
        OR: [
          {
            code: unique,
          },
          {
            id: unique,
          },
        ],
      },
    })) as any as Coupon;
  }
  public async toogleActive(id: string, isActive: boolean): Promise<void> {
    await this.prisma.coupon.update({
      data: {
        isActive,
      },
      where: {
        id,
      },
    });
  }
  public async incrementUsesCount(id: string): Promise<void> {
    await this.prisma.coupon.update({
      data: {
        usedCount: {
          increment: 1,
        },
      },
      where: {
        id,
      },
    });
  }

  public async get(): Promise<Coupon[]> {
    return (await this.prisma.coupon.findMany()) as any as Coupon[];
  }
}
