// Port Risk Index page copy, English and French.
// {n} ports, {max}, {min}, {mean} are filled from the data at build time.
// Public copy house style: no em-dashes, no contractions.
const nb = ' ';

const en = {
  title: 'Port Risk Index | Narrows',
  description:
    '{n} ports scored across four dimensions of risk: accessibility, reliability, concentration, and stability. The Narrows Port Risk Index.',
  hero: {
    kicker: 'Port Risk Index',
    titleHtml: '{n} ports scored.<br><em>Four dimensions of risk.</em>',
    lead: 'The Narrows PRI scores every major port in the World Port Index across four dimensions: physical accessibility, operational reliability, trade concentration, and geopolitical stability. Each scored from independent source data, combined via geometric mean. Lower score is lower risk.',
  },
  stats: [
    { val: '{n}', lbl: 'Ports indexed · World Port Index universe' },
    { val: '4', lbl: 'Dimensions · Physical, operational, concentration, stability' },
    { val: '14', lbl: 'Indicators · 4+3+4+3 across four dimensions' },
    { val: '{countries}', lbl: 'Countries · WPI + LPI + WGI base data' },
  ],
  download: '↓ Download CSV',
  methLink: 'Methodology →',
  mapTitle: 'Global Port Risk Index map',
  search: { placeholder: 'Search by port name or country…', clear: 'Clear' },
  detail: { badge: 'Narrows Port Risk Index', dimension: 'Dimension' },
  dims: ['Accessibility', 'Reliability', 'Concentration', 'Stability'],
  hist: {
    title: 'Global PRI distribution · {n} ports',
    lowest: 'lowest',
    highest: 'highest',
    mean: 'mean',
  },
  table: { rank: 'Rank', port: 'Port', country: 'Country', pri: 'PRI' },
  method: {
    eyebrow: 'Methodology',
    title: 'Geometric mean composite scoring',
    p1: 'Each dimension is scored 0–10 from independent source data, then combined via <strong>geometric mean</strong> (floor 0.1 per component) to produce the composite PRI. The geometric mean penalises extreme scores in any single dimension. A port that scores very poorly on stability cannot be rescued by good physical access.',
    p2: 'The highest composite score in the current index is <strong>{max}</strong>, not 10. Most ports have reasonable physical infrastructure, which structurally moderates D1. Score distribution is right-skewed; the vast majority of ports fall below 2.0.',
    link: 'Full methodology documentation',
    legend: [
      ['D1: Accessibility', 'Vessel class coverage (from controlling depth), terminal diversity, cyclone exposure, seismic hazard. Source: World Port Index, IBTrACS, GSHAP.'],
      ['D2: Reliability', 'Dwell time, labour regime stability, port state control record. Source: World Bank CPPI/PPPI, ILO, Paris/Tokyo MOU.'],
      ['D3: Concentration', 'Catchment share, hinterland count, Herfindahl-Hirschman index, alternative port distance. Source: UN Comtrade, WPI.'],
      ['D4: Stability', 'WGI governance score (PS and GE merged), sanctions exposure, active territorial dispute. Source: World Bank WGI, OFAC, ICJ.'],
    ],
  },
  js: {
    locale: 'en-US',
    dec: '.',
    sp: '',
    sepRank: ' · ',
    rankLine: '{country} · Rank #{rank} of {n} · rank 1 = highest risk · Data tier {tier}',
    mean: 'mean',
    ports: 'ports',
    none: 'No ports found for "{q}"',
    rankShort: 'Rank #',
    l: {
      depth: 'Controlling depth', vessels: 'Vessel class coverage', terminals: 'Terminal types', cyclone: 'Cyclone passes', pga: 'Peak ground accel.',
      lpi: 'LPI score (ref)', dwell: 'Dwell time', labour: 'Labour regime',
      catch: 'Catchment share', hhi: 'Herfindahl index', alt: 'Alt. port distance',
      wgi: 'WGI governance (merged)', wgips: 'WGI pol. stability (src)', wgige: 'WGI gov. effectiveness (src)',
      sanc: 'Sanctions level', disp: 'Dispute level',
    },
    v: {
      stable: 'stable', volatile: 'volatile', uncertain: 'uncertain',
      none: 'none', comprehensive: 'comprehensive', sdn_adjacent: 'SDN-adjacent', sectoral: 'sectoral',
      active_military: 'active military', active_diplomatic: 'active diplomatic', historical: 'historical',
    } as Record<string, string>,
  },
};

