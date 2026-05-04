import { cn } from "@/lib/utils";

type Tone = "default" | "muted" | "wash" | "dark";

const toneStyles: Record<Tone, string> = {
  default: "bg-surface text-ink-900",
  muted: "bg-surface-50 text-ink-900",
  wash: "bg-brand-50 text-ink-900",
  dark: "bg-brand-950 text-white",
};

export function Section({
  id,
  tone = "default",
  className,
  children,
  spacing = "default",
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
  spacing?: "compact" | "default";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        spacing === "compact"
          ? "py-[clamp(3rem,6vw,5rem)]"
          : "py-[clamp(4rem,8vw,8rem)]",
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </section>
  );
}
