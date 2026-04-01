import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "error" | "warning" | "info";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const colors: Record<string, { bg: string; color: string }> = {
    default: { bg: "var(--color-bg-muted)", color: "var(--color-text-secondary)" },
    success: { bg: "var(--color-success-light)", color: "var(--color-success)" },
    error: { bg: "var(--color-error-light)", color: "var(--color-error)" },
    warning: { bg: "var(--color-warning-light)", color: "var(--color-warning)" },
    info: { bg: "var(--color-primary-light)", color: "var(--color-primary)" },
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px var(--space-sm)",
        borderRadius: "var(--radius-full)",
        fontSize: "0.75rem",
        fontWeight: 600,
        backgroundColor: colors[variant].bg,
        color: colors[variant].color,
      }}
    >
      {children}
    </span>
  );
}
