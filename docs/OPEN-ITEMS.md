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

## B. Carried over from earlier sessions

- Log Fix-134 (6 new tier-3 sources) in `NARROWS-CHANGELOG-PUBLIC.md`, `data-changelog` (`changelog.ts`, EN and FR) and `NARROWS-DATA-VERIFICATION-POLICY.md`.
- Check the other articles for Hormuz-only vs Gulf-plus-Oman conflation.
- Scope of the em-dash purge (public pages are clean; articles not yet checked).
- PRI: Fix-65 retraction unfiled; catchment 100% ceiling; 60 LPI countries have no published source (flagged unverified in the 8 Oct entry).
- CAPE Worker redeploy.
- $110B LUZON-routed trade is unaudited.

## C. Not yet translated

`pri.astro`, `pri-methodology.astro`, `cape.astro` and `public/cape.html`, `lng-compare.astro`,
`analysis/index.astro`, all articles under `src/pages/analysis/`, the standalone tools
(`cascade*.html`, Sankeys).

## D. Status project (not code)

- LinkedIn clean-up: not started.
- French native-speaker review of all French copy.
- Visual check of the EN/FR switcher in a browser (not done: the preview was unreachable).
- Commercial-mode French copy (the `COMMERCIAL` branches are English only).
- Leftover `node_modules/.vite/deps_temp_*` in `0526` is harmless; delete by hand.
