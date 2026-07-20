export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  /** Use h1 for the page hero; keep h2 for in-page section headers. */
  as?: "h1" | "h2";
}) {
  const alignClass = align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl";
  const TitleTag = as;

  return (
    <div className={`mb-12 md:mb-16 ${alignClass}`}>
      {eyebrow && (
        <p
          className={`mb-3 text-sm font-semibold uppercase tracking-wider ${
            light ? "text-crimson-200" : "text-crimson"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <TitleTag
        className={`text-3xl font-semibold tracking-tight md:text-4xl ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </TitleTag>
      {description && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? "text-stone-300" : "text-ink-muted"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
