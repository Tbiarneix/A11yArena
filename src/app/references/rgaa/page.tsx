import type { Metadata } from "next";

export const metadata: Metadata = { title: "RGAA 4.1" };

export default function RgaaPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "var(--space-xl)" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>RGAA 4.1</h1>
    </div>
  );
}
