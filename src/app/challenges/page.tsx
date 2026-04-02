import type { Metadata } from 'next';
import { Suspense } from 'react';
import { listChallenges } from '@/infrastructure/di/container';
import { ChallengeCard } from '@/components/challenge/ChallengeCard/ChallengeCard';
import { ChallengeFilters } from '@/components/challenge/ChallengeFilters/ChallengeFilters';
import type { ChallengeType } from '@/domain/challenge/ChallengeType';
import type { Difficulty } from '@/domain/challenge/Difficulty';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Challenges — A11y Arena',
  description: 'Relevez des défis d\'accessibilité concrets. Réparez, construisez ou auditez du code pour maîtriser WCAG & RGAA.',
};

interface PageProps {
  searchParams: Promise<{ type?: string; difficulty?: string }>;
}

export default async function ChallengesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const challenges = await listChallenges.execute({
    type: params.type as ChallengeType | undefined,
    difficulty: params.difficulty as Difficulty | undefined,
  });

  return (
    <>
      <section className={styles['hero']} aria-labelledby="challenges-heading">
        <div className={styles['hero__inner']}>
          <h1 id="challenges-heading" className={styles['hero__title']}>
            Challenges
          </h1>
          <p className={styles['hero__subtitle']}>
            {challenges.length} challenge{challenges.length > 1 ? 's' : ''} disponible
            {challenges.length > 1 ? 's' : ''}. Réparez, construisez ou auditez.
          </p>
        </div>
      </section>

      <section className={styles['content']} aria-label="Liste des challenges">
        <div className={styles['content__inner']}>
          <Suspense fallback={null}>
            <ChallengeFilters />
          </Suspense>

          {challenges.length === 0 ? (
            <p className={styles['empty']} role="status">
              Aucun challenge ne correspond à vos filtres.
            </p>
          ) : (
            <ul className={styles['grid']} role="list" aria-label={`${challenges.length} challenges`}>
              {challenges.map((challenge) => (
                <li key={challenge.id}>
                  <ChallengeCard challenge={challenge} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
