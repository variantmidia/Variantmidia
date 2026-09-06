import fs from "node:fs/promises";
import path from "node:path";

const outputPath = path.resolve("data", "report.json");

const CUSTOMER_ID = process.env.GOOGLE_ADS_CUSTOMER_ID || "2957414935";
const LOGIN_CUSTOMER_ID = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || "";
const DEVELOPER_TOKEN = process.env.GOOGLE_ADS_DEVELOPER_TOKEN || "";
const CLIENT_ID = process.env.GOOGLE_ADS_CLIENT_ID || "";
const CLIENT_SECRET = process.env.GOOGLE_ADS_CLIENT_SECRET || "";
const REFRESH_TOKEN = process.env.GOOGLE_ADS_REFRESH_TOKEN || "";

const hasApiCreds = () =>
  DEVELOPER_TOKEN && CLIENT_ID && CLIENT_SECRET && REFRESH_TOKEN;

const readCurrentReport = async () => {
  const raw = await fs.readFile(outputPath, "utf8");
  return JSON.parse(raw);
};

const formatDateBR = (isoDate) => {
  const [y, m, d] = isoDate.split("-");
  return `${d}/${m}/${y}`;
};

const microsToBRL = (micros) => Math.round((Number(micros) / 1_000_000) * 100) / 100;

const getAccessToken = async () => {
  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    refresh_token: REFRESH_TOKEN,
    grant_type: "refresh_token",
  });
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) throw new Error(`OAuth failed: ${res.status} ${await res.text()}`);
  const json = await res.json();
  return json.access_token;
};

const gaqlSearch = async (accessToken, query) => {
  const url = `https://googleads.googleapis.com/v17/customers/${CUSTOMER_ID}/googleAds:searchStream`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "developer-token": DEVELOPER_TOKEN,
    "Content-Type": "application/json",
  };
  if (LOGIN_CUSTOMER_ID) headers["login-customer-id"] = LOGIN_CUSTOMER_ID;
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
  });
  if (!res.ok) throw new Error(`Ads API failed: ${res.status} ${await res.text()}`);
  const json = await res.json();
  const rows = [];
  for (const chunk of json) if (chunk.results) rows.push(...chunk.results);
  return rows;
};

