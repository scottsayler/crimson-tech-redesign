type WhyThisMattersProps = {
  text: string;
};

export function WhyThisMatters({ text }: WhyThisMattersProps) {
  return (
    <aside
      className="mt-6 rounded-lg border border-stone-200 bg-stone-50/80 px-4 py-4 sm:px-5"
      aria-label="Why this matters"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Why this matters</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{text}</p>
    </aside>
  );
}
