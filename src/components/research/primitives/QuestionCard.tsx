export function QuestionCard({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5">
      <p className="text-sm leading-relaxed text-ink">{text}</p>
    </div>
  );
}
