const steps = [
  {
    number: "01",
    title: "Assess",
    description:
      "Understand current state, constraints, stakeholders, and risks.",
  },
  {
    number: "02",
    title: "Clarify",
    description:
      "Define the real problem, success criteria, and decision framework.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Shape the roadmap, vendor shortlist, architecture, and operating model.",
  },
  {
    number: "04",
    title: "Execute",
    description:
      "Support selection, implementation, and adoption—with accountability.",
  },
];

export function ProcessSteps() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step) => (
        <div key={step.number} className="relative">
          <span className="text-4xl font-bold text-crimson/20">{step.number}</span>
          <h3 className="mt-2 text-xl font-semibold text-ink">{step.title}</h3>
          <p className="mt-2 text-ink-muted leading-relaxed">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
