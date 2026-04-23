import Review from '../entities/Review';

export default abstract class ReviewRepository {
  abstract create(review: Review): Promise<Review>;
  abstract findByOrderId(orderId: string): Promise<Review[]>;
}
