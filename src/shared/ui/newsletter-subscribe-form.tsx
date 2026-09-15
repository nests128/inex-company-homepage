"use client"

import { useId, useState } from "react"
import { Button } from "./button"
import { Input } from "./input"
import { Checkbox } from "./checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog"
import { cn } from "cn"
import type { Locale } from "@/shared/lib/i18n"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface NewsletterFormCopy {
  errorMessages: Record<string, string>
  defaultErrorMessage: string
  placeholder: string
  submitLabel: string
  loadingLabel: string
  successMessage: string
  /** Also exposed as `NEWSLETTER_CONSENT_NOTICE_BY_LOCALE` for callers that position it outside this form (e.g. `CaseStudyBanner`'s card corner). */
  consentNotice: string
  consentLabel: string
  consentDialogTitle: string
  consentDialogDescription: string
  consentItemA: { title: string; body: string; bullets: string[] }
  consentItemB: { title: string; body: string; bullets: string[] }
  cancelLabel: string
  agreeLabel: string
}

// TODO(real-data): 「1. 광고성 정보(뉴스레터) 전송 시 준수 가이드」 최신판과 대조 필요.
// 영문 컨센트 문구는 한글 원문의 의미를 그대로 옮긴 번역이며, 법무 검토
// 문구 자체를 새로 작성한 것이 아니다.
const COPY_BY_LOCALE: Record<Locale, NewsletterFormCopy> = {
  ko: {
    errorMessages: {
      invalid_email: "올바른 이메일 주소를 입력해주세요.",
      not_configured: "지금은 구독을 받을 수 없어요. 잠시 후 다시 시도해주세요.",
      upstream_error: "일시적인 오류가 발생했어요. 잠시 후 다시 시도해주세요.",
      network_error: "네트워크 연결을 확인하고 다시 시도해주세요.",
      bad_request: "요청을 처리할 수 없어요. 다시 시도해주세요.",
    },
    defaultErrorMessage: "구독에 실패했어요. 잠시 후 다시 시도해주세요.",
    placeholder: "이메일 주소를 입력하세요",
    submitLabel: "구독하기",
    loadingLabel: "구독 처리 중...",
    successMessage: "구독해주셔서 감사합니다!",
    consentNotice: "동의 후에도 언제든 수신을 거부하거나 동의를 철회할 수 있습니다.",
    consentLabel: "(필수) 마케팅 목적 개인정보 수집·이용 및 광고성 정보 수신에 동의합니다",
    consentDialogTitle: "뉴스레터 수신 및 개인정보 처리 동의",
    consentDialogDescription:
      "뉴스레터 구독을 위해 아래 두 가지 사항에 대한 동의를 받고 있습니다. 내용을 확인하신 뒤 동의해주세요.",
    consentItemA: {
      title: "A. 마케팅 목적 개인정보 수집·이용 동의",
      body: "회사는 아래와 같이 마케팅 목적의 개인정보 수집 및 이용에 관한 동의를 받고 있습니다. 본 동의는 선택 사항이며, 동의하지 않으셔도 서비스 이용에는 제한이 없습니다. 다만, 동의를 거부하실 경우 가상자산 시장 동향 레터 발송 및 신규 서비스·이벤트 안내 등이 제한될 수 있습니다.",
      bullets: [
        "수집·이용 목적: 가상자산 시장 동향 정보 레터 발송, 신규 서비스·이벤트 안내, 고객 맞춤형 정보 제공",
        "수집 항목: 이메일 주소",
        "보유·이용 기간: 동의 철회 시까지",
      ],
    },
    consentItemB: {
      title: "B. 광고성 정보 수신 동의",
      body: "회사가 전송하는 광고성 정보(가상자산 동향 레터, 이벤트·혜택 안내 등)를 수신하는 데 대한 동의입니다. 본 동의는 선택 사항이며, 동의하지 않으셔도 서비스 이용에는 제한이 없습니다.",
      bullets: [
        "전송 매체: 이메일 수신 동의",
        "수신 동의 후에도 언제든지 수신을 거부하거나 동의를 철회하실 수 있으며, 회사는 수신 동의일부터 2년마다 수신 동의 유지 여부를 확인합니다.",
        "수신 거부·철회 방법: 광고성 정보 발송 메일 내 수신거부 링크",
      ],
    },
    cancelLabel: "취소",
    agreeLabel: "동의합니다",
  },
  en: {
    errorMessages: {
      invalid_email: "Please enter a valid email address.",
      not_configured: "We can't accept subscriptions right now. Please try again shortly.",
      upstream_error: "A temporary error occurred. Please try again shortly.",
      network_error: "Please check your network connection and try again.",
      bad_request: "We couldn't process that request. Please try again.",
    },
    defaultErrorMessage: "Subscription failed. Please try again shortly.",
    placeholder: "Enter your email address",
    submitLabel: "Subscribe",
    loadingLabel: "Subscribing...",
    successMessage: "Thanks for subscribing!",
    consentNotice: "You can opt out or withdraw consent at any time after agreeing.",
    consentLabel:
      "(Required) I agree to the collection/use of personal information for marketing purposes and to receive promotional information",
    consentDialogTitle: "Newsletter & Personal Information Consent",
    consentDialogDescription:
      "Subscribing to the newsletter requires consent to the two items below. Please review them before agreeing.",
    consentItemA: {
      title: "A. Consent to Collection/Use of Personal Information for Marketing",
      body: "We collect and use personal information for marketing purposes as described below. This consent is optional, and declining it does not limit your use of the service. However, declining may limit delivery of digital asset market trend letters and notices about new services/events.",
      bullets: [
        "Purpose: Sending digital asset market trend letters, notices about new services/events, personalized information",
        "Items collected: Email address",
        "Retention period: Until consent is withdrawn",
      ],
    },
    consentItemB: {
      title: "B. Consent to Receive Promotional Information",
      body: "This is consent to receive promotional information sent by the company (digital asset trend letters, event/benefit notices, etc.). This consent is optional, and declining it does not limit your use of the service.",
      bullets: [
        "Delivery channel: Email",
        "You may opt out or withdraw consent at any time after agreeing; we reconfirm consent every 2 years from the date of agreement.",
        "How to opt out: Unsubscribe link in each promotional email",
      ],
    },
    cancelLabel: "Cancel",
    agreeLabel: "I agree",
  },
}

