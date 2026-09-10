import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "cn"

export interface RampFlowPreviewNode {
  /** Node label, e.g. "법정화폐". */
  label: string
  /** Icon rendered inside the node's round badge, e.g. a lucide-react icon. */
  icon: ReactNode
}

export interface RampFlowPreviewProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** 3-4 nodes, rendered left to right with connecting lines between them. */
  nodes: RampFlowPreviewNode[]
  className?: string
}

/**
 * Miniature horizontal flow preview for on/off-ramp payment infra — a small
 * thumbnail meant to sit under an `IconFeatureCard`'s "온/오프램프 결제
 * 인프라" copy. Much simpler than `FlowDiagram`: no SVG bezier paths or
 * SMIL pulse animation, just round icon badges connected by a static line,
 * in this project's default light + sky-blue tone (unlike the two trading
 * previews, which stay on the dark terminal exception).
 */
function RampFlowPreview({ nodes, className, ...props }: RampFlowPreviewProps) {
  return (
    <div
      data-slot="ramp-flow-preview"
      className={cn(
        "flex w-full items-center justify-between rounded-xl border border-border bg-white px-4 py-5",
        className
      )}
      {...props}
    >
      {nodes.map((node, index) => (
        <div key={node.label} className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600 [&_svg]:size-4"
            >
              {node.icon}
            </span>
            <span className="text-[10px] font-medium whitespace-nowrap text-muted-foreground">
              {node.label}
            </span>
          </div>
          {index < nodes.length - 1 && (
            <div aria-hidden="true" className="mx-1.5 h-px flex-1 bg-border" />
          )}
        </div>
      ))}
    </div>
  )
}

export { RampFlowPreview }
