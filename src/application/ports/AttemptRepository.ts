import type { Attempt } from '@/domain/attempt/Attempt';

export interface AttemptRepository {
  save(attempt: Attempt): Promise<void>;
  findBySlugAndUser(challengeSlug: string, userId?: string): Promise<Attempt | null>;
}
