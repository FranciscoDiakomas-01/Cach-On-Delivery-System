import { Module } from '@nestjs/common';
import OrderController from './controller';
import { OrderExpirationCron } from '../../application/services/jobsServices/jobservice';

import CreateOrderUseCase from '../../application/use-cases/createOrderUsecase';
import GetOrdersUseCase from '../../application/use-cases/getOrderUseCase';
import UpdateOrderUseCase from '../../application/use-cases/updateOrderStatusUseCase';
import CartModule from 'src/modules/Cart/presentation/http/module';
import { UserModule } from 'src/modules/User/presentation/http/module';
import CoupunModule from 'src/modules/Coupon/presentation/http/module';
@Module({
  controllers: [OrderController],
  imports: [CartModule, UserModule, CoupunModule],
  exports: [
    OrderExpirationCron,
    CreateOrderUseCase,
    GetOrdersUseCase,
    UpdateOrderUseCase,
  ],
  providers: [
    OrderExpirationCron,
    CreateOrderUseCase,
    GetOrdersUseCase,
    UpdateOrderUseCase,
  ],
})
export default class OrderModule {}
