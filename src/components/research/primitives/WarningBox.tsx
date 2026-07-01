export function WarningBox({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-5">
      <div className="flex gap-3">
        <span className="mt-0.5 shrink-0 text-base">❌</span>
        <p className="text-sm leading-relaxed text-ink">{text}</p>
      </div>
    </div>
  );
}
