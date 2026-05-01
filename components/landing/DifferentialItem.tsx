import { MonoLabel } from "@/components/landing/MonoLabel";

export function DifferentialItem({
  index,
  title,
  body
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <li className="grid gap-4 border-t border-vm-line-cool py-6 sm:grid-cols-[88px_minmax(0,0.42fr)_minmax(0,0.58fr)] sm:items-start sm:gap-6">
      <MonoLabel className="text-vm-cyan-deep">{index}</MonoLabel>
      <h3 className="text-[18px] font-semibold leading-[1.25] text-vm-ink">{title}</h3>
      <p className="max-w-prose text-[15px] leading-[1.6] text-vm-muted">{body}</p>
    </li>
  );
}
