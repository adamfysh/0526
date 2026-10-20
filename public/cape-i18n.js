/* cape-i18n.js -- French layer for the CAPE tool (public/cape.html)
 * ?lang=fr switches it on. English pages ignore everything below the helpers.
 * Rules (see docs/I18N.md):
 *  - Data that flows from the tools is bilingual at source (cape_fleet_feed.json, cape_ports_feed.json carry {en, fr}).
 *  - Interface text: exact English string -> French in STATIC / DYN. A text node that matches is translated.
 *  - Interpolated sentences use L(en, fr) in cape.html.
 *  - Numbers: decimal comma, non-breaking spaces; money as "12,3 M$" / "1,2 Md$".
 *  - Public copy house style: no em-dashes, no contractions in English.
 * scripts/check-cape-i18n.mjs renders the tool in French and fails on untranslated English.
 */
(function () {
  var FR = /(?:\?|&)lang=fr(?:&|$)/.test(location.search);
  window.CAPE_FR = FR;
  window.LX = function (en, fr) { return FR ? fr : en; };
  window.T = function (s) { return s; };
  if (!FR) return;
  var NB = ' ';
  var STATIC = {
 "Corridor Accumulation and Portfolio Exposure": "Accumulation par corridor et exposition d’un portefeuille",
 "Named scenario": "Scénario nommé",
 "Historical, calibration use. Bab-el-Mandeb, 180+ days, 70% restriction. Ongoing since Dec 2023 Houthi attacks on commercial shipping. T1.": "Historique, usage de calibrage. Bab-el-Mandeb, plus de 180 jours, restriction de 70 %. Attaques houthies contre le transport maritime commercial depuis décembre 2023. T1.",
 "Red Sea 2024": "Mer Rouge 2024",
 "Historical, calibration use. Panama, 90 days, 50% restriction. Gatun Lake water levels; canal daily transits cut from 36 to 18. T1.": "Historique, usage de calibrage. Panama, 90 jours, restriction de 50 %. Niveau du lac Gatún : transits quotidiens du canal ramenés de 36 à 18. T1.",
 "Panama drought 2023-24": "Sécheresse de Panama 2023-2024",
 "Historical, calibration use. Suez, 6 days, full blockage. Single vessel grounding, 369 vessels queued. T1.": "Historique, usage de calibrage. Suez, 6 jours, blocage total. Échouement d’un seul navire, 369 navires en attente. T1.",
 "Live, ongoing. Hormuz, effectively closed since Feb 28 2026, no sign of cooling. ACLED override to CRITICAL, 2026-09-09 review.": "En direct, en cours. Ormuz, de fait fermé depuis le 28 février 2026, sans signe d’apaisement. Reclassement ACLED en CRITIQUE, revue du 9 septembre 2026.",
 "Hormuz closure (live, ongoing)": "Fermeture d’Ormuz (en cours)",
 "Stress test, hypothetical. Modelled via Malacca (our proxy for Malacca/SCS trade), 60-180 days, variable severity. Prediction-market-derived 10-20% over 2 years. Exposure is concentrated at Fujian-facing ports, not evenly spread across Chinese trade -- see note below.": "Test de résistance, hypothétique. Modélisé via Malacca (notre approximation du commerce Malacca/mer de Chine méridionale), 60 à 180 jours, gravité variable. Probabilité de 10 à 20 % sur 2 ans dérivée de marchés prédictifs. L’exposition se concentre sur les ports faisant face au Fujian, et non sur l’ensemble du commerce chinois (voir la note ci-dessous).",
 "Taiwan Strait crisis": "Crise du détroit de Taïwan",
 "Stress test, hypothetical. Hormuz shown; pair with Bab-el-Mandeb manually to see the full compound picture, both corridors share the Iran-Houthi driver. Multi-corridor cascade, worst case for accumulation.": "Test de résistance, hypothétique. Ormuz affiché ; associez Bab-el-Mandeb manuellement pour voir l’effet composé complet : les deux corridors partagent le même facteur Iran-Houthis. Cascade multi-corridors, pire cas pour l’accumulation.",
 "Multi-corridor cascade": "Cascade multi-corridors",
 "Hormuz": "Ormuz",
 "Bosphorus": "Bosphore",
 "Danish Straits": "Détroits danois",
 "Duration": "Durée",
 "days": "jours",
 "Closure rate": "Taux de fermeture",
 "Complete cessation. No vessels transit.": "Arrêt complet. Aucun navire ne transite.",
 "Full closure": "Fermeture totale",
 "Capacity halved. Delays and escort requirements.": "Capacité réduite de moitié. Retards et obligation d’escorte.",
 "Partial": "Partielle",
 "Corridor open but slot auction required. Cost impact only.": "Corridor ouvert, mais enchère de créneaux obligatoire. Effet sur les coûts uniquement.",
 "Slot auction": "Enchère de créneaux",
 "Closure rate (%)": "Taux de fermeture (%)",
 "⚙ Assumptions": "⚙ Hypothèses",
 "Expected VaR": "VaR attendue",
 "Class": "Classe",
 "Bunker $/d": "Soute $/j",
 "Charter $/d": "Affrètement $/j",
 "LNG carrier": "Méthanier",
 "LPG / VLGC": "GPL / VLGC",
 "Opex mult": "Coef. opex",
 "War risk loading": "Majoration risque de guerre",
 "Exposure model": "Modèle d’exposition",
 "Route-based: bounded by cargo value and driven by the vessel's own route. Fleet-average: the original linear line.": "Par route : borné par la valeur de la cargaison et déterminé par la route propre du navire. Moyenne de flotte : la ligne linéaire d’origine.",
 "Route-based where a route is set": "Par route lorsqu’une route est définie",
 "Fleet-average (original)": "Moyenne de flotte (original)",
 "Rates from NARROWS-RATES.js, auto-updated daily. Override any value; changes apply immediately.": "Taux issus de NARROWS-RATES.js, mis à jour chaque jour. Modifiez n’importe quelle valeur ; les changements s’appliquent immédiatement.",
 "Gross VaR": "VaR brute",
 "Sum across corridor lines": "Somme des lignes de corridor",
 "Net VaR": "VaR nette",
 "Single-corridor scenario (= gross)": "Scénario à corridor unique (= brute)",
 "Vessels exposed": "Navires exposés",
 "To this corridor": "À ce corridor",
 "D/E fleet fraction": "Part de la flotte D/E",
 "CII-constrained vessels": "Navires contraints par le CII",
 "Portfolio": "Portefeuille",
 "Vessels ·": "Navires ·",
 "sorted by VaR": "triés par VaR",
 "Illustrative fleet": "Flotte illustrative",
 "Chokepoint": "Point de passage",
 "Value at Risk": "Valeur à risque",
 "JWC & Geopolitical": "JWC et alertes",
 "flags": "géopolitiques",
 "overlay": "surcouche",
 "Bilateral": "Contexte",
 "context": "bilatéral",
 "Cargo accumulation at risk — selected corridor": "Accumulation de cargaisons à risque, corridor sélectionné",
 "Baseline (avg day)": "Référence (jour moyen)",
 "Annual flow ÷ 365 × transit days": "Flux annuel ÷ 365 × jours de transit",
 "Seasonal peak": "Pic saisonnier",
 "Worst calendar month (": "Mois le plus défavorable (",
 "Event horizon": "Horizon d’événement",
 "Peak + 3-day approach window": "Pic + fenêtre d’approche de 3 jours",
 "War risk PML": "PML risque de guerre",
 "Horizon × 15% severity × attachment rate": "Horizon × gravité de 15 % × taux de rattachement",
 "Illustrative output on a sample fleet.": "Résultat illustratif sur une flotte type.",
 "Export": "Exporter",
 "Copy report": "Copier le rapport",
 "Download .txt": "Télécharger .txt",
 "Add vessel": "Ajouter un navire",
 "Vessel identity": "Identité du navire",
 "IMO number": "Numéro IMO",
 "e.g. 9100099": "p. ex. 9100099",
 "Vessel name": "Nom du navire",
 "e.g. MV Example": "p. ex. MV Exemple",
 "Vessel class": "Classe de navire",
 "LPG carrier": "Transporteur de GPL",
 "Neopanamax container": "Porte-conteneurs Neopanamax",
 "Capesize bulk": "Vraquier Capesize",
 "Handymax bulk": "Vraquier Handymax",
 "CII rating": "Notation CII",
 "Flag state": "État du pavillon",
 "e.g. Marshall Islands": "p. ex. Îles Marshall",
 "Owner / operator (optional)": "Propriétaire / exploitant (facultatif)",
 "e.g. Zodiac Maritime": "p. ex. Zodiac Maritime",
 "Route and cargo": "Route et cargaison",
 "Loading port / origin": "Port de chargement / origine",
 "e.g. Ras Tanura": "p. ex. Ras Tanura",
 "Discharge port / destination": "Port de déchargement / destination",
 "e.g. Rotterdam": "p. ex. Rotterdam",
 "Cargo type": "Type de cargaison",
 "e.g. Saudi crude": "p. ex. brut saoudien",
 "Cargo value (USD)": "Valeur de la cargaison (USD)",
 "e.g. 85000000": "p. ex. 85000000",
 "Corridors transited": "Corridors traversés",
 "Select all corridors this vessel transits on every voyage": "Sélectionnez tous les corridors que ce navire traverse à chaque voyage",
 "Notes (optional)": "Notes (facultatif)",
 "Additional notes": "Notes complémentaires",
 "Diversion route, constraints, current status...": "Route de déroutement, contraintes, état actuel…",
 "Cancel": "Annuler",
 "Add to portfolio": "Ajouter au portefeuille"
};
  var DYN = {
    'Scenario VaR':'VaR du scénario','Active alert':'Alerte active','Multi-corridor':'Multi-corridors','Corridor VaR':'VaR du corridor',
    'Not exposed':'Non exposé','Vessel':'Navire','IMO':'IMO','Flag':'Pavillon','Corridor(s)':'Corridor(s)','Status':'Statut',
    'Cargo & commercial':'Cargaison et commercial','Cargo type':'Type de cargaison','Cargo value':'Valeur de la cargaison',
    'Diversion route':'Route de déroutement','Diversion adds':'Le déroutement ajoute','Diversion cost':'Coût du déroutement',
    'JWC status':'Statut JWC','Owner / operator':'Propriétaire / exploitant','Port stops · PRI & JWC flags':'Escales · PRI et alertes JWC',
    'In listed area':'En zone listée','Diversion risk':'Risque de déroutement','No listed area':'Hors zone listée','No exposure':'Aucune exposition',
    'Clear':'Hors zone','JWC stop':'Escale JWC','Boundary: check circular':'Limite : vérifier la circulaire',
    'One or more port stops fall within a JWC Listed Area. Verify war risk attachment covers these calls explicitly.':'Une ou plusieurs escales se situent dans une zone listée par le JWC. Vérifiez que la garantie risque de guerre couvre explicitement ces escales.',
    'Route':'Route','Port stops (PRI score / 10)':'Escales (score PRI / 10)','JWC flag':'Alerte JWC','Note':'Note',
    'The diversion risk flag is the unpriced scenario.':'L’alerte de risque de déroutement correspond au scénario non tarifé.',
    'No vessels in portfolio':'Aucun navire dans le portefeuille','Add vessels individually or upload a CSV file.':'Ajoutez des navires un par un ou importez un fichier CSV.',
    'Download the template to see the expected column format.':'Téléchargez le modèle pour voir le format de colonnes attendu.',
    'D/E fraction':'Part D/E','D/E VaR':'VaR D/E','CII-adjusted VaR':'VaR ajustée du CII','CII-constrained exposure':'Exposition contrainte par le CII','Phase 4 estimate':'Estimation de phase 4',
    'Raw VaR':'VaR brute','Adj.':'Ajust.','Diversion status':'État du déroutement','Captive (terminal strait)':'Captif (détroit terminal)',
    'Cannot divert: CII constraint':'Déroutement impossible : contrainte CII','Diversion viable':'Déroutement possible','No diversion route':'Aucune route de déroutement',
    'No vessels exposed to this corridor in the current portfolio.':'Aucun navire du portefeuille actuel n’est exposé à ce corridor.',
    'No D/E vessels exposed':'Aucun navire D/E exposé',
    'D and E-rated vessels cannot voluntarily divert on through-routes. Additional voyage days worsen their CII rating further, risking mandatory flag-state corrective action and operational restrictions. They are effectively captive even where a diversion route exists.':'Les navires notés D et E ne peuvent pas se dérouter volontairement sur les routes de transit. Les jours de voyage supplémentaires dégradent encore leur notation CII, au risque d’une action corrective imposée par l’État du pavillon et de restrictions d’exploitation. Ils sont de fait captifs, même lorsqu’une route de déroutement existe.',
    'Terminal straits (Hormuz, Bosphorus, Danish Straits) have no physical diversion route. All vessels are captive regardless of CII rating. The CII multiplier does not apply here.':'Les détroits terminaux (Ormuz, Bosphore, détroits danois) n’ont aucune route de déroutement physique. Tous les navires sont captifs, quelle que soit leur notation CII. Le multiplicateur CII ne s’applique pas ici.',
    'CII multipliers (D: 1.15x, E: 1.30x) are illustrative estimates pending Phase 4 calibration. The underlying logic: vessels rated D or E on through-routes cannot exercise the diversion option because additional voyage days would degrade their rating further. They are effectively captive even where physical diversion is possible. For terminal straits (Hormuz, Bosphorus), all vessels are captive regardless of rating. Full CII adjustment methodology is deferred to Phase 4.':'Les multiplicateurs CII (D : 1,15x, E : 1,30x) sont des estimations illustratives, en attente du calibrage de la phase 4. La logique sous-jacente : les navires notés D ou E sur des routes de transit ne peuvent pas exercer l’option de déroutement, car des jours de voyage supplémentaires dégraderaient encore leur notation. Ils sont de fait captifs, même lorsqu’un déroutement physique est possible. Pour les détroits terminaux (Ormuz, Bosphore), tous les navires sont captifs quelle que soit leur notation. La méthode complète d’ajustement CII est reportée à la phase 4.',
    'Importer':'Importateur','Corridor dep.':'Dép. au corridor','Source':'Source','Crude':'Brut','LNG':'GNL','Coal':'Charbon','Grain':'Céréales','Refined petroleum':'Produits pétroliers raffinés',
    'Iron ore':'Minerai de fer','Vehicles':'Véhicules','Electronics':'Électronique','Apparel':'Habillement','Palm oil':'Huile de palme','Copper ores':'Minerais de cuivre','Copper':'Cuivre','Ammonia':'Ammoniac',
    'Fertiliser':'Engrais','Aluminium ores':'Minerais d’aluminium','Aluminium':'Aluminium','~estimate':'~estimation',
    'Figures marked with ~ are directional estimates only. Reported (T1) figures are validated against UN Comtrade bilateral data; Corroborated (T2) and Estimated (T3) figures use progressively more inferred routing, per the Narrows data verification policy.':'Les chiffres marqués d’un ~ ne sont que des estimations d’ordre de grandeur. Les chiffres déclarés (T1) sont validés par rapport aux données bilatérales d’UN Comtrade ; les chiffres corroborés (T2) et estimés (T3) reposent sur un routage de plus en plus déduit, conformément à la politique de vérification des données de Narrows.',
    'Directional estimate only. Not validated against primary source data.':'Estimation d’ordre de grandeur uniquement. Non validée par rapport aux données de source primaire.',
    'Cape of Good Hope accumulation spikes — correlated exposure for Cape war risk writers':'L’accumulation au cap de Bonne-Espérance bondit : exposition corrélée pour les assureurs du risque de guerre au Cap',
    'Cape of Good Hope accumulation spikes -- correlated exposure for Cape war risk writers':'L’accumulation au cap de Bonne-Espérance bondit : exposition corrélée pour les assureurs du risque de guerre au Cap',
    'Lombok and Sunda strait traffic increases':'Le trafic des détroits de Lombok et de la Sonde augmente',
    'Cape Horn and Suez westbound accumulation spikes sharply':'L’accumulation au cap Horn et à Suez vers l’ouest bondit fortement',
    'Malacca and Sunda traffic redistributes':'Le trafic de Malacca et de la Sonde se redistribue',
    'No alternative route — no cascade effect':'Aucune route alternative : pas d’effet de cascade',
    'No alternative route -- no cascade effect':'Aucune route alternative : pas d’effet de cascade',
    'Cape of Good Hope routes spike during closure':'Les routes par le cap de Bonne-Espérance bondissent pendant la fermeture',
    'Cascade:':'Cascade :','Leg':'Tronçon','Days in zone':'Jours en zone','Share caught':'Part touchée','Severity':'Gravité','Loss share':'Part de perte',
    'Yanbu to Ulsan via Suez, Gibraltar, Cape, Malacca (Bab el-Mandeb closed)':'Yanbu vers Ulsan via Suez, Gibraltar, le Cap, Malacca (Bab el-Mandeb fermé)',
    'Yanbu to Ulsan via Bab el-Mandeb and Malacca (Bab open)':'Yanbu vers Ulsan via Bab el-Mandeb et Malacca (Bab ouvert)',
    'Gibraltar':'Gibraltar','Custom route':'Route personnalisée','Hormuz':'Ormuz','Bosphorus':'Bosphore','Danish Str.':'Dét. danois','BAM':'BAM',
    'Marshall Islands':'Îles Marshall','Bahamas':'Bahamas','Greece':'Grèce','Hong Kong':'Hong Kong','Liberia':'Liberia','Malta':'Malte','Norway':'Norvège','Singapore':'Singapour',
    'Copied':'Copié','Jan':'janv.','Feb':'févr.','Mar':'mars','Apr':'avr.','May':'mai','Jun':'juin','Jul':'juil.','Aug':'août','Sep':'sept.','Oct':'oct.','Nov':'nov.','Dec':'déc.'
  };
  var COUNTRY = {'Algeria':'Algérie','Australia':'Australie','Belgium':'Belgique','Benin':'Bénin','Bosnia Herzegovina':'Bosnie-Herzégovine','Brazil':'Brésil','Brunei Darussalam':'Brunéi',
    'Bulgaria':'Bulgarie','Cambodia':'Cambodge','Cameroon':'Cameroun','Chile':'Chili','China':'Chine','Colombia':'Colombie',
    'Dem. Rep. of the Congo':'Rép. dém. du Congo','Denmark':'Danemark','Dominican Rep.':'Rép. dominicaine','Ecuador':'Équateur','Egypt':'Égypte','El Salvador':'Salvador','Estonia':'Estonie',
    'Finland':'Finlande','Georgia':'Géorgie','Germany':'Allemagne','Iceland':'Islande','India':'Inde','Indonesia':'Indonésie','Ireland':'Irlande','Israel':'Israël','Italy':'Italie',
    'Jamaica':'Jamaïque','Japan':'Japon','Lithuania':'Lituanie','Malaysia':'Malaisie','Mexico':'Mexique','Morocco':'Maroc','Netherlands':'Pays-Bas','New Zealand':'Nouvelle-Zélande',
    'Peru':'Pérou','Poland':'Pologne','Rep. of Korea':'Corée du Sud','South Korea':'Corée du Sud','Romania':'Roumanie','South Africa':'Afrique du Sud',
    'Spain':'Espagne','Sweden':'Suède','Taiwan':'Taïwan','Thailand':'Thaïlande','Tunisia':'Tunisie','Turkey':'Turquie','Türkiye':'Turquie','USA':'États-Unis',
    'United Kingdom':'Royaume-Uni','United States':'États-Unis','Viet Nam':'Viêt Nam','Vietnam':'Viêt Nam'};
  for (var kk in COUNTRY) DYN[kk] = COUNTRY[kk];
  var SCEN = {
    red_sea_2024: '<strong>Mer Rouge 2024 (historique, T1).</strong> En cours depuis décembre 2023. Attaques houthies contre le transport maritime commercial en mer Rouge et dans le golfe d’Aden. Utilisé pour le calibrage : c’est ce que le modèle aurait affiché en temps réel.',
    panama_drought: '<strong>Sécheresse de Panama 2023-2024 (historique, T1).</strong> Le niveau du lac Gatún a contraint à réduire les transits quotidiens du canal de 36 à 18. Utilisé pour le calibrage.',
    ever_given: '<strong>Ever Given 2021 (historique, T1).</strong> L’échouement d’un seul navire a bloqué le canal de Suez pendant six jours ; 369 navires ont dû attendre. Le scénario le plus court et le plus brutal de l’ensemble.',
    hormuz_closure: '<strong>Fermeture d’Ormuz (en cours).</strong> Ce n’est pas une hypothèse : une guerre entre les États-Unis et Israël d’une part et l’Iran d’autre part a commencé le 28 février 2026, et le détroit est signalé fermé ou presque au transport maritime commercial depuis, avec des transits en baisse jusqu’à 95 % par rapport à la moyenne quotidienne d’avant-guerre. Un cessez-le-feu conclu en avril 2026 (prolongé en juin 2026) a été violé à plusieurs reprises par les deux camps ; un blocus naval américain des ports iraniens a été rétabli le 15 juillet 2026 ; le déminage actif se poursuivait encore au 25 août 2026. La situation ne s’apaise pas. N’utilisez pas le chiffre annuel de 15 à 25 % issu des marchés prédictifs d’avant-guerre : il précède la guerre et est abandonné. La durée affichée (60 j) est une fenêtre illustrative pour le calcul de VaR ci-dessous, et non les quelque 7 mois de fermeture écoulés ; ajustez le curseur pour explorer d’autres fenêtres. Source : NARROWS-SIGNALS.js CORRIDOR_SIGNALS.hormuz, revu le 9 septembre 2026.',
    taiwan_strait: '<strong>Crise du détroit de Taïwan (test de résistance, hypothétique).</strong> Modélisée via Malacca, notre approximation du commerce plus large Malacca/mer de Chine méridionale qu’une crise du détroit de Taïwan toucherait, et non comme un corridor à part. Correction d’une version antérieure de cette note : la perturbation ne se répartit pas également sur les 1' + NB + '300' + NB + 'milliards de dollars par an de commerce à destination des ports chinois. La plupart du trafic conteneurisé chinois passe par des ports bien au nord du détroit lui-même. Un contrôle par grand cercle le confirme directement : une cargaison à destination de Shanghai, Ningbo, Qingdao ou Dalian déroutée à l’est de Taïwan par le canal de Bashi ajoute environ 5' + NB + '% de distance par rapport au passage du détroit, un coût réel mais pas un blocage. L’exposition concentrée se trouve dans les ports faisant face au Fujian, comme Xiamen et Fuzhou, où le détour est nettement plus important en valeur relative et où l’on est le plus proche d’un conflit réel. C’est un cas où le port compte plus que le pays : le chiffre rattaché à Malacca est ici un signal d’ordre de grandeur sur la voie commerciale, et non l’affirmation que l’ensemble du commerce chinois est captif. Probabilité de 10 à 20' + NB + '% sur 2 ans dérivée de marchés prédictifs (section 10.3) ; la gravité est réellement variable et les 50' + NB + '% affichés sont un point de départ, pas une affirmation ; ajustez le curseur pour explorer la plage.',
    cascade: '<strong>Cascade multi-corridors (test de résistance, hypothétique).</strong> Affichée ici sur Ormuz. Sélectionnez ensuite Bab-el-Mandeb pour voir le second tronçon : les deux corridors partagent le même facteur Iran-Houthis dans notre modèle de signaux, donc un portefeuille exposé aux deux ne porte pas deux risques indépendants mais un seul risque corrélé, deux fois. CAPE n’additionne pas encore automatiquement plusieurs corridors ; notez chaque VaR et additionnez-les pour obtenir le chiffre composé.'
  };
  var CORRFR = {
    hormuz: { label:'Détroit d’Ormuz', short:'Ormuz', region:'Golfe Persique / golfe d’Oman', desc:'Seule sortie du golfe Persique. Il n’existe aucune route de déroutement physique.' },
    bab_el_mandeb: { label:'Bab-el-Mandeb', short:'Bab-el-Mandeb', region:'Mer Rouge / golfe d’Aden', desc:'Entrée sud de la mer Rouge, qui relie le canal de Suez au golfe d’Aden.' },
    malacca: { label:'Détroit de Malacca', short:'Malacca', region:'Océan Indien / mer de Chine méridionale', desc:'Le risque de piraterie signalé par l’IMB s’applique. Le risque principal est opérationnel et lié à la densité du trafic.' },
    panama: { label:'Canal de Panama', short:'Panama', region:'Pacifique / Caraïbes', desc:'Le risque est opérationnel et environnemental : niveau d’eau, capacité des écluses, saison des ouragans.' },
    suez: { label:'Canal de Suez', short:'Suez', region:'Mer Rouge / Méditerranée', desc:'Risque propre au canal, distinct de celui de Bab-el-Mandeb. Un échouement à Suez (type Ever Given) ou une fermeture politique touche le canal lui-même plutôt que l’approche sud de Bab-el-Mandeb.' },
    lombok: { label:'Détroit de Lombok', short:'Lombok', region:'Indonésie / océan Indien', desc:'Principale alternative en eau profonde à Malacca pour les VLCC et les navires de grande largeur qui ne peuvent pas franchir Malacca à pleine charge.' },
    bosphorus: { label:'Bosphore / détroits turcs', short:'Bosphore', region:'Mer Noire / Méditerranée', desc:'Seule sortie de la mer Noire pour le transport commercial. Régi par la convention de Montreux. Risque de fermeture dans les scénarios de conflit impliquant des États de la mer Noire.' },
    danish_straits: { label:'Détroits danois', short:'Détroits danois', region:'Baltique / mer du Nord', desc:'Seule sortie commerciale de la Baltique. Le risque est géopolitique (sécurité énergétique de la Baltique) et environnemental : glace hivernale et limites de tirant d’air (pont du Grand Belt : 65' + NB + 'm de dégagement).' }
  };
  var EXACT = {};
  for (var a in STATIC) EXACT[a] = STATIC[a];
  for (var b in DYN) EXACT[b] = DYN[b];
  window.CAPE_I18N = { scen: SCEN, corr: CORRFR, exact: EXACT };
  window.T = function (s) { return Object.prototype.hasOwnProperty.call(EXACT, s) ? EXACT[s] : s; };
  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }
  function post(s) {
    return s.replace(/(\d)\.(\d)/g, '$1,$2').replace(/(\d) ?%/g, '$1' + NB + '%').replace(/(\d)d\b/g, '$1' + NB + 'j');
  }
  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1 };
  function tNode(n) {
    var p = n.parentNode;
    if (!p || SKIP[p.nodeName]) return;
    var raw = n.nodeValue;
    if (!raw || !/[A-Za-z0-9]/.test(raw)) return;
    var lead = raw.match(/^\s*/)[0], trail = raw.match(/\s*$/)[0];
    var core = norm(raw), sym = '';
    var m = core.match(/^([▲△✓↑·⚠]\s+)(.+)$/);
    if (m) { sym = m[1]; core = m[2]; }
    var out = Object.prototype.hasOwnProperty.call(EXACT, core) ? EXACT[core] : core;
    out = post(sym + out);
    if (out !== norm(raw)) n.nodeValue = lead + out + trail;
  }
  function tEl(el) {
    if (el.getAttribute && el.getAttribute('data-fr') && !el.__frDone) {
      el.__frDone = true;
      el.innerHTML = el.getAttribute('data-fr');
    }
    ['title', 'placeholder', 'aria-label'].forEach(function (k) {
      var v = el.getAttribute && el.getAttribute(k);
      if (v) {
        var c = norm(v);
        if (Object.prototype.hasOwnProperty.call(EXACT, c)) el.setAttribute(k, EXACT[c]);
      }
    });
  }
  function walk(root) {
    if (root.nodeType === 3) { tNode(root); return; }
    if (root.nodeType !== 1) return;
    tEl(root);
    root.querySelectorAll('[title],[placeholder],[aria-label],[data-fr]').forEach(tEl);
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())) tNode(n);
  }
  var obs = new MutationObserver(function (muts) {
    obs.disconnect();
    muts.forEach(function (mu) {
      if (mu.type === 'characterData') tNode(mu.target);
      else mu.addedNodes.forEach(walk);
    });
    obs.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  });
  obs.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  document.documentElement.lang = 'fr';
  document.addEventListener('DOMContentLoaded', function () {
    document.title = 'CAPE, accumulation par corridor et exposition d’un portefeuille | Narrows';
    walk(document.body);
  });
})();
