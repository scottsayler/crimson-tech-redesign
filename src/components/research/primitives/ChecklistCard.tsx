export function ChecklistCard({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex gap-3">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-crimson-50 text-sm font-semibold text-crimson">
          ✓
        </span>
        <p className="text-sm leading-relaxed text-ink">{text}</p>
      </div>
    </div>
  );
}
