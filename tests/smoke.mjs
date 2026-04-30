import { readFile } from "node:fs/promises";

const requiredFiles = [
  "next.config.ts",
  "tsconfig.json",
  "tailwind.config.ts",
  "postcss.config.mjs",
  "app/layout.tsx",
  "app/page.tsx",
  "app/globals.css",
  "components/landing/Container.tsx",
  "components/landing/Section.tsx",
  "components/landing/Eyebrow.tsx",
  "components/landing/MonoLabel.tsx",
  "components/landing/Button.tsx",
  "components/landing/Card.tsx",
  "components/landing/PainCard.tsx",
  "components/landing/BrandMark.tsx",
  "components/landing/Chevron.tsx",
  "components/landing/Header.tsx",
  "components/landing/Footer.tsx",
  "components/landing/sections/Hero.tsx",
  "components/landing/sections/Credibility.tsx",
  "components/landing/sections/Pain.tsx",
  "public/logos/horizontal-light.svg"
];

for (const file of requiredFiles) {
  await readFile(file, "utf8");
}

const packageJson = JSON.parse(await readFile("package.json", "utf8"));
const requiredDependencies = [
  "next",
  "react",
  "react-dom",
  "clsx",
  "tailwind-merge",
  "lucide-react"
];

for (const dependency of requiredDependencies) {
  if (!packageJson.dependencies?.[dependency]) {
    throw new Error(`Missing dependency: ${dependency}`);
  }
}

const page = await readFile("app/page.tsx", "utf8");
const hero = await readFile("components/landing/sections/Hero.tsx", "utf8");
const credibilitySection = await readFile("components/landing/sections/Credibility.tsx", "utf8");
const painCard = await readFile("components/landing/PainCard.tsx", "utf8");
const painSection = await readFile("components/landing/sections/Pain.tsx", "utf8");

if (!page.includes("Variant Media") && !hero.includes("hero.title")) {
  throw new Error("Home page must render the Variant Media hero content.");
}

if (!page.includes("@/lib/content")) {
  throw new Error("Public page copy must come from lib/content.ts.");
}

for (const token of [
  "Header",
  "Footer",
  "Hero",
  "Credibility",
  "Pain",
  'id="metodo"',
  'id="tecnologia"',
  'id="diferenciais"',
  'id="faq"',
  'id="cta-final"'
]) {
  if (!page.includes(token)) {
    throw new Error(`Public page shell missing: ${token}`);
  }
}

if (page.includes("neutral-")) {
  throw new Error("Page should use vm design tokens instead of neutral Tailwind colors.");
}

const layout = await readFile("app/layout.tsx", "utf8");

for (const font of ["Inter", "JetBrains_Mono", "Fraunces"]) {
  if (!layout.includes(font)) {
    throw new Error(`Root layout must import/configure ${font} via next/font/google.`);
  }
}

for (const variable of [
  "--vm-font-sans-loaded",
  "--vm-font-mono-loaded",
  "--vm-font-serif-loaded"
]) {
  if (!layout.includes(variable)) {
    throw new Error(`Root layout must expose font variable ${variable}.`);
  }
}

if (!layout.includes('lang="pt-BR"')) {
  throw new Error('Root layout must define html lang="pt-BR".');
}

if (!layout.includes("Assessoria de performance juridica")) {
  throw new Error("Metadata must reflect the PRD positioning.");
}

const tailwindConfig = await readFile("tailwind.config.ts", "utf8");

for (const token of [
  'bg: "#F2F4F1"',
  '"cyan-deep": "#0FB8CC"',
  '"2xl": "1240px"',
  '"vm-grid"',
  '"vm-fade-up"',
  '"vm-cyan"'
]) {
  if (!tailwindConfig.includes(token)) {
    throw new Error(`Tailwind config missing design-system token: ${token}`);
  }
}

const globals = await readFile("app/globals.css", "utf8");

for (const token of [
  "--vm-bg: #F2F4F1",
  "--vm-container: 1240px",
  ".vm-display",
  ".vm-h1",
  ".vm-h2",
  ".vm-h3",
  ".vm-lead",
  ".vm-mono-label",
  ".vm-eyebrow",
  ".vm-underline",
  "prefers-reduced-motion"
]) {
  if (!globals.includes(token)) {
    throw new Error(`Global CSS missing design-system token/class: ${token}`);
  }
}

const cn = await readFile("lib/cn.ts", "utf8");

for (const token of ["clsx", "twMerge", "export function cn"]) {
  if (!cn.includes(token)) {
    throw new Error(`cn helper missing: ${token}`);
  }
}

const content = await readFile("lib/content.ts", "utf8");

