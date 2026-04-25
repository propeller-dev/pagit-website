import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const baseStyles =
  "w-full rounded-xl border border-line-200 bg-surface px-4 text-base text-ink-900 placeholder:text-ink-400 transition-colors duration-150 focus:border-brand-500 focus:outline-2 focus:outline-offset-2 focus:outline-brand-500 disabled:opacity-50";

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, type = "text", ...rest }, ref) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(baseStyles, "h-11", className)}
      {...rest}
    />
  );
});

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, rows = 4, ...rest }, ref) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(baseStyles, "py-3", className)}
      {...rest}
    />
  );
});

export function FieldLabel({
  htmlFor,
  children,
  required,
  className,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "mb-1.5 block text-sm font-medium text-ink-800",
        className,
      )}
    >
      {children}
      {required ? (
        <span className="ml-0.5 text-danger" aria-hidden>
          *
        </span>
      ) : null}
    </label>
  );
}
