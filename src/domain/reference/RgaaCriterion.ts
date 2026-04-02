import type { WcagLevel } from './WcagLevel';

export interface RgaaCriterion {
  id: string;        // e.g. '1.1'
  title: string;
  description: string;
  theme: string;
  level: WcagLevel;
  wcagIds: string[]; // critères WCAG associés
}
