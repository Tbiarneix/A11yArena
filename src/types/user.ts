import type { Category } from "./challenge";

export interface UserProfile {
  id: string;
  displayName: string;
  avatarUrl?: string;
  githubHandle?: string;
  isReviewer: boolean;
  stats: UserStats;
}

export interface UserStats {
  totalCompleted: number;
  totalAttempted: number;
  currentStreak: number;
  longestStreak: number;
  byCategory: Record<Category, { completed: number; total: number }>;
  badges: Badge[];
}

export interface Badge {
  id: string;
  badgeType: string;
  badgeValue?: string;
  unlockedAt: Date;
}

export interface ChallengeAttempt {
  id: string;
  userId: string;
  challengeId: string;
  framework: "vanilla" | "react" | "angular";
  status: "not_started" | "in_progress" | "completed" | "failed";
  submittedCode?: Record<string, string>;
  testResults?: TestResult[];
  score: number;
  timeSpent: number;
  submittedAt: Date;
}

export interface TestResult {
  testId: string;
  passed: boolean;
  message?: string;
}
