import type {
  AssessmentChoice,
  AssessmentDefinition,
  AssessmentQuestion,
  AssessmentSection,
} from "@/lib/assessments/types";
import { networkAssessmentInsights } from "./network-assessment-insights";

function choices(
  one: string,
  two: string,
  three: string,
  four: string,
  five: string
): AssessmentChoice[] {
  return [
    { label: one, score: 0 },
    { label: two, score: 1 },
    { label: three, score: 2 },
    { label: four, score: 3 },
    { label: five, score: 4 },
  ];
}

function q(
  id: string,
  category: string,
  prompt: string,
  optionLabels: [string, string, string, string, string]
): AssessmentQuestion {
  return {
    id,
    category,
    prompt,
    choices: choices(...optionLabels),
    whyThisMatters: networkAssessmentInsights[id],
  };
}

export const networkAssessmentSections: AssessmentSection[] = [
  {
    id: "connectivity",
    label: "Connectivity & Resilience",
    description:
      "Primary circuits, backup paths, and tested recovery when ISP service fails during peak hours.",
    categoryIds: ["connectivity-reliability", "backup-resilience"],
  },
  {
    id: "monitoring",
    label: "Monitoring & Visibility",
    description:
      "Remote store visibility, outage detection speed, and historical performance data.",
    categoryIds: ["network-visibility"],
  },
  {
    id: "standardization",
    label: "Standardization",
    description:
      "Documented network standards, hardware consistency, and governance across locations.",
    categoryIds: ["standardization"],
  },
  {
    id: "security",
    label: "Security",
    description: "Traffic segmentation, firewall policy, PCI scope, and guest Wi-Fi isolation.",
    categoryIds: ["security"],
  },
  {
    id: "legacy-voice",
    label: "Legacy Voice & Documentation",
    description:
      "Circuit inventory, POTS line records, and life-safety system connectivity documentation.",
    categoryIds: ["documentation"],
  },
  {
    id: "operations",
    label: "Operations & Growth",
    description:
      "Alert routing, vendor governance, franchise alignment, and portfolio-scale deployment.",
    categoryIds: ["store-operations", "vendor-management", "growth-readiness"],
  },
];

