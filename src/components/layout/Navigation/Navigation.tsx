import Link from 'next/link';
import styles from './Navigation.module.scss';

const NAV_LINKS = [
  { href: '/challenges', label: 'Challenges' },
  { href: '/parcours', label: 'Parcours' },
  { href: '/references', label: 'Références' },
  { href: '/a-propos', label: 'À propos' },
] as const;

export function Navigation() {
  return (
    <nav id="main-nav" aria-label="Navigation principale" className={styles.navigation}>
      <Link href="/" className={styles['navigation__logo']} aria-label="A11y Arena — accueil">
        <span aria-hidden="true" className={styles['navigation__logo-icon']}>⬡</span>
        <span className={styles['navigation__logo-text']}>A11y Arena</span>
      </Link>

      <ul className={styles['navigation__list']} role="list">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href} className={styles['navigation__item']}>
            <Link href={href} className={styles['navigation__link']}>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles['navigation__actions']}>
        <Link href="/challenges" className={styles['navigation__cta']}>
          Commencer
        </Link>
      </div>
    </nav>
  );
}
