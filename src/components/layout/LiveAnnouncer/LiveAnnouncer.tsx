'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './LiveAnnouncer.module.scss';

interface LiveAnnouncerProps {
  message?: string;
  politeness?: 'polite' | 'assertive';
}

export function LiveAnnouncer({ message = '', politeness = 'polite' }: LiveAnnouncerProps) {
  const [announcement, setAnnouncement] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (!message) return;

    // Clear previous, then set — forces screen readers to re-announce
    setAnnouncement('');
    timeoutRef.current = setTimeout(() => {
      setAnnouncement(message);
    }, 50);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [message]);

  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className={styles['live-announcer']}
    >
      {announcement}
    </div>
  );
}
