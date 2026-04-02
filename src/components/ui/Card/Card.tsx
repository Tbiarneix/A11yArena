import type { ReactNode, ElementType } from 'react';
import styles from './Card.module.scss';

type CardLayout = 'vertical' | 'horizontal';

interface CardProps {
  children: ReactNode;
  layout?: CardLayout;
  as?: ElementType;
  className?: string;
  onClick?: () => void;
}

export function Card({
  children,
  layout = 'vertical',
  as: Tag = 'article',
  className,
  onClick,
}: CardProps) {
  return (
    <Tag
      className={[
        styles.card,
        styles[`card--${layout}`],
        onClick ? styles['card--interactive'] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
    >
      {children}
    </Tag>
  );
}
