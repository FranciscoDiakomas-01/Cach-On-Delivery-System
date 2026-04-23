import { Module } from '@nestjs/common';
import ToggleToWishListUseCase from '../../application/usecase/toggletoListUseCase';
import GetWishListUseCase from '../../application/usecase/getMyListUseCase';
import WishlistController from './controller';

@Module({
  providers: [ToggleToWishListUseCase, GetWishListUseCase],
  exports: [ToggleToWishListUseCase, GetWishListUseCase],
  controllers: [WishlistController],
})
export default class WishListModule {}
