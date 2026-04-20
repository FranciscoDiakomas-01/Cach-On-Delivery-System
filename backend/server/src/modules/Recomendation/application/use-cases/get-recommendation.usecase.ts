import { Inject, Injectable } from '@nestjs/common';
import { Weights } from '../../domain/constants';
import { decay } from '../shared/util';
import { CursorInput } from '../../domain/entities/currsor';
import RecommendationRepository from '../../domain/repositories/abstraction';
import ProductRepository from 'src/modules/Product/domains/repositories/abstraction';
import { Product } from '@prisma/client';
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

  async handle({ userId, page }: CursorInput) {
    const events = await this.repository.getUserEvents(userId);
    if (!events.length) {
      const data = await this.productRepository.get({
        limit: 50,
        page: page || 1,
      });

      return {
        limit: data.limit,
        total: data.total,
        hasNexPage: data.hasNexPage,
        hasPrevPage: false,
        page: data.page,
        nextCursor: null,
        prevCursor: null,
        items: data.items as any as Product[],
      };
    }
    const scores = new Map<string, number>();
    const interactedIds = new Set<string>();
    const categoryIds = new Set<string>();

    for (const event of events) {
      interactedIds.add(event.productId);
      categoryIds.add(event.product.categoryId);
      const current = scores.get(event.productId) || 0;
      const weight = Weights[event.type];
      const timeFactor = decay(event.createdAt);
      scores.set(event.productId, current + weight * timeFactor);
    }

    const categoryArray = [...categoryIds];
    const interactedArray = [...interactedIds];
    const [interacted, similar, unInteracted] = await Promise.all([
      this.repository.getInteractedProducts(interactedArray),
      this.repository.getSimilarProducts(categoryArray, interactedArray),
      this.repository.getUnInteractedProducts(userId, {
        limit: 50,
        page: page || 1,
      }),
    ]);

    unInteracted.items = unInteracted.items.filter((p) => {
      return !interactedIds.has(p.id) && !categoryIds.has(p.categoryId);
    });
    const all = [...interacted, ...similar, ...unInteracted.items];
    const scored = all.map((product) => {
      let score = 0;
      if (interactedIds.has(product.id)) {
        score += 100;
      }
      if (categoryIds.has(product.categoryId)) {
        score += 30;
      }
      score += product.sellCount * 0.5;
      if (product.available > 0) {
        score += 10;
      }
      return {
        product,
        score,
      };
    });
    const feed = scored.sort((a, b) => b.score - a.score).map((i) => i.product);
    return {
      limit: unInteracted.limit,
      total: unInteracted.total,
      hasNexPage: unInteracted.hasNexPage,
      hasPrevPage: unInteracted.hasPrevPage,
      page: unInteracted.page,
      prevCursor: null,
      items: feed,
    };
  }
}
