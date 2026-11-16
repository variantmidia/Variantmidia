import { aggregateCrm, type Insight, type Period } from "./_model";

const SHEET_ID = "1di-EthYG4CVjZNMwXCqzHxmRlMZw_XDC5UzVeLbT7Is";
const ACCOUNT = "act_2167370950327006";
export class SourceError extends Error {
  constructor(public source: "crm" | "meta", message: string) { super(message); }
}
const readOptions = () => ({ cache: "no-store" as const, signal: AbortSignal.timeout(20000) });

async function sheetsToken() {
  if (process.env.GOOGLE_SHEETS_ACCESS_TOKEN) return process.env.GOOGLE_SHEETS_ACCESS_TOKEN;
  // Mesmo OAuth de leitura utilizado pelo dashboard do Renato.
  const clientId = process.env.GOOGLE_SHEETS_CLIENT_ID || process.env.GOOGLE_ADS_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_SHEETS_CLIENT_SECRET || process.env.GOOGLE_ADS_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_SHEETS_REFRESH_TOKEN || process.env.GOOGLE_ADS_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) throw new SourceError("crm", "Credenciais Google não configuradas no servidor.");
  const response = await fetch("https://oauth2.googleapis.com/token", {
    ...readOptions(), method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, refresh_token: refreshToken, grant_type: "refresh_token" }),
  });
  if (!response.ok) throw new SourceError("crm", "Não foi possível renovar o acesso Google.");
  const json = await response.json();
  if (!json.access_token) throw new SourceError("crm", "O Google não retornou acesso à planilha.");
  return json.access_token as string;
}
export async function readCrm() {
  const token = await sheetsToken();
  // Ler a aba inteira evita truncar leads ou depender de letras e colunas ocultas.
  const url = new URL(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent("'Leads'")}`);
  url.searchParams.set("valueRenderOption", "FORMATTED_VALUE");
  const response = await fetch(url, { ...readOptions(), headers: { Authorization: `Bearer ${token}` } });
  if (!response.ok) throw new SourceError("crm", response.status === 403 || response.status === 404 ? "A conta Google conectada não tem acesso à planilha CRM Inbound Temiis ou à aba Leads." : "A consulta ao CRM falhou. Tente novamente.");
  const json = await response.json() as { values?: string[][] };
  // Nenhuma linha individual nem Nome é armazenado no cache ou enviado à página.
  try { return aggregateCrm(json.values || []); }
  catch { throw new SourceError("crm", "Confira os cabeçalhos da aba Leads: Data e hora, Nome, Etapa, Tentativas e Anúncio."); }
}
export async function readMeta(period: Period | null): Promise<Insight[]> {
  const token = process.env.META_ACCESS_TOKEN;
  if (!token) throw new SourceError("meta", "Credencial Meta não configurada no servidor.");
  const version = process.env.META_GRAPH_VERSION || "v23.0";
  if (!/^v\d+\.\d+$/.test(version)) throw new SourceError("meta", "Versão da API Meta inválida no servidor.");
  const url = new URL(`https://graph.facebook.com/${version}/${ACCOUNT}/insights`);
  url.searchParams.set("fields", "date_start,campaign_name,ad_name,adset_name,spend,impressions,clicks,ctr,actions");
  url.searchParams.set("level", "ad");
  url.searchParams.set("time_increment", "1");
  url.searchParams.set("limit", "5000");
  url.searchParams.set("filtering", JSON.stringify([{ field: "campaign.name", operator: "CONTAIN", value: "[TÊMIIS]" }]));
  if (period) url.searchParams.set("time_range", JSON.stringify(period));
  else url.searchParams.set("date_preset", "maximum");
  const result: Insight[] = [];
  const seen = new Set<string>();
  const signal = AbortSignal.timeout(45000);
  for (let page = 0; page < 100; page++) {
    const response = await fetch(url, { cache: "no-store", signal, headers: { Authorization: `Bearer ${token}` } });
    if (!response.ok) throw new SourceError("meta", "Não foi possível consultar a Meta. Verifique a validade do token e o acesso à conta da Têmiis.");
    const json = await response.json() as { data?: Insight[]; paging?: { next?: string; cursors?: { after?: string } }; error?: unknown };
    if (json.error || !Array.isArray(json.data)) throw new SourceError("meta", "A Meta retornou uma resposta inesperada.");
    result.push(...json.data);
    if (!json.paging?.next) return result;
    // Não seguimos URLs externas nem expomos os tokens presentes em paging.next.
    const after = json.paging.cursors?.after;
    if (!after || seen.has(after)) break;
    seen.add(after); url.searchParams.set("after", after);
  }
  throw new SourceError("meta", "A consulta Meta excedeu o limite de paginação. Escolha um período menor.");
}
