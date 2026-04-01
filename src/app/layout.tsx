import type { Metadata } from "next";
import "./globals.css";
import { SkipLinks } from "@/components/layout/SkipLinks";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LiveAnnouncer } from "@/components/layout/LiveAnnouncer";

export const metadata: Metadata = {
  title: {
    template: "%s | A11y Arena",
    default: "A11y Arena — Apprendre l'accessibilité numérique",
  },
  description:
    "Plateforme gratuite de challenges interactifs dédiés à l'accessibilité numérique. Apprendre en pratiquant, comprendre par l'impact utilisateur, maîtriser WCAG & RGAA.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <LiveAnnouncer>
          <SkipLinks />
          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </LiveAnnouncer>
      </body>
    </html>
  );
}
