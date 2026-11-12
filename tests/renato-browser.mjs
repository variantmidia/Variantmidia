import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1050 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('https://www.variantmidia.com.br/dashboard/renato-pretel');
  await page.locator('#user').fill('matheus');
  await page.locator('#password').fill(process.env.RENATO_TEST_PASSWORD);
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('[data-bind="connectionStatus"]')?.textContent === 'Dados ao vivo', { timeout: 60000 });
  const report = await page.evaluate(async () => (await fetch('/dashboard/renato-pretel/data')).json());
  const currency = n => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n);
  await page.locator('[data-preset="work"]').click();
  let spend = report.daily.reduce((a, r) => a + r.spend, 0);
  assert.equal(await page.locator('[data-bind="cac"]').textContent(), currency(spend / 8));
  await page.locator('[data-preset="cycle"]').click();
  spend = report.daily.filter(r => r.date >= '2026-10-17' && r.date <= report.dataEnd).reduce((a, r) => a + r.spend, 0);
  assert.equal(await page.locator('[data-bind="cac"]').textContent(), currency(spend / 2));
  await page.locator('[data-days="14"]').click();
  await page.waitForTimeout(1000);
  await mkdir('artifacts', { recursive: true });
  await page.screenshot({ path: 'artifacts/renato-desktop.png', fullPage: true });
  const desktop = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth, charts: [...document.querySelectorAll('canvas')].map(c => ({ width: c.width, height: c.height })), logo: document.querySelector('.brand-mark img').naturalWidth }));
  assert.ok(desktop.scroll <= desktop.width);
  assert.ok(desktop.logo > 0);
  assert.ok(desktop.charts.every(c => c.width > 20 && c.height > 20));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'artifacts/renato-mobile.png', fullPage: true });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await page.locator('[data-days="30"]').click();
  await page.locator('#compareToggle').uncheck();
  assert.equal(errors.length, 0, errors.join('\n'));
  console.log(JSON.stringify({ passed: true, desktop, pageViews: report.pageViews, sync: report.sync }));
} finally { await browser.close(); }
