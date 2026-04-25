import { cn } from "@/lib/utils";

type Variant = "brand" | "amber" | "neutral" | "danger" | "outline" | "inverse";

const variantStyles: Record<Variant, string> = {
  brand: "bg-brand-100 text-brand-800",
  amber: "bg-amber-light text-amber",
  neutral: "bg-ink-100 text-ink-700",
  danger: "bg-danger-light text-danger",
  outline: "border border-line-200 text-ink-700 bg-surface",
  inverse: "bg-brand-800 text-brand-100 border border-brand-700/60",
};

export function Badge({
  children,
  variant = "brand",
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
