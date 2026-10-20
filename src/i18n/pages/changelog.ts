// Data changelog copy, English and French. Entries are listed most recent first.
// To add a correction: add one entry at the top of `entries` in BOTH languages
// (the fr array must have the same length as the en array), and update the
// hero count and "most recent" date. Also update the policy page
// ("Corrections logged") when you do.
// Public copy house style: no em-dashes, no contractions.
const nb = ' ';

const en = {
  title: 'Narrows | Data Changelog',
  description:
    "A dated, public record of every correction made to the data behind Narrows' chokepoint and port risk models.",
  hero: {
    eyebrow: 'Data Changelog',
    titleHtml: 'Every correction we have made,<br>\n        <em>dated, in one place.</em>',
    sub: 'A running record of corrections to the data behind the Chokepoint Dependency Model and the Port Risk Index. Updated as corrections happen, not on a schedule. A model with a visible history of catching and fixing its own errors is more trustworthy than one that claims never to have had any.',
    cov: [
      { label: 'Corrections logged, 2026', value: '19', unit: 'corrections' },
      { label: 'Most recent', value: '8 Oct', unit: '2026' },
      { label: 'Reported-tier exposure', value: '48.0', unit: '% of value' },
      { label: 'Dependency matrix rows', value: '1,812', unit: 'rows' },
    ],
  },
  about: {
    eyebrow: 'About this page',
    title: 'The public summary of every correction.',
    p: 'This is a running, dated record of corrections made to the data behind the Chokepoint Dependency Model and the Port Risk Index. Every entry below is real and complete in its own right: what changed, when, and what it affected.',
  },
  process: {
    eyebrow: 'Process',
    title: 'Two checks run continuously, not only when something looks wrong.',
    html: 'A structured spot audit checks a sample of country, commodity, and chokepoint combinations against independent public sources on a fixed schedule. A benchmark regression checks a fixed set of known reference figures after every model rebuild, so that a change made for one reason cannot silently move an unrelated figure without being caught. Full detail on both processes, including tier definitions and how to request an independent verification, is in our <a href="/data-verification-policy" style="color:var(--blue);">data verification policy</a>.',
  },
  corrections: {
    eyebrow: 'Corrections',
    title: 'The record, most recent first.',
  },
  entries: [
    {
      date: '8 October 2026, Port Risk Index corrections, logistics performance values, and display of risk bands',
      items: [
        "<strong>The logistics-performance values behind the Port Risk Index reliability dimension were partly wrong, and the same default had been applied to about 350 ports.</strong> The index uses the World Bank Logistics Performance Index to estimate dwell time for ports that have no measured figure. The table of national values in the build pipeline had been typed in by hand. Checked against the published 2023 report, only 32 of 129 typed values matched, and the average difference was 0.23 points. The table is now replaced with the published 2023 scores for all 139 countries in the report. A further 60 countries in the earlier table have no published score and keep their earlier value, marked as unverified until a source is found. The roughly 350 ports corrected on 6 October also had default values for logistics performance, dwell time, labour regime and port state control; those were re-derived from each port's own country.",
        '<strong>Effect.</strong> The logistics-performance value changed for 2,830 ports and the estimated dwell time for 1,450. The composite score changed for 1,605 ports, by 0.03 on average, with the largest rise 0.15 and the largest fall 0.30. North Korea and Comoros rose; ports in Iceland, the Faroe Islands, Svalbard and Niue fell. 34 ports moved between the score bands used in earlier versions.',
        '<strong>The Port Risk Index no longer shows risk bands.</strong> The map and the port chips used four named bands (Moderate, Elevated, High, Critical). These were removed from displays because the names implied a judgement that the score does not support. Ports now show their score, rank and percentile, and the map colour runs continuously with the percentile. The scores themselves are unchanged by this display change.',
        '<strong>One Joint War Committee listing flag was wrong.</strong> A Red Sea export port in Saudi Arabia was shown as not in a listed area. Saudi Arabia is a named country in the Joint War Committee list, so the port is listed. The listed-area outlines used in our internal map tool were also redrawn against the current circulars (JWLA-034 and JWLA-035). Every coordinate from the circular was already correct; the errors were in the closing lines we drew over land, and several named countries had been left out of our country list.',
      ],
    },
    {
      date: '6 October 2026, Port Risk Index corrections, country codes and conflict flags',
      items: [
        "<strong>About 350 of the 3,774 ports in the Port Risk Index were scored with a default governance and sanctions value instead of their own country's.</strong> These ports had no country code in the build pipeline, so the stability dimension fell back to the global median for political stability and government effectiveness, and to no sanctions. The affected countries include Haiti, North Korea, Burma, the Dominican Republic, Ireland, Iceland, Estonia, Liberia, Namibia and a number of island territories. For territories, the stability inputs now follow the sovereign state. The country codes were filled in and the stability dimension and composite score were recalculated for every affected port.",
        '<strong>The conflict and territorial dispute flags matched fewer than half of the ports they were meant to cover.</strong> The flags were matched by exact port name, but the index uses different spellings for many ports (for example Odesa, Al Mukalla, Al Ladhiqiyah), so ports such as Odesa, the Hodeidah area, Mukalla, Latakia and the Taiwan ports carried no flag. One flag also matched the wrong place: a town called Stanley in Tasmania was treated as the Falkland Islands. Flags are now matched by name within the right country or by location within 25 kilometres. The Tasmanian match was removed.',
        '<strong>Effect.</strong> 335 ports changed composite score and 41 changed risk tier. The Critical tier grew from 3 to 24 ports and the High tier from 51 to 73. Ports in stable, unsanctioned countries with a missing country code, such as Iceland and Ireland, moved slightly down. <strong>Not yet corrected:</strong> the same ports also carry a default logistics-performance value, which feeds the dwell-time estimate for ports that rely on the national formula. That will be corrected in a later entry.',
      ],
    },
    {
      date: '5 October 2026, a second correction, Panama routing',
      items: [
        '<strong>Asia to Europe and Asia to West Africa trade was counted as passing through the Panama Canal.</strong> The routing rules grouped every Atlantic-facing port into a single basin, so cargo moving between Asia and a European or West African Atlantic port was assigned a Panama leg, when the real routes run through the Strait of Malacca, Bab el-Mandeb, the Suez Canal and Gibraltar (Europe), or around the Cape of Good Hope (West Africa). The largest affected flows were containers, vehicles and electronics, for example China to Germany computers and Japan to Belgium cars. In total about 137 billion US dollars of annual trade value was moved off Panama, which takes Panama-routed trade in the model from roughly 348 billion to roughly 210 billion US dollars, every flow of which now has an American endpoint. No grain figure changed, and no figure for the tracked energy, ore and fertilizer commodities changed, because none of those flows had a European or West African Atlantic endpoint on a Panama route. The Panama analysis page no longer shows its all-commodity aggregate value at risk, which depended on the old routing base, and says so. A standing check now stops the release if any voyage transits Panama without an American exporter or importer. South American Atlantic countries were deliberately left as they were, because Panama, Cape Horn and the Cape of Good Hope are all live routes for them. Verified by a full rebuild in which every changed flow was a container, vehicle or electronics flow.',
      ],
    },
    {
      date: '5 October 2026, one correction found while reconciling published figures',
      items: [
        "<strong>Russian-origin cargo to India was counted as passing through the Strait of Hormuz.</strong> For one country pair, Russia to India, the model's generic routing assigned the Strait of Hormuz to every commodity except crude oil, which had been corrected earlier. Russian cargo has no route through the Strait of Hormuz, so the assignment was wrong. It affected about 7.2 billion US dollars of annual trade value across coal, refined petroleum, fertilizer and smaller commodities. The visible effect was that India's Hormuz dependency for nitrogenous fertilizer read 48.4 percent when the correct figure, checked against the underlying 2024 trade data, is 26.6 percent, and India's refined petroleum dependency read 69.1 percent when the corrected figure is 37.4 percent. Several analysis pages that cited India's fertilizer figures have been restated and carry a correction note. The corrected cargo is now assigned to the Black Sea exit at the Bosphorus, which matches the existing treatment of Russian crude to India, and this is a documented estimate: the Suez and Bab el-Mandeb legs of that journey are not yet modeled. A standing check now runs on every rebuild and stops the release if any voyage passes through the Strait of Hormuz, the Bosphorus, the Danish Straits, the Kiel Canal or the St. Lawrence without an exporter or importer in that region. Verified by a full rebuild in which only six India rows changed.",
      ],
    },
    {
      date: '21 August 2026, one correction found during a routine data refresh',
      items: [
        '<strong>Country names displayed as three letter codes for a small set of European figures.</strong> For eleven European countries, including Greece, Turkey, and the Netherlands, a specific data view was displaying the three letter country code instead of the full country name, for example GRC instead of Greece. This affected only the displayed name. The underlying dependency and value figures for these countries were correct throughout and did not change. Traced to a formatting issue in one upstream data file, corrected at the source, with a standing check added that will catch the same class of formatting issue automatically before any future rebuild. Verified directly against the corrected output.',
      ],
    },
    {
      date: '18 August 2026, three corrections following a scheduled internal audit',
      items: [
        '<strong>European crude oil duplicate figures.</strong> A data merge edge case caused certain European countries, including Greece, Germany, France, and Belgium, to have their crude oil dependency figures on the Strait of Hormuz counted twice under specific conditions. Found and corrected. Affected figures across our published analysis were updated the same day.',
        '<strong>Missing Cape of Good Hope routing option.</strong> Grain exports from a set of Atlantic basin countries, including Brazil and Argentina, were being modelled as routing through the Suez Canal toward Asian markets. In reality, this trade typically routes around the Cape of Good Hope instead. We added a corrected routing rule covering the affected exporters and verified it against known trade patterns, while confirming that unaffected countries on the same trade lane, including the United States, the Netherlands, and Germany, correctly retained their existing routing.',
        "<strong>A data formatting inconsistency affecting a small number of figures.</strong> Found while verifying the correction above: a data type inconsistency in how commodity codes were read from different source files, which had been slightly overstating a handful of figures. Clearest example: China's crude oil dependency on the Strait of Malacca had been reading 46.3 percent, and is now confirmed at 46.2 percent, matching the figure independently published elsewhere. Fixed at the source and verified by rerunning the full pipeline twice, confirming identical results both times.",
      ],
    },
    {
      date: '13 August 2026, one correction found during a routine pipeline update',
      items: [
        "While adding new commodity coverage, a routine internal check found that under certain conditions our pipeline could select conflicting versions of the same underlying trade record, which affected a small number of dependency figures. Clearest symptom: two countries' iron ore dependency briefly read above 100 percent, a mathematically impossible value that our own benchmark check flagged before anything was published externally. We rebuilt the affected calculation so that it always produces the same result from the same input data, and verified this by rerunning the pipeline twice and confirming byte for byte identical output.",
      ],
    },
    {
      date: '10 July 2026, seven corrections over two days, plus a naming correction',
      items: [
        'Across a two day period, seven corrections were made to the model, ranging from a data confidence reclassification affecting five commodities to a larger routing correction affecting over sixty billion dollars of surfaced trade value across sixteen countries. A further, separate change corrected the naming of our own confidence tier system.',
      ],
    },
  ],
  earlier: {
    quote: '"Earlier corrections" is not a euphemism for hidden. It means reviewed to a lower publication standard than the entries above, not withheld.',
    p: 'The entries above are not where our correction record begins. The model has an internal engineering history reaching back through its initial build, with well over one hundred individually numbered corrections made during that period, covering routing logic, coverage gaps, and data quality issues found in the ordinary course of extending and hardening the model. That earlier record exists and is retained in full internally. We are working through it to bring it up to the same publication standard as the entries above, rather than publish a rough summary of periods we have not yet reviewed to that standard.',
    tail: 'Until that work is complete, no summary of those earlier periods is published.',
  },
  coverage: {
    title: 'Where each data tier sits, by row and by value.',
    p: 'Counted by row, Estimated is the largest tier, concentrated in the long tail of smaller bilateral flows where official reporting is thinnest. Counted by the dollar value those rows represent, the picture reverses: Reported-tier rows carry the largest share of total modelled exposure. The flows with the most money behind them are disproportionately the ones with the strongest sourcing.',
    noteTail: 'Full tier definitions are in our data verification policy.',
  },
  scope: {
    eyebrow: 'Scope',
    title: 'What this record intentionally does not include.',
    p: 'This page does not include every internal check that found nothing wrong. Those checks happen on a fixed schedule regardless of whether an anomaly is suspected, and their results are logged internally. It also does not include the full technical mechanics behind each correction.',
    tail: 'That level of detail is not published.',
  },
  contact: {
    title: 'Questions and corrections.',
    body: 'If you believe a figure is wrong, please write. Confirmed corrections are added to this page.',
  },
};

