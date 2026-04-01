"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type = "info", onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const colors: Record<string, { bg: string; border: string }> = {
    success: { bg: "var(--color-success-light)", border: "var(--color-success)" },
    error: { bg: "var(--color-error-light)", border: "var(--color-error)" },
    info: { bg: "var(--color-primary-light)", border: "var(--color-primary)" },
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "fixed",
        bottom: "var(--space-xl)",
        right: "var(--space-xl)",
        zIndex: 1000,
        backgroundColor: colors[type].bg,
        border: `2px solid ${colors[type].border}`,
        borderRadius: "var(--radius-md)",
        padding: "var(--space-md) var(--space-lg)",
        boxShadow: "var(--shadow-lg)",
        maxWidth: "400px",
        display: "flex",
        alignItems: "center",
        gap: "var(--space-md)",
      }}
    >
      <p style={{ margin: 0, color: "var(--color-text)", flex: 1 }}>{message}</p>
      <button
        onClick={onClose}
        aria-label="Fermer la notification"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--color-text-secondary)",
          fontSize: "1.25rem",
          lineHeight: 1,
          padding: "2px",
        }}
      >
        ×
      </button>
    </div>
  );
}
