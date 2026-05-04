"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

function useRevealRef() {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return [ref, visible] as const;
}

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
  const [ref, visible] = useRevealRef();
  return (
    <Component
      ref={ref as never}
      className={cn("pagit-reveal", visible && "pagit-reveal--in", className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Component>
  );
}

export function StaggerGroup({
  children,
  className,
  as: Component = "div",
}: {
  children: ReactNode;
  className?: string;
  childStagger?: number;
  as?: "div" | "ul" | "ol";
}) {
  return <Component className={className}>{children}</Component>;
}

export function StaggerItem({
  children,
  className,
  as: Component = "div",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
  y?: number;
  delay?: number;
}) {
  const [ref, visible] = useRevealRef();
  return (
    <Component
      ref={ref as never}
      className={cn("pagit-reveal", visible && "pagit-reveal--in", className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Component>
  );
}
