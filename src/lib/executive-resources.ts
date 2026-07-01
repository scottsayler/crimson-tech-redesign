import type { ExecutiveResourceItem, Research } from "@/content/research";

export function getExecutiveResources(
  item: Pick<Research, "executiveResources">
): ExecutiveResourceItem[] {
  return item.executiveResources ?? [];
}

export function getLocalExecutiveResourcePaths(
  resources: ExecutiveResourceItem[]
): string[] {
  return resources
    .map((resource) => resource.filePath)
    .filter((path) => !path.startsWith("http"));
}

export function uniqueExecutiveResources(
  resources: ExecutiveResourceItem[]
): ExecutiveResourceItem[] {
  const seen = new Set<string>();
  return resources.filter((resource) => {
    if (seen.has(resource.filePath)) return false;
    seen.add(resource.filePath);
    return true;
  });
}
