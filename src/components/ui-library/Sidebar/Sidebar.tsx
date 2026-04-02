'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COMPONENT_REGISTRY, CATEGORY_LABELS, CATEGORIES } from '@/lib/ui-library/registry';
import styles from './Sidebar.module.scss';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Composants UI" className={styles.sidebar}>
      <div className={styles.sidebar__header}>
        <p className={styles.sidebar__title}>UI Library</p>
        <p className={styles.sidebar__subtitle}>
          {COMPONENT_REGISTRY.length} composants
        </p>
      </div>

      <div className={styles.sidebar__nav}>
        <Link
          href="/ui-library"
          className={[
            styles.sidebar__overview,
            pathname === '/ui-library' ? styles['sidebar__overview--active'] : '',
          ].filter(Boolean).join(' ')}
        >
          Vue d&apos;ensemble
        </Link>

        {CATEGORIES.map((category) => {
          const items = COMPONENT_REGISTRY.filter((c) => c.category === category);
          if (items.length === 0) return null;

          return (
            <div key={category} className={styles.sidebar__group}>
              <p className={styles.sidebar__groupLabel} aria-hidden="true">
                {CATEGORY_LABELS[category]}
              </p>
              <ul role="list" className={styles.sidebar__list}>
                {items.map((component) => {
                  const href = `/ui-library/${component.slug}`;
                  const isActive = pathname === href;
                  return (
                    <li key={component.slug}>
                      <Link
                        href={href}
                        aria-current={isActive ? 'page' : undefined}
                        className={[
                          styles.sidebar__link,
                          isActive ? styles['sidebar__link--active'] : '',
                        ].filter(Boolean).join(' ')}
                      >
                        {component.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
