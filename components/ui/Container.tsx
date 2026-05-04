import { cn } from "@/lib/utils";

type ContainerSize = "reading" | "narrow" | "default" | "wide";

const sizeMap: Record<ContainerSize, string> = {
  reading: "max-w-[42.5rem]",
  narrow: "max-w-[55rem]",
  default: "max-w-[75rem]",
  wide: "max-w-[82.5rem]",
};

export function Container({
  size = "default",
  className,
  children,
  as: Component = "div",
}: {
  size?: ContainerSize;
  className?: string;
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeMap[size],
        className,
      )}
    >
      {children}
    </Component>
  );
}
