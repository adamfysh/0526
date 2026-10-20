// Data verification policy copy, English and French (non-commercial wording).
// Public copy house style: no em-dashes, no contractions.
const nb = ' ';

const en = {
  title: 'Narrows | Data Verification Policy',
  description:
    'How Narrows sources, tiers, and verifies the trade and routing data behind the Chokepoint Dependency Model and the Port Risk Index.',
  hero: {
    eyebrow: 'Data Verification Policy',
    titleHtml: 'How confident to be in any figure,<br>\n        <em>and how to ask for more.</em>',
    sub: 'How Narrows sources, tiers, and verifies the trade and routing data behind the Chokepoint Dependency Model and the Port Risk Index.',
    subTail: 'Written for anyone relying on the figures published on this site.',
    cov: [
      { label: 'Data tiers', value: '3', unit: 'tiers' },
      { label: 'Reported-tier exposure', value: '48.0', unit: '% of value' },
      { label: 'Dependency matrix rows', value: '1,812', unit: 'rows' },
      { label: 'Corrections logged', value: '19', unit: 'as of Oct 2026' },
    ],
  },
  purpose: {
    eyebrow: 'Purpose',
    title: 'Every figure carries a tier. The tier is never hidden.',
    p: 'This page explains how Narrows sources, tiers, and verifies the trade and routing data behind the Chokepoint Dependency Model and the Port Risk Index. It exists so that a reader relying on this data can see how confident to be in any given figure, and how to ask for more.',
  },
  tiers: {
    eyebrow: 'Data tiers',
    title: 'Three tiers. Shown on every row, in the tool and in every export.',
    p: 'Every figure in the model carries one of three tiers. The tier reflects how the underlying value was sourced, not how important or how large it is.',
  },
  coverage: {
    title: 'Where each tier sits, by row and by value.',
    p: 'Counted by row, Estimated is the largest tier, concentrated in the long tail of smaller bilateral flows where official reporting is thinnest. Counted by the dollar value those rows represent, the picture reverses: Reported-tier rows carry the largest share of total modelled exposure. The flows with the most money behind them are disproportionately the ones with the strongest sourcing. We publish this breakdown both ways rather than a single confidence claim, so a reader can judge how their own specific exposure sits, not take our word for the average.',
  },
  process: {
    eyebrow: 'Process',
    title: 'Two checks run continuously, not only when something looks wrong.',
    p1: '<strong>Structured spot audits.</strong> A sample of country, commodity, and chokepoint combinations is checked against independent public sources on a fixed schedule, not only when an anomaly is reported. Each audit is logged internally: what was checked, what was found, and what was corrected.',
    p2: '<strong>Benchmark regression.</strong> A fixed set of known reference figures is checked after every model rebuild, so that a change made for one reason cannot silently move an unrelated figure without being caught.',
    p3: `Every correction, however small, is logged with a date, a description of what changed, the scope of countries or commodities affected, and the value impact. A public summary of this log is published as our <a href="/data-changelog" style="color:var(--blue);">data changelog</a>, updated as corrections happen. The full internal log, including root cause detail and code level verification steps, is not published in full, for the same reason a pricing model's full workings are not published: the audit trail is the demonstration of rigor, not the underlying method.`,
    quote: 'A model with a visible history of catching and fixing its own errors is more trustworthy than one that claims never to have had any.',
  },
  requests: {
    eyebrow: 'Requests',
    title: 'Any figure can be independently checked on request.',
    p1: 'A specific country, commodity, or chokepoint figure can be independently checked on request. This produces a short verification note covering: the source of the figure, the tier it carries, the date it was last checked, and the result of a fresh spot check against an independent source if one has not been run recently for that combination.',
    p2: 'This is offered rather than a copy of the internal log because most of the value in a verification request is the answer, not the archive.',
  },
  track: {
    eyebrow: 'Track record',
    title: 'The current record lives on the changelog, not restated here.',
    p: `As of 8 October 2026, our <a href="/data-changelog" style="color:var(--blue);">data changelog</a> is the current, dated record of every correction made to this model, updated as corrections happen. Recent activity includes seven corrections closed between 5 and 8 October 2026, following five between 13 and 21 August and seven made in early July.`,
  },
  contact: {
    title: 'Questions and corrections.',
    body: 'If you believe a figure is wrong, please write. Confirmed corrections are recorded on the data changelog.',
  },
};

