import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getChallengePlayground } from '@/infrastructure/di/container';
import { PlaygroundLayout } from '@/components/playground/PlaygroundLayout/PlaygroundLayout';
import styles from './page.module.scss';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getChallengePlayground.execute(slug);
  if (!data) return { title: 'Challenge introuvable — A11y Arena' };
  return {
    title: `${data.challenge.title} — A11y Arena`,
    description: data.challenge.summary,
  };
}

export default async function ChallengePage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getChallengePlayground.execute(slug);

  if (!data) notFound();

  const { challenge, starterCode, tests } = data;

  return (
    <>
      {/* Sub-header: breadcrumb + challenge meta */}
      <div className={styles['challenge-header']}>
        <nav aria-label="Fil d'Ariane" className={styles['challenge-header__breadcrumb']}>
          <ol role="list">
            <li>
              <Link href="/challenges">Challenges</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span aria-current="page">{challenge.title}</span>
            </li>
          </ol>
        </nav>
        <div className={styles['challenge-header__meta']}>
          {challenge.wcagCriteria.length > 0 && (
            <ul className={styles['challenge-header__wcag']} role="list" aria-label="Critères WCAG">
              {challenge.wcagCriteria.map((c) => (
                <li key={c}>
                  <span className={styles['challenge-header__wcag-tag']}>WCAG {c}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Playground — full-height interactive zone */}
      <PlaygroundLayout challenge={challenge} starterCode={starterCode} tests={tests} />
    </>
  );
}
