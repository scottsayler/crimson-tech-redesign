export const assessmentFieldClass =
  "mt-1.5 w-full rounded-lg border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-ink shadow-sm transition-colors focus:border-crimson focus:outline-none focus:ring-2 focus:ring-crimson/20";

export const assessmentLabelClass =
  "block text-sm font-semibold text-ink";

export const assessmentCardClass =
  "rounded-2xl border border-stone-200 bg-white p-6 shadow-md md:p-8";

export const assessmentSectionTitleClass =
  "text-2xl font-bold tracking-tight text-ink";

export const assessmentSectionDescClass =
  "mt-2 text-base leading-relaxed text-ink-muted";

export const assessmentChipClass = (selected: boolean) =>
  `rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
    selected
      ? "border-crimson bg-crimson-50 text-crimson"
      : "border-stone-200 bg-white text-ink-muted hover:border-stone-300 hover:bg-stone-50"
  }`;

export const assessmentPrimaryBtnClass =
  "rounded-lg bg-crimson px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-crimson-dark disabled:cursor-not-allowed disabled:opacity-50";

export const assessmentSecondaryBtnClass =
  "rounded-lg px-4 py-2.5 text-sm font-semibold text-ink-muted transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-40";
