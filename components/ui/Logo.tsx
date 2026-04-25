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
  const fillColor = tone === "white" ? "#FFFFFF" : "#059669";

  if (variant === "icon") {
    return (
      <svg
        viewBox="0 0 220.605 220.605"
        className={cn("h-10 w-10", className)}
        role="img"
        aria-label="Pagit"
      >
        <g transform="matrix(3.262 0 0 3.262 110.302 110.302)">
          <g transform="translate(-17.896 -7.776)">
            <g transform="translate(17.409 -0.86)" fill={fillColor}>
              <path d="m99.513 117.922c-9.821 0-17.81-7.99-17.81-17.81s7.99-17.81 17.81-17.81 17.81 7.99 17.81 17.81-7.99 17.81-17.81 17.81zm0-24.954c-3.939 0-7.144 3.205-7.144 7.144s3.205 7.144 7.144 7.144 7.144-3.205 7.144-7.144-3.205-7.144-7.144-7.144z" transform="translate(-99.513 -100.111)" />
            </g>
            <g transform="translate(17.407 28.064)" fill={fillColor}>
              <path d="m99.513 135.194c-4.382 0-8.659-0.799-12.712-2.376l3.866-9.941c5.631 2.189 12.061 2.19 17.69 0l3.866 9.941c-4.052 1.576-8.328 2.375-12.71 2.375z" transform="translate(-99.512 -129.035)" />
            </g>
            <g transform="translate(26.801 -13.337)" fill={fillColor}>
              <rect x="-9.392" y="-5.333" width="18.784" height="10.667" />
            </g>
            <g transform="translate(25.56 -13.337)" fill={fillColor}>
              <path d="m115.817 92.968c-2.759-6.272-9.024-10.667-16.304-10.667v10.667z" transform="translate(-107.665 -87.634)" />
            </g>
          </g>
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 520.73 223.266"
      className={cn("h-8 w-auto", className)}
      role="img"
      aria-label="Pagit"
    >
      <g transform="matrix(3.262 0 0 3.262 260.365 111.633)" fill={fillColor}>
        <g transform="translate(-61.368 -16.561)">
          <path d="M101.652 108.816H81.55V98.149h20.102c3.381 0 6.131-2.75 6.131-6.131s-2.75-6.13-6.131-6.13H81.55V75.222h20.102c9.262 0 16.797 7.535 16.797 16.797s-7.535 16.797-16.797 16.797z" transform="translate(-100 -92.019)" />
        </g>
        <g transform="translate(-22.839 -0.86)">
          <path d="M100 117.922c-9.821 0-17.81-7.99-17.81-17.81s7.99-17.81 17.81-17.81 17.81 7.99 17.81 17.81-7.99 17.81-17.81 17.81zm0-24.954c-3.939 0-7.144 3.205-7.144 7.144s3.205 7.144 7.144 7.144 7.144-3.205 7.144-7.144-3.205-7.144-7.144-7.144z" transform="translate(-100 -100.111)" />
        </g>
        <g transform="translate(17.409 -0.86)">
          <path d="M99.513 117.922c-9.821 0-17.81-7.99-17.81-17.81s7.99-17.81 17.81-17.81 17.81 7.99 17.81 17.81-7.99 17.81-17.81 17.81zm0-24.954c-3.939 0-7.144 3.205-7.144 7.144s3.205 7.144 7.144 7.144 7.144-3.205 7.144-7.144-3.205-7.144-7.144-7.144z" transform="translate(-99.513 -100.111)" />
        </g>
        <g transform="translate(17.407 28.064)">
          <path d="M99.513 135.194c-4.382 0-8.659-0.799-12.712-2.376l3.866-9.941c5.631 2.189 12.061 2.19 17.69 0l3.866 9.941c-4.052 1.576-8.328 2.375-12.71 2.375z" transform="translate(-99.512 -129.035)" />
        </g>
        <g transform="translate(47.206 -0.821)">
          <rect x="-5.333" y="-17.063" width="10.667" height="34.125" />
        </g>
        <g transform="translate(69.444 -6.421)">
          <path d="M102.785 117.927c-7.256 0-13.158-5.903-13.158-13.158V71.11h10.667v33.659c0 1.374 1.117 2.492 2.491 2.492 0.654 0 1.14-0.246 1.432-0.452l6.157 8.71c-2.229 1.576-4.853 2.408-7.589 2.408z" transform="translate(-100 -94.518)" />
        </g>
      </g>
      <g transform="matrix(3.262 0 0 3.262 324.769 98.327)" fill={fillColor}>
        <rect x="-5.818" y="-24.776" width="11.636" height="49.552" transform="translate(-73.999 -8.58)" />
        <g transform="translate(-10.362 7.666)">
          <rect x="-5.333" y="-8.526" width="10.667" height="17.052" />
        </g>
        <g transform="translate(26.801 -13.337)">
          <rect x="-9.392" y="-5.333" width="18.784" height="10.667" />
        </g>
        <g transform="translate(47.206 -28.231)">
          <circle cx="0" cy="0" r="5.991" />
        </g>
        <g transform="translate(68.352 -13.305)">
          <rect x="-9.282" y="-4.364" width="18.564" height="8.727" />
        </g>
        <g transform="translate(-138.403 8.208)">
          <rect x="-5.818" y="-5.333" width="11.636" height="10.667" />
        </g>
        <g transform="translate(-138.403 -14.718)">
          <rect x="-5.818" y="-5.332" width="11.636" height="10.664" />
        </g>
        <g transform="translate(-74.766 20.597)">
          <path d="M117.811 100.111h-10.667v16.303c6.272-2.759 10.667-9.024 10.667-16.303z" transform="translate(-112.477 -108.263)" />
        </g>
        <g transform="translate(-38.843 -0.032)">
          <path d="M115.817 92.968C113.058 86.696 106.793 82.301 99.513 82.301v10.667z" transform="translate(-107.665 -87.634)" />
        </g>
        <rect x="-5.333" y="-4.364" width="10.667" height="8.727" />
      </g>
    </svg>
  );
}
