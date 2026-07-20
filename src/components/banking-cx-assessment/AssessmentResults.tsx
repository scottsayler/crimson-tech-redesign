"use client";

import Link from "next/link";
import { useState } from "react";
import { FrictionHeatmap } from "@/components/banking-cx-assessment/FrictionHeatmap";
import { FrictionRanking } from "@/components/banking-cx-assessment/FrictionRanking";
import { ScoreCard } from "@/components/banking-cx-assessment/ScoreCard";
import { ScoreGauge } from "@/components/banking-cx-assessment/ScoreGauge";
import { getAiReadinessNarrative } from "@/lib/banking-cx-assessment/insights";
import {
  formatAssetSize,
  formatCustomerFacingEmployees,
  formatDataEnvironment,
  formatInstitutionType,
  formatRespondentRole,
} from "@/lib/banking-cx-assessment/format";
import { getHighestFrictionAreas } from "@/lib/banking-cx-assessment/scoring";
import { loadAssessmentResult } from "@/lib/banking-cx-assessment/storage";
import type { AssessmentResult } from "@/lib/banking-cx-assessment/types";

export function AssessmentResults() {
  const [result] = useState<AssessmentResult | null>(() => loadAssessmentResult());

  if (!result) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-2xl font-semibold text-ink">
          No Results Found
        </h1>
        <p className="mt-4 text-ink-muted">
          Complete the assessment to view your friction profile.
        </p>
        <Link
          href="/decision-center/banking-cx-friction-assessment"
          className="mt-6 inline-block rounded-lg bg-crimson px-6 py-3 text-sm font-medium text-white hover:bg-crimson-dark"
        >
          Start Assessment
        </Link>
      </div>
    );
  }

  const topFriction = getHighestFrictionAreas(result.areaScores, 3);
  const date = new Date(result.submittedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-5xl">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-crimson">
          Assessment Complete
        </p>
        <h1 className="mt-2 font-display text-3xl text-ink md:text-4xl">
          Your CX Maturity Profile
        </h1>
        <p className="mt-3 text-ink-muted">
          {result.organization.organizationName} · {date}
        </p>
      </div>

      <div className="mt-10">
        <ScoreGauge
          score={result.scores.cxMaturityScore}
          label="Overall CX Maturity Score"
          variant="capability"
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <ScoreCard
          score={result.scores.cxFrictionScore}
          label="CX Friction"
          variant="friction"
        />
        <ScoreCard
          score={result.scores.governanceScore}
          label="Governance"
          variant="capability"
        />
        <ScoreCard
          score={result.scores.aiReadinessScore}
          label="AI Readiness"
          variant="capability"
        />
        <ScoreCard
          score={result.scores.executiveAlignmentScore}
          label="Executive Alignment"
          variant="capability"
        />
        <ScoreCard
          score={result.scores.technologyComplexityScore}
          label="Tech Complexity"
          variant="complexity"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <FrictionRanking areas={topFriction} title="Top 3 Friction Areas" />
        <FrictionHeatmap areaScores={result.areaScores} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-ink">
            Top 3 Governance Gaps
          </h3>
          <p className="mt-1 text-sm text-ink-muted">
            Lowest-scoring governance statements indicate where cross-functional
            ownership may be weak.
          </p>
          <ol className="mt-6 space-y-4">
            {result.governanceGaps.map((gap, index) => (
              <li key={gap.questionId} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {gap.text}
                  </p>
                  <p className="mt-1 text-xs font-medium text-crimson">
                    Score: {gap.score.toFixed(1)} / 5
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-ink">
            AI Readiness Assessment
          </h3>
          <p className="mt-3 text-2xl font-semibold tabular-nums text-ink">
            {result.scores.aiReadinessScore.toFixed(1)}
            <span className="text-base font-normal text-ink-muted"> / 5</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            {getAiReadinessNarrative(result.scores.aiReadinessScore)}
          </p>
          {result.aiReadinessGaps.length > 0 && (
            <div className="mt-4 border-t border-stone-100 pt-4">
              <p className="text-xs font-medium uppercase tracking-wider text-ink-muted">
                Primary gap
              </p>
              <p className="mt-2 text-sm text-ink-muted">
                {result.aiReadinessGaps[0].text}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-ink">
          Suggested Priority Areas
        </h3>
        <p className="mt-1 text-sm text-ink-muted">
          Strategic observations based on your friction profile, governance
          gaps, and readiness scores. No vendor recommendations.
        </p>
        <ul className="mt-6 space-y-4">
          {result.priorityAreas.map((area) => (
            <li
              key={area}
              className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
              {area}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-ink">
          Institution Summary
        </h3>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-ink-muted">
              Type
            </dt>
            <dd className="mt-1 text-ink-muted">
              {formatInstitutionType(result.organization.institutionType)}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-ink-muted">
              Asset Size
            </dt>
            <dd className="mt-1 text-ink-muted">
              {formatAssetSize(result.organization.assetSize)}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-ink-muted">
              Customer-Facing Employees
            </dt>
            <dd className="mt-1 text-ink-muted">
              {formatCustomerFacingEmployees(
                result.organization.customerFacingEmployees
              )}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-ink-muted">
              Respondent Role
            </dt>
            <dd className="mt-1 text-ink-muted">
              {formatRespondentRole(result.organization.respondentRole)}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-medium uppercase tracking-wider text-ink-muted">
              Data Environment
            </dt>
            <dd className="mt-1 text-ink-muted">
              {formatDataEnvironment(result.technology.dataEnvironment)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-10 rounded-2xl border border-crimson-200 bg-gradient-to-br from-crimson-50 to-white p-8 text-center md:p-12">
        <h2 className="font-display text-2xl text-ink md:text-3xl">
          Turn friction data into a defensible plan
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-ink-muted">
          Discuss your results with Crimson Technology to prioritize journey fixes,
          governance improvements, and modernization decisions.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-lg bg-crimson px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-crimson-dark"
          >
            Schedule a Conversation
          </Link>
          <Link
            href="/crimson-cx"
            className="rounded-lg border border-stone-200 bg-white px-6 py-3 text-sm font-medium text-ink-muted transition-colors hover:bg-stone-50"
          >
            Explore Crimson CX
          </Link>
          <Link
            href="/decision-center/banking-cx-friction-assessment"
            className="rounded-lg border border-stone-200 bg-white px-6 py-3 text-sm font-medium text-ink-muted transition-colors hover:bg-stone-50"
          >
            Start New Assessment
          </Link>
        </div>
      </div>
    </div>
  );
}
