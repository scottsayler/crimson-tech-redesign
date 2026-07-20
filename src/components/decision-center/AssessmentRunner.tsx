"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  trackAssessmentCompleted,
  trackAssessmentStarted,
} from "@/lib/analytics/assessment-events";
import type { AssessmentDefinition, AssessmentPriority } from "@/lib/assessments/types";
import {
  getSectionCompletion,
  getSectionProgress,
  getQuestionsInSection,
} from "@/lib/assessments/sections";
import {
  calculateAssessmentResults,
  clearAssessmentState,
  loadAssessmentState,
  saveAssessmentState,
  submitAssessmentResults,
  type AssessmentAnswers,
  type PersistedAssessmentState,
} from "@/lib/assessments";
import { AssessmentSectionIcon } from "@/components/tools/AssessmentSectionIcon";
import { AssessmentIntro, WhyThisMatters } from "@/components/tools/assessment";
import { AssessmentResultsReport } from "@/components/tools/assessment/AssessmentResultsReport";
import { DecisionCenterResultsReport } from "./DecisionCenterResultsReport";

const choiceClassName =
  "w-full rounded-lg border border-stone-200 bg-white px-4 py-3.5 text-left text-sm leading-relaxed text-ink transition-colors hover:border-crimson/30 hover:bg-crimson-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson/20";

const selectedChoiceClassName = "border-crimson/40 bg-crimson-50 ring-1 ring-crimson/20";

type AssessmentRunnerProps = {
  definition: AssessmentDefinition;
  onComplete?: (priorities: AssessmentPriority[]) => void;
  /** Override intro when definition.intro is not set */
  introFallback?: {
    title: string;
    subtitle: string;
    highlights: string[];
    eyebrow?: string;
  };
};

function completionTrackedKey(assessmentId: string) {
  return `assessment_analytics_completed_${assessmentId}`;
}

