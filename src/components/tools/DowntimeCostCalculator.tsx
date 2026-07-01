"use client";

import { useMemo, useState } from "react";
import {
  calculateDowntimeCost,
  DOWNTIME_COST_DEFAULTS,
  formatCurrency,
  type DowntimeCostInputs,
} from "@/lib/tools/downtime-cost";
import { NumberField, ToolPanel } from "./primitives/CalculatorPrimitives";
import { ResultRow } from "./primitives/ResultRow";

type DowntimeCostCalculatorProps = {
  onResultsVisible?: () => void;
};

export function DowntimeCostCalculator({ onResultsVisible }: DowntimeCostCalculatorProps) {
  const [inputs, setInputs] = useState<DowntimeCostInputs>(DOWNTIME_COST_DEFAULTS);
  const [hasInteracted, setHasInteracted] = useState(false);

  const results = useMemo(() => calculateDowntimeCost(inputs), [inputs]);

  function updateField<K extends keyof DowntimeCostInputs>(field: K, value: number) {
    if (!hasInteracted) {
      setHasInteracted(true);
      onResultsVisible?.();
    }
    setInputs((current) => ({ ...current, [field]: value }));
  }

  return (
    <div className="space-y-6">
      <ToolPanel title="Location and revenue">
        <div className="grid gap-5 sm:grid-cols-2">
          <NumberField
            id="locations"
            label="Number of locations affected"
            value={inputs.locationsAffected}
            onChange={(value) => updateField("locationsAffected", value)}
            min={1}
            step={1}
          />
          <NumberField
            id="daily-revenue"
            label="Average revenue per location per day"
            help="Gross sales before the outage, not card volume only."
            value={inputs.dailyRevenuePerLocation}
            onChange={(value) => updateField("dailyRevenuePerLocation", value)}
            min={0}
            step={100}
          />
          <NumberField
            id="operating-hours"
            label="Operating hours per day"
            help="Used to convert daily revenue into an hourly rate."
            value={inputs.operatingHoursPerDay}
            onChange={(value) => updateField("operatingHoursPerDay", value)}
            min={1}
            max={24}
            step={0.5}
          />
          <NumberField
            id="peak-multiplier"
            label="Peak revenue multiplier"
            help="1.0 is average hour. 1.8 approximates lunch or dinner rush."
            value={inputs.peakRevenueMultiplier}
            onChange={(value) => updateField("peakRevenueMultiplier", value)}
            min={1}
            max={5}
            step={0.1}
          />
        </div>
      </ToolPanel>

      <ToolPanel title="Outage and dependency">
        <div className="grid gap-5 sm:grid-cols-2">
          <NumberField
            id="outage-minutes"
            label="Estimated outage duration"
            value={inputs.outageDurationMinutes}
            onChange={(value) => updateField("outageDurationMinutes", value)}
            min={0}
            step={5}
            suffix="min"
          />
          <NumberField
            id="dependency-pct"
            label="Sales dependent on POS, card, or online ordering"
            help="Share of revenue that stops when connected systems fail."
            value={inputs.salesDependentOnSystemsPct}
            onChange={(value) => updateField("salesDependentOnSystemsPct", value)}
            min={0}
            max={100}
            step={1}
            suffix="%"
          />
          <NumberField
            id="online-orders-pct"
            label="Lost online orders (optional)"
            help="Additional online-only revenue fully lost during the outage."
            value={inputs.lostOnlineOrdersPct}
            onChange={(value) => updateField("lostOnlineOrdersPct", value)}
            min={0}
            max={100}
            step={1}
            suffix="%"
          />
          <NumberField
            id="delivery-pct"
            label="Delivery platform dependency (optional)"
            help="Share of revenue from third-party delivery that stops when connectivity fails."
            value={inputs.deliveryPlatformDependencyPct}
            onChange={(value) => updateField("deliveryPlatformDependencyPct", value)}
            min={0}
            max={100}
            step={1}
            suffix="%"
          />
        </div>
      </ToolPanel>

      <ToolPanel title="Labor and recovery">
        <div className="grid gap-5 sm:grid-cols-2">
          <NumberField
            id="labor-cost"
            label="Average labor cost per hour per location"
            help="Fully loaded hourly cost for affected staff."
            value={inputs.laborCostPerHour}
            onChange={(value) => updateField("laborCostPerHour", value)}
            min={0}
            step={1}
          />
          <NumberField
            id="employees"
            label="Employees affected per location"
            value={inputs.employeesAffectedPerLocation}
            onChange={(value) => updateField("employeesAffectedPerLocation", value)}
            min={0}
            step={1}
          />
          <NumberField
            id="recovery-minutes"
            label="Estimated recovery and admin time"
            help="Time spent reconciling orders, refunds, and reports after service resumes."
            value={inputs.recoveryTimeMinutes}
            onChange={(value) => updateField("recoveryTimeMinutes", value)}
            min={0}
            step={5}
            suffix="min"
          />
        </div>
      </ToolPanel>

      <div
        aria-live="polite"
        className="rounded-xl border border-crimson/20 bg-crimson-50 p-5 sm:p-6"
      >
        <h3 className="text-xl font-semibold tracking-tight text-ink">
          Estimated downtime impact
        </h3>
        <p className="mt-2 text-sm text-ink-muted">
          Results update as you change inputs. This is a directional estimate, not accounting
          advice.
        </p>

        <div className="mt-5 rounded-lg border border-stone-200 bg-white px-5">
          <ResultRow
            label="Estimated revenue at risk (before dependency)"
            value={formatCurrency(results.revenueAtRisk)}
          />
          <ResultRow
            label="Estimated lost revenue impact (connected systems)"
            value={formatCurrency(results.lostRevenueEstimate)}
          />
          {results.onlineOrdersLoss > 0 ? (
            <ResultRow
              label="Additional estimated online order impact"
              value={formatCurrency(results.onlineOrdersLoss)}
            />
          ) : null}
          {results.deliveryPlatformLoss > 0 ? (
            <ResultRow
              label="Additional estimated delivery platform impact"
              value={formatCurrency(results.deliveryPlatformLoss)}
            />
          ) : null}
          <ResultRow label="Estimated labor impact" value={formatCurrency(results.laborWaste)} />
          <ResultRow
            label="Estimated recovery and admin impact"
            value={formatCurrency(results.recoveryCost)}
          />
          <ResultRow
            label="Total estimated downtime impact"
            value={formatCurrency(results.totalImpact)}
            emphasis
          />
          <ResultRow
            label="Estimated impact per affected location"
            value={formatCurrency(results.impactPerLocation)}
          />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-stone-200 bg-white px-4 py-3.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              If this happens monthly
            </p>
            <p className="mt-1 text-lg font-semibold text-ink">
              {formatCurrency(results.annualizedMonthly)}
              <span className="text-sm font-normal text-ink-muted"> / year</span>
            </p>
          </div>
          <div className="rounded-lg border border-stone-200 bg-white px-4 py-3.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              If this happens quarterly
            </p>
            <p className="mt-1 text-lg font-semibold text-ink">
              {formatCurrency(results.annualizedQuarterly)}
              <span className="text-sm font-normal text-ink-muted"> / year</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
