import NextLink from "next/link";
import type { ComponentProps } from "react";

type SafeLinkProps = ComponentProps<typeof NextLink>;

export default function SafeLink({ href, ...rest }: SafeLinkProps) {
  const isString = typeof href === "string";
  if (isString && (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:"))) {
    return <a href={href} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }
  return <NextLink href={href} prefetch={false} {...rest} />;
}
