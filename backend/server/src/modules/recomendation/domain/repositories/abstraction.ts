import { Recommendation } from '../entities/recomendation';

export abstract class RecommendationRepository {
  abstract save(rec: Recommendation): Promise<void>;
  abstract findByUser(userId: string): Promise<Recommendation[]>;
  abstract updateScores(): Promise<void>;
}
