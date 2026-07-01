const CALCULATOR_ID = "downtime-cost-calculator";

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

export function trackCalculatorStarted(calculatorId: string = CALCULATOR_ID) {
  sendEvent("calculator_started", {
    calculator_id: calculatorId,
  });
}

export function trackCalculatorResultGenerated({
  calculatorId = CALCULATOR_ID,
  totalImpact,
  locationsAffected,
  outageDurationMinutes,
}: {
  calculatorId?: string;
  totalImpact: number;
  locationsAffected: number;
  outageDurationMinutes: number;
}) {
  sendEvent("calculator_result_generated", {
    calculator_id: calculatorId,
    impact_bucket: getImpactBucket(totalImpact),
    locations_affected: locationsAffected,
    outage_duration_minutes: outageDurationMinutes,
  });
}

export function trackCalculatorCompleted(calculatorId: string = CALCULATOR_ID) {
  sendEvent("calculator_completed", {
    calculator_id: calculatorId,
  });
}

export const DOWNTIME_CALCULATOR_ID = CALCULATOR_ID;
