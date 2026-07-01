export function OptionCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      {body ? (
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{body}</p>
      ) : null}
    </div>
  );
}
