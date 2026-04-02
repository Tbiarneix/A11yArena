import type { Challenge } from '@/domain/challenge/Challenge';
import type { ChallengeRepository } from '@/application/ports/ChallengeRepository';
import type { ChallengeFiltersDTO } from '@/application/dto/ChallengeFiltersDTO';
import { MOCK_CHALLENGES } from './mockChallenges';

export class MockChallengeRepository implements ChallengeRepository {
  async findAll(filters?: ChallengeFiltersDTO): Promise<Challenge[]> {
    let results = MOCK_CHALLENGES.filter((c) => c.isPublished);

    if (filters?.type) {
      results = results.filter((c) => c.type === filters.type);
    }
    if (filters?.difficulty) {
      results = results.filter((c) => c.difficulty === filters.difficulty);
    }
    if (filters?.category) {
      results = results.filter((c) => c.category === filters.category);
    }
    if (filters?.framework) {
      results = results.filter((c) => c.frameworks.includes(filters.framework!));
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.summary.toLowerCase().includes(q),
      );
    }

    return results;
  }

  async findBySlug(slug: string): Promise<Challenge | null> {
    return MOCK_CHALLENGES.find((c) => c.slug === slug) ?? null;
  }
}
