import { cn } from "cn";

export interface GlobeVisualProps {
  className?: string;
}

/**
 * Static SVG "globe" illustration — latitude/longitude rings + two bright
 * orbital trails, animated via flowing dashed strokes (`.globe-flow` in
 * `app/globals.css`). Ported from a 21st.dev community component the user
 * pasted directly (no library dependency — pure SVG/CSS, unlike the
 * WebGL-based `cobe` alternative that was the other option). Used as the
 * `SolutionHero` `visual` slot on the 스테이블코인 결제 page to evoke
 * global payment rails, in place of a screenshot.
 */
export function GlobeVisual({ className }: GlobeVisualProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg viewBox="0 0 300 300" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="globe-trail-bright" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="globe-trail-dim" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {[...Array(6)].map((_, i) => (
          <ellipse
            key={`lat-${i}`}
            cx="150"
            cy="150"
            rx={120}
            ry={40 + i * 12}
            stroke="url(#globe-trail-dim)"
            strokeWidth="1.2"
            fill="none"
            strokeDasharray="5 5"
            opacity={0.8}
            transform="rotate(-25,150,150)"
            className="globe-flow"
            style={{ animationDuration: "10s" }}
          />
        ))}

        {[...Array(8)].map((_, i) => (
          <path
            key={`lon-${i}`}
            d="M150,30 A120,120 0 0,1 150,270"
            stroke="url(#globe-trail-dim)"
            strokeWidth="1.2"
            fill="none"
            strokeDasharray="4 4"
            opacity={0.8}
            transform={`rotate(${i * 22.5},150,150)`}
            className="globe-flow"
            style={{ animationDuration: "12s", animationDirection: "reverse" }}
          />
        ))}

        <ellipse
          cx="150"
          cy="150"
          rx="140"
          ry="60"
          stroke="url(#globe-trail-bright)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="10 10"
          transform="rotate(20,150,150)"
          className="globe-flow"
          style={{ animationDuration: "14s" }}
        />
        <ellipse
          cx="150"
          cy="150"
          rx="130"
          ry="50"
          stroke="url(#globe-trail-dim)"
          strokeWidth="2.5"
          fill="none"
          strokeDasharray="12 12"
          opacity="0.9"
          transform="rotate(-40,150,150)"
          className="globe-flow"
          style={{ animationDuration: "9s", animationDirection: "reverse" }}
        />
      </svg>
    </div>
  );
}
