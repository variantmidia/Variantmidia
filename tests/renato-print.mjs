import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { createRequire, stripTypeScriptTypes } from 'node:module';
import vm from 'node:vm';

const require = createRequire(import.meta.url);
const report = JSON.parse(readFileSync('app/dashboard/renato-pretel/data/report.json', 'utf8'));
report.sync = { crm: { status: 'live' }, ads: { status: 'live' } };
const token = randomBytes(32).toString('hex');
const load = async (file, overrides = {}) => {
  const context = vm.createContext({ process, console, Buffer, URL });
  const module = new vm.SourceTextModule(stripTypeScriptTypes(readFileSync(file, 'utf8')), { context });
  await module.link(name => {
    const dependency = overrides[name] ?? require(name);
    const names = Object.keys(dependency);
    return new vm.SyntheticModule(names, function () { for (const key of names) this.setExport(key, dependency[key]); }, { context });
  });
  await module.evaluate();
  return module.namespace;
};
const print = await load('app/dashboard/renato-pretel/_print.ts');
assert.ok(print.validPrintToken(token, token));
for (const expected of ['', undefined, ' ']) assert.equal(print.validPrintToken(token, expected), false);
assert.equal(print.validPrintToken(null, token), false);
assert.equal(print.validPrintToken(token + 'x', token), false);
assert.equal(print.printMonth('2026-10').end, '2026-10-31');
assert.equal(print.printMonth(null, new Date('2026-11-16T15:00:00Z')).start, '2026-10-01');
assert.equal(print.printMonth(null, new Date('2026-01-01T02:00:00Z')).start, '2025-11-01');
assert.equal(print.printMonth('2024-02').end, '2024-02-29');
assert.equal(print.printMonth('2026-13'), null);
assert.equal(print.printMonth('<script>'), null);
const { GET } = await load('app/dashboard/renato-pretel/print/route.ts', { '../_print': print, '../_report': { loadReport: async () => report } });
const { NextRequest } = require('next/server');
const request = query => new NextRequest(`https://example.com/dashboard/renato-pretel/print${query}`);
const saved = process.env.PRINT_TOKEN_RENATO_PRETEL;
try {
  process.env.PRINT_TOKEN_RENATO_PRETEL = token;
  for (const query of ['', '?token=wrong', `?token=${token}&token=${token}`]) {
    const response = await GET(request(query));
    assert.equal(response.status, 404);
    assert.equal(await response.text(), '');
  }
  const response = await GET(request(`?token=${token}&mes=2026-10`));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('set-cookie'), null);
  assert.equal(response.headers.get('referrer-policy'), 'no-referrer');
  assert.equal(response.headers.get('cache-control'), 'no-store, private');
  assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow');
  const html = await response.text();
  assert.ok(html.includes('Relatório de Outubro de 2026'));
  assert.ok(html.includes('data-print-ready="false"'));
  assert.ok(!html.includes(token));
  assert.ok(!html.includes('class="filter-bar"'));
  assert.ok(!html.includes('<aside'));
  assert.ok(!html.includes('script src='));
  assert.ok(!html.includes('@import'));
  assert.ok(!html.includes('<form'));
  process.env.PRINT_TOKEN_RENATO_PRETEL = '';
  const empty = await GET(request(`?token=${token}`));
  assert.equal(empty.status, 404);
  assert.equal(await empty.text(), '');
  delete process.env.PRINT_TOKEN_RENATO_PRETEL;
  assert.equal((await GET(request(`?token=${token}`))).status, 404);
  const auth = await load('app/dashboard/renato-pretel/_auth.ts');
  assert.equal(auth.hasValidSession(request(`?token=${token}`)), false);
} finally {
  if (saved === undefined) delete process.env.PRINT_TOKEN_RENATO_PRETEL;
  else process.env.PRINT_TOKEN_RENATO_PRETEL = saved;
}
console.log('Print security, fail-closed route, month selection, isolation, inline assets and headers: passed');
