import Link from "next/link";
import type { Project } from "@/content/projects";
import { Button } from "@/components/ui/Button";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col rounded-lg border border-stone-200 bg-white p-6">
      <span className="text-xs font-semibold uppercase tracking-wider text-crimson">
        {project.category}
      </span>
      <h3 className="mt-2 text-xl font-semibold text-ink">{project.title}</h3>
      <p className="mt-3 flex-1 text-sm text-ink-muted leading-relaxed">
        {project.shortDescription}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/projects/${project.slug}`}
          className="text-sm font-medium text-crimson hover:text-crimson-dark"
        >
          View project →
        </Link>
        {project.externalUrl && (
          <Button href={project.externalUrl} variant="ghost" external className="!px-0 !py-0">
            Visit site →
          </Button>
        )}
      </div>
    </div>
  );
}
