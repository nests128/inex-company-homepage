// Page-local section: "실제 운영중인 보안 체계" 소개 + ISMS 인증 마크.
// 처음엔 사용자가 붙여넣은 인라인 SVG(`IsmsBadgeMark`)를 다크/그라데이션
// 칩으로 감싸 썼으나, 사용자 요청(2026-09-14: "cdn.inexcoin.com/.../isms.svg
// 이걸로 해")에 따라 실제 운영 CDN의 완결된 로고 이미지로 교체하고, 배경
// 칩도 제거했다("이미지에 배경 빼고"). 이어서 헤딩 아래 배치를 헤딩 우측
// 2단 그리드로 재배치("우측에 로고 두자"). CDN 도메인(cdn.inexcoin.com)은
// next.config.ts에 이미 허용돼 있지만 그 프록시는 `/homepage` 베이스 경로
// 전용이라 이 URL과 겹치지 않아, 여기선 원본 URL을 직접 참조하는 plain
// `<img>`를 쓴다(SVG는 next/image 최적화 대상도 아님).
import { Reveal } from "@/shared/ui";
import { custodyProvenContent } from "@/entities/company";

const ISMS_BADGE_SRC = "https://cdn.inexcoin.com/service/common/isms.svg";

export function ProvenSection() {
  return (
    <section className="py-14 lg:py-24">
      <div className="container-inex grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-20">
        <Reveal as="div">
          <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-foreground/80 lg:mb-4">
            <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-sky-500" />
            {custodyProvenContent.eyebrow}
          </div>
          <h2 className="text-2xl leading-[1.2] tracking-[-.015em] lg:text-[36px] lg:leading-[1.2] lg:tracking-[-.02em]">
            {custodyProvenContent.title}
          </h2>
          <p className="mt-4 max-w-2xl text-[14.5px] leading-[1.6] text-muted-foreground lg:text-[16.5px] lg:leading-[1.7]">
            {custodyProvenContent.description}
          </p>
        </Reveal>

        <Reveal as="div" delay={0.1} className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element -- 외부 CDN SVG, next/image 최적화 대상 아님 */}
          <img src={ISMS_BADGE_SRC} alt="ISMS 인증 마크" className="h-28 w-auto lg:h-40" />
        </Reveal>
      </div>
    </section>
  );
}
