'use client';

import { forwardRef } from 'react';
import styles from './Preview.module.scss';

interface PreviewProps {
  title?: string;
}

export const Preview = forwardRef<HTMLIFrameElement, PreviewProps>(function Preview(
  { title = 'Aperçu du code' },
  ref,
) {
  return (
    <div className={styles['preview']}>
      <div className={styles['preview__toolbar']}>
        <span className={styles['preview__label']}>Aperçu</span>
        <div className={styles['preview__dots']} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
      <iframe
        ref={ref}
        className={styles['preview__frame']}
        title={title}
        sandbox="allow-scripts"
        aria-label={title}
      />
    </div>
  );
});
