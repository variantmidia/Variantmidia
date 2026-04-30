import { cn } from "@/lib/cn";

type Variant = "default" | "alt" | "dark";
type Padding = "default" | "tight";

export function Section({
  variant = "default",
  padding = "default",
  className,
  children,
  id
}: {
  variant?: Variant;
  padding?: Padding;
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  const bg = {
    default: "bg-vm-bg text-vm-graphite",
    alt: "bg-vm-bg-alt text-vm-graphite",
    dark: "bg-vm-panel text-vm-panel-text"
  }[variant];

  const py = {
    default: "py-[clamp(72px,10vw,128px)]",
    tight: "py-[clamp(56px,8vw,96px)]"
  }[padding];

  return (
    <section id={id} className={cn("relative", bg, py, className)}>
      {children}
    </section>
  );
}
