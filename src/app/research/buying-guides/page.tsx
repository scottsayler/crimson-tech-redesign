import { ResearchTypeHubPage } from "@/components/sections/ResearchTypeHubPage";
import { createResearchHubMetadata } from "@/lib/research-hub";

export const metadata = createResearchHubMetadata("buying-guide");

export default function BuyingGuidesHubPage() {
  return <ResearchTypeHubPage type="buying-guide" />;
}
