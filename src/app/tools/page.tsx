import { permanentRedirect } from "next/navigation";

/** Hub content now lives at /decision-center. Individual tools remain at /tools/[slug]. */
export default function ToolsHubRedirectPage() {
  permanentRedirect("/decision-center");
}
