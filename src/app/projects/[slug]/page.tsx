import { notFound } from "next/navigation";
import { ContextualLinks } from "@/components/sections/ContextualLinks";
import { CTABand } from "@/components/sections/CTABand";
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
        <p className="mt-6 max-w-3xl text-lg text-ink-muted leading-relaxed">
          {project.description}
        </p>
        {project.externalUrl && (
          <div className="mt-8">
            <Button href={project.externalUrl} external>
              Visit {project.title}
            </Button>
          </div>
        )}
      </Section>

      <Section variant="muted" className="!py-12">
        <h2 className="text-2xl font-semibold text-ink">Highlights</h2>
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
      </Section>

      {slug === "cfbverdict" && (
        <Section>
          <h2 className="text-2xl font-semibold text-ink">Why this matters</h2>
          <p className="mt-4 max-w-3xl text-ink-muted leading-relaxed">
            CFBVerdict is not just a side project—it is proof that Crimson Technology
            can take a product from concept to production. The same discipline we
            bring to vendor evaluations and CX transformations applies to building
            digital products: clear strategy, solid architecture, and execution that
            works in the real world.
          </p>
        </Section>
      )}

      <ContextualLinks research={relatedResearch} />

      <CTABand
        title="Have a project in mind?"
        description="Whether you need advisory guidance or hands-on digital product development, we can help."
      />
    </>
  );
}
