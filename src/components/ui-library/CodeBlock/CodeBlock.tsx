import styles from './CodeBlock.module.scss';

interface CodeBlockProps {
  code: string;
  label?: string;
}

export function CodeBlock({ code, label }: CodeBlockProps) {
  return (
    <figure className={styles.codeBlock}>
      {label && (
        <figcaption className={styles.codeBlock__label}>{label}</figcaption>
      )}
      <pre className={styles.codeBlock__pre}>
        <code className={styles.codeBlock__code}>{code.trim()}</code>
      </pre>
    </figure>
  );
}
