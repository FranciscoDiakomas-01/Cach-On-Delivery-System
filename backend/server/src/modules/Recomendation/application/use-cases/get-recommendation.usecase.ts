import { Inject, Injectable } from '@nestjs/common';
import { Weights } from '../../domain/constants';
import { decay, decodeCursor, encodeCursor } from '../shared/util';
import { IPagination } from 'src/core/types';
import { CursorInput } from '../../domain/entities/currsor';
import RecommendationRepository from '../../domain/repositories/abstraction';
import ProductRepository from 'src/modules/Product/domains/repositories/abstraction';
import { Product } from 'src/modules/Product/domains/entities/Product';
import {
  PRODUCT_REPOSITORY,
  RECOMMENDATION_REPOSITORY,
} from 'src/core/constants';

@Injectable()
export class GetRecomendationUseCase {
  constructor(
    @Inject(RECOMMENDATION_REPOSITORY)
    private readonly repository: RecommendationRepository,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async handle({
    userId,
    limit = 10,
    cursor,
    page,
  }: CursorInput): Promise<IPagination<Product>> {
    const events = await this.repository.getUserEvents(userId);
    if (!events.length) {
      const data = await this.productRepository.get({
        limit,
        page: page || 1,
      });
      return {
        items: data.items as any as Product[],
        limit,
        total: data.total,
        hasNexPage: data.hasNexPage,
        hasPrevPage: false,
        page: data.page,
        nextCursor: null,
        prevCursor: null,
      };
    }
    const scores = new Map<string, number>();
    const counters = new Map<string, Record<string, number>>();
    const productMap = new Map<string, { categoryId: string }>();
    for (const event of events) {
      productMap.set(event.productId, {
        categoryId: event.product.categoryId,
      });
      const counter = counters.get(event.productId) || {
        VIEW: 0,
        WISHLIST: 0,
        CHECKOUT: 0,
        PURCHASE: 0,
        UNCHEKOUT: 0,
      };

      counter[event.type]++;
      counters.set(event.productId, counter);

      const current = scores.get(event.productId) || 0;
      const weight = Weights[event.type];
      const timeFactor = decay(event.createdAt);

      scores.set(event.productId, current + weight * timeFactor);
    }

    // 🔥 ranking
    let ranked = [...scores.entries()]
      .map(([productId, score]) => ({ productId, score }))
      .sort((a, b) => {
        if (b.score === a.score) {
          return a.productId.localeCompare(b.productId);
        }
        return b.score - a.score;
      });

    // 🔥 cursor
    if (cursor) {
      const { score: cursorScore, productId: cursorId } = decodeCursor(cursor);

      ranked = ranked.filter((item) => {
        if (item.score < cursorScore) return true;
        if (item.score === cursorScore) {
          return item.productId > cursorId;
        }
        return false;
      });
    }

    const pool = ranked.slice(0, 100);

    const products = await this.repository.getProductsByIds(
      pool.map((p) => p.productId),
    );

    const productById = new Map(products.map((p) => [p.id, p]));

    // 🔥 diversity
    const categoryCount = new Map<string, number>();
    const MAX_PER_CATEGORY = 2;

    const result: Product[] = [];

    for (const item of pool) {
      const product = productById.get(item.productId);
      if (!product) continue;

      if (!product.isActive || product.available <= 0) continue;

      const count = categoryCount.get(product.categoryId) || 0;

      if (count < MAX_PER_CATEGORY) {
        result.push(product);
        categoryCount.set(product.categoryId, count + 1);
      }

      if (result.length >= limit) break;
    }

    // 🔥 cursor output
    const last = result[result.length - 1];

    const nextCursor = last
      ? encodeCursor({
          score: scores.get(last.id) || 0,
          productId: last.id,
        })
      : null;

    return {
      items: result,
      limit,
      total: scores.size,
      hasNexPage: result.length === limit,
      hasPrevPage: !!cursor,
      page: null,
      nextCursor,
      prevCursor: cursor ?? null,
    };
  }
}
