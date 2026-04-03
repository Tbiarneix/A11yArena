import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getChallengePlayground } from '@/infrastructure/di/container';
import { DebriefView } from '@/components/playground/DebriefView/DebriefView';
import type { Attempt } from '@/domain/attempt/Attempt';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getChallengePlayground.execute(slug);
  if (!data) return { title: 'Débrief introuvable — A11y Arena' };
  return {
    title: `Débrief : ${data.challenge.title} — A11y Arena`,
    description: `Résultats et apprentissages pour le challenge ${data.challenge.title}`,
  };
}

export default async function DebriefPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getChallengePlayground.execute(slug);

  if (!data) notFound();

  const { challenge, tests } = data;

  // Mock attempt — en production, récupéré via AttemptRepository pour l'utilisateur connecté
  const mockAttempt: Attempt = {
    id: 'mock-debrief',
    challengeSlug: slug,
    status: 'submitted',
    files: [],
    results: tests.map((t, i) => ({
      testId: t.id,
      status: i < Math.ceil(tests.length * 0.6) ? 'pass' : 'fail',
    })),
    score: {
      passed: Math.ceil(tests.length * 0.6),
      total: tests.length,
      percent: 60,
      points: Math.ceil(tests.length * 0.6) * 100,
    },
    startedAt: new Date().toISOString(),
    submittedAt: new Date().toISOString(),
  };

  return (
    <main id="main-content" tabIndex={-1}>
      <nav aria-label="Fil d'Ariane" style={{ padding: '8px 24px', borderBottom: '1px solid #eee' }}>
        <ol role="list" style={{ display: 'flex', gap: 8, listStyle: 'none', margin: 0, padding: 0, fontSize: 14 }}>
          <li><Link href="/challenges">Challenges</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href={`/challenges/${slug}`}>{challenge.title}</Link></li>
          <li aria-hidden="true">/</li>
          <li><span aria-current="page">Débrief</span></li>
        </ol>
      </nav>
      <DebriefView challenge={challenge} attempt={mockAttempt} tests={tests} />
    </main>
  );
}
