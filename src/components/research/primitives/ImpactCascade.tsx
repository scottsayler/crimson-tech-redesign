export function ImpactCascade({ items }: { items: string[] }) {
  return (
    <div className="max-w-md rounded-2xl border border-stone-200 bg-white p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-crimson">
        How the failure spreads
      </p>
      <ol className="mt-6 space-y-0">
        {items.map((item, index) => (
          <li key={item} className="flex flex-col items-center text-center">
            <span className="w-full rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-ink">
              {item}
            </span>
            {index < items.length - 1 ? (
              <span className="my-2 text-lg leading-none text-crimson" aria-hidden="true">
                ↓
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
