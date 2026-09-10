import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { hasValidSession } from "../_auth";

const SHEETS_SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || "1jw5y9dUV-XUUJEj249p3KBl1rYla2ylGxWqJ4pAfCfA";
const RASTREIO_TAB = process.env.GOOGLE_SHEETS_RASTREIO_TAB || "Planilha de Rastreio NÃO ALTERAR";
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
  if (!response.ok) throw new Error(`OAuth Sheets failed: ${response.status}`);
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
  if (!accessToken) return null;

  const [rastreioRows, crmRows] = await Promise.all([
    readSheetValues(accessToken, RASTREIO_TAB, "A2:Q1000"),
    readSheetValues(accessToken, CRM_TAB, "A2:I1000"),
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

  for (const row of rastreioRows) {
    const date = dateFromBR(row[0]);
    if (!date) continue;
    const effective = String(row[14] || "").trim().toUpperCase() === "TRUE";
    const qualified = String(row[15] || "").trim().toUpperCase() === "TRUE";
    const converted = String(row[16] || "").trim().toUpperCase() === "TRUE";
    if (!effective && !qualified && !converted) continue;
    const current = getRow(date);
    if (effective) current.effectiveTotal += 1;
    if (qualified) current.qualified += 1;
    if (effective && !qualified) current.effectiveOnly += 1;
    if (converted) current.converted += 1;
    current.totalLeads = current.effectiveTotal + current.qualified;
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
      totalLeads: effective + qualified,
      effectiveOnly: effective,
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
  try {
    const liveCrm = await syncCrmFromSheets();
    if (liveCrm) {
      report.crm = { ...(report.crm as Record<string, unknown>), ...liveCrm };
      report.updatedAt = new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
        timeZone: "America/Sao_Paulo",
      }).format(new Date());
    }
  } catch {
    // Keep the last published snapshot if Google Sheets is temporarily unavailable.
  }

  return new NextResponse(JSON.stringify(report), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "private, no-store",
    },
  });
}
