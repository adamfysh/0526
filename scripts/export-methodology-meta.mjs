// Generates src/data/methodology-meta.json from the CDM v3 tool outputs.
// Inputs: public/simulator_data.json, public/narrows_config.json.
// Formulas mirror the simulator (app/index.html).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sim = JSON.parse(fs.readFileSync(path.join(root, 'public/simulator_data.json'), 'utf8'));
const cfg = JSON.parse(fs.readFileSync(path.join(root, 'public/narrows_config.json'), 'utf8'));

const CARRY = 0.05; // simulator default, % p.a.
const rows = [];
for (const [cp, byCode] of Object.entries(sim.chokepoints))
  for (const [code, list] of Object.entries(byCode))
    if (Array.isArray(list) && code !== 'all')
      for (const r of list) if (!r.excluded && (r.dep > 0 || r.varB > 0)) rows.push({ cp, ...r });

const uniq = (a) => [...new Set(a)];
const byKey = (k) => Object.entries(cfg.chokepoints).find(([, v]) => v.jsonKey === k)?.[1];
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;

const totVar = rows.reduce((s, r) => s + r.varB, 0);
const tierVal = {};
const tierRows = {};
for (const r of rows) {
  tierVal[r.data_tier] = (tierVal[r.data_tier] || 0) + r.varB;
  tierRows[r.data_tier] = (tierRows[r.data_tier] || 0) + 1;
}
const tiers = [1, 2, 3].map((t) => ({
  tier: t,
  label: sim.data_tiers[String(t)],
  rows: tierRows[t] || 0,
  valuePct: r1(((tierVal[t] || 0) / totVar) * 100),
}));

const SEV = 1, DUR = 14;
const mal = byKey('MALACCA');
const sens = mal.sensitivity;
const mrows = rows.filter((r) => r.cp === 'MALACCA');
const exp = (r) => r.varB * (1 - (r.route_inelasticity || 0)) * SEV * sens * (DUR / 365);
const total = mrows.reduce((s, r) => s + exp(r), 0);
const byCountry = {};
for (const r of mrows) (byCountry[r.importer_iso] ||= []).push(r);
const above5 = Object.values(byCountry).filter((l) => l.some((r) => r.dep > 5)).length;
const crude = mrows.filter((r) => r.commodity_code === '2709').sort((a, b) => exp(b) - exp(a));
const top = crude.slice(0, 5).map((r) => ({ name: r.country, iso: r.importer_iso, dep: Math.round(r.dep), valueB: r2(exp(r)) }));
const mt = {};
for (const r of mrows) mt[r.data_tier] = (mt[r.data_tier] || 0) + exp(r);
const sampleTiers = Object.fromEntries([1, 2, 3].map((t) => [t, r1(((mt[t] || 0) / total) * 100)]));
const dvals = Object.values(mal.detourDays).filter((d) => d > 0);
const avgDetour = r1(mrows.reduce((s, r) => s + r.avg_detour_days, 0) / mrows.length);

const suez = byKey('SUEZ');
const vr = cfg.vesselRates.VLCC;
const sd = suez.detourDays.VLCC;
const overrun = (vr.bunkerPerDay + vr.charterPerDay) * sd;
const carry = vr.cargoValueM * 1e6 * (CARRY / 365) * sd;

let vessels = 0, cargoM = 0, loss = 0;
for (const v of Object.keys(suez.dailyTransits)) {
  const n = Math.round(suez.dailyTransits[v] * Math.min(DUR, 20) * SEV);
  const rate = cfg.vesselRates[v];
  vessels += n;
  cargoM += n * rate.cargoValueM;
  loss += n * (rate.bunkerPerDay + rate.charterPerDay) * (suez.detourDays[v] || 0);
}
const fleetVlcc = Math.round(suez.dailyTransits.VLCC * Math.min(DUR, 20) * SEV);

const meta = {
  generated: sim.generated,
  build: sim.build_version,
  modelYear: sim.model_year,
  chokepoints: Object.keys(sim.chokepoints).length,
  importers: uniq(rows.map((r) => r.importer_iso)).length,
  commodities: uniq(rows.map((r) => r.commodity_code)).length,
  rows: rows.length,
  vintages: Object.fromEntries(Object.entries(rows.reduce((a, r) => ((a[r.data_year] = (a[r.data_year] || 0) + 1), a), {}))),
  tiers,
  sample: { sensitivity: sens, days: DUR, totalB: r1(total), countriesAbove5: above5, countriesTotal: Object.keys(byCountry).length, avgDetourDays: avgDetour, detourMin: Math.min(...dvals), detourMax: Math.max(...dvals), tierPct: sampleTiers, top },
  reroute: { days: sd, overrunM: r1(overrun / 1e6), carryK: Math.round(carry / 1e3) },
  fleet: { vlcc: fleetVlcc, vessels, cargoB: r1(cargoM / 1000), overrunM: r1(loss / 1e6), days: DUR },
};
const out = path.join(root, 'src/data/methodology-meta.json');
fs.writeFileSync(out, JSON.stringify(meta, null, 2) + '\n');
console.log(JSON.stringify(meta));
