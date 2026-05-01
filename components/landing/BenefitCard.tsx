import { Card } from "@/components/landing/Card";
import { MonoLabel } from "@/components/landing/MonoLabel";

export function BenefitCard({
  index,
  title,
  body
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <Card className="flex min-h-[220px] flex-col border-vm-line bg-vm-surface p-6">
      <MonoLabel className="text-vm-cyan-deep">{index}</MonoLabel>
      <h3 className="vm-h3 mt-8 max-w-[15ch]">{title}</h3>
      <p className="mt-4 text-[15px] leading-[1.55] text-vm-muted">{body}</p>
    </Card>
  );
}
