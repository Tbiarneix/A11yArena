import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", style, ...props }, ref) => {
    const variantStyles: Record<string, React.CSSProperties> = {
      primary: {
        backgroundColor: "var(--color-primary)",
        color: "var(--color-text-inverse)",
        border: "2px solid transparent",
      },
      secondary: {
        backgroundColor: "var(--color-bg-elevated)",
        color: "var(--color-primary)",
        border: "2px solid var(--color-primary)",
      },
      ghost: {
        backgroundColor: "transparent",
        color: "var(--color-text)",
        border: "2px solid transparent",
      },
      danger: {
        backgroundColor: "var(--color-error)",
        color: "var(--color-text-inverse)",
        border: "2px solid transparent",
      },
    };

    const sizeStyles: Record<string, React.CSSProperties> = {
      sm: { padding: "var(--space-xs) var(--space-sm)", fontSize: "0.875rem" },
      md: { padding: "var(--space-sm) var(--space-md)", fontSize: "1rem" },
      lg: { padding: "var(--space-md) var(--space-xl)", fontSize: "1.1rem" },
    };

    return (
      <button
        ref={ref}
        style={{
          ...variantStyles[variant],
          ...sizeStyles[size],
          borderRadius: "var(--radius-md)",
          fontWeight: 600,
          cursor: "pointer",
          transition: "background-color var(--transition-fast), opacity var(--transition-fast)",
          fontFamily: "inherit",
          display: "inline-flex",
          alignItems: "center",
          gap: "var(--space-sm)",
          ...style,
        }}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
