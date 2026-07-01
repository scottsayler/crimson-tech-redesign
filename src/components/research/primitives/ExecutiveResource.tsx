import type { ExecutiveResource as ExecutiveResourceConfig } from "@/content/research";

function DocumentIcon() {
  return (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v5h5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6M9 17h4" />
    </svg>
  );
}

function SlidesIcon() {
  return (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8l-4 4V6Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4v12m0 0 4-4m-4 4-4-4M4 20h16"
      />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 3h7v7M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
      />
    </svg>
  );
}

export function ExecutiveResource({
  heading,
  description,
  downloadUrl,
  downloadLabel,
  fileName,
  features,
  external,
  variant,
}: ExecutiveResourceConfig) {
  const isExternal = external ?? downloadUrl.startsWith("http");
  const resourceVariant = variant ?? (isExternal ? "slides" : "pdf");
  const resolvedHeading =
    heading ??
    (resourceVariant === "slides"
      ? "View the Executive Guide"
      : "Download the Executive Checklist");
  const resolvedLabel =
    downloadLabel ?? (resourceVariant === "slides" ? "View Slides" : "Download PDF");
  const ActionIcon = resourceVariant === "slides" ? ExternalIcon : DownloadIcon;
  const CardIcon = resourceVariant === "slides" ? SlidesIcon : DocumentIcon;

  return (
    <aside
      aria-label={resolvedHeading}
      className="relative overflow-hidden rounded-2xl border border-crimson/20 bg-gradient-to-br from-white via-crimson-50/60 to-white p-6 shadow-[0_8px_30px_rgba(155,27,48,0.08)] md:p-8"
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-crimson/5"
        aria-hidden
      />
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-crimson text-white shadow-md ring-4 ring-crimson/10">
            <CardIcon />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-crimson">
              Executive Resource
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink md:text-2xl">
              {resolvedHeading}
            </h3>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
              {description}
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm leading-relaxed text-ink"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson"
                    aria-hidden
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <a
          href={downloadUrl}
          download={isExternal ? undefined : fileName}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-crimson px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-crimson-dark lg:self-center"
        >
          <ActionIcon />
          {resolvedLabel}
        </a>
      </div>
    </aside>
  );
}
