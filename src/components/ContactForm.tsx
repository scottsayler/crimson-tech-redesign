"use client";

import { useState } from "react";

const interests = [
  "Technology Advisory",
  "Crimson CX",
  "AI & Workflow Automation",
  "Communications & Collaboration",
  "Digital Products",
  "Other",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-stone-200 bg-stone-50 p-8 text-center">
        <h3 className="text-xl font-semibold text-ink">Thank you for reaching out.</h3>
        <p className="mt-2 text-ink-muted">
          We will respond within one business day with a direct next step.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full rounded-md border border-stone-300 px-4 py-3 text-ink shadow-sm focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson"
          />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-ink">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="mt-1 block w-full rounded-md border border-stone-300 px-4 py-3 text-ink shadow-sm focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-ink">
            Organization
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            required
            className="mt-1 block w-full rounded-md border border-stone-300 px-4 py-3 text-ink shadow-sm focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border border-stone-300 px-4 py-3 text-ink shadow-sm focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson"
          />
        </div>
      </div>

      <div>
        <label htmlFor="interest" className="block text-sm font-medium text-ink">
          Primary interest
        </label>
        <select
          id="interest"
          name="interest"
          className="mt-1 block w-full rounded-md border border-stone-300 px-4 py-3 text-ink shadow-sm focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson"
        >
          {interests.map((interest) => (
            <option key={interest} value={interest}>
              {interest}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="What are you evaluating or trying to build?"
          className="mt-1 block w-full rounded-md border border-stone-300 px-4 py-3 text-ink shadow-sm focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-crimson px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-crimson-dark md:w-auto"
      >
        Send Message
      </button>
    </form>
  );
}
