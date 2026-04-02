import { Navigation } from '@/components/layout/Navigation/Navigation';
import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <Navigation />
    </header>
  );
}
