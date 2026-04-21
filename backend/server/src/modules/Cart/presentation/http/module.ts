import { Module } from '@nestjs/common';
import CartController from './controller';
import GetCartUseCase from '../../application/useCase/getCardUseCase';
import AddToCartUseCase from '../../application/useCase/addtoCardUseCase';
import RemoveFromCartUseCase from '../../application/useCase/removeToCardUseCase';
import { UserModule } from 'src/modules/User/presentation/http/module';
import { ProductModule } from 'src/modules/Product/presentation/htpp/module';

@Module({
  controllers: [CartController],
  providers: [GetCartUseCase, AddToCartUseCase, RemoveFromCartUseCase],
  exports: [GetCartUseCase, AddToCartUseCase, RemoveFromCartUseCase],
  imports: [UserModule, ProductModule],
})
export default class CartModule {}
