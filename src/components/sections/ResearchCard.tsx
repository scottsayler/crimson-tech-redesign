import Link from "next/link";
import type { Research } from "@/content/research";
import { ContentBadge } from "@/components/ui/ContentBadge";
import { getResearchBadgeLabel, getResearchCompletionTime } from "@/lib/content-badges";

export function ResearchCard({
  item,
  featured = false,
}: {
  item: Research;
  featured?: boolean;
}) {
  const date = new Date(item.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/research/${item.slug}`}
      className={`group flex flex-col rounded-lg border border-stone-200 bg-white transition-all hover:border-crimson/30 hover:shadow-md ${
        featured ? "p-8" : "p-6"
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <ContentBadge
          label={getResearchBadgeLabel(item.type)}
          completionTime={getResearchCompletionTime(item)}
        />
        <span className="text-xs text-ink-muted">{date}</span>
      </div>
      <h3
        className={`mt-3 font-semibold text-ink group-hover:text-crimson ${
          featured ? "text-xl md:text-2xl" : "text-lg"
        }`}
      >
        {item.title}
      </h3>
      <p
        className={`mt-2 flex-1 text-ink-muted leading-relaxed line-clamp-3 ${
          featured ? "text-base" : "text-sm"
        }`}
      >
        {item.excerpt}
      </p>
      <span className="mt-4 text-sm font-medium text-crimson">Read article →</span>
    </Link>
  );
}