function SectionStepper({
  definition,
  currentSectionIndex,
  answers,
  onSelectSection,
  navLabel,
}: {
  definition: AssessmentDefinition;
  currentSectionIndex: number;
  answers: AssessmentAnswers;
  onSelectSection: (sectionIndex: number) => void;
  navLabel: string;
}) {
  const sections = definition.sections ?? [];

  return (
    <div
      className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      role="navigation"
      aria-label={navLabel}
    >
      {sections.map((section, index) => {
        const { answered, total } = getSectionCompletion(definition, section, answers);
        const isActive = index === currentSectionIndex;
        const isComplete = answered === total && total > 0;

        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onSelectSection(index)}
            aria-current={isActive ? "step" : undefined}
            className={`flex items-start gap-3 rounded-lg border px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson/20 ${
              isActive
                ? "border-crimson/40 bg-crimson-50 ring-1 ring-crimson/20"
                : isComplete
                  ? "border-crimson/20 bg-white hover:border-crimson/30"
                  : "border-stone-200 bg-white hover:border-stone-300"
            }`}
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                isActive ? "bg-crimson text-white" : "bg-stone-100 text-ink-muted"
              }`}
            >
              <AssessmentSectionIcon sectionId={section.id} className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium text-ink">{section.label}</span>
              <span className="mt-0.5 block text-xs text-ink-muted">
                {answered} of {total} complete
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function AssessmentRunner({ definition, onComplete, introFallback }: AssessmentRunnerProps) {
  const { questions, categories, id: assessmentId, sections = [] } = definition;
  const totalQuestions = questions.length;
  const isFriction = definition.scoreMode === "friction";
  const sectionNavLabel = definition.sectionNavLabel ?? "Assessment sections";
  const intro = definition.intro ?? introFallback;

  const [hydrated, setHydrated] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [showResults, setShowResults] = useState(false);
  const [focusedChoiceIndex, setFocusedChoiceIndex] = useState(0);

  const startedAtRef = useRef<number | null>(null);
  const hasTrackedCompletionRef = useRef(false);

  useEffect(() => {
    const saved = loadAssessmentState(assessmentId);
    queueMicrotask(() => {
      if (saved) {
        setCurrentIndex(saved.currentIndex);
        setAnswers(saved.answers);
        setShowResults(saved.showResults);
        setShowIntro(Object.keys(saved.answers).length === 0 && !saved.showResults);
        setFocusedChoiceIndex(0);
      }
      setHydrated(true);
    });
  }, [assessmentId]);

  const persist = useCallback(
    (state: PersistedAssessmentState) => {
      saveAssessmentState(assessmentId, state);
    },
    [assessmentId]
  );

  const results = useMemo(
    () => calculateAssessmentResults(definition, answers),
    [definition, answers]
  );

  const sortedCategoryScores = useMemo(() => {
    const scores = [...results.categoryScores];
    return isFriction
      ? scores.sort((a, b) => b.score - a.score)
      : scores.sort((a, b) => a.score - b.score);
  }, [results.categoryScores, isFriction]);

  const emphasizedCategoryIds = useMemo(
    () => new Set(sortedCategoryScores.slice(0, 3).map((item) => item.id)),
    [sortedCategoryScores]
  );

  useEffect(() => {
    if (!showResults || results.answeredCount !== totalQuestions) return;

    onComplete?.(results.priorities);

    if (hasTrackedCompletionRef.current) return;
    if (typeof window !== "undefined") {
      const alreadyTracked = sessionStorage.getItem(completionTrackedKey(assessmentId));
      if (alreadyTracked === "true") {
        hasTrackedCompletionRef.current = true;
        return;
      }
    }

    const durationSeconds = startedAtRef.current
      ? Math.max(1, Math.round((Date.now() - startedAtRef.current) / 1000))
      : 0;

    const categoryScores = Object.fromEntries(
      results.categoryScores.map((item) => [item.label, item.score])
    );

    trackAssessmentCompleted({
      assessmentId,
      overallScore: results.overallScore,
      maturityLevel: results.maturityLevel,
      categoryScores,
      durationSeconds,
    });

    void submitAssessmentResults({
      assessmentId,
      assessmentName: definition.title,
      results,
      durationSeconds,
      scoreMode: definition.scoreMode,
    });

    hasTrackedCompletionRef.current = true;
    if (typeof window !== "undefined") {
      sessionStorage.setItem(completionTrackedKey(assessmentId), "true");
    }
  }, [showResults, results, totalQuestions, onComplete, assessmentId, definition.title, definition.scoreMode]);

  const currentQuestion = questions[currentIndex];
  const currentCategory = categories.find((category) => category.id === currentQuestion?.category);
  const sectionProgress = getSectionProgress(definition, currentIndex);
  const currentSection = sectionProgress?.section;
  const progressPct = Math.round((results.answeredCount / totalQuestions) * 100);
  const allAnswered = results.answeredCount === totalQuestions;

  function updateAnswer(questionId: string, score: number) {
    const nextAnswers = { ...answers, [questionId]: score };
    setAnswers(nextAnswers);

    const nextIndex = currentIndex < totalQuestions - 1 ? currentIndex + 1 : currentIndex;

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(nextIndex);
      setFocusedChoiceIndex(0);
    }

    const nextShowResults = Object.keys(nextAnswers).length === totalQuestions ? true : showResults;

    if (Object.keys(nextAnswers).length === totalQuestions) {
      setShowResults(true);
    }

    persist({
      currentIndex: nextIndex,
      answers: nextAnswers,
      showResults: nextShowResults,
    });
  }

  function goToQuestion(index: number) {
    setCurrentIndex(index);
    setFocusedChoiceIndex(0);
    persist({ currentIndex: index, answers, showResults });
  }

  function goToSection(sectionIndex: number) {
    const section = sections[sectionIndex];
    if (!section) return;

    const sectionQuestions = getQuestionsInSection(definition, section);
    const firstUnanswered = sectionQuestions.find((q) => answers[q.id] === undefined);
    const target = firstUnanswered ?? sectionQuestions[0];
    if (!target) return;

    const globalIndex = questions.findIndex((q) => q.id === target.id);
    if (globalIndex >= 0) goToQuestion(globalIndex);
  }

  function handleReset() {
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
    setShowIntro(true);
    setFocusedChoiceIndex(0);
    startedAtRef.current = null;
    hasTrackedCompletionRef.current = false;
    clearAssessmentState(assessmentId);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(completionTrackedKey(assessmentId));
    }
  }

  function handleStart() {
    startedAtRef.current = Date.now();
    setShowIntro(false);
    trackAssessmentStarted(assessmentId);
  }

  function handleReviewResults() {
    setShowResults(true);
    persist({ currentIndex, answers, showResults: true });
  }

  const choiceRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    choiceRefs.current[focusedChoiceIndex]?.focus();
  }, [focusedChoiceIndex, currentIndex]);

  function handleChoiceKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    choiceIndex: number,
    choiceScore: number
  ) {
    const choiceCount = currentQuestion?.choices.length ?? 0;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      setFocusedChoiceIndex((prev) => (prev + 1) % choiceCount);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      setFocusedChoiceIndex((prev) => (prev - 1 + choiceCount) % choiceCount);
    } else if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      if (currentQuestion) {
        updateAnswer(currentQuestion.id, choiceScore);
      }
    }
  }

  if (!hydrated) {
    return (
      <div className="rounded-xl border border-stone-200 bg-white p-6 text-sm text-ink-muted">
        Loading assessment…
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  if (showIntro && !showResults && Object.keys(answers).length === 0 && intro) {
    return (
      <AssessmentIntro
        title={intro.title}
        subtitle={intro.subtitle}
        highlights={intro.highlights}
        onStart={handleStart}
      />
    );
  }

  if (showResults) {
    if (isFriction) {
      return (
        <DecisionCenterResultsReport
          definition={definition}
          results={results}
          sortedCategoryScores={sortedCategoryScores}
          highestFrictionIds={emphasizedCategoryIds}
          onReviewAnswers={() => {
            setShowResults(false);
            persist({ currentIndex, answers, showResults: false });
          }}
          onStartOver={handleReset}
        />
      );
    }

    return (
      <AssessmentResultsReport
        definition={definition}
        results={results}
        sortedCategoryScores={sortedCategoryScores}
        weakestCategoryIds={emphasizedCategoryIds}
        onReviewAnswers={() => {
          setShowResults(false);
          persist({ currentIndex, answers, showResults: false });
        }}
        onStartOver={handleReset}
      />
    );
  }

  return (
    <div className="space-y-6">
      {sections.length > 0 ? (
        <div className="rounded-xl border border-stone-200 bg-stone-50 p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            {sectionNavLabel}
          </p>
          <div className="mt-4">
            <SectionStepper
              definition={definition}
              currentSectionIndex={sectionProgress?.sectionIndex ?? 0}
              answers={answers}
              onSelectSection={goToSection}
              navLabel={sectionNavLabel}
            />
          </div>
        </div>
      ) : null}

      <div className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
        {currentSection ? (
          <div className="mb-6 flex items-start gap-4 rounded-lg border border-crimson/15 bg-crimson-50/50 p-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-crimson text-white">
              <AssessmentSectionIcon sectionId={currentSection.id} className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-crimson">
                {currentSection.label}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{currentSection.description}</p>
            </div>
          </div>
        ) : null}

        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            {sectionProgress ? (
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Question {sectionProgress.questionInSection} of {sectionProgress.totalInSection} in{" "}
                {sectionProgress.section.label}
              </p>
            ) : (
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Question {currentIndex + 1} of {totalQuestions}
              </p>
            )}
            <p className="mt-1 text-sm text-ink-muted">
              {currentCategory?.label} · {results.answeredCount} of {totalQuestions} overall
            </p>
          </div>
          {allAnswered ? (
            <button
              type="button"
              onClick={handleReviewResults}
              className="rounded-lg bg-crimson px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-crimson-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson/30"
            >
              View results
            </button>
          ) : null}
        </div>

        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-xs text-ink-muted">
            <span>Overall progress</span>
            <span>{progressPct}%</span>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full bg-stone-100"
            role="progressbar"
            aria-valuenow={progressPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Overall assessment progress"
          >
            <div
              className="h-full rounded-full bg-crimson transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          {sectionProgress ? (
            <div className="mt-3">
              <div className="mb-2 flex items-center justify-between text-xs text-ink-muted">
                <span>Journey progress</span>
                <span>
                  {sectionProgress.questionInSection} / {sectionProgress.totalInSection}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-stone-100">
                <div
                  className="h-full rounded-full bg-crimson/70 transition-all duration-300"
                  style={{
                    width: `${(sectionProgress.questionInSection / sectionProgress.totalInSection) * 100}%`,
                  }}
                />
              </div>
            </div>
          ) : null}
        </div>

        <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          {currentQuestion.prompt}
        </h3>

        {currentQuestion.whyThisMatters ? (
          <WhyThisMatters text={currentQuestion.whyThisMatters} />
        ) : null}

        <div className="mt-6 space-y-3" role="radiogroup" aria-label={currentQuestion.prompt}>
          {currentQuestion.choices.map((choice, choiceIndex) => {
            const selected = answers[currentQuestion.id] === choice.score;
            const focused = focusedChoiceIndex === choiceIndex;

            return (
              <button
                key={`${currentQuestion.id}-${choice.score}`}
                ref={(element) => {
                  choiceRefs.current[choiceIndex] = element;
                }}
                type="button"
                role="radio"
                aria-checked={selected}
                tabIndex={focused ? 0 : -1}
                onClick={() => updateAnswer(currentQuestion.id, choice.score)}
                onKeyDown={(event) => handleChoiceKeyDown(event, choiceIndex, choice.score)}
                onFocus={() => setFocusedChoiceIndex(choiceIndex)}
                className={`${choiceClassName} ${selected ? selectedChoiceClassName : ""}`}
              >
                {choice.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => goToQuestion(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium text-ink-muted transition-colors enabled:hover:text-ink disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson/20"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => goToQuestion(Math.min(totalQuestions - 1, currentIndex + 1))}
            disabled={currentIndex === totalQuestions - 1}
            className="rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium text-ink-muted transition-colors enabled:hover:text-ink disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson/20"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
