import { trackEvent } from "@/lib/analytics/track";

export function trackAssessmentStarted(assessmentId: string) {
  trackEvent("decision_resource_start", {
    resource_name: assessmentId,
    resource_type: "assessment",
  });
}

export function trackAssessmentCompleted({
  assessmentId,
  durationSeconds,
}: {
  assessmentId: string;
  overallScore?: number;
  maturityLevel?: string;
  categoryScores?: Record<string, number>;
  durationSeconds?: number;
}) {
  // Aggregate completion only — never send answers or PII.
  trackEvent("assessment_complete", {
    assessment_name: assessmentId,
    duration_seconds: durationSeconds,
  });
}
