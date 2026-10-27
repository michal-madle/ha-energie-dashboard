# Nástěnka Energie pro Home Assistant

Vlastní Lovelace karta `custom:ha-energie-dashboard` pro přehled energie domu: FVE, síť, baterie, dům, auto, wallbox, bojler, zásobník a mísení vody. Nahradí dashboard „Energie dům“ (`/energie-dum`) jednou kartou, jako to udělala [karta Klima](https://github.com/michal-madle/ha-klima-dashboard) pro místnosti. Je to **frontendová karta**, ne integrace ani automatizace. Není potřeba nic vkládat do `configuration.yaml` ani restartovat Home Assistant.

**Stav: první funkční verze.** Karta čte skutečné entity, kreslí Sankey diagram toků energie (zdroje vlevo, spotřebiče vpravo, pásy v barvě zdroje), tři měřiče (baterie, auto, bojler), upozornění a ovládání (Boost wallboxu a bojleru, blokace a přednost wallboxu, cíl ohřevu bojleru, režim a teplota zásobníku). Karty BMW i3 a Teplá voda, detaily a mísení vody přijdou v dalších kolech (`TODO.md`). Vzhled: podle Apple Human Interface Guidelines, bez Liquid Glass (`CURRENT_SPEC.md`, Vzhled podle Apple HIG); kód karty zatím má starý vzhled a přepíše se po schválení designu.

## Který soubor je správný?

- `src/` obsahuje TypeScriptový zdrojový kód; `index.ts` registruje kartu a `ha-energie-dashboard.ts` obsahuje hlavní Lit komponentu.
- `ha-energie-dashboard.js` v kořeni repozitáře je připravený JavaScriptový modul, který načítá Home Assistant. Ručně se neupravuje, vzniká příkazem `npm run build`.

## Instalace přes HACS

1. V Home Assistantu otevřete **HACS** → nabídka **⋮** → **Vlastní repozitáře** (*Custom repositories*).
2. Vložte `https://github.com/michal-madle/ha-energie-dashboard`, kategorie **Dashboard**, potvrďte.
3. Vyhledejte **Energie Dashboard** a zvolte **Stáhnout** (*Download*).
4. V **Nastavení → Nástěnky → Zdroje** (*Settings → Dashboards → Resources*) ověřte zdroj `/hacsfiles/ha-energie-dashboard/ha-energie-dashboard.js` typu **JavaScript module** (HACS ho obvykle přidá sám; nepřidávejte ho dvakrát).
5. Na nástěnce **⋮ → Upravit nástěnku → Přidat kartu → Ruční** (*Manual*) a vložte celý obsah [examples/energie.yaml](./examples/energie.yaml). Uložte kartu i nástěnku.

Ruční instalace bez HACS: soubor `ha-energie-dashboard.js` uložte do `/config/www/` a jako zdroj přidejte `/local/ha-energie-dashboard.js` (JavaScript module). Když se po aktualizaci změna neprojeví, změňte adresu na `/local/ha-energie-dashboard.js?v=2`.

Dokud karta nemá všechny funkce dnešního dashboardu, nechte „Energie dům“ beze změny a kartu přidejte na zkoušku vedle něj.

## Konfigurace

Všechno, co jde nastavit, je v YAML konfiguraci karty. [Příklad](./examples/energie.yaml) obsahuje úplně všechna nastavení. Klíč bez hodnoty (např. `power:`) nebo smazaný klíč znamená výchozí hodnotu; entity výchozí hodnotu nemají, nenastavená entita se ukáže jako „––“. Chybnou hodnotu karta neignoruje: místo karty ukáže chybu s názvem klíče (např. `wallbox.boost must be a switch entity (switch.…), not sensor.wallbox_boost`). Přesná pravidla jsou v [CURRENT_SPEC.md](./CURRENT_SPEC.md#konfigurace).

| Klíč | Výchozí | Co nastavuje |
|---|---|---|
| `title` | `Energie` | nadpis; `""` ho vynechá |
| `pv.power` | – | výkon FVE |
| `battery.power`, `battery.state_of_charge` | – | výkon a nabití baterie |
| `grid.power` | – | výkon na elektroměru |
| `house.power` | – | spotřeba domu |
| `car.state_of_charge`, `car.range` | – | nabití a dojezd auta |
| `wallbox.power`, `wallbox.status`, `wallbox.boost` | – | wallbox (`boost` je `switch.…`) |
| `wallbox.block_charging`, `wallbox.prioritize_connected` | – | zablokovat nabíjení a přednost před bojlerem (`switch.…`) |
| `boiler.power`, `boiler.temperature`, `boiler.boost` | – | bojler (`boost` je `switch.…`) |
| `boiler.target_temperature`, `boiler.boost_target_temperature` | – | cíl ohřevu z přebytku a v boostu (`number.…`, 20–85 °C) |
| `tank.water_heater` | – | zásobník (`water_heater.…`) |
| `mixing.valve_c1`, `mixing.valve_c2`, `mixing.script` | – | ventily mísení (`switch.…`) a skript přepnutí (`script.…`) |

ID entit v příkladu potvrdil export z 24. 10. 2026 ([ENTITY_MAP.md](./ENTITY_MAP.md)). Odhadnutá ID nepoužívejte.

## Export entit z Home Assistantu

Šablona [HA entities/export_entit.jinja](./HA%20entities/export_entit.jinja) vypíše entity všech systémů včetně jednotek a času posledního hlášení; vkládá se do **Nástroje → Šablona** a v Home Assistantu nic nemění. Postup krok za krokem je v [HA entities/README.md](./HA%20entities/README.md), poslední export v [HA entities/energie.json](./HA%20entities/energie.json). Repozitář je veřejný: poloha, sériová čísla a MAC adresy se v exportu skrývají.

## Dokumentace projektu

- [CURRENT_SPEC.md](./CURRENT_SPEC.md) – aktuální specifikace a zdroj pravdy
- [ENTITY_MAP.md](./ENTITY_MAP.md) – entity, jednotky, znaménka, zdroje a stav ověření
- [TODO.md](./TODO.md) – otevřené otázky a návrhy (nejsou součástí zadání)
- [AUDIT.md](./AUDIT.md) – otevřené rozpory mezi zdroji
- [MEMORY_SUMMARIZED.md](./MEMORY_SUMMARIZED.md) – stručná projektová paměť

## Sestavení

Po změně ve složce `src/` spusťte v kořeni repozitáře `npm install` a `npm run build`. Výsledek se zapíše do `dist/` a zkopíruje do kořenového `ha-energie-dashboard.js`, který používá HACS.

## Testy

`npm test` kartu sestaví a spustí 17 testů v prohlížeči (Playwright, Chromium) na zkušební stránce [tests/harness.html](./tests/harness.html) s náhradními daty Home Assistantu ([tests/scenarios.js](./tests/scenarios.js)); všechny scénáře používají přímo [příklad YAML](./examples/energie.yaml):

- konfigurace: příklad obsahuje všechna nastavení a výchozí nadpis a režim; chybné hodnoty zastaví kartu chybou s názvem klíče; klíč bez hodnoty je výchozí; `title: ""` vynechá nadpis;
- rozložení: bez vodorovného posouvání na 320, 360, 375, 393, 430 a 768 px a na telefonu na šířku 852 × 393, nic se neořízne, řádky aspoň 44 px;
- chybějící data: bez entit, `unavailable` a `unknown` – ikona zůstane, „––“ neutrálně (i ikona), čtečka řekne „bez dat“, v tmavém i světlém režimu;
- přístupnost (axe-core) v obou režimech, i bez dat a bez nadpisu; přepínání režimu podle Home Assistantu, vynucení a podle systému.

`npm run coverage` spustí tytéž testy s měřením pokrytí kódu (V8 v Chromiu přes zdrojovou mapu na `src/*.ts`); sestaví kartu zvlášť do `coverage/build` a distribuovaný soubor nemění.

Poprvé je potřeba stáhnout prohlížeč: `npx playwright install chromium`. Volitelně WebKit: `npx playwright install webkit` a `PW_WEBKIT=1 npm test`. Zkušební stránku lze otevřít i ručně: `node tests/server.mjs` a `http://127.0.0.1:4174/tests/harness.html?s=full` (scénáře `full`, `unavailable`, `missing`; světlý režim `&theme=light`). Port 4174 je jiný než u karty Klima (4173), takže testy obou projektů mohou běžet zároveň.
