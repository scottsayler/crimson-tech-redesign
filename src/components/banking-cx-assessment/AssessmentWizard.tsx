"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FrictionHeatmap } from "@/components/banking-cx-assessment/FrictionHeatmap";
import { FrictionRanking } from "@/components/banking-cx-assessment/FrictionRanking";
import { LikertScale } from "@/components/banking-cx-assessment/LikertScale";
import { ScoreCard } from "@/components/banking-cx-assessment/ScoreCard";
import { ScoreGauge } from "@/components/banking-cx-assessment/ScoreGauge";
import { StepIndicator } from "@/components/banking-cx-assessment/StepIndicator";
import {
  assessmentCardClass,
  assessmentChipClass,
  assessmentFieldClass,
  assessmentLabelClass,
  assessmentPrimaryBtnClass,
  assessmentSecondaryBtnClass,
  assessmentSectionDescClass,
  assessmentSectionTitleClass,
} from "@/components/banking-cx-assessment/assessment-ui";
import {
  ASSESSMENT_AREAS,
  TOTAL_LIKERT_QUESTIONS,
} from "@/lib/banking-cx-assessment/areas";
import {
  AI_TECHNOLOGIES,
  ASSET_SIZES,
  CCAAS_PLATFORMS,
  CORE_PLATFORMS,
  CRM_PLATFORMS,
  CUSTOMER_FACING_EMPLOYEES,
  DATA_ENVIRONMENTS,
  INSTITUTION_TYPES,
  RESPONDENT_ROLES,
} from "@/lib/banking-cx-assessment/constants";
import { READINESS_SECTIONS } from "@/lib/banking-cx-assessment/sections";
import {
  calculateAllScores,
  calculateAreaScores,
  getHighestFrictionAreas,
} from "@/lib/banking-cx-assessment/scoring";
import { saveAssessmentResult } from "@/lib/banking-cx-assessment/storage";
import type {
  AssessmentResponses,
  AssetSize,
  ContactInfo,
  InstitutionType,
  OrganizationInfo,
  QuestionSection,
  TechnologyProfile,
} from "@/lib/banking-cx-assessment/types";

const JOURNEY_BATCHES = [
  ASSESSMENT_AREAS.slice(0, 5),
  ASSESSMENT_AREAS.slice(5),
];

const STEP_LABELS = [
  "Institution",
  "Technology",
  "Journeys 1–5",
  "Journeys 6–10",
  ...READINESS_SECTIONS.map((s) => s.name),
  "Contact",
  "Review",
];

type FormState = {
  organization: OrganizationInfo;
  technology: TechnologyProfile;
  contact: ContactInfo;
  responses: AssessmentResponses;
};

const initialForm: FormState = {
  organization: {
    organizationName: "",
    institutionType: "credit_union",
    assetSize: "1b_5b",
    customerFacingEmployees: "",
    respondentRole: "",
  },
  technology: {
    ccaasPlatform: "",
    crmPlatform: "",
    corePlatform: "",
    aiTechnologies: [],
    dataEnvironment: "",
  },
  contact: {
    contactName: "",
    contactEmail: "",
    contactTitle: "",
    consentBenchmarking: false,
  },
  responses: {},
};

