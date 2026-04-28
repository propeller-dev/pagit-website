import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "full",
  tone = "brand",
}: {
  className?: string;
  variant?: "full" | "icon";
  tone?: "brand" | "white";
}) {
  const src =
    variant === "icon" ? "/brand/pagit-icon.svg" : "/brand/pagit-logo.svg";
  const sizeClass = variant === "icon" ? "h-10 w-10" : "h-8 w-auto";
  const toneClass =
    tone === "white" ? "[filter:brightness(0)_invert(1)]" : undefined;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Pagit"
      className={cn(sizeClass, toneClass, className)}
      draggable={false}
    />
  );
}
