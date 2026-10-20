// Methodology page copy, English and French (non-commercial wording).
// NOTE: figures on this page describe model v0.2 (May 2026, 2023 base data)
// and are carried over unchanged. Refresh them in ONE place per language here.
// Public copy house style: no em-dashes, no contractions.

const en = {
  title: 'Narrows | Methodology',
  description:
    'How the Narrows trade risk model works. Written for readers who want to understand what is under the hood.',
  hero: {
    eyebrow: 'Methodology',
    titleHtml: 'How bilateral trade data becomes<br>\n        <em>dollar-denominated exposure.</em>',
    sub: "Written for readers who want to assess the model's credibility. Covers the five-stage data pipeline, the three structured outputs, validation approach, and stated limitations, at the level of detail required to judge the model without disclosing proprietary routing logic.",
    cov: [
      { label: 'Risk corridors modelled', value: '37', unit: 'corridors' },
      { label: 'Trade value in scope', value: '$2.15T', unit: 'USD' },
      { label: 'Coverage rate', value: '87.2', unit: '%' },
      { label: 'Importing nations', value: '44', unit: 'nations' },
      { label: 'Commodity classes', value: '17', unit: 'classes' },
      { label: 'Model version', value: '0.2', unit: 'May 2026' },
    ],
  },
  what: {
    eyebrow: 'What the model is',
    title: 'A bilateral dependency model. Purpose-built for commercial risk analysis.',
    p1: 'The Narrows model quantifies the financial exposure of importing countries to disruptions in specific trade corridors. It answers a different question from AIS-based monitoring tools, which measure what is happening to throughput. Narrows measures what a disruption costs: in dollars, by country, by commodity, under a scenario you define.',
    p2: "The core output of the model is a dependency score at the (importer, corridor, commodity) level: the share of that importer's total seaborne supply of a given commodity that transits a given corridor, derived from UN Comtrade bilateral trade data. Applied against annual trade values and a user-defined disruption scenario, these scores produce three structured outputs: value at risk, rerouting penalty, and fleet at risk. Every parameter is substitutable with your own assumptions.",
    p3: 'Data quality is explicit. The model distinguishes Tier 1 flows (direct bilateral data where both reporter and partner filed with UN Comtrade) from Tier 3 flows constructed from IEA and BP energy statistics as bilateral proxies. The large majority of value in the current model is Tier 1. Quality tier is disclosed per flow in the full dependency matrix.',
    quote: 'The model produces dependency scores and exposure estimates. It is an input to your analysis, not a replacement for it.',
  },
  pipeline: {
    eyebrow: 'How it works',
    title: 'Five stages. Each produces a discrete, auditable output.',
    intro: 'The model runs in five sequential stages. The input is bilateral trade flow data: reported volumes between specific country pairs across 17 commodity classes, drawn from UN Comtrade 2023 bilateral submissions. The transformation at each stage is where the analytical value sits: not in the underlying data, which is publicly available, but in how flows are matched to maritime corridors, scored for dependency, and converted into scenario-driven outputs.',
    steps: [
      ['Flow ingestion', 'Bilateral trade flow data for 17 commodity classes is ingested, cleaned, and standardised across reporter countries and reference years. P-prefix and non-standard country codes are resolved; aggregate-only reporters are flagged.'],
      ['Corridor assignment', 'Each bilateral flow is assigned to its most probable maritime corridor using a proprietary routing model. Unmatched or ambiguous flows are flagged and excluded.'],
      ['Dependency scoring', "Country-corridor-commodity dependency scores are calculated for 44 importing nations. Each score states the share of a country's seaborne import of a given commodity that transits a given corridor. Scores are calculated separately for Tier 1 and Tier 3 flows and aggregated."],
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
        desc: 'Dollar-denominated trade exposure by country and commodity under a user-defined disruption. Severity (0–100%) and duration are variable. Capacity sensitivity is adjustable per corridor.',
        egTitle: 'Malacca 100% / 14 days: crude petroleum',
        egBody: 'China: $8.5B · Japan: $2.7B · South Korea: $2.7B',
      },
      {
        title: 'Rerouting penalty',
        desc: 'Per-voyage cost overrun by vessel class: detour days, bunker uplift, charter rate differential, and inventory carrying cost. Tagged by audience: underwriter, lender, cargo owner. All rate assumptions substitutable.',
        egTitle: 'Suez closure: VLCC via Cape',
        egBody: '+14 days · $1.4M voyage overrun · $230k carrying cost per vessel',
      },
      {
        title: 'Fleet at risk',
        desc: 'Estimated vessel count in-window at event onset, cargo value on water, and portfolio-level rerouting loss across the fleet. The accumulation number for P&I and cargo underwriters.',
        egTitle: 'Hormuz 100% / 30 days',
        egBody: '28 VLCCs in-window · $3.4B cargo at risk · $28M portfolio overrun',
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
      ['Duration', '14 days'],
      ['Capacity sensitivity', '0.85'],
      ['Base data', '2023'],
    ],
    results: [
      { label: 'Total trade value at risk', value: '$30.0B', unit: 'USD', note: 'All matched commodity corridors transiting Malacca, 14d at 100% closure. Model v0.2, 2023 data.' },
      { label: 'Countries with material exposure', value: '27', unit: 'nations', note: '>5% import dependency threshold. Includes China, India, Japan, South Korea, Taiwan, Thailand, Vietnam' },
      { label: 'Rerouting delay: Sunda Strait', value: '+4', unit: 'days avg', note: 'Partial alternative only. Depth-limited for laden VLCCs and Capesizes' },
      { label: 'CII-adjusted Capesize system cost', value: '$21M', unit: '/yr', note: 'IMO CII speed constraints add ~0.7 days to Lombok detour. ~600 Japan voyages/yr' },
    ],
    tableTitle: 'Country-level exposure: crude petroleum',
    tableNote: 'Dependency percentage is a fixed output of the dependency matrix. Duration and severity are the variables you control in the simulator.',
    viaLabel: 'via Malacca',
    countries: [
      { name: 'China', dep: 61, val: '$8.5B' },
      { name: 'India', dep: 72, val: '$4.5B' },
      { name: 'Japan', dep: 88, val: '$2.7B' },
      { name: 'South Korea', dep: 81, val: '$2.7B' },
      { name: 'Netherlands', dep: 32, val: '$1.1B' },
    ],
    countryNote: 'Values are 14-day simulation outputs from 2023 base data. Dependency percentages are model-derived from bilateral trade flow analysis.',
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
      '<strong>Annual base data, not live flows.</strong> Trade flow data reflects annual bilateral patterns from the most recent complete reference year. The model measures structural dependency, not current cargo positions. Voyage count estimates are model-derived decompositions, not live vessel tracking.',
      '<strong>No seasonal adjustment.</strong> Duration-based calculations use linear scaling rather than seasonal adjustment. The model does not capture monthly variation in commodity flows or periodic vessel traffic patterns.',
      '<strong>Country-level, not vessel-level.</strong> The model does not track individual vessels, flag states, or policy-specific cargo. Portfolio accumulation analysis requires mapping individual policies to corridor assignments, a data integration step that sits outside the model.',
      '<strong>Capacity sensitivity scores are calibrated parameters.</strong> The 0–1 sensitivity scores applied per corridor are informed judgements calibrated against historical disruption events. They are defensible and adjustable, not statistical estimates with confidence intervals. Readers may substitute their own scores.',
      '<strong>Coverage gaps at thin bilateral flows.</strong> Some commodity-corridor pairs with limited bilateral data coverage are excluded from the dependency matrix. The 87.2% coverage rate (model v0.2) reflects value-weighted coverage; smaller flows by value are disproportionately underrepresented.',
      '<strong>Land-based and pipeline flows excluded.</strong> The model does not distinguish transport mode within bilateral trade data. Flows that are primarily overland or pipeline-routed are excluded where corridor assignment is ambiguous, but the exclusion is not exhaustive.',
    ],
  },
  contact: {
    title: 'Questions about the method.',
    body: 'If something on this page looks wrong or unclear, please write. Corrections are recorded on the data changelog.',
  },
};

