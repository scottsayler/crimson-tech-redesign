import type { ExecutiveResourceItem } from "@/content/research";
import { ExecutiveResourceCard } from "./ExecutiveResourceCard";

type ExecutiveResourcesProps = {
  resources: ExecutiveResourceItem[];
};

export function ExecutiveResources({ resources }: ExecutiveResourcesProps) {
  if (resources.length === 0) return null;

  if (resources.length === 1) {
    return (
      <section aria-label="Executive resources">
        <ExecutiveResourceCard resource={resources[0]} layout="featured" />
      </section>
    );
  }

  return (
    <section aria-label="Executive resources" className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
        Downloadable resources
      </p>
      <div className="grid gap-6 lg:grid-cols-2">
        {resources.map((resource) => (
          <ExecutiveResourceCard
            key={resource.filePath}
            resource={resource}
            layout="compact"
          />
        ))}
      </div>
    </section>
  );
}
