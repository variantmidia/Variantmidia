import { NextRequest, NextResponse } from "next/server";
import { buildReport, parsePeriod } from "../_model";
import { readCrm, readMeta, SourceError } from "../_sources";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
const headers = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow", "X-Content-Type-Options": "nosniff" };
type Report = ReturnType<typeof buildReport>;
const cache = new Map<string, { expires: number; report: Report }>();
const pending = new Map<string, Promise<Report>>();
export async function GET(request: NextRequest) {
  let period: ReturnType<typeof parsePeriod>;
  try { period = parsePeriod(request.nextUrl.searchParams); }
  catch (error) { return NextResponse.json({ error: (error as Error).message }, { status: 400, headers }); }
  const key = JSON.stringify(period);
  try {
    const saved = cache.get(key);
    if (saved && saved.expires > Date.now()) return NextResponse.json(saved.report, { headers });
    let task = pending.get(key);
    if (!task) {
      task = (async () => {
        const [crm, meta] = await Promise.all([readCrm(), readMeta(period)]);
        const report = buildReport(crm, meta, period, new Date().toISOString());
        // Cache limitado, apenas com dados agregados; nunca usar snapshot em falhas.
        if (cache.size >= 24) cache.delete(cache.keys().next().value!);
        cache.set(key, { expires: Date.now() + 5 * 60_000, report });
        return report;
      })().finally(() => pending.delete(key));
      pending.set(key, task);
    }
    return NextResponse.json(await task, { headers });
  } catch (error) {
    return NextResponse.json({ error: error instanceof SourceError ? error.message : "Não foi possível carregar as fontes. Tente novamente em instantes.", source: error instanceof SourceError ? error.source : "sources" }, { status: 502, headers });
  }
}
