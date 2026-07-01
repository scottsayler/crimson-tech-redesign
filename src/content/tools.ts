export type ToolHubSection =
  | "assessments"
  | "calculators"
  | "planning-tools"
  | "decision-guides";

export type ToolInteractiveType = "calculator" | "assessment";

export type ToolFaq = {
  question: string;
  answer: string;
};

export type ToolSection = {
  heading: string;
  paragraphs: string[];
};

export type ToolShouldConsider = {
  evaluateIf: string[];
  probablyNotIf: string[];
};

export type Tool = {
  slug: string;
  title: string;
  description: string;
  hubSection: ToolHubSection;
  interactiveType: ToolInteractiveType;
  completionTime: string;
  audience: string[];
  solves: string;
  industry?: string;
  primaryKeyword: string;
  relatedResearch: string[];
  quickAnswer: string;
  whyYoureHere: string;
  shouldConsider: ToolShouldConsider;
  realityCheck: string;
  bottomLine: string;
  sections: ToolSection[];
  faqs: ToolFaq[];
  featured?: boolean;
};

export const TOOL_HUB_SECTIONS: {
  id: ToolHubSection;
  title: string;
  description: string;
}[] = [
  {
    id: "assessments",
    title: "Assessments",
    description:
      "Score portfolio maturity across connectivity, monitoring, security, and operations — then see where to focus first.",
  },
  {
    id: "calculators",
    title: "Calculators",
    description:
      "Quantify outage impact, savings potential, and ROI before approving network or infrastructure spend.",
  },
  {
    id: "planning-tools",
    title: "Planning Tools",
    description:
      "Model requirements and budgets for new store openings and portfolio-wide technology decisions.",
  },
  {
    id: "decision-guides",
    title: "Decision Guides",
    description:
      "Structured frameworks that turn research into actionable next steps for leadership and IT teams.",
  },
];

