// CAPE explainer page copy, English and French. Figures in the TIDE strip come from
// public/cape_tide_feed.json at build time ({base}, {peak}, {peakMonth}, {horizon}, {pml}, {maxCascade}, {maxCascadeName}).
// Public copy house style: no em-dashes, no contractions.
const en = {
  title: 'CAPE: Corridor Accumulation and Portfolio Exposure | Narrows',
  description:
    'CAPE is a demonstration of how a portfolio’s exposure to corridor disruption can be computed. Built on the Narrows CDM and the TIDE accumulation model.',
  demo: { b: 'Demonstration.', t: 'This version runs against a sample fleet with fixed, illustrative positions. It is shown to explain the method and is not available for use on any real portfolio.' },
  hero: {
    kicker: 'Narrows analytics',
    titleHtml: 'Corridor Accumulation<br>and <em>Portfolio Exposure</em>',
    lead: 'CAPE is a demonstration of how exposure can be computed for a vessel portfolio on a single bad day. Select a corridor event to see aggregate exposure by vessel class, corridor, and scenario severity on an illustrative fleet. Built on the Narrows CDM and the TIDE accumulation model.',
    open: 'Open CAPE demo',
  },
  what: {
    h: 'Two questions. Two different answers.',
    p: [
      'The Narrows simulator answers the structural question: what share of Japan’s crude imports depends on Hormuz each year? That is a dependency figure. It tells you what is exposed.',
      'CAPE answers the accumulation question: if Hormuz restricts today, how much cargo value is simultaneously in transit through the corridor right now, at the worst point in the seasonal calendar, including the approach window where vessels cannot economically divert? That is an accumulation figure. It tells you what is at risk.',
      'These are different numbers for different purposes. Both are in CAPE.',
    ],
    rows: [
      ['CDM', 'Annual structural dependency', 'What percentage of a country’s imports transit a given corridor each year. The strategic exposure view.'],
      ['CAPE', 'Portfolio corridor exposure', 'A vessel book’s aggregate value at risk under a named corridor scenario. The portfolio view.'],
      ['TIDE', 'Market accumulation at risk', 'Total cargo in transit through a chokepoint at seasonal peak, including cascade effects on diversion routes. The market-wide view.'],
    ],
  },
  tide: {
    sub: 'Strait of Hormuz: accumulation at risk',
    cells: [
      ['Baseline (average day)', 'Annual flow divided by 365, weighted by transit duration'],
      ['Seasonal peak', '{peakMonth}: worst calendar month in the current model'],
      ['Event horizon', 'Seasonal peak plus a 3-day approach window: the at-risk figure'],
      ['War risk PML', 'Event horizon at 15% severity, weighted attachment rate'],
    ],
    cascadeHtml: '<strong>Cascade effect:</strong> when a corridor closes, cargo piles up on its diversion route. In the current model the largest effect is on {maxCascadeName}, where accumulation reaches <strong>{maxCascade}×</strong> its seasonal peak. Exposure on one route is correlated with events on another. TIDE models cascade ratios for all corridors.',
    asof: 'Figures from the TIDE feed generated on {generated}.',
  },
  how: {
    h: 'How CAPE works',
    steps: [
      ['Step 01 · Illustrative fleet', 'A sample fleet', 'Twelve representative vessels across all major corridors are pre-loaded: VLCCs on Hormuz, LNG carriers on Qatar routes, Neopanamax containers through Panama, Capesize bulk through Malacca. Each vessel carries a Joint War Committee listing status, a CII rating, a diversion cost, and a cargo value. Run any scenario immediately.'],
      ['Step 02 · Method', 'Exposure mapping', 'The model maps each vessel to its corridor exposure and computes aggregate value at risk, diversion cost, and listed-area status across the positions in the sample fleet.'],
      ['Step 03 · Method', 'TIDE accumulation output', 'The TIDE accumulation model produces an event horizon by corridor, a seasonal peak calendar, cascade ratios for diversion routes, a vessel-count breakdown, and war risk PML by scenario severity.'],
    ],
  },
  cta: { h: 'Try the demonstration', p: 'The demonstration runs on an illustrative fleet. It is a research tool shown to explain the method, not a service.' },
  corridors: { hormuz: 'Hormuz', bab_el_mandeb: 'Bab el-Mandeb', malacca: 'Malacca', panama: 'Panama', suez: 'Suez', lombok: 'Lombok', bosphorus: 'the Bosphorus', danish_straits: 'the Danish Straits' } as Record<string, string>,
  months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  unit: 'B',
};

