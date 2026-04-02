'use client';

import type { ReactNode } from 'react';
import styles from './Toast.module.scss';

type ToastVariant = 'info' | 'success' | 'warning' | 'error';

interface ToastProps {
  variant?: ToastVariant;
  children: ReactNode;
}

export function Toast({ variant = 'info', children }: ToastProps) {
  return (
    // role="status" + aria-live="polite" : feedback dynamique accessible
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={[styles.toast, styles[`toast--${variant}`]].join(' ')}
    >
      {children}
    </div>
  );
}
