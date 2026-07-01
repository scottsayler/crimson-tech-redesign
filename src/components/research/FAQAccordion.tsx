"use client";

import { useState } from "react";

type FAQAccordionProps = {
  items: { question: string; answer: string }[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-stone-200 rounded-xl border border-stone-200 bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="font-medium text-ink">{item.question}</span>
              <span className="mt-0.5 shrink-0 text-crimson">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen ? (
              <div className="px-5 pb-4 text-sm leading-relaxed text-ink-muted">
                {item.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
