export function ChecklistCards({ items }: { items: string[] }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6">
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-crimson/30 bg-crimson-50 text-xs text-crimson">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
