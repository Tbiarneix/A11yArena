import Link from 'next/link';
import type { Parcours } from '@/domain/parcours/Parcours';
import styles from './ParcoursCard.module.scss';

interface ParcoursCardProps {
  parcours: Parcours;
}

const DIFFICULTY_LABELS: Record<Parcours['difficulty'], string> = {
  easy: 'Débutant',
  medium: 'Intermédiaire',
  hard: 'Avancé',
};

export function ParcoursCard({ parcours }: ParcoursCardProps) {
  const progress =
    parcours.stepCount > 0
      ? Math.round((parcours.completedStepCount / parcours.stepCount) * 100)
      : 0;

  const isCompleted = progress === 100;
  const isStarted = progress > 0 && !isCompleted;

  const actionLabel = isCompleted
    ? 'Voir le certificat'
    : isStarted
      ? 'Continuer'
      : 'Commencer';

  if (parcours.isComingSoon) {
    return (
      <article
        className={[styles['parcours-card'], styles['parcours-card--coming-soon']].join(' ')}
        aria-labelledby={`parcours-title-${parcours.slug}`}
      >
        <span className={styles['parcours-card__coming-soon']}>Bientôt disponible</span>
        <h3
          id={`parcours-title-${parcours.slug}`}
          className={styles['parcours-card__title']}
        >
          {parcours.title}
        </h3>
        <p className={styles['parcours-card__desc']}>{parcours.description}</p>
      </article>
    );
  }

  return (
    <article
      className={[
        styles['parcours-card'],
        isCompleted ? styles['parcours-card--completed'] : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-labelledby={`parcours-title-${parcours.slug}`}
    >
      <div className={styles['parcours-card__meta']}>
        <span
          className={[
            styles['parcours-card__difficulty'],
            styles[`parcours-card__difficulty--${parcours.difficulty}`],
          ].join(' ')}
        >
          {DIFFICULTY_LABELS[parcours.difficulty]}
        </span>
        <span className={styles['parcours-card__count']}>
          {parcours.stepCount} challenges
        </span>
      </div>

      <h3
        id={`parcours-title-${parcours.slug}`}
        className={styles['parcours-card__title']}
      >
        {parcours.title}
      </h3>

      <p className={styles['parcours-card__desc']}>{parcours.description}</p>

      <dl className={styles['parcours-card__info']}>
        <div>
          <dt className={styles['parcours-card__info-label']}>Durée</dt>
          <dd className={styles['parcours-card__info-value']}>
            {parcours.estimatedHours}h
          </dd>
        </div>
      </dl>

      <div className={styles['parcours-card__progress']}>
        <div className={styles['parcours-card__progress-header']}>
          <span className={styles['parcours-card__progress-label']}>
            {parcours.completedStepCount}/{parcours.stepCount} étapes
          </span>
          <span
            className={styles['parcours-card__progress-pct']}
            aria-hidden="true"
          >
            {progress}%
          </span>
        </div>
        <div
          className={styles['parcours-card__progress-bar']}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progression : ${progress}%`}
        >
          <div
            className={styles['parcours-card__progress-fill']}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Link
        href={`/parcours/${parcours.slug}`}
        className={[
          styles['parcours-card__action'],
          isCompleted ? styles['parcours-card__action--completed'] : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label={`${actionLabel} : ${parcours.title}`}
      >
        {actionLabel}
      </Link>
    </article>
  );
}
