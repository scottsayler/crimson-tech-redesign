export function TimelineList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-4">
      {items.map((item, index) => (
        <li key={item} className="flex gap-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-crimson text-sm font-semibold text-white">
            {index + 1}
          </span>
          <p className="pt-1 text-sm leading-relaxed text-ink-muted">{item}</p>
        </li>
      ))}
    </ol>
  );
}
