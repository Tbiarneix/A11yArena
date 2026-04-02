import Link from 'next/link';
import type { ParcoursStep } from '@/domain/parcours/ParcoursStep';
import styles from './ParcoursTimeline.module.scss';

interface ParcoursTimelineProps {
  steps: ParcoursStep[];
}

export function ParcoursTimeline({ steps }: ParcoursTimelineProps) {
  return (
    <ol className={styles.timeline} aria-label="Étapes du parcours">
      {steps.map((step, index) => (
        <li
          key={step.id}
          className={[
            styles['timeline__step'],
            styles[`timeline__step--${step.status}`],
          ].join(' ')}
          aria-current={step.status === 'active' ? 'step' : undefined}
        >
          <div className={styles['timeline__connector']} aria-hidden="true">
            <span className={styles['timeline__number']}>
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div className={styles['timeline__content']}>
            {step.status === 'active' && (
              <span className={styles['timeline__active-badge']}>
                Étape en cours
              </span>
            )}

            <h3 className={styles['timeline__title']}>{step.challengeTitle}</h3>
            <p className={styles['timeline__desc']}>{step.challengeSummary}</p>

            {step.status === 'completed' && step.scorePercent !== undefined && (
              <p className={styles['timeline__score']}>
                Score : {step.scorePercent}%
                {step.completedAt && (
                  <span className={styles['timeline__date']}>
                    {' '}
                    — {new Date(step.completedAt).toLocaleDateString('fr-FR')}
                  </span>
                )}
              </p>
            )}

            {step.status === 'locked' && (
              <p className={styles['timeline__locked-msg']}>
                <span aria-hidden="true">🔒 </span>
                Débloquez en complétant l&apos;étape précédente
              </p>
            )}

            <div className={styles['timeline__actions']}>
              {step.status === 'active' && (
                <Link
                  href={`/challenges/${step.challengeSlug}`}
                  className={styles['timeline__cta']}
                >
                  Reprendre le challenge
                </Link>
              )}
              {step.status === 'completed' && (
                <Link
                  href={`/challenges/${step.challengeSlug}/debrief`}
                  className={styles['timeline__review']}
                >
                  Revoir
                </Link>
              )}
            </div>
          </div>
        </li>
      ))}

      {steps.some((s) => s.status === 'completed') && (
        <li className={styles['timeline__reward']} aria-label="Récompense de fin de parcours">
          <div className={styles['timeline__reward-inner']}>
            <span aria-hidden="true" className={styles['timeline__reward-icon']}>
              🏆
            </span>
            <div>
              <h3 className={styles['timeline__reward-title']}>
                Récompense de complétion
              </h3>
              <p className={styles['timeline__reward-desc']}>
                Terminez toutes les étapes pour obtenir votre badge de maîtrise.
              </p>
            </div>
          </div>
        </li>
      )}
    </ol>
  );
}
