export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  helpsWith: string[];
  typicalSituations: string[];
};

export const services: Service[] = [
  {
    slug: "technology-advisory",
    title: "Technology Advisory",
    shortDescription:
      "Evaluate technology strategies, vendors, and modernization initiatives with an independent view.",
    description:
      "Major technology decisions stall when stakeholders disagree, vendors oversell, and internal teams lack a shared decision framework. We help you structure the evaluation, align leadership, and move to a defensible decision.",
    helpsWith: [
      "Technology strategy and roadmap development",
      "Vendor evaluation and selection frameworks",
      "Executive alignment and decision facilitation",
      "Build vs. buy analysis",
      "Renewal and contract negotiation support",
    ],
    typicalSituations: [
      "A platform renewal is approaching and you want to avoid repeating past mistakes",
      "Leadership is divided on which technology direction to pursue",
      "You need an independent voice in a crowded vendor evaluation",
    ],
  },
  {
    slug: "connectivity-infrastructure",
    title: "Connectivity & Infrastructure",
    shortDescription:
      "Network modernization, carrier evaluation, cloud connectivity, and resilience planning.",
    description:
      "Reliable connectivity is the foundation of every modern operation. We help organizations evaluate carriers, design redundant architectures, and modernize infrastructure without overbuilding or underplanning.",
    helpsWith: [
      "Network modernization and architecture review",
      "Carrier and connectivity evaluation",
      "Cloud connectivity and hybrid infrastructure",
      "Redundancy and disaster recovery planning",
      "Communications infrastructure assessment",
    ],
    typicalSituations: [
      "You're consolidating locations and need a connectivity strategy",
      "Carrier contracts are up for renewal and options feel overwhelming",
      "Infrastructure gaps are causing operational friction",
    ],
  },
  {
    slug: "communications-collaboration",
    title: "Communications & Collaboration",
    shortDescription:
      "UCaaS, CCaaS, Teams, and contact center modernization—chosen for fit, not hype.",
    description:
      "Communications platforms touch every customer and employee interaction. We help you cut through vendor demos and marketing to select platforms that fit your operations, team, and customers.",
    helpsWith: [
      "UCaaS and CCaaS evaluation and selection",
      "Contact center modernization",
      "Microsoft Teams strategy and deployment",
      "Workforce optimization and WEM",
      "Integration planning and vendor negotiation",
    ],
    typicalSituations: [
      "You're migrating from on-premise telephony to cloud communications",
      "Contact center technology is outdated and hurting customer experience",
      "Vendor demos all look great but you need to see what works in production",
    ],
  },
  {
    slug: "ai-workflow-automation",
    title: "AI & Workflow Automation",
    shortDescription:
      "Practical AI adoption, governance, and automation that reaches production.",
    description:
      "AI pilots fail when governance, workflow design, and operational readiness are afterthoughts. We help you identify high-value use cases, design workflows, and build adoption paths that stick.",
    helpsWith: [
      "AI readiness assessment and use case prioritization",
      "Workflow automation design and implementation",
      "AI governance and operational readiness",
      "Process improvement and bottleneck analysis",
      "Moving pilots from proof-of-concept to production",
    ],
    typicalSituations: [
      "Leadership wants AI results but pilots aren't scaling",
      "Manual workflows are creating bottlenecks across departments",
      "You need a practical framework for AI adoption, not more hype",
    ],
  },
  {
    slug: "customer-experience",
    title: "Customer Experience",
    shortDescription:
      "Journey analysis, friction removal, and service modernization.",
    description:
      "Customer experience breaks down when systems, processes, and channels don't connect. We help identify friction points, design better journeys, and align technology with the experience your customers expect.",
    helpsWith: [
      "Customer journey mapping and friction analysis",
      "Service modernization planning",
      "Contact center transformation",
      "Omnichannel strategy and channel integration",
      "Operational metrics and visibility improvement",
    ],
    typicalSituations: [
      "Customers report inconsistent experiences across channels",
      "Contact center operations are strained and metrics are declining",
      "You know CX needs improvement but don't know where to start",
    ],
  },
  {
    slug: "digital-products",
    title: "Digital Products",
    shortDescription:
      "Websites, applications, and customer-facing platforms built to perform.",
    description:
      "From customer-facing websites to data platforms, we design and build digital experiences with the same rigor we bring to advisory work. Strategy, architecture, and execution in one accountable partner.",
    helpsWith: [
      "Website and application development",
      "Analytics and data platform design",
      "Customer-facing digital experience design",
      "Product strategy and technical architecture",
      "End-to-end digital product execution",
    ],
    typicalSituations: [
      "You need a new digital product built, not just advised on",
      "An existing platform needs modernization or redesign",
      "You want proof that your advisory partner can also execute",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
