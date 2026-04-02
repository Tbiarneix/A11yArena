import type { Parcours } from '@/domain/parcours/Parcours';
import type { ParcoursStep } from '@/domain/parcours/ParcoursStep';
import type { ParcoursRepository } from '@/application/ports/ParcoursRepository';

export interface ParcoursWithSteps {
  parcours: Parcours;
  steps: ParcoursStep[];
}

export class GetParcours {
  constructor(private readonly repo: ParcoursRepository) {}

  async execute(slug: string): Promise<ParcoursWithSteps | null> {
    const parcours = await this.repo.findBySlug(slug);
    if (!parcours) return null;
    const steps = await this.repo.findSteps(slug);
    return { parcours, steps };
  }
}
