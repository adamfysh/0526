// About page copy, English and French (non-commercial wording).
// Product tile names and descriptions come from the homepage strings.
// Public copy house style: no em-dashes, no contractions.

const en = {
  title: 'Narrows | About',
  description:
    'The Narrows is an independent maritime trade risk research project: published analysis, a documented model and demonstration tools.',
  hero: {
    eyebrow: 'About The Narrows',
    titleHtml:
      'Global trade runs through a small number of physical points.<br>\n      <em>What threatens them is not always the same kind of risk.</em>',
    bodyHtml:
      'The Narrows measures what a specific importer, cargo, or institution has riding on a specific chokepoint, and what a credible alternative would cost. <strong>That number holds whether the disruption turns out to be a drought, a blockade, or a decision made by a government with its own reasons.</strong> Exposure is a structural fact. It does not wait on a probability to become real.',
  },
  premise: {
    eyebrow: 'The premise',
    title: 'Some risk can be modelled from a stable distribution. Some risk is a decision someone else gets to make.',
    p1: 'A small number of points carry an outsized share of global trade: straits, canals, ports with no real substitute. Everyone can see them on a map. The harder question is what runs through them, and what kind of threat that actually is.',
    p2: "Weather, congestion, and infrastructure failure are physical processes. They have real statistical structure, and the industry has genuinely good tools for pricing that structure. A government's decision to close a strait, sanction a supplier, or reroute a pipeline is a different kind of event, made by an actor with its own incentives, not drawn from a distribution. Treating the two the same, assigning a strait closure the same kind of annual probability as a storm making landfall, is a category error, not a modelling refinement.",
    p3Html:
      'The Narrows does not try to predict which kind of threat materialises, or when. It measures what is exposed either way: which importer depends on which corridor, for which commodity, at what percentage of total supply, and what a credible alternative costs. <strong>That number is the same whether the disruption turns out to be a drought or a decision. Exposure is a structural fact. It does not need a probability attached to be real, or to be priced.</strong>',
  },
  name: {
    eyebrow: 'The name',
    title: 'The points where the world narrows.',
    p1: "The name refers to the points where constraints are hard, data has meaning, and decisions cannot be deferred. A strait through which 30% of global seaborne trade passes is a narrow. A port that handles the majority of a country's grain imports is a narrow. A corridor that has no viable alternative is a narrow.",
    p2: 'At these points, the structure of the world becomes legible. The dependencies are real. The exposure is quantifiable. The decisions that flow from understanding them are consequential. That is where The Narrows works.',
  },
  work: {
    eyebrow: 'The work',
    title: 'Research, tools and one data foundation.',
    lead: 'Everything here is built on the same underlying Chokepoint Dependency Model: 37 maritime risk corridors, $2.15 trillion in matched trade value, 44 importing countries, and 17 commodity classes.',
    validationHtml:
      'For a look at how the model has held up against real disruption, not just a forward claim, read <a href="/analysis/model-validation-2024">We Built the Model on 2023 Data. Then 2024 Happened.</a>, a systematic account of what the model predicted against what actually occurred through the Red Sea and Panama disruptions.',
  },
  how: {
    eyebrow: 'How it works',
    title: 'Every assumption is stated. Every one is open to challenge.',
    body: 'The Narrows is a model run against specific corridors and commodities. Every parameter it uses is stated where it matters, so a reader who disagrees with an assumption can see exactly what to change.',
    principles: [
      '<strong>Assumptions are stated, not buried.</strong> Every output identifies the parameters behind it. A reader who disagrees with a default can see which parameter to change.',
      '<strong>Limitations are documented.</strong> The methodology page states clearly what the model does and does not do. A professional who understands the limits is better placed to use the outputs.',
      '<strong>The analysis precedes the conversation.</strong> The papers published on this site are model outputs applied to live events, with every assumption stated. They are published so that readers can evaluate the work.',
    ],
  },
  who: {
    eyebrow: 'Who built this',
    title: 'The methodology came from a different kind of risk work.',
    alt: 'Adam Fysh, independent researcher',
    p1Html:
      '<strong>Adam Fysh</strong> spent several years building quantitative risk frameworks within the United Nations system, working on disaster risk reduction and structural vulnerability analysis in fragile and trade-dependent economies. The work was always the same question in different forms: which bilateral dependencies concentrate the most risk, and what does a credible alternative actually cost.',
    p2: 'The transition to maritime trade risk follows directly from that background. The analytical structure that identifies which nations bear the greatest cost when a supply chain breaks also identifies which importers are most exposed when a trade corridor fails. The Narrows applies the same methodology to the geography of global trade.',
    p3: "The analysis published here is primary research. Every assumption is stated. The model reflects one person's careful view of what the data shows and what it does not.",
  },
  contact: {
    eyebrow: 'Contact',
    title: 'One address.',
    body: 'Press, corrections, research collaboration and methodology questions go to the same address.',
    label: 'Direct contact',
    sub: 'The Narrows · Independent maritime risk research · narrows.io',
  },
  cta: {
    html: 'You cannot always know what will happen at a chokepoint.<br>\n      <em>You can always know what you have riding on it.</em>',
  },
};

