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
    { name: 'Reported', width: 48, val: '48.0%' },
    { name: 'Estimated', width: 40.8, val: '40.8%' },
    { name: 'Corroborated', width: 11.2, val: '11.2%' },
  ],
  ofValue: 'of value',
  rowNote: 'By row count instead of value: Estimated 61.6%, Corroborated 22.7%, Reported 15.6%, across 1,812 rows in the current dependency matrix.',
  sectionEyebrow: 'Coverage',
};

const fr: typeof en = {
  tiers: [
    ['Déclaré', 'Le chiffre provient d’un relevé commercial bilatéral direct, soit d’un organisme public de statistiques officielles, soit d’une extraction ciblée de source primaire pour ce produit et cette paire de pays. C’est le niveau le plus solide.'],
    ['Recoupé', 'Le chiffre est dérivé de statistiques du côté exportateur plutôt que d’une paire bilatérale appariée, mais le routage a été vérifié par une source indépendante et tient la route. Fréquent lorsque la déclaration bilatérale est moins complète que pour le pétrole brut ou le GNL.'],
    ['Estimé', 'Le chiffre est un total national réparti entre les corridors selon une logique de routage, appliquée lorsqu’aucun chiffre bilatéral direct ou du côté exportateur n’est disponible. Indiqué sur chaque ligne concernée.'],
  ],
  bars: [
    { name: 'Déclaré', width: 48, val: `48,0${nb}%` },
    { name: 'Estimé', width: 40.8, val: `40,8${nb}%` },
    { name: 'Recoupé', width: 11.2, val: `11,2${nb}%` },
  ],
  ofValue: 'de la valeur',
  rowNote: `En nombre de lignes plutôt qu’en valeur${nb}: Estimé 61,6${nb}%, Recoupé 22,7${nb}%, Déclaré 15,6${nb}%, sur 1${nb}812 lignes de la matrice de dépendance actuelle.`,
  sectionEyebrow: 'Couverture',
};

export const dataTiers = { en, fr };
