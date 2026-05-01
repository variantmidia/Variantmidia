import { Card } from "@/components/landing/Card";

export function ObjectionCard({
  objection,
  response
}: {
  objection: string;
  response: string;
}) {
  return (
    <Card className="flex min-h-[250px] flex-col border-vm-line-cool bg-vm-surface p-6">
      <p className="text-[18px] font-semibold leading-[1.35] text-vm-ink">&ldquo;{objection}&rdquo;</p>
      <p className="mt-6 text-[15px] leading-[1.6] text-vm-muted">{response}</p>
    </Card>
  );
}
