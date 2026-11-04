# Agents – Energie

Agenti a společná pravidla jsou v [ha-dashboard-kit](https://github.com/michal-madle/ha-dashboard-kit/blob/main/AGENTS.md). Karta žádné vlastní kopie nemá. Zde je jen to, co platí pro Energii.

## Omezení

- Omezení „bez AI a Forecastu“ platí jen pro Klima, ne pro Energii.
- L4+ signály (předpověď, trend) se posuzují jen v rozsahu, který je ve `CURRENT_SPEC.md` (oddíl Slunce). Zobrazení historie spotřebičů a počtu cyklů je povolené (uživatel 2. 11. 2026). Cokoli dalšího nad to je otázka pro uživatele v chatu.

## Zdroje specifické pro Energii

- Soukromý repozitář `ha-config`: `energie/entity/energie.json` je export entit, z něj je odvozená `ENTITY_MAP.md` (další exporty ve stejné složce). Týdenní ladění je v `energie/tyden/` (`TYDEN.md`, `FORECAST.md`, `data/`).
- `CURRENT_SPEC.md`, tabulka „Zdroje pravdy“: entity s jednotkou a znaménkem.
