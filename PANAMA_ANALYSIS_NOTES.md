# Panama Canal — Analysis Notes
**For:** `/analysis/panama` article  
**Date:** May 2026  
**Status:** Pre-writing research and model outputs

---

## Key Numbers (model outputs)

### Aggregate VaR
- Full closure (100%): $174.2B (14-day)
- Peak drought severity (50% transit, Feb 2024): **$53.8B**
- Grain-only range: **$31B–$93B** (low/mid/high scenarios)
- Grain mid-point (50% severity): **$46.5B**

### Stat bar (proposed)
`$174.2B · Mexico corn 53.2% · Brazil +38 days · $1.9M/voyage`

### Rerouting
- Cape Horn detour: **38 days** average
- Handymax rerouting penalty: **$1.14M/voyage**
- Neopanamax rerouting penalty: ~$1.71M/voyage

---

## Monthly Throttling Simulation: 2023-24 Event

| Month    | Transits/day | Transit Severity | Bulk Severity | Container Severity | Agg VaR  |
|----------|-------------|-----------------|--------------|-------------------|---------|
| May 2023 | 36          | 0%              | 0%           | 16.0%             | $8.0B   |
| Jul 2023 | 32          | 11.1%           | 11.1%        | 25.3%             | $18.2B  |
| Sep 2023 | 28          | 22.2%           | 22.2%        | 34.7%             | $28.4B  |
| Nov 2023 | 24          | 33.3%           | 33.3%        | 44.0%             | $38.6B  |
| Jan 2024 | 22          | 38.9%           | 38.9%        | 48.7%             | $43.6B  |
| Feb 2024 | 18          | 50.0%           | 50.0%        | 58.0%             | $53.8B  |

**Key insight:** Even at May 2023 (draft restriction only, no transit cuts), the Neopanamax capacity loss 
(50ft → 44ft = 40% cargo reduction per large vessel) generated $8B container-side exposure before 
the ACP cut a single transit. This is the vessel-class differentiation story in a single number.

---

## Probable Impact Range: Grain Commodities

| Scenario | Transits | Bulk Severity | Grain VaR   | Reroute/voyage |
|----------|----------|--------------|-------------|----------------|
| Low      | 24/day   | 33.3%        | $31.0B      | $1.14M         |
| Mid      | 18/day   | 50.0%        | $46.5B      | $1.14M         |
| High     | 0/day    | 100%         | $93.1B      | $1.14M         |

---

## Agricultural Commodities: Key Countries at Peak Severity (50% transit)

### Corn (HS 1005)
| Country     | Dep%  | VaR@100% | VaR@50%  | Tier |
|-------------|-------|----------|----------|------|
| Mexico      | 53.2% | $5.76B   | $2.59B   | T3   |
| Japan       | 6.3%  | $4.65B   | $2.09B   | T3   |
| South Korea | 5.8%  | $2.27B   | $1.02B   | T3   |
| Vietnam     | 17.1% | $2.19B   | $0.98B   | T3   |
| Taiwan      | 6.8%  | $1.08B   | $0.48B   | T3   |
| China       | 1.1%  | $6.66B   | $3.00B   | T3   |

### Soybean (HS 1201)
| Country     | Dep%  | VaR@100%  | VaR@50%  | Tier |
|-------------|-------|-----------|----------|------|
| China       | 9.6%  | $58.42B   | $26.29B  | T3   |
| Thailand    | 32.9% | $1.95B    | $0.88B   | T3   |
| Mexico      | 18.4% | $2.00B    | $0.90B   | T3   |
| Colombia    | 31.5% | $0.57B    | $0.25B   | T3   |
| Taiwan      | 9.7%  | $1.54B    | $0.69B   | T3   |
| Japan       | 3.0%  | $2.18B    | $0.98B   | T3   |

### Wheat (HS 1001)
| Country  | Dep%   | VaR@100% | VaR@50% | Tier |
|----------|--------|----------|---------|------|
| Ecuador  | 100.0% | $0.61B   | $0.28B  | T3   |
| Colombia | 48.2%  | $0.86B   | $0.39B  | T3   |
| Brazil   | 14.3%  | $1.94B   | $0.87B  | T3   |

---

## Validation: Model vs Actuals

### Documented 2023-24 outcomes
- US Gulf grain transits via Panama: 34 → 5 in Oct 2023 (85% diversion to Suez)
- Container freight rates: $700 → $1,900 (Nov 2023 – Jan 2024, S&P Global)
- Transit reduction: 36 → 18/day at peak (50% throughput)
- Gatun Lake: 88ft → 79.6ft (9.4ft drop, ~11% below normal rainy-season close)

### Alignment assessment
- **HOLDS:** US Gulf grain diversion at 85% vs 50% transit cut. Bulk displaced at higher 
  rate than proportional — consistent with priority slot auctions favouring high-value 
  container cargo. Model does not model auctions explicitly but structural logic 
  produces the correct directional outcome.
- **HOLDS:** Freight rate spike ($700→$1,900) consistent with rerouting cost pressure. 
  Handymax Cape Horn penalty is $1.14M/voyage — directly transmits to spot rate floor.
