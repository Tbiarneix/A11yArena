import type { Parcours } from '@/domain/parcours/Parcours';
import type { ParcoursStep } from '@/domain/parcours/ParcoursStep';

export interface ParcoursRepository {
  findAll(): Promise<Parcours[]>;
  findBySlug(slug: string): Promise<Parcours | null>;
  findSteps(parcoursSlug: string): Promise<ParcoursStep[]>;
}
