import type { Metadata } from 'next';
import { listReferences } from '@/infrastructure/di/container';
import { WcagTable } from '@/components/references/WcagTable/WcagTable';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'WCAG 2.2 — Références — A11y Arena',
  description: 'Liste complète des critères WCAG 2.2 avec niveaux A, AA et AAA.',
};

export default async function WcagPage() {
  const criteria = await listReferences.wcag();

  const byPrinciple = criteria.reduce(
    (acc, c) => {
      if (!acc[c.principle]) acc[c.principle] = [];
      acc[c.principle].push(c);
      return acc;
    },
    {} as Record<string, typeof criteria>,
  );

  return (
    <>
      <section className={styles['hero']} aria-labelledby="wcag-heading">
        <div className={styles['hero__inner']}>
          <nav aria-label="Fil d'Ariane">
            <ol className={styles['breadcrumb']}>
              <li><a href="/references" className={styles['breadcrumb__link']}>Références</a></li>
              <li aria-current="page">WCAG 2.2</li>
            </ol>
          </nav>
          <h1 id="wcag-heading" className={styles['hero__title']}>WCAG 2.2</h1>
          <p className={styles['hero__subtitle']}>
            {criteria.length} critères — Web Content Accessibility Guidelines
          </p>
        </div>
      </section>

      <section className={styles['content']}>
        <div className={styles['content__inner']}>
          {Object.entries(byPrinciple).map(([principle, items]) => (
            <div key={principle} className={styles['principle']}>
              <h2 className={styles['principle__title']} id={`principle-${principle.toLowerCase()}`}>
                {principle}
              </h2>
              <WcagTable
                criteria={items}
                caption={`Critères WCAG 2.2 — Principe ${principle}`}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
