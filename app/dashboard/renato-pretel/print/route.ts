import { randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { loadReport } from "../_report";
import { printHeaders, printMonth, printCycle, renderPrint, validPrintToken } from "../_print";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const notFound = () => new NextResponse(null, { status: 404, headers: printHeaders });
  if (params.getAll("token").length !== 1 || !validPrintToken(params.get("token"))) return notFound();
  if (params.has("ciclo") && (params.has("mes") || params.getAll("ciclo").length !== 1)) return new NextResponse(null, { status: 400, headers: printHeaders });
  const period = params.has("ciclo") ? printCycle(params.get("ciclo")!) : printMonth(params.get("mes"));
  if (!period && params.has("ciclo")) return new NextResponse(null, { status: 400, headers: printHeaders });
  if (!period || params.getAll("mes").length > 1) return notFound();
  try {
    const report = await loadReport();
    const sync = report.sync as Record<string, { status: string }>;
    if (sync.crm?.status !== "live" || sync.ads?.status !== "live") {
      return new NextResponse("Relatorio temporariamente indisponivel", { status: 503, headers: printHeaders });
    }
    const nonce = randomBytes(18).toString("base64");
    return new NextResponse(await renderPrint(report, period, nonce), {
      headers: {
        ...printHeaders,
        "Content-Type": "text/html; charset=utf-8",
        "Content-Security-Policy": `default-src 'none'; script-src 'nonce-${nonce}'; style-src 'unsafe-inline'; img-src data:; font-src data:; connect-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`,
      },
    });
  } catch {
    return new NextResponse("Relatorio temporariamente indisponivel", { status: 503, headers: printHeaders });
  }
}
