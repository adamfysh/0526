// Language helpers. English is the default locale (no URL prefix);
// French lives under /fr/. A page is "translated" once its path is listed in
// TRANSLATED_PATHS. Links to untranslated pages stay on the English version
// and the language switcher is hidden on them, so nothing 404s.
export type Lang = 'en' | 'fr';
export const LANGS: Lang[] = ['en', 'fr'];

export const TRANSLATED_PATHS = new Set<string>([
  '/',
  '/about',
  '/methodology',
  '/data-verification-policy',
  '/data-changelog',
  '/pri',
  '/pri-methodology', '/cape', '/lng-compare', '/analysis', '/analysis/hormuz-dry-cargo', '/viz/qatar-route-tree', '/viz/gulf-lng-sankey', '/uk-lng-sankey', '/uk-crude-sankey', '/india-crude-sankey', '/china-crude-sankey', '/cascade-plus', '/cascade', '/analysis/panama', '/analysis/yanbu-long-way-round', '/analysis/panama-long-way-around', '/analysis/model-validation-2024', '/analysis/malacca', '/analysis/malacca-zombie', '/analysis/kra-land-bridge', '/analysis/hormuz', '/analysis/hormuz-who-pays', '/analysis/hormuz-seven-months', '/analysis/hormuz-rebalancing', '/analysis/hormuz-pocketbook',
]);

// Used by every [...lang] page: generates / and /fr/ variants.
export function langPaths() {
  return [{ params: { lang: undefined } }, { params: { lang: 'fr' } }];
}

export function getLang(param?: string): Lang {
  return param === 'fr' ? 'fr' : 'en';
}

function normalize(p: string): string {
  const x = p.replace(/\/+$/, '');
  return x === '' ? '/' : x;
}

// '/fr/about/' -> '/about'
export function basePath(pathname: string): string {
  const n = normalize(pathname);
  if (n === '/fr') return '/';
  if (n.startsWith('/fr/')) return n.slice(3);
  return n;
}

// Localised internal link. path may carry a #hash or ?query.
export function lp(lang: Lang, path: string): string {
  if (lang === 'en') return path;
  const m = path.match(/^([^#?]*)(.*)$/)!;
  const base = normalize(m[1] || '/');
  if (!TRANSLATED_PATHS.has(base)) return path;
  return (base === '/' ? '/fr/' : '/fr' + base) + m[2];
}

// Path of the same page in the other language, or null if it does not exist.
export function altPath(lang: Lang, pathname: string): string | null {
  const base = basePath(pathname);
  if (lang === 'fr') return base;
  return TRANSLATED_PATHS.has(base) ? (base === '/' ? '/fr/' : '/fr' + base) : null;
}

// Rewrite internal href="/..." links inside an HTML string so French pages
// link to French pages wherever a translation exists.
export function localizeHtml(lang: Lang, html: string): string {
  if (lang === 'en') return html;
  return html.replace(/href="(\/[^"]*)"/g, (_m, path) => `href="${lp(lang, path)}"`);
}
