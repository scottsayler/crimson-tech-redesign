import { notFound } from "next/navigation";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getTool, tools } from "@/content/tools";
import { createMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};

  return createMetadata({
    title: tool.title,
    description: tool.description,
    path: `/tools/${slug}`,
  });
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  return <ToolPageLayout tool={tool} />;
}
