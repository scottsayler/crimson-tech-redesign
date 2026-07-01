export function ResultRow({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-4 border-b border-stone-100 py-3.5 last:border-0 ${
        emphasis ? "font-semibold text-ink" : ""
      }`}
    >
      <span className={emphasis ? "text-ink" : "text-ink-muted"}>{label}</span>
      <span className={emphasis ? "text-lg text-ink" : "font-medium text-ink"}>{value}</span>
    </div>
  );
}
