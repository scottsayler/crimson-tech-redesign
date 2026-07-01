import { ResearchTypeHubPage } from "@/components/sections/ResearchTypeHubPage";
import { createResearchHubMetadata } from "@/lib/research-hub";

export const metadata = createResearchHubMetadata("problem-page");

export default function ProblemsHubPage() {
  return <ResearchTypeHubPage type="problem-page" />;
}
