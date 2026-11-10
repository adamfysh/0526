// Methodology page copy, English and French.
// Figures come from src/data/methodology-meta.json, generated from the CDM tool
// outputs by scripts/export-methodology-meta.mjs (run by npm run build).
// Do not type figures into this file.
// Public copy house style: no em-dashes, no contractions.
import meta from '../../data/methodology-meta.json';

const nb = ' ';
const sm = meta.sample;
const n1 = (x: number, fr = false) => (fr ? x.toFixed(1).replace('.', ',') : x.toFixed(1));
const thou = (x: number, fr = false) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, fr ? nb : ',');
const tier = (t: number) => meta.tiers.find((x) => x.tier === t)!.valuePct;
const vint = meta.vintages as Record<string, number>;
const top = sm.top.slice(0, 4);
const nameEn = (c: { name: string; iso: string }) => ({ KOR: 'South Korea' } as Record<string, string>)[c.iso] || c.name;
const nameFr = (c: { iso: string }) =>
  ({ CHN: 'Chine', JPN: 'Japon', KOR: 'Corée du Sud', THA: 'Thaïlande', USA: 'États-Unis' } as Record<string, string>)[c.iso];

const en = {
  title: 'Narrows | Methodology',
  description:
    'How the Narrows trade risk model works. Written for readers who want to understand what is under the hood.',
  descriptionCommercial: 'How the Narrows trade risk model works. Written for risk professionals who want to understand what is under the hood before a conversation.',
  hero: {
    eyebrow: 'Methodology',
    titleHtml: 'How bilateral trade data becomes<br>\n        <em>dollar-denominated exposure.</em>',
    sub: "Written for risk professionals evaluating fit before a conversation. Covers the five-stage data pipeline, the three structured outputs, validation approach, and stated limitations, at the level of detail required to assess the model's credibility without disclosing proprietary routing logic.",
    cov: [
      { label: 'Chokepoints modelled', value: String(meta.chokepoints), unit: 'chokepoints' },
      { label: 'Importing nations', value: String(meta.importers), unit: 'nations' },
      { label: 'Commodity codes', value: String(meta.commodities), unit: 'codes' },
      { label: 'Dependency rows', value: thou(meta.rows), unit: 'rows' },
      { label: 'Source data vintages', value: '2022 to 2024', unit: 'UN Comtrade' },
      { label: 'Model version', value: 'v3', unit: 'Oct 2026' },
    ],
  },
  what: {
    eyebrow: 'What the model is',
    title: 'A bilateral dependency model. Purpose-built for commercial risk analysis.',
    p1: 'The Narrows model quantifies the financial exposure of importing countries to disruptions in specific trade corridors. It answers a different question from AIS-based monitoring tools, which measure what is happening to throughput. Narrows measures what a disruption costs: in dollars, by country, by commodity, under a scenario you define.',
    p2: "The core output of the model is a dependency score at the (importer, corridor, commodity) level: the share of that importer's total seaborne supply of a given commodity that transits a given corridor, derived from UN Comtrade bilateral trade data. Applied against annual trade values and a user-defined disruption scenario, these scores produce three structured outputs: value at risk, rerouting penalty, and fleet at risk. Every parameter is substitutable with your own assumptions.",
    p3: `Data quality is explicit and disclosed on every row. The model uses three tiers: Reported (a direct bilateral record), Corroborated (exporter-side statistics with the routing independently checked), and Estimated (a national total allocated across corridors by routing logic). By value, ${n1(tier(1))}% of the current matrix is Reported, ${n1(tier(2))}% is Corroborated, and ${n1(tier(3))}% is Estimated, across ${thou(meta.rows)} rows. Nearly half of the value therefore rests on allocation rather than a matched bilateral record, and the tier travels with every number the model produces.`,
    quote: 'The model produces dependency scores and exposure estimates. It is an input to your analysis, not a replacement for it.',
  },
  pipeline: {
    eyebrow: 'How it works',
    title: 'Five stages. Each produces a discrete, auditable output.',
    intro: `The model runs in five sequential stages. The input is bilateral trade flow data: reported volumes between specific country pairs across ${meta.commodities} commodity codes, drawn from authenticated UN Comtrade pulls for 2022 and 2024, with primary-source overlays from Eurostat, the UK energy statistics, and the US EIA where they exist. The newer figure replaces the older one for the same importer, exporter, and commodity. The transformation at each stage is where the analytical value sits: not in the underlying data, which is publicly available, but in how flows are matched to maritime corridors, scored for dependency, and converted into scenario-driven outputs.`,
    steps: [
      ['Flow ingestion', `Bilateral trade flow data for ${meta.commodities} commodity codes is ingested, cleaned, and standardised across reporter countries and reference years. P-prefix and non-standard country codes are resolved; aggregate-only reporters are flagged.`],
      ['Corridor assignment', `Each bilateral flow is assigned to its most probable maritime corridor, across ${meta.chokepoints} chokepoints, using a proprietary routing model. Unmatched or ambiguous flows are flagged and excluded.`],
      ['Dependency scoring', `Country-corridor-commodity dependency scores are calculated for ${meta.importers} importing nations. Each score states the share of a country's seaborne import of a given commodity that transits a given corridor. Every row carries its data tier, source, and data year.`],
      ['Scenario simulation', 'A user-defined disruption (corridor, severity, and duration) is applied to the dependency matrix. Exposed trade value is calculated against the relevant time window.'],
      ['Output generation', 'Three structured outputs: value at risk by country and commodity, rerouting penalty by vessel class, and fleet exposure estimate for the disruption window.'],
    ],
  },
  outputs: {
    eyebrow: 'What it produces',
    title: 'Three outputs. Each answers a specific professional question.',
    intro: 'Every output connects to a downstream use case. The model is designed to produce numbers that slot into existing analytical workflows: accumulation models, trading desk pricing, and credit stress tests. Not numbers that require translation before they can be used.',
    label: 'Output',
    cards: [
      {
        title: 'Value at risk',
        desc: 'Dollar-denominated trade exposure by country and commodity under a user-defined disruption. Severity (0 to 100%) and duration are variable. Capacity sensitivity is adjustable per corridor.',
        egTitle: 'Malacca 100% / 14 days: crude petroleum',
        egBody: top.slice(0, 3).map((c) => `${nameEn(c)}: $${n1(c.valueB)}B`).join(' · '),
      },
      {
        title: 'Rerouting penalty',
        desc: 'Per-voyage cost overrun by vessel class: detour days, bunker uplift, charter rate differential, and inventory carrying cost. Tagged by audience: underwriter, lender, cargo owner. All rate assumptions substitutable.',
        egTitle: 'Suez closure: VLCC via Cape',
        egBody: `+${meta.reroute.days} days · $${n1(meta.reroute.overrunM)}M voyage overrun · $${meta.reroute.carryK}k carrying cost per vessel`,
      },
      {
        title: 'Fleet at risk',
        desc: 'Estimated vessel count in-window at event onset, cargo value on water, and portfolio-level rerouting loss across the fleet. The accumulation number for P&I and cargo underwriters.',
        egTitle: `Suez 100% / ${meta.fleet.days} days`,
        egBody: `${meta.fleet.vlcc} VLCCs in-window (${meta.fleet.vessels} vessels across six classes) · $${n1(meta.fleet.cargoB)}B cargo at risk · $${Math.round(meta.fleet.overrunM)}M portfolio overrun`,
      },
    ],
  },
  sample: {
    eyebrow: 'Sample output',
    title: 'Strait of Malacca: 100% closure, 14 days.',
    intro: 'The following is a model output, not a hypothetical illustration. Parameters shown are the defaults for this scenario.',
    introTail: 'All can be changed in the demonstration tool.',
    params: [
      ['Corridor', 'Strait of Malacca'],
      ['Severity', '100%'],
      ['Duration', `${sm.days} days`],
      ['Capacity sensitivity', String(sm.sensitivity)],
      ['Base data', '2022 to 2024'],
    ],
    results: [
      { label: 'Total trade value at risk', value: `$${n1(sm.totalB)}B`, unit: 'USD', note: `All matched commodity corridors transiting Malacca, ${sm.days}d at 100% closure, capacity sensitivity applied. Model v3, 2022 to 2024 data.` },
      { label: 'Countries with material exposure', value: String(sm.countriesAbove5), unit: 'nations', note: `Above a 5% import dependency threshold, out of ${sm.countriesTotal} importers with a Malacca routing. Includes China, Japan, South Korea, Thailand, Vietnam, the Philippines` },
      { label: 'Rerouting delay by vessel class', value: `+${sm.detourMin} to ${sm.detourMax}`, unit: 'days per voyage', note: 'Partial alternative only. Depth-limited for laden VLCCs and Capesizes' },
      { label: 'Share on Reported data', value: `${Math.round(sm.tierPct['1'])}%`, unit: 'of exposure', note: `The remainder is Corroborated (${Math.round(sm.tierPct['2'])}%) and Estimated (${Math.round(sm.tierPct['3'])}%) for this scenario. Tier is disclosed per row.` },
    ],
    tableTitle: 'Country-level exposure: crude petroleum',
    tableNote: 'Dependency percentage is a fixed output of the dependency matrix. Duration and severity are the variables you control in the simulator.',
    viaLabel: 'via Malacca',
    countries: top.map((c) => ({ name: nameEn(c), dep: c.dep, val: `$${n1(c.valueB)}B` })),
    countryNote: `Values are ${sm.days}-day simulation outputs with the capacity sensitivity applied, from the 2022 to 2024 data basis. Dependency percentages are model-derived from bilateral trade flow analysis.`,
  },
  validation: {
    eyebrow: 'Validation',
    title: 'Corridor assignments are cross-checked against three independent aggregated sources.',
    intro: "The model's corridor assignment logic is validated by checking whether predicted chokepoint shares are directionally consistent with observed vessel traffic distributions from independent sources. Validation is described as directional rather than exact: trade data and vessel traffic data do not map to the same time period or granularity.",
    sourceLabel: 'Source',
    sources: [
      ['Port call and transit counts', 'Weekly vessel call counts at major ports and chokepoint transit volumes derived from aggregated AIS data. Used to validate total traffic distribution across corridors.'],
      ['Energy corridor flows', 'Weekly and monthly aggregated tanker flow data from official energy statistics, covering Hormuz, Bab el-Mandeb, Suez, and Malacca. Primary validation for energy commodity assignments.'],
      ['Annual shipping statistics', 'Annual statistics on container flows and bulk cargo through major corridors from international shipping bodies. Used for annual cross-check of overall corridor share estimates.'],
    ],
  },
  limits: {
    eyebrow: 'Scope and limitations',
    title: 'What the model is, and is not.',
    intro: 'These limitations are stated because the model is intended to support serious risk analysis. A professional who understands where the model is uncertain is better positioned to use it appropriately, and to substitute their own assumptions where they disagree with ours.',
    items: [
      '<strong>Exposure estimates, not valuations.</strong> The model produces dollar-denominated exposure estimates and dependency scores. It is not an insurance valuation tool and does not produce premium recommendations, loss estimates, or probability-of-disruption assessments. Those remain with the analyst.',
      `<strong>Annual base data, not live flows.</strong> Trade flow data reflects annual bilateral patterns. ${thou(vint['2024'])} of ${thou(meta.rows)} rows use 2024 figures and ${thou(vint['2022'])} still use 2022 figures, where no newer bilateral figure exists for the same importer, exporter, and commodity. The model measures structural dependency, not current cargo positions. Voyage count estimates are model-derived decompositions, not live vessel tracking.`,
      '<strong>No seasonal adjustment.</strong> Duration-based calculations use linear scaling rather than seasonal adjustment. The model does not capture monthly variation in commodity flows or periodic vessel traffic patterns.',
      '<strong>Country-level, not vessel-level.</strong> The model does not track individual vessels, flag states, or policy-specific cargo. Portfolio accumulation analysis requires mapping individual policies to corridor assignments, a data integration step that sits outside the model.',
      '<strong>Capacity sensitivity scores are calibrated parameters.</strong> The 0 to 1 sensitivity scores applied per corridor are informed judgements calibrated against historical disruption events. They are defensible and adjustable, not statistical estimates with confidence intervals. Commercial clients may substitute their own scores.',
      `<strong>Estimated tier carries a large share of value.</strong> ${n1(tier(3))}% of matrix value is Estimated, meaning a national total allocated across corridors by routing logic rather than a matched bilateral record. Treat those rows as directional and use the per-row tier to weight them.`,
      `<strong>Coverage gaps at thin bilateral flows.</strong> The published matrix covers ${meta.importers} importing nations. Importers and commodity-corridor pairs with limited bilateral data coverage are excluded, so smaller flows by value are disproportionately underrepresented.`,
      '<strong>Known attribution caveat for China crude.</strong> Documented transshipment relabels some sanctioned crude as Malaysian, Omani, or Emirati origin before it reaches trade statistics, which can shift the apparent transit chokepoint. China total chokepoint exposure is directionally reliable and externally corroborated; the per-exporter breakdown should be read with care.',
      '<strong>Land-based and pipeline flows excluded.</strong> The model does not distinguish transport mode within bilateral trade data. Flows that are primarily overland or pipeline-routed are excluded where corridor assignment is ambiguous, but the exclusion is not exhaustive.',
    ],
  },
  access: {
    sampleTail: 'All can be substituted in a demo session.',
    titleHtml: 'Full documentation is available<br><em>under NDA</em> for serious counterparties.',
    bodyHtml: 'This page describes the model at a level sufficient to evaluate its credibility and fit. <strong>Full documentation</strong>, including corridor definitions, the complete dependency matrix, simulation API specification, and integration notes, is available on request to qualified counterparties under a standard NDA. Request a demo and we will send the documentation pack before the call.',
    placeholder: 'your@organisation.com',
    button: 'Request documentation',
    note: 'fysh@narrows.io · A person will reply.',
    mailSubject: 'Methodology documentation request: Narrows',
    mailBody: 'Request from: {email}\n\nOrganisation:\nRole:\nContext:',
  },
  contact: {
    title: 'Questions about the method.',
    body: 'If something on this page looks wrong or unclear, please write. Corrections are recorded on the data changelog.',
  },
};

