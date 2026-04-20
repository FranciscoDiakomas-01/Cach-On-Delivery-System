import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import EventRepository from '../../domains/repositories/abstraction';
import { EVENT_REPOSITORY } from 'src/core/constants';

import type { IPayloadEventProduct } from '../../domains/interface';
import { EventType } from 'src/modules/Recomendation/domain/entities/events';

@Injectable()
export class ProductEventHandler {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly repo: EventRepository,
  ) {}

  @OnEvent('product.clicked')
  async handleClick(payload: IPayloadEventProduct) {
    await this.repo.register({
      event: EventType.VIEW,
      productId: payload.productid,
      userId: payload.userid,
    });
  }

  @OnEvent('product.wishlist')
  async handleWishlist(payload: IPayloadEventProduct) {
    await this.repo.register({
      event: EventType.WISHLIST,
      productId: payload.productid,
      userId: payload.userid,
    });
  }

  @OnEvent('product.checkout')
  async handleCheckout(payload: IPayloadEventProduct) {
    await this.repo.register({
      event: EventType.CHECKOUT,
      productId: payload.productid,
      userId: payload.userid,
    });
  }

  @OnEvent('cart.item.added')
  async handlePurchase(payload: IPayloadEventProduct) {
    await this.repo.register({
      event: EventType.PURCHASE,
      productId: payload.productid,
      userId: payload.userid,
    });
  }

  @OnEvent('cart.item.removed')
  async handleUncheckout(payload: IPayloadEventProduct) {
    await this.repo.register({
      event: EventType.UNCHEKOUT,
      productId: payload.productid,
      userId: payload.userid,
    });
  }
}
