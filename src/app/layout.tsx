import type { ReactNode } from 'react';
import './globals.scss';
import { SkipLinks } from '@/components/layout/SkipLinks/SkipLinks';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { LiveAnnouncer } from '@/components/layout/LiveAnnouncer/LiveAnnouncer';

export const metadata = {
  title: 'A11y Arena',
  description: 'Plateforme de challenges interactifs dédiés à l\'accessibilité numérique.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <SkipLinks />
        <Header />
        <LiveAnnouncer />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
