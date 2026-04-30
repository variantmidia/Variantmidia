import type { SVGProps } from "react";

export function BrandMark({
  className,
  variant = "ink",
  ...props
}: {
  className?: string;
  variant?: "ink" | "white";
} & SVGProps<SVGSVGElement>) {
  const fill = variant === "white" ? "#FFFFFF" : "#1A1A1A";

  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <polygon points="32,8 4,8 4,56 14,56 14,30 32,46" fill={fill} />
      <polygon points="32,8 60,8 60,56 50,56 50,30 32,46" fill={fill} />
      <polygon points="32,8 14,30 32,46 50,30" fill="#16D4E8" />
    </svg>
  );
}
