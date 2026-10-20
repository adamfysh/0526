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

## E. PRI figures flow from the tools (20 Oct 2026)

- `narrows-pipeline/data/pri_sources.json` is the one registry of source vintages. Edit `as_of` / `retrieved` there when a source is refreshed.
- `notebooks/port-index/export_pri_meta.py` (run automatically at the end of `export_pri_json.py`) writes `src/data/pri-meta.json`: counts, tiers, dwell sources, disputes, score stats, indicators per dimension, scoring parameters probed from the live functions, and sources with a `stale` flag.
- Methodology section 11 (vintage table) is now rendered from the meta. Stale sources are starred; a footnote explains it.
- STALE, need real refresh (warned by the exporter): sanctions country table (May 2024), WGI (2022), PSC (2023), labour record (2024), catchment base (2022).
- A19 still open: typed numbers inside the long prose strings of `priMethodology.ts` (57/1,841/1,876, 35, 79, 24 m, 250 km, 1980, 12 storms, 0.4 g, 12 to 168 h, 50 to 2,500 km, 22 % cap, maps, thresholds). `fill()` already accepts the meta placeholders ({dwell_port}, {dwell_unctad}, {dwell_lpi}, {disputes}, {tier_a}, {tier_b}, ...); replace the literals string by string. PSC string s[79] must say flag tier 60 % + regional detention rate 40 %.
- Same approach to be applied to CDM figures (A1 to A4).

## F. CAPE (20 Oct 2026)

DONE
- Explainer `/cape` and `/fr/cape`: dictionary `src/i18n/pages/cape.ts`, route `[...lang]/cape.astro`. The TIDE strip reads `public/cape_tide_feed.json` at build. The old typed strip was stale (Hormuz baseline 21.8 vs feed 21.35, peak 25.6 vs 25.09, horizon 31.2 vs 30.55, PML 3.4 vs 3.31, and "July" peak where the feed says Jan). The typed "Suez closes, Cape +83%" claim had no source and was replaced by the feed's largest cascade ratio.
- Tool `public/cape.html` French via `?lang=fr` (`public/cape-i18n.js`). Interface strings: exact English to French in that file. Interpolated sentences use `LX(en, fr)` in `cape.html`. Fleet, port and listed-area data are bilingual at source.
- No more hand-typed facts in the tool. New pipeline steps, run in this order after a PRI or JWC update:
  1. `narrows-pipeline/notebooks/25_cape_ports_feed.py` -> `public/cape_ports_feed.json` (PRI score, rank, dwell, nearest PRI record and distance, JWC listed status per port and per corridor, from `data/jwc_listed_areas.json`; editorial one-line notes from `data/cape_ports.json`).
  2. `narrows-pipeline/notebooks/26_cape_fleet_feed.py` -> `public/cape_fleet_feed.json` (fleet from `data/cape_fleet.json`; listed-area flag computed, not stored).
  3. Existing `21_cape_corridor_feed.py` and `22_cape_tide_feed.py` (unchanged).
- Removed from the page: the Worker call and its bearer token, the typed PORT_RISK table (it lived in the deployed Worker), the typed fallback bilateral and TIDE numbers. Day-rate weights come from `NARROWS-RATES.js` (identical to what the Worker served).
- Verification: `python3 scripts/check-cape-i18n.py` renders the tool in French through every scenario and corridor and fails on English left or page errors (needs Playwright).

Corrections the computed data made to the old typed statuses
- MV Odessa Star: was "clear"; now "listed" (Odessa is covered by the Ukraine rule) with Bosphorus flagged as a boundary case.
- MV Java Current: was "clear"; now "listed" (loads at Ras Tanura, Fujairah are in named countries).
- Bosphorus corridor: was "not listed"; now "boundary" (28 km from the approximate Black Sea ring edge): check against JWLA-035 before relying on it.

OPEN
- SECURITY: the CAPE Worker bearer token was published in the public page source for months and is still in git history and in the deployed Worker. Rotate `CAPE_SECRET` or retire the Worker (nothing needs it now). Decide before the next deploy.
- JWC rings in `data/jwc_listed_areas.json` are approximations closed over land (most vertices not from the circular). Port status uses country rules only; corridor status uses the rings and reports "boundary" within 50 km of an edge. Replace with the circular's own coordinates.
- Editorial text still typed in the tool (translated, dated where possible): scenario notes (the Hormuz "live" note is from the 9 Sep 2026 signals review, six weeks old), Yanbu vessel note (war-risk quote 25 Sep, pipeline shutdown 11 to 12 Sep, 15,811 nm / 7,095 nm from the routing graph), CII multipliers, route days in `NARROWS-LEGS.js`. Decide whether each is to be fed from `NARROWS-SIGNALS.js` / the routing tool.
- `NARROWS-LEGS.js` route labels are English strings translated in `cape-i18n.js` by exact match: add new routes there.
- "Phase 4" wording in the CII panel is internal roadmap language; consider removing for the publication.
- TIDE fallback comment (Fix-116) in `cape.html` is obsolete.

## G. Static pages translation sweep (20 Oct 2026)

DONE: French for lng-compare, all analysis articles, cascade, cascade-plus, the four crude/LNG Sankeys, `viz/gulf-lng-sankey`, `viz/qatar-route-tree`. Em-dashes and internal/commercial wording removed in those sources. Iframes follow the language.

OPEN
- `public/tools/map-printer.html` is an internal tool (title says "internal") published at /tools/. Now noindex and disallowed in robots.txt, but still public: move it out of `public/` or behind the Cloudflare password. Same for the orphan `viz/gulf-lng-flowmap.html` (not translated, noindex).
- Sankeys and viz still cite "Narrows CDM v0.3 ... 2022 base year": stale versus CDM v3. Refresh the source lines from the tools.
- `malacca.astro` methodology is stale (UN Comtrade 2023, CDM Fix-15, 14 importers versus 90). The $31B land bridge is $29B in malacca: log as stale-figure fix.
- Underwriter-framed phrasing remains in hormuz, malacca-zombie and malacca; "Adam Fysh, Founder, The Narrows" bylines remain in hormuz-pocketbook.
- `NARROWS-CORRIDORS.js` / `NARROWS-RATES.js` labels English on French pages; CASCADE+ fleet data uses fixed Sept 2026 dates.
- `sk.py` regenerates `js` pairs; after re-running it on `viz/qatar-route-tree`, delete the unused pairs "Gulf LNG" and " · ~${n.totalDays} days from origin" (build flags them).
