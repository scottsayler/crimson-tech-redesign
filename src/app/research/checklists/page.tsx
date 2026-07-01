import { ResearchTypeHubPage } from "@/components/sections/ResearchTypeHubPage";
import { createResearchHubMetadata } from "@/lib/research-hub";

export const metadata = createResearchHubMetadata("checklist");

export default function ChecklistsHubPage() {
  return <ResearchTypeHubPage type="checklist" />;
}
