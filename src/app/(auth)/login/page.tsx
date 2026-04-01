import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion",
};

export default function LoginPage() {
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "var(--space-3xl) auto",
        padding: "var(--space-xl)",
        backgroundColor: "var(--color-bg-elevated)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <h1 style={{ marginBottom: "var(--space-xl)", fontSize: "1.5rem", fontWeight: 700 }}>
        Connexion
      </h1>
      <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-xl)" }}>
        Connectez-vous pour sauvegarder votre progression et contribuer des challenges.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
        <a
          href="/api/auth/github"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--space-sm)",
            padding: "var(--space-md)",
            backgroundColor: "#24292e",
            color: "#fff",
            borderRadius: "var(--radius-md)",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Continuer avec GitHub
        </a>
        <a
          href="/api/auth/google"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--space-sm)",
            padding: "var(--space-md)",
            backgroundColor: "var(--color-bg-elevated)",
            color: "var(--color-text)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Continuer avec Google
        </a>
      </div>
    </div>
  );
}
