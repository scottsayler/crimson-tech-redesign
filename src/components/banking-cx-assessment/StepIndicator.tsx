type StepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
  labels: string[];
};

export function StepIndicator({
  currentStep,
  totalSteps,
  labels,
}: StepIndicatorProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="rounded-xl border border-stone-200 bg-white px-4 py-4 shadow-md sm:px-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm font-bold text-ink">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-sm font-semibold text-ink-muted">
          {labels[currentStep]}
        </span>
      </div>
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-stone-200">
        <div
          className="h-full rounded-full bg-crimson transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-xs font-medium text-ink-muted">
        {Math.round(progress)}% complete
      </p>
    </div>
  );
}