const fr: typeof en = {
  title: 'Indice de risque portuaire | Narrows',
  description:
    `{n} ports notés selon quatre dimensions de risque${nb}: accessibilité, fiabilité, concentration et stabilité. L’indice de risque portuaire (PRI) de Narrows.`,
  hero: {
    kicker: 'Indice de risque portuaire',
    titleHtml: '{n} ports notés.<br><em>Quatre dimensions de risque.</em>',
    lead: 'Le PRI de Narrows note chaque grand port du World Port Index selon quatre dimensions : accessibilité physique, fiabilité opérationnelle, concentration des échanges et stabilité géopolitique. Chacune est notée à partir de données sources indépendantes, puis combinée par moyenne géométrique. Plus le score est bas, plus le risque est faible.'.replace(' :', `${nb}:`),
  },
  stats: [
    { val: '{n}', lbl: `Ports indexés · univers du World Port Index` },
    { val: '4', lbl: 'Dimensions · physique, opérationnelle, concentration, stabilité' },
    { val: '14', lbl: 'Indicateurs · 4+3+4+3 sur quatre dimensions' },
    { val: '{countries}', lbl: 'Pays · données de base WPI + LPI + WGI' },
  ],
  download: '↓ Télécharger le CSV',
  methLink: 'Méthodologie →',
  mapTitle: 'Carte mondiale de l’indice de risque portuaire',
  search: { placeholder: 'Rechercher par nom de port ou pays…', clear: 'Effacer' },
  detail: { badge: 'Indice de risque portuaire Narrows', dimension: 'Dimension' },
  dims: ['Accessibilité', 'Fiabilité', 'Concentration', 'Stabilité'],
  hist: {
    title: 'Répartition mondiale du PRI · {n} ports',
    lowest: 'le plus bas',
    highest: 'le plus haut',
    mean: 'moyenne',
  },
  table: { rank: 'Rang', port: 'Port', country: 'Pays', pri: 'PRI' },
  method: {
    eyebrow: 'Méthodologie',
    title: 'Score composite par moyenne géométrique',
    p1: 'Chaque dimension est notée de 0 à 10 à partir de données sources indépendantes, puis combinée par <strong>moyenne géométrique</strong> (plancher de 0,1 par composante) pour produire le PRI composite. La moyenne géométrique pénalise les scores extrêmes dans une seule dimension. Un port très mal noté en stabilité ne peut pas être sauvé par un bon accès physique.',
    p2: 'Le score composite le plus élevé de l’indice actuel est de <strong>{max}</strong>, et non de 10. La plupart des ports disposent d’infrastructures physiques correctes, ce qui modère structurellement D1. La distribution des scores est asymétrique à droite : la grande majorité des ports se situent sous 2,0.'.replace(' :', `${nb}:`),
    link: 'Documentation méthodologique complète',
    legend: [
      ['D1 : Accessibilité', 'Classes de navires admises (selon la profondeur limitante), diversité des terminaux, exposition aux cyclones, aléa sismique. Sources : World Port Index, IBTrACS, GSHAP.'],
      ['D2 : Fiabilité', 'Temps de séjour, stabilité du régime du travail, bilan du contrôle par l’État du port. Sources : CPPI/PPPI de la Banque mondiale, OIT, MoU de Paris et de Tokyo.'],
      ['D3 : Concentration', 'Part de l’aire d’attraction, nombre d’arrière-pays, indice de Herfindahl-Hirschman, distance au port alternatif. Sources : UN Comtrade, WPI.'],
      ['D4 : Stabilité', 'Score de gouvernance WGI (stabilité politique et efficacité du gouvernement fusionnées), exposition aux sanctions, différend territorial actif. Sources : WGI de la Banque mondiale, OFAC, CIJ.'],
    ].map(([a, b]) => [a.replace(' :', `${nb}:`), b.replace(' :', `${nb}:`)]),
  },
  js: {
    locale: 'fr-FR',
    dec: ',',
    sp: nb,
    sepRank: ' · ',
    rankLine: `{country} · Rang n°${nb}{rank} sur {n} · rang 1 = risque le plus élevé · Niveau de données {tier}`,
    mean: 'moyenne',
    ports: 'ports',
    none: `Aucun port trouvé pour «${nb}{q}${nb}»`,
    rankShort: `Rang n°${nb}`,
    l: {
      depth: 'Profondeur limitante', vessels: 'Classes de navires admises', terminals: 'Types de terminaux', cyclone: 'Passages de cyclones', pga: 'Accélération max. du sol',
      lpi: 'Score LPI (réf.)', dwell: 'Temps de séjour', labour: 'Régime du travail',
      catch: 'Part de l’aire d’attraction', hhi: 'Indice de Herfindahl', alt: 'Distance au port alternatif',
      wgi: 'Gouvernance WGI (fusionnée)', wgips: 'Stabilité politique WGI (source)', wgige: 'Efficacité du gouv. WGI (source)',
      sanc: 'Niveau de sanctions', disp: 'Niveau de différend',
    },
    v: {
      stable: 'stable', volatile: 'volatil', uncertain: 'incertain',
      none: 'aucun', comprehensive: 'globales', sdn_adjacent: 'proximité de la liste SDN', sectoral: 'sectorielles',
      active_military: 'militaire actif', active_diplomatic: 'diplomatique actif', historical: 'historique',
    } as Record<string, string>,
  },
};

export const pri = { en, fr };
