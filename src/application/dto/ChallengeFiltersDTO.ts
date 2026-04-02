import type { ChallengeType } from '@/domain/challenge/ChallengeType';
import type { Difficulty } from '@/domain/challenge/Difficulty';
import type { Category } from '@/domain/challenge/Category';
import type { Framework } from '@/domain/challenge/Framework';

export interface ChallengeFiltersDTO {
  type?: ChallengeType;
  difficulty?: Difficulty;
  category?: Category;
  framework?: Framework;
  search?: string;
}
