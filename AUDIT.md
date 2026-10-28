# AUDIT

Otevřené rozpory a zjištění mezi zdroji: zadání projektu (stav k 17. 10. 2026), YAML a screenshot dnešního dashboardu „Energie dům“ (24. 10.), export entit `HA entities/energie.json` (24. 10., 22:53), Memory (14.–19. 10.) a zdrojový kód Home Assistant 2026.10.1 a knihovny goodwe 0.4.10. Nic z toho není domyšlené; doporučení jsou označená. Rozhodnutí se zapíší do `CURRENT_SPEC.md` a `ENTITY_MAP.md`; vyřešené body se odsud mažou.

## Rozpory

| # | Rozpor | Doporučení | Stav |
|---|---|---|---|
| 1 | **Spotřeba domu není součet toků.** Knihovna goodwe 0.4.10 (`goodwe/et.py`) počítá `house_consumption` = PV + výkon baterie − `active_power` (registr 35140), ne z elektroměru (`meter_active_power_total`, registr 36025), který dnešní dashboard ukazuje jako Síť. Screenshot 24. 10.: Síť 148 W odběr + Baterie 351 W = 499 W, Dům 459 W. Export 22:53: 0 + 274 − (−119) = 393 W přesně podle vzorce; elektroměr −103 W (součet s baterií 377 W), AZ Router −130 W. | Karta nebude dopočítávat žádný uzel z ostatních ani tvrdit, že toky „sedí“. Zda „Dům“ ukázat jako celkový odběr, nebo bez wallboxu a bojleru, je TODO E2. | potvrzeno exportem |
| 2 | **Ventily přepíná i něco jiného než dashboard.** Memory (Oct 2026): automatizace v aplikaci Tuya „Vypnout FVE cirkulaci“ denně v 17:58 spouští scénu „Malý okruh“; skript na Synology spouští „Velký okruh“ / „Malý okruh“ podle teploty bojleru (10:00–17:30). Zadání to nezmiňuje. | Karta ukáže skutečný stav ventilů, ne svůj poslední příkaz. Ověřit, zda obojí ještě běží a zda „Malý okruh“ = C1 zapnutý, C2 vypnutý (TODO E3). | k ověření |
| 3 | **Mísení: obsah skriptu.** Zadání: přepínají se oba ventily současně. Dnešní dashboard volá `script.prepnout_miseni_vody` (export: režim `single`), jehož obsah není znám. | Ověřit skript (pošlete jeho YAML); karta bude buď volat skript, nebo přepínat ventily sama – TODO E3. | k ověření |
| 4 | **Dnešní dashboard proti pravidlu „chybějící data nejsou poplach“.** Mísení vody: každá jiná kombinace než dvě platné, tedy i nedostupný ventil, je „Nejasný stav“ červeně. | V kartě: nedostupný ventil „––“ neutrálně; oba zapnuté / oba vypnuté je skutečná odchylka – TODO E3. | otevřeno |
| 5 | **Dnešní dashboard proti pravidlu „barva jen při odchylce“.** Nabití auta je zelené od 50 %, oranžové od 20 %, červené pod 20 % (ikona i pruh). | Normální stav bez zelené; barvu jen při odchylce – TODO E8. | otevřeno |
| 6 | **Stáří hlášení není stáří dat.** Export: ventily a skript hlásily naposledy při startu Home Assistantu (před 9,5 h), auto před 2,7 h; střídač a AZ Router před pár sekundami. | Pravidlo zastaralých dat nesmí pro ventily a auto stát na `last_reported` – TODO E1. | zjištění |

## Doporučení pro údržbu

- `ENTITY_MAP.md` měnit jen z nového exportu (`HA entities/`); export obnovit po každém přejmenování entit nebo zařízení.
- Repozitář je veřejný: do exportů a dokumentů nepatří poloha, sériová čísla ani MAC adresy. Šablona exportu je skrývá; před commitem nového exportu to zkontrolovat.
- Pravidla nekopírovat do README ani komentářů v kódu; odkazovat na `CURRENT_SPEC.md`.
- Tvrzení o Home Assistantu a integracích dokládat zdrojem na release tagu; u AZ Routeru a BavarianData (HACS) kódem integrace v použité verzi.
