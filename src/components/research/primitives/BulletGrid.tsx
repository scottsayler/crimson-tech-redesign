export function BulletGrid({ items }: { items: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <div
          key={item}
          className="rounded-xl border border-stone-200 bg-white p-5 text-sm leading-relaxed text-ink-muted"
        >
          {item}
        </div>
      ))}
    </div>
  );
}
