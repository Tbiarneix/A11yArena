import { describe, it, expect } from "vitest";
import { calculateScore } from "@/lib/scoring";

describe("calculateScore", () => {
  it("returns 0 for empty test results", () => {
    expect(calculateScore({ testResults: [], timeSpentSeconds: 60, estimatedMinutes: 15, isFirstAttempt: true })).toBe(0);
  });

  it("returns 100 for all passing with bonuses", () => {
    const score = calculateScore({
      testResults: [{ testId: "1", passed: true }, { testId: "2", passed: true }],
      timeSpentSeconds: 100,
      estimatedMinutes: 15,
      isFirstAttempt: true,
    });
    expect(score).toBe(100); // 100 + 10 (time) + 5 (first try) capped at 100
  });

  it("returns partial score for partially passing tests", () => {
    const score = calculateScore({
      testResults: [{ testId: "1", passed: true }, { testId: "2", passed: false }],
      timeSpentSeconds: 300,
      estimatedMinutes: 15,
      isFirstAttempt: false,
    });
    expect(score).toBe(50);
  });
});
