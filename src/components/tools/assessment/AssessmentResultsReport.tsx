import type {
  AssessmentDefinition,
  AssessmentResults,
  CategoryScore,
} from "@/lib/assessments/types";
import { AssessmentSectionIcon } from "../AssessmentSectionIcon";
import { AssessmentConsultingCTA } from "./AssessmentConsultingCTA";
import { CategoryScorecard } from "./CategoryScorecard";
import { buildClassifiedRecommendations } from "./classify-recommendations";
import { RecommendationSection } from "./RecommendationSection";

type AssessmentResultsReportProps = {
  definition: AssessmentDefinition;
  results: AssessmentResults;
  sortedCategoryScores: CategoryScore[];
  weakestCategoryIds: Set<string>;
  onReviewAnswers: () => void;
  onStartOver: () => void;
};

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

export function AssessmentResultsReport({
  definition,
  results,
  sortedCategoryScores,
  weakestCategoryIds,
  onReviewAnswers,
  onStartOver,
}: AssessmentResultsReportProps) {
  const { categories, sections = [] } = definition;
  const recommendations = buildClassifiedRecommendations(definition, results.priorities);
  const topThreePriorities = results.priorities.slice(0, 3);

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
          </div>
          <div className="sm:text-right">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Overall maturity level
            </p>
            <p className="mt-2 inline-flex rounded-full border border-crimson/30 bg-white px-4 py-2 text-base font-semibold text-ink">
              {results.maturityLevel}
            </p>
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
        <h3 className="text-lg font-semibold text-ink">Category scorecards</h3>
        <p className="mt-1 text-sm text-ink-muted">
          Sorted by maturity — weakest categories appear first and indicate where to focus.
        </p>
        <div className="mt-6 space-y-8">
          {sections.map((section) => {
            const sectionScores = sortedCategoryScores.filter((score) =>
              section.categoryIds.includes(score.id)
            );
            if (sectionScores.length === 0) return null;

            return (
              <div key={section.id}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-crimson-50 text-crimson">
                    <AssessmentSectionIcon sectionId={section.id} />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-ink">{section.label}</h4>
                    <p className="text-xs text-ink-muted">{section.description}</p>
                  </div>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  {sectionScores.map((categoryScore) => {
                    const category = categories.find((item) => item.id === categoryScore.id);
                    return (
                      <CategoryScorecard
                        key={categoryScore.id}
                        label={category?.label ?? categoryScore.label}
                        description={category?.description}
                        score={categoryScore.score}
                        emphasized={weakestCategoryIds.has(categoryScore.id)}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <InsightPanel title="Strengths" items={results.strengths} tone="positive" />
        <InsightPanel title="Highest risk areas" items={results.risks} tone="negative" />
      </div>

      {topThreePriorities.length > 0 ? (
        <RecommendationSection
          title="Top three priorities"
          description="Address these areas first to reduce operational risk and improve portfolio consistency."
          links={topThreePriorities.map((priority) => ({
            href: priority.href,
            title: priority.title,
            description: priority.reason,
          }))}
          numbered
        />
      ) : null}

      <RecommendationSection
        title="Recommended next steps"
        description="Action-oriented guidance aligned to your lowest-scoring categories."
        links={recommendations.nextSteps}
      />

      <RecommendationSection
        title="Recommended research articles"
        description="Deeper analysis on the operational and architectural topics surfaced in your results."
        links={recommendations.research}
      />

      <RecommendationSection
        title="Recommended decision guides"
        description="Structured frameworks for evaluating vendors, architecture, and portfolio investments."
        links={recommendations.decisionGuides}
      />

      <RecommendationSection
        title="Recommended interactive tools"
        description="Quantify impact and model scenarios related to your assessment results."
        links={recommendations.tools}
      />

      <AssessmentConsultingCTA />

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
