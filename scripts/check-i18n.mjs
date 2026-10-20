// Post-build parity check for the English/French pages.
// Usage: npm run build && npm run check:i18n   (or: node scripts/check-i18n.mjs [distDir])
// Fails (exit 1) if a translated page is missing in either language, contains an
// em-dash or "undefined", is not marked lang="fr", or if the numbers shown differ
// between English and French (the usual sign of a fix made in one language only).
import fs from 'node:fs';
import path from 'node:path';

const dist = process.argv[2] || 'dist';
const idx = fs.readFileSync('src/i18n/index.ts', 'utf8');
const block = idx.match(/new Set<string>\(\[([\s\S]*?)\]/)[1];
const paths = [...block.matchAll(/'([^']+)'/g)].map((m) => m[1]);

const file = (p, fr) => path.join(dist, fr ? 'fr' : '', p === '/' ? '' : p, 'index.html');
const text = (html) =>
  html.replace(/<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>|<head[\s\S]*?<\/head>/g, ' ')
      .replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&#39;|&rsquo;/g, "'").replace(/&amp;/g, '&');
const nums = (t) => {
  const s = t.replace(/(\d)[,.   ](?=\d{3}\b)/g, '$1').replace(/(\d)[,.](?=\d)/g, '$1.');
  const m = s.match(/\d+(\.\d+)?/g) || [];
  const c = {}; for (const n of m) c[n] = (c[n] || 0) + 1; return c;
};

let bad = 0;
const fail = (m) => { console.log('FAIL ' + m); bad++; };
for (const p of paths) {
  const fe = file(p, false), ff = file(p, true);
  if (!fs.existsSync(fe)) { fail(`${p}: English page missing`); continue; }
  if (!fs.existsSync(ff)) { fail(`${p}: French page missing`); continue; }
  const he = fs.readFileSync(fe, 'utf8'), hf = fs.readFileSync(ff, 'utf8');
  const te = text(he), tf = text(hf);
  if (!/<html lang="fr"/.test(hf)) fail(`${p}: French page is not lang="fr"`);
  for (const [n, t] of [['en', te], ['fr', tf]]) {
    if (t.includes('—')) fail(`${p} [${n}]: contains an em-dash`);
    if (/\bundefined\b/.test(t)) fail(`${p} [${n}]: contains "undefined"`);
  }
  if (te.replace(/\s+/g, ' ') === tf.replace(/\s+/g, ' ')) fail(`${p}: French text identical to English`);
  const ne = nums(te), nf = nums(tf);
  // $2.15T may legitimately read 2 150 Md$ in French: treat x and x*1000 as the same figure.
  const scaled = (k, other) => other[String(+k * 1000)] || other[String(+k / 1000)];
  const diff = [...new Set([...Object.keys(ne), ...Object.keys(nf)])].filter(
    (k) => ne[k] !== nf[k] && !(ne[k] && !nf[k] && scaled(k, nf)) && !(nf[k] && !ne[k] && scaled(k, ne)));
  if (diff.length) fail(`${p}: numbers differ between EN and FR: ${diff.slice(0, 15).join(', ')}`);
}
console.log(bad ? `\n${bad} problem(s).` : `OK: ${paths.length} pages checked, EN and FR agree.`);
process.exit(bad ? 1 : 0);
