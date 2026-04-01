import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parcours",
};

export default function ParcoursPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "var(--space-xl)" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "var(--space-lg)" }}>
        Parcours thématiques
      </h1>
      <p style={{ color: "var(--color-text-secondary)" }}>
        Les parcours guidés arrivent bientôt.
      </p>
    </div>
  );
}
