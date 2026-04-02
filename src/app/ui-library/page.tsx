import Link from 'next/link';
import { COMPONENT_REGISTRY, CATEGORY_LABELS, CATEGORIES } from '@/lib/ui-library/registry';
import styles from './page.module.scss';

export default function UILibraryPage() {
  return (
    <div className={styles.overview}>
      <header className={styles.overview__header}>
        <h1 className={styles.overview__title}>UI Library</h1>
        <p className={styles.overview__description}>
          Composants de base réutilisables de A11y Arena. Chaque composant respecte
          les critères WCAG AA, le design system Stitch et les conventions BEM + SCSS Modules.
        </p>
        <p className={styles.overview__meta}>
          <strong>{COMPONENT_REGISTRY.length}</strong> composants disponibles
        </p>
      </header>

      <div className={styles.overview__groups}>
        {CATEGORIES.map((category) => {
          const items = COMPONENT_REGISTRY.filter((c) => c.category === category);
          if (items.length === 0) return null;

          return (
            <section key={category} className={styles.overview__group}>
              <h2 className={styles.overview__groupTitle}>
                {CATEGORY_LABELS[category]}
              </h2>
              <ul role="list" className={styles.overview__grid}>
                {items.map((component) => (
                  <li key={component.slug}>
                    <Link
                      href={`/ui-library/${component.slug}`}
                      className={styles.overview__card}
                    >
                      <p className={styles.overview__cardName}>{component.label}</p>
                      <p className={styles.overview__cardDesc}>{component.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
