export function NarrativeBlock({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-3xl space-y-5">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-ink-muted">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
