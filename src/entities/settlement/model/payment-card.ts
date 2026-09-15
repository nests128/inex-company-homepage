import type { Locale } from "@/shared/lib/i18n"

// TODO(real-data): ref/image.png 스케치 영문 카피 그대로 사용 중(원본 SaaS 템플릿
// 문구, 금액/상태는 플레이스홀더). 실제 INEX Payment 데이터 확정 후 교체 필요.

interface PaymentCardContent {
  title: string
  avatarAlt: string
  amountLabel: string
  amountValue: string
  statusLabel: string
  status: string
  cta: { label: string; href: string }
}

export const paymentCardContentByLocale: Record<Locale, PaymentCardContent> = {
  ko: {
    title: "Payment",
    // TODO(real-data): 실제 사용자 아바타 사진 없음. ref/image.png 우측 상단의 원형
    // 인물 사진 자리에 대응. 실제 사진 확정 후 교체 필요.
    avatarAlt: "사용자 아바타",
    amountLabel: "Amount",
    amountValue: "$5,549.00 USD",
    statusLabel: "Status",
    status: "Scheduled",
    cta: { label: "Upload Invoice", href: "#" },
  },
  en: {
    title: "Payment",
    avatarAlt: "User avatar",
    amountLabel: "Amount",
    amountValue: "$5,549.00 USD",
    statusLabel: "Status",
    status: "Scheduled",
    cta: { label: "Upload Invoice", href: "#" },
  },
}
