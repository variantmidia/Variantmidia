import Link from "next/link";

import { BrandMark } from "@/components/landing/BrandMark";

export function Footer() {
  return (
    <footer className="bg-vm-panel text-vm-panel-text">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-16 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:items-start">
          <div>
            <Link href="/" aria-label="Variant Media - inicio" className="mb-4 flex items-center gap-3">
              <BrandMark className="h-7 w-7" variant="white" />
              <span className="text-lg text-white">
                <strong className="font-bold tracking-[-0.01em]">variant</strong>
                <span className="font-extralight">midia</span>
              </span>
            </Link>
            <p className="max-w-prose-narrow text-[14px] leading-[1.55] text-vm-panel-muted">
              Assessoria de performance juridica. Diagnostico, metodo e tecnologia aplicada a conversao.
            </p>
          </div>

          <div className="text-[14px] leading-[1.55] text-vm-panel-muted md:text-right">
            <p>Especializada em escritorios de advocacia.</p>
            <p className="mt-2">Oferta, demanda e conversao com criterio operacional.</p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-vm-panel-line pt-6 text-[12px] text-vm-panel-muted">
          <span>© 2026 Variant Media</span>
          <span>Performance juridica com diagnostico</span>
        </div>
      </div>
    </footer>
  );
}
