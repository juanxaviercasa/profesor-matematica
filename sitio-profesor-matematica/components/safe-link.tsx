import NextLink from "next/link";
import type { ComponentProps } from "react";

type SafeLinkProps = ComponentProps<typeof NextLink>;

export default function SafeLink({ href, ...rest }: SafeLinkProps) {
  // Prefer native navigation for string URLs: it remains reliable even if the
  // client-side router cannot hydrate or fails during a Worker deployment.
  if (typeof href === "string") {
    return <a href={href} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }
  return <NextLink href={href} prefetch={false} {...rest} />;
}
