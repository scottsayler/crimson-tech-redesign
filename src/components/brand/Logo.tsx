import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

type LogoProps = {
  /** Additional classes for the link wrapper */
  className?: string;
  /** Classes applied to the logo image */
  imageClassName?: string;
  variant?: "full" | "icon";
};

const defaultImageClass = "h-7 w-auto sm:h-8 lg:h-9";

export function Logo({
  className = "",
  imageClassName = defaultImageClass,
  variant = "full",
}: LogoProps) {
  const src =
    variant === "icon" ? "/brand/logo-icon.png" : "/brand/logo.png";
  const width = variant === "icon" ? 272 : 932;
  const height = variant === "icon" ? 364 : 364;

  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label={site.name}
    >
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        priority
        unoptimized
        className={imageClassName}
      />
    </Link>
  );
}
