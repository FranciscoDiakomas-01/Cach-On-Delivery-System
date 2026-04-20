import type { ICacheClient } from 'src/infra/caching/type';
import CouponRepository from '../../domain/repositories/abstraction';
import Coupon from '../../domain/entities/Coupun';
import { Inject, Injectable } from '@nestjs/common';
import { COUPON_REPOSITORY, REDIS_CLIENT } from 'src/core/constants';
import { InactiveCounpunError, NotFoundCoupunError } from '../shared/error';

@Injectable()
export default class GetCouponUseCase {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly cache: ICacheClient,
    @Inject(COUPON_REPOSITORY)
    private readonly repo: CouponRepository,
  ) {}

  public async get() {
    const cached = await this.cache.get<Coupon[]>('coupons');
    if (cached && cached.length > 0) {
      return {
        data: cached,
      };
    }
    const coupuns = await this.repo.get();
    await this.cache.set('coupuns', coupuns, 10000);
    return {
      data: coupuns,
    };
  }

  public async isDisponible(unique: string) {
    const coupun = await this.repo.findByUnique(unique);
    if (!coupun) {
      throw new NotFoundCoupunError();
    }
    if (
      (coupun.maxUses && coupun.usedCount >= coupun.maxUses) ||
      !coupun.isActive
    ) {
      await this.repo.toogleActive(coupun.id, false);
      throw new InactiveCounpunError();
    }
    return {
      data: coupun,
      isAvaliable: true,
    };
  }
}
