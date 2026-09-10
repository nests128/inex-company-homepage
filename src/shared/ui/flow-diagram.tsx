import { cn } from "cn"

export interface FlowDiagramNode {
  /** Step label, e.g. "STEP 01". */
  step: string
  /** Node title, e.g. "고객 · 가맹점". */
  title: string
  /** Highlights this node in the sky-blue accent instead of neutral white. */
  accent?: boolean
}

export interface FlowDiagramProps {
  /** Exactly 6 nodes, rendered as a serpentine 2x3 grid (desktop) or a single top-to-bottom column (mobile). */
  nodes: readonly [
    FlowDiagramNode,
    FlowDiagramNode,
    FlowDiagramNode,
    FlowDiagramNode,
    FlowDiagramNode,
    FlowDiagramNode,
  ]
  /** One-sentence summary of the whole flow, used as `aria-label` on both SVGs. */
  ariaLabel: string
  className?: string
}

const DESKTOP_VIEW_W = 600
const DESKTOP_VIEW_H = 300
const DESKTOP_NODE_W = 168
const DESKTOP_NODE_H = 84
const DESKTOP_ROW_Y = [24, DESKTOP_VIEW_H - DESKTOP_NODE_H - 24]
const DESKTOP_COL_X = [0, (DESKTOP_VIEW_W - DESKTOP_NODE_W) / 2, DESKTOP_VIEW_W - DESKTOP_NODE_W]
/** Node index -> [row, col]. Row 1 (steps 4-6) runs right-to-left, so the flow reads as a continuous serpentine (1→2→3 then drop down and 4→5→6 right under 3→2→1's positions in reverse). */
const DESKTOP_POSITIONS = [
  { row: 0, col: 0 },
  { row: 0, col: 1 },
  { row: 0, col: 2 },
  { row: 1, col: 2 },
  { row: 1, col: 1 },
  { row: 1, col: 0 },
]

const MOBILE_VIEW_W = 280
const MOBILE_NODE_W = 220
const MOBILE_NODE_H = 76
const MOBILE_GAP_Y = 34
const MOBILE_VIEW_H = MOBILE_NODE_H * 6 + MOBILE_GAP_Y * 5 + 24
const MOBILE_NODE_X = (MOBILE_VIEW_W - MOBILE_NODE_W) / 2

