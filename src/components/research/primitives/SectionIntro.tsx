export function SectionIntro({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base leading-relaxed text-ink-muted">{description}</p>
      ) : null}
    </div>
  );
}
