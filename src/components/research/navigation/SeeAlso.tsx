import Link from "next/link";
import type { Research } from "@/content/research";

export function SeeAlso({ items }: { items: Research[] }) {
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-ink">See Also</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
        Additional research in the same industry from a different angle.
      </p>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/research/${item.slug}`}
              className="flex items-start justify-between gap-4 rounded-lg border border-stone-200 bg-white px-4 py-3 transition-colors hover:border-crimson/30"
            >
              <span>
                <span className="block font-medium text-ink">{item.title}</span>
                <span className="mt-1 block text-sm text-ink-muted line-clamp-2">
                  {item.excerpt}
                </span>
              </span>
              {item.libraryCategory ? (
                <span className="shrink-0 rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-ink-muted">
                  {item.libraryCategory}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
