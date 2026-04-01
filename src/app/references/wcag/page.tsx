import type { Metadata } from "next";

export const metadata: Metadata = { title: "WCAG 2.2" };

export default function WcagPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "var(--space-xl)" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Critères WCAG 2.2</h1>
    </div>
  );
}
