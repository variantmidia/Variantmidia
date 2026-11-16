(function (root) {
  const cyclePeriod = (end) => {
    if (!/^20\d{2}-(0[1-9]|1[0-2])-17$/.test(end || "")) return null;
    const [year, month] = end.split("-").map(Number);
    const start = new Date(Date.UTC(year, month - 2, 17, 12)).toISOString().slice(0, 10);
    return { start, end };
  };
  const resolveSales = (report, start, end) => {
    const dated = report.crm?.salesDaily || [];
    const count = dated.filter(r => r.date >= start && r.date <= end).reduce((n, r) => n + Number(r.sales || 0), 0);
    const confirmed = report.salesConfirmation;
    const firstDate = report.workPeriod?.start || report.dataStart;
    if (confirmed && start <= firstDate && end >= confirmed.confirmedAt) return { count: Math.max(count, confirmed.totalClients), source: "total confirmado pelo Renato", pending: false };
    const windows = confirmed ? [
      { start: confirmed.cycle.start, end: confirmed.confirmedAt, sales: confirmed.cycle.sales },
      ...(confirmed.periodConfirmations || []),
    ] : [];
    // A dated ledger is authoritative for dates. Aggregate confirmations are only
    // usable when their entire known interval fits inside the selected period.
    const contained = windows.filter(w => start <= w.start && end >= w.end);
    if (contained.length) return { count: Math.max(count, ...contained.map(w => w.sales)), source: "vendas confirmadas no intervalo; datas individuais pendentes", pending: false };
    const overlaps = windows.some(w => start <= w.end && end >= w.start);
    return { count, source: count ? "data da venda / CRM" : "nenhuma venda com data registrada", pending: count === 0 && overlaps };
  };
  const logic = { cyclePeriod, resolveSales };
  root.RenatoReportLogic = logic;
  if (typeof module !== "undefined" && module.exports) module.exports = logic;
})(globalThis);
