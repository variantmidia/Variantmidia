import { cn } from "@/lib/cn";

export function Container({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:px-8 xl:px-12", className)}>
      {children}
    </div>
  );
}
