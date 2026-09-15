import { Link2Icon } from "lucide-react"
import { cn } from "cn"

import { Carousel, PlaceholderMedia } from "@/shared/ui"

/** Known brand hint for a social link's icon. `iconSrc` (real logo image) always wins when both are provided. */
export type TeamMemberSocialIconKey = "linkedin" | "x" | "blog"

export interface TeamMemberSocialLink {
  /** Visible label, e.g. "Linkedin", "Bluesky". Also used as the fallback accessible name. */
  label: string
  href: string
  /**
   * Hint for which generic glyph to fall back to when `iconSrc` is not
   * provided. This codebase has no brand-logo icon set bundled in
   * `lucide-react` (see `entities/company/model/footer-content.ts`, which
   * uses real CDN SVG URLs for social icons instead) — so an unset
   * `iconSrc` renders a plain link glyph regardless of `iconKey`. Kept as a
   * forward-compatible hook in case brand SVGs are wired in later.
   */
  iconKey?: TeamMemberSocialIconKey
  /** Real icon image (e.g. a CDN SVG URL, same pattern as `footerSocialLinks`). Takes precedence over `iconKey`. */
  iconSrc?: string
}

export interface TeamMember {
  name: string
  /** Role/title, shown under the name, e.g. "CEO", "CTO". */
  role: string
  /** Bio copy. Supports `\n` line breaks (rendered via `whitespace-pre-line`). */
  bio: string
  /** Headshot photo. Omit to render the placeholder box instead. */
  imageSrc?: string
  /** Alt text for `imageSrc`. Required together with it. */
  imageAlt?: string
  social?: TeamMemberSocialLink[]
}

export interface TeamSectionProps {
  eyebrow?: string
  title: string
  /** Optional supporting copy under the title. Supports `\n` line breaks. */
  subtitle?: string
  members: TeamMember[]
  className?: string
}

/**
 * "Our Team" section (`ref/company/image2.png`): title (+ optional eyebrow/
 * subtitle) followed by a responsive card grid — 4 columns desktop, 2
 * tablet, 1 mobile. A standard CSS grid handles a partial last row (e.g. 7
 * members = 3 on the last row) without any auto-fill trickery.
 *
 * Full-bleed section ownership: renders its own `<section>` (vertical
 * padding only) + `container-inex` (horizontal gutter) per this codebase's
 * widget convention (see `docs/design-tokens.md`).
 */
export function TeamSection({ eyebrow, title, subtitle, members, className }: TeamSectionProps) {
  return (
    <section className={cn("py-14 lg:py-24", className)}>
      <div className="container-inex">
        <div className="max-w-[680px] lg:max-w-none">
          {eyebrow ? (
            <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-foreground/80 lg:mb-4">
              <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-sky-500" />
              {eyebrow}
            </div>
          ) : null}
          <h2 className="text-2xl leading-[1.2] font-bold tracking-[-.015em] whitespace-pre-line lg:text-[44px] lg:leading-[1.15] lg:tracking-[-.02em] lg:whitespace-nowrap">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-4 max-w-[680px] text-[14.5px] leading-[1.6] whitespace-pre-line text-muted-foreground lg:text-[16.5px] lg:leading-[1.7]">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="mt-10 lg:mt-14">
          <Carousel
            label={title}
            prevLabel="이전 팀원"
            nextLabel="다음 팀원"
            className="[--carousel-item-width:170px] sm:[--carousel-item-width:200px] lg:[--carousel-item-width:240px]"
          >
            {members.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  )
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  const { name, role, bio, imageSrc, imageAlt, social } = member

  return (
    <div data-slot="team-member-card" className="flex flex-col">
      <PlaceholderMedia
        src={imageSrc}
        alt={imageAlt ?? `${name} 프로필 사진`}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="aspect-square w-full rounded-2xl"
      />

      <h3 className="mt-3 text-[16px] font-bold text-foreground lg:mt-4 lg:text-[17px]">
        {name}
      </h3>
      <p className="text-[13.5px] font-medium text-foreground/70">{role}</p>
      <p className="mt-2 text-[13.5px] leading-[1.55] whitespace-pre-line text-muted-foreground">
        {bio}
      </p>

      {social && social.length > 0 ? (
        <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          {social.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[14px] font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:underline focus-visible:underline-offset-4"
              >
                {item.iconSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element -- external brand-logo SVG, same pattern as footerSocialLinks
                  <img src={item.iconSrc} alt="" aria-hidden="true" className="size-4" />
                ) : (
                  <Link2Icon aria-hidden="true" className="size-4" />
                )}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
