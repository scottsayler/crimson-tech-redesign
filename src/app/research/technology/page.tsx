import { ResearchTypeHubPage } from "@/components/sections/ResearchTypeHubPage";
import { createResearchHubMetadata } from "@/lib/research-hub";

export const metadata = createResearchHubMetadata("technology-guide");

export default function TechnologyGuidesHubPage() {
  return <ResearchTypeHubPage type="technology-guide" />;
}
