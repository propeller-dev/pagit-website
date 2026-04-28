import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  const titleColor = tone === "dark" ? "text-white" : "text-ink-900";
  const subColor = tone === "dark" ? "text-brand-100/80" : "text-ink-600";
  const eyebrowTone = tone === "dark" ? "inverse" : "brand";
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <header
      className={cn(
        "max-w-[42rem] space-y-4",
        alignment,
        align === "center" && "items-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "font-display text-3xl leading-[1.1] font-bold tracking-[-0.03em] sm:text-4xl lg:text-[2.75rem]",
          titleColor,
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={cn("text-lg", subColor)}>{subtitle}</p>
      ) : null}
    </header>
  );
}
