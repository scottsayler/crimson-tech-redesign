import type { AutoLinkState } from "@/lib/research-auto-link";
import { linkParagraphText } from "@/lib/research-auto-link";

type MistakeCardProps = {
  index: number;
  title: string;
  paragraphs: string[];
  linkState?: AutoLinkState;
};

export function MistakeCard({
  index,
  title,
  paragraphs,
  linkState,
}: MistakeCardProps) {
  return (
    <article className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm md:p-6">
      <p className="text-[11px] font-normal uppercase tracking-[0.14em] text-stone-400">
        Mistake #{index}
      </p>
      {title ? (
        <h3 className="mt-1.5 text-lg font-bold tracking-tight text-ink">{title}</h3>
      ) : null}
      {paragraphs.length > 0 ? (
        <div className={`space-y-4 ${title ? "mt-3.5" : "mt-2"}`}>
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="text-base leading-relaxed text-ink-muted"
            >
              {linkState ? linkParagraphText(paragraph, linkState) : paragraph}
            </p>
          ))}
        </div>
      ) : null}
    </article>
  );
}
