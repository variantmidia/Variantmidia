import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync('app/dashboard/renato-pretel/src/app.js', 'utf8').split('init().catch')[0];
const context = vm.createContext({ Intl, Date });
vm.runInContext(source + '\nglobalThis.aggregate = aggregateCrm; globalThis.resolveSales = resolveSales;', context);
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
