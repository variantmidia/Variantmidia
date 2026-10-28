import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { hasValidSession } from "../_auth";

const SHEETS_SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || "1jw5y9dUV-XUUJEj249p3KBl1rYla2ylGxWqJ4pAfCfA";
const RASTREIO_TAB = process.env.GOOGLE_SHEETS_RASTREIO_TAB || "Planilha de Rastreio NÂO ALTERAR";
const CRM_TAB = process.env.GOOGLE_SHEETS_CRM_TAB || "CRM RENATO PRETEL";

type SheetRow = string[];
type CrmDailyRow = {
  date: string;
  totalLeads: number;
  effectiveOnly: number;
  qualified: number;
  effectiveTotal: number;
  converted: number;
};

const getSheetsAccessToken = async () => {
  if (process.env.GOOGLE_SHEETS_ACCESS_TOKEN) return process.env.GOOGLE_SHEETS_ACCESS_TOKEN;

  const clientId = process.env.GOOGLE_SHEETS_CLIENT_ID || process.env.GOOGLE_ADS_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_SHEETS_CLIENT_SECRET || process.env.GOOGLE_ADS_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_SHEETS_REFRESH_TOKEN || process.env.GOOGLE_ADS_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) return null;

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });
  if (!response.ok) { const error = await response.json(); throw new Error(`OAuth: ${error.error || response.status}`); }
  const json = (await response.json()) as { access_token?: string };
  return json.access_token || null;
};

const readSheetValues = async (accessToken: string, tab: string, range: string) => {
  const quotedTab = `'${tab.replace(/'/g, "''")}'!${range}`;
  const url = new URL(`https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_SPREADSHEET_ID}/values/${encodeURIComponent(quotedTab)}`);
  url.searchParams.set("valueRenderOption", "FORMATTED_VALUE");
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Sheets API failed: ${response.status}`);
  const json = (await response.json()) as { values?: SheetRow[] };
  return json.values || [];
};

const dateFromBR = (value: string) => {
  const match = String(value || "").match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  return match ? `${match[3]}-${match[2]}-${match[1]}` : null;
};

const syncCrmFromSheets = async () => {
  const accessToken = await getSheetsAccessToken();
  if (!accessToken) throw new Error("Credenciais do CRM ausentes");

  const metadata = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_SPREADSHEET_ID}?fields=sheets(properties(title,sheetId))`, { headers: { Authorization: `Bearer ${accessToken}` }, cache: "no-store" });
  if (!metadata.ok) throw new Error(`Sheets metadata: ${metadata.status}`);
  const tabs = (await metadata.json()).sheets as { properties: { title: string; sheetId: number } }[];
  const trackingTab = tabs.find(t => t.properties.sheetId === 1253000786)?.properties.title || tabs.find(t => t.properties.title === RASTREIO_TAB)?.properties.title;
  if (!trackingTab) throw new Error("Aba de rastreio nao encontrada");

  const [rastreioRows, crmRows] = await Promise.all([
    readSheetValues(accessToken, trackingTab, "A2:Q"),
    readSheetValues(accessToken, CRM_TAB, "A2:I"),
  ]);
  const daily = new Map<string, CrmDailyRow>();
  const getRow = (date: string) => daily.get(date) || {
    date,
    totalLeads: 0,
    effectiveOnly: 0,
    qualified: 0,
    effectiveTotal: 0,
    converted: 0,
  };

  const seen = new Set<string>();
  for (const row of rastreioRows) {
    const date = dateFromBR(row[0]);
    if (!date) continue;
    const identity = `${date}:${row[4] || row[0]}`;
    if (seen.has(identity)) continue;
    seen.add(identity);
    const effective = String(row[14] || "").trim().toUpperCase() === "TRUE";
    const qualified = String(row[15] || "").trim().toUpperCase() === "TRUE";
    const converted = String(row[16] || "").trim().toUpperCase() === "TRUE";
    const current = getRow(date);
    current.totalLeads += 1;
    if (effective || qualified || converted) current.effectiveTotal += 1;
    if (qualified) current.qualified += 1;
    if (effective && !qualified) current.effectiveOnly += 1;
    if (converted) current.converted += 1;
    daily.set(date, current);
  }

  // The CRM tab can receive a classification before the rastreio row is marked.
  // Use it only for dates that have no classified rastreio data, preventing duplicates.
  for (const row of crmRows) {
    const date = dateFromBR(row[0]);
    const effective = Number(String(row[1] || "").replace(",", ".")) || 0;
    const qualified = Number(String(row[2] || "").replace(",", ".")) || 0;
    if (!date || (!effective && !qualified) || daily.has(date)) continue;
    daily.set(date, {
      date,
      totalLeads: Math.max(effective, qualified),
      effectiveOnly: Math.max(0, effective - qualified),
      qualified,
      effectiveTotal: effective,
      converted: Number(String(row[5] || "").replace(",", ".")) || 0,
    });
  }

  const dailyRows = [...daily.values()].sort((a, b) => a.date.localeCompare(b.date));
  return {
    source: "Planilha de Rastreio + CRM Renato Pretel (ao vivo)",
    totalLeads: dailyRows.reduce((sum, row) => sum + row.totalLeads, 0),
    effectiveLeads: dailyRows.reduce((sum, row) => sum + row.effectiveTotal, 0),
    effectiveOnlyLeads: dailyRows.reduce((sum, row) => sum + row.effectiveOnly, 0),
    qualifiedLeads: dailyRows.reduce((sum, row) => sum + row.qualified, 0),
    sales: dailyRows.reduce((sum, row) => sum + row.converted, 0),
    daily: dailyRows,
  };
};

