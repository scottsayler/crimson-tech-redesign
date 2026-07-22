import Link from "next/link";
import { getTool } from "@/content/tools";
import { ContentBadge } from "@/components/ui/ContentBadge";
import { getToolBadgeLabel, getToolCompletionTime } from "@/lib/content-badges";

type RelatedToolLink = {
  slug: string;
  label: string;
};

export function RelatedTools({ items }: { items: RelatedToolLink[] }) {
  const resolved = items
    .map((item) => {
      const tool = getTool(item.slug);
      if (!tool) return null;
      return { ...item, tool };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (resolved.length === 0) return null;

  return (
    <div className="rounded-xl border border-crimson/15 bg-crimson-50 p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-crimson">
        Evaluate
      </p>
      <p className="mt-2 max-w-2xl text-sm text-ink-muted">
        Related Decision Center assessments and calculators for quantifying impact and scoring
        readiness.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {resolved.map((item) => (
          <Link
            key={item.slug}
            href={`/tools/${item.slug}`}
            className="flex flex-col rounded-lg border border-crimson/20 bg-white p-4 transition-colors hover:border-crimson/40"
          >
            <ContentBadge
              label={getToolBadgeLabel(item.tool)}
              completionTime={getToolCompletionTime(item.tool)}
            />
            <span className="mt-3 text-sm font-semibold text-ink">{item.label}</span>
            <span className="mt-2 text-sm text-crimson">Open →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
