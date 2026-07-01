import type { AutoLinkState } from "@/lib/research-auto-link";
import { linkParagraphText } from "@/lib/research-auto-link";

export function InsightCallout({
  paragraphs,
  linkState,
}: {
  paragraphs: string[];
  linkState?: AutoLinkState;
}) {
  return (
    <div className="rounded-2xl border border-crimson/15 bg-crimson-50 p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-crimson">
        Key Insight
      </p>
      <div className="mt-4 space-y-4">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-ink">
            {linkState ? linkParagraphText(paragraph, linkState) : paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