const fr: typeof en = {
  title: 'Narrows | Politique de vérification des données',
  description:
    'Comment Narrows s’approvisionne en données commerciales et de routage, les classe par niveau et les vérifie, pour le Chokepoint Dependency Model et le Port Risk Index.',
  hero: {
    eyebrow: 'Politique de vérification des données',
    titleHtml: `Quel degré de confiance accorder à chaque chiffre,<br>\n        <em>et comment en demander davantage.</em>`,
    sub: 'Comment Narrows s’approvisionne en données commerciales et de routage, les classe par niveau et les vérifie, pour le Chokepoint Dependency Model et le Port Risk Index.',
    subTail: 'Écrit pour quiconque s’appuie sur les chiffres publiés sur ce site.',
    cov: [
      { label: 'Niveaux de données', value: '3', unit: 'niveaux' },
      { label: 'Exposition de niveau Déclaré', value: '48,0', unit: `${nb}% de la valeur` },
      { label: 'Lignes de la matrice de dépendance', value: `1${nb}812`, unit: 'lignes' },
      { label: 'Corrections consignées', value: '19', unit: 'au 8 octobre 2026' },
    ],
  },
  purpose: {
    eyebrow: 'Objet',
    title: 'Chaque chiffre porte un niveau. Le niveau n’est jamais masqué.',
    p: 'Cette page explique comment Narrows s’approvisionne en données commerciales et de routage, les classe par niveau et les vérifie, pour le Chokepoint Dependency Model et le Port Risk Index. Elle existe pour qu’un lecteur qui s’appuie sur ces données puisse voir quel degré de confiance accorder à chaque chiffre, et comment en demander davantage.',
  },
  tiers: {
    eyebrow: 'Niveaux de données',
    title: 'Trois niveaux. Indiqués sur chaque ligne, dans l’outil comme dans chaque export.',
    p: 'Chaque chiffre du modèle porte l’un de trois niveaux. Le niveau reflète la manière dont la valeur sous-jacente a été obtenue, et non son importance ou sa taille.',
  },
  coverage: {
    title: 'Où se situe chaque niveau, en nombre de lignes et en valeur.',
    p: `En nombre de lignes, le niveau Estimé est le plus important, concentré dans la longue traîne des flux bilatéraux plus modestes, là où la déclaration officielle est la plus mince. En valeur en dollars, le tableau s’inverse${nb}: les lignes de niveau Déclaré portent la plus grande part de l’exposition modélisée totale. Les flux qui représentent le plus d’argent sont, de façon disproportionnée, ceux dont les sources sont les plus solides. Nous publions cette répartition dans les deux sens plutôt qu’une seule affirmation de confiance, afin que le lecteur puisse juger où se situe sa propre exposition, sans nous croire sur parole pour la moyenne.`,
  },
  process: {
    eyebrow: 'Processus',
    title: 'Deux contrôles tournent en continu, pas seulement quand quelque chose paraît anormal.',
    p1: `<strong>Audits ponctuels structurés.</strong> Un échantillon de combinaisons pays, produit et point de passage est vérifié, selon un calendrier fixe, au regard de sources publiques indépendantes, et pas seulement lorsqu’une anomalie est signalée. Chaque audit est consigné en interne${nb}: ce qui a été vérifié, ce qui a été constaté et ce qui a été corrigé.`,
    p2: '<strong>Régression sur valeurs de référence.</strong> Un ensemble fixe de chiffres de référence connus est contrôlé après chaque reconstruction du modèle, afin qu’une modification faite pour une raison donnée ne puisse pas déplacer discrètement un chiffre sans rapport sans être détectée.',
    p3: `Chaque correction, même minime, est consignée avec une date, une description de ce qui a changé, le périmètre des pays ou des produits concernés et l’impact en valeur. Un résumé public de ce journal est publié sous la forme de notre <a href="/data-changelog" style="color:var(--blue);">journal des corrections de données</a>, mis à jour au fil des corrections. Le journal interne complet, avec le détail des causes profondes et les étapes de vérification au niveau du code, n’est pas publié intégralement, pour la même raison qu’on ne publie pas tout le détail d’un modèle de tarification${nb}: la piste d’audit démontre la rigueur, pas la méthode sous-jacente.`,
    quote: 'Un modèle dont l’historique montre qu’il détecte et corrige ses propres erreurs est plus digne de confiance qu’un modèle qui prétend n’en avoir jamais eu.',
  },
  requests: {
    eyebrow: 'Demandes',
    title: 'Tout chiffre peut être vérifié de façon indépendante sur demande.',
    p1: `Un chiffre précis, pour un pays, un produit ou un point de passage, peut être vérifié de façon indépendante sur demande. Cela donne une courte note de vérification qui indique${nb}: la source du chiffre, le niveau qu’il porte, la date de sa dernière vérification et le résultat d’un nouveau contrôle ponctuel auprès d’une source indépendante, si aucun n’a été réalisé récemment pour cette combinaison.`,
    p2: 'Cette offre remplace la communication d’une copie du journal interne, car l’essentiel de la valeur d’une demande de vérification est la réponse, pas l’archive.',
  },
  track: {
    eyebrow: 'Historique',
    title: 'Le relevé à jour se trouve dans le journal des corrections, sans être répété ici.',
    p: `Au 8 octobre 2026, notre <a href="/data-changelog" style="color:var(--blue);">journal des corrections de données</a> est le relevé daté et à jour de chaque correction apportée à ce modèle, mis à jour au fil des corrections. L’activité récente comprend sept corrections closes entre le 5 et le 8 octobre 2026, après cinq corrections entre le 13 et le 21 août et sept corrections début juillet.`,
  },
  contact: {
    title: 'Questions et corrections.',
    body: 'Si vous pensez qu’un chiffre est erroné, écrivez-nous. Les corrections confirmées sont consignées dans le journal des corrections de données.',
  },
};

export const policy = { en, fr };
