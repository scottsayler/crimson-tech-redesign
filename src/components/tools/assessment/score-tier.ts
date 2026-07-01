export type ScoreTier = "excellent" | "good" | "needs-attention" | "high-risk";

export type ScoreTierMeta = {
  tier: ScoreTier;
  label: string;
  description: string;
};

export function getScoreTier(score: number): ScoreTierMeta {
  if (score >= 85) {
    return {
      tier: "excellent",
      label: "Excellent",
      description: "Portfolio practices are strong and consistent in this area.",
    };
  }
  if (score >= 70) {
    return {
      tier: "good",
      label: "Good",
      description: "Solid fundamentals with room to tighten consistency across locations.",
    };
  }
  if (score >= 50) {
    return {
      tier: "needs-attention",
      label: "Needs Attention",
      description: "Gaps here create operational friction and should be prioritized.",
    };
  }
  return {
    tier: "high-risk",
    label: "High Risk",
    description: "This area likely contributes to outages, cost, or compliance exposure.",
  };
}

export const scoreTierStyles: Record<
  ScoreTier,
  { border: string; bg: string; badge: string; text: string }
> = {
  excellent: {
    border: "border-emerald-200",
    bg: "bg-emerald-50/60",
    badge: "bg-emerald-100 text-emerald-800",
    text: "text-emerald-800",
  },
  good: {
    border: "border-sky-200",
    bg: "bg-sky-50/60",
    badge: "bg-sky-100 text-sky-800",
    text: "text-sky-800",
  },
  "needs-attention": {
    border: "border-amber-200",
    bg: "bg-amber-50/60",
    badge: "bg-amber-100 text-amber-900",
    text: "text-amber-900",
  },
  "high-risk": {
    border: "border-crimson/25",
    bg: "bg-crimson-50/60",
    badge: "bg-crimson-100 text-crimson-dark",
    text: "text-crimson-dark",
  },
};
