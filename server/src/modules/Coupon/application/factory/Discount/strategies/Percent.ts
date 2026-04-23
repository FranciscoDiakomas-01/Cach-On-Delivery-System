/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DiscountType } from '@prisma/client';
import IDiscount from '../interface';
import { BadRequestException } from '@nestjs/common';

export default class PercentDiscount extends IDiscount {
  constructor(private readonly value: number) {
    super();
  }

  apply(amount: number): number {
    if (this.value < 0 || this.value > 100) {
      throw new BadRequestException('Invalid percentage value');
    }
    return amount - (amount * this.value) / 100;
  }

  getType(): DiscountType {
    return DiscountType.PERCENT;
  }
}
