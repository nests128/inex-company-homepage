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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ERROR_MESSAGES: Record<string, string> = {
  invalid_email: "올바른 이메일 주소를 입력해주세요.",
  not_configured: "지금은 구독을 받을 수 없어요. 잠시 후 다시 시도해주세요.",
  upstream_error: "일시적인 오류가 발생했어요. 잠시 후 다시 시도해주세요.",
  network_error: "네트워크 연결을 확인하고 다시 시도해주세요.",
  bad_request: "요청을 처리할 수 없어요. 다시 시도해주세요.",
}

const DEFAULT_ERROR_MESSAGE = "구독에 실패했어요. 잠시 후 다시 시도해주세요."

function getErrorMessage(code: string | undefined) {
  if (!code) return DEFAULT_ERROR_MESSAGE
  return ERROR_MESSAGES[code] ?? DEFAULT_ERROR_MESSAGE
}

type SubscribeStatus = "idle" | "loading" | "done"

interface NewsletterSubscribeFormProps {
  /** Visual tone for the surface this form is placed on. Defaults to `"light"`. */
  tone?: "light" | "dark"
  placeholder?: string
  submitLabel?: string
  loadingLabel?: string
  successMessage?: string
  /** Short consent notice shown under the form. Pass `null` to omit it. */
  consentNotice?: string | null
  className?: string
}

const DEFAULT_PLACEHOLDER = "이메일 주소를 입력하세요"
const DEFAULT_SUBMIT_LABEL = "구독하기"
const DEFAULT_LOADING_LABEL = "구독 처리 중..."
const DEFAULT_SUCCESS_MESSAGE = "구독해주셔서 감사합니다!"
/** Also exported as `NEWSLETTER_CONSENT_NOTICE` for callers that position it outside this form (e.g. `CaseStudyBanner`'s card corner). */
const DEFAULT_CONSENT_NOTICE =
  "동의 후에도 언제든 수신을 거부하거나 동의를 철회할 수 있습니다."

const CONSENT_LABEL =
  "(필수) 마케팅 목적 개인정보 수집·이용 및 광고성 정보 수신에 동의합니다"

// TODO(real-data): 「1. 광고성 정보(뉴스레터) 전송 시 준수 가이드」 최신판과 대조 필요
const CONSENT_ITEM_A = {
  title: "A. 마케팅 목적 개인정보 수집·이용 동의",
  body: "회사는 아래와 같이 마케팅 목적의 개인정보 수집 및 이용에 관한 동의를 받고 있습니다. 본 동의는 선택 사항이며, 동의하지 않으셔도 서비스 이용에는 제한이 없습니다. 다만, 동의를 거부하실 경우 가상자산 시장 동향 레터 발송 및 신규 서비스·이벤트 안내 등이 제한될 수 있습니다.",
  bullets: [
    "수집·이용 목적: 가상자산 시장 동향 정보 레터 발송, 신규 서비스·이벤트 안내, 고객 맞춤형 정보 제공",
    "수집 항목: 이메일 주소",
    "보유·이용 기간: 동의 철회 시까지",
  ],
}

const CONSENT_ITEM_B = {
  title: "B. 광고성 정보 수신 동의",
  body: "회사가 전송하는 광고성 정보(가상자산 동향 레터, 이벤트·혜택 안내 등)를 수신하는 데 대한 동의입니다. 본 동의는 선택 사항이며, 동의하지 않으셔도 서비스 이용에는 제한이 없습니다.",
  bullets: [
    "전송 매체: 이메일 수신 동의",
    "수신 동의 후에도 언제든지 수신을 거부하거나 동의를 철회하실 수 있으며, 회사는 수신 동의일부터 2년마다 수신 동의 유지 여부를 확인합니다.",
    "수신 거부·철회 방법: 광고성 정보 발송 메일 내 수신거부 링크",
  ],
}

function NewsletterSubscribeForm({
  tone = "light",
  placeholder = DEFAULT_PLACEHOLDER,
  submitLabel = DEFAULT_SUBMIT_LABEL,
  loadingLabel = DEFAULT_LOADING_LABEL,
  successMessage = DEFAULT_SUCCESS_MESSAGE,
  consentNotice = DEFAULT_CONSENT_NOTICE,
  className,
}: NewsletterSubscribeFormProps) {
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
      setError(getErrorMessage("invalid_email"))
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
        setError(getErrorMessage(data?.code))
        setStatus("idle")
      }
    } catch {
      setError(getErrorMessage("network_error"))
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
          {CONSENT_LABEL}
        </label>
      </div>
      <Dialog open={consentOpen} onOpenChange={setConsentOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>뉴스레터 수신 및 개인정보 처리 동의</DialogTitle>
            <DialogDescription>
              뉴스레터 구독을 위해 아래 두 가지 사항에 대한 동의를 받고
              있습니다. 내용을 확인하신 뒤 동의해주세요.
            </DialogDescription>
          </DialogHeader>
          <div className="flex max-h-[65vh] flex-col gap-5 overflow-y-auto pr-1 text-sm">
            {[CONSENT_ITEM_A, CONSENT_ITEM_B].map((item) => (
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
              취소
            </Button>
            <Button
              type="button"
              onClick={() => {
                setAgreed(true)
                setConsentOpen(false)
              }}
            >
              동의합니다
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

export {
  NewsletterSubscribeForm,
  type NewsletterSubscribeFormProps,
  DEFAULT_CONSENT_NOTICE as NEWSLETTER_CONSENT_NOTICE,
}
