import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-vm-panel text-vm-panel-text">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-16 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:items-start">
          <div>
            <Link href="/" aria-label="Variantmidia - início" className="mb-4 inline-flex">
              <img
                src="/logos/horizontal-dark.svg"
                alt="Variantmidia"
                width="1899"
                height="336"
                className="h-8 w-auto max-w-[190px]"
              />
            </Link>
            <p className="max-w-prose-narrow text-[14px] leading-[1.55] text-vm-panel-muted">
              Assessoria de performance jurídica. Diagnóstico, método e tecnologia aplicada à conversão.
            </p>
          </div>

          <div className="text-[14px] leading-[1.55] text-vm-panel-muted md:text-right">
            <p>Especializada em escritórios de advocacia.</p>
            <p className="mt-2">Oferta, demanda e conversão com critério operacional.</p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-vm-panel-line pt-6 text-[12px] text-vm-panel-muted">
          <span>© 2026 Variantmidia</span>
          <span>Performance jurídica com diagnóstico</span>
        </div>
      </div>
    </footer>
  );
}
