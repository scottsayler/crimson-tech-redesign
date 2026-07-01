import type {
  AssessmentChoice,
  AssessmentDefinition,
  AssessmentQuestion,
} from "@/lib/assessments/types";

const MATURITY_CHOICES: AssessmentChoice[] = [
  { label: "Not in place or unknown across most locations", score: 0 },
  { label: "Ad hoc with wide variation by store or franchisee", score: 1 },
  { label: "Partially implemented at some locations", score: 2 },
  { label: "Documented standard with periodic testing", score: 3 },
  { label: "Portfolio-wide standard with accountable ownership", score: 4 },
];

function question(
  id: string,
  category: string,
  prompt: string
): AssessmentQuestion {
  return { id, category, prompt, choices: MATURITY_CHOICES };
}

const QUESTION_DATA: { id: string; category: string; prompt: string }[] = [
  {
    id: "conn-rel-1",
    category: "connectivity-reliability",
    prompt: "How consistent are primary circuit type, speed, and SLA across your portfolio?",
  },
  {
    id: "conn-rel-2",
    category: "connectivity-reliability",
    prompt:
      "What happens to POS and card processing when the primary circuit drops during peak service?",
  },
  {
    id: "conn-rel-3",
    category: "connectivity-reliability",
    prompt: "How do you evaluate and approve internet options for new restaurant openings?",
  },
  {
    id: "backup-1",
    category: "backup-resilience",
    prompt:
      "How many locations have a tested backup internet path when the primary ISP fails?",
  },
  {
    id: "backup-2",
    category: "backup-resilience",
    prompt:
      "When did you last test automated failover during lunch, dinner, or drive-thru rush?",
  },
  {
    id: "backup-3",
    category: "backup-resilience",
    prompt: "Do critical store services have a defined failover path when connectivity fails?",
  },
  {
    id: "vis-1",
    category: "network-visibility",
    prompt: "Can your team see WAN or circuit status remotely for every operating location?",
  },
  {
    id: "vis-2",
    category: "network-visibility",
    prompt: "What is the typical time to detect a POS-affecting outage at a store?",
  },
  {
    id: "vis-3",
    category: "network-visibility",
    prompt: "Do you maintain historical outage data by location to spot repeat failures?",
  },
  {
    id: "std-1",
    category: "standardization",
    prompt: "Do you have a documented network standard that every new opening must follow?",
  },
  {
    id: "std-2",
    category: "standardization",
    prompt: "How many unique router, firewall, or CPE models are deployed in the field?",
  },
  {
    id: "std-3",
    category: "standardization",
    prompt: "How often is the store network standard reviewed and updated?",
  },
  {
    id: "sec-1",
    category: "security",
    prompt: "Is POS and payment traffic on a separate VLAN or segment from guest Wi-Fi?",
  },
  {
    id: "sec-2",
    category: "security",
    prompt: "How consistent are firewall rules and security policy across locations?",
  },
  {
    id: "sec-3",
    category: "security",
    prompt: "How is PCI scope managed across store networks and remote access paths?",
  },
  {
    id: "ops-1",
    category: "store-operations",
    prompt: "How are store connectivity alerts routed, acknowledged, and escalated?",
  },
  {
    id: "ops-2",
    category: "store-operations",
    prompt: "Who owns day-to-day network monitoring and first-response troubleshooting?",
  },
  {
    id: "ops-3",
    category: "store-operations",
    prompt: "How do store voice and ordering systems behave during a WAN or ISP outage?",
  },
  {
    id: "doc-1",
    category: "documentation",
    prompt:
      "How visible are circuit contracts, renewal dates, and monthly spend by location?",
  },
  {
    id: "doc-2",
    category: "documentation",
    prompt: "How accurate is your inventory of analog POTS lines across locations?",
  },
  {
    id: "doc-3",
    category: "documentation",
    prompt:
      "How are fire, burglar, and elevator alarm panels connected and documented at each store?",
  },
  {
    id: "ven-1",
    category: "vendor-management",
    prompt: "How many distinct ISP or carrier relationships support your restaurant footprint?",
  },
  {
    id: "ven-2",
    category: "vendor-management",
    prompt: "What process exists to consolidate vendors or standardize procurement?",
  },
  {
    id: "ven-3",
    category: "vendor-management",
    prompt: "Who approves new telecom or network spend at the store level?",
  },
  {
    id: "growth-1",
    category: "growth-readiness",
    prompt:
      "How are franchisee or operator deviations from corporate network standards handled?",
  },
  {
    id: "growth-2",
    category: "growth-readiness",
    prompt: "How are configurations deployed and updated across stores at scale?",
  },
  {
    id: "growth-3",
    category: "growth-readiness",
    prompt: "Do you have a documented plan to retire legacy copper lines portfolio-wide?",
  },
];

export const networkAssessment: AssessmentDefinition = {
  id: "network-assessment",
  toolSlug: "network-assessment",
  title: "Network Readiness Assessment",
  scoreLabel: "Network readiness score",
  resultsDisclaimer: "Scores are directional and based on your selections in this session.",
  categories: [
    {
      id: "connectivity-reliability",
      label: "Connectivity & Reliability",
      description:
        "Primary circuit quality, consistency, and uptime across your restaurant portfolio.",
      weight: 1,
    },
    {
      id: "backup-resilience",
      label: "Backup & Resilience",
      description: "Failover paths, backup internet, and tested recovery during peak service.",
      weight: 1,
    },
    {
      id: "network-visibility",
      label: "Network Visibility",
      description:
        "Remote monitoring, outage detection, and historical performance data by location.",
      weight: 1,
    },
    {
      id: "standardization",
      label: "Standardization",
      description:
        "Documented network standards, hardware consistency, and configuration governance.",
      weight: 1,
    },
    {
      id: "security",
      label: "Security",
      description: "Traffic segmentation, firewall policy, PCI scope, and guest Wi-Fi isolation.",
      weight: 1,
    },
    {
      id: "store-operations",
      label: "Store Operations",
      description:
        "Alert routing, first-response ownership, and operational impact when circuits fail.",
      weight: 1,
    },
    {
      id: "documentation",
      label: "Documentation",
      description:
        "Circuit inventory, contract visibility, POTS records, and alarm connectivity documentation.",
      weight: 1,
    },
    {
      id: "vendor-management",
      label: "Vendor Management",
      description: "Carrier relationships, procurement governance, and telecom spend control.",
      weight: 1,
    },
    {
      id: "growth-readiness",
      label: "Growth Readiness",
      description:
        "Opening standards, franchise alignment, configuration at scale, and legacy line retirement.",
      weight: 1,
    },
  ],
  questions: QUESTION_DATA.map((item) => question(item.id, item.category, item.prompt)),
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
      documentation: ["networking", "potsReplacement", "bestInternet"],
      "vendor-management": ["managedNetwork", "networking", "bestInternet"],
      "growth-readiness": ["sdWan", "managedNetwork", "networking", "bestInternet"],
    },
  },
  insights: {
    strengthsCount: 3,
    risksCount: 3,
  },
};
