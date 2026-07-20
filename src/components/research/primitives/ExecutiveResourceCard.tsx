import Image from "next/image";
import type { ExecutiveResourceBadge, ExecutiveResourceItem } from "@/content/research";
import { ContentBadge } from "@/components/ui/ContentBadge";
import { contentBadgeLabels } from "@/lib/content-badges";

const defaultDownloadLabels: Record<ExecutiveResourceBadge, string> = {
  "executive-brief": "Download Brief",
  "decision-matrix": "Download Matrix",
  "executive-checklist": "Download Checklist",
  playbook: "Download Playbook",
  workbook: "Download Workbook",
};

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

function MatrixIcon() {
  return (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16v14H4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 10h16M4 15h16M10 5v14" />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6h11M9 12h11M9 18h11" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 6 1.5 1.5L8 5M5 12l1.5 1.5L8 11M5 18l1.5 1.5L8 17" />
    </svg>
  );
}

function PlaybookIcon() {
  return (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 4h12a2 2 0 0 1 2 2v12l-4-2-4 2-4-2-4 2V6a2 2 0 0 1 2-2Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6M9 12h4" />
    </svg>
  );
}

function WorkbookIcon() {
  return (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 4h10a2 2 0 0 1 2 2v14l-3-2-3 2-3-2-3 2V6a2 2 0 0 1 2-2Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6M9 12h6M9 16h4" />
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

function ResourceBadgeIcon({ badge }: { badge: ExecutiveResourceBadge }) {
  switch (badge) {
    case "decision-matrix":
      return <MatrixIcon />;
    case "executive-checklist":
      return <ChecklistIcon />;
    case "playbook":
      return <PlaybookIcon />;
    case "workbook":
      return <WorkbookIcon />;
    case "executive-brief":
    default:
      return <DocumentIcon />;
  }
}

function resolveFileName(resource: ExecutiveResourceItem): string | undefined {
  if (resource.fileName) return resource.fileName;
  const segment = resource.filePath.split("/").pop();
  return segment || undefined;
}

type ExecutiveResourceCardProps = {
  resource: ExecutiveResourceItem;
  layout?: "featured" | "compact";
};

export function ExecutiveResourceCard({
  resource,
  layout = "featured",
}: ExecutiveResourceCardProps) {
  const isExternal = resource.external ?? resource.filePath.startsWith("http");
  const resolvedLabel =
    resource.downloadLabel ??
    (isExternal ? "View Resource" : defaultDownloadLabels[resource.badge]);
  const ActionIcon = isExternal ? ExternalIcon : DownloadIcon;
  const fileName = resolveFileName(resource);
  const isCompact = layout === "compact";

  return (
    <article
      aria-label={resource.title}
      className={`relative overflow-hidden rounded-2xl border border-crimson/20 bg-gradient-to-br from-white via-crimson-50/60 to-white shadow-[0_8px_30px_rgba(155,27,48,0.08)] ${
        isCompact ? "p-5" : "p-6 md:p-8"
      }`}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-crimson/5"
        aria-hidden
      />
      <div
        className={`relative flex gap-5 ${
          isCompact
            ? "flex-col"
            : "flex-col lg:flex-row lg:items-center lg:justify-between"
        }`}
      >
        <div className={`flex min-w-0 gap-5 ${isCompact ? "flex-col" : ""}`}>
          {resource.thumbnailPath ? (
            <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-white sm:h-32 sm:w-48">
              <Image
                src={resource.thumbnailPath}
                alt={`${resource.title} preview`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 192px"
              />
            </div>
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-crimson text-white shadow-md ring-4 ring-crimson/10">
              <ResourceBadgeIcon badge={resource.badge} />
            </div>
          )}
          <div className="min-w-0">
            <ContentBadge label={contentBadgeLabels[resource.badge]} />
            <h3
              className={`mt-2 font-semibold tracking-tight text-ink ${
                isCompact ? "text-lg" : "text-xl md:text-2xl"
              }`}
            >
              {resource.title}
            </h3>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
              {resource.description}
            </p>
            {resource.fileSize ? (
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-ink-muted">
                {resource.fileSize}
              </p>
            ) : null}
            {resource.features && resource.features.length > 0 ? (
              <ul
                className={`mt-5 grid gap-2 ${
                  isCompact ? "grid-cols-1" : "sm:grid-cols-2"
                }`}
              >
                {resource.features.map((feature) => (
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
            ) : null}
          </div>
        </div>
        <a
          href={resource.filePath}
          download={isExternal ? undefined : fileName}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-crimson px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-crimson-dark ${
            isCompact ? "w-full" : "lg:self-center"
          }`}
        >
          <ActionIcon />
          {resolvedLabel}
        </a>
      </div>
    </article>
  );
}
