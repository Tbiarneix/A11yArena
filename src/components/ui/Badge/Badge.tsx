import type { ReactNode } from 'react';
import styles from './Badge.module.scss';

type BadgeVariant = 'fix' | 'build' | 'audit' | 'easy' | 'medium' | 'hard' | 'neutral';

interface BadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span className={[styles.badge, styles[`badge--${variant}`]].join(' ')}>
      {children}
    </span>
  );
}
