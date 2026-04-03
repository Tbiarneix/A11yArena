import type { CodeFile } from '@/domain/challenge/CodeFile';
import type { ChallengeTest } from '@/domain/challenge/ChallengeTest';
import type { TestResult } from '@/domain/attempt/TestResult';

export interface TestExecutor {
  run(files: CodeFile[], tests: ChallengeTest[]): Promise<TestResult[]>;
}
