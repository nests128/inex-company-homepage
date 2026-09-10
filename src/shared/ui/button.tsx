import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
        /**
         * Pill, solid-dark CTA — `bg-ink text-white` in the wireframe.
         * Uses `--primary`/`--primary-foreground` (not `--foreground`/`--background`)
         * so it auto-inverts correctly both on OS dark-mode (`:root` media query
         * flips `--background`/`--foreground` but not `--primary`) and inside a
         * `.dark`-wrapped section (e.g. footer, stats band) without a separate variant.
         */
        "pill-solid":
          "rounded-full bg-primary text-primary-foreground hover:bg-primary/80",
        /** Pill, outlined CTA — `border-ink` in the wireframe. Same token rationale as `pill-solid`. */
        "pill-outline":
          "rounded-full border-[1.5px] border-primary bg-transparent text-primary hover:bg-muted",
        /** Pill, ghost CTA — text-only, no border/fill until hover. */
        "pill-ghost":
          "rounded-full bg-transparent text-primary hover:bg-muted",
        /**
         * Pill, solid CTA for use INSIDE a dark (`bg-ink`/#111) section, e.g. the
         * CTA band (wireframe ~L290-302: `background:#fff;color:#111`). Unlike
         * `pill-solid`, this is hardcoded to white/ink rather than the
         * `--primary` tokens, since `--primary` is a fixed near-black value in
         * this light-mode-only build and would be invisible on a dark background.
         */
        "pill-solid-inverse":
          "rounded-full bg-white text-foreground hover:bg-white/85",
        /**
         * Pill, outlined CTA for use INSIDE a dark section (wireframe ~L290-302:
         * `border:1.5px solid #fff;color:#fff`). Same rationale as
         * `pill-solid-inverse`.
         */
        "pill-outline-inverse":
          "rounded-full border-[1.5px] border-white bg-transparent text-white hover:bg-white/12",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
        /** Nav CTA pill — matches wireframe `padding:11px 22px;font-size:14px`. */
        pill: "h-11 gap-1.5 px-[22px] text-sm has-data-[icon=inline-end]:pr-[18px] has-data-[icon=inline-start]:pl-[18px]",
        /** Hero/CTA large pill — matches wireframe `padding:16px 30px;font-size:16px`. */
        "pill-lg":
          "h-[52px] gap-2 px-[30px] text-base has-data-[icon=inline-end]:pr-6 has-data-[icon=inline-start]:pl-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
