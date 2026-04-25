import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Renderiza com fade+translateY suave usando CSS animation.
 * Sem JS, sem flicker — anima da posição inicial para a final em 0.55s.
 * Crawlers/no-JS veem o estado final pelo HTML; o CSS da animação respeita
 * prefers-reduced-motion via globals.css.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Component = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "header";
}) {
  return (
    <Component
      className={cn("pagit-reveal", className)}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </Component>
  );
}

export function StaggerGroup({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  childStagger?: number;
  as?: "div" | "ul" | "ol";
}) {
  const Component = as;
  return <Component className={className}>{children}</Component>;
}

export function StaggerItem({
  children,
  className,
  as = "div",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
  y?: number;
  delay?: number;
}) {
  const Component = as;
  return (
    <Component
      className={cn("pagit-reveal", className)}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </Component>
  );
}
