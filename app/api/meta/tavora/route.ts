import { NextRequest, NextResponse } from "next/server";

type InsightAction = {
  action_type?: string;
  value?: string;
};

type InsightRow = {
  spend?: string;
  impressions?: string;
  clicks?: string;
  ctr?: string;
  cpc?: string;
  cpm?: string;
  reach?: string;
  frequency?: string;
  actions?: InsightAction[];
  cost_per_action_type?: InsightAction[];
  ad_name?: string;
  ad_id?: string;
  campaign_name?: string;
};

const DEFAULT_LEAD_ACTION_TYPES = [
  "lead",
  "onsite_conversion.lead_grouped",
  "offsite_conversion.fb_pixel_lead",
  "onsite_conversion.messaging_conversation_started_7d",
  "onsite_conversion.messaging_first_reply",
];

function unauthorized() {
  return NextResponse.json({ error: "Autenticacao necessaria." }, { status: 401 });
}

function isAuthorized(request: NextRequest) {
  const expectedUser = process.env.CLIENTE_RELATORIO_USER;
  const expectedPassword = process.env.CLIENTE_RELATORIO_PASSWORD;

  if (!expectedUser || !expectedPassword) return false;

  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return false;

  try {
    const decoded = Buffer.from(header.slice("Basic ".length), "base64").toString("utf8");
    const separatorIndex = decoded.indexOf(":");
    if (separatorIndex === -1) return false;

    return decoded.slice(0, separatorIndex) === expectedUser && decoded.slice(separatorIndex + 1) === expectedPassword;
  } catch {
    return false;
  }
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function toIsoDate(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function toBrDate(iso: string) {
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
}

function addDays(iso: string, days: number) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);
  return toIsoDate(date);
}

function currentBrazilDate() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(new Date());
}

function getRange(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const period = params.get("period") || "hoje";
  const until = params.get("date") || currentBrazilDate();

  if (params.get("since") && params.get("until")) {
    return { period: "custom", since: params.get("since")!, until: params.get("until")! };
  }

  if (period === "7d") return { period, since: addDays(until, -6), until };
  if (period === "14d") return { period, since: addDays(until, -13), until };
  if (period === "maio") return { period, since: "2026-05-01", until: "2026-05-31" };
  if (period === "junho") return { period, since: `${until.slice(0, 7)}-01`, until };

  return { period: "hoje", since: until, until };
}

function leadActionTypes() {
  return (process.env.TAVORA_META_LEAD_ACTION_TYPES || DEFAULT_LEAD_ACTION_TYPES.join(","))
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function actionValue(actions: InsightAction[] | undefined, actionTypes: string[]) {
  return (actions || []).reduce((total, action) => {
    if (!action.action_type || !actionTypes.includes(action.action_type)) return total;
    return total + Number(action.value || 0);
  }, 0);
}

function costPerAction(actions: InsightAction[] | undefined, actionTypes: string[]) {
  const match = (actions || []).find((action) => action.action_type && actionTypes.includes(action.action_type));
  return match ? Number(match.value || 0) : 0;
}

async function metaGet(path: string, params: Record<string, string>) {
  const token = process.env.META_ACCESS_TOKEN;
  const version = process.env.META_GRAPH_VERSION || "v23.0";
  const url = new URL(`https://graph.facebook.com/${version}/${path}`);

  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  url.searchParams.set("access_token", token || "");

  const response = await fetch(url, { cache: "no-store" });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json?.error?.message || "Erro ao consultar Meta Ads.");
  }

  return json;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) return unauthorized();

  const token = process.env.META_ACCESS_TOKEN;
  const accountId = process.env.TAVORA_META_AD_ACCOUNT_ID;

  if (!token || !accountId) {
    return NextResponse.json(
      { configured: false, error: "Meta Ads ainda nao configurado na Vercel." },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const range = getRange(request);
  const leadTypes = leadActionTypes();
  const timeRange = JSON.stringify({ since: range.since, until: range.until });

  try {
    const [summaryResponse, adsResponse] = await Promise.all([
      metaGet(`${accountId}/insights`, {
        fields: "spend,impressions,clicks,ctr,cpc,cpm,reach,frequency,actions,cost_per_action_type",
        level: "account",
        time_range: timeRange,
        action_report_time: "conversion",
      }),
      metaGet(`${accountId}/insights`, {
        fields: "ad_id,ad_name,campaign_name,spend,impressions,clicks,ctr,actions,cost_per_action_type",
        level: "ad",
        time_range: timeRange,
        action_report_time: "conversion",
        limit: "25",
      }),
    ]);

    const row: InsightRow = summaryResponse.data?.[0] || {};
    const leads = actionValue(row.actions, leadTypes);
    const cpl = leads ? Number(row.spend || 0) / leads : costPerAction(row.cost_per_action_type, leadTypes);

    const topAds = ((adsResponse.data || []) as InsightRow[])
      .map((ad) => {
        const adLeads = actionValue(ad.actions, leadTypes);
        const adSpend = Number(ad.spend || 0);
        return {
          id: ad.ad_id,
          name: ad.ad_name || "Anuncio sem nome",
          campaign: ad.campaign_name || "",
          spend: adSpend,
          clicks: Number(ad.clicks || 0),
          ctr: Number(ad.ctr || 0),
          leads: adLeads,
          cpl: adLeads ? adSpend / adLeads : costPerAction(ad.cost_per_action_type, leadTypes),
        };
      })
      .filter((ad) => ad.spend > 0 || ad.leads > 0)
      .sort((a, b) => {
        if (b.leads !== a.leads) return b.leads - a.leads;
        return a.cpl - b.cpl;
      })
      .slice(0, 5);

    return NextResponse.json(
      {
        configured: true,
        source: "meta_ads",
        fetchedAt: new Date().toISOString(),
        period: range.period,
        since: range.since,
        until: range.until,
        label: range.since === range.until ? toBrDate(range.until) : `${toBrDate(range.since)} a ${toBrDate(range.until)}`,
        note: "· dados atualizados via Meta Ads",
        spend: Number(row.spend || 0),
        imp: Number(row.impressions || 0),
        clicks: Number(row.clicks || 0),
        ctr: row.ctr ? `${Number(row.ctr).toFixed(2).replace(".", ",")}%` : "0,00%",
        cpc: Number(row.cpc || 0),
        cpm: Number(row.cpm || 0),
        reach: Number(row.reach || 0),
        frequency: Number(row.frequency || 0),
        leads,
        metaLeads: leads,
        cpl,
        topAds,
      },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    return NextResponse.json(
      { configured: true, error: error instanceof Error ? error.message : "Erro desconhecido ao consultar Meta Ads." },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
