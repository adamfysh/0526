// Tier definitions and coverage figures shared by the data-verification-policy
// and data-changelog pages. REFRESH NEEDED: the percentages and the row count
// are the August 2026 values; recompute from the current CDM build.
const nb = ' ';

const en = {
  tiers: [
    ['Reported', 'The figure comes from a direct bilateral trade record, either an official government statistics agency or a targeted primary source pull for that specific commodity and country pair. The strongest tier available.'],
    ['Corroborated', 'The figure is derived from exporter-side statistics rather than a matched bilateral pair, but the routing has been checked against independent verification and holds up. Common where bilateral reporting is thinner than for crude oil or LNG.'],
    ['Estimated', 'The figure is a national total allocated across corridors using routing logic, applied where a direct or exporter-side bilateral figure is not available. Disclosed on every row where it applies.'],
  ],
  bars: [
    { name: 'Reported', width: 42.4, val: '42.4%' },
    { name: 'Estimated', width: 47.6, val: '47.6%' },
    { name: 'Corroborated', width: 10, val: '10.0%' },
  ],
  ofValue: 'of value',
  rowNote: 'By row count instead of value: Estimated 64.7%, Corroborated 21.3%, Reported 14.0%, across 2,008 rows in the current dependency matrix.',
  sectionEyebrow: 'Coverage',
};

const fr: typeof en = {
  tiers: [
    ['Déclaré', 'Le chiffre provient d’un relevé commercial bilatéral direct, soit d’un organisme public de statistiques officielles, soit d’une extraction ciblée de source primaire pour ce produit et cette paire de pays. C’est le niveau le plus solide.'],
    ['Recoupé', 'Le chiffre est dérivé de statistiques du côté exportateur plutôt que d’une paire bilatérale appariée, mais le routage a été vérifié par une source indépendante et tient la route. Fréquent lorsque la déclaration bilatérale est moins complète que pour le pétrole brut ou le GNL.'],
    ['Estimé', 'Le chiffre est un total national réparti entre les corridors selon une logique de routage, appliquée lorsqu’aucun chiffre bilatéral direct ou du côté exportateur n’est disponible. Indiqué sur chaque ligne concernée.'],
  ],
  bars: [
    { name: 'Déclaré', width: 42.4, val: `42,4${nb}%` },
    { name: 'Estimé', width: 47.6, val: `47,6${nb}%` },
    { name: 'Recoupé', width: 10, val: `10,0${nb}%` },
  ],
  ofValue: 'de la valeur',
  rowNote: `En nombre de lignes plutôt qu’en valeur${nb}: Estimé 64,7${nb}%, Recoupé 21,3${nb}%, Déclaré 14,0${nb}%, sur 2${nb}008 lignes de la matrice de dépendance actuelle.`,
  sectionEyebrow: 'Couverture',
};

export const dataTiers = { en, fr };
