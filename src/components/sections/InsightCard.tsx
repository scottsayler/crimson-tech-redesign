import Link from "next/link";
import type { Insight } from "@/content/insights";

export function InsightCard({ insight }: { insight: Insight }) {
  const date = new Date(insight.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/insights/${insight.slug}`}
      className="group flex flex-col rounded-lg border border-stone-200 bg-white p-6 transition-all hover:border-crimson/30 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-crimson">
          {insight.category}
        </span>
        <span className="text-xs text-ink-muted">{date}</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-ink group-hover:text-crimson">
        {insight.title}
      </h3>
      <p className="mt-2 flex-1 text-sm text-ink-muted leading-relaxed line-clamp-3">
        {insight.excerpt}
      </p>
      <span className="mt-4 text-sm font-medium text-crimson">Read article →</span>
    </Link>
  );
}
