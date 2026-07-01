import type { ResearchNextStep } from "./research";

export type ResearchNavigationMeta = {
  tags?: string[];
  libraryCategory?: string;
  related?: string[];
  nextSteps?: ResearchNextStep[];
  learningPath?: string;
  learningOrder?: number;
  linkAliases?: string[];
};

export const researchNavigationMeta: Record<string, ResearchNavigationMeta> = {
  "restaurant-internet-outages": {
    tags: ["connectivity", "outages", "failover", "pos", "restaurants"],
    libraryCategory: "Connectivity",
    learningPath: "restaurant-connectivity",
    learningOrder: 1,
    related: [
      "restaurant-network-visibility",
      "restaurants-networking",
      "restaurants-best-internet",
    ],
    linkAliases: ["internet outages", "store outages"],
  },
  "restaurant-network-visibility": {
    tags: ["monitoring", "network visibility", "restaurants", "connectivity"],
    libraryCategory: "Connectivity",
    learningPath: "restaurant-connectivity",
    learningOrder: 2,
    related: [
      "restaurant-internet-outages",
      "restaurants-networking",
      "restaurant-network-checklist",
    ],
    linkAliases: ["network visibility"],
  },
  "restaurants-networking": {
    tags: ["networking", "store network", "restaurants", "connectivity"],
    libraryCategory: "Connectivity",
    learningPath: "restaurant-connectivity",
    learningOrder: 3,
    related: [
      "restaurants-best-internet",
      "restaurant-network-visibility",
      "restaurant-network-checklist",
    ],
    linkAliases: ["restaurant networking", "store networking"],
  },
  "restaurants-best-internet": {
    tags: ["internet", "carriers", "decision framework", "restaurants"],
    libraryCategory: "Connectivity",
    learningPath: "restaurant-connectivity",
    learningOrder: 4,
    related: [
      "restaurant-internet-outages",
      "restaurants-networking",
      "restaurant-pots-replacement",
    ],
    linkAliases: ["best internet"],
  },
  "restaurant-pots-replacement": {
    tags: ["pots", "analog lines", "infrastructure", "restaurants"],
    libraryCategory: "Infrastructure",
    learningPath: "restaurant-connectivity",
    learningOrder: 5,
    related: [
      "restaurants-pots-replacement",
      "restaurants-best-internet",
      "restaurant-technology-standardization",
    ],
    linkAliases: ["POTS replacement", "pots lines"],
  },
  "restaurants-pots-replacement": {
    tags: ["pots", "decision framework", "infrastructure", "restaurants"],
    libraryCategory: "Infrastructure",
    related: [
      "restaurant-pots-replacement",
      "restaurants-best-internet",
      "restaurant-technology-standardization",
    ],
    linkAliases: ["pots replacement"],
  },
  "restaurant-vendor-sprawl": {
    tags: ["vendor sprawl", "operations", "restaurants", "managed services"],
    libraryCategory: "Operations",
    learningPath: "restaurant-operations",
    learningOrder: 1,
    related: [
      "restaurant-technology-standardization",
      "restaurants-opening-technology-checklist",
    ],
    linkAliases: ["vendor sprawl"],
  },
  "restaurant-technology-standardization": {
    tags: ["standardization", "operations", "franchise", "restaurants"],
    libraryCategory: "Operations",
    learningPath: "restaurant-operations",
    learningOrder: 2,
    related: [
      "restaurant-vendor-sprawl",
      "restaurants-opening-technology-checklist",
      "restaurants-networking",
    ],
    linkAliases: ["technology standardization"],
  },
  "restaurants-opening-technology-checklist": {
    tags: ["new stores", "checklist", "operations", "restaurants"],
    libraryCategory: "Operations",
    learningPath: "restaurant-operations",
    learningOrder: 3,
    related: [
      "restaurant-network-checklist",
      "restaurant-technology-standardization",
      "restaurants-networking",
    ],
    linkAliases: ["opening technology checklist", "new store opening"],
  },
  "restaurant-network-checklist": {
    tags: ["checklist", "network", "connectivity", "restaurants"],
    libraryCategory: "Connectivity",
    related: [
      "restaurants-networking",
      "restaurant-network-visibility",
      "restaurants-opening-technology-checklist",
    ],
    linkAliases: ["network checklist"],
  },
};
