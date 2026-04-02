import type { WcagCriterion } from '@/domain/reference/WcagCriterion';
import type { RgaaCriterion } from '@/domain/reference/RgaaCriterion';
import type { ReferenceRepository } from '@/application/ports/ReferenceRepository';

export class ListReferences {
  constructor(private readonly repo: ReferenceRepository) {}

  async wcag(): Promise<WcagCriterion[]> {
    return this.repo.findAllWcag();
  }

  async rgaa(): Promise<RgaaCriterion[]> {
    return this.repo.findAllRgaa();
  }

  async mapping(): Promise<Record<string, string[]>> {
    return this.repo.getWcagRgaaMapping();
  }
}
