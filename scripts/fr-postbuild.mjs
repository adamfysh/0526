#!/usr/bin/env node
// French pages for content that is not an Astro [...lang] page (analyses, tools).
// Reads dist/<path>, replaces leaf text blocks with the French in src/i18n/articles/<name>.json,
// swaps nav and footer for the French ones, localises internal links and head meta,
// writes dist/fr/<path>. Missing translations fail the build (exit 1).
//   node scripts/fr-postbuild.mjs            build + check
//   node scripts/fr-postbuild.mjs --report   also write src/i18n/articles/_missing/<name>.json
import fs from 'fs';
import path from 'path';
import { parse, parseFragment, serialize, leafBlocks, norm, shell, cidOf, addCid, localizeNumbers } from './frlib.mjs';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const DICTS = path.join(ROOT, 'src/i18n/articles');
const REPORT = process.argv.includes('--report');
const SITE = 'https://narrows.io';

// Pages that must have a French dictionary (EN source page, relative to dist).
export const REQUIRED = JSON.parse(fs.readFileSync(path.join(DICTS, '_required.json'), 'utf8'));

const isEl = (n) => n.nodeName && !n.nodeName.startsWith('#');
const kids = (n) => n.childNodes || [];
function find(n, pred, out = []) { if (isEl(n) && pred(n)) out.push(n); kids(n).forEach((c) => find(c, pred, out)); return out; }
const attr = (n, k) => (n.attrs.find((a) => a.name === k) || {}).value;
const setAttr = (n, k, v) => { const a = n.attrs.find((x) => x.name === k); if (a) a.value = v; else n.attrs.push({ name: k, value: v }); };

function srcFile(p) {
  const a = path.join(DIST, p, 'index.html'), b = path.join(DIST, p + '.html');
  return fs.existsSync(a) ? a : fs.existsSync(b) ? b : null;
}
function outFile(p) { return fs.existsSync(path.join(DIST, p, 'index.html')) ? path.join(DIST, 'fr', p, 'index.html') : path.join(DIST, 'fr', p + '.html'); }

