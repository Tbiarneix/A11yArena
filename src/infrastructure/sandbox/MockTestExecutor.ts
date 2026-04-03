import type { TestExecutor } from '@/application/ports/TestExecutor';
import type { CodeFile } from '@/domain/challenge/CodeFile';
import type { ChallengeTest } from '@/domain/challenge/ChallengeTest';
import type { TestResult } from '@/domain/attempt/TestResult';

/**
 * Server-side mock executor — returns pending results.
 * Real execution happens client-side in the iframe via axe-bridge.
 */
export class MockTestExecutor implements TestExecutor {
  async run(files: CodeFile[], tests: ChallengeTest[]): Promise<TestResult[]> {
    return tests.map((t) => ({
      testId: t.id,
      status: 'pending' as const,
    }));
  }
}
