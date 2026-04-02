import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getParcours } from '@/infrastructure/di/container';
import { ParcoursTimeline } from '@/components/parcours/ParcoursTimeline/ParcoursTimeline';
import styles from './page.module.scss';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getParcours.execute(slug);
  if (!result) return {};
  const { parcours } = result;
  return {
    title: `${parcours.title} — Parcours — A11y Arena`,
    description: parcours.description,
  };
}

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'Débutant',
  medium: 'Intermédiaire',
  hard: 'Avancé',
};

export default async function ParcoursDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getParcours.execute(slug);
  if (!result) notFound();

  const { parcours, steps } = result;
  const progress =
    parcours.stepCount > 0
      ? Math.round((parcours.completedStepCount / parcours.stepCount) * 100)
      : 0;

  return (
    <>
      {/* ── En-tête ───────────────────────────────────────── */}
      <section className={styles['header']} aria-labelledby="parcours-heading">
        <div className={styles['header__inner']}>
          <div className={styles['header__content']}>
            <h1 id="parcours-heading" className={styles['header__title']}>
              {parcours.title}
            </h1>
            <p className={styles['header__desc']}>{parcours.description}</p>
            <dl className={styles['header__meta']}>
              <div>
                <dt className={styles['header__meta-label']}>Durée</dt>
                <dd className={styles['header__meta-value']}>{parcours.estimatedHours}h</dd>
              </div>
              <div>
                <dt className={styles['header__meta-label']}>Niveau</dt>
                <dd className={styles['header__meta-value']}>
                  {DIFFICULTY_LABELS[parcours.difficulty]}
                </dd>
              </div>
              <div>
                <dt className={styles['header__meta-label']}>Étapes</dt>
                <dd className={styles['header__meta-value']}>{parcours.stepCount}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ── Barre de progression globale ─────────────────── */}
      {progress > 0 && (
        <div className={styles['progress-bar-wrapper']} aria-label={`Progression du parcours : ${progress}%`}>
          <div className={styles['progress-bar-inner']}>
            <span className={styles['progress-bar__label']}>
              Progression — {parcours.completedStepCount}/{parcours.stepCount} étapes ({progress}%)
            </span>
            <div
              className={styles['progress-bar__track']}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={styles['progress-bar__fill']}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Timeline ─────────────────────────────────────── */}
      <section className={styles['timeline-section']} aria-labelledby="timeline-heading">
        <div className={styles['timeline-inner']}>
          <h2 id="timeline-heading" className={styles['timeline-title']}>
            Programme
          </h2>
          {steps.length > 0 ? (
            <ParcoursTimeline steps={steps} />
          ) : (
            <p className={styles['empty']} role="status">
              Ce parcours est en cours de construction. Revenez bientôt.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
