import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion"
import { Reveal } from "./reveal"

export interface FaqSectionItem {
  question: string
  answer: string
}

export interface FaqSectionProps {
  eyebrow: string
  title: string
  items: FaqSectionItem[]
}

/**
 * 솔루션 상세 페이지 공용 FAQ 섹션. AEO(Answer Engine Optimization) 대응 —
 * 눈에 보이는 아코디언과 별개로 `FAQPage` JSON-LD를 함께 심어 검색/AI 답변
 * 엔진이 "질문-답" 쌍을 그대로 인용할 수 있게 한다. JSON-LD는 `<` 이스케이프로
 * XSS를 방지(Next 공식 JSON-LD 가이드 패턴, `dangerouslySetInnerHTML`은
 * `JSON.stringify` 결과를 스스로 sanitize하지 않으므로 필수).
 */
export function FaqSection({ eyebrow, title, items }: FaqSectionProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <section className="py-14 lg:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="container-inex">
        <Reveal as="div" className="max-w-2xl">
          <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-foreground/80 lg:mb-4">
            <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-sky-500" />
            {eyebrow}
          </div>
          <h2 className="text-2xl leading-[1.2] tracking-[-.015em] lg:text-[36px] lg:leading-[1.2] lg:tracking-[-.02em]">
            {title}
          </h2>
        </Reveal>

        <Reveal as="div" delay={0.1} className="mt-10 max-w-3xl lg:mt-14">
          <Accordion>
            {items.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger className="py-4 text-[15px] font-semibold lg:text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-[14.5px] leading-[1.7] text-muted-foreground lg:text-[15.5px]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