const nb = ' ';

const fr: typeof en = {
  title: 'Narrows | À propos',
  description:
    'The Narrows est un projet indépendant de recherche sur le risque commercial maritime : analyses publiées, modèle documenté et outils de démonstration.',
  hero: {
    eyebrow: 'À propos de The Narrows',
    titleHtml:
      'Le commerce mondial passe par un petit nombre de points physiques.<br>\n      <em>Ce qui les menace n’est pas toujours un risque de même nature.</em>',
    bodyHtml:
      'The Narrows mesure ce qu’un importateur, une cargaison ou une institution a en jeu sur un point de passage obligé donné, et ce que coûterait une alternative crédible. <strong>Ce chiffre reste valable que la perturbation prenne la forme d’une sécheresse, d’un blocus ou d’une décision prise par un gouvernement pour ses propres raisons.</strong> L’exposition est un fait structurel. Elle n’attend pas une probabilité pour devenir réelle.',
  },
  premise: {
    eyebrow: 'Le point de départ',
    title: 'Certains risques se modélisent à partir d’une distribution stable. D’autres relèvent d’une décision que quelqu’un d’autre est libre de prendre.',
    p1: `Un petit nombre de points concentrent une part démesurée du commerce mondial${nb}: détroits, canaux, ports sans véritable substitut. Tout le monde peut les voir sur une carte. La question plus difficile est de savoir ce qui y transite, et de quelle nature est réellement la menace.`,
    p2: 'Les intempéries, la congestion et les défaillances d’infrastructure sont des phénomènes physiques. Ils ont une véritable structure statistique, et le secteur dispose d’excellents outils pour chiffrer cette structure. La décision d’un gouvernement de fermer un détroit, de sanctionner un fournisseur ou de réorienter un oléoduc est un événement d’une autre nature : elle émane d’un acteur qui a ses propres intérêts et ne se tire pas d’une distribution. Traiter les deux de la même façon, attribuer à la fermeture d’un détroit le même type de probabilité annuelle qu’à une tempête qui touche terre, est une erreur de catégorie, et non un raffinement de modélisation.'.replace(' : elle', `${nb}: elle`),
    p3Html:
      `The Narrows ne cherche pas à prédire quel type de menace se concrétisera, ni quand. Il mesure ce qui est exposé dans les deux cas${nb}: quel importateur dépend de quel corridor, pour quelle marchandise, à hauteur de quel pourcentage de l’approvisionnement total, et ce que coûte une alternative crédible. <strong>Ce chiffre est le même que la perturbation soit une sécheresse ou une décision. L’exposition est un fait structurel. Elle n’a pas besoin d’une probabilité pour être réelle, ni pour être chiffrée.</strong>`,
  },
  name: {
    eyebrow: 'Le nom',
    title: 'Les points où le monde se resserre.',
    p1: `Le nom, « The Narrows » (en anglais, les passages étroits), désigne les points où les contraintes sont dures, où les données prennent un sens et où les décisions ne peuvent pas être différées. Un détroit par lequel passent 30${nb}% du commerce maritime mondial est un passage étroit. Un port qui traite l’essentiel des importations de céréales d’un pays est un passage étroit. Un corridor sans alternative viable est un passage étroit.`.replace('« The', '« The').replace('étroits) ', 'étroits) ').replace('Narrows »', 'Narrows »'),
    p2: 'En ces points, la structure du monde devient lisible. Les dépendances sont réelles. L’exposition est quantifiable. Les décisions qui découlent de leur compréhension ont des conséquences. C’est là que travaille The Narrows.',
  },
  work: {
    eyebrow: 'Le travail',
    title: 'Des recherches, des outils et un socle de données commun.',
    lead: `Tout repose sur un même modèle de fond, le Chokepoint Dependency Model${nb}: 37 corridors maritimes à risque, 2${nb}150 milliards de dollars d’échanges appariés, 44 pays importateurs et 17 classes de produits.`,
    validationHtml:
      'Pour voir comment le modèle a résisté à de véritables perturbations, et pas seulement à une affirmation tournée vers l’avenir, lisez <a href="/analysis/model-validation-2024">We Built the Model on 2023 Data. Then 2024 Happened.</a> (en anglais), un compte rendu systématique de ce que le modèle avait prévu au regard de ce qui s’est réellement produit lors des perturbations en mer Rouge et à Panama.',
  },
  how: {
    eyebrow: 'Fonctionnement',
    title: 'Chaque hypothèse est énoncée. Chacune peut être contestée.',
    body: 'The Narrows est un modèle appliqué à des corridors et à des marchandises précis. Chaque paramètre utilisé est indiqué là où il compte, de sorte qu’un lecteur en désaccord avec une hypothèse voit exactement ce qu’il faudrait modifier.',
    principles: [
      '<strong>Les hypothèses sont énoncées, pas enfouies.</strong> Chaque résultat indique les paramètres qui le sous-tendent. Un lecteur en désaccord avec une valeur par défaut voit quel paramètre modifier.',
      '<strong>Les limites sont documentées.</strong> La page de méthodologie indique clairement ce que le modèle fait et ne fait pas. Un professionnel qui en comprend les limites est mieux placé pour exploiter les résultats.',
      '<strong>L’analyse précède la conversation.</strong> Les articles publiés sur ce site sont des résultats du modèle appliqués à des événements d’actualité, chaque hypothèse étant énoncée. Ils sont publiés pour que les lecteurs puissent juger le travail.',
    ],
  },
  who: {
    eyebrow: 'L’auteur',
    title: 'La méthodologie vient d’un autre type de travail sur le risque.',
    alt: 'Adam Fysh, chercheur indépendant',
    p1Html:
      `<strong>Adam Fysh</strong> a passé plusieurs années à construire des cadres quantitatifs de risque au sein du système des Nations Unies, en travaillant sur la réduction des risques de catastrophe et sur l’analyse de la vulnérabilité structurelle dans des économies fragiles et dépendantes du commerce. La question restait toujours la même sous des formes différentes${nb}: quelles dépendances bilatérales concentrent le plus de risque, et que coûte réellement une alternative crédible${nb}?`,
    p2: 'Le passage au risque commercial maritime découle directement de ce parcours. La structure analytique qui identifie les nations supportant le coût le plus lourd lorsqu’une chaîne d’approvisionnement se rompt identifie aussi les importateurs les plus exposés lorsqu’un corridor commercial défaille. The Narrows applique la même méthodologie à la géographie du commerce mondial.',
    p3: 'Les analyses publiées ici sont des recherches originales. Chaque hypothèse est énoncée. Le modèle reflète le regard attentif d’une seule personne sur ce que montrent les données, et sur ce qu’elles ne montrent pas.',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Une seule adresse.',
    body: `Presse, corrections, collaborations de recherche et questions de méthodologie${nb}: une même adresse.`,
    label: 'Contact direct',
    sub: 'The Narrows · Recherche indépendante sur le risque maritime · narrows.io',
  },
  cta: {
    html: 'On ne peut pas toujours savoir ce qui se passera à un point de passage obligé.<br>\n      <em>On peut toujours savoir ce que l’on a en jeu.</em>',
  },
};

export const about = { en, fr };
