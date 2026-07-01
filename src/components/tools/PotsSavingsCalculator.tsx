"use client";

import { useCallback, useMemo, useState } from "react";
import {
  getSavingsBucket,
  POTS_SAVINGS_CALCULATOR_ID,
} from "@/lib/analytics/calculator-events";
import {
  calculatePotsSavings,
  formatCurrency,
  formatPaybackMonths,
  POTS_SAVINGS_DEFAULTS,
  type PotsSavingsInputs,
} from "@/lib/tools/pots-savings";
import { CalculatorIntro } from "./calculator/CalculatorIntro";
import { useCalculatorAnalytics } from "./calculator/useCalculatorAnalytics";
import { NumberField, ToolPanel } from "./primitives/CalculatorPrimitives";
import { ResultRow } from "./primitives/ResultRow";

const INTRO_HIGHLIGHTS = [
  "Estimate monthly and annual POTS savings",
  "Model payback on replacement investment",
  "Approximately 2 minutes",
  "No registration required",
];

type PotsSavingsCalculatorProps = {
  onResultsVisible?: () => void;
};

export function PotsSavingsCalculator({ onResultsVisible }: PotsSavingsCalculatorProps) {
  const [showIntro, setShowIntro] = useState(true);
  const [inputs, setInputs] = useState<PotsSavingsInputs>(POTS_SAVINGS_DEFAULTS);
  const [hasInteracted, setHasInteracted] = useState(false);

  const results = useMemo(() => calculatePotsSavings(inputs), [inputs]);

  const trackResult = useCallback(
    () => ({
      savings_bucket: getSavingsBucket(results.monthlySavings),
      locations_affected: inputs.numberOfLocations,
      total_lines: results.totalLines,
    }),
    [inputs.numberOfLocations, results.monthlySavings, results.totalLines]
  );

  const { resultsRef, handleStart, handleInteraction } = useCalculatorAnalytics({
    calculatorId: POTS_SAVINGS_CALCULATOR_ID,
    sessionKeyPrefix: "pots_savings_calculator",
    hasInteracted,
    onTrackResult: trackResult,
  });

  function startCalculator() {
    setShowIntro(false);
    handleStart();
  }

  function updateField<K extends keyof PotsSavingsInputs>(field: K, value: number) {
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
        title="POTS Replacement Savings Calculator"
        subtitle="Estimate monthly and annual savings from replacing legacy analog POTS lines across your restaurant or multi-location portfolio."
        highlights={INTRO_HIGHLIGHTS}
        onStart={startCalculator}
        continueLabel="Start Calculator"
      />
    );
  }

  return (
    <div className="space-y-6">
      <ToolPanel title="Portfolio and line inventory">
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
            id="lines-per-location"
            label="Average analog/POTS lines per location"
            help="Include alarms, fax, elevator phones, emergency lines, and other copper dependencies."
            value={inputs.avgLinesPerLocation}
            onChange={(value) => updateField("avgLinesPerLocation", value)}
            min={0}
            step={1}
          />
        </div>
      </ToolPanel>

      <ToolPanel title="Monthly line costs">
        <div className="grid gap-5 sm:grid-cols-2">
          <NumberField
            id="current-cost"
            label="Current average monthly cost per line"
            help="Use your blended POTS bill divided by active lines if costs vary by site."
            value={inputs.currentMonthlyCostPerLine}
            onChange={(value) => updateField("currentMonthlyCostPerLine", value)}
            min={0}
            step={5}
          />
          <NumberField
            id="replacement-cost"
            label="Estimated replacement monthly cost per line"
            help="Cellular gateway, managed POTS replacement, or other modern alternative per line."
            value={inputs.replacementMonthlyCostPerLine}
            onChange={(value) => updateField("replacementMonthlyCostPerLine", value)}
            min={0}
            step={5}
          />
        </div>
      </ToolPanel>

      <ToolPanel title="Implementation investment">
        <div className="grid gap-5 sm:grid-cols-2">
          <NumberField
            id="implementation-cost"
            label="One-time implementation cost"
            help="Hardware, installation, alarm vendor coordination, and project management."
            value={inputs.oneTimeImplementationCost}
            onChange={(value) => updateField("oneTimeImplementationCost", value)}
            min={0}
            step={500}
          />
        </div>
      </ToolPanel>

      <div
        ref={resultsRef}
        aria-live="polite"
        className="rounded-xl border border-crimson/20 bg-crimson-50 p-5 sm:p-6"
      >
        <h3 className="text-xl font-semibold tracking-tight text-ink">
          Estimated POTS replacement savings
        </h3>
        <p className="mt-2 text-sm text-ink-muted">
          Results update as you change inputs. This is a directional estimate for planning, not a
          vendor quote.
        </p>

        <div className="mt-5 rounded-lg border border-stone-200 bg-white px-5">
          <ResultRow
            label="Current monthly POTS cost"
            value={formatCurrency(results.currentMonthlyCost)}
          />
          <ResultRow
            label="Estimated replacement monthly cost"
            value={formatCurrency(results.replacementMonthlyCost)}
          />
          <ResultRow
            label="Monthly savings"
            value={formatCurrency(results.monthlySavings)}
            emphasis
          />
          <ResultRow label="Annual savings" value={formatCurrency(results.annualSavings)} />
          <ResultRow
            label="Estimated payback period"
            value={formatPaybackMonths(results.paybackMonths)}
          />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-stone-200 bg-white px-4 py-3.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              3-year savings estimate
            </p>
            <p className="mt-1 text-lg font-semibold text-ink">
              {formatCurrency(results.threeYearSavings)}
              <span className="text-sm font-normal text-ink-muted"> net after implementation</span>
            </p>
          </div>
          <div className="rounded-lg border border-stone-200 bg-white px-4 py-3.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Total lines in portfolio
            </p>
            <p className="mt-1 text-lg font-semibold text-ink">
              {results.totalLines.toLocaleString()}
              <span className="text-sm font-normal text-ink-muted"> analog lines</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
