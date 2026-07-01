export function ComparisonTable({
  pairs,
}: {
  pairs: { left: string; right: string }[];
}) {
  if (pairs.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
      <div className="grid grid-cols-2 border-b border-stone-200 bg-stone-50 text-sm font-semibold text-ink">
        <div className="px-5 py-3">Current State</div>
        <div className="border-l border-stone-200 px-5 py-3">Best Practice</div>
      </div>
      {pairs.map((pair) => (
        <div
          key={`${pair.left}-${pair.right}`}
          className="grid grid-cols-2 border-b border-stone-100 last:border-b-0"
        >
          <div className="px-5 py-4 text-sm leading-relaxed text-ink-muted">{pair.left}</div>
          <div className="border-l border-stone-100 px-5 py-4 text-sm leading-relaxed text-ink">
            {pair.right}
          </div>
        </div>
      ))}
    </div>
  );
}
