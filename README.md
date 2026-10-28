# Nástěnka Energie pro Home Assistant

Vlastní Lovelace karta `custom:ha-energie-dashboard` pro přehled energie domu: FVE, síť, baterie, dům, auto, wallbox, bojler, zásobník a mísení vody. Nahradí dashboard „Energie dům“ (`/energie-dum`) jednou kartou, jako to udělala [karta Klima](https://github.com/michal-madle/ha-klima-dashboard) pro místnosti. Je to **frontendová karta**, ne integrace ani automatizace. Není potřeba nic vkládat do `configuration.yaml` ani restartovat Home Assistant.

**Stav: prototyp se třemi panely** v podobě podle Apple Human Interface Guidelines, bez Liquid Glass (`CURRENT_SPEC.md`, Vzhled podle Apple HIG). Elektřina: Sankey diagram toků, hladina baterie, auta a bojleru jako výplň dlaždic, popupy s dnešními součty (dlaždice i záhlaví), upozornění jen na odchylky; Auto a Bojler se skrývají, když nejsou potřeba. BMW i3: stav, nabití, dojezd, odkud auto nabíjí, chráněný přepínač Přetoky | Boost s nabíjecím výkonem, řádek Wallbox se stářím dat a přepínači Zablokovat nabíjení a Přednost před bojlerem. Teplá voda: dva obloukové měřiče (Bojler, Zásobník), Boost bojleru a Mísení chráněné podržením nebo dvojklepnutím, cílové teploty, Auto | Manual | Off a teplota zásobníku. Všechny limity, prahy, stupnice, barvy a nadpisy jsou v konfiguraci s výchozími hodnotami. Ještě chybí historie, „Jak dlouho“, detailní obrazovky Voda a Wallbox a ovládání limitu nabití auta (`TODO.md`). Funkce v živém Home Assistantu je třeba ověřit (`TODO.md`, P1.11). Denní součty v popupech potřebují čítače z [examples/denni_soucty.yaml](./examples/denni_soucty.yaml); bez nich ukazují „––“.

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
| `battery.reserve` | `20` | % rezerva baterie (nabití pod ní je oranžové) |
| `grid.power` | – | výkon na elektroměru |
| `house.power` | – | spotřeba domu |
| `car.state_of_charge`, `car.range` | – | nabití a dojezd auta |
| `car.image` | – | obrázek auta (`image.…`, adresa v atributu `entity_picture`) |
| `car.charge_limit` | `100` | % limit nabití auta (značka na měřiči auta se kreslí jen pod 100 %) |
| `wallbox.power`, `wallbox.status`, `wallbox.boost` | – | výkon, stav a boost wallboxu (`boost` je `switch.…`) |
| `wallbox.block_charging`, `wallbox.prioritize_connected` | – | zablokovat nabíjení a přednost před bojlerem (`switch.…`) |
| `wallbox.charging_power` | – | nabíjecí výkon v boostu (`number.…`, W na fázi; k ověření) |
| `wallbox.phases` | `3` | počet fází; celkový výkon = hodnota entity × fáze |
| `wallbox.power_min`, `wallbox.power_max`, `wallbox.power_step` | `4200`, `11100`, `300` | W, rozsah a krok nabíjecího výkonu (všechny fáze) |
| `wallbox.priority_min_sun` | `200` | W slunce, od kterého karta hlásí, že přednostní auto čeká |
| `boiler.power`, `boiler.temperature`, `boiler.boost` | – | výkon, teplota a boost bojleru (`boost` je `switch.…`) |
| `boiler.target_temperature`, `boiler.boost_target_temperature` | – | cíl ohřevu z přebytku a v boostu (`number.…`) |
| `boiler.target_min`, `boiler.target_max`, `boiler.target_step` | `20`, `85`, `5` | °C, rozsah a krok cíle ohřevu |
| `boiler.show` | `always` | `always` = dlaždice Bojler v diagramu Elektřina vždy; `heating` = jen při ohřevu a `boiler.hold_minutes` po něm |
| `boiler.hold_minutes` | `15` | min, jak dlouho po konci ohřevu zůstane dlaždice Bojler vidět (jen při `boiler.show: heating`) |
| `water.gauge_min`, `water.gauge_max` | `15`, `65` | °C, stupnice obou obloukových měřičů: od minima do vyšší z hodnot `gauge_max` a cíle Přetoky |
| `colors.temp_scale` | `20 #0A84FF, 32 #5AC8FA, 44 #FFD60A, 58 #FF9F0A, 85 #FF453A` | °C a barva, přechod výplně obloukových měřičů |
| `tank.water_heater` | – | zásobník (`water_heater.…`) |
| `tank.temp_min`, `tank.temp_max`, `tank.temp_step` | `38`, `65`, `1` | °C, rozsah a krok teploty zásobníku (stupnice oblouku i posuvníku; rysky po 5 °C) |
| `mixing.valve_c1`, `mixing.valve_c2`, `mixing.script` | – | ventily mísení (`switch.…`) a skript přepnutí (`script.…`) |
| `daily.pv_generation`, `.battery_charge`, `.battery_discharge`, `.grid_import`, `.grid_export`, `.car`, `.boiler` | – (příklad: `sensor.energie_*_dnes`, `car` a `boiler` prázdné) | denní čítače v kWh (nebo Wh/MWh) pro popupy; vznikají přes `utility_meter` ([examples/denni_soucty.yaml](./examples/denni_soucty.yaml)); Dům = zbytek, počítá se jen ze všech sedmi |
| `flows.idle_threshold` | `100` | W, pod tím je tok žádný (šum, „0,0 kW“); platí pro všechny toky i věty o stavu |
| `flows.kw_from` | `1000` | W, od tohoto se všechny výkony ukazují v kW |
| `flows.export_notice` | `300` | W přetoků do sítě, od kterých věta o stavu říká „Přebytek jde do sítě“ |
| `flows.source_min_share`, `flows.grid_deviation_share` | `15`, `50` | %, podíl zdroje pojmenovaný v textu; podíl sítě, nad kterým je to odchylka |
| `flows.band_max_px_per_kw`, `flows.band_min_px` | `10`, `1.6` | px, nejtlustší (na kW) a nejtenčí pás ve Sankey |
| `scale.sun`, `scale.battery`, `scale.grid`, `scale.house`, `scale.car`, `scale.boiler` | `10000`, `5000`, `10000`, `10000`, `11100`, `4000` | W, výkon, při kterém má dlaždice plný odstín a záři |
| `ui.revert_after` | `6` | s, po kterých se zvolená hodnota vrátí na skutečný stav, když ji Home Assistant nepotvrdí |
| `ui.hold_ms`, `ui.double_tap_ms` | `550`, `400` | ms, podržení a okno dvojklepnutí chráněného ovladače (Mísení, Boost bojleru, Přetoky \| Boost) |
| `ui.hint_seconds` | `3` | s, jak dlouho zůstane nápověda „Podržte nebo klepněte dvakrát.“ |
| `colors.sun`, `.battery`, `.grid`, `.house`, `.car`, `.boiler` | `#FFD60A`, `#30D158`, `#3D8BFF`, `#BF5AF2`, `#40D0E6`, `#FF6F59` | barvy zdrojů a spotřebičů (`#RRGGBB`) |
| `colors.accent`, `.warning` | `#0A84FF`, `#FF9230` | akcent ovladačů; odchylka a upozornění |
| `colors.cold`, `.hot` | `#64D2FF`, `#FF9F0A` | studená a teplá půlka kapky Mísení vody |
| `colors.neutral` | `#8E8E93` | vypnuté ikony a šedé texty |

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

`npm test` kartu sestaví a spustí 48 testů v prohlížeči (Playwright, Chromium) na zkušební stránce [tests/harness.html](./tests/harness.html) s náhradními daty Home Assistantu ([tests/scenarios.js](./tests/scenarios.js)); všechny scénáře používají přímo [příklad YAML](./examples/energie.yaml):

- konfigurace: příklad obsahuje všechna nastavení a výchozí hodnoty jsou přesně ty v příkladu; chybné hodnoty (entity, čísla, pořadí mezí, barvy) zastaví kartu chybou s názvem klíče; klíč bez hodnoty je výchozí; čísla, nadpisy a barvy se projeví na kartě; `title: ""` vynechá nadpis;
- karty: Elektřina (Sankey, hladiny v dlaždicích, skrývání Auta a Bojleru včetně přetrvání přes localStorage, popupy s denními součty, upozornění), BMW i3 (stav, odkud auto nabíjí, měřič a limit, stáří dat, Wallbox) a Teplá voda (oblouky, cílové teploty, zásobník, mísení);
- ovládání: chráněné prvky (jedno klepnutí jen nápověda, podržení, dvojklik, tah jezdcem, klávesnice hned), nabíjecí výkon, Boost při zablokovaném nabíjení, vrácení nepotvrzené volby;
- rozložení: bez vodorovného posouvání na 320, 360, 375, 393, 430 a 768 px a na telefonu na šířku 852 × 393, nic se neořízne, řádky aspoň 44 px;
- chybějící data: bez entit, `unavailable` a `unknown` – ikona zůstane, „––“ neutrálně (i ikona), čtečka řekne „bez dat“, v tmavém i světlém režimu;
- přístupnost (axe-core) v obou režimech, i bez dat a bez nadpisu; přepínání režimu podle Home Assistantu, vynucení a podle systému.

`npm run coverage` spustí tytéž testy s měřením pokrytí kódu (V8 v Chromiu přes zdrojovou mapu na `src/*.ts`); sestaví kartu zvlášť do `coverage/build` a distribuovaný soubor nemění.

Poprvé je potřeba stáhnout prohlížeč: `npx playwright install chromium`. Volitelně WebKit: `npx playwright install webkit` a `PW_WEBKIT=1 npm test`. Zkušební stránku lze otevřít i ručně: `node tests/server.mjs` a `http://127.0.0.1:4174/tests/harness.html?s=full` (scénáře `full`, `unavailable`, `missing`; světlý režim `&theme=light`). Port 4174 je jiný než u karty Klima (4173), takže testy obou projektů mohou běžet zároveň.
