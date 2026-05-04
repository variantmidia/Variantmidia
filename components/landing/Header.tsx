"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/landing/Button";
import { content } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [onDarkSection, setOnDarkSection] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);

      const darkSections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-theme="dark"]'));
      setOnDarkSection(
        darkSections.some((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= 68 && rect.bottom > 24;
        })
      );
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[80] border-b backdrop-blur-2xl backdrop-saturate-150 transition-all duration-default ease-vm-ease",
        onDarkSection
          ? "border-white/10 bg-vm-panel/78 shadow-[0_1px_0_rgba(255,255,255,.08)_inset]"
          : scrolled
            ? "border-vm-line-cool/80 bg-vm-bg-alt/78 shadow-[0_1px_0_rgba(255,255,255,.65)_inset]"
            : "border-white/45 bg-vm-bg-alt/38 shadow-[0_1px_0_rgba(255,255,255,.55)_inset]"
      )}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-[min(100%,1680px)] items-center justify-between gap-5 px-5 sm:px-6 lg:px-8 xl:px-10">
        <Link href="/" aria-label="Variantmidia - início" className="flex min-w-0 items-center">
          {onDarkSection ? (
            <img
              src="/logos/horizontal-dark.svg"
              alt="Variantmidia"
              width="1899"
              height="336"
              className="h-8 w-auto max-w-[168px] sm:max-w-[190px]"
            />
          ) : (
            <img
              src="/logos/horizontal-light.svg"
              alt="Variantmidia"
              width="1899"
              height="336"
              className="h-8 w-auto max-w-[168px] sm:max-w-[190px]"
            />
          )}
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {content.nav.links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm transition-colors duration-fast",
                onDarkSection ? "text-vm-panel-muted hover:text-white" : "text-vm-muted hover:text-vm-ink"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href={content.nav.cta.href} className="hidden shrink-0 lg:inline-flex">
          <Button
            size="sm"
            withArrow
            className={cn(onDarkSection && "border-white/18 bg-white text-vm-ink hover:border-white hover:bg-white")}
          >
            {content.nav.cta.label}
          </Button>
        </Link>

        <button
          type="button"
          className={cn(
            "fixed right-5 top-3.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-pill border shadow-[0_1px_0_rgba(255,255,255,.7)_inset] backdrop-blur-xl transition lg:hidden",
            onDarkSection
              ? "border-white/15 bg-white/10 text-white hover:border-white/25 hover:bg-white/15"
              : "border-vm-line-cool/80 bg-white/55 text-vm-ink hover:border-vm-ink/20 hover:bg-white/75"
          )}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className={cn(
          "mx-5 overflow-hidden rounded-sm border border-vm-line-cool/80 bg-vm-bg-alt/88 shadow-vm backdrop-blur-2xl transition-all duration-default lg:hidden",
          menuOpen ? "mb-4 max-h-96 opacity-100" : "max-h-0 border-transparent opacity-0"
        )}
      >
        <nav aria-label="Mobile" className="grid p-2">
          {content.nav.links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm px-3 py-3 text-sm text-vm-graphite transition-colors hover:bg-white/65"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={content.nav.cta.href}
            className="mt-1 rounded-sm bg-vm-ink px-3 py-3 text-sm font-medium text-white"
            onClick={() => setMenuOpen(false)}
          >
            {content.nav.cta.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