const fr: typeof en = {
  title: 'Narrows | Méthodologie',
  description:
    'Comment fonctionne le modèle de risque commercial de Narrows. Écrit pour les lecteurs qui veulent comprendre ce qui se trouve sous le capot.',
  descriptionCommercial: 'Comment fonctionne le modèle de risque commercial de Narrows. Écrit pour les professionnels du risque qui veulent comprendre ce qui se trouve sous le capot avant une première conversation.',
  hero: {
    eyebrow: 'Méthodologie',
    titleHtml: 'Comment des données commerciales bilatérales deviennent<br>\n        <em>une exposition chiffrée en dollars.</em>',
    sub: 'Écrit pour les professionnels du risque qui évaluent l’adéquation avant une première conversation. Présente le pipeline de données en cinq étapes, les trois résultats structurés, l’approche de validation et les limites reconnues, avec le niveau de détail nécessaire pour évaluer la crédibilité du modèle sans divulguer la logique de routage propriétaire.',
    cov: [
      { label: 'Points de passage modélisés', value: String(meta.chokepoints), unit: 'points de passage' },
      { label: 'Pays importateurs', value: String(meta.importers), unit: 'pays' },
      { label: 'Codes de produits', value: String(meta.commodities), unit: 'codes' },
      { label: 'Lignes de dépendance', value: thou(meta.rows, true), unit: 'lignes' },
      { label: 'Millésimes des données', value: '2022 à 2024', unit: 'UN Comtrade' },
      { label: 'Version du modèle', value: 'v3', unit: 'oct. 2026' },
    ],
  },
  what: {
    eyebrow: 'Ce qu’est le modèle',
    title: 'Un modèle de dépendance bilatérale. Conçu pour l’analyse du risque commercial.',
    p1: `Le modèle de Narrows quantifie l’exposition financière des pays importateurs aux perturbations de corridors commerciaux précis. Il répond à une question différente de celle des outils de suivi fondés sur l’AIS, qui mesurent ce qui arrive au débit. Narrows mesure ce que coûte une perturbation${nb}: en dollars, par pays, par produit, dans un scénario que vous définissez.`,
    p2: 'Le résultat central du modèle est un score de dépendance au niveau (importateur, corridor, produit)' + nb + ': la part de l’approvisionnement maritime total d’un importateur, pour un produit donné, qui transite par un corridor donné, calculée à partir des données commerciales bilatérales d’UN Comtrade. Appliqués à des valeurs commerciales annuelles et à un scénario de perturbation défini par l’utilisateur, ces scores produisent trois résultats structurés' + nb + ': la valeur à risque, le surcoût de déroutement et la flotte exposée. Chaque paramètre peut être remplacé par vos propres hypothèses.',
    p3: `La qualité des données est explicite et indiquée sur chaque ligne. Le modèle utilise trois niveaux${nb}: Déclaré (un enregistrement bilatéral direct), Corroboré (statistiques côté exportateur dont le routage a été vérifié de façon indépendante) et Estimé (un total national réparti entre les corridors par une logique de routage). En valeur, ${n1(tier(1), true)}${nb}% de la matrice actuelle est Déclaré, ${n1(tier(2), true)}${nb}% est Corroboré et ${n1(tier(3), true)}${nb}% est Estimé, sur ${thou(meta.rows, true)} lignes. Près de la moitié de la valeur repose donc sur une répartition plutôt que sur un enregistrement bilatéral apparié, et le niveau accompagne chaque chiffre produit par le modèle.`,
    quote: 'Le modèle produit des scores de dépendance et des estimations d’exposition. C’est un intrant de votre analyse, et non un substitut.',
  },
  pipeline: {
    eyebrow: 'Fonctionnement',
    title: 'Cinq étapes. Chacune produit un résultat distinct et vérifiable.',
    intro: `Le modèle s’exécute en cinq étapes successives. L’entrée est constituée de données de flux commerciaux bilatéraux${nb}: des volumes déclarés entre des paires de pays précises, pour ${meta.commodities} codes de produits, tirés des extractions authentifiées d’UN Comtrade pour 2022 et 2024, avec des compléments issus de sources primaires (Eurostat, statistiques énergétiques britanniques et EIA américaine) lorsqu’ils existent. Le chiffre le plus récent remplace le plus ancien pour le même importateur, le même exportateur et le même produit. La valeur analytique se situe dans la transformation opérée à chaque étape${nb}: non pas dans les données de départ, qui sont publiques, mais dans la manière dont les flux sont rattachés aux corridors maritimes, notés selon leur dépendance, puis convertis en résultats pilotés par des scénarios.`,
    steps: [
      ['Intégration des flux', `Les données de flux commerciaux bilatéraux de ${meta.commodities} codes de produits sont intégrées, nettoyées et normalisées selon les pays déclarants et les années de référence. Les codes pays à préfixe P ou non standard sont résolus${nb}; les déclarants qui ne fournissent que des agrégats sont signalés.`],
      ['Affectation des corridors', `Chaque flux bilatéral est affecté à son corridor maritime le plus probable, parmi ${meta.chokepoints} points de passage, à l’aide d’un modèle de routage propriétaire. Les flux non appariés ou ambigus sont signalés et exclus.`],
      ['Calcul de la dépendance', `Les scores de dépendance par pays, corridor et produit sont calculés pour ${meta.importers} pays importateurs. Chaque score indique la part des importations maritimes d’un pays, pour un produit donné, qui transite par un corridor donné. Chaque ligne porte son niveau de données, sa source et son année.`],
      ['Simulation de scénario', 'Une perturbation définie par l’utilisateur (corridor, gravité et durée) est appliquée à la matrice de dépendance. La valeur commerciale exposée est calculée sur la fenêtre de temps concernée.'],
      ['Production des résultats', 'Trois résultats structurés' + nb + ': la valeur à risque par pays et par produit, le surcoût de déroutement par classe de navire, et l’estimation de la flotte exposée pendant la fenêtre de perturbation.'],
    ],
  },
  outputs: {
    eyebrow: 'Ce qu’il produit',
    title: 'Trois résultats. Chacun répond à une question professionnelle précise.',
    intro: 'Chaque résultat se rattache à un usage en aval. Le modèle est conçu pour produire des chiffres qui s’intègrent aux méthodes d’analyse existantes' + nb + ': modèles de cumul, tarification des desks de négoce, tests de résistance du crédit. Pas des chiffres qu’il faut retraduire avant de pouvoir les utiliser.',
    label: 'Résultat',
    cards: [
      {
        title: 'Valeur à risque',
        desc: 'Exposition commerciale chiffrée en dollars, par pays et par produit, sous une perturbation définie par l’utilisateur. La gravité (0 à 100' + nb + '%) et la durée sont variables. La sensibilité de capacité est réglable pour chaque corridor.',
        egTitle: 'Malacca 100' + nb + '% / 14 jours' + nb + ': pétrole brut',
        egBody: top.slice(0, 3).map((c) => `${nameFr(c)}${nb}: ${n1(c.valueB, true)}${nb}Md$`).join(' · '),
      },
      {
        title: 'Surcoût de déroutement',
        desc: 'Dépassement de coût par voyage et par classe de navire' + nb + ': jours de détour, surcoût de soutes, écart de taux d’affrètement et coût de portage des stocks. Classé par destinataire' + nb + ': assureur, prêteur, propriétaire de la cargaison. Toutes les hypothèses de taux peuvent être remplacées.',
        egTitle: 'Fermeture de Suez' + nb + ': VLCC via le Cap',
        egBody: `+${meta.reroute.days} jours · ${n1(meta.reroute.overrunM, true)}${nb}M$ de dépassement par voyage · ${meta.reroute.carryK}${nb}k$ de coût de portage par navire`,
      },
      {
        title: 'Flotte exposée',
        desc: 'Nombre estimé de navires présents dans la fenêtre au début de l’événement, valeur des cargaisons en mer et perte de déroutement au niveau du portefeuille sur l’ensemble de la flotte. Le chiffre de cumul pour les P&I et les assureurs de facultés.',
        egTitle: `Suez 100${nb}% / ${meta.fleet.days} jours`,
        egBody: `${meta.fleet.vlcc} VLCC dans la fenêtre (${meta.fleet.vessels} navires sur six classes) · ${n1(meta.fleet.cargoB, true)}${nb}Md$ de cargaisons exposées · ${Math.round(meta.fleet.overrunM)}${nb}M$ de dépassement de portefeuille`,
      },
    ],
  },
  sample: {
    eyebrow: 'Exemple de résultat',
    title: 'Détroit de Malacca' + nb + ': fermeture à 100' + nb + '%, 14 jours.',
    intro: 'Ce qui suit est un résultat du modèle, et non une illustration hypothétique. Les paramètres affichés sont les valeurs par défaut de ce scénario.',
    introTail: 'Tous peuvent être modifiés dans l’outil de démonstration.',
    params: [
      ['Corridor', 'Détroit de Malacca'],
      ['Gravité', '100' + nb + '%'],
      ['Durée', `${sm.days} jours`],
      ['Sensibilité de capacité', String(sm.sensitivity).replace('.', ',')],
      ['Données de base', '2022 à 2024'],
    ],
    results: [
      { label: 'Valeur commerciale totale à risque', value: `${n1(sm.totalB, true)}${nb}Md$`, unit: 'USD', note: `Tous les corridors de produits appariés transitant par Malacca, ${sm.days} jours de fermeture à 100${nb}%, sensibilité de capacité appliquée. Modèle v3, données 2022 à 2024.` },
      { label: 'Pays à exposition significative', value: String(sm.countriesAbove5), unit: 'pays', note: `Seuil de dépendance aux importations supérieur à 5${nb}%, sur ${sm.countriesTotal} importateurs dont le routage passe par Malacca. Comprend la Chine, le Japon, la Corée du Sud, la Thaïlande, le Vietnam, les Philippines` },
      { label: 'Retard de déroutement par classe de navire', value: `+${sm.detourMin} à ${sm.detourMax}`, unit: 'jours par voyage', note: 'Alternative partielle seulement. Limitée par le tirant d’eau pour les VLCC et les Capesize chargés' },
      { label: 'Part des données déclarées', value: `${Math.round(sm.tierPct['1'])}${nb}%`, unit: 'de l’exposition', note: `Le reste est Corroboré (${Math.round(sm.tierPct['2'])}${nb}%) et Estimé (${Math.round(sm.tierPct['3'])}${nb}%) pour ce scénario. Le niveau est indiqué ligne par ligne.` },
    ],
    tableTitle: 'Exposition par pays' + nb + ': pétrole brut',
    tableNote: 'Le pourcentage de dépendance est un résultat fixe de la matrice de dépendance. La durée et la gravité sont les variables que vous contrôlez dans le simulateur.',
    viaLabel: 'via Malacca',
    countries: top.map((c) => ({ name: nameFr(c), dep: c.dep, val: `${n1(c.valueB, true)}${nb}Md$` })),
    countryNote: `Les valeurs sont des résultats de simulation sur ${sm.days} jours, sensibilité de capacité appliquée, à partir des données de base 2022 à 2024. Les pourcentages de dépendance sont issus du modèle, à partir de l’analyse des flux commerciaux bilatéraux.`,
  },
  validation: {
    eyebrow: 'Validation',
    title: 'Les affectations de corridors sont recoupées avec trois sources agrégées indépendantes.',
    intro: 'La logique d’affectation des corridors est validée en vérifiant que les parts de points de passage prévues vont dans le même sens que les distributions de trafic de navires observées par des sources indépendantes. La validation est qualifiée de directionnelle plutôt qu’exacte' + nb + ': les données commerciales et les données de trafic ne correspondent ni à la même période ni à la même granularité.',
    sourceLabel: 'Source',
    sources: [
      ['Escales et nombres de transits', 'Nombres hebdomadaires d’escales dans les grands ports et volumes de transit aux points de passage obligés, issus de données AIS agrégées. Utilisés pour valider la distribution du trafic total entre les corridors.'],
      ['Flux des corridors énergétiques', 'Données agrégées hebdomadaires et mensuelles sur les flux de pétroliers, tirées de statistiques énergétiques officielles, couvrant Ormuz, Bab el-Mandeb, Suez et Malacca. Validation principale des affectations pour les produits énergétiques.'],
      ['Statistiques annuelles du transport maritime', 'Statistiques annuelles sur les flux de conteneurs et de vrac passant par les grands corridors, publiées par des organismes internationaux du transport maritime. Utilisées pour un recoupement annuel des estimations de part de chaque corridor.'],
    ],
  },
  limits: {
    eyebrow: 'Portée et limites',
    title: 'Ce que le modèle est, et ce qu’il n’est pas.',
    intro: 'Ces limites sont énoncées parce que le modèle vise à soutenir une analyse de risque sérieuse. Un professionnel qui comprend où le modèle est incertain est mieux placé pour l’utiliser à bon escient, et pour y substituer ses propres hypothèses lorsqu’il est en désaccord avec les nôtres.',
    items: [
      '<strong>Des estimations d’exposition, pas des évaluations.</strong> Le modèle produit des estimations d’exposition chiffrées en dollars et des scores de dépendance. Ce n’est pas un outil d’évaluation assurantielle, et il ne formule ni recommandation de prime, ni estimation de sinistre, ni évaluation de probabilité de perturbation. Cela reste du ressort de l’analyste.',
      `<strong>Des données de base annuelles, pas des flux en temps réel.</strong> Les données de flux commerciaux reflètent des schémas bilatéraux annuels. ${thou(vint['2024'], true)} lignes sur ${thou(meta.rows, true)} utilisent des chiffres de 2024 et ${thou(vint['2022'], true)} utilisent encore ceux de 2022, lorsqu’aucun chiffre bilatéral plus récent n’existe pour le même importateur, le même exportateur et le même produit. Le modèle mesure une dépendance structurelle, pas les positions actuelles des cargaisons. Les estimations du nombre de voyages sont des décompositions issues du modèle, et non un suivi de navires en temps réel.`,
      '<strong>Aucun ajustement saisonnier.</strong> Les calculs fondés sur la durée utilisent une mise à l’échelle linéaire plutôt qu’un ajustement saisonnier. Le modèle ne capte ni la variation mensuelle des flux de produits ni les schémas périodiques du trafic de navires.',
      '<strong>À l’échelle du pays, pas du navire.</strong> Le modèle ne suit ni les navires individuels, ni les États du pavillon, ni les cargaisons propres à une police. L’analyse du cumul d’un portefeuille exige de rattacher chaque police à un corridor, une étape d’intégration de données qui se situe en dehors du modèle.',
      '<strong>Les scores de sensibilité de capacité sont des paramètres calibrés.</strong> Les scores de sensibilité de 0 à 1 appliqués à chaque corridor sont des jugements éclairés, calibrés sur des perturbations historiques. Ils sont défendables et ajustables, mais ne sont pas des estimations statistiques assorties d’intervalles de confiance. Les clients commerciaux peuvent y substituer leurs propres scores.',
      `<strong>Le niveau Estimé porte une large part de la valeur.</strong> ${n1(tier(3), true)}${nb}% de la valeur de la matrice est Estimée, c’est-à-dire un total national réparti entre les corridors par une logique de routage plutôt qu’un enregistrement bilatéral apparié. Ces lignes sont à lire comme indicatives, en s’appuyant sur le niveau indiqué ligne par ligne pour les pondérer.`,
      `<strong>Des lacunes de couverture pour les flux bilatéraux faibles.</strong> La matrice publiée couvre ${meta.importers} pays importateurs. Les importateurs et les paires produit-corridor dont la couverture en données bilatérales est limitée sont exclus, de sorte que les flux de moindre valeur sont sous-représentés de façon disproportionnée.`,
      `<strong>Une réserve connue sur l’origine du brut chinois.</strong> Des transbordements documentés font passer une partie du brut sous sanctions pour une origine malaisienne, omanaise ou émiratie avant son entrée dans les statistiques commerciales, ce qui peut déplacer le point de passage apparent. L’exposition totale de la Chine est fiable dans sa direction et corroborée de l’extérieur${nb}; la ventilation par exportateur est à lire avec prudence.`,
      '<strong>Les flux terrestres et par oléoduc sont exclus.</strong> Le modèle ne distingue pas le mode de transport au sein des données commerciales bilatérales. Les flux principalement acheminés par voie terrestre ou par oléoduc sont exclus lorsque l’affectation à un corridor est ambiguë, mais cette exclusion n’est pas exhaustive.',
    ],
  },
  access: {
    sampleTail: 'Tous peuvent être remplacés lors d’une séance de démonstration.',
    titleHtml: 'La documentation complète est disponible<br><em>sous NDA</em> pour les contreparties sérieuses.',
    bodyHtml: 'Cette page décrit le modèle à un niveau suffisant pour en évaluer la crédibilité et l’adéquation. La <strong>documentation complète</strong>, qui comprend les définitions des corridors, la matrice de dépendance complète, la spécification de l’API de simulation et les notes d’intégration, est disponible sur demande pour les contreparties qualifiées, sous un NDA standard. Demandez une démonstration et nous vous enverrons le dossier de documentation avant l’appel.',
    placeholder: 'votre@organisation.com',
    button: 'Demander la documentation',
    note: 'fysh@narrows.io · Une personne vous répondra.',
    mailSubject: 'Demande de documentation sur la méthodologie : Narrows',
    mailBody: 'Demande de : {email}\n\nOrganisation :\nFonction :\nContexte :',
  },
  contact: {
    title: 'Questions sur la méthode.',
    body: 'Si quelque chose sur cette page vous semble erroné ou peu clair, écrivez-nous. Les corrections sont consignées dans le journal des corrections de données.',
  },
};

export const methodology = { en, fr };