const networkAssessmentQuestions: AssessmentQuestion[] = [
  q(
    "conn-rel-1",
    "connectivity-reliability",
    "How consistent are primary circuit type, speed, and SLA across your portfolio?",
    [
      "Every location uses different circuit types, speeds, and providers with no corporate standard",
      "Standards exist on paper but regions and franchisees routinely choose different implementations",
      "Most locations follow a preferred standard, but exceptions are common and untracked",
      "Corporate standard defines circuit tiers; exceptions require documented approval",
      "Portfolio-wide circuit standard with tiered options by store format and accountable ownership",
    ]
  ),
  q(
    "conn-rel-2",
    "connectivity-reliability",
    "What happens to POS and card processing when the primary circuit drops during peak service?",
    [
      "Registers and card payments stop immediately with no reliable offline procedure",
      "Outcomes vary by store—managers improvise and guest experience is unpredictable",
      "Limited offline modes exist but are untested or inconsistently applied during rush",
      "Documented peak-hour outage procedures exist and are trained at most locations",
      "Tested failover or offline payment workflows protect revenue during peak outages portfolio-wide",
    ]
  ),
  q(
    "conn-rel-3",
    "connectivity-reliability",
    "How do you evaluate and approve internet options for new restaurant openings?",
    [
      "Each opening team selects internet independently with no corporate review",
      "Informal guidance exists but is often ignored or applied inconsistently",
      "Corporate publishes standards but validation happens after install",
      "Openings follow a documented checklist with ISP approval before go-live",
      "Standardized opening internet package with mandatory go-live validation and sign-off",
    ]
  ),
  q(
    "backup-1",
    "backup-resilience",
    "How many locations have a tested backup internet path when the primary ISP fails?",
    [
      "No backup internet at any location",
      "Backup ordered at some sites but rarely tested or relied upon",
      "Backup exists at high-volume stores only; testing is irregular",
      "Majority of locations have backup; failover tested at least annually",
      "Portfolio-wide backup with documented testing cadence and peak-hour validation",
    ]
  ),
  q(
    "backup-2",
    "backup-resilience",
    "When did you last test automated failover during lunch, dinner, or drive-thru rush?",
    [
      "Never tested during peak service hours",
      "Tested only during closed hours or in a non-production environment",
      "Tested annually but not during lunch, dinner, or drive-thru rush",
      "Failover tested during peak at least once in the past year at key stores",
      "Regular peak-hour failover drills with results documented portfolio-wide",
    ]
  ),
  q(
    "backup-3",
    "backup-resilience",
    "Do critical store services have a defined failover path when connectivity fails?",
    [
      "No defined path—teams troubleshoot reactively when service fails",
      "Managers call vendor support without a documented recovery sequence",
      "Some services have backup paths but coverage is incomplete",
      "Critical services (POS, payments, ordering) have documented failover paths",
      "End-to-end failover paths defined, owned, and validated for all revenue-critical systems",
    ]
  ),
  q(
    "vis-1",
    "network-visibility",
    "Can your team see WAN or circuit status remotely for every operating location?",
    [
      "Cannot see circuit or WAN status remotely for most locations",
      "Visibility exists for some sites through separate ISP portals only",
      "Partial monitoring via mixed tools without a single store-level view",
      "Remote visibility for WAN and circuits at most locations through a central platform",
      "Portfolio-wide remote monitoring with health dashboards for every operating location",
    ]
  ),
  q(
    "vis-2",
    "network-visibility",
    "What is the typical time to detect a POS-affecting outage at a store?",
    [
      "Usually discovered by guests or staff during service—often 15+ minutes",
      "Detection typically takes more than 10 minutes after service is impacted",
      "Average detection within 10 minutes through store reporting",
      "Automated alerts notify IT or operations within 5 minutes at most locations",
      "Proactive monitoring detects circuit or POS connectivity issues within minutes portfolio-wide",
    ]
  ),
  q(
    "vis-3",
    "network-visibility",
    "Do you maintain historical outage data by location to spot repeat failures?",
    [
      "No centralized outage history by location",
      "Outages tracked ad hoc in tickets or emails without trend analysis",
      "Some locations log outages but reporting is inconsistent",
      "Centralized outage log with monthly review by location",
      "Historical outage analytics used to prioritize resilience investments by store",
    ]
  ),
  q(
    "std-1",
    "standardization",
    "Do you have a documented network standard that every new opening must follow?",
    [
      "No documented network standard for new openings",
      "Informal tribal knowledge varies by region or franchisee",
      "Standard exists but is outdated or not enforced at openings",
      "Current network standard required for corporate-managed openings",
      "Enforced portfolio standard integrated into opening playbook and franchise agreements",
    ]
  ),
  q(
    "std-2",
    "standardization",
    "How many unique router, firewall, or CPE models are deployed in the field?",
    [
      "Dozens of hardware models with no centralized inventory",
      "More than 10 distinct router, firewall, or CPE models in production",
      "Roughly 5–10 models in use with an ongoing consolidation effort",
      "Three or fewer approved hardware platforms at most locations",
      "One or two standardized platforms portfolio-wide with exceptions tracked",
    ]
  ),
  q(
    "std-3",
    "standardization",
    "How often is the store network standard reviewed and updated?",
    [
      "Network standard has never been formally reviewed",
      "Reviewed only when a major incident forces a change",
      "Reviewed informally every few years",
      "Annual review with documented updates communicated to operations",
      "Quarterly governance with version control and franchisee compliance tracking",
    ]
  ),
  q(
    "sec-1",
    "security",
    "Is POS and payment traffic on a separate VLAN or segment from guest Wi-Fi?",
    [
      "POS and guest Wi-Fi share the same flat network",
      "Segmentation attempted at some sites but not verified",
      "VLAN separation at corporate stores; franchisee sites vary widely",
      "POS segmented from guest Wi-Fi at most locations with periodic validation",
      "Portfolio-wide VLAN segmentation with documented PCI scope and annual testing",
    ]
  ),
  q(
    "sec-2",
    "security",
    "How consistent are firewall rules and security policy across locations?",
    [
      "Firewall rules differ significantly by location with no baseline",
      "Baseline exists but local changes are common and untracked",
      "Standard template used at new openings; legacy sites still vary",
      "Consistent firewall policy at most locations with formal change control",
      "Centralized policy management with compliance reporting across all stores",
    ]
  ),
  q(
    "sec-3",
    "security",
    "How is PCI scope managed across store networks and remote access paths?",
    [
      "PCI scope for store networks is unclear or unmanaged",
      "Scope reviewed only during annual assessment with limited network follow-through",
      "Basic segmentation in place but scope creep is a known risk",
      "Documented PCI scope with network controls reviewed semi-annually",
      "Active scope management integrated with network changes and opening standards",
    ]
  ),
  q(
    "doc-1",
    "documentation",
    "How visible are circuit contracts, renewal dates, and monthly spend by location?",
    [
      "Contract terms, renewals, and spend are unknown at the portfolio level",
      "Information scattered across vendor portals and local manager records",
      "Partial inventory maintained but often outdated after openings or changes",
      "Centralized circuit inventory with renewal dates and spend visible by location",
      "Telecom lifecycle management with automated renewal tracking and spend analytics",
    ]
  ),
  q(
    "doc-2",
    "documentation",
    "How accurate is your inventory of analog POTS lines across locations?",
    [
      "No inventory of remaining analog POTS lines",
      "Incomplete inventory—new lines discovered during incidents or billing surprises",
      "Inventory exists but is not updated after store changes or remodels",
      "Accurate POTS inventory maintained and reviewed at least annually",
      "Living inventory tied to alarm, fax, and life-safety systems with an active retirement plan",
    ]
  ),
  q(
    "doc-3",
    "documentation",
    "How are fire, burglar, and elevator alarm panels connected and documented at each store?",
    [
      "Alarm connectivity undocumented at most locations",
      "Documentation exists for some sites only, often held by local alarm vendors",
      "Corporate requests documentation but completeness varies by market",
      "Standard documentation template completed for most locations",
      "Portfolio-wide alarm and life-safety connectivity records with validated communication paths",
    ]
  ),
  q(
    "ops-1",
    "store-operations",
    "How are store connectivity alerts routed, acknowledged, and escalated?",
    [
      "No defined process—alerts go to whoever answers first",
      "Email distribution lists without escalation rules or clear ownership",
      "Tiered escalation exists but is not followed consistently",
      "Documented alert routing with on-call rotation and store escalation paths",
      "Integrated alerting with SLA tracking, ownership, and post-incident review",
    ]
  ),
  q(
    "ops-2",
    "store-operations",
    "Who owns day-to-day network monitoring and first-response troubleshooting?",
    [
      "No clear owner for network monitoring or first response",
      "IT handles issues when available; stores call ISPs directly otherwise",
      "Shared ownership between IT and operations without defined boundaries",
      "Dedicated owner or managed service for monitoring with documented runbooks",
      "24/7 coverage model with clear IT, operations, and vendor responsibilities",
    ]
  ),
  q(
    "ops-3",
    "store-operations",
    "How do store voice and ordering systems behave during a WAN or ISP outage?",
    [
      "Voice and online ordering typically fail completely during WAN outages",
      "Behavior varies—some stores have workarounds, others do not",
      "Backup paths exist for phones or ordering at some high-volume stores",
      "Documented procedures maintain critical ordering workflows during outages",
      "Tested continuity for voice, drive-thru, and online ordering during connectivity failures",
    ]
  ),
  q(
    "ven-1",
    "vendor-management",
    "How many distinct ISP or carrier relationships support your restaurant footprint?",
    [
      "Each location contracts independently—dozens of carrier relationships",
      "Regional agreements exist but local procurement still dominates",
      "Preferred vendor list in use with frequent exceptions",
      "Consolidated carrier strategy with master agreements at most locations",
      "Portfolio-wide carrier governance with standardized contracts and national account management",
    ]
  ),
  q(
    "ven-2",
    "vendor-management",
    "What process exists to consolidate vendors or standardize procurement?",
    [
      "No process to consolidate telecom or network vendors",
      "Consolidation discussed after billing spikes but no structured program",
      "Periodic RFPs without portfolio-wide implementation",
      "Active consolidation program with measurable vendor reduction targets",
      "Ongoing vendor governance with procurement standards and quarterly spend review",
    ]
  ),
  q(
    "ven-3",
    "vendor-management",
    "Who approves new telecom or network spend at the store level?",
    [
      "Store managers or franchisees approve telecom spend without corporate oversight",
      "Informal spending limits exist but are not enforced",
      "Corporate approval required above a threshold that stores often bypass",
      "Documented approval workflow for new circuits, vendors, and hardware",
      "Centralized procurement with store-level requests through a governed workflow",
    ]
  ),
  q(
    "growth-1",
    "growth-readiness",
    "How are franchisee or operator deviations from corporate network standards handled?",
    [
      "Franchisees operate independent networks with no compliance enforcement",
      "Standards communicated but deviations are tolerated without tracking",
      "Deviations reviewed during audits but remediation is slow",
      "Documented deviation process with remediation timelines",
      "Franchise network compliance program with onboarding, audits, and enforcement",
    ]
  ),
  q(
    "growth-2",
    "growth-readiness",
    "How are configurations deployed and updated across stores at scale?",
    [
      "Each store configured manually with no templated deployment",
      "Templates exist but technicians still configure site-by-site",
      "Partial automation at new openings; retrofits remain manual",
      "Standardized zero-touch or templated deployment at most new stores",
      "Portfolio-wide configuration management with remote provisioning and version control",
    ]
  ),
  q(
    "growth-3",
    "growth-readiness",
    "Do you have a documented plan to retire legacy copper lines portfolio-wide?",
    [
      "No plan to retire legacy copper or POTS lines",
      "Awareness of copper retirement but no portfolio-wide program",
      "Project list exists for high-risk sites without a committed timeline",
      "Documented multi-year POTS retirement plan with prioritized sites",
      "Active copper retirement program integrated with openings, remodels, and acquisitions",
    ]
  ),
];

