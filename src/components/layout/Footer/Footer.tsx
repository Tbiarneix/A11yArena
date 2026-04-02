import Link from 'next/link';
import styles from './Footer.module.scss';

const FOOTER_LINKS = [
  { href: 'https://github.com/a11y-arena', label: 'GitHub', external: true },
  { href: '/a-propos', label: 'À propos', external: false },
  { href: '/references', label: 'Références', external: false },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles['footer__inner']}>
        <p className={styles['footer__copyright']}>
          © {currentYear} A11y Arena — Licence MIT
        </p>

        <nav aria-label="Liens du pied de page" className={styles['footer__nav']}>
          <ul className={styles['footer__list']} role="list">
            {FOOTER_LINKS.map(({ href, label, external }) => (
              <li key={href}>
                {external ? (
                  <a
                    href={href}
                    className={styles['footer__link']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label}
                    <span className={styles['footer__external-hint']} aria-label="(ouvre dans un nouvel onglet)">
                      {' ↗'}
                    </span>
                  </a>
                ) : (
                  <Link href={href} className={styles['footer__link']}>
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
