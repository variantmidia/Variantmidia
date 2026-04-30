import { cn } from "@/lib/cn";

export function MonoLabel({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={cn("vm-mono-label", className)}>{children}</span>;
}
