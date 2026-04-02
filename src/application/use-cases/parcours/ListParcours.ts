import type { Parcours } from '@/domain/parcours/Parcours';
import type { ParcoursRepository } from '@/application/ports/ParcoursRepository';

export class ListParcours {
  constructor(private readonly repo: ParcoursRepository) {}

  async execute(): Promise<Parcours[]> {
    return this.repo.findAll();
  }
}
