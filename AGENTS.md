# Agents – Energie

Agenti a společná pravidla jsou v [ha-dashboard-kit](https://github.com/michal-madle/ha-dashboard-kit/blob/main/AGENTS.md). Karta žádné vlastní kopie nemá. Zde je jen to, co platí pro Energii.

## Omezení

- Omezení „bez AI a Forecastu“ platí jen pro Klima, ne pro Energii.
- L4+ signály (předpověď, trend) se posuzují jen v rozsahu, který je ve `CURRENT_SPEC.md` (oddíl Slunce). Zobrazení historie spotřebičů a počtu cyklů je povolené (uživatel 2. 11. 2026). Cokoli dalšího nad to je otázka pro uživatele v chatu.

## Zdroje specifické pro Energii

- Soukromý repozitář `ha-config`: `ha/entities.json` je obraz Home Assistantu, z něj je odvozená `energie/ENTITY_MAP.md`. Týdenní ladění je v `energie/tyden/` (`TYDEN.md`, `data/`).
- `CURRENT_SPEC.md`, tabulka „Zdroje pravdy“: entity s jednotkou a znaménkem.