export function AssessmentWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = STEP_LABELS.length;
  const isProfileStep = step === 0;
  const isTechnologyStep = step === 1;
  const isJourneyBatch1 = step === 2;
  const isJourneyBatch2 = step === 3;
  const readinessSection =
    step >= 4 && step <= 6 ? READINESS_SECTIONS[step - 4] : null;
  const isContactStep = step === totalSteps - 2;
  const isReviewStep = step === totalSteps - 1;

  const currentJourneyAreas = isJourneyBatch1
    ? JOURNEY_BATCHES[0]
    : isJourneyBatch2
      ? JOURNEY_BATCHES[1]
      : [];

  const answeredCount = Object.keys(form.responses).length;
  const previewScores = useMemo(
    () => calculateAllScores({ responses: form.responses, technology: form.technology }),
    [form.responses, form.technology]
  );
  const previewAreaScores = useMemo(
    () => calculateAreaScores(form.responses),
    [form.responses]
  );
  const topFriction = getHighestFrictionAreas(previewAreaScores, 3);

  function updateOrganization(updates: Partial<OrganizationInfo>) {
    setForm((prev) => ({
      ...prev,
      organization: { ...prev.organization, ...updates },
    }));
  }

  function updateTechnology(updates: Partial<TechnologyProfile>) {
    setForm((prev) => ({
      ...prev,
      technology: { ...prev.technology, ...updates },
    }));
  }

  function updateContact(updates: Partial<ContactInfo>) {
    setForm((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...updates },
    }));
  }

  function setResponse(questionId: string, value: number) {
    setForm((prev) => ({
      ...prev,
      responses: { ...prev.responses, [questionId]: value },
    }));
  }

  function toggleAiTechnology(tech: string) {
    setForm((prev) => {
      let next = prev.technology.aiTechnologies;
      if (tech === "none") {
        next = next.includes("none") ? [] : ["none"];
      } else {
        next = next.filter((t) => t !== "none");
        next = next.includes(tech)
          ? next.filter((t) => t !== tech)
          : [...next, tech];
      }
      return {
        ...prev,
        technology: { ...prev.technology, aiTechnologies: next },
      };
    });
  }

  function validateQuestions(questions: { id: string }[]): string | null {
    for (const q of questions) {
      if (!form.responses[q.id]) {
        return "Please answer all questions before continuing.";
      }
    }
    return null;
  }

  function validateCurrentStep(): string | null {
    if (isProfileStep) {
      if (!form.organization.organizationName.trim()) {
        return "Organization name is required.";
      }
      if (!form.organization.customerFacingEmployees) {
        return "Please select the number of customer-facing employees.";
      }
      if (!form.organization.respondentRole) {
        return "Please select your primary role.";
      }
      return null;
    }

    if (isTechnologyStep) {
      if (!form.technology.ccaasPlatform) return "Please select your CCaaS platform.";
      if (!form.technology.crmPlatform) return "Please select your CRM platform.";
      if (!form.technology.corePlatform) return "Please select your core platform.";
      if (!form.technology.dataEnvironment) {
        return "Please describe your customer data environment.";
      }
      if (form.technology.aiTechnologies.length === 0) {
        return "Please select at least one AI technology option (including None).";
      }
      return null;
    }

    if (currentJourneyAreas.length > 0) {
      for (const area of currentJourneyAreas) {
        const err = validateQuestions(area.questions);
        if (err) return err;
      }
      return null;
    }

    if (readinessSection) {
      return validateQuestions(readinessSection.questions);
    }

    if (isContactStep) {
      if (!form.contact.contactName.trim()) return "Contact name is required.";
      if (!form.contact.contactEmail.trim()) return "Contact email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contact.contactEmail)) {
        return "Please enter a valid email address.";
      }
      return null;
    }

    return null;
  }

  function handleNext() {
    const validationError = validateCurrentStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  }

  function handleBack() {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/banking-cx-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Failed to submit assessment.");
      }

      saveAssessmentResult(data.result);
      router.push("/decision-center/banking-cx-friction-assessment/results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  function renderQuestionSection(
    section: QuestionSection,
    variant: "friction" | "capability"
  ) {
    return (
      <div className="space-y-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-crimson">
            {section.name}
          </p>
          <h2 className={`mt-1 ${assessmentSectionTitleClass}`}>
            {section.name}
          </h2>
          <p className={assessmentSectionDescClass}>{section.description}</p>
        </div>

        {section.questions.map((question, qi) => (
          <div
            key={question.id}
            className="border-t border-stone-100 pt-6 first:border-0 first:pt-0"
          >
            <p className="font-medium text-ink-muted">
              <span className="mr-2 text-ink-muted">{qi + 1}.</span>
              {question.text}
            </p>
            <div className="mt-4">
              <LikertScale
                name={question.id}
                value={form.responses[question.id]}
                onChange={(v) => setResponse(question.id, v)}
                variant={variant}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <StepIndicator
        currentStep={step}
        totalSteps={totalSteps}
        labels={STEP_LABELS}
      />

      <div className={`mt-6 ${assessmentCardClass}`}>
        {isProfileStep && (
          <div className="space-y-6">
            <div>
              <h2 className={assessmentSectionTitleClass}>
                Institution Profile
              </h2>
              <p className={assessmentSectionDescClass}>
                Tell us about your institution for benchmarking context.
              </p>
            </div>

            <div>
              <label className={assessmentLabelClass}>
                Institution Name *
              </label>
              <input
                type="text"
                value={form.organization.organizationName}
                onChange={(e) =>
                  updateOrganization({ organizationName: e.target.value })
                }
                className={assessmentFieldClass}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className={assessmentLabelClass}>
                  Institution Type
                </label>
                <select
                  value={form.organization.institutionType}
                  onChange={(e) =>
                    updateOrganization({
                      institutionType: e.target.value as InstitutionType,
                    })
                  }
                  className={assessmentFieldClass}
                >
                  {INSTITUTION_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={assessmentLabelClass}>Asset Size</label>
                <select
                  value={form.organization.assetSize}
                  onChange={(e) =>
                    updateOrganization({
                      assetSize: e.target.value as AssetSize,
                    })
                  }
                  className={assessmentFieldClass}
                >
                  {ASSET_SIZES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className={assessmentLabelClass}>
                  Customer-Facing Employees *
                </label>
                <select
                  value={form.organization.customerFacingEmployees}
                  onChange={(e) =>
                    updateOrganization({
                      customerFacingEmployees: e.target
                        .value as OrganizationInfo["customerFacingEmployees"],
                    })
                  }
                  className={assessmentFieldClass}
                >
                  <option value="">Select...</option>
                  {CUSTOMER_FACING_EMPLOYEES.map((e) => (
                    <option key={e.value} value={e.value}>
                      {e.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={assessmentLabelClass}>Your Role *</label>
                <select
                  value={form.organization.respondentRole}
                  onChange={(e) =>
                    updateOrganization({
                      respondentRole: e.target
                        .value as OrganizationInfo["respondentRole"],
                    })
                  }
                  className={assessmentFieldClass}
                >
                  <option value="">Select...</option>
                  {RESPONDENT_ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {isTechnologyStep && (
          <div className="space-y-6">
            <div>
              <h2 className={assessmentSectionTitleClass}>
                Technology Profile
              </h2>
              <p className={assessmentSectionDescClass}>
                Select the closest match. &ldquo;Not Sure&rdquo; is acceptable.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className={assessmentLabelClass}>
                  CCaaS Platform *
                </label>
                <select
                  value={form.technology.ccaasPlatform}
                  onChange={(e) =>
                    updateTechnology({ ccaasPlatform: e.target.value })
                  }
                  className={assessmentFieldClass}
                >
                  <option value="">Select...</option>
                  {CCAAS_PLATFORMS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={assessmentLabelClass}>
                  CRM Platform *
                </label>
                <select
                  value={form.technology.crmPlatform}
                  onChange={(e) =>
                    updateTechnology({ crmPlatform: e.target.value })
                  }
                  className={assessmentFieldClass}
                >
                  <option value="">Select...</option>
                  {CRM_PLATFORMS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={assessmentLabelClass}>
                Core Banking Platform *
              </label>
              <select
                value={form.technology.corePlatform}
                onChange={(e) =>
                  updateTechnology({ corePlatform: e.target.value })
                }
                className={assessmentFieldClass}
              >
                <option value="">Select...</option>
                {CORE_PLATFORMS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={assessmentLabelClass}>
                AI Technologies Deployed *
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {AI_TECHNOLOGIES.map((tech) => {
                  const selected = form.technology.aiTechnologies.includes(
                    tech.value
                  );
                  return (
                    <button
                      key={tech.value}
                      type="button"
                      onClick={() => toggleAiTechnology(tech.value)}
                      className={assessmentChipClass(selected)}
                    >
                      {tech.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className={assessmentLabelClass}>
                Customer Data Environment *
              </label>
              <select
                value={form.technology.dataEnvironment}
                onChange={(e) =>
                  updateTechnology({
                    dataEnvironment: e.target
                      .value as TechnologyProfile["dataEnvironment"],
                  })
                }
                className={assessmentFieldClass}
              >
                <option value="">Select...</option>
                {DATA_ENVIRONMENTS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {currentJourneyAreas.length > 0 && (
          <div className="space-y-10">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-crimson">
                CX Journey Friction
              </p>
              <h2 className={`mt-1 ${assessmentSectionTitleClass}`}>
                Rate friction in these journeys
              </h2>
              <p className={assessmentSectionDescClass}>
                Strongly Agree = this friction is a significant issue today.
              </p>
            </div>

            {currentJourneyAreas.map((area) => (
              <div key={area.id} className="border-t border-stone-100 pt-8">
                <h3 className="text-lg font-semibold text-ink">
                  {area.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-ink-muted">{area.description}</p>

                <div className="mt-6 space-y-8">
                  {area.questions.map((question, qi) => (
                    <div key={question.id}>
                      <p className="font-medium text-ink-muted">
                        <span className="mr-2 text-ink-muted">{qi + 1}.</span>
                        {question.text}
                      </p>
                      <div className="mt-4">
                        <LikertScale
                          name={question.id}
                          value={form.responses[question.id]}
                          onChange={(v) => setResponse(question.id, v)}
                          variant="friction"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {readinessSection &&
          renderQuestionSection(readinessSection, "capability")}

        {isContactStep && (
          <div className="space-y-6">
            <div>
              <h2 className={assessmentSectionTitleClass}>
                Contact Information
              </h2>
              <p className={assessmentSectionDescClass}>
                Receive your results and optional benchmarking insights.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className={assessmentLabelClass}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.contact.contactName}
                  onChange={(e) =>
                    updateContact({ contactName: e.target.value })
                  }
                  className={assessmentFieldClass}
                />
              </div>
              <div>
                <label className={assessmentLabelClass}>
                  Title
                </label>
                <input
                  type="text"
                  value={form.contact.contactTitle}
                  onChange={(e) =>
                    updateContact({ contactTitle: e.target.value })
                  }
                  className={assessmentFieldClass}
                />
              </div>
            </div>

            <div>
              <label className={assessmentLabelClass}>
                Work Email *
              </label>
              <input
                type="email"
                value={form.contact.contactEmail}
                onChange={(e) =>
                  updateContact({ contactEmail: e.target.value })
                }
                className={assessmentFieldClass}
              />
            </div>

            <label className="flex items-start gap-3 rounded-lg border border-stone-200 bg-stone-50 p-4">
              <input
                type="checkbox"
                checked={form.contact.consentBenchmarking}
                onChange={(e) =>
                  updateContact({ consentBenchmarking: e.target.checked })
                }
                className="mt-1 h-4 w-4 rounded border-stone-200 text-crimson focus:ring-crimson"
              />
              <span className="text-sm font-medium text-ink-muted">
                I agree to include anonymized results in Crimson CX
                benchmarking across institutions.
              </span>
            </label>
          </div>
        )}

        {isReviewStep && (
          <div className="space-y-8">
            <div>
              <h2 className={assessmentSectionTitleClass}>
                Review & Submit
              </h2>
              <p className={assessmentSectionDescClass}>
                {answeredCount} of {TOTAL_LIKERT_QUESTIONS} questions answered.
              </p>
            </div>

            <ScoreGauge
              score={previewScores.cxMaturityScore}
              label="Overall CX Maturity Score"
              variant="capability"
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <ScoreCard
                score={previewScores.cxFrictionScore}
                label="CX Friction Score"
                variant="friction"
              />
              <ScoreCard
                score={previewScores.governanceScore}
                label="Governance Score"
                variant="capability"
              />
              <ScoreCard
                score={previewScores.aiReadinessScore}
                label="AI Readiness Score"
                variant="capability"
              />
              <ScoreCard
                score={previewScores.executiveAlignmentScore}
                label="Executive Alignment"
                variant="capability"
              />
              <ScoreCard
                score={previewScores.technologyComplexityScore}
                label="Technology Complexity"
                variant="complexity"
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <FrictionRanking
                areas={topFriction}
                title="Top Friction Areas"
              />
              <FrictionHeatmap areaScores={previewAreaScores} />
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-stone-100 pt-6">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 0 || submitting}
            className={assessmentSecondaryBtnClass}
          >
            Back
          </button>

          {isReviewStep ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || answeredCount < TOTAL_LIKERT_QUESTIONS}
              className={assessmentPrimaryBtnClass}
            >
              {submitting ? "Submitting..." : "Submit Assessment"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className={assessmentPrimaryBtnClass}
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
