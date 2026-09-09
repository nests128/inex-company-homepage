import type { ComponentPropsWithoutRef } from "react"
import { cn } from "cn"

export interface FooterLinkItem {
  label: string
  href?: string
}

export interface FooterLinkGroupProps
  extends ComponentPropsWithoutRef<"div"> {
  title: string
  links: FooterLinkItem[]
}

function FooterLinkGroup({
  title,
  links,
  className,
  ...props
}: FooterLinkGroupProps) {
  return (
    <div data-slot="footer-link-group" className={cn(className)} {...props}>
      <h2 className="mb-3.5 text-sm font-semibold text-foreground">
        {title}
      </h2>
      <ul className="flex flex-col gap-2.5 text-[13.5px] leading-relaxed text-muted-foreground">
        {links.map((link) =>
          link.href ? (
            <li key={link.label}>
              <a
                href={link.href}
                className="outline-none transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:underline focus-visible:underline-offset-4"
              >
                {link.label}
              </a>
            </li>
          ) : (
            <li key={link.label}>{link.label}</li>
          )
        )}
      </ul>
    </div>
  )
}

export { FooterLinkGroup }
