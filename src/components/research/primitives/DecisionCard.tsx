export function DecisionCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5">
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      {body ? <p className="mt-2 text-sm leading-relaxed text-ink-muted">{body}</p> : null}
    </div>
  );
}
