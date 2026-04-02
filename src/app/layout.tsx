import type { ReactNode } from 'react';
import './globals.scss';

export const metadata = {
  title: 'A11y Arena',
  description: 'Plateforme de challenges interactifs dédiés à l\'accessibilité numérique.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