function bezierH(x1: number, y1: number, x2: number, y2: number) {
  const midX = (x1 + x2) / 2
  return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`
}

function bezierV(x1: number, y1: number, x2: number, y2: number) {
  const midY = (y1 + y2) / 2
  return `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`
}

/**
 * The dot fades out just before `animateMotion` loops back to the path's
 * start and fades back in right after, so the otherwise-instant snap back to
 * the beginning (SMIL loops position but not opacity) reads as the dot
 * disappearing and re-emerging rather than teleporting.
 */
function PulseDot({ path, color, begin, dur }: { path: string; color: string; begin: string; dur: string }) {
  const opacityKeyTimes = "0; 0.06; 0.88; 1"
  const fadeValues = (peak: number) => `0; ${peak}; ${peak}; 0`

  return (
    <g className="motion-reduce:hidden">
      <circle r="5" fill={color}>
        <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={path} />
        <animate
          attributeName="opacity"
          dur={dur}
          begin={begin}
          repeatCount="indefinite"
          keyTimes={opacityKeyTimes}
          values={fadeValues(0.2)}
        />
      </circle>
      <circle r="2.2" fill={color}>
        <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={path} />
        <animate
          attributeName="opacity"
          dur={dur}
          begin={begin}
          repeatCount="indefinite"
          keyTimes={opacityKeyTimes}
          values={fadeValues(1)}
        />
      </circle>
    </g>
  )
}

function NodeBox({
  x,
  y,
  width,
  height,
  step,
  title,
  accent,
}: {
  x: number
  y: number
  width: number
  height: number
  step: string
  title: string
  accent?: boolean
}) {
  return (
    <foreignObject x={x} y={y} width={width} height={height}>
      <div
        className={cn(
          "flex h-full flex-col justify-center gap-1 rounded-xl border bg-white px-4 shadow-[0_1px_3px_rgba(0,0,0,.06)]",
          accent ? "border-sky-500/40 bg-sky-50" : "border-border"
        )}
      >
        <p className={cn("text-[11.5px] font-bold tracking-[.08em]", accent ? "text-sky-600" : "text-muted-foreground")}>
          {step}
        </p>
        <p className="text-[15px] leading-tight font-bold text-foreground">{title}</p>
      </div>
    </foreignObject>
  )
}

/**
 * Serpentine (2x3, desktop) / single-column (mobile) 6-step flow diagram —
 * grew from an earlier 3-node single-row version once the flow expanded to
 * 6 explicit steps (고객·가맹점 → 온램프 → 결제 수납 → 온체인 전송 →
 * 오프램프·지급 → 정산). A single horizontal row of 6 nodes at the original
 * node width wouldn't fit the ~600px panel this renders into without either
 * overflowing (causing page scroll) or shrinking nodes below a legible text
 * size — so desktop wraps to a second row instead, laid out as a serpentine
 * (row 2 flows right-to-left, directly continuing row 1's left-to-right
 * order) rather than two independent left-to-right rows, so the connector
 * between step 3 and step 4 is a short vertical hook at the shared right
 * edge instead of a long line sweeping back across the full width.
 *
 * Two separate SVGs (not one reflowed SVG) because a fixed viewBox can't
 * switch layout at a breakpoint; `hidden lg:block` / `lg:hidden` swap
 * between them, and `display:none` keeps only one in the accessibility tree
 * at a time so `role="img"` + `aria-label` on both never double-announces.
 *
 * Sizing assumption: the desktop viewBox (600x300) is tuned so SVG units
 * read at a natural size when the rendered width is roughly 520-600px
 * (e.g. one column of a `container-inex` `lg:grid-cols-2` layout). Do NOT
 * nest this inside a narrower fixed-width wrapper or text/strokes will
 * render undersized relative to the node boxes.
 */
function FlowDiagram({ nodes, ariaLabel, className }: FlowDiagramProps) {
  const desktopCenters = DESKTOP_POSITIONS.map(({ row, col }) => ({
    x: DESKTOP_COL_X[col] + DESKTOP_NODE_W / 2,
    y: DESKTOP_ROW_Y[row] + DESKTOP_NODE_H / 2,
    boxX: DESKTOP_COL_X[col],
    boxY: DESKTOP_ROW_Y[row],
  }))

  const desktopEdges = desktopCenters.slice(0, -1).map((from, i) => {
    const to = desktopCenters[i + 1]
    // Same row -> horizontal bezier between the two nodes' facing edges.
    // Row change (step 3 -> 4) -> short vertical hook down the shared right edge.
    if (from.y === to.y) {
      const fromRight = from.x < to.x
      return bezierH(
        fromRight ? from.x + DESKTOP_NODE_W / 2 : from.x - DESKTOP_NODE_W / 2,
        from.y,
        fromRight ? to.x - DESKTOP_NODE_W / 2 : to.x + DESKTOP_NODE_W / 2,
        to.y
      )
    }
    return bezierV(from.x, from.y + DESKTOP_NODE_H / 2, to.x, to.y - DESKTOP_NODE_H / 2)
  })

  const mobileNodeCenterX = MOBILE_NODE_X + MOBILE_NODE_W / 2
  const mobileY = nodes.map((_, i) => 12 + i * (MOBILE_NODE_H + MOBILE_GAP_Y))
  const mobileEdges = mobileY.slice(0, -1).map((y, i) =>
    bezierV(mobileNodeCenterX, y + MOBILE_NODE_H, mobileNodeCenterX, mobileY[i + 1])
  )

  const edgeDur = "3.2s"
  const edgeStagger = 3.2 / desktopEdges.length

  return (
    <div className={className}>
      <div className="hidden lg:block">
        <svg
          viewBox={`0 0 ${DESKTOP_VIEW_W} ${DESKTOP_VIEW_H}`}
          role="img"
          aria-label={ariaLabel}
          className="h-auto w-full"
        >
          {desktopEdges.map((edge, i) => (
            <path key={i} d={edge} fill="none" stroke="currentColor" className="text-border" strokeWidth="1.5" />
          ))}
          {desktopEdges.map((edge, i) => (
            <PulseDot key={i} path={edge} color="#0ea5e9" begin={`${i * edgeStagger}s`} dur={edgeDur} />
          ))}
          {nodes.map((node, i) => (
            <NodeBox
              key={node.step}
              x={desktopCenters[i].boxX}
              y={desktopCenters[i].boxY}
              width={DESKTOP_NODE_W}
              height={DESKTOP_NODE_H}
              step={node.step}
              title={node.title}
              accent={node.accent}
            />
          ))}
        </svg>
      </div>

      <div className="lg:hidden">
        <svg
          viewBox={`0 0 ${MOBILE_VIEW_W} ${MOBILE_VIEW_H}`}
          role="img"
          aria-label={ariaLabel}
          className="mx-auto h-auto w-full max-w-[280px]"
        >
          {mobileEdges.map((edge, i) => (
            <path key={i} d={edge} fill="none" stroke="currentColor" className="text-border" strokeWidth="1.5" />
          ))}
          {mobileEdges.map((edge, i) => (
            <PulseDot key={i} path={edge} color="#0ea5e9" begin={`${i * edgeStagger}s`} dur={edgeDur} />
          ))}
          {nodes.map((node, i) => (
            <NodeBox
              key={node.step}
              x={MOBILE_NODE_X}
              y={mobileY[i]}
              width={MOBILE_NODE_W}
              height={MOBILE_NODE_H}
              step={node.step}
              title={node.title}
              accent={node.accent}
            />
          ))}
        </svg>
      </div>
    </div>
  )
}

export { FlowDiagram }
