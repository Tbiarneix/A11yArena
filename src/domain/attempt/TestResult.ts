export type TestResultStatus = 'pass' | 'fail' | 'pending';

export interface TestResult {
  testId: string;
  status: TestResultStatus;
  message?: string;
  impact?: 'critical' | 'serious' | 'moderate' | 'minor';
}
