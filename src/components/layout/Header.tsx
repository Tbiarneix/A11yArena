"use client";

import Link from "next/link";
import { Navigation } from "./Navigation";
import { useCallback } from "react";

export function Header() {
  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const current = root.getAttribute("data-theme");
    root.setAttribute("data-theme", current === "dark" ? "" : "dark");
  }, []);

  return (
    <header
      style={{
        backgroundColor: "var(--color-bg-elevated)",
        borderBottom: "1px solid var(--color-border)",
        padding: "0 var(--space-xl)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "1.25rem",
          color: "var(--color-primary)",
          textDecoration: "none",
        }}
        aria-label="A11y Arena — Accueil"
      >
        A11y Arena
      </Link>
      <Navigation />
      <button
        onClick={toggleTheme}
        aria-label="Basculer le thème sombre/clair"
        style={{
          background: "none",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          padding: "var(--space-sm)",
          cursor: "pointer",
          color: "var(--color-text)",
        }}
      >
        ◐
      </button>
    </header>
  );
}
