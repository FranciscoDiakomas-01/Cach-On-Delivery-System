import { COUPON_REPOSITORY, REDIS_CLIENT } from 'src/core/constants';
import { IUseCase } from 'src/core/types';
import type { ICacheClient } from 'src/infra/caching/type';
import CouponRepository from '../../domain/repositories/abstraction';
import { Inject, Injectable } from '@nestjs/common';
import { CoupunAlreadyExistError, NotFoundCoupunError } from '../shared/error';
import CreateCoupunDto from '../dto/create';

@Injectable()
export default class UpdateCoupunUseCase implements IUseCase<
  CreateCoupunDto & { id: string },
  { message: string }
> {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly cache: ICacheClient,
    @Inject(COUPON_REPOSITORY)
    private readonly repo: CouponRepository,
  ) {}

  public async handle(
    data: CreateCoupunDto & { id: string },
  ): Promise<{ message: string }> {
    const { id } = data;

    const [existingCode, coupun] = await Promise.all([
      this.repo.findByUnique(data.code),
      this.repo.findByUnique(id),
    ]);

    if (existingCode && existingCode.id !== data.id) {
      throw new CoupunAlreadyExistError();
    }
    if (!coupun) {
      throw new NotFoundCoupunError();
    }
    await this.repo.update({
      code: data.code,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: data.id,
      isActive: coupun.isActive,
      maxUses: coupun.maxUses,
      minPurchase: data.minPurchase,
      type: data.type,
      usedCount: coupun.usedCount,
      value: data.value,
    });
    await this.cache.delete('coupuns');
    return {
      message: 'Actualizado com sucesso',
    };
  }
}
