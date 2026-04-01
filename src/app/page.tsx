import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <section
        aria-labelledby="hero-title"
        style={{
          padding: "var(--space-3xl) var(--space-xl)",
          textAlign: "center",
          background: "linear-gradient(135deg, var(--color-primary-light), var(--color-bg))",
        }}
      >
        <h1
          id="hero-title"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            color: "var(--color-primary)",
            marginBottom: "var(--space-lg)",
          }}
        >
          Maîtrisez l&apos;accessibilité numérique
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            color: "var(--color-text-secondary)",
            maxWidth: "600px",
            margin: "0 auto var(--space-xl)",
            lineHeight: 1.6,
          }}
        >
          Des challenges interactifs pour apprendre WCAG & RGAA en pratiquant.
          Comprenez l&apos;impact réel sur les utilisateurs de technologies d&apos;assistance.
        </p>
        <div style={{ display: "flex", gap: "var(--space-md)", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/challenges"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-text-inverse)",
              padding: "var(--space-md) var(--space-xl)",
              borderRadius: "var(--radius-md)",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "1.1rem",
            }}
          >
            Commencer un challenge
          </Link>
          <Link
            href="/parcours"
            style={{
              backgroundColor: "var(--color-bg-elevated)",
              color: "var(--color-primary)",
              border: "2px solid var(--color-primary)",
              padding: "var(--space-md) var(--space-xl)",
              borderRadius: "var(--radius-md)",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "1.1rem",
            }}
          >
            Voir les parcours
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="features-title"
        style={{
          padding: "var(--space-3xl) var(--space-xl)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h2
          id="features-title"
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: "var(--space-2xl)",
            color: "var(--color-text)",
          }}
        >
          Pourquoi A11y Arena ?
        </h2>
        <ul
          role="list"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "var(--space-xl)",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {[
            {
              title: "Apprendre par la pratique",
              description: "Des challenges concrets : corriger du code inaccessible, construire des composants accessibles, auditer des pages.",
            },
            {
              title: "Comprendre l'impact",
              description: "Chaque challenge montre comment les erreurs affectent les utilisateurs de lecteurs d'écran, de claviers, et autres technologies d'assistance.",
            },
            {
              title: "Maîtriser WCAG & RGAA",
              description: "Chaque correction est liée aux critères WCAG 2.2 et RGAA 4.1 avec des explications pédagogiques détaillées.",
            },
            {
              title: "Gratuit et open source",
              description: "La plateforme est entièrement gratuite. Contribuez vos propres challenges et aidez la communauté à progresser.",
            },
          ].map(({ title, description }) => (
            <li
              key={title}
              style={{
                backgroundColor: "var(--color-bg-elevated)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-xl)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <h3 style={{ fontWeight: 600, marginBottom: "var(--space-sm)", color: "var(--color-text)" }}>
                {title}
              </h3>
              <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                {description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
