import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
};

export default function AProposPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "var(--space-xl)" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "var(--space-lg)" }}>
        À propos d&apos;A11y Arena
      </h1>
      <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.7, marginBottom: "var(--space-md)" }}>
        A11y Arena est une plateforme libre et gratuite dédiée à l&apos;apprentissage de l&apos;accessibilité numérique.
        Notre mission : rendre l&apos;accessibilité tangible, compréhensible et maîtrisable pour tous les développeurs.
      </p>
      <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
        La plateforme elle-même se veut exemplaire en matière d&apos;accessibilité : skip links, landmarks sémantiques,
        focus visible, live regions, contrastes conformes WCAG AA, navigation clavier complète.
      </p>
    </div>
  );
}
