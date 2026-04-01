import type { Metadata } from "next";

export const metadata: Metadata = { title: "Correspondance WCAG ↔ RGAA" };

export default function MappingPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "var(--space-xl)" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Correspondance WCAG ↔ RGAA</h1>
    </div>
  );
}