for (const token of [
  "export const content",
  "Agendar diagnóstico",
  "Entender o método",
  "Dependência de indicação",
  "Lead que chega e se perde",
  "Curioso demais, cliente de menos",
  "Comercial sem método",
  "Enquanto isso não fica visível, qualquer investimento parece tentativa e erro.",
  "oferta",
  "demanda",
  "conversão",
  "href",
  "Isso não se resolve com mais post, mais clique ou mais promessa."
]) {
  if (!content.includes(token)) {
    throw new Error(`Centralized content missing: ${token}`);
  }
}

const container = await readFile("components/landing/Container.tsx", "utf8");

for (const token of [
  "export function Container",
  "max-w-[1240px]",
  "px-5",
  "@/lib/cn"
]) {
  if (!container.includes(token)) {
    throw new Error(`Container component missing: ${token}`);
  }
}

const section = await readFile("components/landing/Section.tsx", "utf8");

for (const token of [
  'type Variant = "default" | "alt" | "dark"',
  'type Padding = "default" | "tight"',
  "variant?: Variant",
  "padding?: Padding",
  "id?: string",
  "className?: string",
  "bg-vm-bg text-vm-graphite",
  "bg-vm-bg-alt text-vm-graphite",
  "bg-vm-panel text-vm-panel-text",
  "py-[clamp(72px,10vw,128px)]",
  "py-[clamp(56px,8vw,96px)]"
]) {
  if (!section.includes(token)) {
    throw new Error(`Section component missing: ${token}`);
  }
}

const eyebrow = await readFile("components/landing/Eyebrow.tsx", "utf8");

for (const token of ["export function Eyebrow", "vm-eyebrow", "React.ReactNode"]) {
  if (!eyebrow.includes(token)) {
    throw new Error(`Eyebrow component missing: ${token}`);
  }
}

const monoLabel = await readFile("components/landing/MonoLabel.tsx", "utf8");

for (const token of [
  "export function MonoLabel",
  "vm-mono-label",
  "className?: string",
  "@/lib/cn"
]) {
  if (!monoLabel.includes(token)) {
    throw new Error(`MonoLabel component missing: ${token}`);
  }
}

const button = await readFile("components/landing/Button.tsx", "utf8");

for (const token of [
  "export function Button",
  'type Variant = "primary" | "ghost" | "cyan"',
  'type Size = "sm" | "md" | "lg"',
  "variant?: Variant",
  "size?: Size",
  "pill?: boolean",
  "withArrow?: boolean",
  "ArrowRight",
  "bg-vm-ink text-white",
  "border border-vm-line-cool",
  "bg-vm-cyan text-vm-ink",
  "hover:-translate-y-0.5",
  "hover:shadow-vm-cta-h",
  "rounded-pill",
  "@/lib/cn"
]) {
  if (!button.includes(token)) {
    throw new Error(`Button component missing: ${token}`);
  }
}

const card = await readFile("components/landing/Card.tsx", "utf8");

for (const token of [
  "export function Card",
  'type Variant = "default" | "alt" | "dark"',
  "variant?: Variant",
  "bg-vm-surface text-vm-graphite",
  "bg-vm-bg-alt text-vm-graphite",
  "bg-vm-panel-2 text-vm-panel-text",
  "border border-vm-line",
  "border-white/10",
  "rounded-sm",
  "shadow-vm-sm",
  "@/lib/cn"
]) {
  if (!card.includes(token)) {
    throw new Error(`Card component missing: ${token}`);
  }
}

for (const token of [
  "export function PainCard",
  "title",
  "body",
  "Card",
  "vm-h3",
  "text-vm-muted",
  "border-vm-line-cool"
]) {
  if (!painCard.includes(token)) {
    throw new Error(`PainCard component missing: ${token}`);
  }
}

for (const token of [
  "export function Pain",
  "content.pain",
  'id="gargalos"',
  'variant="alt"',
  "pain.cards.map",
  "PainCard",
  "pain.closing"
]) {
  if (!painSection.includes(token)) {
    throw new Error(`Pain section missing: ${token}`);
  }
}

if (credibilitySection.includes('id="gargalos"')) {
  throw new Error("Credibility must not own the #gargalos anchor once Pain exists.");
}

const brandMark = await readFile("components/landing/BrandMark.tsx", "utf8");

for (const token of [
  "export function BrandMark",
  'variant = "ink"',
  'variant?: "ink" | "white"',
  'variant === "white" ? "#FFFFFF" : "#1A1A1A"',
  'fill="#16D4E8"',
  'viewBox="0 0 64 64"',
  'aria-hidden="true"',
  "<polygon"
]) {
  if (!brandMark.includes(token)) {
    throw new Error(`BrandMark component missing: ${token}`);
  }
}

