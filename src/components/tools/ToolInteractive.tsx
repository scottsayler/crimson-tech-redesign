"use client";

import { useState } from "react";
import type { AssessmentPriority } from "@/lib/assessments/types";
import { getAssessmentByToolSlug } from "@/lib/assessments";
import type { Tool } from "@/content/tools";
import { DowntimeCostCalculator } from "./DowntimeCostCalculator";
import { NetworkAssessment } from "./NetworkAssessment";
import { ToolFollowUp } from "./ToolFollowUp";

type ToolInteractiveProps = {
  tool: Tool;
};

export function ToolInteractive({ tool }: ToolInteractiveProps) {
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [priorities, setPriorities] = useState<AssessmentPriority[]>([]);

  if (tool.interactiveType === "calculator" && tool.slug === "downtime-cost-calculator") {
    return (
      <>
        <DowntimeCostCalculator onResultsVisible={() => setShowFollowUp(true)} />
        {showFollowUp ? (
          <ToolFollowUp tool={tool} assessmentPriorities={priorities} />
        ) : null}
      </>
    );
  }

  if (tool.interactiveType === "assessment" && tool.slug === "network-assessment") {
    const definition = getAssessmentByToolSlug(tool.slug);
    if (!definition) return null;

    return <NetworkAssessment definition={definition} />;
  }

  return null;
}
