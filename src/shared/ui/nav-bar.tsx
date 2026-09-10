"use client"

import * as React from "react"
import type { ReactNode } from "react"
import { ChevronRightIcon, MenuIcon } from "lucide-react"
import { cn } from "cn"

import { Button } from "@/shared/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/shared/ui/navigation-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet"

/** A single mega-menu entry (e.g. "크립토 트레이딩" solution card). */
export interface NavMegaMenuItem {
  label: string
  description: string
  href: string
  /** Small icon/glyph slot rendered in the 38x38 dark tile. Content is caller's concern. */
  icon?: ReactNode
}

/** A plain top-level nav link (e.g. "회사소개", "API 문서"). */
export interface NavLinkItem {
  type?: "link"
  label: string
  href: string
  /** Opens in a new tab (`target="_blank" rel="noopener noreferrer"`) — for links to external sites (docs, career board) rather than in-app routes. */
  external?: boolean
}

/** A top-level nav item that opens a mega-menu dropdown (e.g. "솔루션"). */
export interface NavMegaMenuGroup {
  type: "mega"
  label: string
  items: NavMegaMenuItem[]
  /** Optional footer row inside the dropdown, e.g. "파트너십 문의 →". */
  footer?: {
    label: string
    cta: {
      label: string
      href: string
      external?: boolean
    }
  }
}

export type NavItem = NavLinkItem | NavMegaMenuGroup

export interface NavBarProps
  extends Omit<React.ComponentPropsWithoutRef<"header">, "children"> {
  /** Logo slot — typically a wordmark or `next/image` logo. Content is caller's concern. */
  logo: ReactNode
  /** Top-level nav items, rendered left-to-right (plain links and/or mega-menu groups). */
  items: NavItem[]
  /** Optional language display, e.g. "KO". Purely a label — no functional switcher. */
  languageLabel?: string
  /** CTA button slot rendered at the end of the bar (desktop) and in the mobile sheet footer. */
  cta?: ReactNode
  /** Accessible label for the mobile menu trigger. Defaults to "메뉴 열기". */
  mobileMenuLabel?: string
}

function isMegaGroup(item: NavItem): item is NavMegaMenuGroup {
  return item.type === "mega"
}

type ConsecutiveGroup =
  | { type: "mega-group"; items: NavMegaMenuGroup[] }
  | { type: "link-group"; items: NavLinkItem[] }

/**
 * Splits `items` into consecutive runs of the same kind, so the mobile sheet
 * can render mega-menu groups inside their own `<Accordion>` without
 * interleaving unrelated plain links as accordion children.
 */
function groupConsecutiveItems(items: NavItem[]): ConsecutiveGroup[] {
  const groups: ConsecutiveGroup[] = []
  for (const item of items) {
    const last = groups[groups.length - 1]
    if (isMegaGroup(item)) {
      if (last?.type === "mega-group") {
        last.items.push(item)
      } else {
        groups.push({ type: "mega-group", items: [item] })
      }
    } else {
      if (last?.type === "link-group") {
        last.items.push(item)
      } else {
        groups.push({ type: "link-group", items: [item] })
      }
    }
  }
  return groups
}

/**
 * Site navigation bar with a hover mega-menu on desktop (wireframe ~L46-87)
 * and a slide-out sheet with an accordion mega-menu on mobile (~L325-328).
 * All copy/links/logo are supplied by the caller (page-agent).
 */
