import type { StarterCodeRepository } from '@/application/ports/StarterCodeRepository';
import type { StarterCode } from '@/domain/challenge/StarterCode';
import type { ChallengeTest } from '@/domain/challenge/ChallengeTest';
import { MOCK_STARTER_CODES, MOCK_TESTS } from './mockStarterCode';

export class MockStarterCodeRepository implements StarterCodeRepository {
  async findByChallengeSlug(slug: string): Promise<StarterCode | null> {
    return MOCK_STARTER_CODES.find((s) => s.challengeSlug === slug) ?? null;
  }

  async findTestsByChallengeSlug(slug: string): Promise<ChallengeTest[]> {
    return MOCK_TESTS.filter((t) => t.challengeSlug === slug);
  }
}
