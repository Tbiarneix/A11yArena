import type { Challenge } from '@/domain/challenge/Challenge';
import type { ChallengeRepository } from '@/application/ports/ChallengeRepository';
import type { ChallengeFiltersDTO } from '@/application/dto/ChallengeFiltersDTO';

export class ListChallenges {
  constructor(private readonly repo: ChallengeRepository) {}

  async execute(filters?: ChallengeFiltersDTO): Promise<Challenge[]> {
    return this.repo.findAll(filters);
  }
}
