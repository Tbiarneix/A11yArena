export type TestType = 'axe' | 'keyboard' | 'manual';

export interface ChallengeTest {
  id: string;
  challengeSlug: string;
  order: number;
  type: TestType;
  description: string;
  wcagCriterion?: string;
  /** axe rule ID or custom rule key */
  ruleKey: string;
}
