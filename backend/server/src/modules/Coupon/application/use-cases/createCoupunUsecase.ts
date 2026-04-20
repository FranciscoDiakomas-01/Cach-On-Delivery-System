import { COUPON_REPOSITORY, REDIS_CLIENT } from 'src/core/constants';
import { IUseCase } from 'src/core/types';
import type { ICacheClient } from 'src/infra/caching/type';
import CouponRepository from '../../domain/repositories/abstraction';
import { Inject, Injectable } from '@nestjs/common';
import { CoupunAlreadyExistError } from '../shared/error';
import Coupon from '../../domain/entities/Coupun';
import CreateCoupunDto from '../dto/create';

@Injectable()
export default class CreateCoupunUseCase implements IUseCase<
  CreateCoupunDto,
  Coupon
> {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly cache: ICacheClient,
    @Inject(COUPON_REPOSITORY)
    private readonly repo: CouponRepository,
  ) {}

  public async handle(data: CreateCoupunDto): Promise<Coupon> {
    const [existingCode] = await Promise.all([
      this.repo.findByUnique(data.code),
    ]);

    if (existingCode) {
      throw new CoupunAlreadyExistError();
    }
    const created = await this.repo.create({
      code: data.code,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: crypto.randomUUID(),
      isActive: true,
      maxDiscount: data.maxDiscount,
      maxUses: data.maxUses,
      minPurchase: data.minPurchase,
      type: data.type,
      usedCount: 0,
      value: data.value,
    });
    await this.cache.delete('coupuns');
    return created;
  }
}
