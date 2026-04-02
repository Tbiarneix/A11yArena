import type { ReactNode } from 'react';
import styles from './Icon.module.scss';

type IconVariant = 'bare' | 'on-surface' | 'outlined';
type IconSize = 'xs' | 'sm' | 'md' | 'lg';

interface IconProps {
  children: ReactNode; // SVG ou composant icône
  variant?: IconVariant;
  size?: IconSize;
  label?: string; // aria-label si l'icône est seule (sans texte adjacent)
  className?: string;
}

export function Icon({
  children,
  variant = 'bare',
  size = 'md',
  label,
  className,
}: IconProps) {
  return (
    <span
      className={[
        styles.icon,
        styles[`icon--${variant}`],
        styles[`icon--${size}`],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
    >
      {children}
    </span>
  );
}
