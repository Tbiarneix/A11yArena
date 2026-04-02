import type { WcagLevel } from './WcagLevel';
import type { WcagPrinciple } from './WcagPrinciple';

export interface WcagCriterion {
  id: string;        // e.g. '1.1.1'
  title: string;
  description: string;
  level: WcagLevel;
  principle: WcagPrinciple;
  url: string;       // lien vers w3.org
}
