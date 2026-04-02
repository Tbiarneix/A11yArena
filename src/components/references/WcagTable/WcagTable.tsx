import type { WcagCriterion } from '@/domain/reference/WcagCriterion';
import styles from './WcagTable.module.scss';

interface WcagTableProps {
  criteria: WcagCriterion[];
  caption?: string;
}

export function WcagTable({ criteria, caption = 'Critères WCAG 2.2' }: WcagTableProps) {
  return (
    <div className={styles['wcag-table-wrapper']}>
      <table className={styles['wcag-table']}>
        <caption className={styles['wcag-table__caption']}>{caption}</caption>
        <thead>
          <tr>
            <th scope="col" className={styles['wcag-table__th']}>Critère</th>
            <th scope="col" className={styles['wcag-table__th']}>Titre</th>
            <th scope="col" className={styles['wcag-table__th']}>Principe</th>
            <th scope="col" className={styles['wcag-table__th']}>Niveau</th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((c) => (
            <tr key={c.id} className={styles['wcag-table__row']}>
              <td className={styles['wcag-table__id']}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['wcag-table__link']}
                  aria-label={`WCAG ${c.id} — ouvre sur w3.org`}
                >
                  {c.id}
                </a>
              </td>
              <td className={styles['wcag-table__title']}>
                <span className={styles['wcag-table__title-text']}>{c.title}</span>
                <span className={styles['wcag-table__desc']}>{c.description}</span>
              </td>
              <td className={styles['wcag-table__principle']}>{c.principle}</td>
              <td>
                <span
                  className={[
                    styles['wcag-table__level'],
                    styles[`wcag-table__level--${c.level.toLowerCase()}`],
                  ].join(' ')}
                >
                  {c.level}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
