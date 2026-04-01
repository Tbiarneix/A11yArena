import type { Metadata } from "next";

export const metadata: Metadata = { title: "Créer un challenge" };

export default function NewChallengePage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "var(--space-xl)" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Créer un challenge</h1>
      <p style={{ color: "var(--color-text-secondary)", marginTop: "var(--space-md)" }}>
        L&apos;éditeur de challenge est en cours de développement.
      </p>
    </div>
  );
}
