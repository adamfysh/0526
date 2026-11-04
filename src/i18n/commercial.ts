// Copy shown only when COMMERCIAL is true (src/config.ts), English and French.
// Public copy: no em-dashes, no contractions. Add new commercial strings here, not inline in pages.
const nb = ' ';
export const cm = {
  en: {
    login: 'Client login',
    demo: 'Request demo',
    demoLong: 'Request a demo',
    demoSubject: 'Demo request: Narrows',
    company: 'Company',
    tagline: 'Trade risk intelligence.<br>When a chokepoint closes,<br>who is exposed and by how much?',
    rights: '© 2026 Narrows. All rights reserved.',
    positioning: 'A commercial operation that proves its value in public, through research and analysis.',
  },
  fr: {
    login: 'Espace client',
    demo: 'Demander une démo',
    demoLong: 'Demander une démo',
    demoSubject: 'Demande de démo : Narrows',
    company: 'Société',
    tagline: `Intelligence du risque commercial.<br>Quand un point de passage se ferme,<br>qui est exposé, et de combien${nb}?`,
    rights: '© 2026 Narrows. Tous droits réservés.',
    positioning: 'Une activité commerciale qui prouve sa valeur en public, par la recherche et l’analyse.',
  },
} as const;