function NavBar({
  logo,
  items,
  languageLabel,
  cta,
  mobileMenuLabel = "메뉴 열기",
  className,
  ...props
}: NavBarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <header
      data-slot="nav-bar"
      className={cn(
        "flex items-center justify-between border-b border-border px-[18px] py-3.5 lg:px-14 lg:py-2",
        className
      )}
      {...props}
    >
      <div className="text-xl font-bold tracking-[.02em] lg:text-[22px]">
        {logo}
      </div>

      {/* Desktop nav */}
      <div className="hidden items-center gap-8 lg:flex">
        <NavigationMenu className="max-w-none flex-none justify-start">
          <NavigationMenuList className="gap-8">
            {items.map((item) =>
              isMegaGroup(item) ? (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuTrigger className="h-auto rounded-none p-0 text-[14.5px] font-medium text-foreground hover:bg-transparent focus:bg-transparent data-open:bg-transparent data-popup-open:bg-transparent data-popup-open:hover:bg-transparent">
                    {item.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-[340px] p-2.5">
                    <ul className="flex flex-col gap-0.5">
                      {item.items.map((sub) => (
                        <li key={sub.label}>
                          <NavigationMenuLink
                            href={sub.href}
                            className="items-start gap-3.5 rounded-xl p-3.5 hover:bg-muted"
                          >
                            {sub.icon ? (
                              <span className="flex size-[38px] shrink-0 items-center justify-center rounded-[10px] bg-foreground text-background">
                                {sub.icon}
                              </span>
                            ) : null}
                            <span className="flex flex-col">
                              <span className="text-[14.5px] font-bold text-foreground">
                                {sub.label}
                              </span>
                              <span className="mt-0.5 text-[12.5px] leading-relaxed text-muted-foreground">
                                {sub.description}
                              </span>
                            </span>
                            <ChevronRightIcon
                              aria-hidden="true"
                              className="ml-auto size-3.5! self-center text-muted-foreground"
                            />
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                    {item.footer ? (
                      <div className="mt-1.5 flex items-center justify-between border-t border-border px-2.5 pt-3 pb-1">
                        <span className="text-[12.5px] text-muted-foreground">
                          {item.footer.label}
                        </span>
                        <a
                          href={item.footer.cta.href}
                          target={item.footer.cta.external ? "_blank" : undefined}
                          rel={item.footer.cta.external ? "noopener noreferrer" : undefined}
                          className="border-b-[1.5px] border-foreground pb-px text-[12.5px] font-bold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                        >
                          {item.footer.cta.label}
                        </a>
                      </div>
                    ) : null}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="rounded-none p-0 text-[14.5px] font-medium text-foreground hover:bg-transparent hover:text-muted-foreground"
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {languageLabel ? (
          <span className="ml-2 text-sm text-muted-foreground">
            {languageLabel}
          </span>
        ) : null}

        {cta}
      </div>

      {/* Mobile trigger */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              className="size-11 lg:hidden"
              aria-label={mobileMenuLabel}
            />
          }
        >
          <MenuIcon aria-hidden="true" />
        </SheetTrigger>
        <SheetContent side="right" className="flex w-[86%] flex-col gap-0 p-0">
          <SheetHeader className="border-b border-border p-4">
            <SheetTitle className="text-lg font-bold">{logo}</SheetTitle>
          </SheetHeader>

          <nav className="flex-1 overflow-y-auto p-2">
            {/*
              Base UI's Accordion manages composite keyboard navigation across
              its own AccordionItems, so plain links must not be interleaved
              as direct children — each contiguous run of items is grouped
              into its own <Accordion> or plain link list instead.
            */}
            {groupConsecutiveItems(items).map((group, groupIndex) =>
              group.type === "mega-group" ? (
                <Accordion key={`mega-${groupIndex}`} className="gap-0">
                  {group.items.map((item) => (
                    <AccordionItem key={item.label} value={item.label}>
                      <AccordionTrigger className="px-3 text-base font-semibold">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent className="px-3">
                        <ul className="flex flex-col gap-3">
                          {item.items.map((sub) => (
                            <li key={sub.label}>
                              <a
                                href={sub.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex flex-col gap-0.5 rounded-lg py-1.5 outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                              >
                                <span className="text-sm font-semibold text-foreground">
                                  {sub.label}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {sub.description}
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <ul key={`links-${groupIndex}`}>
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <SheetClose
                        nativeButton={false}
                        render={
                          <a
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noopener noreferrer" : undefined}
                            className="block border-b px-3 py-3 text-base font-semibold text-foreground outline-none not-last:border-border focus-visible:ring-2 focus-visible:ring-ring/50"
                          />
                        }
                      >
                        {item.label}
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              )
            )}
          </nav>

          <div className="flex flex-col gap-3 border-t border-border p-4">
            {languageLabel ? (
              <span className="text-sm text-muted-foreground">
                {languageLabel}
              </span>
            ) : null}
            {cta}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export { NavBar }
