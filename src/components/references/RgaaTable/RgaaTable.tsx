import type { RgaaCriterion } from '@/domain/reference/RgaaCriterion';
import styles from './RgaaTable.module.scss';

interface RgaaTableProps {
  criteria: RgaaCriterion[];
  caption?: string;
}

export function RgaaTable({ criteria, caption = 'Critères RGAA 4.1' }: RgaaTableProps) {
  return (
    <div className={styles['rgaa-table-wrapper']}>
      <table className={styles['rgaa-table']}>
        <caption className={styles['rgaa-table__caption']}>{caption}</caption>
        <thead>
          <tr>
            <th scope="col" className={styles['rgaa-table__th']}>Critère</th>
            <th scope="col" className={styles['rgaa-table__th']}>Thématique</th>
            <th scope="col" className={styles['rgaa-table__th']}>Titre</th>
            <th scope="col" className={styles['rgaa-table__th']}>Niveau</th>
            <th scope="col" className={styles['rgaa-table__th']}>WCAG</th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((c) => (
            <tr key={c.id} className={styles['rgaa-table__row']}>
              <td className={styles['rgaa-table__id']}>
                <span className={styles['rgaa-table__id-text']}>{c.id}</span>
              </td>
              <td className={styles['rgaa-table__theme']}>
                <span className={styles['rgaa-table__theme-badge']}>{c.theme}</span>
              </td>
              <td className={styles['rgaa-table__title']}>
                <span className={styles['rgaa-table__title-text']}>{c.title}</span>
                <span className={styles['rgaa-table__desc']}>{c.description}</span>
              </td>
              <td>
                <span
                  className={[
                    styles['rgaa-table__level'],
                    styles[`rgaa-table__level--${c.level.toLowerCase()}`],
                  ].join(' ')}
                >
                  {c.level}
                </span>
              </td>
              <td className={styles['rgaa-table__wcag']}>
                {c.wcagIds.map((id) => (
                  <span key={id} className={styles['rgaa-table__wcag-tag']}>
                    {id}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