// translated base paths, to rewrite links
const idx = fs.readFileSync(path.join(ROOT, 'src/i18n/index.ts'), 'utf8');
const translated = new Set([...idx.match(/new Set<string>\(\[([\s\S]*?)\]\)/)[1].matchAll(/'([^']+)'/g)].map((m) => m[1]));
for (const r of REQUIRED) translated.add('/' + r.replace(/\.html$/, '').replace(/\/index$/, ''));

const frAbout = parse(fs.readFileSync(path.join(DIST, 'fr/about/index.html'), 'utf8'));
const frShell = shell(frAbout);

let failures = 0;
for (const rel of REQUIRED) {
  const name = rel.replace(/\//g, '__');
  const file = srcFile(rel);
  const dictFile = path.join(DICTS, name + '.json');
  if (!file) { console.error(`FAIL ${rel}: page not built`); failures++; continue; }
  if (!fs.existsSync(dictFile)) { console.error(`FAIL ${rel}: no French dictionary (${name}.json)`); failures++; continue; }
  const dict = JSON.parse(fs.readFileSync(dictFile, 'utf8'));
  const map = new Map(dict.pairs.map(([e, f]) => [norm(e), f]));
  const doc = parse(fs.readFileSync(file, 'utf8'));
  const sh = shell(doc);
  const skip = new Set([sh.nav, sh.menu, sh.footer]);
  const inSkip = (n) => { for (let p = n; p; p = p.parentNode) if (skip.has(p)) return true; return false; };
  const missing = [], used = new Set();
  for (const b of leafBlocks(doc)) {
    if (inSkip(b.node)) continue;
    if (b.mixed) {
      for (const t of kids(b.node).filter((c) => c.nodeName === '#text' && /[A-Za-z]{2,}/.test(c.value))) {
        const k = '@t:' + norm(t.value);
        if (map.has(k)) { const f = map.get(k); t.value = t.value.replace(norm(t.value), f); used.add(k); } else missing.push(k);
      }
      continue;
    }
    if (map.has(b.key)) {
      const f = map.get(b.key);
      used.add(b.key);
      if (f === '' || f === null) continue;
      const frag = parseFragment(f); addCid(frag, cidOf(b.node));
      b.node.childNodes = frag.childNodes;
      b.node.childNodes.forEach((c) => (c.parentNode = b.node));
    } else missing.push(b.key);
  }
  localizeNumbers(doc, skip);
  // inline script strings
  const scripts = find(doc, (n) => n.nodeName === 'script' && !attr(n, 'src') && attr(n, 'type') !== 'application/ld+json');
  for (const [e, f] of dict.js || []) {
    let hit = 0;
    for (const s of scripts) for (const t of kids(s)) if (t.nodeName === '#text' && t.value.includes(e)) { t.value = t.value.split(e).join(f); hit++; }
    if (!hit) missing.push('@js:' + e);
  }
  // head
  const html = find(doc, (n) => n.nodeName === 'html')[0]; setAttr(html, 'lang', 'fr');
  const url = SITE + '/fr/' + rel.replace(/\.html$/, '').replace(/\/index$/, '');
  const enUrl = SITE + '/' + rel.replace(/\.html$/, '').replace(/\/index$/, '');
  const titleEl = find(doc, (n) => n.nodeName === 'title')[0];
  if (dict.meta && dict.meta.title) { titleEl.childNodes = [{ nodeName: '#text', value: dict.meta.title, parentNode: titleEl }]; } else missing.push('@meta:title');
  for (const m of find(doc, (n) => n.nodeName === 'meta')) {
    const k = attr(m, 'name') || attr(m, 'property');
    if (/^(description|og:description|twitter:description)$/.test(k)) { if (dict.meta && dict.meta.description) setAttr(m, 'content', dict.meta.description); else if (k === 'description') missing.push('@meta:description'); }
    if (/^(og:title|twitter:title)$/.test(k) && dict.meta && dict.meta.title) setAttr(m, 'content', dict.meta.title);
    if (k === 'og:url') setAttr(m, 'content', url);
    if (k === 'og:locale') setAttr(m, 'content', 'fr_FR');
  }
  const head = find(doc, (n) => n.nodeName === 'head')[0];
  for (const l of find(doc, (n) => n.nodeName === 'link' && attr(n, 'rel') === 'canonical')) setAttr(l, 'href', url);
  const mk = (rel2, hl, href) => parseFragment(`<link rel="${rel2}" hreflang="${hl}" href="${href}">`).childNodes[0];
  if (!find(doc, (n) => n.nodeName === 'link' && attr(n, 'hreflang')).length) for (const [hl, href] of [['en', enUrl], ['fr', url], ['x-default', enUrl]]) { const l = mk('alternate', hl, href); l.parentNode = head; head.childNodes.push(l); }
  else for (const l of find(doc, (n) => n.nodeName === 'link' && attr(n, 'hreflang'))) { /* already set by layout for EN; point fr at this page */ if (attr(l, 'hreflang') === 'fr') setAttr(l, 'href', url); }
  // structured data
  for (const sc of find(doc, (n) => n.nodeName === 'script' && attr(n, 'type') === 'application/ld+json')) {
    const tn = kids(sc).find((c) => c.nodeName === '#text'); if (!tn) continue;
    try {
      const j = JSON.parse(tn.value);
      if (j['@type'] === 'Organization' && j.description) j.description = 'Narrows modélise la dépendance bilatérale du commerce maritime au niveau des points de passage.';
      if (j['@type'] === 'Article') {
        if (dict.meta && dict.meta.title) j.headline = dict.meta.title.replace(/^Narrows — /, '');
        if (dict.meta && dict.meta.description) j.description = dict.meta.description;
        j.inLanguage = 'fr'; if (j.url) j.url = url + '/';
      }
      tn.value = JSON.stringify(j);
    } catch (e) { /* leave untouched */ }
  }
  // nav + footer from the French site shell
  const swap = (a, b) => { if (a && b) { a.childNodes = parseFragment(serialize(b)).childNodes; a.childNodes.forEach((c) => (c.parentNode = a)); a.attrs = b.attrs.map((x) => ({ ...x })); } };
  swap(sh.nav, frShell.nav); swap(sh.menu, frShell.menu); swap(sh.footer, frShell.footer);
  // links
  for (const a of find(doc, (n) => n.nodeName === 'a' && (attr(n, 'href') || '').startsWith('/') && !(attr(n, 'href') || '').startsWith('/fr/'))) {
    const h = attr(a, 'href'); const m = h.match(/^([^#?]*)(.*)$/); const base = m[1].replace(/\/+$/, '') || '/';
    if (translated.has(base)) setAttr(a, 'href', (base === '/' ? '/fr/' : '/fr' + base) + m[2]);
  }
  // embedded pages: point iframes at the French copy when one exists
  for (const f of find(doc, (n) => n.nodeName === 'iframe' && (attr(n, 'src') || '').startsWith('/') && !(attr(n, 'src') || '').startsWith('/fr/'))) {
    const s = attr(f, 'src'); const m = s.match(/^([^#?]*)(.*)$/); const base = m[1].replace(/\.html$/, '').replace(/\/+$/, '');
    if (translated.has(base)) setAttr(f, 'src', '/fr' + m[1] + m[2]);
  }
  const out = outFile(rel); fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, serialize(doc));
  const stale = [...map.keys()].filter((k) => !used.has(k) && !k.startsWith('@js:'));
  if (missing.length) {
    failures++;
    console.error(`FAIL ${rel}: ${missing.length} untranslated block(s)`);
    missing.slice(0, 5).forEach((m) => console.error('   ', m.slice(0, 110)));
    if (REPORT) { fs.mkdirSync(path.join(DICTS, '_missing'), { recursive: true }); fs.writeFileSync(path.join(DICTS, '_missing', name + '.json'), JSON.stringify([...new Set(missing)], null, 1)); }
  } else console.log(`ok   ${rel}${stale.length ? ` (${stale.length} unused dictionary entries)` : ''}`);
}
if (failures) { console.error(`\n${failures} page(s) with missing French.`); process.exit(1); }
console.log('French pages written.');
