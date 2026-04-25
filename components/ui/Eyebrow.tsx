import { cn } from "@/lib/utils";

export function Eyebrow({
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
        "text-sm font-semibold tracking-[0.08em] uppercase",
        toneMap[tone],
        className,
      )}
    >
      {children}
    </p>
  );
}
