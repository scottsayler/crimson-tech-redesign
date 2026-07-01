import type { Metadata } from "next";
import {
  getResearchHubPath,
  researchTypeDescriptions,
  researchTypeLabels,
  type ResearchType,
} from "@/content/research";
import { createMetadata } from "@/lib/seo";

export function createResearchHubMetadata(type: ResearchType): Metadata {
  const path = getResearchHubPath(type);

  return createMetadata({
    title: researchTypeLabels[type],
    description: researchTypeDescriptions[type],
    path,
  });
}
