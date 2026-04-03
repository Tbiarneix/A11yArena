import type { Attempt } from '@/domain/attempt/Attempt';
import type { CodeFile } from '@/domain/challenge/CodeFile';
import type { ChallengeTest } from '@/domain/challenge/ChallengeTest';
import type { Score } from '@/domain/attempt/Score';
import type { AttemptRepository } from '@/application/ports/AttemptRepository';
import type { TestExecutor } from '@/application/ports/TestExecutor';

export interface SubmitAttemptInput {
  challengeSlug: string;
  files: CodeFile[];
  tests: ChallengeTest[];
  userId?: string;
}

export class SubmitAttempt {
  constructor(
    private readonly attemptRepo: AttemptRepository,
    private readonly testExecutor: TestExecutor,
  ) {}

  async execute(input: SubmitAttemptInput): Promise<Attempt> {
    const results = await this.testExecutor.run(input.files, input.tests);

    const passed = results.filter((r) => r.status === 'pass').length;
    const total = results.length;
    const score: Score = {
      passed,
      total,
      percent: total > 0 ? Math.round((passed / total) * 100) : 0,
      points: passed * 100,
    };

    const attempt: Attempt = {
      id: crypto.randomUUID(),
      challengeSlug: input.challengeSlug,
      userId: input.userId,
      status: score.percent === 100 ? 'passed' : 'failed',
      files: input.files,
      results,
      score,
      startedAt: new Date().toISOString(),
      submittedAt: new Date().toISOString(),
    };

    await this.attemptRepo.save(attempt);

    return attempt;
  }
}
