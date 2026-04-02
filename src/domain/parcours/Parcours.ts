import type { Difficulty } from '@/domain/challenge/Difficulty';

export interface Parcours {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedHours: number;
  stepCount: number;
  completedStepCount: number; // 0 quand non connecté
  category: string;
  isComingSoon: boolean;
}
