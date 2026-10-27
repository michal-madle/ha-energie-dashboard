# Nástěnka Energie pro Home Assistant

Vlastní Lovelace karta `custom:ha-energie-dashboard` pro přehled energie domu: FVE, síť, baterie, dům, auto, wallbox, bojler, zásobník a mísení vody. Nahradí dashboard „Energie dům“ (`/energie-dum`) jednou kartou, jako to udělala [karta Klima](https://github.com/michal-madle/ha-klima-dashboard) pro místnosti. Je to **frontendová karta**, ne integrace ani automatizace. Není potřeba nic vkládat do `configuration.yaml` ani restartovat Home Assistant.

**Stav: prototyp se třemi panely** v podobě podle Apple Human Interface Guidelines, bez Liquid Glass (`CURRENT_SPEC.md`, Vzhled podle Apple HIG). Elektřina: Sankey diagram toků a tři měřiče. BMW i3: stav, nabití, dojezd, odkud auto nabíjí, upozornění, řádky Wallbox a Boost s ovládáním (režim, nabíjecí výkon, zablokovat, přednost). Teplá voda: schéma bojleru, zásobníku a mísení, řádky Zásobník a Boost bojleru s ovládáním (cíle, režim, teplota, mísení s potvrzením). Všechny limity, prahy, stupnice, barvy a nadpisy jsou v konfiguraci s výchozími hodnotami. Ještě chybí historie, „Jak dlouho“, limit nabití auta jako ovládání, stáří dat auta a souhrn dnešních součtů (`TODO.md`). Funkce v živém Home Assistantu je třeba ověřit (`TODO.md`, P1.11).

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

Všechno, co jde nastavit, je v YAML konfiguraci karty. [Příklad](./examples/energie.yaml) obsahuje úplně všechna nastavení. Klíč bez hodnoty (např. `power:`) nebo smazaný klíč znamená výchozí hodnotu; entity výchozí hodnotu nemají, nenastavená entita se ukáže jako „––“. Každá proměnná karty (limity, prahy, stupnice, krok posuvníků, barvy, nadpisy) je v konfiguraci s výchozí hodnotou; v kódu žádná skrytá konstanta není. Chybnou hodnotu karta neignoruje: místo karty ukáže chybu s názvem klíče (např. `wallbox.boost must be a switch entity (switch.…), not sensor.wallbox_boost`). Přesná pravidla jsou v [CURRENT_SPEC.md](./CURRENT_SPEC.md#konfigurace).

| Klíč | Výchozí | Co nastavuje |
|---|---|---|
| `title` | `Energie` | nadpis nad kartami; `""` ho vynechá |
| `titles.electricity`, `titles.car`, `titles.water` | `Elektřina`, `BMW i3`, `Teplá voda` | nadpisy tří panelů |
| `pv.power` | – | výkon FVE |
| `battery.power`, `battery.state_of_charge` | – | výkon a nabití baterie |
| `battery.reserve` | `20` | % rezerva baterie (značka na měřiči, pod ní oranžově) |
| `grid.power` | – | výkon na elektroměru |
| `house.power` | – | spotřeba domu |
| `car.state_of_charge`, `car.range` | – | nabití a dojezd auta |
| `car.image` | – | obrázek auta (`image.…`, adresa v atributu `entity_picture`) |
| `car.charge_limit` | `80` | % limit nabití auta (značka na měřičích) |
| `wallbox.power`, `wallbox.status`, `wallbox.boost` | – | výkon, stav a boost wallboxu (`boost` je `switch.…`) |
| `wallbox.block_charging`, `wallbox.prioritize_connected` | – | zablokovat nabíjení a přednost před bojlerem (`switch.…`) |
| `wallbox.charging_power` | – | nabíjecí výkon v boostu (`number.…`, W na fázi; k ověření) |
| `wallbox.phases` | `3` | počet fází; celkový výkon = hodnota entity × fáze |
| `wallbox.power_min`, `wallbox.power_max`, `wallbox.power_step` | `4200`, `11100`, `300` | W, rozsah a krok nabíjecího výkonu (všechny fáze) |
| `wallbox.priority_min_sun` | `200` | W slunce, od kterého karta hlásí, že přednostní auto čeká |
| `boiler.power`, `boiler.temperature`, `boiler.boost` | – | výkon, teplota a boost bojleru (`boost` je `switch.…`) |
| `boiler.target_temperature`, `boiler.boost_target_temperature` | – | cíl ohřevu z přebytku a v boostu (`number.…`) |
| `boiler.target_min`, `boiler.target_max`, `boiler.target_step` | `20`, `85`, `5` | °C, rozsah a krok cíle ohřevu |
| `boiler.scale_min`, `boiler.gauge_max`, `boiler.schema_max` | `10`, `60`, `70` | °C, prázdný konec stupnice a plný konec měřiče a schématu |
| `boiler.cold_below`, `boiler.hot_from` | `30`, `45` | °C, hranice studené a teplé vody ve schématu |
| `tank.water_heater` | – | zásobník (`water_heater.…`) |
| `tank.temp_min`, `tank.temp_max`, `tank.temp_step` | `30`, `65`, `5` | °C, rozsah a krok teploty zásobníku |
| `mixing.valve_c1`, `mixing.valve_c2`, `mixing.script` | – | ventily mísení (`switch.…`) a skript přepnutí (`script.…`) |
| `flows.idle_threshold` | `10` | W, pod tím se tok bere jako žádný |
| `flows.kw_from` | `1000` | W, od tohoto se všechny výkony ukazují v kW |
| `flows.sun_covers`, `flows.export_notice`, `flows.battery_flow` | `50`, `300`, `50` | W, prahy vět o stavu (slunce pokrývá dům, přebytek do sítě, nabíjení baterie) |
| `flows.source_min_share`, `flows.grid_deviation_share` | `15`, `50` | %, podíl zdroje pojmenovaný v textu; podíl sítě, nad kterým je to odchylka |
| `flows.band_max_px_per_kw`, `flows.band_min_px` | `10`, `1.6` | px, nejtlustší (na kW) a nejtenčí pás ve Sankey |
| `scale.sun`, `scale.battery`, `scale.grid`, `scale.house`, `scale.car`, `scale.boiler` | `10000`, `5000`, `10000`, `10000`, `11100`, `4000` | W, výkon, při kterém má dlaždice plný odstín a záři |
| `ui.revert_after` | `6` | s, po kterých se zvolená hodnota vrátí na skutečný stav, když ji Home Assistant nepotvrdí |
| `colors.sun`, `.battery`, `.grid`, `.house`, `.car`, `.boiler` | `#FFD60A`, `#30D158`, `#3D8BFF`, `#BF5AF2`, `#40D0E6`, `#FF6F59` | barvy zdrojů a spotřebičů (`#RRGGBB`) |
| `colors.accent`, `.button`, `.warning` | `#0A84FF`, `#0A6ED1`, `#FF9230` | akcent ovladačů, hlavní tlačítko, odchylka a upozornění |
| `colors.cold`, `.neutral` | `#3CD3FE`, `#8E8E93` | studená voda ve schématu; vypnuté ikony a vlažná voda |

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

`npm test` kartu sestaví a spustí 33 testů v prohlížeči (Playwright, Chromium) na zkušební stránce [tests/harness.html](./tests/harness.html) s náhradními daty Home Assistantu ([tests/scenarios.js](./tests/scenarios.js)); všechny scénáře používají přímo [příklad YAML](./examples/energie.yaml):

- konfigurace: příklad obsahuje všechna nastavení a výchozí hodnoty jsou přesně ty v příkladu; chybné hodnoty (entity, čísla, pořadí mezí, barvy) zastaví kartu chybou s názvem klíče; klíč bez hodnoty je výchozí; čísla, nadpisy a barvy se projeví na kartě; `title: ""` vynechá nadpis;
- karty: Elektřina (Sankey, měřiče), BMW i3 (stav, odkud auto nabíjí, upozornění, řádky Wallbox a Boost) a Teplá voda (schéma, mísení, řádky Zásobník a Boost bojleru); rozbalovací detaily s ovládáním, potvrzení mísení, nabíjecí výkon;
- rozložení: bez vodorovného posouvání na 320, 360, 375, 393, 430 a 768 px a na telefonu na šířku 852 × 393, nic se neořízne, řádky aspoň 44 px;
- chybějící data: bez entit, `unavailable` a `unknown` – ikona zůstane, „––“ neutrálně (i ikona), čtečka řekne „bez dat“, v tmavém i světlém režimu;
- přístupnost (axe-core) v obou režimech, i bez dat a bez nadpisu; přepínání režimu podle Home Assistantu, vynucení a podle systému.

`npm run coverage` spustí tytéž testy s měřením pokrytí kódu (V8 v Chromiu přes zdrojovou mapu na `src/*.ts`); sestaví kartu zvlášť do `coverage/build` a distribuovaný soubor nemění.

Poprvé je potřeba stáhnout prohlížeč: `npx playwright install chromium`. Volitelně WebKit: `npx playwright install webkit` a `PW_WEBKIT=1 npm test`. Zkušební stránku lze otevřít i ručně: `node tests/server.mjs` a `http://127.0.0.1:4174/tests/harness.html?s=full` (scénáře `full`, `unavailable`, `missing`; světlý režim `&theme=light`). Port 4174 je jiný než u karty Klima (4173), takže testy obou projektů mohou běžet zároveň.
