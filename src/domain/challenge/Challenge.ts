import type { ChallengeType } from './ChallengeType';
import type { Difficulty } from './Difficulty';
import type { Category } from './Category';
import type { Framework } from './Framework';

export interface Challenge {
  id: string;
  slug: string;
  title: string;
  summary: string;
  type: ChallengeType;
  difficulty: Difficulty;
  category: Category;
  frameworks: Framework[];
  wcagCriteria: string[]; // e.g. ['1.1.1', '4.1.2']
  estimatedMinutes: number;
  isPublished: boolean;
}