export const tools: Tool[] = [
  {
    slug: "downtime-cost-calculator",
    title: "Restaurant Downtime Cost Calculator",
    description:
      "Estimate revenue at risk, labor waste, and recovery cost when POS or connectivity fails at restaurant locations. Compare outage impact against backup internet and network investments.",
    hubSection: "calculators",
    interactiveType: "calculator",
    completionTime: "2 min",
    audience: ["CFO", "Operations", "IT Director", "Franchise Leader"],
    solves:
      "Leadership needs a credible dollar figure for outage impact before approving backup internet, SD-WAN, or managed network investments.",
    industry: "restaurants",
    primaryKeyword: "restaurant downtime cost calculator",
    relatedResearch: [
      "restaurant-internet-outages",
      "restaurant-network-visibility",
      "restaurants-best-internet",
      "restaurants-networking",
    ],
    featured: true,
    quickAnswer:
      "This calculator estimates revenue at risk, labor waste, and recovery cost when POS, card processing, or online ordering fails during service. Enter daily sales, outage duration, and how much revenue depends on connected systems. Compare the total against backup internet, SD-WAN, or managed network investments.",
    whyYoureHere:
      "Leadership asked what the last outage actually cost. Finance wants a number before approving backup internet. Operations remembers guest complaints and refunded orders. IT needs a business case that goes beyond fear of downtime.\n\nThis calculator turns those questions into a shared estimate your executive team can accept. It is not accounting advice. Actual impact depends on sales mix, offline payment capability, POS behavior, delivery platforms, and store procedures.",
    shouldConsider: {
      evaluateIf: [
        "You had outages during peak meal periods in the past year",
        "Finance requires ROI before approving LTE backup or redundant circuits",
        "You operate high-volume locations where card and online orders dominate revenue",
        "You are comparing SD-WAN, managed services, or backup internet options",
      ],
      probablyNotIf: [
        "Outages are rare and always occur during closed hours",
        "You have not documented when outages happened or how long POS was down",
        "You are using downtime math to justify a purchase you already decided on",
      ],
    },
    realityCheck:
      "A short outage during peak service can cost more than a full month of backup connectivity, but only if the outage affects revenue-generating systems. ISP service credits rarely cover actual business impact during peak service.",
    bottomLine:
      "Quantify peak-hour downtime cost first. Compare that number to backup internet or network project cost before evaluating vendors. Use the restaurant internet outages guide for methodology and assumptions if leadership wants more context.",
    sections: [
      {
        heading: "How to Use It",
        paragraphs: [
          "Start with one location or a group affected by the same outage. Use daily gross sales, not card volume alone. Set the peak multiplier above 1.0 if the outage happened during lunch, dinner, drive-thru, or delivery rush.",
          "Enter how much revenue depends on POS, card processing, and online ordering. Add labor cost and headcount if staff could not serve guests during the outage. Optional fields capture online-only and delivery platform revenue that may stop entirely when connectivity fails.",
          "Results update as you change inputs. Compare the total impact to the annual cost of backup internet, SD-WAN, or managed network services.",
        ],
      },
      {
        heading: "What the Results Mean",
        paragraphs: [
          "Estimated revenue at risk shows gross sales exposed during the outage window before applying system dependency.",
          "Estimated lost revenue applies the percentage of sales that require connected systems. Optional online and delivery fields add channel-specific loss on top.",
          "Labor impact covers idle crew time during the outage. Recovery and admin cost covers reconciliation, refunds, and reporting after service resumes.",
          "Total estimated downtime impact combines revenue and labor lines. Impact per location divides the total across affected stores. Annualized figures show what repeated monthly or quarterly outages could cost over a year.",
        ],
      },
    ],
    faqs: [
      {
        question: "What inputs do I need for a downtime estimate?",
        answer:
          "Start with average daily sales per location, operating hours, outage duration, and the share of sales that require connectivity. Add labor cost and affected headcount for a fuller picture.",
      },
      {
        question: "Should I use gross sales or card volume only?",
        answer:
          "Use gross sales for the revenue you cannot capture when registers and online ordering are down. Card volume alone misses delivery orders and workflows that also stop.",
      },
      {
        question: "How accurate is this calculator?",
        answer:
          "It produces a directional estimate, not a financial statement. Actual impact depends on sales mix, offline payment modes, POS behavior, and store procedures.",
      },
      {
        question: "When does LTE backup pay for itself?",
        answer:
          "Compare annual LTE cost at a location against peak-hour downtime cost times the number of outage hours you expect. At many QSR sites, preventing one lunch outage covers a year of backup service.",
      },
    ],
  },
  {
    slug: "network-assessment",
    title: "Restaurant Network Readiness Assessment",
    description:
      "Interactive self-assessment for multi-location restaurant operators to score network maturity across redundancy, monitoring, security, standardization, vendor management, and legacy voice services.",
    hubSection: "assessments",
    interactiveType: "assessment",
    completionTime: "5 min",
    audience: ["IT Director", "CIO", "Operations", "Franchise Leader"],
    solves:
      "Leadership wants a portfolio-wide baseline before SD-WAN, managed services, or major network projects — without waiting for a third-party audit.",
    industry: "restaurants",
    primaryKeyword: "restaurant network readiness assessment",
    relatedResearch: [
      "restaurant-network-visibility",
      "restaurants-networking",
      "restaurants-best-internet",
      "restaurant-internet-outages",
      "restaurant-network-checklist",
    ],
    featured: true,
    quickAnswer:
      "This assessment scores how mature your restaurant network operations are across connectivity, monitoring, security, standardization, vendor management, and legacy voice lines. Answer 27 questions, receive a weighted score out of 100, and see category gaps with linked next steps.",
    whyYoureHere:
      "Leadership wants to know whether the portfolio is ready for growth, acquisitions, or a WAN project. IT is tired of answering the same outage questions without a baseline. Operations sees inconsistent store behavior but cannot point to which gaps matter most.\n\nThis assessment turns those conversations into a shared maturity picture. It is not an audit. It reflects what you know today about how stores are connected, monitored, secured, and governed.",
    shouldConsider: {
      evaluateIf: [
        "You operate multiple restaurant locations with different network setups",
        "Outages during peak service exposed inconsistent failover or monitoring",
        "New openings reinvent connectivity decisions each time",
        "Leadership asked for a network readiness baseline before SD-WAN or managed services",
        "Franchisees procure circuits or equipment outside corporate standards",
      ],
      probablyNotIf: [
        "You have one or two stores with documented standards and tested failover",
        "You already completed a formal third-party network audit this quarter",
        "You are looking for a vendor quote rather than an internal maturity baseline",
      ],
    },
    realityCheck:
      "Self-assessment scores reflect what your team believes is true today. Validate low-scoring areas with store inventory, circuit records, and failover tests before treating results as fact.",
    bottomLine:
      "Run the assessment with IT and operations input. Focus on the lowest category scores and linked guides before evaluating SD-WAN, managed services, or vendor consolidation. Pair results with the downtime calculator when leadership needs outage economics.",
    sections: [
      {
        heading: "How to Use It",
        paragraphs: [
          "Answer each question based on your current restaurant portfolio, not your target state. If practices vary by location, choose the answer that best describes the majority of stores or the highest-risk exceptions.",
          "Progress saves automatically during your session. When all 27 questions are complete, review your overall score, category breakdown, strengths, risks, and linked research priorities.",
        ],
      },
      {
        heading: "What the Results Mean",
        paragraphs: [
          "Overall score is a weighted maturity percentage from 0 to 100 across all questions.",
          "Maturity level summarizes portfolio readiness from Reactive through Optimized.",
          "Category scores show performance across connectivity, monitoring, security, standardization, vendor management, and legacy voice lines.",
          "Biggest strengths and highest risks highlight specific questions where you scored highest and lowest.",
          "Recommended priorities link to Crimson Signal research and tools based on your weakest categories.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does the assessment take?",
        answer:
          "Most operators complete 27 questions in 10 to 15 minutes. Answers save in your browser session so you can pause and return.",
      },
      {
        question: "How is the score calculated?",
        answer:
          "Each answer maps to a maturity level from 0 to 4. Category and overall scores are weighted percentages out of 100 based on your selections.",
      },
      {
        question: "What maturity levels does the tool use?",
        answer:
          "Scores map to Reactive, Foundational, Operational, Standardized, and Optimized levels. The labels describe portfolio consistency, not vendor certification.",
      },
      {
        question: "What should we do after reviewing results?",
        answer:
          "Start with the recommended priorities linked from your lowest categories. Validate assumptions with store inventory and failover testing before approving spend.",
      },
    ],
  },
  {
    slug: "pots-savings-calculator",
    title: "POTS Replacement Savings Calculator",
    description:
      "Estimate monthly and annual savings from replacing legacy analog POTS lines across multi-location restaurant and retail portfolios. Model payback on cellular or managed POTS replacement.",
    hubSection: "calculators",
    interactiveType: "calculator",
    completionTime: "2 min",
    audience: ["CFO", "Operations", "IT Director", "Facilities"],
    solves:
      "Finance and operations need a credible savings estimate before approving POTS replacement, copper retirement, or alarm modernization projects.",
    industry: "restaurants",
    primaryKeyword: "POTS replacement savings calculator",
    relatedResearch: [
      "restaurant-pots-replacement",
      "restaurants-pots-replacement",
      "restaurants-best-internet",
      "restaurant-technology-standardization",
    ],
    featured: true,
    quickAnswer:
      "This calculator estimates monthly and annual savings from replacing legacy analog POTS lines across your portfolio. Enter location count, lines per site, current and replacement monthly costs, and one-time implementation spend. Compare monthly savings, payback period, and three-year net savings.",
    whyYoureHere:
      "POTS bills keep rising but nobody has a portfolio-wide inventory. Facilities knows alarms still use copper. IT gets carrier notices about line retirement. Finance wants a business case before approving replacement hardware.\n\nThis calculator turns those questions into a shared savings estimate. It is not a vendor quote. Actual savings depend on line inventory accuracy, alarm vendor requirements, and replacement technology choices.",
    shouldConsider: {
      evaluateIf: [
        "You still pay for copper or analog lines at multiple locations",
        "Carrier retirement notices or rising POTS bills created urgency",
        "Alarm, fax, elevator, or emergency phones still depend on analog lines",
        "Leadership wants payback math before a POTS replacement project",
      ],
      probablyNotIf: [
        "You completed POTS replacement across the portfolio in the past year",
        "You have fewer than two analog lines and no planned openings",
        "You have not validated which systems each copper line supports",
      ],
    },
    realityCheck:
      "Savings estimates assume accurate line counts and replacement costs validated with alarm vendors and local code requirements. Life-safety systems may need vendor-approved alternatives before cutover.",
    bottomLine:
      "Build a line inventory first. Use this calculator to frame monthly savings and payback, then validate replacement options per device type before approving portfolio-wide deployment.",
    sections: [
      {
        heading: "How to Use It",
        paragraphs: [
          "Enter the number of locations and average analog lines per site. Include alarms, fax, elevator phones, emergency lines, and other copper dependencies—not just voice extensions.",
          "Use your blended monthly POTS cost per line for current spend. Enter the estimated replacement monthly cost for cellular gateways, managed POTS replacement, or other alternatives.",
          "Add one-time implementation cost for hardware, installation, and project coordination. Results show monthly savings, annual savings, payback period, and net three-year savings.",
        ],
      },
      {
        heading: "What the Results Mean",
        paragraphs: [
          "Current monthly POTS cost is total lines multiplied by current per-line cost across the portfolio.",
          "Estimated replacement monthly cost applies the replacement per-line rate to the same line count.",
          "Monthly savings is the difference between current and replacement recurring cost.",
          "Payback period divides one-time implementation cost by monthly savings. Three-year savings subtracts implementation cost from cumulative monthly savings over 36 months.",
        ],
      },
    ],
    faqs: [
      {
        question: "What lines should I include in the count?",
        answer:
          "Include every active copper line: fire and burglar alarm dialers, fax, elevator phones, emergency phones, POS backup lines, and building systems. Exclude lines already migrated to cellular or IP.",
      },
      {
        question: "How do I estimate replacement cost per line?",
        answer:
          "Use quotes for cellular POTS replacement devices, managed migration services, or IP alternatives divided by line count. Battery backup and monitoring fees should be included in the monthly figure.",
      },
      {
        question: "Does this account for alarm vendor requirements?",
        answer:
          "No. This calculator models recurring cost savings only. Life-safety and code-sensitive systems need vendor and authority review before cutover.",
      },
      {
        question: "When does POTS replacement pay for itself?",
        answer:
          "Compare payback months to your planning horizon. Many multi-location operators see payback under 18 months when legacy line costs exceed $60–$80 per month.",
      },
    ],
  },
  {
    slug: "vendor-consolidation-calculator",
    title: "Vendor Consolidation Calculator",
    description:
      "Estimate monthly savings and operational impact from reducing telecom and network vendors across a multi-location portfolio. Model vendor spend reduction and admin time recovered.",
    hubSection: "calculators",
    interactiveType: "calculator",
    completionTime: "2 min",
    audience: ["CIO", "IT Director", "Operations", "CFO"],
    solves:
      "Leadership wants to quantify the cost of vendor sprawl before standardizing on fewer telecom and network partners across locations.",
    industry: "restaurants",
    primaryKeyword: "vendor consolidation calculator",
    relatedResearch: [
      "restaurant-vendor-sprawl",
      "restaurant-technology-standardization",
      "restaurants-networking",
      "restaurant-network-visibility",
    ],
    featured: true,
    quickAnswer:
      "This calculator estimates savings from reducing telecom and network vendors across your portfolio. Enter location count, current and target vendor counts, average monthly spend per vendor, and admin hours spent managing relationships. See monthly and annual savings plus operational complexity reduction.",
    whyYoureHere:
      "Every region picked different ISPs. Franchisees added their own vendors. IT spends hours on invoices, escalations, and contract renewals. Leadership asked whether consolidation is worth the disruption.\n\nThis calculator frames vendor spend and admin overhead in dollars. It is not a procurement recommendation. Actual savings depend on contract terms, managed service pricing, and how aggressively you standardize.",
    shouldConsider: {
      evaluateIf: [
        "You manage more than five telecom or network vendors portfolio-wide",
        "IT or operations spends significant time on vendor coordination",
        "New store openings add new carrier relationships instead of reusing standards",
        "Leadership is evaluating managed network services or MSP consolidation",
      ],
      probablyNotIf: [
        "You already operate with two or fewer strategic vendor partners",
        "Vendor count is low but contracts are still unmanaged",
        "You want a vendor quote rather than an internal savings estimate",
      ],
    },
    realityCheck:
      "Consolidation savings depend on contract leverage, exit costs, and whether fewer vendors actually reduce admin load. Validate target vendor count with procurement before using results in budget planning.",
    bottomLine:
      "Use this calculator to frame the cost of vendor sprawl. Pair results with the vendor sprawl and technology standardization guides before selecting consolidation targets.",
    sections: [
      {
        heading: "How to Use It",
        paragraphs: [
          "Enter portfolio location count and the number of distinct telecom and network vendors you manage today. Set a realistic target vendor count after consolidation or managed services.",
          "Add average monthly spend per vendor relationship, including circuits, managed fees, and recurring service charges.",
          "Enter monthly admin hours and fully loaded hourly cost for staff managing vendor relationships. Results combine vendor spend savings and estimated admin time recovered.",
        ],
      },
      {
        heading: "What the Results Mean",
        paragraphs: [
          "Current monthly vendor spend multiplies vendor count by average monthly spend per vendor.",
          "Consolidated monthly spend applies the target vendor count at the same per-vendor spend rate.",
          "Estimated monthly admin cost is admin hours multiplied by hourly cost. Consolidation assumes admin time scales proportionally with vendor count.",
          "Operational complexity reduction shows the percentage fewer vendor relationships. Three-year savings is cumulative monthly savings over 36 months.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which vendors should I count?",
        answer:
          "Include ISPs, WAN providers, managed network vendors, SD-WAN partners, and connectivity MSPs. Exclude POS, payroll, or non-network vendors unless they also provide circuits.",
      },
      {
        question: "How do I set a realistic target vendor count?",
        answer:
          "Most multi-location operators target two to four strategic partners: a primary connectivity vendor, a backup or managed services partner, and regional exceptions only where required.",
      },
      {
        question: "Does consolidation always reduce spend?",
        answer:
          "Not automatically. Fewer vendors can reduce admin overhead and improve leverage, but exit fees, migration costs, and managed service pricing affect net savings.",
      },
      {
        question: "How is admin time savings estimated?",
        answer:
          "The calculator assumes admin hours scale proportionally with vendor count. If consolidation also standardizes tooling and contracts, actual time savings may be higher.",
      },
    ],
  },
];

export function getTool(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByHubSection(section: ToolHubSection): Tool[] {
  return tools.filter((tool) => tool.hubSection === section);
}

export function getFeaturedTools(): Tool[] {
  return tools.filter((tool) => tool.featured);
}
