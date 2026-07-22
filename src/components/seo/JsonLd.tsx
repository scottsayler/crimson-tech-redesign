import type { SchemaNode } from "@/lib/schema";

export function JsonLd({ data }: { data: SchemaNode }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
