import type { Metadata } from 'next';
import { listReferences } from '@/infrastructure/di/container';
import styles from '../wcag/page.module.scss';
import tableStyles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Correspondances WCAG / RGAA — Références — A11y Arena',
  description: 'Table de correspondance entre critères WCAG 2.2 et RGAA 4.1.',
};

export default async function MappingPage() {
  const [wcagCriteria, rgaaCriteria, mapping] = await Promise.all([
    listReferences.wcag(),
    listReferences.rgaa(),
    listReferences.mapping(),
  ]);

  return (
    <>
      <section className={styles['hero']} aria-labelledby="mapping-heading">
        <div className={styles['hero__inner']}>
          <nav aria-label="Fil d&apos;Ariane">
            <ol className={styles['breadcrumb']}>
              <li><a href="/references" className={styles['breadcrumb__link']}>Références</a></li>
              <li aria-current="page">Correspondances</li>
            </ol>
          </nav>
          <h1 id="mapping-heading" className={styles['hero__title']}>
            Correspondances WCAG / RGAA
          </h1>
          <p className={styles['hero__subtitle']}>
            Naviguez entre les deux référentiels.
          </p>
        </div>
      </section>

      <section className={styles['content']}>
        <div className={styles['content__inner']}>
          <div className={tableStyles['mapping-wrapper']}>
            <table className={tableStyles['mapping-table']}>
              <caption className={tableStyles['mapping-table__caption']}>
                Correspondances entre critères WCAG 2.2 et RGAA 4.1
              </caption>
              <thead>
                <tr>
                  <th scope="col">Critère WCAG</th>
                  <th scope="col">Titre WCAG</th>
                  <th scope="col">Critères RGAA associés</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(mapping).map(([wcagId, rgaaIds]) => {
                  const wcag = wcagCriteria.find((c) => c.id === wcagId);
                  return (
                    <tr key={wcagId}>
                      <td>
                        <span className={tableStyles['mapping-table__wcag-id']}>{wcagId}</span>
                      </td>
                      <td>{wcag?.title ?? wcagId}</td>
                      <td>
                        <ul className={tableStyles['mapping-table__rgaa-list']} role="list">
                          {rgaaIds.map((rgaaId) => {
                            const rgaa = rgaaCriteria.find((c) => c.id === rgaaId);
                            return (
                              <li key={rgaaId}>
                                <span className={tableStyles['mapping-table__rgaa-id']}>{rgaaId}</span>
                                {rgaa && (
                                  <span className={tableStyles['mapping-table__rgaa-title']}>
                                    {' '}{rgaa.title}
                                  </span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
