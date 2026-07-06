import { AdvisorProse } from "@/components/sections/AdvisorProse";
import { engagementStandards } from "@/content/credibility";

export function EngagementStandards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {engagementStandards.map((item) => (
        <div
          key={item.title}
          className="rounded-lg border border-stone-200 bg-white p-6"
        >
          <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
          <AdvisorProse prose={item.prose} className="mt-3 text-sm" />
        </div>
      ))}
    </div>
  );
}
