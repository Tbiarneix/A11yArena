import styles from './SkipLinks.module.scss';

export function SkipLinks() {
  return (
    <nav aria-label="Raccourcis de navigation" className={styles['skip-links']}>
      <a href="#main-content" className={styles['skip-links__link']}>
        Aller au contenu principal
      </a>
      <a href="#main-nav" className={styles['skip-links__link']}>
        Aller à la navigation
      </a>
    </nav>
  );
}
