import type { AutoLinkState } from "@/lib/research-auto-link";
import { linkParagraphText } from "@/lib/research-auto-link";

export function NarrativeBlock({
  paragraphs,
  linkState,
}: {
  paragraphs: string[];
  linkState?: AutoLinkState;
}) {
  return (
    <div className="max-w-3xl space-y-5">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-ink-muted">
          {linkState ? linkParagraphText(paragraph, linkState) : paragraph}
        </p>
      ))}
    </div>
  );
}
