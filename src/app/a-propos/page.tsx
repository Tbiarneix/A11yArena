import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'À propos — A11y Arena',
  description:
    "A11y Arena est la plateforme technique pour les développeurs qui veulent maîtriser l'accessibilité numérique comme discipline d'ingénierie.",
};

interface TechItem {
  key: string;
  title: string;
  description: string;
  tags: readonly string[];
  wide: boolean;
  highlight?: boolean;
}

const TECH_STACK: readonly TechItem[] = [
  {
    key: 'engine',
    title: 'Moteur de validation temps réel',
    description:
      "Notre moteur simule les lecteurs d'écran et la navigation au clavier dans un environnement de test, avec un retour instantané sur les critères WCAG 2.2 à mesure que vous codez.",
    tags: ['axe-core', 'iframe sandbox', 'postMessage'],
    wide: true,
  },
  {
    key: 'editor',
    title: 'Éditeur de code intégré',
    description:
      "Un composant IDE sur mesure basé sur CodeMirror 6, avec lint d'accessibilité et suggestions de rôles ARIA intégrés.",
    tags: ['CodeMirror 6'],
    wide: false,
  },
  {
    key: 'db',
    title: 'PostgreSQL',
    description: 'Cartographie relationnelle des challenges',
    tags: [],
    wide: false,
  },
  {
    key: 'compliance',
    title: '99,9 % de conformité a11y',
    description: "Nous construisons l'outil avec la même rigueur que nous enseignons.",
    tags: [],
    wide: false,
    highlight: true,
  },
];

const TEAM_MEMBERS = [
  {
    name: 'Marcus Thorne',
    role: 'Architecture & moteur',
  },
  {
    name: 'Sarah Chen',
    role: 'Design systems & UX',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Spécialiste WCAG & QA',
  },
] as const;

export default function AProposPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className={styles['hero']} aria-labelledby="about-heading">
        <div className={styles['hero__inner']}>
          <div className={styles['hero__content']}>
            <h1 id="about-heading" className={styles['hero__title']}>
              Construire un web
              <br />
              <span className={styles['hero__title-accent']}>sans barrières.</span>
            </h1>
            <p className={styles['hero__subtitle']}>
              A11y Arena est le terrain d&apos;entraînement technique pour les
              développeurs qui refusent de se contenter du &quot;suffisant&quot;. Nous
              fournissons l&apos;environnement, les données et les défis pour
              maîtriser l&apos;accessibilité numérique comme discipline d&apos;ingénierie
              précise.
            </p>
            <div className={styles['hero__actions']}>
              <Link href="/challenges" className={styles['hero__cta-primary']}>
                Voir les challenges
              </Link>
              <Link href="/references" className={styles['hero__cta-secondary']}>
                Lire la documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Infrastructure technique ─────────────────────── */}
      <section
        className={styles['tech']}
        aria-labelledby="tech-heading"
      >
        <div className={styles['section-inner']}>
          <p className={styles['tech__eyebrow']}>L&apos;infrastructure</p>
          <h2 id="tech-heading" className={styles['section-title']}>
            Cœur technique
          </h2>
          <ul className={styles['tech__grid']} role="list">
            {TECH_STACK.map(({ key, title, description, tags, wide, highlight }) => (
              <li
                key={key}
                className={[
                  styles['tech-card'],
                  wide ? styles['tech-card--wide'] : '',
                  highlight ? styles['tech-card--highlight'] : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <h3 className={styles['tech-card__title']}>{title}</h3>
                <p className={styles['tech-card__desc']}>{description}</p>
                {tags.length > 0 && (
                  <ul className={styles['tech-card__tags']} role="list">
                    {tags.map((tag) => (
                      <li key={tag} className={styles['tech-card__tag']}>
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Open Source ──────────────────────────────────── */}
      <section
        className={styles['oss']}
        aria-labelledby="oss-heading"
      >
        <div className={styles['section-inner']}>
          <div className={styles['oss__layout']}>
            <div className={styles['oss__text']}>
              <h2 id="oss-heading" className={styles['section-title']}>
                Âme open source
              </h2>
              <p className={styles['oss__body']}>
                A11y Arena est construit par la communauté, pour la communauté.
                Chaque challenge, règle et guide technique est versionné et
                ouvert à la revue par les pairs. Nous croyons que les standards
                d&apos;accessibilité doivent être transparents et accessibles à tous.
              </p>
              <a
                href="https://github.com/a11y-arena"
                className={styles['oss__github-link']}
                target="_blank"
                rel="noopener noreferrer"
              >
                Contribuer sur GitHub
                <span aria-label="(ouvre dans un nouvel onglet)"> ↗</span>
              </a>
            </div>

            <ul className={styles['team']} role="list">
              {TEAM_MEMBERS.map(({ name, role }) => (
                <li key={name} className={styles['team__member']}>
                  <div className={styles['team__avatar']} aria-hidden="true">
                    {name[0]}
                  </div>
                  <div>
                    <p className={styles['team__name']}>{name}</p>
                    <p className={styles['team__role']}>{role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────── */}
      <section
        className={styles['contact']}
        aria-labelledby="contact-heading"
      >
        <div className={styles['contact__inner']}>
          <h2 id="contact-heading" className={styles['contact__title']}>
            Nous contacter
          </h2>
          <p className={styles['contact__subtitle']}>
            Une suggestion ou besoin d&apos;aide ? Contactez-nous.
          </p>

          <form
            className={styles['contact__form']}
            action="#"
            method="post"
            noValidate
          >
            <div className={styles['contact__row']}>
              <div className={styles['contact__field']}>
                <label
                  htmlFor="contact-name"
                  className={styles['contact__label']}
                >
                  Nom complet
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={styles['contact__input']}
                  placeholder="Votre nom"
                />
              </div>
              <div className={styles['contact__field']}>
                <label
                  htmlFor="contact-email"
                  className={styles['contact__label']}
                >
                  Adresse e-mail
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={styles['contact__input']}
                  placeholder="email@exemple.com"
                />
              </div>
            </div>

            <div className={styles['contact__field']}>
              <label
                htmlFor="contact-message"
                className={styles['contact__label']}
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                className={styles['contact__textarea']}
                placeholder="Comment pouvons-nous vous aider à maîtriser l'a11y ?"
              />
            </div>

            <button type="submit" className={styles['contact__submit']}>
              Envoyer
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
