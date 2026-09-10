import type { ReactNode } from "react"
import Image from "next/image"
import { cn } from "cn"

import { PlaceholderMedia } from "@/shared/ui"

export interface MissionSectionProps {
  /** Small label above the title, e.g. "Vision". */
  eyebrow?: string
  /** Section title. Supports `\n` line breaks (rendered via `whitespace-pre-line`). */
  title: string
  /** Body paragraphs, rendered as separate `<p>` blocks. Each string may itself contain `\n` line breaks. */
  paragraphs: string[]
  /** Signer's name, shown under the signature in bold. Omit (with `signatureRole`) to drop the signature block entirely. */
  signatureName?: string
  /** Signer's role/title, shown under `signatureName`. */
  signatureRole?: string
  /**
   * Optional handwritten-style signature image, rendered via `next/image`.
   * When omitted, only the bold name + role text renders (no fake-handwriting
   * substitute). Caution: this repo has `images.dangerouslyAllowSVG` off
   * (see `docs/design-tokens.md`), so `next/image` will refuse to optimize an
   * `.svg` source — prefer a raster asset (PNG/WebP) here, or pass
   * `unoptimized` at the call site if only an SVG signature is available.
   */
  signatureImageSrc?: string
  /** Alt text for `signatureImageSrc` (required together with it). */
  signatureImageAlt?: string
  /** Right-column photo. Ignored when `visual` is provided. */
  imageSrc: string
  /** Alt text for the right-column photo. Ignored when `visual` is provided. */
  imageAlt: string
  /**
   * Arbitrary content replacing the right-column photo entirely (e.g. a
   * decorative `WorldMap`). Takes precedence over `imageSrc`/`imageAlt` when
   * provided; those remain available as the photo fallback once a real
   * office/team photo exists.
   */
  visual?: ReactNode
  className?: string
}

/**
 * Two-column "Our Mission" section (`ref/company/image.png`): eyebrow + title
 * + body paragraphs + signature block on the left, a large photo on the
 * right. Stacks to a single column on mobile (photo first, per the layout
 * reference's note that either order is acceptable — placed above the text
 * here since that reads best when stacked).
 *
 * Full-bleed section ownership: this component renders its own `<section>`
 * (vertical padding only) + `container-inex` (horizontal gutter), matching
 * the rest of this codebase's widgets (see `docs/design-tokens.md` "풀블리드
 * 배경 + 컨테이너 콘텐츠" and e.g. `widgets/operations-split`).
 */
export function MissionSection({
  eyebrow,
  title,
  paragraphs,
  signatureName,
  signatureRole,
  signatureImageSrc,
  signatureImageAlt,
  imageSrc,
  imageAlt,
  visual,
  className,
}: MissionSectionProps) {
  return (
    <section className={cn("py-14 lg:py-24", className)}>
      <div className="container-inex grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 lg:order-1">
          {eyebrow ? (
            <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-foreground/80 lg:mb-4">
              <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-sky-500" />
              {eyebrow}
            </div>
          ) : null}
          <h2 className="text-2xl leading-[1.2] font-bold tracking-[-.015em] whitespace-pre-line lg:text-[44px] lg:leading-[1.15] lg:tracking-[-.02em]">
            {title}
          </h2>

          <div className="mt-5 flex flex-col gap-4 lg:mt-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-[14.5px] leading-[1.65] whitespace-pre-line text-muted-foreground lg:text-[16.5px] lg:leading-[1.7]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {signatureName || signatureRole ? (
            <div className="mt-8 lg:mt-10">
              {signatureImageSrc ? (
                <Image
                  src={signatureImageSrc}
                  alt={signatureImageAlt ?? `${signatureName} 서명`}
                  width={180}
                  height={70}
                  className="mb-2 h-[52px] w-auto object-contain object-left lg:h-[64px]"
                />
              ) : null}
              {signatureName ? (
                <p className="text-[14.5px] font-bold text-foreground">{signatureName}</p>
              ) : null}
              {signatureRole ? (
                <p className="text-[13.5px] text-muted-foreground">{signatureRole}</p>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="order-1 lg:order-2">
          {visual ?? (
            <PlaceholderMedia
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="aspect-[4/3] w-full rounded-2xl lg:aspect-square"
            />
          )}
        </div>
      </div>
    </section>
  )
}
