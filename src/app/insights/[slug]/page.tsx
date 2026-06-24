import Link from "next/link";
import { notFound } from "next/navigation";
import { CTABand } from "@/components/sections/CTABand";
import { Section } from "@/components/ui/Section";
import { getInsight, insights } from "@/content/insights";
import { createMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};

  return createMetadata({
    title: insight.title,
    description: insight.excerpt,
    path: `/insights/${slug}`,
  });
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const date = new Date(insight.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Section className="!pb-8">
        <Link
          href="/insights"
          className="text-sm font-medium text-crimson hover:text-crimson-dark"
        >
          ← All insights
        </Link>
        <div className="mt-6 flex items-center gap-3">
          <span className="text-sm font-semibold uppercase tracking-wider text-crimson">
            {insight.category}
          </span>
          <span className="text-sm text-ink-muted">{date}</span>
        </div>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {insight.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-ink-muted leading-relaxed">
          {insight.excerpt}
        </p>
      </Section>

      <Section variant="muted" className="!py-12">
        <article className="prose mx-auto max-w-3xl">
          {insight.content.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </article>
      </Section>

      <CTABand />
    </>
  );
}
