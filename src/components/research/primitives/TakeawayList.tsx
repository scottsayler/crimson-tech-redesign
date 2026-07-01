export function TakeawayList({ items }: { items: string[] }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-ink p-6 text-white md:p-8">
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed md:text-base">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson-200" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