for (const forbidden of [".png", ".jpg", ".jpeg", "next/image"]) {
  if (brandMark.includes(forbidden)) {
    throw new Error(`BrandMark must not use raster/external logo asset: ${forbidden}`);
  }
}

const chevron = await readFile("components/landing/Chevron.tsx", "utf8");

for (const token of [
  "export function Chevron",
  'type ChevronTone = "default" | "strong"',
  "toneStyles",
  "strong",
  'aria-hidden="true"',
  'viewBox="0 0 600 600"',
  "vm-chev-grad-${tone}",
  "gradientId",
  'stopColor="#16D4E8"',
  "fill={`url(#${gradientId})`}",
  "stopOpacity={style.start}",
  "stopOpacity={style.end}",
  "stroke={style.strokeTop}",
  "stroke={style.strokeBottom}"
]) {
  if (!chevron.includes(token)) {
    throw new Error(`Chevron component missing: ${token}`);
  }
}

const header = await readFile("components/landing/Header.tsx", "utf8");

for (const token of [
  '"use client"',
  "export function Header",
  'src="/logos/horizontal-light.svg"',
  'alt="Variant Media"',
  "content.nav.links.map",
  'href={content.nav.cta.href}',
  'size="sm"',
  "withArrow",
  "Menu",
  "X",
  "menuOpen",
  "lg:hidden",
  "hidden shrink-0 lg:inline-flex",
  "hidden items-center gap-7 lg:flex",
  "window.scrollY > 8",
  "fixed inset-x-0 top-0",
  "z-[80]",
  "backdrop-blur-2xl",
  "bg-vm-bg-alt/38"
]) {
  if (!header.includes(token)) {
    throw new Error(`Header component missing: ${token}`);
  }
}

const footer = await readFile("components/landing/Footer.tsx", "utf8");

for (const token of [
  "export function Footer",
  "bg-vm-panel text-vm-panel-text",
  "variant=\"white\"",
  "font-bold",
  "font-extralight",
  "© 2026 Variant Media",
  "@/components/landing/BrandMark"
]) {
  if (!footer.includes(token)) {
    throw new Error(`Footer component missing: ${token}`);
  }
}

for (const token of [
  "export function Hero",
  "@/lib/content",
  "@/components/landing/Section",
  "@/components/landing/Container",
  "@/components/landing/Button",
  "@/components/landing/MonoLabel",
  "@/components/landing/Chevron",
  "vm-display",
  "hero.title.strike",
  'className="strike"',
  "hero.title.line2",
  "hero.title.line3",
  "hero.title.accent",
  "hero.sub",
  "max-[360px]:text-[34px]",
  "min-w-0 max-w-full whitespace-normal",
  "sm:before:content-['\\00a0']",
  "hero.cta.primary.href",
  "hero.cta.secondary.href",
  "Link href={hero.cta.primary.href}",
  "Link href={hero.cta.secondary.href}",
  "pill"
]) {
  if (!hero.includes(token)) {
    throw new Error(`Hero component missing: ${token}`);
  }
}

for (const token of [
  "export function Credibility",
  "@/lib/content",
  "@/components/landing/Section",
  "@/components/landing/Container",
  "@/components/landing/Card",
  'variant="default"',
  'padding="tight"',
  "border-y border-vm-line",
  "content",
  "credibility.title",
  "credibility.body",
  "credibility.cards.map",
  "Credibilidade inicial",
  "padStart(2",
  "min-h-[220px]",
  "vm-eyebrow",
  "vm-h2",
  "vm-h3",
  "text-vm-muted"
]) {
  if (!credibilitySection.includes(token)) {
    throw new Error(`Credibility section missing: ${token}`);
  }
}

for (const token of [
  'primary: { label: "Agendar diagnóstico", href: "#cta-final" }',
  'secondary: { label: "Entender o método", href: "#metodo" }'
]) {
  if (!content.includes(token)) {
    throw new Error(`Hero CTA content missing: ${token}`);
  }
}

for (const forbidden of ["<form", "onSubmit", "fetch("]) {
  if (hero.includes(forbidden)) {
    throw new Error(`Hero must not introduce fake form/backend behavior: ${forbidden}`);
  }
}

const horizontalLogo = await readFile("public/logos/horizontal-light.svg", "utf8");

for (const token of ['<svg width="1899" height="336"', 'fill="#16D4E8"', 'fill="#2B2B2B"']) {
  if (!horizontalLogo.includes(token)) {
    throw new Error(`Horizontal nav logo missing expected SVG token: ${token}`);
  }
}
