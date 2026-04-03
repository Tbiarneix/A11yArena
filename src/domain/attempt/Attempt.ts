import type { AttemptStatus } from './AttemptStatus';
import type { TestResult } from './TestResult';
import type { Score } from './Score';
import type { CodeFile } from '../challenge/CodeFile';

export interface Attempt {
  id: string;
  challengeSlug: string;
  userId?: string;
  status: AttemptStatus;
  files: CodeFile[];
  results: TestResult[];
  score?: Score;
  startedAt: string;
  submittedAt?: string;
}
