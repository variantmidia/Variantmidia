// Modelo público: somente contagens, datas e nomes de anúncios.
export const STAGES = [
  { key: "leads", label: "Leads", statuses: null },
  { key: "responded", label: "Responderam", statuses: ["Respondeu", "Qualificado", "Reunião marcada", "Reunião aconteceu", "Teste 7 dias", "Venda", "Desqualificado", "Perdido"] },
  { key: "qualified", label: "Lead qualificado", statuses: ["Qualificado", "Reunião marcada", "Reunião aconteceu", "Teste 7 dias", "Venda", "Perdido"] },
  { key: "scheduled", label: "Reunião agendada", statuses: ["Reunião marcada", "Reunião aconteceu", "Teste 7 dias", "Venda"] },
  { key: "held", label: "Reunião realizada", statuses: ["Reunião aconteceu", "Teste 7 dias", "Venda"] },
  { key: "sales", label: "Venda", statuses: ["Venda"] },
] as const;
export type Counts = Record<typeof STAGES[number]["key"], number>;
export type Period = { since: string; until: string };
export type SheetCell = string | number | boolean;
export type Insight = { date_start: string; campaign_name?: string; ad_name?: string; adset_name?: string; spend?: string; impressions?: string; clicks?: string; ctr?: string; actions?: { action_type: string; value: string }[] };
export type CrmBucket = Counts & { date: string; adName: string; attemptsSum: number; attemptsCount: number };
export const emptyCounts = (): Counts => ({ leads: 0, responded: 0, qualified: 0, scheduled: 0, held: 0, sales: 0 });
export const normalize = (text: string) => text.normalize("NFKC").trim().replace(/\s+/gu, " ").toLocaleLowerCase("pt-BR");
// A atribuição ignora caixa e todos os espaços, conforme a regra do CRM.
export const adKey = (text: string) => normalize(text).replace(/\s/gu, "");
export const cost = (spend: number, count: number) => count > 0 ? spend / count : null;
export function validDate(date: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && Number.isFinite(Date.parse(date)) && new Date(date).toISOString().slice(0, 10) === date;
}
export const todayBR = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
export function addDays(date: string, days: number) {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}
export function parsePeriod(params: URLSearchParams, today = todayBR()): Period | null {
  const preset = params.get("period") || "all";
  if (preset === "all") return null;
  if (preset === "7" || preset === "30") return { since: addDays(today, 1 - Number(preset)), until: today };
  if (preset === "month") return { since: `${today.slice(0, 7)}-01`, until: today };
  const since = params.get("since") || "", until = params.get("until") || "";
  if (preset !== "custom" || !validDate(since) || !validDate(until) || since > until || until > today || since < "2000-01-01") throw new Error("Período inválido. Confira as datas e escolha um término até hoje.");
  return { since, until };
}
export function crmDate(value: SheetCell | undefined) {
  if (typeof value === "number" && Number.isFinite(value)) {
    // Sheets entrega o calendário local da planilha em dias desde 30/12/1899.
    // Não converter esse serial para Brasília de novo: isso mudaria o dia.
    const date = new Date(Date.UTC(1899, 11, 30) + Math.floor(value) * 86400000);
    if (!Number.isFinite(date.getTime())) return null;
    const iso = date.toISOString().slice(0, 10);
    return validDate(iso) && iso >= "2000-01-01" && iso <= "2100-01-01" ? iso : null;
  }
  const match = String(value || "").trim().match(/^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})(?::\d{2})?$/);
  const date = match ? `${match[3]}-${match[2]}-${match[1]}` : "";
  return match && validDate(date) && Number(match[4]) <= 23 && Number(match[5]) <= 59 ? date : null;
}
export function aggregateCrm(table: SheetCell[][]) {
  const headers = (table[0] || []).map(value => normalize(String(value)));
  const required = ["Data e hora", "Nome", "Etapa", "Tentativas", "Anúncio"];
  const columns = required.map(name => headers.indexOf(normalize(name)));
  if (columns.some(index => index < 0)) throw new Error("Cabeçalhos obrigatórios do CRM ausentes.");
  const [dateCol, nameCol, stageCol, attemptsCol, adCol] = columns;
  const buckets = new Map<string, CrmBucket>();
  let invalidDates = 0, unknownStages = 0;
  const known = new Set(["Novo", "Tentando contato", "Sem resposta", ...STAGES.flatMap(stage => stage.statuses || [])].map(normalize));
  // A linha 2 é uma referência, mesmo quando tem nome e data preenchidos.
  for (const row of table.slice(2)) {
    if (!String(row[nameCol] || "").trim()) continue;
    const date = crmDate(row[dateCol]);
    if (!date) { invalidDates++; continue; }
    const adName = String(row[adCol] || "").trim();
    const key = JSON.stringify([date, adKey(adName)]);
    const bucket = buckets.get(key) || { ...emptyCounts(), date, adName, attemptsSum: 0, attemptsCount: 0 };
    const status = normalize(String(row[stageCol] || ""));
    if (!known.has(status)) unknownStages++;
    for (const stage of STAGES) if (!stage.statuses || stage.statuses.some(value => normalize(value) === status)) bucket[stage.key]++;
    if (STAGES[1].statuses.some(value => normalize(value) === status)) {
      const text = String(row[attemptsCol] ?? "").trim().replace(",", ".");
      const attempts = Number(text);
      if (text && Number.isFinite(attempts) && attempts >= 0) { bucket.attemptsSum += attempts; bucket.attemptsCount++; }
    }
    buckets.set(key, bucket);
  }
  return { buckets: [...buckets.values()], invalidDates, unknownStages };
}
// "lead" já agrega os subtipos; somá-los novamente duplicaria as conversões.
export function metaLeads(row: Insight) {
  const actions = row.actions || [];
  const total = actions.find(action => action.action_type === "lead");
  if (total) return Number(total.value) || 0;
  const grouped = actions.find(action => action.action_type === "onsite_conversion.lead_grouped");
  if (grouped) return Number(grouped.value) || 0;
  return Number(actions.find(action => action.action_type === "onsite_conversion.lead")?.value) || 0;
}
export function buildReport(crm: ReturnType<typeof aggregateCrm>, insights: Insight[], selected: Period | null, updatedAt: string) {
  const today = todayBR();
  const relevant = insights.filter(row => (row.campaign_name || "").includes("[TÊMIIS]"));
  const dates = [...crm.buckets.map(row => row.date), ...relevant.map(row => row.date_start)].filter(date => date <= today).sort();
  const period = selected || { since: dates[0] || today, until: today };
  const inPeriod = (date: string) => date >= period.since && date <= period.until;
  const daily = new Map<string, { date: string; spend: number; leads: number; metaLeads: number }>();
  for (let day = period.since; day <= period.until; day = addDays(day, 1)) daily.set(day, { date: day, spend: 0, leads: 0, metaLeads: 0 });
  type Ad = { name: string; spend: number; metaLeads: number; crmLeads: number; qualified: number; held: number };
  const ads = new Map<string, Ad>();
  let spend = 0, impressions = 0, clicks = 0, leadsMeta = 0;
  for (const row of relevant) {
    if (!inPeriod(row.date_start)) continue;
    const investment = Number(row.spend) || 0, leads = metaLeads(row);
    spend += investment; impressions += Number(row.impressions) || 0; clicks += Number(row.clicks) || 0; leadsMeta += leads;
    const name = row.ad_name?.trim() || "Anúncio sem nome";
    const key = adKey(name);
    const ad = ads.get(key) || { name, spend: 0, metaLeads: 0, crmLeads: 0, qualified: 0, held: 0 };
    ad.spend += investment; ad.metaLeads += leads; ads.set(key, ad);
    const day = daily.get(row.date_start);
    if (day) { day.spend += investment; day.metaLeads += leads; }
  }
  const counts = emptyCounts();
  let attemptsSum = 0, attemptsCount = 0;
  const unmatched: Ad = { name: "Sem correspondência", spend: 0, metaLeads: 0, crmLeads: 0, qualified: 0, held: 0 };
  for (const bucket of crm.buckets) {
    if (!inPeriod(bucket.date)) continue;
    for (const stage of STAGES) counts[stage.key] += bucket[stage.key];
    attemptsSum += bucket.attemptsSum; attemptsCount += bucket.attemptsCount;
    const day = daily.get(bucket.date); if (day) day.leads += bucket.leads;
    const ad = ads.get(adKey(bucket.adName)) || unmatched;
    ad.crmLeads += bucket.leads; ad.qualified += bucket.qualified; ad.held += bucket.held;
  }
  return {
    period, updatedAt, spend, counts, metaLeads: leadsMeta, impressions, clicks,
    ctr: impressions ? clicks / impressions * 100 : null,
    funnel: STAGES.map((stage, index) => ({ key: stage.key, label: stage.label, count: counts[stage.key], cost: cost(spend, counts[stage.key]), conversion: index === 0 ? null : cost(counts[stage.key] * 100, counts[STAGES[index - 1].key]) })),
    daily: [...daily.values()],
    ads: [...ads.values()].sort((a, b) => b.spend - a.spend).concat(unmatched.crmLeads ? [unmatched] : []).map(ad => ({ ...ad, cpl: cost(ad.spend, ad.crmLeads), cpq: cost(ad.spend, ad.qualified), unmatched: ad === unmatched })),
    contact: { responseRate: cost(counts.responded * 100, counts.leads), averageAttempts: cost(attemptsSum, attemptsCount), attemptsCount, missingAttempts: counts.responded - attemptsCount },
    warnings: [
      ...(crm.invalidDates ? [`${crm.invalidDates} linha(s) com nome e data inválida foram excluídas.`] : []),
      ...(crm.unknownStages ? [`${crm.unknownStages} linha(s) com etapa não reconhecida contam apenas em Leads.`] : []),
      ...(unmatched.crmLeads ? [`${unmatched.crmLeads} lead(s) sem anúncio correspondente na Meta neste período.`] : []),
    ],
  };
}
