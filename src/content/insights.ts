export type Insight = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string[];
};

export const insights: Insight[] = [
  {
    slug: "ccaas-vendor-checklist",
    title: "6 Question Checklist for Choosing a CCaaS Vendor",
    date: "2025-09-29",
    category: "Communications",
    excerpt:
      "Selecting the right CCaaS partner requires more than a polished demo. Use this checklist to evaluate vendors on what actually matters.",
    content: [
      "In 2025, the decision around contact center technology is more complex than ever. Vendors promise AI, omnichannel, and seamless integrations—but demos rarely reflect production reality.",
      "Before you engage vendors, define your must-haves: integration requirements, agent experience needs, reporting capabilities, and scalability constraints. These become your evaluation criteria, not vendor talking points.",
      "Ask vendors to demonstrate your specific use cases, not their best-case scenarios. Request references from organizations similar to yours in size, industry, and complexity.",
      "Evaluate total cost of ownership, not just per-seat pricing. Implementation, training, integration, and ongoing support costs often exceed license fees.",
      "Assess the vendor's implementation methodology and timeline realism. Sales timelines and implementation timelines are rarely the same.",
      "Plan for adoption, not just deployment. Technology that agents and supervisors don't use is wasted investment.",
    ],
  },
  {
    slug: "ai-auto-summarization-contact-centers",
    title: "The Power of Auto-Summarization in Contact Centers",
    date: "2025-10-09",
    category: "AI & Automation",
    excerpt:
      "Auto-summarization is one of the most practical AI applications in contact centers—but only when workflow and governance are designed first.",
    content: [
      "Contact centers generate enormous volumes of interaction data. Auto-summarization promises to turn that data into actionable insight without burdening agents with after-call work.",
      "The technology works—but implementation requires more than flipping a switch. Workflow design, quality review processes, and integration with existing systems determine whether summarization delivers value or creates new problems.",
      "Start with a clear use case: reducing after-call work, improving supervisor review efficiency, or feeding CRM systems with structured interaction data. Each use case has different requirements.",
      "Governance matters. Who reviews summaries? How are errors caught? What happens when summarization misses critical details? Answer these before scaling.",
      "Measure impact on agent productivity, supervisor efficiency, and data quality—not just the fact that summarization is running.",
    ],
  },
  {
    slug: "ccaas-addon-vs-point-solution",
    title: "CCaaS Add-On vs. Point Solution: Choosing the Right Path",
    date: "2025-10-03",
    category: "Communications",
    excerpt:
      "When your CCaaS vendor offers an add-on versus a best-of-breed point solution, the decision isn't just technical—it's strategic.",
    content: [
      "CCaaS platforms increasingly bundle capabilities that were once standalone products: WEM, analytics, AI, workforce management. The convenience is real, but so are the tradeoffs.",
      "Add-ons offer integration simplicity and unified vendor relationships. Point solutions often deliver deeper capability in specific domains—but add integration complexity and vendor management overhead.",
      "Evaluate based on your actual requirements, not vendor bundling incentives. A bundled WEM module may suffice for basic needs but fall short for complex workforce optimization.",
      "Consider your team's capacity to manage multiple vendors versus their need for best-in-class capability in specific areas.",
      "The right answer depends on your operational complexity, integration requirements, and internal technical capacity—not vendor marketing.",
    ],
  },
  {
    slug: "independent-technology-advisory",
    title: "Why Independent Technology Advisory Matters",
    date: "2025-11-15",
    category: "Advisory",
    excerpt:
      "When technology vendors fund the advice, the advice follows the incentive. Independent advisory puts your outcomes first.",
    content: [
      "Technology buying has never been more complex. More vendors, more platforms, more AI promises—and more ways to make expensive mistakes.",
      "Independent advisory means no platform bias. We don't earn commissions from vendors. Our only incentive is helping you make the right decision for your organization.",
      "That independence changes the conversation. Instead of asking which vendor to choose, we start with what problem you're actually trying to solve.",
      "We help you build evaluation frameworks, facilitate stakeholder alignment, and structure vendor engagements so you see real capability—not rehearsed demos.",
      "The result: decisions you can defend, implementations you can execute, and technology that actually fits.",
    ],
  },
  {
    slug: "sales-vs-implementation",
    title: "Don't Confuse Sales with Implementation",
    date: "2025-08-22",
    category: "Advisory",
    excerpt:
      "The team that sells you a platform is rarely the team that implements it. Plan for the gap.",
    content: [
      "Vendor sales teams are skilled at demonstrating capability. Implementation teams are skilled at deploying within constraints. These are different skills, different teams, and different timelines.",
      "What you see in a sales demo may not reflect what your implementation will look like. Custom integrations, data migration, training, and change management take time and expertise that sales presentations gloss over.",
      "Before signing, understand who will implement, what their track record looks like, and what the realistic timeline is—not the sales timeline.",
      "Build implementation requirements into your evaluation criteria. Ask for implementation references, not just product references.",
      "The best technology decision can still fail if implementation planning is an afterthought.",
    ],
  },
  {
    slug: "ccaas-trends-2025",
    title: "CCaaS Trends to Watch in 2025",
    date: "2025-09-24",
    category: "Communications",
    excerpt:
      "AI integration, composable architecture, and agent experience are reshaping contact center technology. Here's what matters for your evaluation.",
    content: [
      "Contact center technology is evolving faster than most organizations can evaluate. AI capabilities, composable architectures, and shifting agent experience expectations are changing what 'modern' means.",
      "AI is moving from novelty to operational requirement—but not all AI is created equal. Focus on AI that solves specific workflow problems, not AI that exists because competitors have it.",
      "Composable architecture lets organizations integrate best-of-breed capabilities without full platform replacement. Understand whether your CCaaS vendor supports this model.",
      "Agent experience is becoming a competitive differentiator. Technology that makes agents' jobs harder will fail regardless of feature count.",
      "Evaluation frameworks need to account for these trends without chasing every new capability. Start with operational requirements, then map technology to them.",
    ],
  },
];

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}
