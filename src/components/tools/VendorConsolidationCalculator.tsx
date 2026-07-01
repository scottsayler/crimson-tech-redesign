"use client";

import { useCallback, useMemo, useState } from "react";
import {
  getSavingsBucket,
  VENDOR_CONSOLIDATION_CALCULATOR_ID,
} from "@/lib/analytics/calculator-events";
import {
  calculateVendorConsolidation,
  formatCurrency,
  formatPercent,
  VENDOR_CONSOLIDATION_DEFAULTS,
  type VendorConsolidationInputs,
} from "@/lib/tools/vendor-consolidation";
import { CalculatorIntro } from "./calculator/CalculatorIntro";
import { useCalculatorAnalytics } from "./calculator/useCalculatorAnalytics";
import { NumberField, ToolPanel } from "./primitives/CalculatorPrimitives";
import { ResultRow } from "./primitives/ResultRow";

const INTRO_HIGHLIGHTS = [
  "Estimate vendor spend and admin savings",
  "Model operational complexity reduction",
  "Approximately 2 minutes",
  "No registration required",
];

type VendorConsolidationCalculatorProps = {
  onResultsVisible?: () => void;
};

export function VendorConsolidationCalculator({
  onResultsVisible,
}: VendorConsolidationCalculatorProps) {
  const [showIntro, setShowIntro] = useState(true);
  const [inputs, setInputs] = useState<VendorConsolidationInputs>(VENDOR_CONSOLIDATION_DEFAULTS);
  const [hasInteracted, setHasInteracted] = useState(false);

  const results = useMemo(() => calculateVendorConsolidation(inputs), [inputs]);

  const trackResult = useCallback(
    () => ({
      savings_bucket: getSavingsBucket(results.monthlySavings),
      locations_affected: inputs.numberOfLocations,
      vendor_reduction_pct: Math.round(results.operationalComplexityReduction),
    }),
    [inputs.numberOfLocations, results.monthlySavings, results.operationalComplexityReduction]
  );

  const { resultsRef, handleStart, handleInteraction } = useCalculatorAnalytics({
    calculatorId: VENDOR_CONSOLIDATION_CALCULATOR_ID,
    sessionKeyPrefix: "vendor_consolidation_calculator",
    hasInteracted,
    onTrackResult: trackResult,
  });

  function startCalculator() {
    setShowIntro(false);
    handleStart();
  }

  function updateField<K extends keyof VendorConsolidationInputs>(field: K, value: number) {
    if (!hasInteracted) {
      setHasInteracted(true);
      onResultsVisible?.();
    }
    handleInteraction();
    setInputs((current) => ({ ...current, [field]: value }));
  }

  if (showIntro) {
    return (
      <CalculatorIntro
        title="Vendor Consolidation Calculator"
        subtitle="Estimate savings and operational impact from reducing telecom and network vendors across your multi-location portfolio."
        highlights={INTRO_HIGHLIGHTS}
        onStart={startCalculator}
        continueLabel="Start Calculator"
      />
    );
  }

  return (
    <div className="space-y-6">
      <ToolPanel title="Portfolio and vendor count">
        <div className="grid gap-5 sm:grid-cols-2">
          <NumberField
            id="locations"
            label="Number of locations"
            value={inputs.numberOfLocations}
            onChange={(value) => updateField("numberOfLocations", value)}
            min={1}
            step={1}
          />
          <NumberField
            id="current-vendors"
            label="Current number of vendors"
            help="Count distinct telecom, network, and connectivity vendors across the portfolio."
            value={inputs.currentNumberOfVendors}
            onChange={(value) => updateField("currentNumberOfVendors", value)}
            min={1}
            step={1}
          />
          <NumberField
            id="target-vendors"
            label="Target number of vendors"
            help="Fewer strategic partners after consolidation or managed services."
            value={inputs.targetNumberOfVendors}
            onChange={(value) => updateField("targetNumberOfVendors", value)}
            min={1}
            max={inputs.currentNumberOfVendors}
            step={1}
          />
          <NumberField
            id="spend-per-vendor"
            label="Average monthly spend per vendor"
            help="Blended monthly spend per vendor relationship including circuits and managed fees."
            value={inputs.avgMonthlySpendPerVendor}
            onChange={(value) => updateField("avgMonthlySpendPerVendor", value)}
            min={0}
            step={100}
          />
        </div>
      </ToolPanel>

      <ToolPanel title="Admin and IT overhead">
        <div className="grid gap-5 sm:grid-cols-2">
          <NumberField
            id="admin-hours"
            label="Monthly admin hours spent managing vendors"
            help="Invoices, escalations, contract renewals, and vendor coordination."
            value={inputs.monthlyAdminHours}
            onChange={(value) => updateField("monthlyAdminHours", value)}
            min={0}
            step={1}
            suffix="hrs"
          />
          <NumberField
            id="hourly-cost"
            label="Estimated hourly cost of admin/IT time"
            help="Fully loaded hourly cost for staff managing vendor relationships."
            value={inputs.hourlyAdminCost}
            onChange={(value) => updateField("hourlyAdminCost", value)}
            min={0}
            step={5}
          />
        </div>
      </ToolPanel>

      <div
        ref={resultsRef}
        aria-live="polite"
        className="rounded-xl border border-crimson/20 bg-crimson-50 p-5 sm:p-6"
      >
        <h3 className="text-xl font-semibold tracking-tight text-ink">
          Estimated vendor consolidation impact
        </h3>
        <p className="mt-2 text-sm text-ink-muted">
          Results update as you change inputs. Savings assume proportional admin reduction and
          consistent per-vendor spend after consolidation.
        </p>

        <div className="mt-5 rounded-lg border border-stone-200 bg-white px-5">
          <ResultRow
            label="Current monthly vendor spend"
            value={formatCurrency(results.currentMonthlyVendorSpend)}
          />
          <ResultRow
            label="Estimated consolidated monthly spend"
            value={formatCurrency(results.consolidatedMonthlyVendorSpend)}
          />
          <ResultRow
            label="Estimated monthly admin cost"
            value={formatCurrency(results.currentMonthlyAdminCost)}
          />
          <ResultRow
            label="Estimated monthly savings"
            value={formatCurrency(results.monthlySavings)}
            emphasis
          />
          <ResultRow label="Estimated annual savings" value={formatCurrency(results.annualSavings)} />
          <ResultRow
            label="Operational complexity reduction"
            value={formatPercent(results.operationalComplexityReduction)}
          />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-stone-200 bg-white px-4 py-3.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              3-year savings estimate
            </p>
            <p className="mt-1 text-lg font-semibold text-ink">
              {formatCurrency(results.threeYearSavings)}
              <span className="text-sm font-normal text-ink-muted"> cumulative</span>
            </p>
          </div>
          <div className="rounded-lg border border-stone-200 bg-white px-4 py-3.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Consolidated admin cost
            </p>
            <p className="mt-1 text-lg font-semibold text-ink">
              {formatCurrency(results.consolidatedMonthlyAdminCost)}
              <span className="text-sm font-normal text-ink-muted"> / month</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
