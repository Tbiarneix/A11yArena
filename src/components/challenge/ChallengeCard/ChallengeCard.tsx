import Link from 'next/link';
import type { Challenge } from '@/domain/challenge/Challenge';
import styles from './ChallengeCard.module.scss';

interface ChallengeCardProps {
  challenge: Challenge;
}

const TYPE_LABELS: Record<Challenge['type'], string> = {
  fix: 'Fix',
  build: 'Build',
  audit: 'Audit',
};

const DIFFICULTY_LABELS: Record<Challenge['difficulty'], string> = {
  easy: 'Facile',
  medium: 'Intermédiaire',
  hard: 'Difficile',
};

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <article
      className={styles['challenge-card']}
      aria-labelledby={`challenge-title-${challenge.slug}`}
    >
      <div className={styles['challenge-card__header']}>
        <span
          className={[
            styles['challenge-card__type'],
            styles[`challenge-card__type--${challenge.type}`],
          ].join(' ')}
        >
          {TYPE_LABELS[challenge.type]}
        </span>
        <span
          className={[
            styles['challenge-card__difficulty'],
            styles[`challenge-card__difficulty--${challenge.difficulty}`],
          ].join(' ')}
        >
          {DIFFICULTY_LABELS[challenge.difficulty]}
        </span>
      </div>

      <h3
        id={`challenge-title-${challenge.slug}`}
        className={styles['challenge-card__title']}
      >
        {challenge.title}
      </h3>

      <p className={styles['challenge-card__summary']}>{challenge.summary}</p>

      <ul className={styles['challenge-card__wcag']} role="list" aria-label="Critères WCAG">
        {challenge.wcagCriteria.slice(0, 3).map((id) => (
          <li key={id} className={styles['challenge-card__wcag-tag']}>
            WCAG {id}
          </li>
        ))}
      </ul>

      <div className={styles['challenge-card__footer']}>
        <span className={styles['challenge-card__duration']}>
          <span aria-hidden="true">⏱</span>{' '}
          <span>{challenge.estimatedMinutes} min</span>
        </span>
        <Link
          href={`/challenges/${challenge.slug}`}
          className={styles['challenge-card__link']}
          aria-label={`Commencer le challenge : ${challenge.title}`}
        >
          Commencer
        </Link>
      </div>
    </article>
  );
}