export const networkAssessment: AssessmentDefinition = {
  id: "network-assessment",
  toolSlug: "network-assessment",
  title: "Network Readiness Assessment",
  scoreLabel: "Network readiness score",
  resultsDisclaimer: "Scores are directional and based on your selections in this session.",
  sections: networkAssessmentSections,
  categories: [
    {
      id: "connectivity-reliability",
      label: "Connectivity & Reliability",
      sectionId: "connectivity",
      description:
        "Primary circuit quality, consistency, and uptime across your restaurant portfolio.",
      weight: 1,
    },
    {
      id: "backup-resilience",
      label: "Backup & Resilience",
      sectionId: "connectivity",
      description: "Failover paths, backup internet, and tested recovery during peak service.",
      weight: 1,
    },
    {
      id: "network-visibility",
      label: "Network Visibility",
      sectionId: "monitoring",
      description:
        "Remote monitoring, outage detection, and historical performance data by location.",
      weight: 1,
    },
    {
      id: "standardization",
      label: "Standardization",
      sectionId: "standardization",
      description:
        "Documented network standards, hardware consistency, and configuration governance.",
      weight: 1,
    },
    {
      id: "security",
      label: "Security",
      sectionId: "security",
      description: "Traffic segmentation, firewall policy, PCI scope, and guest Wi-Fi isolation.",
      weight: 1,
    },
    {
      id: "documentation",
      label: "Legacy Voice & Documentation",
      sectionId: "legacy-voice",
      description:
        "Circuit inventory, contract visibility, POTS records, and alarm connectivity documentation.",
      weight: 1,
    },
    {
      id: "store-operations",
      label: "Store Operations",
      sectionId: "operations",
      description:
        "Alert routing, first-response ownership, and operational impact when circuits fail.",
      weight: 1,
    },
    {
      id: "vendor-management",
      label: "Vendor Management",
      sectionId: "operations",
      description: "Carrier relationships, procurement governance, and telecom spend control.",
      weight: 1,
    },
    {
      id: "growth-readiness",
      label: "Growth Readiness",
      sectionId: "operations",
      description:
        "Opening standards, franchise alignment, configuration at scale, and legacy line retirement.",
      weight: 1,
    },
  ],
  questions: networkAssessmentQuestions,
  relatedContent: {
    networking: {
      id: "networking",
      title: "Restaurant Networking",
      href: "/research/restaurants-networking",
      description:
        "Store architecture, failover, and standardization before new technology purchases.",
    },
    bestInternet: {
      id: "bestInternet",
      title: "Best Internet for Restaurants",
      href: "/research/restaurants-best-internet",
      description: "Circuit selection, redundancy, and what to order for new locations.",
    },
    managedNetwork: {
      id: "managedNetwork",
      title: "Restaurant Network Visibility",
      href: "/research/restaurant-network-visibility",
      description:
        "Remote monitoring, outage detection, and visibility before buying more tools.",
    },
    sdWan: {
      id: "sdWan",
      title: "Restaurant Networking",
      href: "/research/restaurants-networking",
      description: "WAN architecture fit, portfolio consistency, and SD-WAN tradeoffs.",
    },
    potsReplacement: {
      id: "potsReplacement",
      title: "POTS Replacement for Restaurants",
      href: "/research/restaurants-pots-replacement",
      description: "Retiring copper lines for alarms, fax, and store voice services.",
    },
    potsSavingsCalculator: {
      id: "potsSavingsCalculator",
      title: "POTS Replacement Savings Calculator",
      href: "/tools/pots-savings-calculator",
      description: "Estimate monthly and annual savings from replacing legacy analog lines.",
    },
    vendorConsolidationCalculator: {
      id: "vendorConsolidationCalculator",
      title: "Vendor Consolidation Calculator",
      href: "/tools/vendor-consolidation-calculator",
      description: "Quantify savings and admin overhead from reducing telecom vendors.",
    },
    downtimeCalculator: {
      id: "downtimeCalculator",
      title: "Downtime Cost Calculator",
      href: "/tools/downtime-cost-calculator",
      description: "Quantify outage impact to prioritize resilience investments.",
    },
  },
  resultProfiles: [
    {
      minScore: 86,
      level: "Optimized",
      summary:
        "Network operations are standardized, monitored, and tested across the portfolio. Focus on continuous improvement, cost optimization, and validating outlier locations.",
    },
    {
      minScore: 71,
      level: "Standardized",
      summary:
        "Strong fundamentals and documented standards are in place. Close remaining gaps at outlier stores before accelerating openings or acquisitions.",
    },
    {
      minScore: 51,
      level: "Operational",
      summary:
        "Core practices exist but consistency breaks down across locations. Prioritize backup testing, visibility, and traffic separation at high-volume stores.",
    },
    {
      minScore: 31,
      level: "Foundational",
      summary:
        "Capabilities are uneven and often reactive. Documented standards, backup connectivity, and monitoring should come before major architecture projects.",
    },
    {
      minScore: 0,
      level: "Reactive",
      summary:
        "Network operations lack portfolio-wide consistency. Start with store inventory, failover testing, and circuit documentation before evaluating new technology.",
    },
  ],
  recommendations: {
    maxResults: 6,
    requireCategoryComplete: true,
    reasonTemplate: "Your {category} score is {score}/100. {description}",
    fallback: "networking",
    byCategory: {
      "connectivity-reliability": ["networking", "bestInternet", "downtimeCalculator"],
      "backup-resilience": ["bestInternet", "downtimeCalculator", "networking"],
      "network-visibility": ["managedNetwork", "downtimeCalculator", "networking"],
      standardization: ["networking", "sdWan", "managedNetwork"],
      security: ["networking", "managedNetwork"],
      "store-operations": ["managedNetwork", "downtimeCalculator", "networking"],
      documentation: ["potsReplacement", "potsSavingsCalculator", "bestInternet"],
      "vendor-management": ["vendorConsolidationCalculator", "managedNetwork", "networking"],
      "growth-readiness": ["sdWan", "managedNetwork", "networking", "bestInternet"],
    },
  },
  insights: {
    strengthsCount: 3,
    risksCount: 3,
  },
};
