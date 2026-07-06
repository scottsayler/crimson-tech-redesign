"use client";

import type { AssessmentDefinition, AssessmentPriority } from "@/lib/assessments/types";
import { AssessmentRunner } from "@/components/decision-center/AssessmentRunner";

const NETWORK_INTRO = {
  title: "Network Readiness Assessment",
  subtitle:
    "Evaluate the resilience, standardization, and operational readiness of your multi-location network.",
  highlights: [
    "27 questions",
    "Approximately 5 minutes",
    "Instant personalized recommendations",
    "No registration required",
  ],
};

type NetworkAssessmentProps = {
  definition: AssessmentDefinition;
  onComplete?: (priorities: AssessmentPriority[]) => void;
};

export function NetworkAssessment({ definition, onComplete }: NetworkAssessmentProps) {
  return (
    <AssessmentRunner
      definition={definition}
      onComplete={onComplete}
      introFallback={NETWORK_INTRO}
    />
  );
}
