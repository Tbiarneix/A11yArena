import type { ReactNode } from 'react';
import styles from './Callout.module.scss';

type CalloutVariant = 'info' | 'success' | 'warning' | 'error' | 'hint';

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
}

export function Callout({ variant = 'info', title, children }: CalloutProps) {
  return (
    <aside className={[styles.callout, styles[`callout--${variant}`]].join(' ')}>
      {title && <p className={styles.callout__title}>{title}</p>}
      <div className={styles.callout__body}>{children}</div>
    </aside>
  );
}
