import Link from "next/link";
import { notFound } from "next/navigation";
import { ResearchArticle } from "@/components/research/ResearchArticle";
import {
  ResearchNavigation,
  TopicBreadcrumb,
} from "@/components/research/navigation";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ContextualLinks } from "@/components/sections/ContextualLinks";
import { CTABand } from "@/components/sections/CTABand";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  getResearch,
  getResearchHubPath,
  research,
  researchTypeLabels,
} from "@/content/research";
import {
  getIndustriesForResearch,
  getSolutionsForResearch,
} from "@/lib/relationships";
import {
  getContinueReading,
  getLearningPathContext,
  getRelatedTopics,
  getSeeAlso,
  getTopicBreadcrumb,
} from "@/lib/topic-graph";
import { createMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return research.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = getResearch(slug);
  if (!item) return {};

  return createMetadata({
    title: item.title,
    description: item.excerpt,
    path: `/research/${slug}`,
  });
}

export default async function ResearchDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getResearch(slug);
  if (!item) notFound();

  const relatedSolutions = getSolutionsForResearch(item);
  const relatedIndustries = getIndustriesForResearch(item);
  const breadcrumb = getTopicBreadcrumb(item);
  const learningPath = getLearningPathContext(item.slug);
  const continueReading = getContinueReading(item);
  const relatedTopics = getRelatedTopics(item, 3);
  const seeAlso = getSeeAlso(item, 3);

  const date = new Date(item.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Section className="!pb-10 md:!pb-12">
        <div className="flex flex-col gap-4">
          <Link
            href={getResearchHubPath(item.type)}
            className="text-sm font-medium text-crimson hover:text-crimson-dark"
          >
            ← {researchTypeLabels[item.type]}
          </Link>
          <TopicBreadcrumb items={breadcrumb} />
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold uppercase tracking-wider text-crimson">
            {researchTypeLabels[item.type]}
          </span>
          <span className="text-sm text-ink-muted">{item.category}</span>
          {item.libraryCategory ? (
            <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-ink-muted">
              {item.libraryCategory}
            </span>
          ) : null}
          <span className="text-sm text-ink-muted">{date}</span>
        </div>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {item.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-ink-muted leading-relaxed">
          {item.excerpt}
        </p>
      </Section>

      <ResearchArticle
        content={item.content}
        currentSlug={item.slug}
        executiveResource={item.executiveResource}
      />

      {item.relatedTools && item.relatedTools.length > 0 ? (
        <Section className="!py-10 md:!py-12">
          <Container>
            <RelatedTools items={item.relatedTools} />
          </Container>
        </Section>
      ) : null}

      <ResearchNavigation
        current={item}
        learningPath={learningPath}
        continueReading={continueReading}
        relatedTopics={relatedTopics}
        seeAlso={seeAlso}
      />

      <ContextualLinks solutions={relatedSolutions} industries={relatedIndustries} />

      <CTABand />
    </>
  );
}
