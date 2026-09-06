const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value || 0);
const formatNumber = (value) =>
  new Intl.NumberFormat("pt-BR").format(value || 0);
const formatPercent = (value) =>
  `${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(value || 0)}%`;
const formatDelta = (value) => {
  if (!Number.isFinite(value)) return "sem base";
  const sign = value > 0 ? "+" : "";
  return `${sign}${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(value)}%`;
};

const isoToBR = (iso) => {
  if (!iso) return "--";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};
const addDays = (isoDate, days) => {
  const d = new Date(`${isoDate}T00:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};
const daysBetween = (start, end) => {
  const a = new Date(`${start}T00:00:00`);
  const b = new Date(`${end}T00:00:00`);
  return Math.round((b - a) / 86400000) + 1;
};

const bindText = (key, value) => {
  document.querySelectorAll(`[data-bind="${key}"]`).forEach((node) => {
    node.textContent = value;
  });
};
const setDelta = (key, delta) => {
  document.querySelectorAll(`[data-delta="${key}"]`).forEach((node) => {
    const cls = delta > 0 ? "delta-up" : delta < 0 ? "delta-down" : "delta-flat";
    node.className = `metric-delta ${cls}`;
    node.textContent = Number.isFinite(delta)
      ? `${delta > 0 ? "▲" : delta < 0 ? "▼" : "▬"} ${formatDelta(delta)} vs período anterior`
      : "sem período anterior";
  });
};

const filterDaily = (rows, start, end) =>
  rows.filter((r) => r.date >= start && r.date <= end);

const sumMetric = (rows, key) =>
  rows.reduce((acc, r) => acc + (Number(r[key]) || 0), 0);

const aggregateByKey = (rows, keyField) => {
  const map = new Map();
  for (const r of rows) {
    const cur = map.get(r[keyField]) || { conversions: 0, impressions: 0, clicks: 0, spend: 0 };
    cur.conversions += Number(r.conversions) || 0;
    cur.impressions += Number(r.impressions) || 0;
    cur.clicks += Number(r.clicks) || 0;
    cur.spend += Number(r.spend) || 0;
    map.set(r[keyField], cur);
  }
  return map;
};

const pctChange = (current, previous) => {
  if (!previous) return NaN;
  return ((current - previous) / previous) * 100;
};

const loadReport = async () => {
  const response = await fetch("/dashboard/renato-pretel/data", { cache: "no-store" });
  if (!response.ok) throw new Error("Nao foi possivel carregar os dados do relatorio");
  return response.json();
};

const state = {
  report: null,
  start: null,
  end: null,
  compare: true,
  charts: {},
};

const destroyChart = (key) => {
  if (state.charts[key]) {
    state.charts[key].destroy();
    delete state.charts[key];
  }
};

const buildLineChart = (report, rows, prevRows) => {
  destroyChart("dailyTrend");
  const labels = rows.map((r) => r.label);
  const datasets = [
    {
      label: "Investimento",
      data: rows.map((r) => r.spend),
      borderColor: "#21c568",
      backgroundColor: "rgba(33, 197, 104, 0.12)",
      tension: 0.35,
      yAxisID: "money",
    },
    {
      label: "Conversões (Ads)",
      data: rows.map((r) => r.conversions),
      borderColor: "#20a9e8",
      backgroundColor: "rgba(32, 169, 232, 0.12)",
      tension: 0.35,
      yAxisID: "count",
    },
  ];
  if (state.compare && prevRows.length) {
    datasets.push({
      label: "Investimento (período anterior)",
      data: prevRows.map((r) => r.spend),
      borderColor: "rgba(33, 197, 104, 0.55)",
      borderDash: [6, 4],
      backgroundColor: "transparent",
      tension: 0.35,
      yAxisID: "money",
      pointRadius: 0,
    });
    datasets.push({
      label: "Conversões (período anterior)",
      data: prevRows.map((r) => r.conversions),
      borderColor: "rgba(32, 169, 232, 0.55)",
      borderDash: [6, 4],
      backgroundColor: "transparent",
      tension: 0.35,
      yAxisID: "count",
      pointRadius: 0,
    });
  }
  state.charts.dailyTrend = new Chart(document.getElementById("dailyTrend"), {
    type: "line",
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { labels: { color: "#cfe2ea" } },
        tooltip: {
          callbacks: {
            title: (items) => {
              const i = items[0].dataIndex;
              const cur = rows[i]?.date ? isoToBR(rows[i].date) : items[0].label;
              const prev = state.compare && prevRows[i]?.date ? ` vs ${isoToBR(prevRows[i].date)}` : "";
              return `${cur}${prev}`;
            },
          },
        },
      },
      scales: {
        x: { ticks: { color: "#8ea5b2" }, grid: { color: "rgba(255,255,255,0.06)" } },
        money: { position: "left", ticks: { color: "#8ea5b2" }, grid: { color: "rgba(255,255,255,0.06)" } },
        count: { position: "right", ticks: { color: "#8ea5b2", precision: 0 }, grid: { drawOnChartArea: false } },
      },
    },
  });
};

const buildGenderChart = (report, currentRows, prevRows) => {
  destroyChart("genderChart");
  const order = ["MALE", "FEMALE", "UNDETERMINED"];
  const agg = aggregateByKey(currentRows, "key");
  const labels = order.map((k) => report.genderLabels[k] || k);
  const values = order.map((k) => agg.get(k)?.conversions || 0);
  const colors = order.map((k) => report.genderColors[k] || "#8a95a1");

  const prevAgg = aggregateByKey(prevRows, "key");
  state.charts.genderChart = new Chart(document.getElementById("genderChart"), {
    type: "pie",
    data: { labels, datasets: [{ data: values, backgroundColor: colors, borderColor: "#101315", borderWidth: 2 }] },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom", labels: { color: "#cfe2ea", boxWidth: 12 } },
        tooltip: {
          callbacks: {
            label: (item) => {
              const total = item.dataset.data.reduce((a, b) => a + b, 0);
              const pct = total ? ((item.parsed / total) * 100).toFixed(1) : 0;
              const prev = prevAgg.get(order[item.dataIndex])?.conversions || 0;
              const delta = state.compare && prev
                ? ` (Δ ${formatDelta(pctChange(item.parsed, prev))})`
                : "";
              return `${item.label}: ${formatNumber(item.parsed)} conv. (${pct}%)${delta}`;
            },
          },
        },
      },
    },
  });
};

const buildAgeChart = (report, currentRows, prevRows) => {
  destroyChart("ageChart");
  const order = report.ageOrder;
  const agg = aggregateByKey(currentRows, "key");
  const prevAgg = aggregateByKey(prevRows, "key");
  const labels = order.map((k) => report.ageLabels[k] || k);
  const current = order.map((k) => agg.get(k)?.conversions || 0);
  const previous = order.map((k) => prevAgg.get(k)?.conversions || 0);
  const palette = ["#20a9e8", "#21c568", "#f0ae31", "#8777ff", "#f06b72", "#3fd2c7", "#8a95a1"];

  const datasets = [
    {
      label: "Período atual",
      data: current,
      backgroundColor: order.map((_, i) => palette[i % palette.length]),
      borderWidth: 0,
      borderRadius: 6,
    },
  ];
  if (state.compare && prevRows.length) {
    datasets.push({
      label: "Período anterior",
      data: previous,
      backgroundColor: "rgba(255,255,255,0.18)",
      borderWidth: 0,
      borderRadius: 6,
    });
  }
  state.charts.ageChart = new Chart(document.getElementById("ageChart"), {
    type: "bar",
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: state.compare, labels: { color: "#cfe2ea", boxWidth: 12 } },
        tooltip: {
          callbacks: {
            label: (item) => `${item.dataset.label}: ${item.parsed.y} conv.`,
          },
        },
      },
      scales: {
        x: { ticks: { color: "#8ea5b2" }, grid: { color: "rgba(255,255,255,0.06)" } },
        y: {
          beginAtZero: true,
          ticks: { color: "#8ea5b2", precision: 0 },
          grid: { color: "rgba(255,255,255,0.06)" },
        },
      },
    },
  });
};

const buildQualityChart = (report) => {
  destroyChart("qualityChart");
  const { effectiveLeads, qualifiedLeads, totalLeads } = report.crm;
  const remaining = Math.max(0, totalLeads - effectiveLeads);
  state.charts.qualityChart = new Chart(document.getElementById("qualityChart"), {
    type: "doughnut",
    data: {
      labels: ["Efetivos", "Qualificados", "Desqualificados/Pendentes"],
      datasets: [{
        data: [effectiveLeads, qualifiedLeads, remaining],
        backgroundColor: ["#20a9e8", "#21c568", "#f06b72"],
        borderWidth: 0,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "62%",
      plugins: { legend: { position: "bottom", labels: { color: "#cfe2ea", boxWidth: 10 } } },
    },
  });
};

const renderTable = (periods) => {
  const tbody = document.querySelector('[data-table="periods"]');
  tbody.innerHTML = periods.map((period) => `
    <tr>
      <td>${period.name}</td>
      <td>${formatCurrency(period.spend)}</td>
      <td>${formatNumber(period.clicks)}</td>
      <td>${formatNumber(period.effectiveLeads)}</td>
      <td><strong>${formatNumber(period.qualifiedLeads)}</strong></td>
      <td>${period.qualifiedLeads ? formatCurrency(period.spend / period.qualifiedLeads) : "Sem venda/qualificado"}</td>
      <td>${period.reading}</td>
    </tr>
  `).join("");
};

const applyRange = () => {
  const report = state.report;
  const { start, end } = state;
  const days = daysBetween(start, end);
  const prevEnd = addDays(start, -1);
  const prevStart = addDays(prevEnd, -(days - 1));

  const curDaily = filterDaily(report.daily, start, end);
  const prevDaily = filterDaily(report.daily, prevStart, prevEnd);
  const curGender = filterDaily(report.genderDaily, start, end);
  const prevGender = filterDaily(report.genderDaily, prevStart, prevEnd);
  const curAge = filterDaily(report.ageDaily, start, end);
  const prevAge = filterDaily(report.ageDaily, prevStart, prevEnd);

  const curTotals = {
    impressions: sumMetric(curDaily, "impressions"),
    clicks: sumMetric(curDaily, "clicks"),
    spend: sumMetric(curDaily, "spend"),
    conversions: sumMetric(curDaily, "conversions"),
  };
  const prevTotals = {
    impressions: sumMetric(prevDaily, "impressions"),
    clicks: sumMetric(prevDaily, "clicks"),
    spend: sumMetric(prevDaily, "spend"),
    conversions: sumMetric(prevDaily, "conversions"),
  };
  const curCtr = curTotals.impressions ? (curTotals.clicks / curTotals.impressions) * 100 : 0;
  const prevCtr = prevTotals.impressions ? (prevTotals.clicks / prevTotals.impressions) * 100 : 0;
  const curCpc = curTotals.clicks ? curTotals.spend / curTotals.clicks : 0;
  const prevCpc = prevTotals.clicks ? prevTotals.spend / prevTotals.clicks : 0;

  bindText("periodLabel", `${isoToBR(start)} a ${isoToBR(end)}`);
  bindText("prevPeriodLabel", state.compare ? `Comparando com ${isoToBR(prevStart)} a ${isoToBR(prevEnd)}` : "Comparação desativada");
  bindText("periodDays", `${days} dia${days > 1 ? "s" : ""}`);
  bindText("spend", formatCurrency(curTotals.spend));
  bindText("impressions", formatNumber(curTotals.impressions));
  bindText("clicks", formatNumber(curTotals.clicks));
  bindText("conversionsAds", formatNumber(curTotals.conversions));
  bindText("ctr", formatPercent(curCtr));
  bindText("avgCpc", formatCurrency(curCpc));

  setDelta("spend", state.compare ? pctChange(curTotals.spend, prevTotals.spend) : NaN);
  setDelta("impressions", state.compare ? pctChange(curTotals.impressions, prevTotals.impressions) : NaN);
  setDelta("clicks", state.compare ? pctChange(curTotals.clicks, prevTotals.clicks) : NaN);
  setDelta("conversionsAds", state.compare ? pctChange(curTotals.conversions, prevTotals.conversions) : NaN);
  setDelta("ctr", state.compare ? pctChange(curCtr, prevCtr) : NaN);
  setDelta("avgCpc", state.compare ? pctChange(curCpc, prevCpc) : NaN);

  // CRM stays static (source is CRM sheet, not date-filterable here)
  const crm = report.crm;
  bindText("effectiveLeads", formatNumber(crm.effectiveLeads));
  bindText("qualifiedLeads", formatNumber(crm.qualifiedLeads));
  bindText("effectiveLeadCost", crm.effectiveLeads ? `${formatCurrency(curTotals.spend / crm.effectiveLeads)} por efetivo` : "Sem efetivos");
  bindText("qualifiedLeadCost", crm.qualifiedLeads ? `${formatCurrency(curTotals.spend / crm.qualifiedLeads)} por qualificado` : "Sem qualificados");
  bindText("totalLeads", formatNumber(crm.totalLeads));
  bindText("cac", crm.sales > 0 ? formatCurrency(curTotals.spend / crm.sales) : "Sem venda");
  bindText("pageConversion", curTotals.clicks ? formatPercent((crm.totalLeads / curTotals.clicks) * 100) : "--");

  // Budget gauge — always uses MTD (month-to-date) regardless of range
  const monthPrefix = new Date().toISOString().slice(0, 7);
  const mtdSpend = sumMetric(report.daily.filter((r) => r.date.startsWith(monthPrefix)), "spend");
  const remaining = Math.max(0, report.budget.monthly - mtdSpend);
  bindText("remainingBudget", formatCurrency(remaining));
  bindText("monthlyBudget", formatCurrency(report.budget.monthly));
  bindText("spendNote", report.budget.note);
  const gauge = document.querySelector("[data-gauge]");
  if (gauge) {
    const ratio = Math.max(0, Math.min(1, remaining / report.budget.monthly));
    gauge.style.strokeDashoffset = String(220 - ratio * 220);
  }

  buildLineChart(report, curDaily, prevDaily);
  buildGenderChart(report, curGender, prevGender);
  buildAgeChart(report, curAge, prevAge);
  buildQualityChart(report);
  renderTable(report.periods);
};

const applyPreset = (days) => {
  state.end = state.report.dataEnd;
  state.start = addDays(state.end, -(days - 1));
  syncInputs();
  applyRange();
};

const syncInputs = () => {
  document.getElementById("startDate").value = state.start;
  document.getElementById("endDate").value = state.end;
  document.getElementById("compareToggle").checked = state.compare;
  document.querySelectorAll(".preset-btn").forEach((btn) => btn.classList.remove("active"));
};

const init = async () => {
  const report = await loadReport();
  state.report = report;
  state.start = report.defaultRange?.start || addDays(report.dataEnd, -13);
  state.end = report.defaultRange?.end || report.dataEnd;

  bindText("updatedAt", report.updatedAt);

  const startInput = document.getElementById("startDate");
  const endInput = document.getElementById("endDate");
  startInput.min = report.dataStart;
  startInput.max = report.dataEnd;
  endInput.min = report.dataStart;
  endInput.max = report.dataEnd;
  startInput.value = state.start;
  endInput.value = state.end;

  startInput.addEventListener("change", (e) => {
    state.start = e.target.value;
    if (state.start > state.end) state.end = state.start;
    endInput.value = state.end;
    applyRange();
  });
  endInput.addEventListener("change", (e) => {
    state.end = e.target.value;
    if (state.end < state.start) state.start = state.end;
    startInput.value = state.start;
    applyRange();
  });
  document.getElementById("compareToggle").addEventListener("change", (e) => {
    state.compare = e.target.checked;
    applyRange();
  });
  document.querySelectorAll(".preset-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyPreset(Number(btn.dataset.days)));
  });

  applyRange();
};

init().catch((error) => {
  document.body.insertAdjacentHTML("afterbegin", `<pre class="load-error">${error.message}</pre>`);
});
