import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync('app/dashboard/renato-pretel/src/app.js', 'utf8').split('init().catch')[0];
const context = vm.createContext({ Intl, Date });
vm.runInContext(source + '\nglobalThis.aggregate = aggregateCrm;', context);
const result = context.aggregate([
  { totalLeads: 10, effectiveTotal: 6, effectiveOnly: 4, qualified: 2, converted: 1 },
  { totalLeads: 4, effectiveTotal: 3, effectiveOnly: 2, qualified: 1, converted: 0 },
]);
assert.equal(result.totalLeads, 14);
assert.equal(result.effectiveLeads, 9);
assert.equal(result.qualifiedLeads, 3);
assert.equal(result.sales, 1);
console.log('Renato metrics: totals and overlapping funnel stages verified');
