import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';
const require = createRequire(import.meta.url);
function load(file, imports = {}) {
  const output = ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const module = { exports: {} };
  new Function('module', 'exports', 'require', output)(module, module.exports, name => imports[name] || require(name));
  return module.exports;
}
const model = load('app/temiis/_model.ts');
const { aggregateCrm, buildReport, parsePeriod, metaLeads, adKey } = model;
assert.equal(model.crmDate(46322.60675925926), '2026-10-27');
assert.equal(model.crmDate(46325.00739583334), '2026-10-30');
assert.equal(model.crmDate(46325.99999), '2026-10-30');
assert.equal(model.crmDate('30/10/2026 00:10'), '2026-10-30');
assert.equal(model.crmDate('27/10 14:33'), null);
assert.equal(model.crmDate('31/02/2026 10:00'), null);
assert.equal(model.crmDate(Infinity), null);
const numericCrm = aggregateCrm([['Nome', 'Anúncio', 'Etapa', 'Tentativas', 'Data e hora'], [], ['Privado', 'Anúncio A', 'Respondeu', 0, 46322.60675925926]]);
assert.equal(numericCrm.buckets[0].date, '2026-10-27');
assert.equal(numericCrm.buckets[0].attemptsCount, 1);
assert.equal(numericCrm.buckets[0].attemptsSum, 0);
const headers = ['Tentativas', 'Anúncio', 'Etapa', 'Nome', 'Data e hora'];
const stages = ['Novo', 'Tentando contato', 'Sem resposta', 'Respondeu', 'Qualificado', 'Reunião marcada', 'Reunião aconteceu', 'Teste 7 dias', 'Venda', 'Desqualificado', 'Perdido'];
const table = [headers, ['99', 'Referência', 'Venda', 'IGNORAR REFERÊNCIA', '01/11/2026 12:00'], ...stages.map((stage, index) => ['2', index === 10 ? 'Outro anúncio' : '  ANÚNCIO   A ', stage, `PESSOA PRIVADA ${index}`, '01/11/2026 23:59']), ['1', 'A', 'Novo', '', '01/11/2026 08:00'], ['1', 'A', 'Venda', 'DATA INVÁLIDA', '31/02/2026 00:00']];
const crm = aggregateCrm(table);
const insights = [{ date_start: '2026-11-01', campaign_name: '🔵 [TÊMIIS] Campanha', ad_name: 'Anúncio A', spend: '110', impressions: '1000', clicks: '50', actions: [{ action_type: 'lead', value: '12' }, { action_type: 'onsite_conversion.lead_grouped', value: '12' }] }, { date_start: '2026-11-01', campaign_name: 'OUTRO CLIENTE', ad_name: 'Anúncio A', spend: '9000' }];
const report = buildReport(crm, insights, { since: '2026-11-01', until: '2026-11-02' }, '2026-11-02T03:00:00Z');
assert.deepEqual(report.counts, { leads: 11, responded: 8, qualified: 6, scheduled: 4, held: 3, sales: 1 });
assert.equal(report.spend, 110);
assert.equal(report.metaLeads, 12);
assert.equal(report.funnel[4].cost, 110 / 3);
assert.equal(report.funnel[4].conversion, 75);
assert.equal(report.contact.averageAttempts, 2);
assert.equal(report.contact.responseRate, 800 / 11);
assert.equal(report.ads[0].crmLeads, 10);
assert.equal(report.ads[0].qualified, 5);
assert.equal(report.ads[1].name, 'Sem correspondência');
assert.equal(report.ads[1].crmLeads, 1);
assert.equal(report.daily[0].leads, 11);
assert.deepEqual(report.daily[1], { date: '2026-11-02', spend: 0, leads: 0, metaLeads: 0 });
assert.equal(crm.invalidDates, 1);
assert.ok(!JSON.stringify(report).includes('PESSOA PRIVADA'));
assert.ok(!JSON.stringify(report).includes('DATA INVÁLIDA'));
assert.ok(!JSON.stringify(report).includes('IGNORAR REFERÊNCIA'));
assert.equal(adKey(' ANÚNCIO   A '), adKey('anúncioa'));
assert.deepEqual(parsePeriod(new URLSearchParams('period=7'), '2026-11-16'), { since: '2026-11-10', until: '2026-11-16' });
assert.deepEqual(parsePeriod(new URLSearchParams('period=30'), '2026-11-16'), { since: '2026-10-18', until: '2026-11-16' });
assert.deepEqual(parsePeriod(new URLSearchParams('period=month'), '2026-11-16'), { since: '2026-11-01', until: '2026-11-16' });
assert.equal(parsePeriod(new URLSearchParams()), null);
for (const params of ['period=nope', 'period=custom&since=2026-11-02&until=2026-11-01', 'period=custom&since=2026-02-30&until=2026-03-01', 'period=custom&since=2026-01-01&until=2099-01-01']) assert.throws(() => parsePeriod(new URLSearchParams(params)));
const empty = buildReport(aggregateCrm([headers, []]), [], { since: '2026-11-01', until: '2026-11-01' }, 'now');
assert.ok(empty.funnel.every(stage => stage.cost === null));
assert.equal(empty.contact.averageAttempts, null);
assert.equal(empty.contact.responseRate, null);
const missing = aggregateCrm([headers, [], ['', 'A', 'Venda', 'Privado', '01/11/2026 01:00']]);
assert.equal(buildReport(missing, [], { since: '2026-11-01', until: '2026-11-01' }, 'now').contact.missingAttempts, 1);
assert.throws(() => aggregateCrm([['Nome'], []]), /Cabeçalhos/);
assert.equal(metaLeads({ actions: [{ action_type: 'lead', value: '0' }, { action_type: 'onsite_conversion.lead_grouped', value: '3' }] }), 0);
assert.equal(metaLeads({ actions: [{ action_type: 'onsite_conversion.lead_grouped', value: '3' }] }), 3);
const sources = load('app/temiis/_sources.ts', { './_model': model });
process.env.META_ACCESS_TOKEN = 'TOKEN_DE_TESTE';
process.env.GOOGLE_SHEETS_ACCESS_TOKEN = 'TOKEN_GOOGLE_TESTE';
process.env.META_GRAPH_VERSION = 'v23.0';
const calls = [];
globalThis.fetch = async (input, options) => {
  const url = new URL(input); calls.push({ url, options });
  assert.equal(options.method || 'GET', 'GET');
  assert.ok(!url.searchParams.has('access_token'));
  if (url.hostname === 'sheets.googleapis.com') {
    assert.ok(url.pathname.includes('1di-EthYG4CVjZNMwXCqzHxmRlMZw_XDC5UzVeLbT7Is'));
    assert.ok(decodeURIComponent(url.pathname).endsWith("/values/'Leads'"));
    assert.equal(url.searchParams.get('valueRenderOption'), 'UNFORMATTED_VALUE');
    assert.equal(url.searchParams.get('dateTimeRenderOption'), 'SERIAL_NUMBER');
    return Response.json({ values: table });
  }
  assert.ok(url.pathname.endsWith('/act_2167370950327006/insights'));
  assert.equal(url.searchParams.get('time_increment'), '1');
  assert.equal(url.searchParams.get('level'), 'ad');
  assert.ok(url.searchParams.get('filtering').includes('[TÊMIIS]'));
  if (!url.searchParams.has('after')) return Response.json({ data: insights, paging: { next: 'https://nao-seguir.exemplo/?access_token=SEGREDO', cursors: { after: 'proxima' } } });
  return Response.json({ data: [] });
};
assert.equal((await sources.readCrm()).buckets.length, 2);
assert.equal((await sources.readMeta(null)).length, 2);
assert.equal(calls.length, 3);
assert.equal(calls[1].url.searchParams.get('date_preset'), 'maximum');
process.env.TEMIIS_META_ACCESS_TOKEN = 'CREDENCIAL_EXCLUSIVA_TESTE';
globalThis.fetch = async (_url, options) => {
  assert.equal(options.headers.Authorization, 'Bearer CREDENCIAL_EXCLUSIVA_TESTE');
  return Response.json({ data: [] });
};
assert.deepEqual(await sources.readMeta(null), []);
delete process.env.TEMIIS_META_ACCESS_TOKEN;
globalThis.fetch = async () => new Response('{}', { status: 403 });
await assert.rejects(sources.readCrm(), /conta Google/);
await assert.rejects(sources.readMeta(null), /token/);
globalThis.fetch = async () => Response.json({ error: { code: 200 } }, { status: 403 });
await assert.rejects(sources.readMeta(null), /ads_read/);
let crmReads = 0, metaReads = 0;
const { GET } = load('app/temiis/data/route.ts', {
  '../_model': model,
  '../_sources': { SourceError: sources.SourceError, readCrm: async () => { crmReads++; return crm; }, readMeta: async () => { metaReads++; return insights; } },
});
const { NextRequest } = require('next/server');
const request = () => new NextRequest('https://exemplo.com/temiis/data?period=custom&since=2026-11-01&until=2026-11-02');
const [api1, api2] = await Promise.all([GET(request()), GET(request())]);
assert.equal(api1.status, 200);
assert.equal(api2.status, 200);
assert.equal(crmReads, 1);
assert.equal(metaReads, 1);
assert.equal(api1.headers.get('x-robots-tag'), 'noindex, nofollow');
assert.equal(api1.headers.get('cache-control'), 'no-store');
const payload = await api1.json();
assert.deepEqual(payload.counts, report.counts);
assert.ok(!JSON.stringify(payload).includes('PESSOA PRIVADA'));
assert.equal((await GET(new NextRequest('https://exemplo.com/temiis/data?period=errado'))).status, 400);
const failing = load('app/temiis/data/route.ts', {
  '../_model': model,
  '../_sources': { SourceError: sources.SourceError, readCrm: async () => crm, readMeta: async () => { throw new sources.SourceError('meta', 'Sem permissão de leitura'); } },
});
const errorResponse = await failing.GET(request());
assert.equal(errorResponse.status, 502);
assert.deepEqual(await errorResponse.json(), { error: 'Sem permissão de leitura', source: 'meta' });
console.log('Têmiis: funil, atribuição, privacidade, períodos, vazios, paginação, fontes e falhas verificados.');
