import { ResearchCard } from "@/components/sections/ResearchCard";
import type { Research } from "@/content/research";

export function RelatedTopics({
  items,
  title = "Related Topics",
}: {
  items: Research[];
  title?: string;
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-ink">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
        Connected guides and frameworks in the same topic cluster.
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ResearchCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