function getErrorMessage(copy: NewsletterFormCopy, code: string | undefined) {
  if (!code) return copy.defaultErrorMessage
  return copy.errorMessages[code] ?? copy.defaultErrorMessage
}

type SubscribeStatus = "idle" | "loading" | "done"

interface NewsletterSubscribeFormProps {
  locale: Locale
  /** Visual tone for the surface this form is placed on. Defaults to `"light"`. */
  tone?: "light" | "dark"
  placeholder?: string
  submitLabel?: string
  loadingLabel?: string
  successMessage?: string
  /** Short consent notice shown under the form. Pass `null` to omit it. Defaults to the locale's own notice. */
  consentNotice?: string | null
  className?: string
}

function NewsletterSubscribeForm({
  locale,
  tone = "light",
  placeholder,
  submitLabel,
  loadingLabel,
  successMessage,
  consentNotice,
  className,
}: NewsletterSubscribeFormProps) {
  const copy = COPY_BY_LOCALE[locale]
  placeholder ??= copy.placeholder
  submitLabel ??= copy.submitLabel
  loadingLabel ??= copy.loadingLabel
  successMessage ??= copy.successMessage
  if (consentNotice === undefined) consentNotice = copy.consentNotice
  const [email, setEmail] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [consentOpen, setConsentOpen] = useState(false)
  const [status, setStatus] = useState<SubscribeStatus>("idle")
  const [error, setError] = useState<string | null>(null)

  const inputId = useId()
  const errorId = useId()
  const consentId = useId()
  const consentLabelId = useId()

  const isDark = tone === "dark"

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === "loading" || !agreed) return

    if (!EMAIL_RE.test(email)) {
      setError(getErrorMessage(copy, "invalid_email"))
      return
    }

    setStatus("loading")
    setError(null)

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json().catch(() => null)

      if (res.ok && data?.code === "0") {
        setStatus("done")
      } else {
        setError(getErrorMessage(copy, data?.code))
        setStatus("idle")
      }
    } catch {
      setError(getErrorMessage(copy, "network_error"))
      setStatus("idle")
    }
  }

  if (status === "done") {
    return (
      <div
        role="status"
        className={cn(
          "flex h-11 items-center rounded-full border px-5 text-sm font-medium",
          isDark
            ? "border-white/30 text-white"
            : "border-border text-foreground",
          className
        )}
      >
        {successMessage}
      </div>
    )
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-3 flex items-start gap-2">
        <Checkbox
          id={consentId}
          checked={agreed}
          onCheckedChange={(checked) => {
            if (checked) {
              setConsentOpen(true)
              return
            }
            setAgreed(false)
          }}
          disabled={status === "loading"}
          className={cn(
            "mt-0.5 bg-white",
            isDark &&
              "border-white/40 data-checked:border-white data-checked:bg-white data-checked:text-foreground focus-visible:ring-white/30"
          )}
        />
        <label
          id={consentLabelId}
          htmlFor={consentId}
          className={cn(
            "cursor-pointer text-[13.5px] font-medium",
            isDark ? "text-white/80" : "text-foreground"
          )}
        >
          {copy.consentLabel}
        </label>
      </div>
      <Dialog open={consentOpen} onOpenChange={setConsentOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{copy.consentDialogTitle}</DialogTitle>
            <DialogDescription>{copy.consentDialogDescription}</DialogDescription>
          </DialogHeader>
          <div className="flex max-h-[65vh] flex-col gap-5 overflow-y-auto pr-1 text-sm">
            {[copy.consentItemA, copy.consentItemB].map((item) => (
              <div key={item.title} className="flex flex-col gap-2">
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.body}</p>
                <ul className="flex flex-col gap-1 text-muted-foreground">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-1.5">
                      <span aria-hidden>-</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConsentOpen(false)}
            >
              {copy.cancelLabel}
            </Button>
            <Button
              type="button"
              onClick={() => {
                setAgreed(true)
                setConsentOpen(false)
              }}
            >
              {copy.agreeLabel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-3 sm:flex-row sm:items-start"
      >
        <div className="flex-1">
          <label htmlFor={inputId} className="sr-only">
            {placeholder}
          </label>
          <Input
            id={inputId}
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            disabled={status === "loading" || !agreed}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : !agreed ? consentLabelId : undefined
            }
            className={cn(
              "h-11 rounded-full px-5",
              agreed && "bg-white",
              isDark &&
                "border-white/30 bg-white/5 text-white placeholder:text-white/50 focus-visible:border-white/60 focus-visible:ring-white/20 disabled:bg-white/5",
              isDark && agreed && "bg-white text-foreground placeholder:text-foreground/50"
            )}
          />
        </div>
        <Button
          type="submit"
          variant={isDark ? "pill-solid-inverse" : "pill-solid"}
          size="pill"
          disabled={status === "loading" || !agreed || !email}
          className={cn("shrink-0", agreed && "bg-black text-white hover:bg-black/85")}
        >
          {status === "loading" ? loadingLabel : submitLabel}
        </Button>
      </form>
      {error ? (
        <p
          id={errorId}
          role="alert"
          className={cn(
            "mt-2 text-xs",
            isDark ? "text-red-300" : "text-destructive"
          )}
        >
          {error}
        </p>
      ) : consentNotice ? (
        <p
          className={cn(
            "mt-2 text-xs",
            isDark ? "text-white/50" : "text-muted-foreground"
          )}
        >
          {consentNotice}
        </p>
      ) : null}
    </div>
  )
}

const NEWSLETTER_CONSENT_NOTICE_BY_LOCALE: Record<Locale, string> = {
  ko: COPY_BY_LOCALE.ko.consentNotice,
  en: COPY_BY_LOCALE.en.consentNotice,
}

export {
  NewsletterSubscribeForm,
  type NewsletterSubscribeFormProps,
  NEWSLETTER_CONSENT_NOTICE_BY_LOCALE,
}
