import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://narrows.io',
  output: 'static',
  integrations: [],
  // analysis-index was a stale duplicate of /analysis; keep old links and search results working
  redirects: {
    '/analysis-index': '/analysis',
  },
});
