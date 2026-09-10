"use client"

import { useMemo } from "react"
import DottedMap from "dotted-map"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "cn"

export interface WorldMapConnection {
  start: { lat: number; lng: number; label?: string }
  end: { lat: number; lng: number; label?: string }
}

export interface WorldMapProps {
  /** Great-circle-ish connections drawn between two points. */
  dots?: WorldMapConnection[]
  /** Stroke/dot color for connections. */
  lineColor?: string
  className?: string
}

/**
 * Vendored from Aceternity UI's "World Map" component
 * (https://ui.aceternity.com/components/world-map — real source fetched via
 * `gh api` against a live usage repo, since the docs page only renders a
 * lossy preview). Adapted for this project:
 * - Light-mode only: this app has no dark-mode token/toggle (`--foreground`
 *   has no `.dark` override anywhere in this codebase), so the original's
 *   `next-themes` dark/light branch is dropped — always renders the light
 *   dot-map + `#00000040` dots, matching every other section on this page.
 *   A new dark-mode need should add a `tone` prop, not reintroduce `next-themes`.
 * - `motion/react` (this project's installed package) instead of `framer-motion`.
 * - Plain `<img>` for the generated data-URI map instead of `next/image` — a
 *   client-generated `data:` URI isn't something `next/image` optimizes
 *   anyway, so the extra component is unnecessary here.
 * - Respects `prefers-reduced-motion` (`useReducedMotion`, project convention
 *   per `reveal.tsx`/`carousel.tsx`): connection paths render fully drawn
 *   instead of animating when reduced motion is requested.
 */
function WorldMap({ dots = [], lineColor = "#0ea5e9", className }: WorldMapProps) {
  const prefersReducedMotion = useReducedMotion()

  const svgMap = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" })
    return map.getSVG({
      radius: 0.22,
      color: "#00000040",
      shape: "circle",
      backgroundColor: "white",
    })
  }, [])

  return (
    <div
      data-slot="world-map"
      className={cn("relative aspect-[2/1] w-full rounded-lg bg-white font-sans", className)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- client-generated data: URI, not an optimizable next/image source */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="pointer-events-none h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] select-none"
        alt="세계 지도"
        draggable={false}
      />
      <svg
        viewBox="0 0 800 400"
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng)
          const endPoint = projectPoint(dot.end.lat, dot.end.lng)
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        duration: 1,
                        delay: 0.5 * i,
                        ease: "easeOut",
                        repeat: Infinity,
                        repeatType: "reverse",
                        repeatDelay: 1,
                      }
                }
              />
            </g>
          )
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="2"
                fill={lineColor}
              />
              {prefersReducedMotion ? null : (
                <circle
                  cx={projectPoint(dot.start.lat, dot.start.lng).x}
                  cy={projectPoint(dot.start.lat, dot.start.lng).y}
                  r="2"
                  fill={lineColor}
                  opacity="0.5"
                >
                  <animate attributeName="r" from="2" to="8" dur="1.5s" begin="0s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
            <g key={`end-${i}`}>
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="2"
                fill={lineColor}
              />
              {prefersReducedMotion ? null : (
                <circle
                  cx={projectPoint(dot.end.lat, dot.end.lng).x}
                  cy={projectPoint(dot.end.lat, dot.end.lng).y}
                  r="2"
                  fill={lineColor}
                  opacity="0.5"
                >
                  <animate attributeName="r" from="2" to="8" dur="1.5s" begin="0s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          </g>
        ))}
      </svg>
    </div>
  )
}

// `dotted-map`'s generated raster uses a Mercator projection (its instance's
// `proj4String` is `+proj=merc +lon_0=0 ...`, confirmed by inspecting a
// `DottedMap` instance directly), NOT the naive equirectangular (linear
// lat/lng → pixel) formula the original Aceternity snippet ships. That
// mismatch put connection dots tens of pixels off at non-equatorial
// latitudes — e.g. Seoul (37.5665°N) landed south/east of the peninsula.
// `WORLD_MERCATOR_RADIUS` is the WGS84 semi-major axis (meters), matching
// proj4's default sphere/ellipsoid radius for `+proj=merc`. The bbox
// constants below were read off a real `DottedMap({ height: 100, grid:
// "diagonal" })` instance's `X_MIN`/`Y_MAX`/`X_RANGE`/`Y_RANGE` fields (the
// bounding box of its actual landmass data, not the full ±180/±90 globe) —
// they must stay in sync if `DottedMap`'s options here ever change.
const WORLD_MERCATOR_RADIUS = 6378137
const WORLD_MAP_BBOX = {
  xMin: -18701674.453269962,
  yMax: 11361819.887676764,
  xRange: 37403348.906539924,
  yRange: 18884783.128941886,
}

function projectPoint(lat: number, lng: number) {
  const mercatorX = WORLD_MERCATOR_RADIUS * ((lng * Math.PI) / 180)
  const mercatorY =
    WORLD_MERCATOR_RADIUS * Math.log(Math.tan(Math.PI / 4 + ((lat * Math.PI) / 180) / 2))

  const x = ((mercatorX - WORLD_MAP_BBOX.xMin) / WORLD_MAP_BBOX.xRange) * 800
  const y = ((WORLD_MAP_BBOX.yMax - mercatorY) / WORLD_MAP_BBOX.yRange) * 400
  return { x, y }
}

function createCurvedPath(start: { x: number; y: number }, end: { x: number; y: number }) {
  const midX = (start.x + end.x) / 2
  const midY = Math.min(start.y, end.y) - 50
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`
}

export { WorldMap }
