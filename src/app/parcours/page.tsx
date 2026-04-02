import type { Metadata } from 'next';
import { listParcours } from '@/infrastructure/di/container';
import { ParcoursCard } from '@/components/parcours/ParcoursCard/ParcoursCard';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Parcours — A11y Arena',
  description: 'Maîtrisez l\'accessibilité par thématiques grâce à des parcours structurés et progressifs.',
};

export default async function ParcoursPage() {
  const allParcours = await listParcours.execute();

  const totalCompleted = allParcours.filter(
    (p) => p.completedStepCount === p.stepCount && !p.isComingSoon,
  ).length;

  const totalHours = allParcours
    .filter((p) => !p.isComingSoon)
    .reduce((acc, p) => acc + p.estimatedHours, 0);

  return (
    <>
      <section className={styles['hero']} aria-labelledby="parcours-heading">
        <div className={styles['hero__inner']}>
          <h1 id="parcours-heading" className={styles['hero__title']}>
            Parcours d&apos;apprentissage
          </h1>
          <p className={styles['hero__subtitle']}>
            Maîtrisez l&apos;accessibilité par thématiques.
          </p>
        </div>
      </section>

      <section className={styles['content']} aria-label="Liste des parcours">
        <div className={styles['content__inner']}>
          <ul className={styles['grid']} role="list" aria-label={`${allParcours.length} parcours`}>
            {allParcours.map((parcours) => (
              <li key={parcours.id}>
                <ParcoursCard parcours={parcours} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles['stats']} aria-label="Statistiques">
        <div className={styles['stats__inner']}>
          <dl className={styles['stats__list']}>
            <div className={styles['stats__item']}>
              <dt className={styles['stats__label']}>Parcours disponibles</dt>
              <dd className={styles['stats__value']}>{allParcours.filter((p) => !p.isComingSoon).length}</dd>
            </div>
            <div className={styles['stats__item']}>
              <dt className={styles['stats__label']}>Complétés</dt>
              <dd className={styles['stats__value']}>{totalCompleted}</dd>
            </div>
            <div className={styles['stats__item']}>
              <dt className={styles['stats__label']}>Heures de pratique</dt>
              <dd className={styles['stats__value']}>{totalHours}h</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
