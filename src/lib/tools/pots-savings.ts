export interface PotsSavingsInputs {
  numberOfLocations: number;
  avgLinesPerLocation: number;
  currentMonthlyCostPerLine: number;
  replacementMonthlyCostPerLine: number;
  oneTimeImplementationCost: number;
}

export interface PotsSavingsResults {
  totalLines: number;
  currentMonthlyCost: number;
  replacementMonthlyCost: number;
  monthlySavings: number;
  annualSavings: number;
  paybackMonths: number | null;
  threeYearSavings: number;
}

export const POTS_SAVINGS_DEFAULTS: PotsSavingsInputs = {
  numberOfLocations: 25,
  avgLinesPerLocation: 4,
  currentMonthlyCostPerLine: 85,
  replacementMonthlyCostPerLine: 35,
  oneTimeImplementationCost: 15000,
};

function clampNonNegative(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

export function calculatePotsSavings(inputs: PotsSavingsInputs): PotsSavingsResults {
  const locations = clampNonNegative(inputs.numberOfLocations);
  const linesPerLocation = clampNonNegative(inputs.avgLinesPerLocation);
  const currentCostPerLine = clampNonNegative(inputs.currentMonthlyCostPerLine);
  const replacementCostPerLine = clampNonNegative(inputs.replacementMonthlyCostPerLine);
  const implementationCost = clampNonNegative(inputs.oneTimeImplementationCost);

  const totalLines = locations * linesPerLocation;
  const currentMonthlyCost = totalLines * currentCostPerLine;
  const replacementMonthlyCost = totalLines * replacementCostPerLine;
  const monthlySavings = currentMonthlyCost - replacementMonthlyCost;
  const annualSavings = monthlySavings * 12;
  const paybackMonths =
    monthlySavings > 0 ? implementationCost / monthlySavings : null;
  const threeYearSavings = monthlySavings * 36 - implementationCost;

  return {
    totalLines,
    currentMonthlyCost,
    replacementMonthlyCost,
    monthlySavings,
    annualSavings,
    paybackMonths,
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

export function formatPaybackMonths(months: number | null): string {
  if (months === null || !Number.isFinite(months)) return "No payback";
  if (months < 1) return "Less than 1 month";
  if (months < 12) return `${Math.round(months * 10) / 10} months`;
  const years = months / 12;
  return `${Math.round(years * 10) / 10} years`;
}
