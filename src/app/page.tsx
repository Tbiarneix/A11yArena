import Link from 'next/link';
import styles from './page.module.scss';

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Choisir',
    description:
      "Sélectionnez un composant ou un scénario d'accessibilité parmi notre bibliothèque de défis réels.",
  },
  {
    number: '02',
    title: 'Coder',
    description:
      "Réparez le code directement dans notre éditeur intégré. Testez vos changements en temps réel.",
  },
  {
    number: '03',
    title: 'Apprendre',
    description:
      'Comprenez le "pourquoi" grâce à nos explications détaillées et nos références aux règles WCAG.',
  },
] as const;

const FEATURED_PATHWAYS = [
  {
    slug: 'formulaires',
    title: 'Formulaires',
    description:
      "Validation, étiquettes, messages d'erreur et navigation au clavier.",
    count: 12,
  },
  {
    slug: 'navigation',
    title: 'Navigation',
    description:
      'Skip links, menus déroulants, focus management et landmarks sémantiques.',
    count: 8,
  },
  {
    slug: 'live-regions',
    title: 'Live Regions',
    description:
      'Notifications dynamiques, annonces ARIA et mises à jour de contenu sans rechargement.',
    count: 6,
  },
] as const;

const VALUE_PROPS = [
  {
    title: 'Gratuit',
    description: 'Apprentissage sans barrière, pour tous.',
  },
  {
    title: 'Pratique',
    description: 'Pas de théorie abstraite — uniquement du code concret.',
  },
  {
    title: 'WCAG & RGAA',
    description: 'Basé sur les standards officiels W3C et RGAA 4.1.',
  },
  {
    title: 'Open Source',
    description: 'Contribuez à la plateforme et créez vos propres défis.',
  },
] as const;

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className={styles['hero']} aria-labelledby="hero-heading">
        <div className={styles['hero__inner']}>
          <div className={styles['hero__content']}>
            <h1 id="hero-heading" className={styles['hero__title']}>
              Maîtrise l&apos;accessibilité
              <br />
              <span className={styles['hero__title-accent']}>en codant.</span>
            </h1>
            <p className={styles['hero__subtitle']}>
              Relevez des défis techniques réels. Comprenez l&apos;impact sur les
              utilisateurs. Maîtrisez WCAG &amp; RGAA.
            </p>
            <div className={styles['hero__actions']}>
              <Link href="/challenges" className={styles['hero__cta-primary']}>
                Commencer un challenge
              </Link>
              <Link href="/parcours" className={styles['hero__cta-secondary']}>
                Explorer les parcours
              </Link>
            </div>
          </div>

          <div className={styles['hero__code']} aria-hidden="true">
            <div className={styles['hero__code-header']}>
              <span className={styles['hero__code-filename']}>
                editor.tsx — A11y Arena
              </span>
            </div>
            <pre className={styles['hero__code-block']}>
              <code>{`<button
  aria-label="Fermer le menu"
  onClick={toggle}
>
  <Icon name="close" />
</button>`}</code>
            </pre>
            <p className={styles['hero__code-badge']}>
              ✓ ACCESSIBLE WCAG 2.1 — 4.1.2
            </p>
          </div>
        </div>
      </section>

      {/* ── Processus ────────────────────────────────────── */}
      <section
        className={styles['process']}
        aria-labelledby="process-heading"
      >
        <div className={styles['section-inner']}>
          <h2 id="process-heading" className={styles['section-title']}>
            Comment ça marche
          </h2>
          <ol className={styles['process__list']} role="list">
            {PROCESS_STEPS.map(({ number, title, description }) => (
              <li key={number} className={styles['process__step']}>
                <span
                  className={styles['process__step-number']}
                  aria-hidden="true"
                >
                  {number}
                </span>
                <h3 className={styles['process__step-title']}>{title}</h3>
                <p className={styles['process__step-desc']}>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Parcours mis en avant ─────────────────────────── */}
      <section
        className={styles['pathways']}
        aria-labelledby="pathways-heading"
      >
        <div className={styles['section-inner']}>
          <h2 id="pathways-heading" className={styles['section-title']}>
            Parcours d&apos;apprentissage
          </h2>
          <p className={styles['section-subtitle']}>
            Maîtrisez l&apos;accessibilité par thématiques.
          </p>
          <ul className={styles['pathways__list']} role="list">
            {FEATURED_PATHWAYS.map(({ slug, title, description, count }) => (
              <li key={slug}>
                <article
                  className={styles['pathway-card']}
                  aria-labelledby={`pathway-${slug}`}
                >
                  <h3
                    id={`pathway-${slug}`}
                    className={styles['pathway-card__title']}
                  >
                    {title}
                  </h3>
                  <p className={styles['pathway-card__desc']}>{description}</p>
                  <p className={styles['pathway-card__meta']}>
                    <span aria-label={`${count} challenges`}>
                      {count} challenges
                    </span>
                  </p>
                  <Link
                    href={`/parcours/${slug}`}
                    className={styles['pathway-card__link']}
                    aria-label={`Voir le parcours ${title}`}
                  >
                    Voir le parcours
                  </Link>
                </article>
              </li>
            ))}
          </ul>
          <div className={styles['pathways__footer']}>
            <Link href="/parcours" className={styles['pathways__all-link']}>
              Tous les parcours
            </Link>
          </div>
        </div>
      </section>

      {/* ── Proposition de valeur ─────────────────────────── */}
      <section
        className={styles['values']}
        aria-labelledby="values-heading"
      >
        <div className={styles['section-inner']}>
          <h2 id="values-heading" className={styles['section-title']}>
            Pourquoi A11y Arena ?
          </h2>
          <p className={styles['section-subtitle']}>
            Conçu par des développeurs, pour des développeurs. Une approche
            pragmatique de l&apos;accessibilité.
          </p>
          <ul className={styles['values__list']} role="list">
            {VALUE_PROPS.map(({ title, description }) => (
              <li key={title} className={styles['value-item']}>
                <h3 className={styles['value-item__title']}>{title}</h3>
                <p className={styles['value-item__desc']}>{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
