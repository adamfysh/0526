// Shared interface strings (nav, footer). Page copy lives beside each page in
// src/i18n/pages/. Public copy house style: no em-dashes, no contractions.
import type { Lang } from './index';

export const ui = {
  en: {
    nav: {
      about: 'About',
      pri: 'Port Risk Index',
      cape: 'CAPE',
      cascade: 'CASCADE',
      analysis: 'Analysis',
      menu: 'Open navigation menu',
      langLabel: 'Language',
    },
    footer: {
      tagline: 'Maritime trade risk research.<br>When a chokepoint closes,<br>who is exposed and by how much?',
      colAbout: 'About',
      model: 'The model',
      methodology: 'Methodology',
      analysis: 'Analysis',
      policy: 'Data verification policy',
      changelog: 'Data changelog',
      colContact: 'Contact',
      press: 'Press and corrections',
      bottom: 'Independent maritime risk research. © 2026',
    },
    head: {
      description: 'Narrows models bilateral seaborne trade dependency at the chokepoint level. When a chokepoint closes, who is exposed and by how much?',
      locale: 'en_GB',
    },
  },
  fr: {
    nav: {
      about: 'À propos',
      pri: 'Indice de risque portuaire',
      cape: 'CAPE',
      cascade: 'CASCADE',
      analysis: 'Analyses',
      menu: 'Ouvrir le menu de navigation',
      langLabel: 'Langue',
    },
    footer: {
      tagline: 'Recherche sur le risque commercial maritime.<br>Lorsqu’un point de passage obligé se ferme,<br>qui est exposé, et dans quelle mesure ?',
      colAbout: 'À propos',
      model: 'Le modèle',
      methodology: 'Méthodologie',
      analysis: 'Analyses',
      policy: 'Politique de vérification des données',
      changelog: 'Journal des corrections de données',
      colContact: 'Contact',
      press: 'Presse et corrections',
      bottom: 'Recherche indépendante sur le risque maritime. © 2026',
    },
    head: {
      description: 'Narrows modélise la dépendance bilatérale du commerce maritime à l’égard des points de passage obligés. Lorsqu’un point de passage se ferme, qui est exposé, et dans quelle mesure ?',
      locale: 'fr_FR',
    },
  },
} satisfies Record<Lang, unknown>;
