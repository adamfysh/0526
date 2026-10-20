// Shared by the French post-build step and the checker.
import { parse, parseFragment, serialize } from 'parse5';
const INLINE = new Set(['a','strong','em','b','i','span','code','sup','sub','br','abbr','small','mark','u','s','wbr','tspan','title']);
const SKIP = new Set(['script','style','noscript','template','svg-defs']);
export const norm = (s) => s.replace(/\s+/g, ' ').trim();
const children = (n) => n.childNodes || [];
const isEl = (n) => n.nodeName && !n.nodeName.startsWith('#');
const text = (n) => children(n).filter((c) => c.nodeName === '#text').map((c) => c.value).join('');
export function inner(n) { const f = { nodeName: '#document-fragment', childNodes: children(n) }; return serialize(f); }
// A leaf block: element with letters in its text whose element children are all inline.
function hasLetters(s) { return /[A-Za-z]{2,}/.test(s); }
function allInline(n) {
  return children(n).every((c) => !isEl(c) || (INLINE.has(c.nodeName) && allInline(c)));
}
export function leafBlocks(doc) {
  const out = [];
  (function walk(n) {
    if (!isEl(n)) { children(n).forEach(walk); return; }
    if (SKIP.has(n.nodeName) || n.nodeName === 'head') return;
    const own = text(n);
    const hasEl = children(n).some(isEl);
    if (allInline(n)) {
      const html = stripCid(norm(inner(n)));
      if (hasLetters(html.replace(/<[^>]+>/g, ''))) out.push({ node: n, key: html });
      return;
    }
    // mixed: bare text next to block children: report it too
    if (hasEl && own.trim() && hasLetters(own) && !INLINE.has(n.nodeName)) out.push({ node: n, key: '@mixed:' + norm(own) , mixed: true });
    children(n).forEach(walk);
  })(doc);
  return out;
}
export { parse, parseFragment, serialize };

// Site shell (Nav + mobile menu + Footer) and the scoped-style attribute helpers.
const A = (n, k) => (n.attrs.find((a) => a.name === k) || {}).value;
export function findAll(n, pred, out = []) { if (n.nodeName && !n.nodeName.startsWith('#') && pred(n)) out.push(n); (n.childNodes || []).forEach((c) => findAll(c, pred, out)); return out; }
export function shell(doc) {
  return {
    nav: findAll(doc, (n) => n.nodeName === 'nav' && A(n, 'id') === 'main-nav')[0],
    menu: findAll(doc, (n) => A(n, 'id') === 'nav-mobile-menu')[0],
    footer: findAll(doc, (n) => n.nodeName === 'footer')[0],
  };
}
export function stripCid(html) { return html.replace(/ data-astro-cid-[a-z0-9]+(=""|(?=[ >]))/g, ''); }
export function cidOf(n) { const a = (n.attrs || []).find((x) => x.name.startsWith('data-astro-cid-')); return a ? a.name : null; }
export function addCid(frag, cid) {
  if (!cid) return;
  (function w(n) { if (n.attrs && !n.nodeName.startsWith('#') && !n.attrs.some((a) => a.name === cid)) n.attrs.push({ name: cid, value: '' }); (n.childNodes || []).forEach(w); })(frag);
}

// French number typography for text that carries no letters (table cells such as "13.4%" or "$5.1B").
// Idempotent: already-French text ("13,4 %", "5,1 Md$") is left alone.
const nbsp = ' ';
function frn(s) {
  if (s.includes(',') && !/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(s)) return s;
  s = s.replace(/,/g, '');
  let [a, b] = s.split('.');
  if (a.length >= 4) a = a.replace(/(?<=\d)(?=(\d{3})+$)/g, nbsp);
  return b === undefined ? a : a + ',' + b;
}
export function frNumbers(t) {
  t = t.replace(/\$(\d[\d,]*(?:\.\d+)?)\s?(B|M|k)\b/g, (_, n, u) => frn(n) + nbsp + { B: 'Md$', M: 'M$', k: 'k$' }[u]);
  t = t.replace(/\$(\d[\d,]*(?:\.\d+)?)/g, (_, n) => frn(n) + nbsp + '$');
  t = t.replace(/(\d[\d,]*(?:\.\d+)?)[  ]?%/g, (_, n) => frn(n) + nbsp + '%');
  t = t.replace(/~(?=[\d$])/g, '≈' + nbsp);
  return t;
}
export function localizeNumbers(root, skip) {
  (function w(n, off) {
    if (!n || (skip && skip.has(n))) return;
    if (n.nodeName === '#text') { if (!/[A-Za-z]{2,}/.test(n.value)) n.value = frNumbers(n.value); return; }
    if (['script', 'style', 'head', 'noscript', 'template'].includes(n.nodeName)) return;
    (n.childNodes || []).forEach((c) => w(c));
  })(root);
}
