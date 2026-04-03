import type { AttemptRepository } from '@/application/ports/AttemptRepository';
import type { Attempt } from '@/domain/attempt/Attempt';

export class MockAttemptRepository implements AttemptRepository {
  private store: Attempt[] = [];

  async save(attempt: Attempt): Promise<void> {
    const idx = this.store.findIndex(
      (a) => a.challengeSlug === attempt.challengeSlug && a.userId === attempt.userId,
    );
    if (idx >= 0) {
      this.store[idx] = attempt;
    } else {
      this.store.push(attempt);
    }
  }

  async findBySlugAndUser(challengeSlug: string, userId?: string): Promise<Attempt | null> {
    return (
      this.store.find((a) => a.challengeSlug === challengeSlug && a.userId === userId) ?? null
    );
  }
}
