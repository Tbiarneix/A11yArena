import type { WcagCriterion } from '@/domain/reference/WcagCriterion';
import type { RgaaCriterion } from '@/domain/reference/RgaaCriterion';

export interface ReferenceRepository {
  findAllWcag(): Promise<WcagCriterion[]>;
  findWcagById(id: string): Promise<WcagCriterion | null>;
  findAllRgaa(): Promise<RgaaCriterion[]>;
  findRgaaById(id: string): Promise<RgaaCriterion | null>;
  getWcagRgaaMapping(): Promise<Record<string, string[]>>;
}
