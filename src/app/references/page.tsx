import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Références",
};

export default function ReferencesPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "var(--space-xl)" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "var(--space-lg)" }}>
        Références
      </h1>
      <ul role="list" style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)", listStyle: "none", padding: 0 }}>
        <li>
          <Link href="/references/wcag" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
            WCAG 2.2 — Critères de succès
          </Link>
        </li>
        <li>
          <Link href="/references/rgaa" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
            RGAA 4.1 — Référentiel général d&apos;amélioration de l&apos;accessibilité
          </Link>
        </li>
        <li>
          <Link href="/references/mapping" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
            Correspondance WCAG ↔ RGAA
          </Link>
        </li>
      </ul>
    </div>
  );
}
