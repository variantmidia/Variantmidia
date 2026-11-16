const normalized = (value: string) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[ _-]+/g, " ");
const saleDate = (value: string) => {
  if (!value) return null;
  const br = String(value).match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  if (br) return `${br[3]}-${br[2]}-${br[1]}`;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  if (/^\d{4}-\d{2}-\d{2}T/.test(value)) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(date);
  }
  return null;
};

export function collectSalesDaily(tracking: string[][], crm: string[][]) {
  const findColumn = (header: string[]) => header.findIndex(h => /^(data (da |de )?(venda|assinatura|contrato)|sale date|sold at)$/.test(normalized(h)));
  const trackColumn = findColumn(tracking[0] || []);
  const crmColumn = findColumn(crm[0] || []);
  const track = new Map<string, number>(), aggregate = new Map<string, number>();
  const seen = new Set<string>();
  for (const row of tracking.slice(1)) {
    const date = trackColumn >= 0 ? saleDate(row[trackColumn]) : null;
    if (!date || String(row[16]).toUpperCase() !== "TRUE") continue;
    const id = String(row[4] || `${date}:${seen.size}`);
    if (seen.has(id)) continue;
    seen.add(id);
    track.set(date, (track.get(date) || 0) + 1);
  }
  for (const row of crm.slice(1)) {
    const date = crmColumn >= 0 ? saleDate(row[crmColumn]) : null;
    if (!date) continue;
    aggregate.set(date, (aggregate.get(date) || 0) + (Number(row[5]) || 0));
  }
  return [...new Set([...track.keys(), ...aggregate.keys()])].sort().map(date => ({ date, sales: Math.max(track.get(date) || 0, aggregate.get(date) || 0) }));
}
