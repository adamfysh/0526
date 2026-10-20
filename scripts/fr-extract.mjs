#!/usr/bin/env node
// node scripts/fr-extract.mjs <rel-path> [keysfile]
// Lists the blocks of a built page that have no French yet (reads dist/, so build first) and writes them,
// in order, to keysfile (default /tmp/keys.json) as a JSON array of English strings.
import fs from 'fs';
import path from 'path';
import { parse, leafBlocks, norm, shell } from './frlib.mjs';
const rel = process.argv[2], out = process.argv[3] || '/tmp/keys.json';
const name = rel.replace(/\//g, '__');
const f1 = path.join('dist', rel, 'index.html'), f2 = path.join('dist', rel + '.html');
const file = fs.existsSync(f1) ? f1 : f2;
const dictFile = path.join('src/i18n/articles', name + '.json');
const have = new Set(fs.existsSync(dictFile) ? JSON.parse(fs.readFileSync(dictFile, 'utf8')).pairs.map((p) => norm(p[0])) : []);
const isEl = (n) => n.nodeName && !n.nodeName.startsWith('#');
const doc = parse(fs.readFileSync(file, 'utf8'));
const find = (n, pred, o = []) => { if (isEl(n) && pred(n)) o.push(n); (n.childNodes || []).forEach((c) => find(c, pred, o)); return o; };
const sh = shell(doc); const skip = new Set([sh.nav, sh.menu, sh.footer]);
const inSkip = (n) => { for (let p = n; p; p = p.parentNode) if (skip.has(p)) return true; return false; };
const keys = [];
for (const b of leafBlocks(doc)) {
  if (inSkip(b.node)) continue;
  if (b.mixed) { for (const t of b.node.childNodes.filter((c) => c.nodeName === '#text' && /[A-Za-z]{2,}/.test(c.value))) keys.push('@t:' + norm(t.value)); continue; }
  keys.push(b.key);
}
const uniq = [...new Set(keys)].filter((k) => !have.has(k));
fs.writeFileSync(out, JSON.stringify(uniq, null, 1));
const title = (doc.childNodes.length && find(doc, (n) => n.nodeName === 'title')[0]);
const desc = find(doc, (n) => n.nodeName === 'meta' && (n.attrs.find((a) => a.name === 'name') || {}).value === 'description')[0];
console.log('TITLE:', title && title.childNodes[0] && title.childNodes[0].value);
console.log('DESC:', desc && desc.attrs.find((a) => a.name === 'content').value);
uniq.forEach((k, i) => console.log(i + ' ' + k));
console.log('total', uniq.length);
