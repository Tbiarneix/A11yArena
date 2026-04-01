import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Challenges",
};

export default function ChallengesPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "var(--space-xl)" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "var(--space-lg)" }}>
        Challenges d&apos;accessibilité
      </h1>
      <p style={{ color: "var(--color-text-secondary)" }}>
        Les challenges arrivent bientôt. Revenez dans quelques jours !
      </p>
    </div>
  );
}
