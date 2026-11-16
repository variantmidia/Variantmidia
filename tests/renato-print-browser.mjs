import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';

const secret = readFileSync(join(process.env.USERPROFILE, '.codex/secrets/renato-pretel-print-token.txt'), 'utf8').trim();
const root = 'https://www.variantmidia.com.br/dashboard/renato-pretel';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1200, height: 1000 } });
  for (const suffix of ['/print', '/print?token=wrong']) {
    const response = await context.request.get(root + suffix);
    assert.equal(response.status(), 404);
    assert.equal(await response.text(), '');
    assert.equal(response.headers()['set-cookie'], undefined);
  }
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const start = performance.now();
  const response = await page.goto(root + '/print?token=' + secret + '&mes=2026-10', { waitUntil: 'commit' });
  const committed = performance.now();
  assert.equal(response.status(), 200);
  await page.waitForSelector('body[data-print-ready="true"]', { timeout: 3000 });
  const ready = performance.now();
  assert.equal(response.headers()['set-cookie'], undefined);
  for (const [header, value] of Object.entries({ 'cache-control': 'no-store, private', 'referrer-policy': 'no-referrer', 'x-robots-tag': 'noindex, nofollow' })) assert.equal(response.headers()[header], value);
  assert.ok(await page.title() === 'Relatório de Outubro de 2026 | Renato Pretel');
  assert.equal(await page.locator('.filter-bar, .sidebar, form, button, input').count(), 0);
  assert.equal(await page.evaluate(() => document.body.getBoundingClientRect().width), 1200);
  assert.equal((await context.cookies()).length, 0);
  const state = await page.evaluate(() => ({ start: window.__RENATO_PRINT__.defaultRange.start, end: window.__RENATO_PRINT__.defaultRange.end, animation: Chart.defaults.animation, report: window.__RENATO_PRINT__, ready: document.body.dataset.printReady }));
  assert.equal(state.start, '2026-10-01');
  assert.equal(state.end, '2026-10-31');
  assert.equal(state.animation, false);
  const spend = state.report.daily.filter(r => r.date >= state.start && r.date <= state.end).reduce((s, r) => s + r.spend, 0);
  assert.equal(await page.locator('[data-bind="spend"]').textContent(), new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(spend));
  const drawn = await page.evaluate(() => [...document.querySelectorAll('canvas')].every(c => c.width > 0 && c.height > 0 && c.getContext('2d').getImageData(0, 0, c.width, c.height).data.some((v, i) => i % 4 === 3 && v > 0)));
  assert.ok(drawn);
  await page.screenshot({ path: 'artifacts/renato-print-october.png', fullPage: true });
  const defaultResponse = await context.request.get(root + '/print?token=' + secret);
  assert.equal(defaultResponse.status(), 200);
  assert.ok((await defaultResponse.text()).includes('Relatório de Outubro de 2026'));
  const normal = await context.request.get(root + '?token=' + secret);
  assert.ok((await normal.text()).includes('name="password"'));
  assert.equal((await context.request.get(root + '/data?token=' + secret)).status(), 401);
  const other = await context.request.get('https://www.variantmidia.com.br/cliente/tavora-advogado?token=' + secret);
  assert.ok([401, 403, 404].includes(other.status()) || (await other.text()).includes('password'));
  assert.equal((await context.cookies()).length, 0);
  assert.equal(errors.length, 0, errors.join('\n'));
  console.log(JSON.stringify({ passed: true, htmlResponseMs: Math.round(committed - start), readyAfterHtmlMs: Math.round(ready - committed), totalReadyMs: Math.round(ready - start), month: state.start.slice(0, 7), width: 1200, noCookies: true, isolated: true, chartsDrawn: drawn }));
} catch (error) {
  console.error(String(error.message).replaceAll(secret, '[REDACTED]'));
  process.exitCode = 1;
} finally { await browser.close(); }
