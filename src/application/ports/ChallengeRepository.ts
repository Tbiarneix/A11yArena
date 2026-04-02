import type { Challenge } from '@/domain/challenge/Challenge';
import type { ChallengeFiltersDTO } from '@/application/dto/ChallengeFiltersDTO';

export interface ChallengeRepository {
  findAll(filters?: ChallengeFiltersDTO): Promise<Challenge[]>;
  findBySlug(slug: string): Promise<Challenge | null>;
}
