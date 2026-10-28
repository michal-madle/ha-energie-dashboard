# Project Memory – Home Assistant Energie Dashboard

- Účel: mobilní (iPhone 14 Pro) přehled energie domu – kam teď teče energie a co potřebuje pozornost; jedna vlastní karta `custom:ha-energie-dashboard` přes HACS z GitHubu (`michal-madle/ha-energie-dashboard`), nahrazuje dashboard „Energie dům“ (`/energie-dum`). Vzor: projekt Klima (`michal-madle/ha-klima-dashboard`).
- Systémy: FVE, baterie a elektroměr (střídač GoodWe), Wallbox a Bojler (FVE) (AZ Router), Zásobník (Plyn) (Tado), Mísení vody (ventily Nous L3), Auto (BMW i3, jen čtení).
- Zdroj pravdy: `CURRENT_SPEC.md`.
- Entity: `ENTITY_MAP.md` (potvrzené jen exportem ve složce `HA entities/`); chybějící entity, jednotky a znaménka se neodhadují. Otevřené rozpory mezi zdroji: `AUDIT.md`.
- Otevřené body: `TODO.md`. Dnešní dashboard (v0, výchozí rozsah) je popsaný v `CURRENT_SPEC.md`. Historie se nevede: neplatné se maže.
- Pravidlo: `CURRENT_SPEC.md` má vždy přednost před čímkoli jiným (staré poznámky, kód, příklady).
- Jazyky: čeština, angličtina, švédština podle profilu Home Assistantu (`language: auto`); každá změna textu upraví všechny tři slovníky v `src/translations/` (oddíl Jazyky ve specifikaci).
