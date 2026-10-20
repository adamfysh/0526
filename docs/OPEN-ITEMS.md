# Narrows website: open items

Last updated 20 Oct 2026. Every fix below must be made in **English and French together**
(see `docs/I18N.md`). Tick items off here when done, with the date.

## A. Stale figures on translated pages (found during the French build)

| # | Where | Problem | Source of truth | Status |
|---|-------|---------|-----------------|--------|
| A1 | `src/i18n/pages/dataTiers.ts` (used by policy + changelog) | Tier shares of value 48.0 / 40.8 / 11.2% and of rows 61.6 / 22.7 / 15.6% are the August 2026 values | Recompute from the current CDM build | open |
| A2 | `dataTiers.ts` rowNote, `policy.ts` + `changelog.ts` hero `cov` | "1,812 rows" in the dependency matrix. The simulator data (`public/simulator_data.json`, CDM 16 Oct) has about 2,008 rows | Current CDM build | open |
| A3 | `methodology.ts` | v0.2 figures: 37 corridors, $2.15T, 87.2% coverage, 44 nations, 17 commodity classes, "model 0.2, May 2026", sample Malacca output. Production CDM is 14 chokepoints, 75 importers, 20 commodity groups | Current CDM build | open |
| A4 | `policy.ts` / `changelog.ts` | "Corrections logged: 19" is hand-counted. Should equal the number of correction items in the public changelog | `NARROWS-CHANGELOG-PUBLIC.md` | open: recount |
| A5 | `src/pages/analysis/hormuz-seven-months.astro` | Cites 14 commodity classes and 47+ importers, which conflict with the current model | Current CDM build | open |
| A6 | `src/pages/model.astro` | Stub page. Decision: hide it rather than translate it | n/a | open: decide |
| A7 | `src/pages/pri.astro` | Gate wording ("Free access, instant") sits oddly with the research-publication framing. Review while translating | n/a | open |
| A8 | `src/pages/[...lang]/about.astro` | Validation link points at the English article until that article is translated | n/a | resolves when article translated |
| A12 | `src/data/pri.json` | Embedded copy dated 7 Oct; the 8 Oct CSV differs only by rounding (+/-0.001) in about 400 scores. Regenerate from the CSV whenever the PRI is rebuilt (pri.json also needs `score_4_wgi` = mean of `score_4_1` and `score_4_2`) | CSV | open |
| A13 | `public/pri_ports.json` | Added an `i` (ISO2) key so the French map can name countries. Regenerate with it on each rebuild. Still carries the old `t` tier field (unused by the display) | CSV | open |
| A14 | PRI page | Port names stay in their source (English/local) spelling in French. Country names are translated at runtime with `Intl.DisplayNames` | n/a | decision |
| A17 | `priMethodology.ts` s[179-184] | Section 12 (Charter Bleed) is hidden unless `COMMERCIAL` is true (cost per port call, rate module, calculator). Restore with the flag; its French text is written but only shown then | n/a | by design |
| A18 | `pri-methodology.astro` | Custom weighting sentence (s[145]) and "model code on request for institutional users" (s[176]) are appended in English only when `COMMERCIAL` is true | n/a | by design |
| A9 | PRI pages | RESOLVED 20 Oct: 14 indicators = D1 4 + D2 3 + D3 4 + D4 3, from notebooks 02-05 (MD-017 dropped LPI from D2, MD-018 merged the two WGI scores). The "16" in the LinkedIn launch post and the gate is the pre-MD-017 design. Pages now say 14 = 4+3+4+3; country count is computed from the data (193) | pipeline | done |
| A11 | PRI explorer bars | RESOLVED 20 Oct: bars now show score / 10 (they divided by the composite maximum, so most were full) | n/a | done |
| A15 | PRI methodology Section 8 | RESOLVED 20 Oct: named risk bands removed; text now says the index deliberately has no bands and points to rank / percentile. Note: score chip and histogram colours in the explorer table still switch at 2.0 / 2.5 / 3.0 (unnamed). Decide whether to make those continuous like the map | n/a | partly open |
| A16 | PRI methodology details | RESOLVED 20 Oct against notebooks 02-05 and fixes v14-v23: geometric means throughout (not arithmetic), D1 = vessel classes / terminal diversity / cyclones / seismic, labour regime stable / uncertain / volatile (2 / 5 / 8), `score_2_4` port safety (flag tier ~60%), hinterland count row added, GSHAP seismic source, cyclones 1980 to present within 250 km, outlier handling updated, dwell tier counts, LPI correction note, "Version 1.2" replaced by "Updated 8 October 2026". STILL OPEN: Section 11 vintage rows for OFAC/EU/UN lists and ICJ/PCA say "Q1 2026 snapshot" but notebook 05 says "as of May 2024"; WGI "2023 edition" wording; confirm | pipeline | open |
| A19 | `priMethodology.ts` static numbers | Dwell tiers 57 / 1,841 / 1,876, 35 flagged disputes, 79 Tier A ports, and "71 manual depth overrides" are typed from the 8 Oct CSV and notebooks. Refresh on each PRI rebuild (header comment in the file lists them) | CSV | open |
| A20 | PRI raw inputs | 10+ ports sit at a flat 100% catchment share (not yet reviewed); `alt_distance_km` still has remote-port outliers (see methodology Section 3) | pipeline | open |

## B. Carried over from earlier sessions

- Log Fix-134 (6 new tier-3 sources) in `NARROWS-CHANGELOG-PUBLIC.md`, `data-changelog` (`changelog.ts`, EN and FR) and `NARROWS-DATA-VERIFICATION-POLICY.md`.
- Check the other articles for Hormuz-only vs Gulf-plus-Oman conflation.
- Scope of the em-dash purge (public pages are clean; articles not yet checked).
- PRI: Fix-65 retraction unfiled; catchment 100% ceiling; 60 LPI countries have no published source (flagged unverified in the 8 Oct entry).
- CAPE Worker redeploy.
- $110B LUZON-routed trade is unaudited.

## C. Not yet translated

`cape.astro` and `public/cape.html`, `lng-compare.astro`,
`analysis/index.astro`, all articles under `src/pages/analysis/`, the standalone tools
(`cascade*.html`, Sankeys).

## D. Status project (not code)

- LinkedIn clean-up: not started.
- French native-speaker review of all French copy.
- Visual check of the EN/FR switcher in a browser (not done: the preview was unreachable).
- Commercial-mode French copy (the `COMMERCIAL` branches are English only).
- Leftover `node_modules/.vite/deps_temp_*` in `0526` is harmless; delete by hand.
