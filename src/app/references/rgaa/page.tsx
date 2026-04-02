import type { Metadata } from 'next';
import { listReferences } from '@/infrastructure/di/container';
import { RgaaTable } from '@/components/references/RgaaTable/RgaaTable';
import styles from '../wcag/page.module.scss';

export const metadata: Metadata = {
  title: 'RGAA 4.1 — Références — A11y Arena',
  description: 'Liste complète des critères RGAA 4.1 organisés par thématiques.',
};

export default async function RgaaPage() {
  const criteria = await listReferences.rgaa();

  const byTheme = criteria.reduce(
    (acc, c) => {
      if (!acc[c.theme]) acc[c.theme] = [];
      acc[c.theme].push(c);
      return acc;
    },
    {} as Record<string, typeof criteria>,
  );

  return (
    <>
      <section className={styles['hero']} aria-labelledby="rgaa-heading">
        <div className={styles['hero__inner']}>
          <nav aria-label="Fil d&apos;Ariane">
            <ol className={styles['breadcrumb']}>
              <li><a href="/references" className={styles['breadcrumb__link']}>Références</a></li>
              <li aria-current="page">RGAA 4.1</li>
            </ol>
          </nav>
          <h1 id="rgaa-heading" className={styles['hero__title']}>RGAA 4.1</h1>
          <p className={styles['hero__subtitle']}>
            {criteria.length} critères — Référentiel Général d&apos;Amélioration de l&apos;Accessibilité
          </p>
        </div>
      </section>

      <section className={styles['content']}>
        <div className={styles['content__inner']}>
          {Object.entries(byTheme).map(([theme, items]) => (
            <div key={theme} className={styles['principle']}>
              <h2 className={styles['principle__title']}>{theme}</h2>
              <RgaaTable
                criteria={items}
                caption={`Critères RGAA 4.1 — Thématique : ${theme}`}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
