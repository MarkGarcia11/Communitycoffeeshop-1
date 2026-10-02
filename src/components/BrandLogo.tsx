import { brand } from "../brand";
import { cn } from "../utils/cn";

interface BrandLogoProps {
  className?: string;
  tone?: "green" | "white" | "inherit";
  format?: "signature" | "mark";
  decorative?: boolean;
}

export function BrandLogo({
  className,
  tone = "green",
  format = "signature",
  decorative = false,
}: BrandLogoProps) {
  const source = format === "mark" ? brand.logo.markSource : brand.logo.source;

  return (
    <span
      className={cn("brand-logo", `brand-logo--${tone}`, className)}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "Shoresh, a well caffeinated shtibl"}
      aria-hidden={decorative || undefined}
      // This is trusted, bundled artwork, never user-provided HTML.
      dangerouslySetInnerHTML={{
        __html: source.replace("<svg ", '<svg aria-hidden="true" focusable="false" '),
      }}
    />
  );
}