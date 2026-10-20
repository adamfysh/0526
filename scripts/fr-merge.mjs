#!/usr/bin/env node
// node scripts/fr-merge.mjs <rel-path> <keysfile> <frfile> ['{"title":"..","description":".."}']
// keysfile: JSON array of English keys (from fr-extract). frfile: JSON array of French, same order; "" keeps the English as is.
import fs from 'fs';
import path from 'path';
const [rel, kf, ff, meta] = process.argv.slice(2);
const keys = JSON.parse(fs.readFileSync(kf, 'utf8')), fr = JSON.parse(fs.readFileSync(ff, 'utf8'));
if (keys.length !== fr.length) { console.error(`length mismatch: ${keys.length} keys, ${fr.length} French`); process.exit(1); }
const name = rel.replace(/\//g, '__');
const dictFile = path.join('src/i18n/articles', name + '.json');
const d = fs.existsSync(dictFile) ? JSON.parse(fs.readFileSync(dictFile, 'utf8')) : { path: rel, meta: {}, pairs: [], js: [] };
const idx = new Map(d.pairs.map((p, i) => [p[0], i]));
keys.forEach((k, i) => { if (idx.has(k)) d.pairs[idx.get(k)][1] = fr[i]; else { idx.set(k, d.pairs.length); d.pairs.push([k, fr[i]]); } });
if (meta) d.meta = { ...d.meta, ...JSON.parse(meta) };
fs.writeFileSync(dictFile, JSON.stringify(d, null, 1));
console.log(`${name}: ${d.pairs.length} pairs`);
