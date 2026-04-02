import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Références — A11y Arena',
  description: 'Hub de référence WCAG 2.2 et RGAA 4.1 avec cartographie des correspondances.',
};

const REFERENCE_SECTIONS = [
  {
    slug: 'wcag',
    title: 'WCAG 2.2',
    description: '78 critères répartis en 4 principes (Perceptible, Utilisable, Compréhensible, Robuste). Niveaux A, AA, AAA.',
    count: '78 critères',
  },
  {
    slug: 'rgaa',
    title: 'RGAA 4.1',
    description: 'Référentiel Général d\'Amélioration de l\'Accessibilité. 106 critères organisés en 13 thématiques.',
    count: '106 critères',
  },
  {
    slug: 'mapping',
    title: 'Correspondances WCAG / RGAA',
    description: 'Table de correspondance entre les critères WCAG 2.2 et RGAA 4.1 pour naviguer entre les deux référentiels.',
    count: 'Correspondances',
  },
] as const;

export default function ReferencesPage() {
  return (
    <>
      <section className={styles['hero']} aria-labelledby="references-heading">
        <div className={styles['hero__inner']}>
          <h1 id="references-heading" className={styles['hero__title']}>
            Références
          </h1>
          <p className={styles['hero__subtitle']}>
            WCAG 2.2 et RGAA 4.1 — les standards officiels à portée de main.
          </p>
        </div>
      </section>

      <section className={styles['content']} aria-label="Sections de références">
        <div className={styles['content__inner']}>
          <ul className={styles['grid']} role="list">
            {REFERENCE_SECTIONS.map(({ slug, title, description, count }) => (
              <li key={slug}>
                <article
                  className={styles['ref-card']}
                  aria-labelledby={`ref-${slug}`}
                >
                  <div className={styles['ref-card__count']}>{count}</div>
                  <h2 id={`ref-${slug}`} className={styles['ref-card__title']}>
                    {title}
                  </h2>
                  <p className={styles['ref-card__desc']}>{description}</p>
                  <Link
                    href={`/references/${slug}`}
                    className={styles['ref-card__link']}
                    aria-label={`Consulter ${title}`}
                  >
                    Consulter
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
