import { formatContentBadgeText } from "@/lib/content-badges";

type ContentBadgeProps = {
  label: string;
  completionTime?: string;
  variant?: "type" | "chip";
  className?: string;
};

export function ContentBadge({
  label,
  completionTime,
  variant = "type",
  className = "",
}: ContentBadgeProps) {
  const text = formatContentBadgeText(label, completionTime);

  if (variant === "chip") {
    return (
      <span
        className={`inline-flex max-w-full flex-wrap items-center rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-ink-muted ${className}`}
      >
        {text}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex max-w-full flex-wrap items-center text-xs font-medium text-crimson sm:text-sm ${className}`}
    >
      {completionTime ? (
        <>
          <span>{label}</span>
          <span className="mx-1.5 text-ink-muted" aria-hidden>
            •
          </span>
          <span className="text-ink-muted">{completionTime}</span>
        </>
      ) : (
        text
      )}
    </span>
  );
}
