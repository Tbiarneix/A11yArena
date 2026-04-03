'use client';

import type { ChallengeTest } from '@/domain/challenge/ChallengeTest';
import type { TestResult } from '@/domain/attempt/TestResult';
import styles from './TestRunner.module.scss';

interface TestRunnerProps {
  tests: ChallengeTest[];
  results: TestResult[];
  status: 'idle' | 'running' | 'done' | 'error';
  onRun: () => void;
}

const STATUS_ICON: Record<TestResult['status'], string> = {
  pass: '✓',
  fail: '✗',
  pending: '○',
};

const IMPACT_LABEL: Record<string, string> = {
  critical: 'Critique',
  serious: 'Sérieux',
  moderate: 'Modéré',
  minor: 'Mineur',
};

export function TestRunner({ tests, results, status, onRun }: TestRunnerProps) {
  const passed = results.filter((r) => r.status === 'pass').length;
  const total = tests.length;

  return (
    <section className={styles['test-runner']} aria-labelledby="test-runner-heading">
      <div className={styles['test-runner__header']}>
        <h2 id="test-runner-heading" className={styles['test-runner__title']}>
          Tests d&apos;accessibilité
        </h2>
        {status === 'done' && (
          <p className={styles['test-runner__score']} aria-live="polite">
            <strong>{passed}/{total}</strong> tests réussis
          </p>
        )}
      </div>

      <div
        className={styles['test-runner__list-wrapper']}
        role="region"
        aria-live="polite"
        aria-label="Résultats des tests"
      >
        <ol className={styles['test-runner__list']}>
          {tests.map((test) => {
            const result = results.find((r) => r.testId === test.id);
            const resultStatus = result?.status ?? 'pending';

            return (
              <li
                key={test.id}
                className={`${styles['test-item']} ${styles[`test-item--${resultStatus}`]}`}
              >
                <span className={styles['test-item__icon']} aria-hidden="true">
                  {STATUS_ICON[resultStatus]}
                </span>
                <div className={styles['test-item__content']}>
                  <p className={styles['test-item__description']}>
                    {test.description}
                  </p>
                  {test.wcagCriterion && (
                    <span className={styles['test-item__wcag']}>
                      WCAG {test.wcagCriterion}
                    </span>
                  )}
                  {result?.message && (
                    <p className={styles['test-item__message']}>{result.message}</p>
                  )}
                  {result?.impact && (
                    <span className={`${styles['test-item__impact']} ${styles[`test-item__impact--${result.impact}`]}`}>
                      {IMPACT_LABEL[result.impact] ?? result.impact}
                    </span>
                  )}
                </div>
                <span className={`${styles['test-item__status']} ${styles[`test-item__status--${resultStatus}`]}`}>
                  {resultStatus === 'pass' && <span className="sr-only">Réussi</span>}
                  {resultStatus === 'fail' && <span className="sr-only">Échoué</span>}
                  {resultStatus === 'pending' && <span className="sr-only">En attente</span>}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className={styles['test-runner__footer']}>
        <button
          className={styles['test-runner__run-btn']}
          onClick={onRun}
          disabled={status === 'running'}
          aria-busy={status === 'running'}
        >
          {status === 'running' ? 'Exécution…' : 'Lancer les tests'}
        </button>
      </div>
    </section>
  );
}
