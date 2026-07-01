import type { Metadata } from "next";
import {
  getResearchHubPath,
  researchTypeDescriptions,
  type ResearchType,
} from "@/content/research";
import { researchTypeHubTitles } from "@/lib/content-badges";
import { createMetadata } from "@/lib/seo";

export function createResearchHubMetadata(type: ResearchType): Metadata {
  const path = getResearchHubPath(type);

  return createMetadata({
    title: researchTypeHubTitles[type],
    description: researchTypeDescriptions[type],
    path,
  });
}
