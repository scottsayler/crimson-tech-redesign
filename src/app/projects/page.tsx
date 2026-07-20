import { CTABand } from "@/components/sections/CTABand";
import { ContextualLinks } from "@/components/sections/ContextualLinks";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects } from "@/content/projects";
import { getFeaturedResearch } from "@/lib/relationships";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Projects",
  description:
    "UCaaS evaluations, contact center migrations, AI deployments, and CFBVerdict—a product we built ourselves.",
  path: "/projects",
});

const categories = [
  "Advisory Engagements",
  "CX Transformation",
  "Financial Services",
  "AI & Workflow",
  "Digital Experiences",
];

export default function ProjectsPage() {
  const featuredResearch = getFeaturedResearch(3);

  return (
    <>
      <Section className="!pb-12">
        <SectionHeader
          as="h1"
          eyebrow="Projects"
          title="Work we've done"
          description="Vendor evaluations, contact center migrations, AI deployments, and a product we built ourselves."
        />
      </Section>

      <Section variant="muted" className="!py-8">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-ink-muted"
            >
              {cat}
            </span>
          ))}
        </div>
      </Section>

      <Section className="!pt-8">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <ContextualLinks research={featuredResearch} />

      <CTABand />
    </>
  );
}
