import Link from "next/link";
import {
  RESEARCH_TYPES,
  getResearchHubPath,
  researchTypeLabels,
  type ResearchType,
} from "@/content/research";

export function ResearchTypeNav({ activeType }: { activeType?: ResearchType }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/research"
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
          !activeType
            ? "bg-crimson text-white"
            : "border border-stone-200 bg-white text-ink-muted hover:text-ink"
        }`}
      >
        All
      </Link>
      {RESEARCH_TYPES.map((researchType) => (
        <Link
          key={researchType}
          href={getResearchHubPath(researchType)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            activeType === researchType
              ? "bg-crimson text-white"
              : "border border-stone-200 bg-white text-ink-muted hover:text-ink"
          }`}
        >
          {researchTypeLabels[researchType]}
        </Link>
      ))}
    </div>
  );
}
