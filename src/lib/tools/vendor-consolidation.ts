export interface VendorConsolidationInputs {
  numberOfLocations: number;
  currentNumberOfVendors: number;
  targetNumberOfVendors: number;
  avgMonthlySpendPerVendor: number;
  monthlyAdminHours: number;
  hourlyAdminCost: number;
}

export interface VendorConsolidationResults {
  currentMonthlyVendorSpend: number;
  consolidatedMonthlyVendorSpend: number;
  currentMonthlyAdminCost: number;
  consolidatedMonthlyAdminCost: number;
  monthlySavings: number;
  annualSavings: number;
  operationalComplexityReduction: number;
  threeYearSavings: number;
}

export const VENDOR_CONSOLIDATION_DEFAULTS: VendorConsolidationInputs = {
  numberOfLocations: 25,
  currentNumberOfVendors: 12,
  targetNumberOfVendors: 4,
  avgMonthlySpendPerVendor: 2500,
  monthlyAdminHours: 40,
  hourlyAdminCost: 75,
};

function clampNonNegative(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

export function calculateVendorConsolidation(
  inputs: VendorConsolidationInputs
): VendorConsolidationResults {
  const currentVendors = clampNonNegative(inputs.currentNumberOfVendors);
  const targetVendors = Math.min(currentVendors, clampNonNegative(inputs.targetNumberOfVendors));
  const spendPerVendor = clampNonNegative(inputs.avgMonthlySpendPerVendor);
  const adminHours = clampNonNegative(inputs.monthlyAdminHours);
  const hourlyCost = clampNonNegative(inputs.hourlyAdminCost);

  const currentMonthlyVendorSpend = currentVendors * spendPerVendor;
  const consolidatedMonthlyVendorSpend = targetVendors * spendPerVendor;
  const vendorSpendSavings = currentMonthlyVendorSpend - consolidatedMonthlyVendorSpend;

  const currentMonthlyAdminCost = adminHours * hourlyCost;
  const vendorRatio = currentVendors > 0 ? targetVendors / currentVendors : 1;
  const consolidatedMonthlyAdminCost = adminHours * vendorRatio * hourlyCost;
  const adminSavings = currentMonthlyAdminCost - consolidatedMonthlyAdminCost;

  const monthlySavings = vendorSpendSavings + adminSavings;
  const annualSavings = monthlySavings * 12;
  const operationalComplexityReduction =
    currentVendors > 0 ? ((currentVendors - targetVendors) / currentVendors) * 100 : 0;
  const threeYearSavings = monthlySavings * 36;

  return {
    currentMonthlyVendorSpend,
    consolidatedMonthlyVendorSpend,
    currentMonthlyAdminCost,
    consolidatedMonthlyAdminCost,
    monthlySavings,
    annualSavings,
    operationalComplexityReduction,
    threeYearSavings,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}
