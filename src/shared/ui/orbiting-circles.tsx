import type { ReactNode } from "react";
import { cn } from "cn";

export interface OrbitingCirclesProps {
  /** Items rendered as evenly-spaced icons around the ring. */
  children: ReactNode[];
  /** Ring radius in px — distance from center to each icon. */
  radius: number;
  /** One full revolution duration in seconds. Defaults to 20. */
  duration?: number;
  /** Spins counter-clockwise instead of clockwise. */
  reverse?: boolean;
  /** Icon badge size in px. Defaults to 36. */
  iconSize?: number;
  /** Draws a dashed circular guide along the ring, matching Magic UI's default (`path: true`). */
  path?: boolean;
  className?: string;
}

/**
 * Magic UI's `OrbitingCircles` pattern (https://magicui.design/docs/components/orbiting-circles),
 * reimplemented with this project's plain-CSS-keyframe convention
 * (`.orbit`/`app/globals.css`) instead of a library dependency — same
 * approach as `dashflow`/`globe-flow`. Each child is placed at an even angle
 * around a ring of `radius` px and spun via the `orbit` keyframe, which
 * counter-rotates the child at every animation frame so icons stay upright
 * while circling. Absolutely positioned at its parent's center — the parent
 * must be `relative` (or otherwise a positioning context) and large enough
 * for `radius * 2` plus icon size. `path` (default true, matching the
 * source) renders a dashed circle guide the same diameter as the ring — a
 * plain CSS `border-radius` circle rather than an SVG.
 *
 * `radius` is a fixed px value, not a percentage — `transform: translateX()`
 * percentages resolve against the *element's own* size, not its parent, so
 * a percentage radius here would collapse every icon toward the center
 * instead of scaling with the container. Callers needing different radii at
 * different breakpoints should render two differently-configured instances
 * behind Tailwind's responsive `hidden`/`block`, or size the radius to fit
 * the smallest container it will appear in.
 */
export function OrbitingCircles({
  children,
  radius,
  duration = 20,
  reverse = false,
  iconSize = 36,
  path = true,
  className,
}: OrbitingCirclesProps) {
  const count = children.length;
  return (
    <>
      {path ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 rounded-full border border-dashed border-foreground/15"
          style={{
            width: radius * 2,
            height: radius * 2,
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : null}
      {children.map((child, index) => (
        <div
          key={index}
          aria-hidden="true"
          className={cn(
            "orbit absolute top-1/2 left-1/2",
            reverse && "orbit-reverse",
            className
          )}
          style={
            {
              "--orbit-radius": `${radius}px`,
              "--orbit-duration": duration,
              width: iconSize,
              height: iconSize,
              marginLeft: -iconSize / 2,
              marginTop: -iconSize / 2,
              animationDelay: `${(index / count) * duration * -1}s`,
              transform: `rotate(${(360 / count) * index}deg) translateX(${radius}px)`,
            } as React.CSSProperties
          }
        >
          {child}
        </div>
      ))}
    </>
  );
}
