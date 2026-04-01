import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helpText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helpText, id, ...props }, ref) => {
    const inputId = id ?? `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const errorId = `${inputId}-error`;
    const helpId = `${inputId}-help`;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
        <label
          htmlFor={inputId}
          style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--color-text)" }}
        >
          {label}
        </label>
        {helpText && (
          <span id={helpId} style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
            {helpText}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-describedby={[helpText ? helpId : "", error ? errorId : ""].filter(Boolean).join(" ") || undefined}
          aria-invalid={error ? true : undefined}
          style={{
            padding: "var(--space-sm) var(--space-md)",
            border: `1px solid ${error ? "var(--color-error)" : "var(--color-border)"}`,
            borderRadius: "var(--radius-md)",
            fontSize: "1rem",
            backgroundColor: "var(--color-bg-elevated)",
            color: "var(--color-text)",
            width: "100%",
            boxSizing: "border-box",
          }}
          {...props}
        />
        {error && (
          <span id={errorId} role="alert" style={{ fontSize: "0.8rem", color: "var(--color-error)" }}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
