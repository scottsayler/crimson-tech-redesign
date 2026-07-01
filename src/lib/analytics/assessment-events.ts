type CategoryScorePayload = Record<string, number>;

function sendEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

export function trackAssessmentStarted(assessmentId: string) {
  sendEvent("assessment_started", {
    assessment_id: assessmentId,
  });
}

export function trackAssessmentCompleted({
  assessmentId,
  overallScore,
  maturityLevel,
  categoryScores,
  durationSeconds,
}: {
  assessmentId: string;
  overallScore: number;
  maturityLevel: string;
  categoryScores: CategoryScorePayload;
  durationSeconds: number;
}) {
  sendEvent("assessment_completed", {
    assessment_id: assessmentId,
  });

  sendEvent("assessment_score", {
    assessment_id: assessmentId,
    score: overallScore,
    maturity_level: maturityLevel,
  });

  sendEvent("assessment_category_scores", {
    assessment_id: assessmentId,
    ...categoryScores,
  });

  sendEvent("assessment_duration", {
    assessment_id: assessmentId,
    duration_seconds: durationSeconds,
  });
}