const fetchFromAds = async (report) => {
  const accessToken = await getAccessToken();

  const dailyRows = await gaqlSearch(accessToken, `
    SELECT segments.date, metrics.impressions, metrics.clicks,
           metrics.cost_micros, metrics.conversions
    FROM customer
    WHERE segments.date DURING LAST_14_DAYS
    ORDER BY segments.date
  `);

  const daily = dailyRows.map((r) => {
    const date = r.segments.date;
    const [y, m, d] = date.split("-");
    return {
      label: `${d}/${m}`,
      spend: microsToBRL(r.metrics.costMicros),
      impressions: Number(r.metrics.impressions) || 0,
      clicks: Number(r.metrics.clicks) || 0,
      leads: Math.round(Number(r.metrics.conversions) || 0),
      effective: 0,
      qualified: 0,
    };
  });

  const totals = daily.reduce(
    (acc, d) => ({
      impressions: acc.impressions + d.impressions,
      clicks: acc.clicks + d.clicks,
      spend: acc.spend + d.spend,
      conversions: acc.conversions + d.leads,
    }),
    { impressions: 0, clicks: 0, spend: 0, conversions: 0 },
  );

  const mtdRows = await gaqlSearch(accessToken, `
    SELECT metrics.cost_micros FROM customer WHERE segments.date DURING THIS_MONTH
  `);
  const mtdSpend = mtdRows.length ? microsToBRL(mtdRows[0].metrics.costMicros) : 0;

  const genderRows = await gaqlSearch(accessToken, `
    SELECT ad_group_criterion.gender.type, metrics.conversions,
           metrics.impressions, metrics.clicks, metrics.cost_micros
    FROM gender_view
    WHERE segments.date DURING LAST_30_DAYS AND metrics.impressions > 0
  `);
  const genderColors = { MALE: "#2f7bd0", FEMALE: "#e85aa1", UNDETERMINED: "#8a95a1" };
  const genderLabels = { MALE: "Masculino", FEMALE: "Feminino", UNDETERMINED: "Desconhecido" };
  const genderAgg = new Map();
  for (const r of genderRows) {
    const key = r.adGroupCriterion.gender.type;
    const cur = genderAgg.get(key) || { conversions: 0, impressions: 0, clicks: 0, spend: 0 };
    cur.conversions += Number(r.metrics.conversions) || 0;
    cur.impressions += Number(r.metrics.impressions) || 0;
    cur.clicks += Number(r.metrics.clicks) || 0;
    cur.spend += microsToBRL(r.metrics.costMicros);
    genderAgg.set(key, cur);
  }
  const gender = ["MALE", "FEMALE", "UNDETERMINED"].map((k) => ({
    label: genderLabels[k],
    key: k,
    conversions: Math.round(genderAgg.get(k)?.conversions || 0),
    impressions: genderAgg.get(k)?.impressions || 0,
    clicks: genderAgg.get(k)?.clicks || 0,
    spend: Math.round((genderAgg.get(k)?.spend || 0) * 100) / 100,
    color: genderColors[k],
  }));

  const ageRows = await gaqlSearch(accessToken, `
    SELECT ad_group_criterion.age_range.type, metrics.conversions,
           metrics.impressions, metrics.clicks, metrics.cost_micros
    FROM age_range_view
    WHERE segments.date DURING LAST_30_DAYS AND metrics.impressions > 0
  `);
  const ageOrder = [
    "AGE_RANGE_18_24", "AGE_RANGE_25_34", "AGE_RANGE_35_44",
    "AGE_RANGE_45_54", "AGE_RANGE_55_64", "AGE_RANGE_65_UP",
    "AGE_RANGE_UNDETERMINED",
  ];
  const ageLabels = {
    AGE_RANGE_18_24: "18 a 24", AGE_RANGE_25_34: "25 a 34",
    AGE_RANGE_35_44: "35 a 44", AGE_RANGE_45_54: "45 a 54",
    AGE_RANGE_55_64: "55 a 64", AGE_RANGE_65_UP: "65+",
    AGE_RANGE_UNDETERMINED: "Desconhecido",
  };
  const ageAgg = new Map();
  for (const r of ageRows) {
    const key = r.adGroupCriterion.ageRange.type;
    const cur = ageAgg.get(key) || { conversions: 0, impressions: 0, clicks: 0, spend: 0 };
    cur.conversions += Number(r.metrics.conversions) || 0;
    cur.impressions += Number(r.metrics.impressions) || 0;
    cur.clicks += Number(r.metrics.clicks) || 0;
    cur.spend += microsToBRL(r.metrics.costMicros);
    ageAgg.set(key, cur);
  }
  const age = ageOrder.map((k) => ({
    label: ageLabels[k],
    key: k,
    conversions: Math.round(ageAgg.get(k)?.conversions || 0),
    impressions: ageAgg.get(k)?.impressions || 0,
    clicks: ageAgg.get(k)?.clicks || 0,
    spend: Math.round((ageAgg.get(k)?.spend || 0) * 100) / 100,
  }));

  const startDate = dailyRows[0]?.segments.date;
  const endDate = dailyRows[dailyRows.length - 1]?.segments.date;
  report.period = {
    start: startDate,
    end: endDate,
    startLabel: formatDateBR(startDate),
    endLabel: formatDateBR(endDate),
    days: dailyRows.length,
    source: `Google Ads API - customer ${CUSTOMER_ID}`,
  };
  report.ads = {
    ...report.ads,
    source: "Google Ads API",
    status: "Sincronizado automaticamente",
    customerId: CUSTOMER_ID,
    period: `${formatDateBR(startDate)} a ${formatDateBR(endDate)}`,
    impressions: totals.impressions,
    clicks: totals.clicks,
    spend: Math.round(totals.spend * 100) / 100,
    conversions: totals.conversions,
    avgCpc: totals.clicks ? Math.round((totals.spend / totals.clicks) * 100) / 100 : 0,
    ctr: totals.impressions ? Math.round((totals.clicks / totals.impressions) * 10000) / 100 : 0,
  };
  report.budget = {
    ...report.budget,
    mtdSpend: mtdSpend,
    remaining: Math.round((report.budget.monthly - mtdSpend) * 100) / 100,
  };
  report.daily = daily;
  report.gender = gender;
  report.age = age;

  return report;
};

const main = async () => {
  const report = await readCurrentReport();

  if (hasApiCreds()) {
    try {
      await fetchFromAds(report);
      console.log("Dados atualizados via Google Ads API");
    } catch (err) {
      console.error("Falha ao consultar Google Ads API:", err.message);
      process.exitCode = 2;
    }
  } else {
    console.warn("Credenciais Google Ads ausentes; apenas o updatedAt sera atualizado.");
  }

  report.updatedAt = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date());

  await fs.writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(`Relatorio atualizado: ${outputPath}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
