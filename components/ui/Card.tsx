import { cn } from "@/lib/utils";

type Variant = "light" | "wash" | "dark" | "outline";

const variantStyles: Record<Variant, string> = {
  light: "bg-surface border border-line-200 shadow-sm",
  wash: "bg-brand-50 border border-brand-100/60",
  dark: "bg-brand-900 text-white border border-brand-800",
  outline: "bg-transparent border border-line-200",
};

export function Card({
  variant = "light",
  className,
  children,
  as: Component = "div",
}: {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  return (
    <Component
      className={cn(
        "relative overflow-hidden rounded-2xl",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </Component>
  );
}

export function CardBody({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("p-6 sm:p-8", className)}>{children}</div>;
}

export function CardKicker({
  children,
  className,
  tone = "brand",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "brand" | "muted" | "inverse";
}) {
  const toneMap = {
    brand: "text-brand-700",
    muted: "text-ink-500",
    inverse: "text-brand-300",
  };
  return (
    <p
      className={cn(
        "text-xs font-semibold tracking-[0.08em] uppercase",
        toneMap[tone],
        className,
      )}
    >
      {children}
    </p>
  );
}

export function CardTitle({
  children,
  className,
  tone = "light",
  as: Component = "h3",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
  as?: "h2" | "h3" | "h4";
}) {
  return (
    <Component
      className={cn(
        "font-display text-xl leading-tight font-bold tracking-[-0.025em] sm:text-2xl",
        tone === "dark" ? "text-white" : "text-ink-900",
        className,
      )}
    >
      {children}
    </Component>
  );
}

export function CardBodyText({
  children,
  className,
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={cn(
        "text-base",
        tone === "dark" ? "text-brand-100/80" : "text-ink-600",
        className,
      )}
    >
      {children}
    </p>
  );
}
