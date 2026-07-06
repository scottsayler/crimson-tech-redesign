import { notFound } from "next/navigation";
import { ContextualLinks } from "@/components/sections/ContextualLinks";
import { CTABand } from "@/components/sections/CTABand";
import { AdvisorProse } from "@/components/sections/AdvisorProse";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getProject, projects } from "@/content/projects";
import { getResearchForProject } from "@/lib/relationships";
import { createMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return createMetadata({
    title: project.title,
    description: project.shortDescription,
    path: `/projects/${slug}`,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const relatedResearch = getResearchForProject(slug);

  return (
    <>
      <Section className="!pb-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-crimson">
          {project.category}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {project.title}
        </h1>
        <AdvisorProse prose={project.prose} className="mt-6 max-w-3xl text-lg" />
        {project.externalUrl && (
          <div className="mt-8">
            <Button href={project.externalUrl} external>
              Visit {project.title}
            </Button>
          </div>
        )}
      </Section>

      <Section variant="muted" className="!py-12">
        <h2 className="text-2xl font-semibold text-ink">What we delivered</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {project.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex gap-3 rounded-lg border border-stone-200 bg-white p-5 text-ink-muted"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
              {highlight}
            </li>
          ))}
        </ul>
        {project.outcomes && project.outcomes.length > 0 ? (
          <>
            <h3 className="mt-10 text-lg font-semibold text-ink">Outcomes</h3>
            <ul className="mt-4 space-y-3">
              {project.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex gap-3 rounded-lg border border-crimson/20 bg-crimson-50 p-4 text-sm text-ink-muted"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                  {outcome}
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </Section>

      {slug === "cfbverdict" && (
        <Section>
          <h2 className="text-2xl font-semibold text-ink">Why we built it</h2>
          <AdvisorProse
            prose={{
              observation:
                "Clients asked for evidence that advisory recommendations could be translated into working software.",
              whyItMatters:
                "A live platform demonstrates architecture discipline and production execution more clearly than deliverables alone.",
              recommendation:
                "Use CFBVerdict as a reference for how we approach requirements, integrations, and production operations.",
            }}
            className="mt-4 max-w-3xl"
          />
        </Section>
      )}

      <ContextualLinks research={relatedResearch} />

      <CTABand
        title="Need something evaluated or built?"
        description="Share what you are evaluating. We will tell you whether we can help."
      />
    </>
  );
}
