export type FrictionTier = "minimal" | "low" | "moderate" | "elevated" | "critical";

export type FrictionTierMeta = {
  tier: FrictionTier;
  label: string;
  description: string;
};

export function getFrictionTier(score: number): FrictionTierMeta {
  if (score >= 76) {
    return {
      tier: "critical",
      label: "Critical",
      description: "Systemic friction requiring immediate operational attention.",
    };
  }
  if (score >= 56) {
    return {
      tier: "elevated",
      label: "Elevated",
      description: "Concentrated friction affecting customer and agent experience.",
    };
  }
  if (score >= 36) {
    return {
      tier: "moderate",
      label: "Moderate",
      description: "Noticeable gaps that should be addressed before platform investments.",
    };
  }
  if (score >= 16) {
    return {
      tier: "low",
      label: "Low",
      description: "Acceptable friction with room for targeted improvement.",
    };
  }
  return {
    tier: "minimal",
    label: "Minimal",
    description: "Strong journey consistency with limited friction points.",
  };
}

export const frictionTierStyles: Record<
  FrictionTier,
  { border: string; bg: string; badge: string; text: string; bar: string }
> = {
  minimal: {
    border: "border-emerald-200",
    bg: "bg-emerald-50/60",
    badge: "bg-emerald-100 text-emerald-800",
    text: "text-emerald-800",
    bar: "bg-emerald-600",
  },
  low: {
    border: "border-sky-200",
    bg: "bg-sky-50/60",
    badge: "bg-sky-100 text-sky-800",
    text: "text-sky-800",
    bar: "bg-sky-600",
  },
  moderate: {
    border: "border-amber-200",
    bg: "bg-amber-50/60",
    badge: "bg-amber-100 text-amber-900",
    text: "text-amber-900",
    bar: "bg-amber-500",
  },
  elevated: {
    border: "border-orange-200",
    bg: "bg-orange-50/60",
    badge: "bg-orange-100 text-orange-900",
    text: "text-orange-900",
    bar: "bg-orange-500",
  },
  critical: {
    border: "border-crimson/25",
    bg: "bg-crimson-50/60",
    badge: "bg-crimson-100 text-crimson-dark",
    text: "text-crimson-dark",
    bar: "bg-crimson",
  },
};
