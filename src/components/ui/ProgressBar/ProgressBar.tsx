import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  value: number; // 0–100
  label: string;
  variant?: 'default' | 'expert';
}

export function ProgressBar({ value, label, variant = 'default' }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={styles.progressBar}
    >
      <div
        className={[
          styles.progressBar__fill,
          variant === 'expert' ? styles['progressBar__fill--expert'] : '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
