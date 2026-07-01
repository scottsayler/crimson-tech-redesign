"use client";

import { useState, type ReactNode } from "react";
import { getAssessmentByToolSlug } from "@/lib/assessments";
import type { Tool } from "@/content/tools";
import { DowntimeCostCalculator } from "./DowntimeCostCalculator";
import { NetworkAssessment } from "./NetworkAssessment";
import { PotsSavingsCalculator } from "./PotsSavingsCalculator";
import { ToolFollowUp } from "./ToolFollowUp";
import { VendorConsolidationCalculator } from "./VendorConsolidationCalculator";

type ToolInteractiveProps = {
  tool: Tool;
};

function CalculatorWithFollowUp({
  tool,
  children,
}: {
  tool: Tool;
  children: (onResultsVisible: () => void) => ReactNode;
}) {
  const [showFollowUp, setShowFollowUp] = useState(false);

  return (
    <>
      {children(() => setShowFollowUp(true))}
      {showFollowUp ? <ToolFollowUp tool={tool} /> : null}
    </>
  );
}

export function ToolInteractive({ tool }: ToolInteractiveProps) {
  if (tool.interactiveType === "calculator" && tool.slug === "downtime-cost-calculator") {
    return (
      <CalculatorWithFollowUp tool={tool}>
        {(onResultsVisible) => (
          <DowntimeCostCalculator onResultsVisible={onResultsVisible} />
        )}
      </CalculatorWithFollowUp>
    );
  }

  if (tool.interactiveType === "calculator" && tool.slug === "pots-savings-calculator") {
    return (
      <CalculatorWithFollowUp tool={tool}>
        {(onResultsVisible) => (
          <PotsSavingsCalculator onResultsVisible={onResultsVisible} />
        )}
      </CalculatorWithFollowUp>
    );
  }

  if (tool.interactiveType === "calculator" && tool.slug === "vendor-consolidation-calculator") {
    return (
      <CalculatorWithFollowUp tool={tool}>
        {(onResultsVisible) => (
          <VendorConsolidationCalculator onResultsVisible={onResultsVisible} />
        )}
      </CalculatorWithFollowUp>
    );
  }

  if (tool.interactiveType === "assessment" && tool.slug === "network-assessment") {
    const definition = getAssessmentByToolSlug(tool.slug);
    if (!definition) return null;

    return <NetworkAssessment definition={definition} />;
  }

  return null;
}
