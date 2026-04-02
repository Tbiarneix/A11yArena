import type { Challenge } from '@/domain/challenge/Challenge';
import type { ChallengeRepository } from '@/application/ports/ChallengeRepository';

export class GetChallenge {
  constructor(private readonly repo: ChallengeRepository) {}

  async execute(slug: string): Promise<Challenge | null> {
    return this.repo.findBySlug(slug);
  }
}
