import type { Challenge } from '@/domain/challenge/Challenge';
import type { ChallengeTest } from '@/domain/challenge/ChallengeTest';
import styles from './InstructionsPanel.module.scss';

interface InstructionsPanelProps {
  challenge: Challenge;
  tests: ChallengeTest[];
}

const DIFFICULTY_LABEL: Record<string, string> = {
  debutant: 'Débutant',
  intermediaire: 'Intermédiaire',
  avance: 'Avancé',
};

const TYPE_LABEL: Record<string, string> = {
  fix: 'Correction',
  build: 'Construction',
  audit: 'Audit',
};

export function InstructionsPanel({ challenge, tests }: InstructionsPanelProps) {
  return (
    <aside className={styles['instructions']} aria-labelledby="instructions-heading">
      <div className={styles['instructions__header']}>
        <div className={styles['instructions__badges']}>
          <span className={`${styles['badge']} ${styles[`badge--${challenge.type}`]}`}>
            {TYPE_LABEL[challenge.type] ?? challenge.type}
          </span>
          <span className={styles['badge']}>
            {DIFFICULTY_LABEL[challenge.difficulty] ?? challenge.difficulty}
          </span>
        </div>
        <h2 id="instructions-heading" className={styles['instructions__title']}>
          {challenge.title}
        </h2>
        <p className={styles['instructions__summary']}>{challenge.summary}</p>
      </div>

      <div className={styles['instructions__body']}>
        <section className={styles['instructions__section']}>
          <h3 className={styles['instructions__section-title']}>Objectif</h3>
          <p className={styles['instructions__text']}>
            Corrigez le code dans l&apos;éditeur pour satisfaire tous les tests d&apos;accessibilité ci-contre.
            Chaque test correspond à un critère WCAG.
          </p>
        </section>

        {challenge.wcagCriteria.length > 0 && (
          <section className={styles['instructions__section']}>
            <h3 className={styles['instructions__section-title']}>Critères WCAG</h3>
            <ul className={styles['instructions__wcag-list']} role="list">
              {challenge.wcagCriteria.map((c) => (
                <li key={c} className={styles['instructions__wcag-item']}>
                  <span className={styles['instructions__wcag-id']}>{c}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className={styles['instructions__section']}>
          <h3 className={styles['instructions__section-title']}>
            Tests à réussir ({tests.length})
          </h3>
          <ol className={styles['instructions__tests']} role="list">
            {tests.map((test, i) => (
              <li key={test.id} className={styles['instructions__test-item']}>
                <span className={styles['instructions__test-num']}>{i + 1}</span>
                <span className={styles['instructions__test-desc']}>{test.description}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles['instructions__section']}>
          <h3 className={styles['instructions__section-title']}>Ressources utiles</h3>
          <ul className={styles['instructions__resources']} role="list">
            <li>
              <a
                href="https://www.w3.org/WAI/WCAG22/Understanding/"
                className={styles['instructions__link']}
                target="_blank"
                rel="noopener noreferrer"
              >
                Comprendre WCAG 2.2
                <span className="sr-only">(ouvre un nouvel onglet)</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.w3.org/WAI/ARIA/apg/"
                className={styles['instructions__link']}
                target="_blank"
                rel="noopener noreferrer"
              >
                WAI-ARIA Authoring Practices
                <span className="sr-only">(ouvre un nouvel onglet)</span>
              </a>
            </li>
          </ul>
        </section>
      </div>

      <div className={styles['instructions__footer']}>
        <span className={styles['instructions__duration']}>
          ⏱ {challenge.estimatedMinutes} min estimées
        </span>
      </div>
    </aside>
  );
}
