import { type ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  children,
  className = "",
  id,
  variant = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "muted" | "crimson" | "dark";
}) {
  const variants = {
    default: "bg-white",
    muted: "bg-stone-50",
    crimson: "bg-crimson-50",
    dark: "bg-ink text-white",
  };

  return (
    <section id={id} className={`py-16 md:py-24 ${variants[variant]} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
