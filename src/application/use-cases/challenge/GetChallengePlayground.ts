import type { Challenge } from '@/domain/challenge/Challenge';
import type { StarterCode } from '@/domain/challenge/StarterCode';
import type { ChallengeTest } from '@/domain/challenge/ChallengeTest';
import type { ChallengeRepository } from '@/application/ports/ChallengeRepository';
import type { StarterCodeRepository } from '@/application/ports/StarterCodeRepository';

export interface ChallengePlaygroundDTO {
  challenge: Challenge;
  starterCode: StarterCode;
  tests: ChallengeTest[];
}

export class GetChallengePlayground {
  constructor(
    private readonly challengeRepo: ChallengeRepository,
    private readonly starterCodeRepo: StarterCodeRepository,
  ) {}

  async execute(slug: string): Promise<ChallengePlaygroundDTO | null> {
    const [challenge, starterCode, tests] = await Promise.all([
      this.challengeRepo.findBySlug(slug),
      this.starterCodeRepo.findByChallengeSlug(slug),
      this.starterCodeRepo.findTestsByChallengeSlug(slug),
    ]);

    if (!challenge || !starterCode) return null;

    return { challenge, starterCode, tests };
  }
}