export async function GET(request: NextRequest) {
  if (!hasValidSession(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const json = await readFile(join(process.cwd(), "app", "dashboard", "renato-pretel", "data", "report.json"), "utf8");
  const report = JSON.parse(json) as Record<string, unknown>;
  const sync: Record<string, unknown> = {};
  try {
    const liveCrm = await syncCrmFromSheets();
    if (liveCrm) {
      report.crm = { ...(report.crm as Record<string, unknown>), ...liveCrm };
      sync.crm = { status: "live", checkedAt: new Date().toISOString() };
      report.updatedAt = new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
        timeZone: "America/Sao_Paulo",
      }).format(new Date());
    }
  } catch (error) {
    sync.crm = { status: "error", message: error instanceof Error ? error.message : "Falha no CRM" };
  }
  try { Object.assign(report, await syncAds()); sync.ads = { status: "live", checkedAt: new Date().toISOString() }; }
  catch (error) { sync.ads = { status: "error", message: error instanceof Error ? error.message : "Falha no Google Ads" }; }
  report.sync = sync;
  report.dataEnd = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date());
  const end = new Date(`${report.dataEnd}T12:00:00Z`);
  end.setUTCDate(end.getUTCDate() - 13);
  report.defaultRange = { start: end.toISOString().slice(0, 10), end: report.dataEnd };

  return new NextResponse(JSON.stringify(report), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "private, no-store",
    },
  });
}

async function syncAds() {
  const clean = (value?: string) => (value || "").trim();
  const response = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ client_id: clean(process.env.GOOGLE_ADS_CLIENT_ID), client_secret: clean(process.env.GOOGLE_ADS_CLIENT_SECRET), refresh_token: clean(process.env.GOOGLE_ADS_REFRESH_TOKEN), grant_type: "refresh_token" }), cache: "no-store" });
  const auth = await response.json();
  if (!response.ok) throw new Error(`Ads OAuth: ${auth.error || response.status}`);
  const headers: Record<string, string> = { Authorization: `Bearer ${auth.access_token}`, "developer-token": clean(process.env.GOOGLE_ADS_DEVELOPER_TOKEN), "Content-Type": "application/json" };
  if (process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID) headers["login-customer-id"] = clean(process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID).replace(/-/g, "");
  const customer = clean(process.env.GOOGLE_ADS_CUSTOMER_ID || "2957414935").replace(/-/g, "");
  const version = clean(process.env.GOOGLE_ADS_API_VERSION || "v22");
  const query = async (resource: string, dimension = "") => {
    const res = await fetch(`https://googleads.googleapis.com/${version}/customers/${customer}/googleAds:searchStream`, { method: "POST", headers, body: JSON.stringify({ query: `SELECT segments.date, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions${dimension ? `, ${dimension}` : ""} FROM ${resource} WHERE segments.date >= '2026-07-13' AND segments.date <= '${new Date().toISOString().slice(0,10)}' ORDER BY segments.date` }), cache: "no-store" });
    if (!res.ok) { const detail = await res.json(); throw new Error(`Google Ads API: ${detail.error?.message || detail[0]?.error?.message || res.status}`); }
    const chunks = await res.json();
    return chunks.flatMap((chunk: { results?: Record<string, any>[] }) => chunk.results || []);
  };
  const map = (r: Record<string, any>) => ({ date: r.segments.date, label: r.segments.date.slice(5).split("-").reverse().join("/"), impressions: Number(r.metrics.impressions || 0), clicks: Number(r.metrics.clicks || 0), spend: Number(r.metrics.costMicros || 0) / 1e6, conversions: Number(r.metrics.conversions || 0) });
  const daily = (await query("customer")).map(map);
  const genderDaily = (await query("gender_view", "ad_group_criterion.gender.type")).map((r: Record<string, any>) => ({ ...map(r), key: r.adGroupCriterion.gender.type }));
  const ageDaily = (await query("age_range_view", "ad_group_criterion.age_range.type")).map((r: Record<string, any>) => ({ ...map(r), key: r.adGroupCriterion.ageRange.type }));
  return { daily, genderDaily, ageDaily, adsUpdatedAt: new Date().toISOString() };
}
