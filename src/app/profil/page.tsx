import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mon profil" };

export default function ProfilPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "var(--space-xl)" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Mon profil</h1>
    </div>
  );
}
