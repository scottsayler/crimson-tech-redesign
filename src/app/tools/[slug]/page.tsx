import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getTool, tools } from "@/content/tools";
import {
  buildBreadcrumbList,
  buildFaqPage,
  buildSchemaGraph,
  buildWebApplication,
} from "@/lib/schema";
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

  const path = `/tools/${tool.slug}`;

  return (
    <>
      <JsonLd
        data={buildSchemaGraph([
          buildWebApplication({
            name: tool.title,
            description: tool.description,
            path,
            applicationCategory:
              tool.interactiveType === "assessment"
                ? "BusinessApplication"
                : "FinanceApplication",
          }),
          buildBreadcrumbList([
            { name: "Home", path: "/" },
            { name: "Decision Center", path: "/decision-center" },
            { name: tool.title, path },
          ]),
          buildFaqPage(tool.faqs),
        ])}
      />
      <ToolPageLayout tool={tool} />
    </>
  );
}
