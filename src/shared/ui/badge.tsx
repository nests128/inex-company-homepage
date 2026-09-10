import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
        /** Solid pill badge for use on dark (#111) backgrounds/media (e.g. sector tag on a case-card image). */
        inverse: "bg-background text-foreground [a]:hover:bg-background/80",
        /**
         * Small "floating chip" inline badge — white/background fill, thin
         * border, subtle card shadow (`docs/design-tokens.md` card shadow
         * `0 1px 3px rgba(0,0,0,.06)`). Matches the reference
         * (`ref/image.png`) heading pill (e.g. "🌍 LOCAL OR GLOBAL!") adapted
         * to our black & white tone — no color fill, just border + shadow.
         * Pair with `size="lg"` so the pill isn't clipped to `h-5`.
         */
        floating:
          "border-border bg-background text-foreground shadow-[0_1px_3px_rgba(0,0,0,0.06)] [a]:hover:bg-muted",
      },
      size: {
        default: "h-5 px-2 text-xs",
        /** Sector-tag sized pill, matches wireframe `padding:5px 12px;font-size:11.5px`. */
        lg: "h-auto rounded-full px-3 py-[5px] text-[11.5px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, size }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
      size,
    },
  })
}

export { Badge, badgeVariants }
