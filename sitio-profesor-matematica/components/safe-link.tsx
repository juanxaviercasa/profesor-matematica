import type { AnchorHTMLAttributes } from "react";

type SafeLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

export default function SafeLink(props: SafeLinkProps) {
  return <a {...props} />;
}
