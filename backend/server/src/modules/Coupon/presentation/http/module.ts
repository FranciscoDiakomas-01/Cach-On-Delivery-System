import { Module } from '@nestjs/common';
import CreateCoupunUseCase from '../../application/use-cases/createCoupunUsecase';
import GetCouponUseCase from '../../application/use-cases/getCoupunUsecae';
import ToggleCoupunUseCase from '../../application/use-cases/toogleCoupunUseCase';
import UpdateCoupunUseCase from '../../application/use-cases/updateUseCase';
import CoupunController from './controller';

@Module({
  exports: [
    CreateCoupunUseCase,
    GetCouponUseCase,
    ToggleCoupunUseCase,
    UpdateCoupunUseCase,
  ],
  providers: [
    CreateCoupunUseCase,
    GetCouponUseCase,
    ToggleCoupunUseCase,
    UpdateCoupunUseCase,
  ],
  controllers: [CoupunController],
})
export default class CoupunModule {}
