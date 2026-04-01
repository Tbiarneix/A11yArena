import { type ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px var(--space-sm)",
        borderRadius: "var(--radius-sm)",
        fontSize: "0.75rem",
        backgroundColor: "var(--color-bg-muted)",
        color: "var(--color-text-secondary)",
        border: "1px solid var(--color-border)",
      }}
    >
      {children}
    </span>
  );
}
