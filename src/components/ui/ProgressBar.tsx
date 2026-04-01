interface ProgressBarProps {
  value: number;
  max?: number;
  label: string;
  showValue?: boolean;
}

export function ProgressBar({ value, max = 100, label, showValue = false }: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-xs)" }}>
        <span style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>{label}</span>
        {showValue && (
          <span style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
            {value}/{max}
          </span>
        )}
      </div>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        style={{
          backgroundColor: "var(--color-bg-muted)",
          borderRadius: "var(--radius-full)",
          height: "8px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            backgroundColor: "var(--color-primary)",
            borderRadius: "var(--radius-full)",
            transition: "width var(--transition-normal)",
          }}
        />
      </div>
    </div>
  );
}
