import type { AdvisorProse } from "./prose";

export type EvaluationArea = {
  title: string;
  prose: AdvisorProse;
  href: string;
};

export type RecentWorkItem = {
  title: string;
  prose: AdvisorProse;
  href: string;
  external?: boolean;
};

export const evaluationAreas: EvaluationArea[] = [
  {
    title: "Connectivity & Internet",
    prose: {
      observation:
        "In multi-site environments, we often find circuits billed at closed locations and failover paths that have not been tested under peak load.",
      whyItMatters:
        "Untested failover and unclear inventory increase outage duration and make renewal negotiations harder to control.",
      recommendation:
        "Run a circuit inventory and failover test plan before selecting carriers or redesigning site connectivity.",
    },
    href: "/solutions/connectivity-infrastructure",
  },
  {
    title: "Voice & UCaaS",
    prose: {
      observation:
        "UCaaS evaluations commonly progress while PBX end-of-life dates are fixed and Teams voice is only partially deployed.",
      whyItMatters:
        "Delayed decisions compress migration windows and increase cutover risk for call routing and integrations.",
      recommendation:
        "Define call-flow and integration requirements first, then evaluate platforms against those scenarios.",
    },
    href: "/solutions/communications-collaboration",
  },
  {
    title: "Contact Centers",
    prose: {
      observation:
        "Contact center teams frequently manage rising handle times with legacy ACD tools while CCaaS pilots run in parallel.",
      whyItMatters:
        "Running dual environments adds cost and keeps agents on fragmented desktops that slow service delivery.",
      recommendation:
        "Document operational pain points, shortlist CCaaS options by agent desktop fit, and plan phased migration windows.",
    },
    href: "/solutions/communications-collaboration",
  },
  {
    title: "AI & Automation",
    prose: {
      observation:
        "Most organizations we assess have multiple AI pilots, but governance and production workflow design are still maturing.",
      whyItMatters:
        "Without clear prioritization, AI investment grows faster than measurable operational improvement.",
      recommendation:
        "Select one production-ready use case, establish approval criteria, and deploy it before expanding scope.",
    },
    href: "/solutions/ai-workflow-automation",
  },
  {
    title: "Cloud Infrastructure",
    prose: {
      observation:
        "SD-WAN and managed network proposals often look complete on paper while production sites still rely on single-path connectivity.",
      whyItMatters:
        "Architecture gaps show up as recurring site outages and higher long-term network operating effort.",
      recommendation:
        "Map production traffic flows first, then compare SD-WAN and managed service options against tested redundancy needs.",
    },
    href: "/solutions/connectivity-infrastructure",
  },
  {
    title: "Customer Experience",
    prose: {
      observation:
        "Customers often restart conversations across channels because branch, digital, and contact center teams do not share context.",
      whyItMatters:
        "Repeated interactions increase handle time and reduce confidence in service quality.",
      recommendation:
        "Fix the top three handoff failures, then choose CX technology that supports those specific workflow changes.",
    },
    href: "/solutions/customer-experience",
  },
];

export const recentWork: RecentWorkItem[] = [
  {
    title: "Banking AI Advisory",
    prose: {
      observation:
        "A credit union had four AI initiatives in motion, but none met compliance criteria for production deployment.",
      whyItMatters:
        "Continued pilot expansion would increase cost without improving agent or member outcomes.",
      recommendation:
        "Prioritize contact center transcription and workflow automation with a governance model approved by leadership.",
    },
    href: "/crimson-cx",
  },
  {
    title: "Contact Center Modernization",
    prose: {
      observation:
        "A legacy ACD and disconnected WFM tools were driving agent desktop complexity during an active CCaaS evaluation.",
      whyItMatters:
        "Without a phased plan, migration risk would have disrupted service during peak periods.",
      recommendation:
        "Use operational fit scoring to reduce the vendor list and execute a phased cutover schedule.",
    },
    href: "/projects/contact-center-transformation",
  },
  {
    title: "Technology Vendor Evaluation",
    prose: {
      observation:
        "A multi-location operator had three UCaaS proposals and misaligned priorities between IT and operations.",
      whyItMatters:
        "A renewal deadline was approaching without a decision framework both teams supported.",
      recommendation:
        "Adopt a shared scoring matrix and select the platform with the strongest integration fit.",
    },
    href: "/projects/vendor-evaluation-advisory",
  },
  {
    title: "Restaurant Technology Research",
    prose: {
      observation:
        "Operators repeatedly asked for practical guidance on outage cost, POTS replacement timing, and carrier contract terms.",
      whyItMatters:
        "Without shared decision tools, each location made network choices inconsistently.",
      recommendation:
        "Use published calculators and checklists to standardize store network and POTS replacement decisions.",
    },
    href: "/industries/restaurants",
  },
  {
    title: "Digital Products",
    prose: {
      observation:
        "Clients needed proof that advisory recommendations could be translated into working software, not only strategy documents.",
      whyItMatters:
        "Execution credibility is critical when platform and product decisions have long implementation timelines.",
      recommendation:
        "Build and operate a production platform using the same architecture discipline applied in client evaluations.",
    },
    href: "/solutions/digital-products",
  },
  {
    title: "CFBVerdict",
    prose: {
      observation:
        "CFBVerdict was built as a live product to demonstrate end-to-end delivery capability.",
      whyItMatters:
        "A running platform provides clearer evidence of execution than advisory deliverables alone.",
      recommendation:
        "Review CFBVerdict as a reference for how we approach architecture, delivery, and production operations.",
    },
    href: "/projects/cfbverdict",
    external: false,
  },
];

export const independencePrinciples = [
  {
    title: "No vendor commissions",
    prose: {
      observation:
        "Some technology recommendations are influenced by reseller incentives rather than client requirements.",
      whyItMatters:
        "Incentive-driven advice can skew platform selection and create avoidable long-term operating cost.",
      recommendation:
        "Work with an advisor who documents decision criteria and has no commission tied to your final platform choice.",
    },
  },
  {
    title: "Test beyond the demo",
    prose: {
      observation:
        "Platform demos are designed to show ideal conditions and may not reflect your integration and compliance environment.",
      whyItMatters:
        "Production performance depends on real call flows, data policies, and system integrations.",
      recommendation:
        "Require scenario-based demos and reference checks before shortlisting finalists.",
    },
  },
  {
    title: "Requirements before vendors",
    prose: {
      observation:
        "Evaluations move faster when teams begin vendor meetings before requirements are agreed internally.",
      whyItMatters:
        "Early vendor influence can narrow options before operational needs are fully defined.",
      recommendation:
        "Finalize requirements and scoring criteria before the first finalist demo.",
    },
  },
  {
    title: "Plan for production scale",
    prose: {
      observation:
        "Pilot success with a small user group does not always translate to full operational scale.",
      whyItMatters:
        "Capacity, workflow, and support requirements change significantly at production volume.",
      recommendation:
        "Build go-live and adoption plans for full scale, not pilot conditions only.",
    },
  },
];
