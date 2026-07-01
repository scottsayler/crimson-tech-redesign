import Link from "next/link";
import type { Tool } from "@/content/tools";

const HUB_SECTION_LABELS: Record<Tool["hubSection"], string> = {
  assessments: "Assessment",
  calculators: "Calculator",
  "planning-tools": "Planning Tool",
  "decision-guides": "Decision Guide",
};

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col rounded-lg border border-stone-200 bg-white p-6 transition-all hover:border-crimson/30 hover:shadow-md"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-crimson">
          {HUB_SECTION_LABELS[tool.hubSection]}
        </span>
        <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-ink-muted">
          {tool.completionTime}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-ink group-hover:text-crimson">{tool.title}</h3>
      <p className="mt-2 flex-1 text-sm text-ink-muted leading-relaxed line-clamp-3">
        {tool.solves}
      </p>
      <p className="mt-4 text-xs text-ink-muted">
        For {tool.audience.slice(0, 3).join(", ")}
        {tool.audience.length > 3 ? ", and more" : ""}
      </p>
      <span className="mt-4 text-sm font-medium text-crimson">Open tool →</span>
    </Link>
  );
}
