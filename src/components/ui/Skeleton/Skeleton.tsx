import styles from './Skeleton.module.scss';

type SkeletonVariant = 'text' | 'rect' | 'circle';

interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string;
  height?: string;
  className?: string;
}

export function Skeleton({
  variant = 'rect',
  width,
  height,
  className,
}: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={[
        styles.skeleton,
        styles[`skeleton--${variant}`],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ width, height }}
    />
  );
}
