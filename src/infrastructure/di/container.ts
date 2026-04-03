import { MockChallengeRepository } from '@/infrastructure/mock/MockChallengeRepository';
import { MockParcoursRepository } from '@/infrastructure/mock/MockParcoursRepository';
import { MockReferenceRepository } from '@/infrastructure/mock/MockReferenceRepository';
import { MockStarterCodeRepository } from '@/infrastructure/mock/MockStarterCodeRepository';
import { MockAttemptRepository } from '@/infrastructure/mock/MockAttemptRepository';
import { MockTestExecutor } from '@/infrastructure/sandbox/MockTestExecutor';
import { ListChallenges } from '@/application/use-cases/challenge/ListChallenges';
import { GetChallenge } from '@/application/use-cases/challenge/GetChallenge';
import { GetChallengePlayground } from '@/application/use-cases/challenge/GetChallengePlayground';
import { ListParcours } from '@/application/use-cases/parcours/ListParcours';
import { GetParcours } from '@/application/use-cases/parcours/GetParcours';
import { ListReferences } from '@/application/use-cases/reference/ListReferences';
import { SubmitAttempt } from '@/application/use-cases/attempt/SubmitAttempt';

// ─── Repositories ────────────────────────────────────────────────────────────
// Swapper par les implémentations Drizzle une fois la DB configurée
const challengeRepo = new MockChallengeRepository();
const parcoursRepo = new MockParcoursRepository();
const referenceRepo = new MockReferenceRepository();
const starterCodeRepo = new MockStarterCodeRepository();
const attemptRepo = new MockAttemptRepository();
const testExecutor = new MockTestExecutor();

// ─── Use cases ───────────────────────────────────────────────────────────────
export const listChallenges = new ListChallenges(challengeRepo);
export const getChallenge = new GetChallenge(challengeRepo);
export const getChallengePlayground = new GetChallengePlayground(challengeRepo, starterCodeRepo);
export const listParcours = new ListParcours(parcoursRepo);
export const getParcours = new GetParcours(parcoursRepo);
export const listReferences = new ListReferences(referenceRepo);
export const submitAttempt = new SubmitAttempt(attemptRepo, testExecutor);
