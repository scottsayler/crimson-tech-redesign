import Link from "next/link";
import type {
  AssessmentDefinition,
  AssessmentResults,
  CategoryScore,
} from "@/lib/assessments/types";
import { RecommendationSection } from "@/components/tools/assessment/RecommendationSection";
import { buildClassifiedRecommendations } from "@/components/tools/assessment/classify-recommendations";
import { JourneyScoreChart } from "./JourneyScoreChart";
import { getFrictionTier } from "./friction-tier";

type DecisionCenterResultsReportProps = {
  definition: AssessmentDefinition;
  results: AssessmentResults;
  sortedCategoryScores: CategoryScore[];
  highestFrictionIds: Set<string>;
  onReviewAnswers: () => void;
  onStartOver: () => void;
};

function ObservationPanel({
  title,
  items,
}: {
  title: string;
  items: { label: string; observation: string }[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <ul className="mt-5 space-y-5">
        {items.map((item) => (
          <li key={item.label} className="border-b border-stone-100 pb-5 last:border-0 last:pb-0">
            <p className="text-sm font-medium text-ink">{item.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.observation}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function InsightPanel({
  title,
  items,
  tone,
}: {
  title: string;
  items: { label: string; score: number; category: string }[];
  tone: "positive" | "negative";
}) {
  if (items.length === 0) return null;

  return (
    <section className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex items-start justify-between gap-4 border-b border-stone-100 pb-4 last:border-0 last:pb-0"
          >
            <div>
              <p className="text-sm font-medium text-ink">{item.label}</p>
              <p className="mt-1 text-xs text-ink-muted">{item.category}</p>
            </div>
            <span
              className={`shrink-0 text-lg font-semibold ${
                tone === "positive" ? "text-emerald-700" : "text-crimson"
              }`}
            >
              {item.score}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function DecisionCenterResultsReport({
  definition,
  results,
  sortedCategoryScores,
  highestFrictionIds,
  onReviewAnswers,
  onStartOver,
}: DecisionCenterResultsReportProps) {
  const overallTier = getFrictionTier(results.overallScore);
  const recommendations = buildClassifiedRecommendations(definition, results.priorities);
  const topPriorities = results.priorities.slice(0, 3);
  const maturityLabel = definition.maturityLabel ?? "Overall maturity level";

  const operationalItems = sortedCategoryScores
    .filter((score) => highestFrictionIds.has(score.id))
    .map((score) => ({
      label: score.label,
      observation: definition.operationalObservations?.[score.id] ?? "",
    }))
    .filter((item) => item.observation);

  const relatedPages = definition.relatedPages ?? [];

  return (
    <div className="space-y-6">
      <header
        aria-live="polite"
        className="overflow-hidden rounded-xl border border-crimson/20 bg-gradient-to-br from-crimson-50/90 via-white to-stone-50"
      >
        <div className="border-b border-crimson/10 px-6 py-8 sm:px-8 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-crimson">
            Executive Report
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {definition.title}
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            {results.answeredCount} of {results.totalQuestions} questions completed
            {definition.resultsDisclaimer ? ` · ${definition.resultsDisclaimer}` : ""}
          </p>
        </div>

        <div className="grid gap-6 px-6 py-8 sm:grid-cols-[1fr_auto] sm:items-end sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              {definition.scoreLabel}
            </p>
            <p className="mt-2 text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
              {results.overallScore}
              <span className="text-3xl text-ink-muted">/100</span>
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              Higher scores indicate more operational friction across customer journeys.
            </p>
          </div>
          <div className="sm:text-right">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              {maturityLabel}
            </p>
            <p className="mt-2 inline-flex rounded-full border border-crimson/30 bg-white px-4 py-2 text-base font-semibold text-ink">
              {results.maturityLevel}
            </p>
            <p className="mt-2 text-xs text-ink-muted">{overallTier.description}</p>
          </div>
        </div>
      </header>

      <section className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-ink">Executive summary</h3>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink-muted">
          {results.maturitySummary}
        </p>
      </section>

      <section className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-ink">Journey friction scores</h3>
        <p className="mt-1 text-sm text-ink-muted">
          Sorted by friction level — highest-friction journeys appear first.
        </p>
        <div className="mt-6">
          <JourneyScoreChart scores={sortedCategoryScores} emphasizedIds={highestFrictionIds} />
        </div>
      </section>

      {operationalItems.length > 0 ? (
        <ObservationPanel title="Operational observations" items={operationalItems} />
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <InsightPanel title="Strengths" items={results.strengths} tone="positive" />
        <InsightPanel title="Highest friction areas" items={results.risks} tone="negative" />
      </div>

      {topPriorities.length > 0 ? (
        <RecommendationSection
          title="Suggested priorities"
          description="Address these journeys first to reduce friction before engaging vendors."
          links={topPriorities.map((priority) => ({
            href: priority.href,
            title: priority.title,
            description: priority.reason,
          }))}
          numbered
        />
      ) : null}

      <RecommendationSection
        title="Suggested research articles"
        description="Deeper analysis on the operational and architectural topics surfaced in your results."
        links={recommendations.research}
      />

      {relatedPages.length > 0 ? (
        <RecommendationSection
          title="Suggested Crimson CX resources"
          description="Advisory services and practice areas aligned to your assessment results."
          links={relatedPages.map((page) => ({
            href: page.href,
            title: page.title,
            description: page.description,
          }))}
        />
      ) : null}

      <section className="rounded-xl border border-crimson/20 bg-gradient-to-br from-crimson-50/80 via-white to-stone-50 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-crimson">Next step</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
          Want help interpreting these results?
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
          Schedule a conversation to review your journey scores, validate operational observations,
          and discuss practical next steps before vendor evaluation.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex rounded-lg bg-crimson px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-crimson-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson/30"
          >
            Schedule a Conversation
          </Link>
          <button
            type="button"
            disabled
            className="inline-flex cursor-not-allowed rounded-lg border border-stone-200 bg-stone-50 px-6 py-3 text-sm font-medium text-ink-muted"
            title="PDF report download coming soon"
          >
            Download Report (Coming Soon)
          </button>
        </div>
      </section>

      <div className="flex flex-wrap gap-3 border-t border-stone-200 pt-6">
        <button
          type="button"
          onClick={onReviewAnswers}
          className="rounded-lg border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson/20"
        >
          Review answers
        </button>
        <button
          type="button"
          onClick={onStartOver}
          className="rounded-lg border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson/20"
        >
          Start over
        </button>
      </div>
    </div>
  );
}
