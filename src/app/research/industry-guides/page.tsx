import { ResearchTypeHubPage } from "@/components/sections/ResearchTypeHubPage";
import { createResearchHubMetadata } from "@/lib/research-hub";

export const metadata = createResearchHubMetadata("industry-guide");

export default function IndustryGuidesHubPage() {
  return <ResearchTypeHubPage type="industry-guide" />;
}
