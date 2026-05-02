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
  "components/landing/BenefitCard.tsx",
  "components/landing/BenefitTile.tsx",
  "components/landing/DialogueExchange.tsx",
  "components/landing/DiagnosticFlow.tsx",
  "components/landing/DifferentialItem.tsx",
  "components/landing/ObjectionCard.tsx",
  "components/landing/ProofPlaceholder.tsx",
  "components/landing/FAQItem.tsx",
  "components/landing/MiniStat.tsx",
  "components/landing/TechPanel.tsx",
  "components/landing/PainCard.tsx",
  "components/landing/BrandMark.tsx",
  "components/landing/Chevron.tsx",
  "components/landing/Header.tsx",
  "components/landing/Footer.tsx",
  "components/landing/sections/Differentials.tsx",
  "components/landing/sections/Objections.tsx",
  "components/landing/sections/FAQ.tsx",
  "components/landing/sections/FinalCTA.tsx",
  "components/landing/sections/Hero.tsx",
  "components/landing/sections/Credibility.tsx",
  "components/landing/sections/Pain.tsx",
  "components/landing/sections/Operation.tsx",
  "public/logos/horizontal-light.svg",
  "public/logos/horizontal-dark.svg",
  "lib/hooks/useCountUp.ts"
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
const benefitCard = await readFile("components/landing/BenefitCard.tsx", "utf8");
const benefitTile = await readFile("components/landing/BenefitTile.tsx", "utf8");
const dialogueExchange = await readFile("components/landing/DialogueExchange.tsx", "utf8");
const diagnosticFlow = await readFile("components/landing/DiagnosticFlow.tsx", "utf8");
const differentialItem = await readFile("components/landing/DifferentialItem.tsx", "utf8");
const objectionCard = await readFile("components/landing/ObjectionCard.tsx", "utf8");
const proofPlaceholder = await readFile("components/landing/ProofPlaceholder.tsx", "utf8");
const faqItem = await readFile("components/landing/FAQItem.tsx", "utf8");
const miniStat = await readFile("components/landing/MiniStat.tsx", "utf8");
const techPanel = await readFile("components/landing/TechPanel.tsx", "utf8");
const painCard = await readFile("components/landing/PainCard.tsx", "utf8");
const painSection = await readFile("components/landing/sections/Pain.tsx", "utf8");
const operationSection = await readFile("components/landing/sections/Operation.tsx", "utf8");
const differentialsSection = await readFile("components/landing/sections/Differentials.tsx", "utf8");
const objectionsSection = await readFile("components/landing/sections/Objections.tsx", "utf8");
const faqSection = await readFile("components/landing/sections/FAQ.tsx", "utf8");
const finalCTASection = await readFile("components/landing/sections/FinalCTA.tsx", "utf8");
const content = await readFile("lib/content.ts", "utf8");
const useCountUp = await readFile("lib/hooks/useCountUp.ts", "utf8");

if (!page.includes("Variant Media") && !hero.includes("hero.title")) {
  throw new Error("Home page must render the Variant Media hero content.");
}

const contentConsumers = [
  hero,
  credibilitySection,
  painSection,
  operationSection,
  differentialsSection,
  objectionsSection,
  faqSection,
  finalCTASection
];

if (!contentConsumers.every((file) => file.includes("@/lib/content"))) {
  throw new Error("Public page section copy must come from lib/content.ts.");
}

for (const token of [
  "Header",
  "Footer",
  "Hero",
  "Credibility",
  "Pain",
  "Operation",
  "Differentials",
  "Objections",
  "FAQ",
  "FinalCTA"
]) {
  if (!page.includes(token)) {
    throw new Error(`Public page shell missing: ${token}`);
  }
}

