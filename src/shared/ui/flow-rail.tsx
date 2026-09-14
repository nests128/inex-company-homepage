// Promoted from the stablecoin payments page's page-local
// `payout-flow-diagram.tsx` (2026-09-14) so it lives in `shared/ui` per FSD
// (page-local components can't be imported elsewhere). Currently has one
// consumer: the stablecoin payments page's "Payments 결제·정산" rail
// (`how-it-works-section.tsx`, node count has changed several times — don't
// hardcode it in this comment) — NOT the homepage, which uses `FlowDiagram`
// (`widgets/account-highlight`, reverted back to it 2026-09-14 after an
// earlier attempt to swap it for this component). Renders labeled nodes
// joined by animated-dashed connectors (`dashflow`, see `app/globals.css`).
// Desktop chunks nodes into fixed-size rows (`rowSize`) that alternate
// direction (serpentine), same idea as `FlowDiagram`'s 2x3 serpentine grid
// but for an arbitrary node count; mobile drops to a single top-to-bottom
// column, mirroring `FlowDiagram`'s own desktop/mobile split (a wrapped
// fixed-width-node grid doesn't fit a 390px viewport without causing
// page-wide horizontal scroll).
import { cn } from "cn";

export interface FlowRailNode {
  label: string;
  /** Highlights this node as a key transition step (border-sky-500/40 + bg-sky-50), matching `FlowDiagram`'s accent treatment. */
  accent?: boolean;
}

export interface FlowRailProps {
  ariaLabel: string;
  nodes: readonly FlowRailNode[];
  className?: string;
  /** Nodes per row before wrapping to a new, reversed row (desktop only). Default 5 (full-width rail); pass a smaller value (e.g. 3) to fit a narrower column. */
  rowSize?: number;
}

const NODE_W = 132;
const CONNECTOR_W = 32;
/** A row's exact track width (a full row's worth of nodes+connectors) for the given row size — every row is pinned to this width so a shorter trailing row's `flex-row-reverse` packing lines its first node up with the row above's last node; otherwise each row sizes to its own content width and the two edges land at different x-offsets. */
function rowTrackWidth(rowSize: number) {
  return rowSize * NODE_W + (rowSize - 1) * CONNECTOR_W;
}

/** Interpolates the same slate→sky sweep `FlowDiagram` renders as one long gradient, per-edge, so the perceived sweep across the whole rail matches. */
function connectorColor(index: number, total: number) {
  const from = { r: 0xcb, g: 0xd5, b: 0xe1 }; // #CBD5E1
  const to = { r: 0x7d, g: 0xd3, b: 0xfc }; // #7dd3fc
  const t = total <= 1 ? 0 : index / (total - 1);
  const r = Math.round(from.r + (to.r - from.r) * t);
  const g = Math.round(from.g + (to.g - from.g) * t);
  const b = Math.round(from.b + (to.b - from.b) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

function NodeBox({ label, accent, className }: { label: string; accent?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        "flex min-h-14 w-[132px] shrink-0 items-center justify-center rounded-xl border px-3 py-2 text-center text-[12.5px] leading-[1.35] font-bold whitespace-pre-line shadow-[0_1px_3px_rgba(0,0,0,.06)]",
        accent ? "border-sky-500/40 bg-sky-50 text-sky-600" : "border-border bg-background text-foreground",
        className,
      )}
    >
      {label}
    </div>
  );
}

/** Short animated-dashed connector between two horizontally adjacent nodes (desktop rows). `flip` mirrors it for reversed (odd) rows so the dash flow still reads left-to-right visually. */
function Connector({ color, flip }: { color: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 32 2"
      preserveAspectRatio="none"
      className={cn("h-px w-8 shrink-0", flip && "-scale-x-100")}
      aria-hidden="true"
    >
      <line x1="0" y1="1" x2="32" y2="1" stroke={color} strokeWidth="2" strokeDasharray="5 6" className="dashflow" />
    </svg>
  );
}

/** Short vertical hook connecting the last node of a row to the first node of the next (serpentine turn, desktop only). Absolutely positioned under whichever edge the row's last node lands on, spanning exactly the row `gap`. */
function RowTurn({ color, alignEnd }: { color: string; alignEnd?: boolean }) {
  return (
    <div
      className={cn("absolute top-full flex h-8 w-[132px] items-stretch justify-center", alignEnd ? "right-0" : "left-0")}
      aria-hidden="true"
    >
      <svg viewBox="0 0 2 32" preserveAspectRatio="none" className="h-full w-px">
        <line x1="1" y1="0" x2="1" y2="32" stroke={color} strokeWidth="2" strokeDasharray="5 6" className="dashflow" />
      </svg>
    </div>
  );
}

/** Short animated-dashed vertical connector between two stacked nodes (mobile column). */
function VerticalConnector({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 2 24" preserveAspectRatio="none" className="h-6 w-px shrink-0" aria-hidden="true">
      <line x1="1" y1="0" x2="1" y2="24" stroke={color} strokeWidth="2" strokeDasharray="5 6" className="dashflow" />
    </svg>
  );
}

function DesktopRail({ nodes, rowSize }: { nodes: readonly FlowRailNode[]; rowSize: number }) {
  const rows: FlowRailNode[][] = [];
  for (let i = 0; i < nodes.length; i += rowSize) {
    rows.push(nodes.slice(i, i + rowSize));
  }
  const trackWidth = rowTrackWidth(rowSize);

  return (
    <div className="flex flex-col items-start gap-8">
      {rows.map((row, rowIndex) => {
        const reversed = rowIndex % 2 === 1;
        const startIndex = rowIndex * rowSize;
        const isLastRow = rowIndex === rows.length - 1;
        return (
          <div
            key={rowIndex}
            style={{ width: trackWidth }}
            className={cn("relative flex items-center", reversed && "flex-row-reverse")}
          >
            {row.map((node, i) => {
              const globalIndex = startIndex + i;
              return (
                <div key={`${node.label}-${globalIndex}`} className={cn("flex items-center", reversed && "flex-row-reverse")}>
                  {i > 0 ? (
                    <Connector color={connectorColor(globalIndex - 1, nodes.length)} flip={reversed} />
                  ) : null}
                  <NodeBox label={node.label} accent={node.accent} />
                </div>
              );
            })}
            {!isLastRow ? (
              <RowTurn color={connectorColor(startIndex + row.length - 1, nodes.length)} alignEnd={!reversed} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function MobileRail({ nodes }: { nodes: readonly FlowRailNode[] }) {
  return (
    <div className="flex flex-col items-center">
      {nodes.map((node, index) => (
        <div key={`${node.label}-${index}`} className="flex flex-col items-center">
          {index > 0 ? <VerticalConnector color={connectorColor(index - 1, nodes.length)} /> : null}
          <NodeBox label={node.label} accent={node.accent} className="w-[220px]" />
        </div>
      ))}
    </div>
  );
}

export function FlowRail({ ariaLabel, nodes, className, rowSize = 5 }: FlowRailProps) {
  return (
    <div role="img" aria-label={ariaLabel} className={className}>
      <div className="hidden lg:block" aria-hidden="true">
        <DesktopRail nodes={nodes} rowSize={rowSize} />
      </div>
      <div className="lg:hidden" aria-hidden="true">
        <MobileRail nodes={nodes} />
      </div>
    </div>
  );
}
