# Nástěnka Energie pro Home Assistant

Vlastní Lovelace karta `custom:ha-energie-dashboard` pro přehled energie domu: FVE, síť, baterie, dům, auto, wallbox, bojler, zásobník a mísení vody. Nahradí dashboard „Energie dům“ (`/energie-dum`) jednou kartou, jako to udělala [karta Klima](https://github.com/michal-madle/ha-klima-dashboard) pro místnosti. Je to **frontendová karta**, ne integrace ani automatizace. Není potřeba nic vkládat do `configuration.yaml` ani restartovat Home Assistant.

**Stav: prototyp se třemi panely** v podobě podle Apple Human Interface Guidelines, bez Liquid Glass (`CURRENT_SPEC.md`, Vzhled podle Apple HIG). Elektřina: Sankey diagram toků, hladina baterie, auta a bojleru jako výplň dlaždic, popupy s dnešními součty (dlaždice i záhlaví), upozornění jen na odchylky; Auto a Bojler se skrývají, když nejsou potřeba. BMW i3: stav, nabití, dojezd, odkud auto nabíjí, chráněný přepínač Přetoky | Boost s nabíjecím výkonem, řádek Wallbox se stářím dat a přepínači Zablokovat nabíjení a Přednost před bojlerem. Teplá voda: dva obloukové měřiče (Bojler, Zásobník), Boost bojleru a Mísení chráněné podržením nebo dvojklepnutím, cílové teploty, Auto | Manual | Off a teplota zásobníku. Všechny limity, prahy, stupnice, barvy a nadpisy jsou v konfiguraci s výchozími hodnotami. Baterie má popup s 10dílným měřičem, odhadem času a mikrotrendem a po klepnutí „Detail baterie“ se záložkami Dnes, Historie (1 den, 7 dní, 30 dní) a Zdraví; historie se čte z dlouhodobých statistik Home Assistantu (entity potřebují `state_class`). Ještě chybí historie ostatních dlaždic, „Jak dlouho“, detailní obrazovky Voda a Wallbox a ovládání limitu nabití auta (`IDEAS.md`, N1). Funkce v živém Home Assistantu je třeba ověřit (`TODO.md`, E4). Denní součty v popupech potřebují čítače z [examples/denni_soucty.yaml](./examples/denni_soucty.yaml); bez nich ukazují „––“.

## Který soubor je správný?

- `src/` obsahuje TypeScriptový zdrojový kód; `index.ts` registruje kartu a `ha-energie-dashboard.ts` skládá hlavní Lit komponentu z částí `base.ts` (společný základ), `controls.ts` (chráněné ovladače), `electricity.ts`, `car.ts` a `water.ts` (panely). Rozdělení a zbytek struktury viz [.github/copilot-instructions.md](./.github/copilot-instructions.md).
- `ha-energie-dashboard.js` v kořeni repozitáře je připravený JavaScriptový modul, který načítá Home Assistant. Ručně se neupravuje, vzniká příkazem `npm run build`.

## Instalace přes HACS

1. V Home Assistantu otevřete **HACS** → nabídka **⋮** → **Vlastní repozitáře** (*Custom repositories*).
2. Vložte `https://github.com/michal-madle/ha-energie-dashboard`, kategorie **Dashboard**, potvrďte.
3. Vyhledejte **Energie Dashboard** a zvolte **Stáhnout** (*Download*).
4. V **Nastavení → Nástěnky → Zdroje** (*Settings → Dashboards → Resources*) ověřte zdroj `/hacsfiles/ha-energie-dashboard/ha-energie-dashboard.js` typu **JavaScript module** (HACS ho obvykle přidá sám; nepřidávejte ho dvakrát).
5. Na nástěnce **⋮ → Upravit nástěnku → Přidat kartu → Ruční** (*Manual*) a vložte celý obsah [examples/energie.yaml](./examples/energie.yaml). Uložte kartu i nástěnku.

Jaká verze karty v prohlížeči doopravdy běží, ukáže konzole (F12): řádek `ENERGIE-DASHBOARD` s verzí, časem sestavení (UTC) a commitem, po kterém vzniklo. Když tam je starší čas než poslední změna, prohlížeč nebo aplikace drží starý modul: v HACS *Update information* a *Redownload*, pak tvrdé obnovení (Ctrl+Shift+R) nebo v mobilní aplikaci *Reset frontend cache*.

Ruční instalace bez HACS: soubor `ha-energie-dashboard.js` uložte do `/config/www/` a jako zdroj přidejte `/local/ha-energie-dashboard.js` (JavaScript module). Když se po aktualizaci změna neprojeví, změňte adresu na `/local/ha-energie-dashboard.js?v=2`.

Dokud karta nemá všechny funkce dnešního dashboardu, nechte „Energie dům“ beze změny a kartu přidejte na zkoušku vedle něj.

## Konfigurace

Všechno, co jde nastavit, je v YAML konfiguraci karty. [Příklad](./examples/energie.yaml) obsahuje úplně všechna nastavení. Klíč bez hodnoty (např. `power:`) nebo smazaný klíč znamená výchozí hodnotu; entity výchozí hodnotu nemají, nenastavená entita se ukáže jako „––“. Každá proměnná karty (limity, prahy, stupnice, krok posuvníků, barvy, nadpisy) je v konfiguraci s výchozí hodnotou; v kódu žádná skrytá konstanta není. Chybnou hodnotu karta neignoruje: místo karty ukáže chybu s názvem klíče (např. `wallbox.boost must be a switch entity (switch.…), not sensor.wallbox_boost`). Přesná pravidla jsou v [CURRENT_SPEC.md](./CURRENT_SPEC.md#konfigurace).

Detail baterie používá navíc entity `battery.*` (zdraví, napětí, teploty článků, čítače, limity, chyby) a klíče `battery.default_range` (`1d`, `7d`, `30d`; zvolený rozsah si prohlížeč pamatuje), `battery.capacity` a `battery.imbalance_*`; všechny jsou v příkladu.

Klíče jsou po systémech: `language`, `title`, `titles`, `pv`, `battery`, `grid`, `house`, `car`, `wallbox`, `boiler`, `water`, `tank`, `mixing`, `daily` (denní čítače pro popupy), `flows` (prahy a pásy toků, počet desetinných míst kW: `auto` = aspoň tři číslice, výchozí, nebo 1 či 2), `scale`, `ui` (podržení, dvojklep, nápověda, vrácení nepotvrzené volby) a `colors`. Výchozí hodnoty a význam každého klíče jsou v tabulce v [CURRENT_SPEC.md](./CURRENT_SPEC.md#konfigurace).

ID entit v příkladu potvrdil export z 24. 10. 2026 ([ENTITY_MAP.md](./ENTITY_MAP.md)). Odhadnutá ID nepoužívejte.

## Export entit z Home Assistantu

Šablona [HA entities/export_entit.jinja](./HA%20entities/export_entit.jinja) vypíše entity všech systémů včetně jednotek a času posledního hlášení; vkládá se do **Nástroje → Šablona** a v Home Assistantu nic nemění. Postup krok za krokem je v [HA entities/README.md](./HA%20entities/README.md), poslední export v [HA entities/energie.json](./HA%20entities/energie.json). Repozitář je veřejný: poloha, sériová čísla a MAC adresy se v exportu skrývají.

## Společný kit

Co mají karty Energie a Klima společné, je v repozitáři [ha-dashboard-kit](https://github.com/michal-madle/ha-dashboard-kit) a tato karta to používá jako závislost: jazyky a formáty čísel a času, čtení entit, pravidla konfigurace, gesto podržení nebo dvojklep, ovládací prvky (přepínač, segmentový ovladač, posuvník), nastavení TypeScriptu, sestavení a testovací infrastruktura. **Společný kód a společná pravidla se zakládají v kitu, ne tady**; v téhle kartě zůstávají její entity, texty (`src/translations/`), model toků a vzhled. Kde co hledat a jak se kit mění, říká [README kitu](https://github.com/michal-madle/ha-dashboard-kit#readme) a jeho `CURRENT_SPEC.md` (oddíl Kam co patří); v téhle kartě [CURRENT_SPEC.md](./CURRENT_SPEC.md#společný-kit-ha-dashboard-kit).

## Dokumentace projektu

- [CURRENT_SPEC.md](./CURRENT_SPEC.md) – aktuální specifikace a zdroj pravdy
- [ENTITY_MAP.md](./ENTITY_MAP.md) – entity, jednotky, znaménka, zdroje a stav ověření
- [TODO.md](./TODO.md) – rozpracované otázky a ověření (nejsou součástí zadání)
- [IDEAS.md](./IDEAS.md) – nápady a „nice to have“, ze kterých se vybírá
- [FORECAST.md](./FORECAST.md) – koncept výhledu dne, „co když“ a popisků podle normy
- [TYDEN.md](./TYDEN.md) – týdenní ladění předpovědi a pravidel: vaše pravidla nabíjení, cíl auta, otázky tohoto týdne
- [AI_MCP.md](./AI_MCP.md) – připojení Claude k Home Assistantu (MCP, AI Task)
- [AUDIT.md](./AUDIT.md) – otevřené rozpory mezi zdroji
- [MEMORY_SUMMARIZED.md](./MEMORY_SUMMARIZED.md) – stručná projektová paměť

## Sestavení

Po změně ve složce `src/` spusťte v kořeni repozitáře `npm install` a `npm run build`. Výsledek se zapíše do `dist/` a zkopíruje do kořenového `ha-energie-dashboard.js`, který používá HACS. Kit se stahuje z GitHubu při `npm install` (verze je v `package.json`); aktualizace kitu je `npm install git+https://github.com/michal-madle/ha-dashboard-kit.git#<commit>` a nový běh testů.

## Testy

`npm test` kartu sestaví a spustí 21 testů v prohlížeči (Playwright, Chromium) na zkušební stránce [tests/harness.html](./tests/harness.html) s náhradními daty Home Assistantu ([tests/scenarios.js](./tests/scenarios.js)); všechny scénáře používají přímo [příklad YAML](./examples/energie.yaml). Související kontroly jsou v jednom testu jako kroky (`test.step`), aby se karta nenačítala pro každou zvlášť:

- konfigurace: příklad obsahuje všechna nastavení a výchozí hodnoty jsou přesně ty v příkladu; chybné hodnoty zastaví kartu chybou s názvem klíče; klíč bez hodnoty je výchozí; čísla, nadpisy a barvy se projeví na kartě; `title: ""` vynechá nadpis;
- jazyky: čeština, angličtina a švédština (žádný český text v cizím jazyce, rozložení na 320 px, čísla a procenta podle jazyka, přepnutí jazyka za běhu, `language` v YAML);
- karty: Elektřina (Sankey, hladiny v dlaždicích, skrývání Auta a Bojleru, popupy s denními součty, upozornění), BMW i3 (stav, odkud auto nabíjí, měřič a limit, Wallbox) a Teplá voda (oblouky, cílové teploty, zásobník, mísení);
- ovládání: chráněné prvky (jedno klepnutí jen nápověda, podržení, dvojklik, tah jezdcem, klávesnice hned), nabíjecí výkon, Boost při zablokovaném nabíjení, vrácení nepotvrzené volby;
- rozložení: bez vodorovného posouvání na 320 až 768 px a na telefonu na šířku 852 × 393, nic se neořízne, řádky aspoň 44 px;
- chybějící data (`unavailable`, `unknown`, bez entit): ikona zůstane, „––“ neutrálně, čtečka řekne „bez dat“;
- přístupnost (axe-core) v tmavém i světlém režimu a přepínání režimu podle Home Assistantu.

`npm run coverage` spustí tytéž testy s měřením pokrytí kódu (V8 v Chromiu přes zdrojovou mapu na `src/*.ts`; distribuovaný soubor nemění). Stav 28. 10.: příkazů 94,4 %, větví 89,4 %, funkcí 87,1 %, řádků 94,9 %.

Poprvé je potřeba stáhnout prohlížeč: `npx playwright install chromium`. Volitelně WebKit: `npx playwright install webkit` a `PW_WEBKIT=1 npm test`. Zkušební stránku lze otevřít i ručně: `node tests/server.mjs` a `http://127.0.0.1:4174/tests/harness.html?s=full` (scénáře `full`, `unavailable`, `missing`; světlý režim `&theme=light`). Port 4174 je jiný než u karty Klima (4173), takže testy obou projektů mohou běžet zároveň.
