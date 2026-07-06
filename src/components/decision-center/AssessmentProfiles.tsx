import Link from "next/link";
import type { DecisionCenterAssessment } from "@/content/decision-center";
import { getIndustry } from "@/content/industries";
import { getPractice } from "@/content/practices";
import { getProject } from "@/content/projects";

type AssessmentProfilesProps = {
  assessment: DecisionCenterAssessment;
};

function ProfileCard({
  eyebrow,
  title,
  description,
  href,
}: {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border border-stone-200 bg-white p-5 transition-colors hover:border-crimson/30"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-crimson">{eyebrow}</p>
      <h3 className="mt-2 text-lg font-semibold text-ink group-hover:text-crimson">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{description}</p>
      <span className="mt-4 text-sm font-medium text-crimson">View profile →</span>
    </Link>
  );
}

export function AssessmentProfiles({ assessment }: AssessmentProfilesProps) {
  const industries = assessment.industries
    .map((slug) => getIndustry(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const practice = assessment.practiceSlug ? getPractice(assessment.practiceSlug) : undefined;

  const projects = (assessment.relatedProjectSlugs ?? [])
    .map((slug) => getProject(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (industries.length === 0 && !practice && projects.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 border-t border-stone-200 pt-10">
      <p className="text-sm font-semibold uppercase tracking-wider text-crimson">
        Industry & advisory context
      </p>
      <p className="mt-2 max-w-2xl text-sm text-ink-muted">
        This assessment is part of our financial services and contact center advisory work—the same
        evaluations reflected in our Crimson CX practice and project profiles.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <ProfileCard
            key={industry.slug}
            eyebrow="Industry profile"
            title={industry.title}
            description={industry.shortDescription}
            href={`/industries/${industry.slug}`}
          />
        ))}
        {practice ? (
          <ProfileCard
            eyebrow="Practice area"
            title={practice.title}
            description={practice.shortDescription}
            href={practice.href}
          />
        ) : null}
        {projects.map((project) => (
          <ProfileCard
            key={project.slug}
            eyebrow="Related project"
            title={project.title}
            description={project.shortDescription}
            href={`/projects/${project.slug}`}
          />
        ))}
      </div>
    </div>
  );
}
