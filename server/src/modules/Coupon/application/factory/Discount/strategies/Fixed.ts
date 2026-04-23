/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DiscountType } from '@prisma/client';
import IDiscount from '../interface';
import { BadRequestException } from '@nestjs/common';

export default class FixedDiscount extends IDiscount {
  constructor(private readonly value: number) {
    super();
  }

  apply(amount: number): number {
    const value = Number(amount);
    if (value < 0 || value > 100) {
      throw new BadRequestException('Invalid fixed value');
    }
    return amount - value;
  }

  getType(): DiscountType {
    return DiscountType.FIXED;
  }
}
