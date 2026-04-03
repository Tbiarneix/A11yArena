import type { StarterCode } from '@/domain/challenge/StarterCode';
import type { ChallengeTest } from '@/domain/challenge/ChallengeTest';

export interface StarterCodeRepository {
  findByChallengeSlug(slug: string): Promise<StarterCode | null>;
  findTestsByChallengeSlug(slug: string): Promise<ChallengeTest[]>;
}
