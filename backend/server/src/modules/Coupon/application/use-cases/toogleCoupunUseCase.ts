import { COUPON_REPOSITORY, REDIS_CLIENT } from 'src/core/constants';
import { IUseCase } from 'src/core/types';
import type { ICacheClient } from 'src/infra/caching/type';
import CouponRepository from '../../domain/repositories/abstraction';
import { Inject, Injectable } from '@nestjs/common';
import { NotFoundCoupunError } from '../shared/error';

@Injectable()
export default class ToggleCoupunUseCase implements IUseCase<
  { id: string },
  { message: string }
> {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly cache: ICacheClient,
    @Inject(COUPON_REPOSITORY)
    private readonly repo: CouponRepository,
  ) {}

  public async handle(data: { id: string }): Promise<{ message: string }> {
    const { id } = data;
    const coupun = await this.repo.findByUnique(id);
    if (!coupun) {
      throw new NotFoundCoupunError();
    }
    await this.repo.toogleActive(id, coupun.isActive);
    await this.cache.delete('coupuns');
    return {
      message: 'Actualizado com sucesso',
    };
  }
}
