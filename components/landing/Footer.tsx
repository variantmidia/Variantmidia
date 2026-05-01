import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-vm-panel text-vm-panel-text">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-16 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:items-start">
          <div>
            <Link href="/" aria-label="Variant Media - inicio" className="mb-4 inline-flex">
              <img
                src="/logos/horizontal-dark.svg"
                alt="Variant Media"
                width="1899"
                height="336"
                className="h-8 w-auto max-w-[190px]"
              />
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
