import { Card } from "@/components/landing/Card";

export function PainCard({ title, body }: { title: string; body: string }) {
  return (
    <Card className="h-full border-vm-line-cool bg-vm-surface p-6 lg:p-7">
      <div className="mb-5 h-1 w-10 bg-vm-cyan-deep" aria-hidden />
      <h3 className="vm-h3 max-w-[15ch]">{title}</h3>
      <p className="mt-5 text-[15px] leading-[1.55] text-vm-muted">{body}</p>
    </Card>
  );
}
