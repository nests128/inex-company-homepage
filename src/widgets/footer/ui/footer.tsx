import { Button, FooterLinkGroup, InexLogoMark } from "@/shared/ui"
import {
  footerBrand,
  footerContacts,
  footerDisclaimer,
  footerLegal,
  footerMainLinks,
  footerPartnershipCta,
  footerPrivacyPolicy,
  footerSocialLinks,
} from "@/entities/company"

export function Footer() {
  return (
    // Full-bleed section: dark background + section-edge border + vertical
    // padding only (design-tokens.md "풀블리드 배경 + 컨테이너 콘텐츠"). Horizontal
    // gutter lives on container-inex below.
    <footer className="dark border-t border-border bg-neutral-950 pt-10 lg:pt-[70px]">
      <div className="container-inex">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_auto] lg:gap-12">
          <div>
            {/*
              `text-white` override (not `text-foreground`): this project's
              `--foreground` is a fixed near-black value (no `.dark` token
              override exists), which is exactly `bg-neutral-950` — i.e. the
              text-logo this replaces was fully invisible here. Same
              hardcoded-light-on-dark rationale as `pill-solid-inverse` /
              `pill-outline-inverse` in `shared/ui/button.tsx`.
            */}
            <InexLogoMark
              label={footerBrand.name}
              className="mb-3.5 h-6 w-auto text-white lg:h-7"
            />
            <div className="flex flex-col gap-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
              <span className="flex items-baseline gap-1.5">
                <span className="text-white">법인명</span>
                <span>{footerLegal.companyName}</span>
              </span>
              <span className="flex items-baseline gap-1.5">
                <span className="text-white">{footerLegal.ceoLabel}</span>
                <span>{footerLegal.ceoName}</span>
              </span>
              <span className="flex items-baseline gap-1.5">
                <span className="text-white">주소</span>
                <span>{footerLegal.address}</span>
              </span>
              <span className="flex items-baseline gap-1.5">
                <span className="text-white">사업자등록번호</span>
                <span>{footerLegal.businessRegistrationNumber}</span>
              </span>
              <span className="flex items-baseline gap-1.5">
                <span className="text-white">가상자산사업자(VASP) 등록번호</span>
                <span>{footerLegal.vaspRegistrationNumber}</span>
              </span>
              <span className="flex items-baseline gap-1.5">
                <span className="text-white">{footerLegal.cpoLabel}</span>
                <span>{footerLegal.cpoName}</span>
              </span>
            </div>
            <div className="mt-3.5">
              <a
                href={footerPrivacyPolicy.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14.5px] font-medium text-white underline underline-offset-4 outline-none transition-colors hover:text-white/80 focus-visible:text-white/80"
              >
                {footerPrivacyPolicy.label}
              </a>
            </div>
            <Button
              variant="pill-solid-inverse"
              size="pill"
              render={<a href={footerPartnershipCta.href} target="_blank" rel="noopener noreferrer" />}
              className="mt-6"
            >
              {footerPartnershipCta.label}
            </Button>
          </div>

          {/*
            `[&_h2]:text-white [&_a:hover]:text-white [&_a:focus-visible]:text-white`:
            `FooterLinkGroup`'s title/hover styles use `text-foreground`, which
            (see note above) is a fixed near-black value with no dark-mode
            override, so it's invisible on this `bg-neutral-950` section as
            shipped. Overriding via the `className` prop the component already
            forwards, rather than editing the component itself (out of scope
            here). Flagging for ui-agent: `FooterLinkGroup` likely needs an
            inverse/tone variant, or the design tokens need a real `.dark`
            override block.
          */}
          {/* 메뉴/CONTACT US, grouped in their own row with a tighter gap than
              the brand column's distance from them (explicit request: "메뉴랑
              CONTACT US는 더 붙여줘"). */}
          <div className="flex flex-col gap-10 sm:flex-row sm:gap-20">
            <FooterLinkGroup
              title="메뉴"
              links={footerMainLinks}
              className="[&_a:focus-visible]:text-white [&_a:hover]:text-white [&_h2]:text-[15px] [&_h2]:text-white [&_ul]:text-[14.5px]"
            />

            <div>
              <h2 className="mb-3.5 text-[15px] font-semibold text-white">CONTACT US</h2>
              <ul className="flex flex-col gap-2.5 text-[14.5px] leading-relaxed text-muted-foreground">
                {footerContacts.map((contact) => (
                  <li key={contact.label} className="flex items-baseline gap-1.5 whitespace-nowrap">
                    <span className="text-white">{contact.label}</span>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className="outline-none transition-colors hover:text-white focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <span>{contact.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Full-bleed divider (design-tokens.md "풀블리드 배경 + 컨테이너 콘텐츠") — lives
          outside container-inex so the border-top spans the viewport, not just
          the 1330px content width. Lightened to `border-white/10` since the
          default `border-border` reads too strong against `bg-neutral-950`. */}
      <div className="mt-10 border-t border-white/10 lg:mt-12">
        {/* 협력 모델(향후 법령 제정 대비 준비 중인 기능) 공통 면책 고지 — 법무
            검토 문구 그대로, 저작권 바로 위에 별도 단락으로 배치. */}
        <div className="container-inex pt-6">
          <p className="max-w-4xl text-[12px] leading-[1.7] text-muted-foreground/80">
            {footerDisclaimer}
          </p>
        </div>
        <div className="container-inex flex flex-col gap-4 py-4 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>Copyright © 2026 {footerLegal.companyName}. All rights reserved</span>

          <ul className="flex items-center gap-3">
            {footerSocialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors outline-none hover:bg-white/20 focus-visible:bg-white/20"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- 상위 프로젝트와 동일한 외부 CDN SVG 아이콘, next/image remotePatterns 미설정 경로 */}
                  <img src={social.icon} alt="" aria-hidden="true" className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
