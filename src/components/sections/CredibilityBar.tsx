import { credentialStats } from "@/content/credibility";

export function CredibilityBar() {
  return (
    <section className="border-y border-stone-200 bg-stone-50 py-10">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {credentialStats.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-semibold tracking-tight text-crimson md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">{stat.label}</p>
              <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
