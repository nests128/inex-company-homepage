"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { cn } from "cn"

interface Point3D {
  x: number
  y: number
  z: number
}

interface Arc {
  from: number
  to: number
  start: number
  duration: number
  bulge: number
}

const POINTS_PER_ARM = 220
const CONNECT_DISTANCE = 0.09
const BAR_RADIUS = 0.16
const DEPTH_RADIUS = 0.14
const ROTATION_SPEED = 0.0001
const TILT = 0.25

const MAX_ARCS = 5
const ARC_SPAWN_MIN_MS = 600
const ARC_SPAWN_MAX_MS = 1800
const ARC_DURATION_MIN_MS = 1400
const ARC_DURATION_MAX_MS = 2600
const ARC_MIN_OMEGA = 0.15
const ARC_TRAIL_T = 0.1
const ARC_SEGMENTS = 28

// 원점에서 교차하는 대각선 막대 2개 — 구와 동일한 정규화 스케일을 써서 투영 로직 공유
const ARM_TIP = Math.SQRT1_2
const ARMS = [
  { from: { x: -ARM_TIP, y: -ARM_TIP }, to: { x: ARM_TIP, y: ARM_TIP } },
  { from: { x: -ARM_TIP, y: ARM_TIP }, to: { x: ARM_TIP, y: -ARM_TIP } },
]

function buildXShape(pointsPerArm: number): Point3D[] {
  const points: Point3D[] = []
  for (const arm of ARMS) {
    const dx = arm.to.x - arm.from.x
    const dy = arm.to.y - arm.from.y
    const len = Math.hypot(dx, dy)
    const px = -dy / len
    const py = dx / len

    for (let i = 0; i < pointsPerArm; i++) {
      const t = i / (pointsPerArm - 1)
      const baseX = arm.from.x + dx * t
      const baseY = arm.from.y + dy * t
      const jitter = (Math.random() - 0.5) * 2 * BAR_RADIUS
      points.push({
        x: baseX + px * jitter,
        y: baseY + py * jitter,
        z: (Math.random() - 0.5) * 2 * DEPTH_RADIUS,
      })
    }
  }
  return points
}

function buildConnections(points: Point3D[]): [number, number][] {
  const connections: [number, number][] = []
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dx = points[i].x - points[j].x
      const dy = points[i].y - points[j].y
      const dz = points[i].z - points[j].z
      if (Math.sqrt(dx * dx + dy * dy + dz * dz) < CONNECT_DISTANCE) {
        connections.push([i, j])
      }
    }
  }
  return connections
}

function dot3(a: Point3D, b: Point3D) {
  return a.x * b.x + a.y * b.y + a.z * b.z
}