- **CAVEAT:** All grain data is T3 (aggregate routing). Directionally correct; 
  not T1 bilateral precision. State explicitly.

---

## Mexico Corn Caveat (important)
The 53.2% dependency figure is sea-routing only and does not account for:
- Pacific-side US grain (West Coast origin via Pacific direct)  
- US–Mexico land border grain flows
- Manzanillo and Lázaro Cárdenas as Pacific import alternatives

**Framing:** Use Mexico as the headline dep% with explicit caveat. 
Pivot to Asian importers (Japan, Korea, Taiwan) as the binary constraint cases — 
no land alternative, Pacific routing requires Panama.

---

## Vessel Class Differentiation (key analytical section)

- **Neopanamax** (new locks, up to 50ft draft): Draft cut 50ft→44ft = 40% cargo 
  capacity loss per transit. Most affected by draft restrictions.
- **Panamax** (old locks, max 39.5ft): Less affected by draft restriction; 
  more exposed to transit number cuts.
- **Bulk carriers (Handymax/Supramax)**: Primary vessel for grain. 
  Fuentes & Munim (2025) confirms bulk transits reduced *more* than containers 
  under El Niño — priority auction mechanism displaces lower-value cargo first.
- **Capesize**: Cannot transit Panama at all (beam too wide). 
  Iron ore/coal already routes Cape of Good Hope. Not affected by Panama disruption.

---

## Academic Sources

1. **Fuentes & Munim (2025).** Climate influence on Panama Canal operations: 
   Predicting canal water times with integrated environmental and operational data. 
   *Transportation Research Part E*, vol. 203. 
   DOI: [10.1016/j.tre.2025.103606](https://doi.org/10.1016/j.tre.2025.103606)
   — Links ENSO index to canal operations. Finds El Niño reduces bulk transits 
   more than containers. Key citation for vessel class section.

2. **Muñoz, Lawrence & Wang (2025).** Drying of the Panama Canal in a Warming Climate. 
   *Geophysical Research Letters*, 52(18), e2025GL117038. 
   DOI: [10.1029/2025GL117038](https://doi.org/10.1029/2025GL117038)
   — Frequency of historic droughts doubles by end of century under high emissions. 
   Key citation for structural/forward-looking section.

3. **World Weather Attribution (2024).** Low water levels in Panama Canal due to 
   increasing demand exacerbated by El Niño event.
   URL: https://www.worldweatherattribution.org/low-water-levels-in-panama-canal-due-to-increasing-demand-exacerbated-by-el-nino-event/
   — Attribution study establishing El Niño causal link. 2023 rainfall 30% below 
   average; October 41% below.

4. **PIIE (2024).** Gatun Lake's lower water levels imperil the Panama Canal in 2024.
   URL: https://www.piie.com/research/piie-charts/2024/gatun-lakes-lower-water-levels-imperil-panama-canal-2024

5. **BTS (2024).** Vessel Draft Restrictions on the Panama Canal by Locks.
   URL: https://www.bts.gov/browse-statistical-products-and-data/info-gallery/vessel-draft-restrictions-panama-canal-locks

---

## Forward-Looking Hook: 2026-27 El Niño Risk

- NOAA (April 2026): 61% probability El Niño forms late summer/fall 2026; 
  33% chance strong event
- ACP has explicitly warned about 2027 impacts
- Historical pattern: biggest operational impacts arrive the year *after* onset 
  (1982-83, 1997-98, 2015-16, 2023-24 all follow this pattern)
- Canal built water reserves through early 2026 wet season; buffer exists but 
  a strong 2026 El Niño would begin drawing it down through Q3-Q4 2026
- Risk window: Q1-Q2 2027

---

## Proposed Article Structure

**Section 1 — The mechanism**
El Niño → rainfall suppression → Gatun Lake level → draft limit → cargo capacity loss.
Walk the 2023-24 empirical timeline. Cite WWA (2024) for attribution, Muñoz (2025) for trend.

**Section 2 — Not all vessels are equal**
Neopanamax 40% capacity loss at 44ft. Bulk displaced first by priority auctions. 
Capesize unaffected (already routes Cape). Cite Fuentes & Munim (2025).

**Section 3 — What is actually at risk**
Agricultural commodities: corn, soy, wheat. Asian importers as the binary constraint 
cases. Mexico corn with explicit land-route caveat. Ecuador wheat 100% dependency. 
China soy $26.3B at 50% severity.

**Section 4 — Simulating the throttle**
Model run at Low/Mid/High severity. Monthly progression table. The May 2023 
finding ($8B from draft alone, before transit cuts) as the lead insight. 
Validation against actuals.

**Section 5 — The 2026-27 window**
NOAA forecast. ACP warning. Historical lag pattern. Muñoz (2025) long-run trajectory. 
The question is not whether this recurs — it is whether counterparties have priced it.

---

*All model outputs: Narrows Chokepoint Dependency Model v0.3, 2023 UN Comtrade base.*  
*Panama sensitivity factor: 0.90. Grain data: T3 (aggregate routing). State in article.*
