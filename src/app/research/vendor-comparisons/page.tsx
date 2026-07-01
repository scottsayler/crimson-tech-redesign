import { ResearchTypeHubPage } from "@/components/sections/ResearchTypeHubPage";
import { createResearchHubMetadata } from "@/lib/research-hub";

export const metadata = createResearchHubMetadata("vendor-comparison");

export default function VendorComparisonsHubPage() {
  return <ResearchTypeHubPage type="vendor-comparison" />;
}
