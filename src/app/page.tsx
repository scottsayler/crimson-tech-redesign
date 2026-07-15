import Link from "next/link";
import { AdvisorProse } from "@/components/sections/AdvisorProse";
import { CredibilityBar } from "@/components/sections/CredibilityBar";
import { CTABand } from "@/components/sections/CTABand";
import { PrincipalAdvisor } from "@/components/sections/PrincipalAdvisor";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ResearchCard } from "@/components/sections/ResearchCard";
import { AssessmentCard } from "@/components/decision-center/AssessmentCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { engagementFunding, independencePrimaryStatement, independenceProof } from "@/content/credibility";
import { getFeaturedIndustries } from "@/content/industries";
import {
  evaluationAreas,
  independencePrinciples,
  recentWork,
} from "@/content/home";
import { getFeaturedResearch } from "@/lib/relationships";
import { getFeaturedDecisionCenterAssessments } from "@/content/decision-center";

const heroProse = {
  observation:
    "Organizations often evaluate connectivity, UCaaS, CCaaS, AI, and contact center platforms under fixed renewal timelines.",
  whyItMatters:
    "Integration and contract details discovered after signature are costly to change.",
  recommendation:
    "Define requirements and test finalists against your environment before you commit.",
};

const philosophyProse = {
  observation:
    "Technology decisions rarely fail because the selected platform lacks features.",
  whyItMatters:
    "They fail at handoffs—between contact center and branch, CRM and telephony, AI pilot and agent desktop.",
  recommendation:
    "Map those handoffs before you shortlist vendors.",
};

const crimsonCxProse = {
  observation:
    "Banks and credit unions evaluate CCaaS and contact center AI while managing compliance review and live service operations.",
  whyItMatters:
    "Integration and recording requirements that are not validated early can delay production rollout.",
  recommendation:
    "Use Crimson CX when you need evaluation support built for financial services constraints.",
};

const crimsonCxEvaluations = [
  "CCaaS renewal fit against current call volume and integration needs",
  "CRM and core banking integration tested on real call flows",
  "AI capabilities validated for production compliance approval",
  "WFM and scheduling scope defined before contract execution",
];

export default function HomePage() {
  const featuredResearch = getFeaturedResearch(3);
  const featuredIndustries = getFeaturedIndustries();
  const featuredAssessments = getFeaturedDecisionCenterAssessments();

  return (
    <>
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f4_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <Container className="relative">
          <p className="text-sm font-semibold uppercase tracking-wider text-crimson">
            Independent Technology Advisory
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-ink md:text-5xl lg:text-6xl">
            What technology decisions can we help you make?
          </h1>
          <AdvisorProse
            prose={heroProse}
            className="mt-6 max-w-3xl text-lg md:text-xl"
          />
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact">Schedule a Conversation</Button>
            <Button href="/solutions" variant="outline">
              Explore Services
            </Button>
          </div>
        </Container>
      </section>

      <CredibilityBar />

      <Section>
        <SectionHeader
          title="What we help organizations evaluate"
          description="Platform renewals, vendor selections, and migrations where integration fit matters as much as features."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {evaluationAreas.map((area) => (
            <Link
              key={area.title}
              href={area.href}
              className="group flex flex-col rounded-lg border border-stone-200 bg-white p-6 transition-all hover:border-crimson/30 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-ink group-hover:text-crimson">
                {area.title}
              </h3>
              <AdvisorProse
                prose={area.prose}
                compact
                className="mt-3 flex-1 text-sm"
              />
              <span className="mt-4 text-sm font-medium text-crimson">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section variant="dark">
        <div className="mx-auto max-w-3xl text-center">
          <AdvisorProse
            prose={philosophyProse}
            className="text-lg text-stone-300 md:text-xl [&_p:last-child]:text-crimson-200"
          />
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeader
          eyebrow="Proof"
          title="Recent work"
          description="Evaluations, migrations, and builds from active client engagements."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentWork.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex flex-col rounded-lg border border-stone-200 bg-white p-6 transition-all hover:border-crimson/30 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-ink group-hover:text-crimson">
                {item.title}
              </h3>
              <AdvisorProse
                prose={item.prose}
                compact
                className="mt-2 flex-1 text-sm"
              />
              <span className="mt-4 text-sm font-medium text-crimson">
                View →
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/projects"
            className="text-sm font-medium text-crimson hover:text-crimson-dark"
          >
            View all projects →
          </Link>
        </div>
      </Section>

      <Section>
        <PrincipalAdvisor />
      </Section>

      <Section variant="crimson">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-crimson">
              Practice Area · Crimson Technology
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Crimson CX
            </h2>
            <AdvisorProse prose={crimsonCxProse} className="mt-4" />
          </div>
          <div className="rounded-lg border border-crimson/20 bg-white p-6">
            <p className="text-sm font-semibold text-ink">Common evaluations:</p>
            <ul className="mt-4 space-y-2">
              {crimsonCxEvaluations.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-ink-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                  {item}
                </li>
              ))}
            </ul>
            <Button href="/crimson-cx" className="mt-6">
              Explore Crimson CX
            </Button>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          title="How we work"
          description="Four stages with documented deliverables at each one."
          align="center"
        />
        <ProcessSteps detailed />
      </Section>

      <Section variant="muted">
        <SectionHeader
          title="Independent evaluation"
          description={independencePrimaryStatement}
          align="center"
        />
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-ink-muted">
          Requirements are documented before vendors are evaluated. Recommendations
          follow a transparent methodology—and engagement funding is disclosed up front.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {independencePrinciples.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-stone-200 bg-white p-6"
            >
              <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
              <AdvisorProse
                prose={item.prose}
                compact
                className="mt-2 text-sm"
              />
            </div>
          ))}
        </div>
        <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
          {independenceProof.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-ink-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-ink-muted">
          {engagementFunding}
        </p>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Industries"
          title="Where we've done this before"
          description="Same evaluation discipline across sectors with different compliance rules and operating constraints."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {featuredIndustries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group rounded-lg border border-stone-200 bg-white p-6 transition-all hover:border-crimson/30 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-ink group-hover:text-crimson">
                {industry.title}
              </h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                {industry.shortDescription}
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-crimson">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/industries"
            className="text-sm font-medium text-crimson hover:text-crimson-dark"
          >
            View all industries →
          </Link>
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeader
          eyebrow="Insights"
          title="What we've learned from these evaluations"
          description="Buying guides and checklists written after running the evaluations."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredResearch.map((item) => (
            <ResearchCard key={item.slug} item={item} />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button href="/research">Explore Insights</Button>
          <Link
            href="/tools"
            className="text-sm font-medium text-crimson hover:text-crimson-dark"
          >
            Technology Decision Center →
          </Link>
        </div>
      </Section>

      {featuredAssessments.length > 0 ? (
        <Section>
          <SectionHeader
            eyebrow="Decision Center"
            title="Understand your environment before evaluating vendors"
            description="Assessments identify operational friction and modernization priorities—the starting point for better technology decisions."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {featuredAssessments.map((assessment) => (
              <AssessmentCard key={assessment.slug} assessment={assessment} featured />
            ))}
          </div>
          <div className="mt-8">
            <Button href="/decision-center">Explore Decision Center</Button>
          </div>
        </Section>
      ) : null}

      <CTABand
        title="Evaluating a platform, renewal, or migration?"
        description="Share your timeline, finalists, and constraints. Scott responds personally."
        primaryLabel="Schedule a Conversation"
        primaryHref="/contact"
        secondaryLabel="Explore Services"
        secondaryHref="/solutions"
      />
    </>
  );
}
