import { trackEvent } from "@/lib/analytics/track";

const DOWNTIME_CALCULATOR_ID = "downtime-cost-calculator";

export function trackCalculatorStarted(calculatorId: string) {
  trackEvent("decision_resource_start", {
    resource_name: calculatorId,
    resource_type: "calculator",
  });
}

/** Kept for call-site compatibility. Completion is reported via trackCalculatorCompleted. */
export function trackCalculatorResultGenerated(
  params: Record<string, string | number> & { calculatorId: string },
) {
  void params;
  // Intentionally no-op: avoid duplicate calculator_complete events and raw totals.
}

export function trackCalculatorCompleted(calculatorId: string) {
  trackEvent("calculator_complete", {
    resource_name: calculatorId,
  });
}

export function getImpactBucket(totalImpact: number): string {
  if (totalImpact < 5_000) return "under_5k";
  if (totalImpact < 25_000) return "5k_25k";
  if (totalImpact < 100_000) return "25k_100k";
  return "over_100k";
}

export function getSavingsBucket(monthlySavings: number): string {
  if (monthlySavings < 1_000) return "under_1k";
  if (monthlySavings < 5_000) return "1k_5k";
  if (monthlySavings < 15_000) return "5k_15k";
  return "over_15k";
}

export {
  DOWNTIME_CALCULATOR_ID,
  DOWNTIME_CALCULATOR_ID as DOWNTIME_COST_CALCULATOR_ID,
};

export const POTS_SAVINGS_CALCULATOR_ID = "pots-savings-calculator";
export const VENDOR_CONSOLIDATION_CALCULATOR_ID = "vendor-consolidation-calculator";
