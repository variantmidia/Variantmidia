import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync('app/dashboard/renato-pretel/src/app.js', 'utf8').split('init().catch')[0];
const context = vm.createContext({ Intl, Date });
vm.runInContext(source + '\nglobalThis.aggregate = aggregateCrm; globalThis.resolveSales = resolveSales; globalThis.resolveBudget = resolveBudget; globalThis.rate = qualifiedSalesRate; globalThis.budgetColor = budgetColor;', context);
const result = context.aggregate([
  { totalLeads: 10, effectiveTotal: 6, effectiveOnly: 4, qualified: 2, converted: 1 },
  { totalLeads: 4, effectiveTotal: 3, effectiveOnly: 2, qualified: 1, converted: 0 },
]);
assert.equal(result.totalLeads, 14);
assert.equal(result.effectiveLeads, 9);
assert.equal(result.qualifiedLeads, 3);
assert.equal(result.sales, 1);
console.log('Renato metrics: totals and overlapping funnel stages verified');
const report = {
  workPeriod: { start: '2026-07-13' },
  salesConfirmation: JSON.parse(readFileSync('app/dashboard/renato-pretel/data/sales-confirmation.json', 'utf8')),
};
assert.equal(context.resolveSales(report, '2026-07-13', '2026-11-09', 3).count, 8);
assert.equal(context.resolveSales(report, '2026-10-17', '2026-11-09', 0).count, 2);
assert.equal(context.resolveSales(report, '2026-10-01', '2026-10-31', 0).count, 0);
assert.equal(context.resolveSales(report, '2026-07-13', '2026-11-09', 8).count, 8);
assert.equal(context.resolveSales(report, '2026-10-17', '2026-11-09', 2).count, 2);
assert.equal(context.resolveSales(report, '2026-07-13', '2026-11-10', 9).count, 9);
console.log('CAC denominators: 8 total, 2 cycle, no duplication or invented monthly allocation');
const budgetReport = { ...report, budget: { monthly: 1300 }, daily: [
  { date: '2026-10-16', spend: 100 },
  { date: '2026-10-17', spend: 500 },
  { date: '2026-11-13', spend: 580.41 },
  { date: '2026-11-17', spend: 25 },
] };
const budget = context.resolveBudget(budgetReport, '2026-11-13');
assert.equal(budget.start, '2026-10-17');
assert.ok(Math.abs(budget.remaining - 219.59) < 0.00001);
assert.ok(Math.abs(budget.usedRatio - 1080.41 / 1300) < 0.00001);
const reset = context.resolveBudget(budgetReport, '2026-11-17');
assert.equal(reset.start, '2026-11-17');
assert.equal(reset.spent, 25);
assert.equal(reset.remaining, 1275);
assert.equal(context.resolveBudget({ ...budgetReport, budget: { monthly: 0 } }, '2026-11-13').usedRatio, 0);
assert.equal(context.resolveBudget({ ...budgetReport, budget: { monthly: 100 } }, '2026-11-13').remaining, 0);
console.log('Cycle budget: R$1300 - R$1080.41 = R$219.59; gauge tracks spent, not remaining');
assert.ok(Math.abs(context.rate(2, 13) - 15.3846153846) < 0.00001);
assert.equal(context.rate(0, 13), 0);
assert.equal(context.rate(2, 0), null);
assert.equal(context.rate(null, 13), null);
console.log('Qualified-to-sale rate: 2/13 = 15.38%; missing denominator or sales is not zero');
assert.equal(context.budgetColor(0), '#169fc7');
assert.equal(context.budgetColor(0.49), '#169fc7');
assert.equal(context.budgetColor(0.5), '#e4ae20');
assert.equal(context.budgetColor(0.8), '#d94141');
assert.equal(context.budgetColor(1), '#d94141');
