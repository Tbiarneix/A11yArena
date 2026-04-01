interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

export function Skeleton({ width = "100%", height = "1rem", borderRadius = "var(--radius-sm)" }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: "var(--color-bg-muted)",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    />
  );
}
