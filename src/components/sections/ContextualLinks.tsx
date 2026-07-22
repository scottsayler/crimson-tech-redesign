import Link from "next/link";
import { ResearchCard } from "@/components/sections/ResearchCard";
import { Section } from "@/components/ui/Section";
import type { Industry } from "@/content/industries";
import type { Project } from "@/content/projects";
import type { Research } from "@/content/research";
import type { Solution } from "@/content/solutions";
import type { Tool } from "@/content/tools";
import { ToolCard } from "@/components/tools/ToolCard";

type SectionVariant = "default" | "muted";

type ContextualLinksProps = {
  research?: Research[];
  solutions?: Solution[];
  industries?: Industry[];
  projects?: Project[];
  tools?: Tool[];
};

function sectionVariant(index: number): SectionVariant {
  return index % 2 === 0 ? "muted" : "default";
}

export function RelatedResearchSection({
  items,
  variant = "muted",
  showViewAll = true,
  title = "Related research",
  description = "Explore guides, frameworks, and analysis connected to this topic.",
}: {
  items: Research[];
  variant?: SectionVariant;
  showViewAll?: boolean;
  title?: string;
  description?: string;
}) {
  if (items.length === 0) return null;

  return (
    <Section variant={variant}>
      <h2 className="text-2xl font-semibold text-ink">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm text-ink-muted leading-relaxed">
        {description}
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ResearchCard key={item.slug} item={item} />
        ))}
      </div>
      {showViewAll ? (
        <Link
          href="/research"
          className="mt-6 inline-block text-sm font-medium text-crimson hover:text-crimson-dark"
        >
          View all research →
        </Link>
      ) : null}
    </Section>
  );
}

export function RelatedSolutionsSection({
  items,
  variant = "default",
  showViewAll = true,
  title = "Related solutions",
  description = "Advisory capabilities connected to this topic.",
}: {
  items: Solution[];
  variant?: SectionVariant;
  showViewAll?: boolean;
  title?: string;
  description?: string;
}) {
  if (items.length === 0) return null;

  return (
    <Section variant={variant}>
      <h2 className="text-2xl font-semibold text-ink">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm text-ink-muted leading-relaxed">
        {description}
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((solution) => (
          <Link
            key={solution.slug}
            href={`/solutions/${solution.slug}`}
            className="rounded-lg border border-stone-200 p-5 transition-colors hover:border-crimson/30"
          >
            <h3 className="font-semibold text-ink">{solution.title}</h3>
            <p className="mt-1 text-sm text-ink-muted">{solution.shortDescription}</p>
          </Link>
        ))}
      </div>
      {showViewAll ? (
        <Link
          href="/solutions"
          className="mt-6 inline-block text-sm font-medium text-crimson hover:text-crimson-dark"
        >
          View all solutions →
        </Link>
      ) : null}
    </Section>
  );
}

export function RelatedIndustriesSection({
  items,
  variant = "muted",
  showViewAll = true,
}: {
  items: Industry[];
  variant?: SectionVariant;
  showViewAll?: boolean;
}) {
  if (items.length === 0) return null;

  return (
    <Section variant={variant}>
      <h2 className="text-2xl font-semibold text-ink">Related industries</h2>
      <p className="mt-2 max-w-2xl text-sm text-ink-muted leading-relaxed">
        Sector-specific context for this topic.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((industry) => (
          <Link
            key={industry.slug}
            href={`/industries/${industry.slug}`}
            className="rounded-lg border border-stone-200 p-5 transition-colors hover:border-crimson/30"
          >
            <h3 className="font-semibold text-ink">{industry.title}</h3>
            <p className="mt-1 text-sm text-ink-muted">{industry.shortDescription}</p>
          </Link>
        ))}
      </div>
      {showViewAll ? (
        <Link
          href="/industries"
          className="mt-6 inline-block text-sm font-medium text-crimson hover:text-crimson-dark"
        >
          View all industries →
        </Link>
      ) : null}
    </Section>
  );
}

export function RelatedProjectsSection({
  items,
  variant = "default",
  showViewAll = true,
  title = "Related engagements",
  description = "Advisory and delivery work connected to this topic.",
}: {
  items: Project[];
  variant?: SectionVariant;
  showViewAll?: boolean;
  title?: string;
  description?: string;
}) {
  if (items.length === 0) return null;

  return (
    <Section variant={variant}>
      <h2 className="text-2xl font-semibold text-ink">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm text-ink-muted leading-relaxed">
        {description}
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="rounded-lg border border-stone-200 p-5 transition-colors hover:border-crimson/30"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-ink-muted">
              {project.category}
            </p>
            <h3 className="mt-2 font-semibold text-ink">{project.title}</h3>
            <p className="mt-1 text-sm text-ink-muted">{project.shortDescription}</p>
          </Link>
        ))}
      </div>
      {showViewAll ? (
        <Link
          href="/projects"
          className="mt-6 inline-block text-sm font-medium text-crimson hover:text-crimson-dark"
        >
          View all projects →
        </Link>
      ) : null}
    </Section>
  );
}

export function RelatedToolsSection({
  items,
  variant = "muted",
  showViewAll = true,
  title = "Decision Center resources",
  description = "Assessments and calculators connected to this topic.",
}: {
  items: Tool[];
  variant?: SectionVariant;
  showViewAll?: boolean;
  title?: string;
  description?: string;
}) {
  if (items.length === 0) return null;

  return (
    <Section variant={variant}>
      <h2 className="text-2xl font-semibold text-ink">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm text-ink-muted leading-relaxed">
        {description}
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {items.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
      {showViewAll ? (
        <Link
          href="/decision-center"
          className="mt-6 inline-block text-sm font-medium text-crimson hover:text-crimson-dark"
        >
          View Decision Center →
        </Link>
      ) : null}
    </Section>
  );
}

export function ContextualLinks({
  research: researchItems = [],
  solutions = [],
  industries = [],
  projects = [],
  tools = [],
}: ContextualLinksProps) {
  const sections = [];

  if (researchItems.length > 0) sections.push({ type: "research" as const, items: researchItems });
  if (tools.length > 0) sections.push({ type: "tools" as const, items: tools });
  if (projects.length > 0) sections.push({ type: "projects" as const, items: projects });
  if (solutions.length > 0) sections.push({ type: "solutions" as const, items: solutions });
  if (industries.length > 0) sections.push({ type: "industries" as const, items: industries });

  if (sections.length === 0) return null;

  return (
    <>
      {sections.map((section, index) => {
        const variant = sectionVariant(index);

        if (section.type === "research") {
          return (
            <RelatedResearchSection
              key="research"
              items={section.items}
              variant={variant}
            />
          );
        }

        if (section.type === "tools") {
          return (
            <RelatedToolsSection
              key="tools"
              items={section.items}
              variant={variant}
            />
          );
        }

        if (section.type === "projects") {
          return (
            <RelatedProjectsSection
              key="projects"
              items={section.items}
              variant={variant}
            />
          );
        }

        if (section.type === "solutions") {
          return (
            <RelatedSolutionsSection
              key="solutions"
              items={section.items}
              variant={variant}
            />
          );
        }

        return (
          <RelatedIndustriesSection
            key="industries"
            items={section.items}
            variant={variant}
          />
        );
      })}
    </>
  );
}
