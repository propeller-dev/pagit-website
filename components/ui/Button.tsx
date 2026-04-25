import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "link" | "inverse";
type Size = "sm" | "md" | "lg";

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:opacity-50 disabled:cursor-not-allowed select-none whitespace-nowrap";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-sm hover:bg-brand-700 active:bg-brand-800",
  secondary:
    "bg-surface text-ink-900 border border-line-200 hover:bg-surface-50 hover:border-line-300",
  ghost: "bg-transparent text-ink-700 hover:bg-brand-50 hover:text-brand-700",
  link: "text-brand-700 underline-offset-4 hover:underline px-0 py-0",
  inverse:
    "bg-white text-brand-900 hover:bg-brand-50 shadow-sm",
};

const sizeStyles: Record<Size, string> = {
  sm: "text-sm h-9 px-4",
  md: "text-base h-11 px-5",
  lg: "text-base h-12 px-6",
};

export type ButtonProps = {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", size = "md", href, external, className, children, ...rest },
    ref,
  ) {
    const classes = cn(
      baseStyles,
      variantStyles[variant],
      variant !== "link" && sizeStyles[size],
      className,
    );

    if (href) {
      const isExternal =
        external ?? (href.startsWith("http") || href.startsWith("mailto:"));
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...rest}>
        {children}
      </button>
    );
  },
);
