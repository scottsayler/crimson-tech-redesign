import Link from "next/link";
import { getTool } from "@/content/tools";

type RelatedToolLink = {
  slug: string;
  label: string;
};

export function RelatedTools({ items }: { items: RelatedToolLink[] }) {
  const resolved = items
    .map((item) => {
      const tool = getTool(item.slug);
      if (!tool) return null;
      return { ...item, tool };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (resolved.length === 0) return null;

  return (
    <div className="rounded-xl border border-crimson/15 bg-crimson-50 p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-crimson">
        Interactive tools
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {resolved.map((item) => (
          <Link
            key={item.slug}
            href={`/tools/${item.slug}`}
            className="inline-flex items-center gap-2 rounded-lg border border-crimson/20 bg-white px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-crimson/40 hover:text-crimson"
          >
            {item.label}
            <span aria-hidden>→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
