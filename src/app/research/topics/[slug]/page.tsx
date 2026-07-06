import Link from "next/link";
import { notFound } from "next/navigation";
import { LearningPathNav } from "@/components/research/navigation/LearningPathNav";
import { TopicClusterLibrary } from "@/components/research/navigation/TopicClusterLibrary";
import { RelatedTools } from "@/components/tools/RelatedTools";
import {
  RelatedIndustriesSection,
  RelatedSolutionsSection,
} from "@/components/sections/ContextualLinks";
import { CTABand } from "@/components/sections/CTABand";
import { Section } from "@/components/ui/Section";
import { getTopicCluster, topicClusters } from "@/content/topic-clusters";
import { getIndustry } from "@/content/industries";
import { getProject } from "@/content/projects";
import { getSolution } from "@/content/solutions";
import { getLearningPath } from "@/content/learning-paths";
import {
  getTopicClusterArticles,
  getTopicClusterTools,
} from "@/lib/topic-clusters";
import { createMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return topicClusters.map((cluster) => ({ slug: cluster.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const cluster = getTopicCluster(slug);
  if (!cluster) return {};

  return createMetadata({
    title: cluster.title,
    description: cluster.description,
    path: `/research/topics/${slug}`,
  });
}

export default async function TopicClusterPage({ params }: Props) {
  const { slug } = await params;
  const cluster = getTopicCluster(slug);
  if (!cluster) notFound();

  const relatedSolutions = cluster.relatedSolutions
    .map((solutionSlug) => getSolution(solutionSlug))
    .filter((solution): solution is NonNullable<typeof solution> => Boolean(solution));

  const relatedIndustries = cluster.relatedIndustries
    .map((industrySlug) => getIndustry(industrySlug))
    .filter((industry): industry is NonNullable<typeof industry> => Boolean(industry));

  const relatedProjects = cluster.relatedProjects
    .map((projectSlug) => getProject(projectSlug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  const tools = getTopicClusterTools(cluster.slug);
  const toolLinks = tools.map((tool) => ({
    slug: tool.slug,
    label: tool.title,
  }));

  const learningPath = cluster.learningPathSlug
    ? getLearningPath(cluster.learningPathSlug)
    : undefined;

  const firstArticleSlug = getTopicClusterArticles(cluster.slug)[0]?.slug;
  const pathContext =
    learningPath && firstArticleSlug
      ? {
          path: learningPath,
          currentIndex: 0,
          currentStep: learningPath.steps[0],
          nextSteps: learningPath.steps.slice(1, 3),
        }
      : undefined;

  return (
    <>
      <Section className="!pb-10 md:!pb-12">
        <Link
          href="/research/topics"
          className="text-sm font-medium text-crimson hover:text-crimson-dark"
        >
          ← Decision areas
        </Link>
        <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-crimson">
          Decision area
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {cluster.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-muted">
          {cluster.description}
        </p>
      </Section>

      {pathContext ? (
        <Section variant="muted" className="!py-12 md:!py-16">
          <LearningPathNav
            context={pathContext}
            currentSlug={firstArticleSlug ?? ""}
          />
        </Section>
      ) : null}

      <TopicClusterLibrary clusterSlug={cluster.slug} variant="default" />

      {toolLinks.length > 0 ? (
        <Section className="!py-10 md:!py-12">
          <RelatedTools items={toolLinks} />
        </Section>
      ) : null}

      {relatedProjects.length > 0 ? (
        <Section variant="muted">
          <h2 className="text-2xl font-semibold text-ink">Related engagements</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
            Advisory and delivery work connected to this decision area.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {relatedProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="rounded-lg border border-stone-200 bg-white p-5 transition-colors hover:border-crimson/30"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-ink-muted">
                  {project.category}
                </p>
                <h3 className="mt-2 font-semibold text-ink">{project.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{project.shortDescription}</p>
              </Link>
            ))}
          </div>
          <Link
            href="/projects"
            className="mt-6 inline-block text-sm font-medium text-crimson hover:text-crimson-dark"
          >
            View all projects →
          </Link>
        </Section>
      ) : null}

      <RelatedSolutionsSection items={relatedSolutions} variant="default" />
      <RelatedIndustriesSection items={relatedIndustries} variant="muted" />

      <CTABand />
    </>
  );
}
