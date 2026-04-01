import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contribuer",
};

export default function ContributePage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "var(--space-xl)" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "var(--space-lg)" }}>
        Contribuer
      </h1>
      <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-xl)" }}>
        Proposez vos propres challenges et aidez la communauté à maîtriser l&apos;accessibilité.
      </p>
      <Link
        href="/contribute/new"
        style={{
          display: "inline-block",
          backgroundColor: "var(--color-primary)",
          color: "var(--color-text-inverse)",
          padding: "var(--space-md) var(--space-xl)",
          borderRadius: "var(--radius-md)",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Créer un challenge
      </Link>
    </div>
  );
}
