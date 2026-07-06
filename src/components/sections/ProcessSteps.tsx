import { AdvisorProse } from "@/components/sections/AdvisorProse";
import { methodologySteps } from "@/content/credibility";

export function ProcessSteps({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {methodologySteps.map((step) => (
        <div key={step.number} className="relative">
          <span className="text-4xl font-bold text-crimson/20">{step.number}</span>
          <h3 className="mt-2 text-xl font-semibold text-ink">{step.title}</h3>
          <AdvisorProse prose={step.prose} className="mt-3 text-sm" />
          {detailed ? (
            <ul className="mt-4 space-y-2">
              {step.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-xs text-ink-muted leading-relaxed"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-crimson" />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  );
}