function slerp(a: Point3D, b: Point3D, t: number, omega: number): Point3D {
  const sinOmega = Math.sin(omega)
  const wa = Math.sin((1 - t) * omega) / sinOmega
  const wb = Math.sin(t * omega) / sinOmega
  return {
    x: a.x * wa + b.x * wb,
    y: a.y * wa + b.y * wb,
    z: a.z * wa + b.z * wb,
  }
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function NetworkXCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const points = buildXShape(POINTS_PER_ARM)
    const connections = buildConnections(points)
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    let width = 0
    let height = 0

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement)

    let angle = 0
    let lastTime = 0
    let rafId = 0
    let nextArcSpawn = 0
    const arcs: Arc[] = []

    const spawnArc = (time: number) => {
      if (arcs.length >= MAX_ARCS) return
      const from = Math.floor(Math.random() * points.length)
      let to = Math.floor(Math.random() * points.length)
      for (let guard = 0; to === from && guard < 5; guard++) {
        to = Math.floor(Math.random() * points.length)
      }
      if (to === from) return

      const omega = Math.acos(
        Math.max(-1, Math.min(1, dot3(points[from], points[to])))
      )
      if (omega < ARC_MIN_OMEGA) return

      arcs.push({
        from,
        to,
        start: time,
        duration: randomBetween(ARC_DURATION_MIN_MS, ARC_DURATION_MAX_MS),
        bulge: randomBetween(0.18, 0.34),
      })
    }

    const render = (time: number) => {
      const delta = lastTime ? time - lastTime : 16
      lastTime = time
      if (!reduceMotion) angle += ROTATION_SPEED * delta

      ctx.clearRect(0, 0, width, height)
      if (width === 0 || height === 0) {
        rafId = requestAnimationFrame(render)
        return
      }

      if (!reduceMotion && time >= nextArcSpawn) {
        spawnArc(time)
        nextArcSpawn = time + randomBetween(ARC_SPAWN_MIN_MS, ARC_SPAWN_MAX_MS)
      }

      const cx = width / 2
      const cy = height / 2
      const scale = Math.min(width, height) / 2.3
      const focal = 2.4
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      const cosT = Math.cos(TILT)
      const sinT = Math.sin(TILT)

      const project = (p: Point3D) => {
        const x1 = p.x * cos - p.z * sin
        const z1 = p.x * sin + p.z * cos
        const y2 = p.y * cosT - z1 * sinT
        const z2 = p.y * sinT + z1 * cosT
        const perspective = focal / (focal + z2)
        return {
          x: cx + x1 * scale * perspective,
          y: cy + y2 * scale * perspective,
          depth: z2,
          perspective,
        }
      }

      const projected = points.map(project)

      ctx.lineWidth = 1
      for (const [a, b] of connections) {
        const pa = projected[a]
        const pb = projected[b]
        const opacity = Math.max(0, 0.5 - ((pa.depth + pb.depth) / 2) * 0.35)
        if (opacity <= 0.02) continue
        ctx.strokeStyle = `rgba(95, 176, 255, ${opacity})`
        ctx.beginPath()
        ctx.moveTo(pa.x, pa.y)
        ctx.lineTo(pb.x, pb.y)
        ctx.stroke()
      }

      for (const p of projected) {
        const opacity = Math.max(0.08, 0.9 - p.depth * 0.6)
        const radius = Math.max(0.6, 1.8 * p.perspective)
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(154, 209, 255, ${opacity})`
        ctx.fill()
      }

      // 비행 호 — X 위 두 점을 잇는 불규칙한 포물선 경로, 밝은 머리와 흐려지는 꼬리
      for (let i = arcs.length - 1; i >= 0; i--) {
        const arc = arcs[i]
        const progress = (time - arc.start) / arc.duration
        if (progress >= 1) {
          arcs.splice(i, 1)
          continue
        }

        const a = points[arc.from]
        const b = points[arc.to]
        const omega = Math.acos(Math.max(-1, Math.min(1, dot3(a, b))))
        if (Math.sin(omega) < 1e-6) {
          arcs.splice(i, 1)
          continue
        }

        const path: { x: number; y: number; depth: number }[] = []
        for (let s = 0; s <= ARC_SEGMENTS; s++) {
          const t = s / ARC_SEGMENTS
          const base = slerp(a, b, t, omega)
          const lift = 1 + arc.bulge * Math.sin(Math.PI * t)
          const proj = project({
            x: base.x * lift,
            y: base.y * lift,
            z: base.z * lift,
          })
          path.push({ x: proj.x, y: proj.y, depth: proj.depth })
        }

        const avgDepth =
          path.reduce((sum, pt) => sum + pt.depth, 0) / path.length
        const pathOpacity = Math.max(0, 0.22 - avgDepth * 0.15)
        if (pathOpacity > 0.01) {
          ctx.beginPath()
          path.forEach((pt, idx) => {
            if (idx === 0) ctx.moveTo(pt.x, pt.y)
            else ctx.lineTo(pt.x, pt.y)
          })
          ctx.strokeStyle = `rgba(15, 184, 138, ${pathOpacity})`
          ctx.lineWidth = 1
          ctx.stroke()
        }

        const headT = Math.min(1, progress)
        const trailStartT = Math.max(0, headT - ARC_TRAIL_T)
        for (let s = 0; s <= ARC_SEGMENTS; s++) {
          const t = s / ARC_SEGMENTS
          if (t < trailStartT || t > headT) continue
          const localFade =
            trailStartT >= headT ? 1 : (t - trailStartT) / (headT - trailStartT)
          const pt = path[s]
          const opacity = Math.max(0, (0.9 - pt.depth * 0.5) * localFade)
          const radius = Math.max(0.8, 2.2 * localFade)
          ctx.beginPath()
          ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
          ctx.fill()
        }
      }

      rafId = requestAnimationFrame(render)
    }

    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}

const WAVE_WIDTH = 1200
const WAVE_HEIGHT = 400

function buildWaveLine(baseline: number, amplitude: number, period: number) {
  const periods = WAVE_WIDTH / period
  let d = `M 0 ${baseline}`
  for (let i = 0; i < periods; i++) {
    const x0 = i * period
    const q1 = x0 + period / 4
    const xMid = x0 + period / 2
    const q3 = x0 + (period * 3) / 4
    const xEnd = x0 + period
    d += ` C ${q1} ${baseline - amplitude}, ${q1} ${baseline - amplitude}, ${xMid} ${baseline}`
    d += ` C ${q3} ${baseline + amplitude}, ${q3} ${baseline + amplitude}, ${xEnd} ${baseline}`
  }
  return d
}

function buildWaveFill(baseline: number, amplitude: number, period: number) {
  return `${buildWaveLine(baseline, amplitude, period)} L ${WAVE_WIDTH} ${WAVE_HEIGHT} L 0 ${WAVE_HEIGHT} Z`
}

const WAVE_LAYERS = [
  {
    baseline: 260,
    amplitude: 22,
    period: 600,
    opacity: 0.1,
    duration: "48s",
    color: "#1b4269",
  },
  {
    baseline: 305,
    amplitude: 16,
    period: 400,
    opacity: 0.14,
    duration: "30s",
    color: "#0a2e53",
  },
]

function WaveBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {WAVE_LAYERS.map((layer, i) => {
        const fillPath = buildWaveFill(layer.baseline, layer.amplitude, layer.period)
        return (
          <svg
            key={i}
            viewBox={`0 0 ${WAVE_WIDTH * 2} ${WAVE_HEIGHT}`}
            preserveAspectRatio="none"
            className="wave-drift absolute inset-y-0 left-0 h-full w-[200%]"
            style={{ animationDuration: layer.duration }}
          >
            <path d={fillPath} fill={layer.color} opacity={layer.opacity} />
            <path
              d={fillPath}
              fill={layer.color}
              opacity={layer.opacity}
              transform={`translate(${WAVE_WIDTH}, 0)`}
            />
          </svg>
        )
      })}
    </div>
  )
}

export interface NetworkXVisualProps {
  className?: string
  /**
   * Centered overlay content (e.g. `<InexLogoMark />`), rendered above the
   * canvas — mirrors the source `company-homepage` hero, which layers its
   * title text over this same X-network visual. Optional: omit for the
   * bare background (e.g. as a smaller decorative panel elsewhere).
   */
  overlay?: ReactNode
}

/**
 * Self-contained dark visual card: wave-drift SVG backdrop + rotating 3D
 * "X" point-network canvas. Caller only needs to size it via `className`;
 * background, radius, and clipping are all internal.
 */
function NetworkXVisual({ className, overlay }: NetworkXVisualProps) {
  return (
    <div
      className={cn(
        "relative min-h-[380px] w-full overflow-hidden rounded-2xl bg-slate-950",
        className
      )}
    >
      <div aria-hidden="true">
        <WaveBackground className="z-[1]" />
        <NetworkXCanvas className="absolute inset-0 z-[2] [mask-image:radial-gradient(closest-side,black_75%,transparent_100%)]" />
      </div>
      {overlay ? (
        <div className="absolute inset-0 z-[3] flex items-center justify-center">
          {overlay}
        </div>
      ) : null}
    </div>
  )
}

export { NetworkXVisual }
