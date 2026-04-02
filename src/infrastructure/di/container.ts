import { MockChallengeRepository } from '@/infrastructure/mock/MockChallengeRepository';
import { MockParcoursRepository } from '@/infrastructure/mock/MockParcoursRepository';
import { MockReferenceRepository } from '@/infrastructure/mock/MockReferenceRepository';
import { ListChallenges } from '@/application/use-cases/challenge/ListChallenges';
import { GetChallenge } from '@/application/use-cases/challenge/GetChallenge';
import { ListParcours } from '@/application/use-cases/parcours/ListParcours';
import { GetParcours } from '@/application/use-cases/parcours/GetParcours';
import { ListReferences } from '@/application/use-cases/reference/ListReferences';

// ─── Repositories ────────────────────────────────────────────────────────────
// Swapper par les implémentations Drizzle une fois la DB configurée
const challengeRepo = new MockChallengeRepository();
const parcoursRepo = new MockParcoursRepository();
const referenceRepo = new MockReferenceRepository();

// ─── Use cases ───────────────────────────────────────────────────────────────
export const listChallenges = new ListChallenges(challengeRepo);
export const getChallenge = new GetChallenge(challengeRepo);
export const listParcours = new ListParcours(parcoursRepo);
export const getParcours = new GetParcours(parcoursRepo);
export const listReferences = new ListReferences(referenceRepo);