const anchorTargets = new Set(
  [
    painSection,
    operationSection,
    differentialsSection,
    faqSection,
    finalCTASection
  ]
    .flatMap((file) => [...file.matchAll(/id="([^"]+)"/g)].map((match) => `#${match[1]}`))
);

const requiredAnchors = [
  "#gargalos",
  "#operacao",
  "#diferenciais",
  "#faq"
];

const whatsappHref = "https://wa.me/5511912112227?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e....";

if (!content.includes(whatsappHref)) {
  throw new Error("Centralized content missing WhatsApp CTA href.");
}

for (const href of requiredAnchors) {
  if (!content.includes(`href: "${href}"`) && !content.includes(`href="${href}"`)) {
    throw new Error(`Centralized content missing expected anchor href: ${href}`);
  }

  if (!anchorTargets.has(href)) {
    throw new Error(`Anchor href has no rendered section target: ${href}`);
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

if (!layout.includes("<body suppressHydrationWarning>")) {
  throw new Error("Root body must tolerate browser-extension attributes during hydration.");
}

for (const token of [
  'title: "Variant Media | Assessoria de performance jurídica"',
  "A Variant Media ajuda escritórios de advocacia a diagnosticar gargalos de oferta, demanda e conversão",
  "openGraph",
  'siteName: "Variant Media"',
  'locale: "pt_BR"',
  'type: "website"'
]) {
  if (!layout.includes(token)) {
    throw new Error(`Metadata must reflect the PRD positioning: ${token}`);
  }
}

if (layout.includes("og.png")) {
  throw new Error("Metadata must not depend on public/og.png until the asset exists.");
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
  "--vm-panel-muted: rgba(213,222,230,.72)",
  "--vm-container: 1240px",
  ".vm-display",
  ".vm-h1",
  ".vm-h2",
  ".vm-h3",
  ".vm-lead",
  ".vm-mono-label",
  ".vm-eyebrow",
  ".vm-eyebrow::before",
  "background: var(--vm-cyan)",
  ".vm-underline",
  "prefers-reduced-motion"
]) {
  if (!globals.includes(token)) {
    throw new Error(`Global CSS missing design-system token/class: ${token}`);
  }
}

if (!globals.includes("*:focus-visible") || !globals.includes("outline: 2px solid var(--vm-cyan)")) {
  throw new Error("Global CSS must provide visible keyboard focus.");
}

const cn = await readFile("lib/cn.ts", "utf8");

for (const token of ["clsx", "twMerge", "export function cn"]) {
  if (!cn.includes(token)) {
    throw new Error(`cn helper missing: ${token}`);
  }
}

for (const token of [
  "export const content",
  "Agendar diagnóstico",
  "Ver operação",
  "Dependência de indicação",
  "Lead que chega e se perde",
  "Curioso demais, cliente de menos",
  "Comercial sem método",
  "Enquanto isso não fica visível, qualquer investimento parece tentativa e erro.",
  "Não é sobre parecer maior. É sobre vender com mais clareza.",
  "Mais previsibilidade",
  "Mais qualificação",
  "Mais velocidade",
  "Mais controle",
  "Mais escala",
  "Por que isso é diferente de contratar uma agência genérica.",
  "Especialização jurídica",
  "Diagnóstico antes de executar",
  "Visão de ponta a ponta",
  "Acompanhamento próximo",
  "Tecnologia com critério",
  "Conversa de negócio",
  "Antes de contratar, todo escritório precisa confiar em três coisas.",
  "Prova validada",
  "Resultados e depoimentos entram aqui apenas quando houver lastro real.",
  "Perguntas frequentes",
  "O próximo passo não é aumentar o ruído. É diagnosticar o gargalo certo.",
  "Falar com a equipe",
  "Conversa objetiva. Sem pacote empurrado. Sem promessa fácil.",
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

for (const token of ["Oferta", "Demanda", "Conversão"]) {
  if (!content.includes(token)) {
    throw new Error(`Method content missing node: ${token}`);
  }
}

for (const forbidden of ["<Method />", "<AISection />", "@/components/landing/sections/Method", "@/components/landing/sections/AISection"]) {
  if (page.includes(forbidden)) {
    throw new Error(`Home page must not render removed standalone section: ${forbidden}`);
  }
}

for (const token of ["<Differentials />", "<Objections />", "<FAQ />", "<FinalCTA />"]) {
  if (!page.includes(token)) {
    throw new Error(`Home page must render conversion section: ${token}`);
  }
}

if (hero.includes("DiagnosticFlow")) {
  throw new Error("DiagnosticFlow must not appear in the hero.");
}

for (const token of [
  "vm-display",
  'className="strike"',
  "hero.title.strike",
  "pill",
  "withArrow"
]) {
  if (!hero.includes(token)) {
    throw new Error(`Hero visual QA missing: ${token}`);
  }
}

const sectionFiles = [
  hero,
  credibilitySection,
  painSection,
  operationSection,
  differentialsSection,
  objectionsSection,
  faqSection,
  finalCTASection
];

const h1Count = sectionFiles.reduce((count, file) => count + (file.match(/<h1\b/g) ?? []).length, 0);
if (h1Count !== 1 || !hero.includes("<h1")) {
  throw new Error("Landing must have exactly one H1, owned by Hero.");
}

for (const [name, file] of [
  ["Credibility", credibilitySection],
  ["Pain", painSection],
  ["Operation", operationSection],
  ["Differentials", differentialsSection],
  ["Objections", objectionsSection],
  ["FAQ", faqSection],
  ["FinalCTA", finalCTASection]
]) {
  if (!file.includes("<h2")) {
    throw new Error(`${name} section must expose an H2.`);
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
  "export function DiagnosticFlow",
  "type Status",
  "Oferta",
  "Demanda",
  "Conversão",
  "statusLabel",
  "Em análise",
  "MonoLabel",
  "cn(",
  "showFooter",
  "aria-label",
  "role=\"list\"",
  "animate-vm-pulse",
  "text-vm-cyan-deep",
  "statusColor",
  "bg-[linear-gradient",
  "vm-grid",
  "absolute inset-x-0 top-0 h-px bg-vm-cyan",
  "lg:p-8",
  "shadow-[0_24px_70px_rgba(16,24,32,0.12)]"
]) {
  if (!diagnosticFlow.includes(token)) {
    throw new Error(`DiagnosticFlow component missing: ${token}`);
  }
}

for (const forbidden of ["ROI", "12%", "4h", "cliente real", "dashboard"]) {
  if (diagnosticFlow.toLowerCase().includes(forbidden.toLowerCase())) {
    throw new Error(`DiagnosticFlow must stay illustrative, not claim real data: ${forbidden}`);
  }
}

for (const token of [
  "export function TechPanel",
  "className?: string",
  "MonoLabel",
  "cn(",
  "STAGES",
  "Triagem inicial",
  "Follow-up",
  "Resumo e contexto",
  "Bastidor",
  "Atendimento inteligente",
  "Apoio ao atendimento",
  "aria-label",
  "role=\"list\"",
  "border-vm-panel-line",
  "from-vm-panel-2",
  "to-vm-panel",
  "lg:max-w-[620px]",
  "minmax(0,1fr)",
  "motion-reduce:animate-none",
  "motion-reduce:transition-none",
  "text-vm-panel-muted",
  "bg-gradient-to-r from-vm-cyan/70 to-transparent",
  "Sinais visuais ilustrativos",
  "não para exibir dados reais"
]) {
  if (!techPanel.includes(token)) {
    throw new Error(`TechPanel component missing: ${token}`);
  }
}

for (const forbidden of [
  "Resposta media",
  "Lead qualificado",
  "Conversao",
  "4h",
  "38",
  "12%",
  "ROI",
  "dashboard",
  "Ao vivo"
]) {
  if (techPanel.toLowerCase().includes(forbidden.toLowerCase())) {
    throw new Error(`TechPanel must stay illustrative, not claim real data: ${forbidden}`);
  }
}

for (const token of [
  "export function MiniStat",
  "arrow: \"up\" | \"down\"",
  "lucide-react",
  "ArrowUpRight",
  "ArrowDownRight",
  "useCountUp",
  "useInView",
  "text-[clamp(28px,4vw,44px)]",
  "border-b border-white/[0.06]",
  "vm-ministat-bounce",
  "var(--vm-cyan)"
]) {
  if (!miniStat.includes(token)) {
    throw new Error(`MiniStat missing: ${token}`);
  }
}

for (const token of [
  "export function useCountUp",
  "targetValue: string",
  "duration: number",
  "trigger: boolean",
  "prefers-reduced-motion: reduce",
  "easeOutQuad",
  "requestAnimationFrame"
]) {
  if (!useCountUp.includes(token)) {
    throw new Error(`useCountUp missing: ${token}`);
  }
}

const allSectionDarkCount = sectionFiles.reduce(
  (count, file) => count + (file.match(/variant="dark"/g) ?? []).length,
  0
);
if (allSectionDarkCount < 1 || allSectionDarkCount > 3) {
  throw new Error("Landing must have one to three dark sections besides the footer.");
}

for (const token of [
  "export function BenefitCard",
  "index",
  "title",
  "body",
  "Card",
  "MonoLabel",
  "vm-h3",
  "text-vm-muted",
  "min-h-[220px]"
]) {
  if (!benefitCard.includes(token)) {
    throw new Error(`BenefitCard component missing: ${token}`);
  }
}

for (const token of [
  "export function DifferentialItem",
  "MonoLabel",
  "border-t border-vm-line-cool",
  "sm:grid-cols-[88px_minmax(0,0.42fr)_minmax(0,0.58fr)]",
  "text-vm-cyan-deep"
]) {
  if (!differentialItem.includes(token)) {
    throw new Error(`DifferentialItem missing: ${token}`);
  }
}

for (const token of [
  "export function Differentials",
  'id="diferenciais"',
  "content",
  "differentials.items.map",
  "DifferentialEntry",
  'variant="dark"',
  "border-y border-vm-panel-line",
  "[--vm-ink:var(--vm-panel-text)]",
  "role=\"list\"",
  "String(index + 1).padStart"
]) {
  if (!differentialsSection.includes(token)) {
    throw new Error(`Differentials section missing: ${token}`);
  }
}

if ((content.match(/title: "/g) ?? []).length < 6) {
  throw new Error("Content should include enough structured title entries for sections.");
}

for (const token of [
  "export function ObjectionCard",
  "Card",
  "&ldquo;{objection}&rdquo;",
  "response"
]) {
  if (!objectionCard.includes(token)) {
    throw new Error(`ObjectionCard missing: ${token}`);
  }
}

for (const token of [
  "export function DialogueExchange",
  "quote",
  "response",
  "font-serif",
  "italic",
  "font-light",
  "clamp(20px,2.4vw,30px)",
  "VM.",
  "C.",
  "vm-dialogue-left",
  "vm-dialogue-right",
  "vm-dialogue-avatar",
  "nth-child(2)",
  "150ms",
  "row-reverse"
]) {
  if (!dialogueExchange.includes(token)) {
    throw new Error(`DialogueExchange missing: ${token}`);
  }
}

for (const token of [
  "export function ProofPlaceholder",
  "lucide-react",
  "Plus",
  "border-dashed",
  "var(--vm-cyan)",
  "Espaço reservado para depoimentos validados",
  "Cases reais e feedbacks de clientes entram aqui apenas quando houver lastro confirmado",
  "Sem inflar números",
  "strokeWidth={1.5}"
]) {
  if (!proofPlaceholder.includes(token)) {
    throw new Error(`ProofPlaceholder missing: ${token}`);
  }
}

for (const token of [
  "export function Objections",
  "content",
  "objections.items.map",
  "DialogueExchange",
  "ProofPlaceholder",
  "label=\"OBJEÇÕES\"",
  "três coisas",
  "font-serif font-normal italic",
  "max-w-[880px]"
]) {
  if (!objectionsSection.includes(token)) {
    throw new Error(`Objections section missing: ${token}`);
  }
}

for (const token of ["ObjectionCard", "objections.proof.label", "objections.proof.title", "objections.proof.body"]) {
  if (objectionsSection.includes(token)) {
    throw new Error(`Objections section must not keep card proof wiring: ${token}`);
  }
}

for (const forbidden of ["ROI em 45 dias", "mais de 300", "case real", "resultado garantido"]) {
  if (objectionsSection.toLowerCase().includes(forbidden.toLowerCase()) || proofPlaceholder.toLowerCase().includes(forbidden.toLowerCase())) {
    throw new Error(`Proof area must not publish unvalidated claims: ${forbidden}`);
  }
}

for (const forbidden of [
  "ROI em 45 dias",
  "mais de 300 escritórios",
  "mais de 300 escritorios",
  "resultado garantido",
  "garantia de resultado"
]) {
  if (content.toLowerCase().includes(forbidden.toLowerCase())) {
    throw new Error(`Published content must not include unvalidated claim: ${forbidden}`);
  }
}

for (const token of [
  "export function FAQItem",
  "lucide-react",
  "Plus",
  "<details",
  "<summary",
  "question",
  "answer",
  "[&::-webkit-details-marker]:hidden",
  "group-open:rotate-45"
]) {
  if (!faqItem.includes(token)) {
    throw new Error(`FAQItem missing native FAQ behavior: ${token}`);
  }
}

for (const token of [
  "export function FAQ",
  'id="faq"',
  "content",
  "faq.items.map",
  "FAQItem"
]) {
  if (!faqSection.includes(token)) {
    throw new Error(`FAQ section missing: ${token}`);
  }
}

if (faqSection.includes('"use client"') || faqItem.includes('"use client"')) {
  throw new Error("FAQ must use native details/summary without client JS.");
}

for (const token of [
  "export function FinalCTA",
  "next/link",
  "@/components/landing/Button",
  'id="cta-final"',
  "finalCTA.cta.primary.href",
  "finalCTA.cta.secondary.href",
  "finalCTA.micro",
  'variant="ghost"',
  "withArrow"
]) {
  if (!finalCTASection.includes(token)) {
    throw new Error(`FinalCTA section missing: ${token}`);
  }
}

if (!content.includes('primary: { label: "Agendar diagnóstico", href: whatsappHref }')) {
  throw new Error("Final CTA primary destination must be centralized in lib/content.ts.");
}

if (content.includes('href: "#contato"')) {
  throw new Error("Final CTA must not point to missing #contato anchor.");
}

for (const token of [
  "export function Operation",
  "operation, method",
  'id="operacao"',
  'index="04"',
  'total="08"',
  "operation.benefits.map",
  "method.nodes.map",
  "BenefitTile",
  "method.title",
  "method.body",
  "Método",
  "grid-cols-3"
]) {
  if (!operationSection.includes(token)) {
    throw new Error(`Operation section missing: ${token}`);
  }
}

for (const forbidden of ["Glyph", "glyphs/", "GlyphPredictability", "GlyphQualification"]) {
  if (operationSection.includes(forbidden) || benefitTile.includes(forbidden)) {
    throw new Error(`Operation tiles must not render custom glyph icons: ${forbidden}`);
  }
}

for (const token of ['index: "01"', 'index: "02"', 'index: "03"', 'index: "04"', 'index: "05"']) {
  if (!content.includes(token)) {
    throw new Error(`Operation benefits must be numbered sequentially: ${token}`);
  }
}

for (const forbidden of ["garantido", "garantia", "ROI em 45 dias", "resultado garantido"]) {
  if (operationSection.toLowerCase().includes(forbidden.toLowerCase())) {
    throw new Error(`Operation section must not promise guaranteed results: ${forbidden}`);
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
  'variant="dark"',
  "/images/documentos-foto-adv.webp",
  "linear-gradient(90deg",
  "pain.cards.map",
  "pain.closing",
  "hover:bg-white/[0.055]"
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
  "hidden={!menuOpen}",
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

for (const token of [
  "viewBox=\"0 0 64 64\"",
  'aria-hidden="true"'
]) {
  if (!brandMark.includes(token)) {
    throw new Error(`BrandMark decorative SVG accessibility missing: ${token}`);
  }
}

for (const token of [
  'aria-hidden="true"',
  "<svg viewBox=\"0 0 600 600\""
]) {
  if (!chevron.includes(token)) {
    throw new Error(`Chevron decorative SVG accessibility missing: ${token}`);
  }
}

const footer = await readFile("components/landing/Footer.tsx", "utf8");

for (const token of [
  "export function Footer",
  "bg-vm-panel text-vm-panel-text",
  'src="/logos/horizontal-dark.svg"',
  'alt="Variant Media"',
  "max-w-[190px]",
  "© 2026 Variant Media",
  "Performance juridica com diagnostico"
]) {
  if (!footer.includes(token)) {
    throw new Error(`Footer component missing: ${token}`);
  }
}

if (footer.includes("BrandMark") || footer.includes("variant</strong>")) {
  throw new Error("Footer must use the official horizontal dark logo SVG, not inline logo text.");
}

const visualQAFiles = [
  hero,
  diagnosticFlow,
  techPanel,
  footer,
  globals,
  tailwindConfig
];

const forbiddenStructuralColor = /\b(?:bg|text|border|from|to|via|fill|stroke)-(?:purple|violet|pink|fuchsia|rose)-/i;
for (const file of visualQAFiles) {
  if (forbiddenStructuralColor.test(file)) {
    throw new Error("Visual QA forbids purple/pink structural color utilities.");
  }
}

for (const forbidden of ["preserve-3d", "translate-z", "rotate-x", "rotate-y", "perspective-", "neon"]) {
  if (visualQAFiles.some((file) => file.toLowerCase().includes(forbidden))) {
    throw new Error(`Visual QA forbids decorative 3D/neon patterns: ${forbidden}`);
  }
}

if (diagnosticFlow.includes("backdrop-blur")) {
  throw new Error("DiagnosticFlow must not use glassmorphism/backdrop blur.");
}

for (const token of [
  "export function Hero",
  "@/lib/content",
  "@/components/landing/Section",
  "@/components/landing/Container",
  "@/components/landing/Button",
  "@/components/landing/Chevron",
  "vm-display",
  "hero.title.strike",
  'className="strike"',
  "hero.title.line2",
  "hero.title.line3",
  "hero.title.accent",
  "hero.sub",
  "max-[360px]:text-[34px]",
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
  "@/components/landing/PrincipleCard",
  "lucide-react",
  "SearchCheck",
  "Scale",
  "TrendingUp",
  'variant="default"',
  'padding="tight"',
  "border-y border-vm-line",
  "content",
  "credibility.body",
  "credibility.cards.map",
  "vm-h2"
]) {
  if (!credibilitySection.includes(token)) {
    throw new Error(`Credibility section missing: ${token}`);
  }
}

for (const token of [
  'primary: { label: "Agendar diagnóstico", href: whatsappHref }',
  'secondary: { label: "Ver operação", href: "#operacao" }'
]) {
  if (!content.includes(token)) {
    throw new Error(`Hero CTA content missing: ${token}`);
  }
}

for (const label of ["Agendar diagnóstico", "Entender o método", "Falar com a equipe"]) {
  if (label.length > 28) {
    throw new Error(`CTA label is too long for stable button fit: ${label}`);
  }
}

for (const forbidden of ["<form", "onSubmit", "fetch("]) {
  if (hero.includes(forbidden)) {
    throw new Error(`Hero must not introduce fake form/backend behavior: ${forbidden}`);
  }
}

const horizontalLogo = await readFile("public/logos/horizontal-light.svg", "utf8");
const horizontalDarkLogo = await readFile("public/logos/horizontal-dark.svg", "utf8");

for (const token of ['<svg width="1899" height="336"', 'fill="#16D4E8"', 'fill="#2B2B2B"']) {
  if (!horizontalLogo.includes(token)) {
    throw new Error(`Horizontal nav logo missing expected SVG token: ${token}`);
  }
}

for (const token of ['<svg width="1899" height="336"', 'fill="#16D4E8"', 'fill="white"']) {
  if (!horizontalDarkLogo.includes(token)) {
    throw new Error(`Horizontal footer logo missing expected SVG token: ${token}`);
  }
}