const fr: typeof en = {
  title: 'Narrows | Journal des corrections de données',
  description:
    'Un relevé public et daté de chaque correction apportée aux données qui sous-tendent les modèles de risque de Narrows sur les points de passage et les ports.',
  hero: {
    eyebrow: 'Journal des données',
    titleHtml: 'Chaque correction que nous avons apportée,<br>\n        <em>datée, au même endroit.</em>',
    sub: 'Un relevé continu des corrections apportées aux données qui sous-tendent le Chokepoint Dependency Model et le Port Risk Index. Mis à jour au fil des corrections, et non selon un calendrier. Un modèle dont l’historique montre qu’il détecte et corrige ses propres erreurs est plus digne de confiance qu’un modèle qui prétend n’en avoir jamais eu.',
    cov: [
      { label: 'Corrections consignées, 2026', value: '19', unit: 'corrections' },
      { label: 'La plus récente', value: '8 oct.', unit: '2026' },
      { label: 'Exposition de niveau Déclaré', value: '48,0', unit: `${nb}% de la valeur` },
      { label: 'Lignes de la matrice de dépendance', value: `1${nb}812`, unit: 'lignes' },
    ],
  },
  about: {
    eyebrow: 'À propos de cette page',
    title: 'Le résumé public de chaque correction.',
    p: `Il s’agit d’un relevé daté et continu des corrections apportées aux données qui sous-tendent le Chokepoint Dependency Model et le Port Risk Index. Chaque entrée ci-dessous est réelle et complète en elle-même${nb}: ce qui a changé, quand, et ce que cela a touché.`,
  },
  process: {
    eyebrow: 'Processus',
    title: 'Deux contrôles tournent en continu, pas seulement quand quelque chose paraît anormal.',
    html: 'Un audit ponctuel structuré vérifie, selon un calendrier fixe, un échantillon de combinaisons pays, produit et point de passage au regard de sources publiques indépendantes. Une régression sur valeurs de référence contrôle un ensemble fixe de chiffres de référence connus après chaque reconstruction du modèle, afin qu’une modification faite pour une raison donnée ne puisse pas déplacer discrètement un chiffre sans rapport sans être détectée. Le détail des deux processus, y compris les définitions des niveaux et la façon de demander une vérification indépendante, figure dans notre <a href="/data-verification-policy" style="color:var(--blue);">politique de vérification des données</a>.',
  },
  corrections: {
    eyebrow: 'Corrections',
    title: 'Le relevé, de la plus récente à la plus ancienne.',
  },
  entries: [
    {
      date: '8 octobre 2026, corrections de l’indice de risque portuaire, valeurs de performance logistique et affichage des bandes de risque',
      items: [
        '<strong>Les valeurs de performance logistique qui sous-tendent la dimension de fiabilité de l’indice de risque portuaire étaient en partie erronées, et la même valeur par défaut avait été appliquée à environ 350 ports.</strong> L’indice utilise l’indice de performance logistique (LPI) de la Banque mondiale pour estimer le temps de séjour des ports pour lesquels aucune mesure n’existe. Le tableau des valeurs nationales du pipeline de construction avait été saisi à la main. Comparé au rapport 2023 publié, seules 32 des 129 valeurs saisies correspondaient, et l’écart moyen était de 0,23 point. Le tableau est désormais remplacé par les scores 2023 publiés pour les 139 pays du rapport. Pour 60 autres pays de l’ancien tableau, aucun score n’est publié : ils conservent leur valeur antérieure, signalée comme non vérifiée tant qu’aucune source n’est trouvée. Les quelque 350 ports corrigés le 6 octobre avaient aussi des valeurs par défaut pour la performance logistique, le temps de séjour, le régime du travail et le contrôle par l’État du port ; elles ont été recalculées à partir du pays de chaque port.',
        '<strong>Effet.</strong> La valeur de performance logistique a changé pour 2' + nb + '830 ports et le temps de séjour estimé pour 1' + nb + '450. Le score composite a changé pour 1' + nb + '605 ports, de 0,03 en moyenne, avec une hausse maximale de 0,15 et une baisse maximale de 0,30. Le score de la Corée du Nord et des Comores a augmenté ; celui des ports d’Islande, des îles Féroé, du Svalbard et de Niue a diminué. 34 ports ont changé de bande de score parmi celles utilisées dans les versions antérieures.',
        '<strong>L’indice de risque portuaire n’affiche plus de bandes de risque.</strong> La carte et les pastilles de ports utilisaient quatre bandes nommées (Modéré, Élevé, Haut, Critique). Elles ont été retirées de l’affichage parce que ces noms impliquaient un jugement que le score ne permet pas d’étayer. Les ports affichent désormais leur score, leur rang et leur centile, et la couleur de la carte varie de façon continue avec le centile. Les scores eux-mêmes ne sont pas modifiés par ce changement d’affichage.',
        '<strong>Un indicateur d’inscription au Joint War Committee était erroné.</strong> Un port d’exportation de la mer Rouge, en Arabie saoudite, apparaissait comme situé hors d’une zone listée. L’Arabie saoudite est un pays nommé dans la liste du Joint War Committee ; le port est donc listé. Les contours des zones listées utilisés dans notre outil cartographique interne ont aussi été redessinés d’après les circulaires en vigueur (JWLA-034 et JWLA-035). Chaque coordonnée de la circulaire était déjà correcte ; les erreurs se trouvaient dans les lignes de fermeture que nous avions tracées sur la terre ferme, et plusieurs pays nommés avaient été omis de notre liste de pays.',
      ],
    },
    {
      date: '6 octobre 2026, corrections de l’indice de risque portuaire, codes pays et indicateurs de conflit',
      items: [
        '<strong>Environ 350 des 3' + nb + '774 ports de l’indice de risque portuaire étaient notés avec une valeur par défaut de gouvernance et de sanctions au lieu de celle de leur propre pays.</strong> Ces ports n’avaient pas de code pays dans le pipeline de construction ; la dimension de stabilité retombait donc sur la médiane mondiale pour la stabilité politique et l’efficacité du gouvernement, et sur l’absence de sanctions. Parmi les pays concernés : Haïti, la Corée du Nord, la Birmanie, la République dominicaine, l’Irlande, l’Islande, l’Estonie, le Liberia, la Namibie et plusieurs territoires insulaires. Pour les territoires, les données de stabilité suivent désormais l’État souverain. Les codes pays ont été renseignés, et la dimension de stabilité et le score composite ont été recalculés pour chaque port concerné.',
        '<strong>Les indicateurs de conflit et de différend territorial couvraient moins de la moitié des ports qu’ils devaient viser.</strong> Les indicateurs étaient rapprochés par nom exact de port, mais l’indice utilise des graphies différentes pour de nombreux ports (par exemple Odesa, Al Mukalla, Al Ladhiqiyah) ; des ports comme Odessa, la zone de Hodeïda, Mukalla, Lattaquié et les ports taïwanais n’avaient donc aucun indicateur. Un indicateur désignait aussi le mauvais lieu : une ville appelée Stanley, en Tasmanie, était traitée comme les îles Falkland. Les indicateurs sont désormais rapprochés par nom au sein du bon pays ou par localisation à moins de 25 kilomètres. Le rapprochement tasmanien a été supprimé.',
        '<strong>Effet.</strong> 335 ports ont changé de score composite et 41 de niveau de risque. Le niveau Critique est passé de 3 à 24 ports et le niveau Haut de 51 à 73. Les ports de pays stables et non sanctionnés dont le code pays manquait, comme l’Islande et l’Irlande, ont vu leur score baisser légèrement. <strong>Pas encore corrigé :</strong> les mêmes ports portent aussi une valeur par défaut de performance logistique, qui alimente l’estimation du temps de séjour pour les ports s’appuyant sur la formule nationale. Cela sera corrigé dans une entrée ultérieure.',
      ],
    },
    {
      date: '5 octobre 2026, une deuxième correction, le routage par Panama',
      items: [
        '<strong>Le commerce Asie-Europe et Asie-Afrique de l’Ouest était compté comme transitant par le canal de Panama.</strong> Les règles de routage regroupaient tous les ports donnant sur l’Atlantique dans un seul bassin ; une cargaison circulant entre l’Asie et un port atlantique européen ou ouest-africain se voyait donc attribuer un tronçon par Panama, alors que les routes réelles passent par le détroit de Malacca, Bab el-Mandeb, le canal de Suez et Gibraltar (Europe), ou autour du cap de Bonne-Espérance (Afrique de l’Ouest). Les flux les plus touchés étaient les conteneurs, les véhicules et l’électronique, par exemple les ordinateurs de la Chine vers l’Allemagne et les voitures du Japon vers la Belgique. Au total, environ 137 milliards de dollars américains d’échanges annuels ont été retirés de Panama, ce qui ramène le commerce acheminé par Panama dans le modèle d’environ 348 milliards à environ 210 milliards de dollars américains, dont chaque flux a désormais une extrémité américaine. Aucun chiffre sur les céréales n’a changé, et aucun chiffre sur les produits énergétiques, les minerais et les engrais suivis n’a changé, car aucun de ces flux n’avait d’extrémité atlantique européenne ou ouest-africaine sur une route par Panama. La page d’analyse sur Panama n’affiche plus sa valeur à risque agrégée tous produits, qui dépendait de l’ancienne base de routage, et le précise. Un contrôle permanent bloque désormais la publication si un voyage transite par Panama sans exportateur ou importateur américain. Les pays atlantiques d’Amérique du Sud ont volontairement été laissés tels quels, car Panama, le cap Horn et le cap de Bonne-Espérance sont tous des routes réelles pour eux. Vérifié par une reconstruction complète dans laquelle chaque flux modifié était un flux de conteneurs, de véhicules ou d’électronique.',
      ],
    },
    {
      date: '5 octobre 2026, une correction trouvée lors du rapprochement des chiffres publiés',
      items: [
        '<strong>Les cargaisons d’origine russe à destination de l’Inde étaient comptées comme transitant par le détroit d’Ormuz.</strong> Pour une seule paire de pays, la Russie vers l’Inde, le routage générique du modèle attribuait le détroit d’Ormuz à tous les produits sauf le pétrole brut, déjà corrigé auparavant. Les cargaisons russes n’ont aucune route passant par le détroit d’Ormuz ; l’affectation était donc erronée. Elle touchait environ 7,2 milliards de dollars américains d’échanges annuels de charbon, de produits pétroliers raffinés, d’engrais et de produits plus modestes. L’effet visible était que la dépendance de l’Inde à Ormuz pour les engrais azotés s’affichait à 48,4' + nb + '% alors que le chiffre correct, vérifié sur les données commerciales 2024 sous-jacentes, est de 26,6' + nb + '%, et que la dépendance de l’Inde pour les produits pétroliers raffinés s’affichait à 69,1' + nb + '% alors que le chiffre corrigé est de 37,4' + nb + '%. Plusieurs pages d’analyse citant les chiffres de l’Inde sur les engrais ont été corrigées et portent une note de correction. La cargaison corrigée est désormais affectée à la sortie de la mer Noire par le Bosphore, ce qui correspond au traitement existant du brut russe vers l’Inde ; il s’agit d’une estimation documentée : les tronçons de Suez et de Bab el-Mandeb de ce voyage ne sont pas encore modélisés. Un contrôle permanent s’exécute désormais à chaque reconstruction et bloque la publication si un voyage passe par le détroit d’Ormuz, le Bosphore, les détroits danois, le canal de Kiel ou le Saint-Laurent sans exportateur ou importateur dans cette région. Vérifié par une reconstruction complète dans laquelle seules six lignes concernant l’Inde ont changé.',
      ],
    },
    {
      date: '21 août 2026, une correction trouvée lors d’une actualisation de routine des données',
      items: [
        '<strong>Noms de pays affichés sous forme de codes à trois lettres pour un petit ensemble de chiffres européens.</strong> Pour onze pays européens, dont la Grèce, la Turquie et les Pays-Bas, une vue de données précise affichait le code pays à trois lettres au lieu du nom complet, par exemple GRC au lieu de Grèce. Seul le nom affiché était touché. Les chiffres sous-jacents de dépendance et de valeur de ces pays étaient corrects depuis le début et n’ont pas changé. Origine : un problème de format dans un fichier de données amont, corrigé à la source, avec l’ajout d’un contrôle permanent qui détectera automatiquement ce type de problème de format avant toute reconstruction future. Vérifié directement sur le résultat corrigé.',
      ],
    },
    {
      date: '18 août 2026, trois corrections à la suite d’un audit interne programmé',
      items: [
        '<strong>Chiffres dupliqués pour le pétrole brut européen.</strong> Un cas limite de fusion de données faisait compter deux fois, dans certaines conditions, les chiffres de dépendance au détroit d’Ormuz pour le pétrole brut de certains pays européens, dont la Grèce, l’Allemagne, la France et la Belgique. Trouvé et corrigé. Les chiffres concernés dans l’ensemble de nos analyses publiées ont été mis à jour le jour même.',
        '<strong>Option de routage par le cap de Bonne-Espérance manquante.</strong> Les exportations de céréales d’un ensemble de pays du bassin atlantique, dont le Brésil et l’Argentine, étaient modélisées comme passant par le canal de Suez vers les marchés asiatiques. En réalité, ce commerce passe généralement par le cap de Bonne-Espérance. Nous avons ajouté une règle de routage corrigée couvrant les exportateurs concernés et l’avons vérifiée par rapport aux flux commerciaux connus, tout en confirmant que les pays non concernés sur le même axe, dont les États-Unis, les Pays-Bas et l’Allemagne, conservaient correctement leur routage existant.',
        '<strong>Une incohérence de format de données affectant un petit nombre de chiffres.</strong> Découverte en vérifiant la correction ci-dessus : une incohérence de type de données dans la façon dont les codes de produits étaient lus dans différents fichiers sources, qui avait légèrement surestimé une poignée de chiffres. Exemple le plus net : la dépendance du pétrole brut chinois au détroit de Malacca s’affichait à 46,3' + nb + '% et est désormais confirmée à 46,2' + nb + '%, ce qui correspond au chiffre publié indépendamment ailleurs. Corrigé à la source et vérifié en relançant deux fois le pipeline complet, avec des résultats identiques les deux fois.',
      ],
    },
    {
      date: '13 août 2026, une correction trouvée lors d’une mise à jour de routine du pipeline',
      items: [
        'Lors de l’ajout d’une nouvelle couverture de produits, un contrôle interne de routine a constaté que, dans certaines conditions, notre pipeline pouvait sélectionner des versions contradictoires d’un même enregistrement commercial sous-jacent, ce qui affectait un petit nombre de chiffres de dépendance. Symptôme le plus net : la dépendance de deux pays au minerai de fer dépassait brièvement 100' + nb + '%, une valeur mathématiquement impossible que notre propre contrôle de référence a signalée avant toute publication externe. Nous avons reconstruit le calcul concerné pour qu’il produise toujours le même résultat à partir des mêmes données d’entrée, et l’avons vérifié en relançant deux fois le pipeline et en confirmant une sortie identique octet pour octet.',
      ],
    },
    {
      date: '10 juillet 2026, sept corrections en deux jours, plus une correction de nomenclature',
      items: [
        'Sur une période de deux jours, sept corrections ont été apportées au modèle, allant d’une reclassification du niveau de confiance touchant cinq produits à une correction de routage plus importante portant sur plus de soixante milliards de dollars d’échanges mis en évidence, dans seize pays. Un changement distinct a en outre corrigé la dénomination de notre propre système de niveaux de confiance.',
      ],
    },
  ],
  earlier: {
    quote: `«${nb}Corrections antérieures${nb}» n’est pas un euphémisme pour «${nb}cachées${nb}». Cela signifie examinées selon un standard de publication moins exigeant que celui des entrées ci-dessus, et non dissimulées.`,
    p: 'Les entrées ci-dessus ne marquent pas le début de notre historique de corrections. Le modèle a une histoire d’ingénierie interne qui remonte à sa construction initiale, avec bien plus d’une centaine de corrections numérotées individuellement durant cette période, portant sur la logique de routage, les lacunes de couverture et des problèmes de qualité des données trouvés dans le cours normal de l’extension et du durcissement du modèle. Cet historique existe et est conservé intégralement en interne. Nous le reprenons pour l’amener au même standard de publication que les entrées ci-dessus, plutôt que de publier un résumé approximatif de périodes que nous n’avons pas encore examinées à ce standard.',
    tail: 'Tant que ce travail n’est pas terminé, aucun résumé de ces périodes antérieures n’est publié.',
  },
  coverage: {
    title: 'Où se situe chaque niveau de données, en nombre de lignes et en valeur.',
    p: `En nombre de lignes, le niveau Estimé est le plus important, concentré dans la longue traîne des flux bilatéraux plus modestes, là où la déclaration officielle est la plus mince. En valeur en dollars, le tableau s’inverse${nb}: les lignes de niveau Déclaré portent la plus grande part de l’exposition modélisée totale. Les flux qui représentent le plus d’argent sont, de façon disproportionnée, ceux dont les sources sont les plus solides.`,
    noteTail: 'Les définitions complètes des niveaux figurent dans notre politique de vérification des données.',
  },
  scope: {
    eyebrow: 'Périmètre',
    title: 'Ce que ce relevé n’inclut volontairement pas.',
    p: 'Cette page n’inclut pas chaque contrôle interne qui n’a rien trouvé d’anormal. Ces contrôles ont lieu selon un calendrier fixe, qu’une anomalie soit soupçonnée ou non, et leurs résultats sont consignés en interne. Elle n’inclut pas non plus tout le détail technique de chaque correction.',
    tail: 'Ce niveau de détail n’est pas publié.',
  },
  contact: {
    title: 'Questions et corrections.',
    body: 'Si vous pensez qu’un chiffre est erroné, écrivez-nous. Les corrections confirmées sont ajoutées à cette page.',
  },
};

export const changelog = { en, fr };