const nb = ' ';

const fr: typeof en = {
  title: 'Narrows | Méthodologie',
  description:
    'Comment fonctionne le modèle de risque commercial de Narrows. Écrit pour les lecteurs qui veulent comprendre ce qui se trouve sous le capot.',
  hero: {
    eyebrow: 'Méthodologie',
    titleHtml: 'Comment des données commerciales bilatérales deviennent<br>\n        <em>une exposition chiffrée en dollars.</em>',
    sub: 'Écrit pour les lecteurs qui veulent évaluer la crédibilité du modèle. Présente le pipeline de données en cinq étapes, les trois résultats structurés, l’approche de validation et les limites reconnues, avec le niveau de détail nécessaire pour juger le modèle sans divulguer la logique de routage propriétaire.',
    cov: [
      { label: 'Corridors à risque modélisés', value: '37', unit: 'corridors' },
      { label: 'Valeur des échanges couverte', value: '2' + nb + '150', unit: 'Md USD' },
      { label: 'Taux de couverture', value: '87,2', unit: nb + '%' },
      { label: 'Pays importateurs', value: '44', unit: 'pays' },
      { label: 'Classes de produits', value: '17', unit: 'classes' },
      { label: 'Version du modèle', value: '0.2', unit: 'mai 2026' },
    ],
  },
  what: {
    eyebrow: 'Ce qu’est le modèle',
    title: 'Un modèle de dépendance bilatérale. Conçu pour l’analyse du risque commercial.',
    p1: `Le modèle de Narrows quantifie l’exposition financière des pays importateurs aux perturbations de corridors commerciaux précis. Il répond à une question différente de celle des outils de suivi fondés sur l’AIS, qui mesurent ce qui arrive au débit. Narrows mesure ce que coûte une perturbation${nb}: en dollars, par pays, par produit, dans un scénario que vous définissez.`,
    p2: 'Le résultat central du modèle est un score de dépendance au niveau (importateur, corridor, produit)' + nb + ': la part de l’approvisionnement maritime total d’un importateur, pour un produit donné, qui transite par un corridor donné, calculée à partir des données commerciales bilatérales d’UN Comtrade. Appliqués à des valeurs commerciales annuelles et à un scénario de perturbation défini par l’utilisateur, ces scores produisent trois résultats structurés' + nb + ': la valeur à risque, le surcoût de déroutement et la flotte exposée. Chaque paramètre peut être remplacé par vos propres hypothèses.',
    p3: 'La qualité des données est explicite. Le modèle distingue les flux de niveau 1 (données bilatérales directes, lorsque le déclarant et le partenaire ont tous deux déclaré à UN Comtrade) des flux de niveau 3, construits à partir des statistiques énergétiques de l’AIE et de BP comme substituts bilatéraux. La grande majorité de la valeur du modèle actuel relève du niveau 1. Le niveau de qualité est indiqué pour chaque flux dans la matrice de dépendance complète.',
    quote: 'Le modèle produit des scores de dépendance et des estimations d’exposition. C’est un intrant de votre analyse, et non un substitut.',
  },
  pipeline: {
    eyebrow: 'Fonctionnement',
    title: 'Cinq étapes. Chacune produit un résultat distinct et vérifiable.',
    intro: 'Le modèle s’exécute en cinq étapes successives. L’entrée est constituée de données de flux commerciaux bilatéraux' + nb + ': des volumes déclarés entre des paires de pays précises, pour 17 classes de produits, tirés des déclarations bilatérales 2023 d’UN Comtrade. La valeur analytique se situe dans la transformation opérée à chaque étape' + nb + ': non pas dans les données de départ, qui sont publiques, mais dans la manière dont les flux sont rattachés aux corridors maritimes, notés selon leur dépendance, puis convertis en résultats pilotés par des scénarios.',
    steps: [
      ['Intégration des flux', 'Les données de flux commerciaux bilatéraux de 17 classes de produits sont intégrées, nettoyées et normalisées selon les pays déclarants et les années de référence. Les codes pays à préfixe P ou non standard sont résolus' + nb + '; les déclarants qui ne fournissent que des agrégats sont signalés.'],
      ['Affectation des corridors', 'Chaque flux bilatéral est affecté à son corridor maritime le plus probable à l’aide d’un modèle de routage propriétaire. Les flux non appariés ou ambigus sont signalés et exclus.'],
      ['Calcul de la dépendance', 'Les scores de dépendance par pays, corridor et produit sont calculés pour 44 pays importateurs. Chaque score indique la part des importations maritimes d’un pays, pour un produit donné, qui transite par un corridor donné. Les scores sont calculés séparément pour les flux de niveau 1 et de niveau 3, puis agrégés.'],
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
        egBody: 'Chine' + nb + ': 8,5' + nb + 'Md$ · Japon' + nb + ': 2,7' + nb + 'Md$ · Corée du Sud' + nb + ': 2,7' + nb + 'Md$',
      },
      {
        title: 'Surcoût de déroutement',
        desc: 'Dépassement de coût par voyage et par classe de navire' + nb + ': jours de détour, surcoût de soutes, écart de taux d’affrètement et coût de portage des stocks. Classé par destinataire' + nb + ': assureur, prêteur, propriétaire de la cargaison. Toutes les hypothèses de taux peuvent être remplacées.',
        egTitle: 'Fermeture de Suez' + nb + ': VLCC via le Cap',
        egBody: '+14 jours · 1,4' + nb + 'M$ de dépassement par voyage · 230' + nb + 'k$ de coût de portage par navire',
      },
      {
        title: 'Flotte exposée',
        desc: 'Nombre estimé de navires présents dans la fenêtre au début de l’événement, valeur des cargaisons en mer et perte de déroutement au niveau du portefeuille sur l’ensemble de la flotte. Le chiffre de cumul pour les P&I et les assureurs de facultés.',
        egTitle: 'Ormuz 100' + nb + '% / 30 jours',
        egBody: '28 VLCC dans la fenêtre · 3,4' + nb + 'Md$ de cargaisons exposées · 28' + nb + 'M$ de dépassement de portefeuille',
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
      ['Durée', '14 jours'],
      ['Sensibilité de capacité', '0,85'],
      ['Données de base', '2023'],
    ],
    results: [
      { label: 'Valeur commerciale totale à risque', value: '30,0' + nb + 'Md$', unit: 'USD', note: 'Tous les corridors de produits appariés transitant par Malacca, 14 jours de fermeture à 100' + nb + '%. Modèle v0.2, données 2023.' },
      { label: 'Pays à exposition significative', value: '27', unit: 'pays', note: 'Seuil de dépendance aux importations supérieur à 5' + nb + '%. Comprend la Chine, l’Inde, le Japon, la Corée du Sud, Taïwan, la Thaïlande, le Vietnam' },
      { label: 'Retard de déroutement' + nb + ': détroit de la Sonde', value: '+4', unit: 'jours en moyenne', note: 'Alternative partielle seulement. Limitée par le tirant d’eau pour les VLCC et les Capesize chargés' },
      { label: 'Coût système Capesize ajusté du CII', value: '21' + nb + 'M$', unit: '/an', note: 'Les contraintes de vitesse du CII de l’OMI ajoutent environ 0,7 jour au détour par Lombok. Environ 600 voyages japonais par an' },
    ],
    tableTitle: 'Exposition par pays' + nb + ': pétrole brut',
    tableNote: 'Le pourcentage de dépendance est un résultat fixe de la matrice de dépendance. La durée et la gravité sont les variables que vous contrôlez dans le simulateur.',
    viaLabel: 'via Malacca',
    countries: [
      { name: 'Chine', dep: 61, val: '8,5' + nb + 'Md$' },
      { name: 'Inde', dep: 72, val: '4,5' + nb + 'Md$' },
      { name: 'Japon', dep: 88, val: '2,7' + nb + 'Md$' },
      { name: 'Corée du Sud', dep: 81, val: '2,7' + nb + 'Md$' },
      { name: 'Pays-Bas', dep: 32, val: '1,1' + nb + 'Md$' },
    ],
    countryNote: 'Les valeurs sont des résultats de simulation sur 14 jours à partir des données de base 2023. Les pourcentages de dépendance sont issus du modèle, à partir de l’analyse des flux commerciaux bilatéraux.',
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
      '<strong>Des données de base annuelles, pas des flux en temps réel.</strong> Les données de flux commerciaux reflètent les schémas bilatéraux annuels de la dernière année de référence complète. Le modèle mesure une dépendance structurelle, pas les positions actuelles des cargaisons. Les estimations du nombre de voyages sont des décompositions issues du modèle, et non un suivi de navires en temps réel.',
      '<strong>Aucun ajustement saisonnier.</strong> Les calculs fondés sur la durée utilisent une mise à l’échelle linéaire plutôt qu’un ajustement saisonnier. Le modèle ne capte ni la variation mensuelle des flux de produits ni les schémas périodiques du trafic de navires.',
      '<strong>À l’échelle du pays, pas du navire.</strong> Le modèle ne suit ni les navires individuels, ni les États du pavillon, ni les cargaisons propres à une police. L’analyse du cumul d’un portefeuille exige de rattacher chaque police à un corridor, une étape d’intégration de données qui se situe en dehors du modèle.',
      '<strong>Les scores de sensibilité de capacité sont des paramètres calibrés.</strong> Les scores de sensibilité de 0 à 1 appliqués à chaque corridor sont des jugements éclairés, calibrés sur des perturbations historiques. Ils sont défendables et ajustables, mais ne sont pas des estimations statistiques assorties d’intervalles de confiance. Les lecteurs peuvent y substituer leurs propres scores.',
      '<strong>Des lacunes de couverture pour les flux bilatéraux faibles.</strong> Certaines paires produit-corridor dont la couverture en données bilatérales est limitée sont exclues de la matrice de dépendance. Le taux de couverture de 87,2' + nb + '% (modèle v0.2) est pondéré par la valeur' + nb + '; les flux de moindre valeur sont donc sous-représentés de façon disproportionnée.',
      '<strong>Les flux terrestres et par oléoduc sont exclus.</strong> Le modèle ne distingue pas le mode de transport au sein des données commerciales bilatérales. Les flux principalement acheminés par voie terrestre ou par oléoduc sont exclus lorsque l’affectation à un corridor est ambiguë, mais cette exclusion n’est pas exhaustive.',
    ],
  },
  contact: {
    title: 'Questions sur la méthode.',
    body: 'Si quelque chose sur cette page vous semble erroné ou peu clair, écrivez-nous. Les corrections sont consignées dans le journal des corrections de données.',
  },
};

export const methodology = { en, fr };
