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

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      title: String(formData.get("title") ?? ""),
      organization: String(formData.get("organization") ?? ""),
      email: String(formData.get("email") ?? ""),
      interest: String(formData.get("interest") ?? ""),
      message: String(formData.get("message") ?? ""),
      company_website: String(formData.get("company_website") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setFormState("error");
        return;
      }

      setFormState("success");
      form.reset();
    } catch {
      setErrorMessage("Unable to send your message. Please try again or email us directly.");
      setFormState("error");
    }
  }

  if (formState === "success") {
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
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input
          type="text"
          id="company_website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

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
            disabled={formState === "submitting"}
            className="mt-1 block w-full rounded-md border border-stone-300 px-4 py-3 text-ink shadow-sm focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson disabled:bg-stone-50"
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
            disabled={formState === "submitting"}
            className="mt-1 block w-full rounded-md border border-stone-300 px-4 py-3 text-ink shadow-sm focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson disabled:bg-stone-50"
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
            disabled={formState === "submitting"}
            className="mt-1 block w-full rounded-md border border-stone-300 px-4 py-3 text-ink shadow-sm focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson disabled:bg-stone-50"
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
            disabled={formState === "submitting"}
            className="mt-1 block w-full rounded-md border border-stone-300 px-4 py-3 text-ink shadow-sm focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson disabled:bg-stone-50"
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
          disabled={formState === "submitting"}
          className="mt-1 block w-full rounded-md border border-stone-300 px-4 py-3 text-ink shadow-sm focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson disabled:bg-stone-50"
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
          disabled={formState === "submitting"}
          placeholder="What are you evaluating or trying to build?"
          className="mt-1 block w-full rounded-md border border-stone-300 px-4 py-3 text-ink shadow-sm focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson disabled:bg-stone-50"
        />
      </div>

      {formState === "error" && errorMessage ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={formState === "submitting"}
        className="w-full rounded-md bg-crimson px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-crimson-dark disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
      >
        {formState === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
