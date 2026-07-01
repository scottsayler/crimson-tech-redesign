import { ResearchTypeHubPage } from "@/components/sections/ResearchTypeHubPage";
import { createResearchHubMetadata } from "@/lib/research-hub";

export const metadata = createResearchHubMetadata("decision-framework");

export default function DecisionFrameworksHubPage() {
  return <ResearchTypeHubPage type="decision-framework" />;
}
