import type { ReactNode } from 'react';
import { Sidebar } from '@/components/ui-library/Sidebar/Sidebar';
import styles from './layout.module.scss';

export const metadata = {
  title: 'UI Library — A11y Arena',
  description: 'Documentation des composants UI de A11y Arena.',
};

export default function UILibraryLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main id="main-content" className={styles.layout__main} tabIndex={-1}>
        <div className={styles.layout__content}>{children}</div>
      </main>
    </div>
  );
}
