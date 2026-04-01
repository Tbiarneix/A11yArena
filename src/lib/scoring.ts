import type { TestResult } from "@/types/user";

interface ScoringParams {
  testResults: TestResult[];
  timeSpentSeconds: number;
  estimatedMinutes: number;
  isFirstAttempt: boolean;
}

export function calculateScore({
  testResults,
  timeSpentSeconds,
  estimatedMinutes,
  isFirstAttempt,
}: ScoringParams): number {
  const total = testResults.length;
  if (total === 0) return 0;

  const passed = testResults.filter((r) => r.passed).length;
  const baseScore = (passed / total) * 100;

  if (passed < total) return Math.round(baseScore);

  // Bonus time: +10 if finished in under half the estimated time
  const estimatedSeconds = estimatedMinutes * 60;
  const timeBonus = timeSpentSeconds < estimatedSeconds / 2 ? 10 : 0;

  // Bonus first try: +5
  const firstTryBonus = isFirstAttempt ? 5 : 0;

  return Math.min(100, Math.round(baseScore + timeBonus + firstTryBonus));
}
