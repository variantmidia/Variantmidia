import { createHash, timingSafeEqual } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const printHeaders = {
  "X-Robots-Tag": "noindex, nofollow",
  "Cache-Control": "no-store, private",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
};

export function validPrintToken(provided: string | null, expected = process.env.PRINT_TOKEN_RENATO_PRETEL) {
  if (!expected || expected.trim().length < 32 || !provided || provided.length > 1024) return false;
  // Fixed-length digests keep the comparison independent of secret length.
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(provided), digest(expected));
}

export function printMonth(value: string | null, now = new Date()) {
  const local = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit" }).formatToParts(now);
  const part = (type: string) => Number(local.find(p => p.type === type)?.value);
  const previous = new Date(Date.UTC(part("year"), part("month") - 2, 1));
  const month = value ?? previous.toISOString().slice(0, 7);
  if (!/^(20\d{2})-(0[1-9]|1[0-2])$/.test(month)) return null;
  const [year, number] = month.split("-").map(Number);
  const start = `${month}-01`;
  const end = new Date(Date.UTC(year, number, 0)).toISOString().slice(0, 10);
  const name = new Intl.DateTimeFormat("pt-BR", { month: "long", timeZone: "UTC" }).format(new Date(`${start}T12:00:00Z`));
  return { start, end, title: `Relatório de ${name[0].toUpperCase() + name.slice(1)} de ${year}` };
}

export async function renderPrint(report: Record<string, any>, period: NonNullable<ReturnType<typeof printMonth>>, nonce: string) {
  const root = join(process.cwd(), "app", "dashboard", "renato-pretel");
  const [template, stylesheet, application, chart, logo] = await Promise.all([
    readFile(join(root, "dashboard.html"), "utf8"),
    readFile(join(root, "src", "styles.css"), "utf8"),
    readFile(join(root, "src", "app.js"), "utf8"),
    readFile(join(process.cwd(), "public", "vendor", "chart-4.4.6.umd.js"), "utf8"),
    readFile(join(process.cwd(), "public", "logos", "horizontal-light.svg")),
  ]);
  const embedded = { ...report, defaultRange: { start: period.start, end: period.end }, printMode: true, budgetRange: { start: period.start, end: period.end } };
  // Escape HTML-significant characters before embedding data in a script element.
  const serialized = JSON.stringify(embedded).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  const script = (code: string) => `<script nonce="${nonce}">${code.replace(/<\/script/gi, "<\\/script")}</script>`;
  const css = stylesheet.replace(/@import\s+url\([^;]+;/g, "");
  const printCss = `
    html,body{width:1200px!important;min-width:1200px!important;background:#f5f7f8!important;margin:0!important;overflow:visible!important}
    .sidebar,.filter-bar,.topbar,button,input,.preset-btn{display:none!important}
    .dashboard-shell{margin:0!important;width:1200px!important;max-width:1200px!important;padding:24px 28px 32px!important}
    .print-heading{display:flex;align-items:center;justify-content:space-between;padding-bottom:20px;border-bottom:1px solid #e4e9eb}
    .print-heading h1{font-size:28px;margin:0}.print-heading img{width:170px;height:32px}
    .hero{display:flex!important}.hero h1{font-size:24px}.metric-grid{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important}
    .content-grid{grid-template-columns:repeat(6,minmax(0,1fr))!important}.trend-panel{grid-column:span 6!important;grid-row:1!important}
    .funnel-panel{grid-column:span 2!important;grid-row:2!important}.content-grid>#publico{grid-column:3/span 2!important;grid-row:2!important}
    .content-grid>.panel:nth-child(4){grid-column:span 6!important;grid-row:3!important}.content-grid>.panel:last-child{grid-column:5/span 2!important;grid-row:2!important}
    .conversion-summary{display:flex!important}.gauge svg{display:block!important}.gauge-fill{transition:none!important}*{animation:none!important;transition:none!important}
    ${report.salesConfirmation?.confirmedAt > period.end ? ".sales-summary{display:none!important}" : ""}
  `;
  return template
    .replace(/<aside\b[^>]*>[\s\S]*?<\/aside>/, "")
    .replace(/<section class="filter-bar"[\s\S]*?<\/section>/, "")
    .replace(/<div class="topbar">[\s\S]*?<\/div>/, "")
    .replace(/<link\b[^>]*>/g, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
    .replace(/<title>[^<]*<\/title>/, `<title>${period.title} | Renato Pretel</title>`)
    .replace("</head>", `<meta name="robots" content="noindex, nofollow"><meta name="referrer" content="no-referrer"><style>${css}\n${printCss}</style></head>`)
    .replace("<body>", '<body class="print-report" data-print-ready="false">')
    .replace('<main class="dashboard-shell">', `<main class="dashboard-shell"><div class="print-heading"><h1>${period.title}</h1><img src="data:image/svg+xml;base64,${logo.toString("base64")}" alt="Variantmidia"></div>`)
    .replace("</body>", `${script(`window.__RENATO_PRINT__=${serialized};`)}${script(chart.replace(/\/\/# sourceMappingURL=.*$/gm, ""))}${script(application)}</body>`);
}
