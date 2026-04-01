import { describe, it, expect } from "vitest";
import { computeNewBadges } from "@/lib/badges";
import type { ChallengeAttempt, Badge } from "@/types/user";

const makeAttempt = (overrides: Partial<ChallengeAttempt> = {}): ChallengeAttempt => ({
  id: "1",
  userId: "user1",
  challengeId: "c1",
  framework: "vanilla",
  status: "completed",
  score: 80,
  timeSpent: 300,
  submittedAt: new Date(),
  ...overrides,
});

describe("computeNewBadges", () => {
  it("awards first_challenge badge on first completion", () => {
    const newBadges = computeNewBadges([makeAttempt()], 1, []);
    expect(newBadges).toContain("first_challenge");
  });

  it("awards perfect_score badge for score 100", () => {
    const newBadges = computeNewBadges([makeAttempt({ score: 100 })], 1, []);
    expect(newBadges).toContain("perfect_score");
  });

  it("does not award already existing badges", () => {
    const existing: Badge[] = [{ id: "b1", badgeType: "first_challenge", unlockedAt: new Date() }];
    const newBadges = computeNewBadges([makeAttempt()], 1, existing);
    expect(newBadges).not.toContain("first_challenge");
  });
});
