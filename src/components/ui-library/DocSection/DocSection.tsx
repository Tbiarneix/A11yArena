import type { ReactNode } from 'react';
import styles from './DocSection.module.scss';

interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface DocSectionProps {
  title: string;
  description: string;
  props?: PropRow[];
  children: ReactNode;
}

export function DocSection({ title, description, props, children }: DocSectionProps) {
  return (
    <article className={styles.doc}>
      <header className={styles.doc__header}>
        <h1 className={styles.doc__title}>{title}</h1>
        <p className={styles.doc__description}>{description}</p>
      </header>

      <section aria-label="Exemples" className={styles.doc__examples}>
        <h2 className={styles.doc__sectionTitle}>Exemples</h2>
        {children}
      </section>

      {props && props.length > 0 && (
        <section aria-label="Props" className={styles.doc__props}>
          <h2 className={styles.doc__sectionTitle}>Props</h2>
          <div className={styles.doc__tableWrapper}>
            <table className={styles.doc__table}>
              <thead>
                <tr>
                  <th scope="col">Prop</th>
                  <th scope="col">Type</th>
                  <th scope="col">Défaut</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {props.map((prop) => (
                  <tr key={prop.name}>
                    <td>
                      <code className={styles.doc__codeInline}>{prop.name}</code>
                      {prop.required && (
                        <span className={styles.doc__required} aria-label="requis">*</span>
                      )}
                    </td>
                    <td><code className={styles.doc__codeInline}>{prop.type}</code></td>
                    <td>
                      {prop.default
                        ? <code className={styles.doc__codeInline}>{prop.default}</code>
                        : <span className={styles.doc__empty}>—</span>}
                    </td>
                    <td>{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </article>
  );
}
