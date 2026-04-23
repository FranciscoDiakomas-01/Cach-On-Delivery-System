/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import ReviewRepository from 'src/modules/Review/domains/repositories/absrtraction';
import Review from 'src/modules/Review/domains/entities/Review';

@Injectable()
export default class PrismaReviewRepository implements ReviewRepository {
  constructor(private prisma: PrismaService) {}

  async create(review: Review): Promise<Review> {
    const data = await this.prisma.review.create({
      data: {
        id: review.id,
        userId: review.userId,
        orderId: review.orderId,
        rating: review.rating,
        content: review.content,
      },
    });

    return data as Review;
  }
  async findByOrderId(orderId: string): Promise<Review[]> {
    const reviews = await this.prisma.review.findMany({
      where: { orderId },
      include: {
        user: {
          omit: {
            password: true,
          },
        },
        order: {
          include: {
            deliveryman: true,
          },
        },
      },
    });
    return reviews as any as Review[];
  }
}
