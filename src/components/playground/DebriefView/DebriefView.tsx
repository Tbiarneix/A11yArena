import Link from 'next/link';
import type { Challenge } from '@/domain/challenge/Challenge';
import type { Attempt } from '@/domain/attempt/Attempt';
import type { ChallengeTest } from '@/domain/challenge/ChallengeTest';
import styles from './DebriefView.module.scss';

interface DebriefViewProps {
  challenge: Challenge;
  attempt: Attempt;
  tests: ChallengeTest[];
}

const WCAG_DESCRIPTIONS: Record<string, string> = {
  '1.1.1': 'Contenu non textuel',
  '1.3.1': 'Informations et relations',
  '2.1.1': 'Clavier',
  '2.1.2': 'Pas de piège clavier',
  '4.1.1': 'Analyse syntaxique',
  '4.1.2': 'Nom, rôle, valeur',
  '4.1.3': 'Messages d\'état',
};

export function DebriefView({ challenge, attempt, tests }: DebriefViewProps) {
  const score = attempt.score;
  const passed = score?.passed ?? 0;
  const total = score?.total ?? tests.length;
  const percent = score?.percent ?? 0;
  const points = score?.points ?? 0;
  const isSuccess = percent === 100;

  return (
    <div className={styles['debrief']}>
      {/* ── Section 1 : Performance ──────────────────────────────────── */}
      <section className={styles['debrief__section']} aria-labelledby="perf-heading">
        <div className={styles['pebrief__container']}>
          <div
            className={`${styles['debrief__banner']} ${isSuccess ? styles['debrief__banner--success'] : styles['debrief__banner--partial']}`}
          >
            <div className={styles['debrief__banner-icon']} aria-hidden="true">
              {isSuccess ? '🎯' : '📈'}
            </div>
            <div>
              <h1 id="perf-heading" className={styles['debrief__banner-title']}>
                {isSuccess ? 'Challenge réussi !' : 'Bonne progression !'}
              </h1>
              <p className={styles['debrief__banner-subtitle']}>
                {challenge.title}
              </p>
            </div>
          </div>

          <div className={styles['debrief__stats']}>
            <div className={styles['debrief__stat']}>
              <span className={styles['debrief__stat-value']}>{percent}%</span>
              <span className={styles['debrief__stat-label']}>Score</span>
            </div>
            <div className={styles['debrief__stat']}>
              <span className={styles['debrief__stat-value']}>{passed}/{total}</span>
              <span className={styles['debrief__stat-label']}>Tests réussis</span>
            </div>
            <div className={styles['debrief__stat']}>
              <span className={styles['debrief__stat-value']}>{points}</span>
              <span className={styles['debrief__stat-label']}>Points</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2 : Résultats détaillés ─────────────────────────── */}
      <section className={styles['debrief__section']} aria-labelledby="results-heading">
        <div className={styles['debrief__container']}>
          <h2 id="results-heading" className={styles['debrief__section-title']}>
            Résultats détaillés
          </h2>
          <ol className={styles['debrief__results']} role="list">
            {tests.map((test) => {
              const result = attempt.results.find((r) => r.testId === test.id);
              const status = result?.status ?? 'pending';
              return (
                <li
                  key={test.id}
                  className={`${styles['debrief__result-item']} ${styles[`debrief__result-item--${status}`]}`}
                >
                  <span className={styles['debrief__result-icon']} aria-hidden="true">
                    {status === 'pass' ? '✓' : status === 'fail' ? '✗' : '○'}
                  </span>
                  <div className={styles['debrief__result-content']}>
                    <p className={styles['debrief__result-desc']}>{test.description}</p>
                    {test.wcagCriterion && (
                      <span className={styles['debrief__result-wcag']}>
                        WCAG {test.wcagCriterion}
                        {WCAG_DESCRIPTIONS[test.wcagCriterion] && (
                          <> — {WCAG_DESCRIPTIONS[test.wcagCriterion]}</>
                        )}
                      </span>
                    )}
                    {result?.message && (
                      <p className={styles['debrief__result-message']}>{result.message}</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── Section 3 : Impact utilisateur ──────────────────────────── */}
      <section className={styles['debrief__section']} aria-labelledby="impact-heading">
        <div className={styles['debrief__container']}>
          <h2 id="impact-heading" className={styles['debrief__section-title']}>
            Impact réel
          </h2>
          <div className={styles['debrief__impact-grid']}>
            <div className={styles['debrief__impact-card']}>
              <div className={styles['debrief__impact-card-icon']} aria-hidden="true">🔊</div>
              <h3 className={styles['debrief__impact-card-title']}>Lecteurs d&apos;écran</h3>
              <p className={styles['debrief__impact-card-text']}>
                Sans noms accessibles, les utilisateurs de lecteurs d&apos;écran (NVDA, VoiceOver, JAWS)
                entendent uniquement &quot;bouton&quot; ou &quot;champ de saisie&quot; sans contexte.
                Chaque élément corrigé leur permet de comprendre l&apos;interface.
              </p>
            </div>
            <div className={styles['debrief__impact-card']}>
              <div className={styles['debrief__impact-card-icon']} aria-hidden="true">⌨️</div>
              <h3 className={styles['debrief__impact-card-title']}>Navigation clavier</h3>
              <p className={styles['debrief__impact-card-text']}>
                Les utilisateurs qui ne peuvent pas utiliser de souris dépendent entièrement
                du clavier. Les corrections assurent un parcours logique et accessible
                à travers tous les éléments interactifs.
              </p>
            </div>
            <div className={styles['debrief__impact-card']}>
              <div className={styles['debrief__impact-card-icon']} aria-hidden="true">📊</div>
              <h3 className={styles['debrief__impact-card-title']}>Données WCAG</h3>
              <p className={styles['debrief__impact-card-text']}>
                Selon WebAIM, 96,3% des pages d&apos;accueil présentent des erreurs
                d&apos;accessibilité détectables automatiquement. Chaque correction
                améliore l&apos;expérience de 15% des utilisateurs en situation de handicap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4 : Critères WCAG couverts ──────────────────────── */}
      {challenge.wcagCriteria.length > 0 && (
        <section className={styles['debrief__section']} aria-labelledby="wcag-heading">
          <div className={styles['debrief__container']}>
            <h2 id="wcag-heading" className={styles['debrief__section-title']}>
              Critères WCAG abordés
            </h2>
            <div className={styles['debrief__table-wrapper']}>
              <table className={styles['debrief__table']}>
                <caption className="sr-only">Critères WCAG couverts par ce challenge</caption>
                <thead>
                  <tr>
                    <th scope="col">Critère</th>
                    <th scope="col">Intitulé</th>
                    <th scope="col">Niveau</th>
                    <th scope="col">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {challenge.wcagCriteria.map((criterion) => {
                    const relatedTests = tests.filter((t) => t.wcagCriterion === criterion);
                    const allPassed = relatedTests.every((t) => {
                      const r = attempt.results.find((r) => r.testId === t.id);
                      return r?.status === 'pass';
                    });
                    const hasFails = relatedTests.some((t) => {
                      const r = attempt.results.find((r) => r.testId === t.id);
                      return r?.status === 'fail';
                    });

                    return (
                      <tr key={criterion}>
                        <td>
                          <span className={styles['debrief__table-code']}>{criterion}</span>
                        </td>
                        <td>{WCAG_DESCRIPTIONS[criterion] ?? '—'}</td>
                        <td>
                          <span className={styles['debrief__level-badge']}>AA</span>
                        </td>
                        <td>
                          <span
                            className={`${styles['debrief__status-badge']} ${
                              allPassed
                                ? styles['debrief__status-badge--pass']
                                : hasFails
                                ? styles['debrief__status-badge--fail']
                                : styles['debrief__status-badge--pending']
                            }`}
                          >
                            {allPassed ? 'Conforme' : hasFails ? 'Non conforme' : 'En attente'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ── Section 5 : Ressources ───────────────────────────────────── */}
      <section className={styles['debrief__section']} aria-labelledby="resources-heading">
        <div className={styles['debrief__container']}>
          <h2 id="resources-heading" className={styles['debrief__section-title']}>
            Pour aller plus loin
          </h2>
          <ul className={styles['debrief__resources']} role="list">
            <li>
              <a
                href="https://www.w3.org/WAI/WCAG22/Understanding/"
                className={styles['debrief__resource-link']}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles['debrief__resource-title']}>
                  Comprendre WCAG 2.2
                  <span className="sr-only">(ouvre un nouvel onglet)</span>
                </span>
                <span className={styles['debrief__resource-desc']}>
                  Documentation officielle W3C avec explications et techniques
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://www.w3.org/WAI/ARIA/apg/"
                className={styles['debrief__resource-link']}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles['debrief__resource-title']}>
                  WAI-ARIA Authoring Practices
                  <span className="sr-only">(ouvre un nouvel onglet)</span>
                </span>
                <span className={styles['debrief__resource-desc']}>
                  Patterns et exemples de composants accessibles
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://inclusive-components.design/"
                className={styles['debrief__resource-link']}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles['debrief__resource-title']}>
                  Inclusive Components
                  <span className="sr-only">(ouvre un nouvel onglet)</span>
                </span>
                <span className={styles['debrief__resource-desc']}>
                  Guide pratique de composants inclusifs par Heydon Pickering
                </span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <div className={styles['debrief__cta']}>
        <div className={styles['debrief__container']}>
          <Link href="/challenges" className={styles['debrief__cta-btn']}>
            Autres challenges
          </Link>
          <Link href={`/challenges/${challenge.slug}`} className={`${styles['debrief__cta-btn']} ${styles['debrief__cta-btn--secondary']}`}>
            Réessayer
          </Link>
        </div>
      </div>
    </div>
  );
}
