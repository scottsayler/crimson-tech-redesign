const DOWNTIME_CALCULATOR_ID = "downtime-cost-calculator";

function sendEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
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

export function trackCalculatorStarted(calculatorId: string) {
  sendEvent("calculator_started", {
    calculator_id: calculatorId,
  });
}

export function trackCalculatorResultGenerated(
  params: Record<string, string | number> & { calculatorId: string }
) {
  const { calculatorId, ...eventParams } = params;
  sendEvent("calculator_result_generated", {
    calculator_id: calculatorId,
    ...eventParams,
  });
}

export function trackCalculatorCompleted(calculatorId: string) {
  sendEvent("calculator_completed", {
    calculator_id: calculatorId,
  });
}

export {
  DOWNTIME_CALCULATOR_ID,
  DOWNTIME_CALCULATOR_ID as DOWNTIME_COST_CALCULATOR_ID,
};

export const POTS_SAVINGS_CALCULATOR_ID = "pots-savings-calculator";
export const VENDOR_CONSOLIDATION_CALCULATOR_ID = "vendor-consolidation-calculator";