const fr: typeof en = {
  title: 'CAPE : accumulation par corridor et exposition d’un portefeuille | Narrows',
  description:
    'CAPE est une démonstration de la façon dont l’exposition d’un portefeuille aux perturbations de corridor peut être calculée. Fondé sur le CDM de Narrows et le modèle d’accumulation TIDE.',
  demo: { b: 'Démonstration.', t: 'Cette version s’exécute sur une flotte type, avec des positions fixes et illustratives. Elle sert à expliquer la méthode et n’est pas utilisable sur un portefeuille réel.' },
  hero: {
    kicker: 'Analyses Narrows',
    titleHtml: 'Accumulation par corridor<br>et <em>exposition d’un portefeuille</em>',
    lead: 'CAPE est une démonstration de la façon dont l’exposition d’un portefeuille de navires peut être calculée un jour de crise. Choisissez un événement de corridor pour voir l’exposition agrégée par classe de navire, par corridor et par gravité du scénario, sur une flotte illustrative. Fondé sur le CDM de Narrows et le modèle d’accumulation TIDE.',
    open: 'Ouvrir la démonstration CAPE',
  },
  what: {
    h: 'Deux questions. Deux réponses différentes.',
    p: [
      'Le simulateur Narrows répond à la question structurelle : quelle part des importations de pétrole brut du Japon dépend chaque année d’Ormuz ? C’est un chiffre de dépendance. Il indique ce qui est exposé.',
      'CAPE répond à la question de l’accumulation : si Ormuz se ferme aujourd’hui, quelle valeur de cargaison se trouve simultanément en transit dans le corridor, au pire moment du calendrier saisonnier, y compris dans la fenêtre d’approche où les navires ne peuvent pas se dérouter à un coût raisonnable ? C’est un chiffre d’accumulation. Il indique ce qui est en jeu.',
      'Ce sont des chiffres différents, pour des usages différents. Les deux figurent dans CAPE.',
    ],
    rows: [
      ['CDM', 'Dépendance structurelle annuelle', 'La part des importations d’un pays qui transite chaque année par un corridor donné. La vue d’exposition stratégique.'],
      ['CAPE', 'Exposition d’un portefeuille par corridor', 'La valeur à risque agrégée d’un portefeuille de navires dans un scénario de corridor nommé. La vue portefeuille.'],
      ['TIDE', 'Accumulation de marché à risque', 'Total des cargaisons en transit par un point de passage au pic saisonnier, y compris les effets de cascade sur les routes de déroutement. La vue de l’ensemble du marché.'],
    ],
  },
  tide: {
    sub: 'Détroit d’Ormuz : accumulation à risque',
    cells: [
      ['Référence (jour moyen)', 'Flux annuel divisé par 365, pondéré par la durée de transit'],
      ['Pic saisonnier', '{peakMonth} : mois le plus défavorable du modèle actuel'],
      ['Horizon d’événement', 'Pic saisonnier plus une fenêtre d’approche de 3 jours : le chiffre à risque'],
      ['PML risque de guerre', 'Horizon d’événement à 15 % de gravité, taux de rattachement pondéré'],
    ],
    cascadeHtml: '<strong>Effet de cascade :</strong> lorsqu’un corridor se ferme, les cargaisons s’accumulent sur sa route de déroutement. Dans le modèle actuel, l’effet le plus fort concerne {maxCascadeName}, où l’accumulation atteint <strong>{maxCascade} fois</strong> son pic saisonnier. L’exposition sur une route est corrélée aux événements sur une autre. TIDE modélise les ratios de cascade pour tous les corridors.',
    asof: 'Chiffres issus du flux TIDE généré le {generated}.',
  },
  how: {
    h: 'Comment fonctionne CAPE',
    steps: [
      ['Étape 01 · Flotte illustrative', 'Une flotte type', 'Douze navires représentatifs sur tous les grands corridors sont préchargés : VLCC à Ormuz, méthaniers sur les routes du Qatar, porte-conteneurs Neopanamax à Panama, vraquiers Capesize à Malacca. Chaque navire porte un statut de zone listée par le Joint War Committee, une note CII, un coût de déroutement et une valeur de cargaison. Lancez n’importe quel scénario immédiatement.'],
      ['Étape 02 · Méthode', 'Cartographie de l’exposition', 'Le modèle rattache chaque navire à son exposition par corridor et calcule la valeur à risque agrégée, le coût de déroutement et le statut de zone listée pour les positions de la flotte type.'],
      ['Étape 03 · Méthode', 'Résultats d’accumulation TIDE', 'Le modèle d’accumulation TIDE produit un horizon d’événement par corridor, un calendrier des pics saisonniers, des ratios de cascade pour les routes de déroutement, une ventilation par nombre de navires et le PML risque de guerre par gravité de scénario.'],
    ],
  },
  cta: { h: 'Essayer la démonstration', p: 'La démonstration s’exécute sur une flotte illustrative. C’est un outil de recherche destiné à expliquer la méthode, pas un service.' },
  corridors: { hormuz: 'Ormuz', bab_el_mandeb: 'Bab el-Mandeb', malacca: 'Malacca', panama: 'Panama', suez: 'Suez', lombok: 'Lombok', bosphorus: 'le Bosphore', danish_straits: 'les détroits danois' },
  months: ['janv.','févr.','mars','avr.','mai','juin','juil.','août','sept.','oct.','nov.','déc.'],
  unit: ' Md$',
};

export const cape = { en, fr };
