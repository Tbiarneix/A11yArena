export type StepStatus = 'completed' | 'active' | 'locked';

export interface ParcoursStep {
  id: string;
  parcoursId: string;
  order: number;
  challengeSlug: string;
  challengeTitle: string;
  challengeSummary: string;
  status: StepStatus;
  scorePercent?: number;     // défini si completed
  completedAt?: string;      // ISO date string si completed
  insight?: string;          // note pédagogique optionnelle après l'étape
}
