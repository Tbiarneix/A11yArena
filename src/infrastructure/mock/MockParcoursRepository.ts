import type { Parcours } from '@/domain/parcours/Parcours';
import type { ParcoursStep } from '@/domain/parcours/ParcoursStep';
import type { ParcoursRepository } from '@/application/ports/ParcoursRepository';
import { MOCK_PARCOURS, MOCK_STEPS } from './mockParcours';

export class MockParcoursRepository implements ParcoursRepository {
  async findAll(): Promise<Parcours[]> {
    return MOCK_PARCOURS;
  }

  async findBySlug(slug: string): Promise<Parcours | null> {
    return MOCK_PARCOURS.find((p) => p.slug === slug) ?? null;
  }

  async findSteps(parcoursSlug: string): Promise<ParcoursStep[]> {
    return MOCK_STEPS[parcoursSlug] ?? [];
  }
}
