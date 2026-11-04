# DESIGN_HISTORY – Energie

Jen archiv. Nic z tohoto dokumentu není závazné; platí `CURRENT_SPEC.md`. Pravidla vedení: `AGENTS.md` kitu, oddíl Dokumentace. Nejnovější záznamy jsou nahoře. Stav záznamu: **potvrzeno** (zapsáno do spec), **nahrazeno**, **zamítnuto**, **nepotvrzeno** (otázka položena uživateli v chatu, do spec nepatří).

## Záznamy

### 2026-11-04 · Sušička znovu přidána, nová ID (nahrazeno: uživatel vrátil původní ID)

- Nahrazeno: uživatel 4. 11. 2026: „susicka mela spatny id. vratil jsem to.“ Platí původní `technicka_mistnost_susicka_*`; příklad, testy a mapa jsou vráceny. Text níže je jen historie.
- Zařízení Sušička bylo v Home Assistantu znovu přidáno: ID entit mají nově `susicka_susicka` (například `sensor.technicka_mistnost_susicka_susicka_power`). Přepsáno v `examples/energie.yaml`, `tests/scenarios.js` a `energie/ENTITY_MAP.md` v `ha-config`. Podrobnosti: `DESIGN_HISTORY.md` kitu, záznam z 4. 11. (nové zařízení).

### 2026-11-04 · Obraz Home Assistantu v `ha-config`, vazba na kit (potvrzeno uživatelem)

- `ENTITY_MAP.md` je v `ha-config` jako `energie/ENTITY_MAP.md`, entity ověřuje jeden obraz `ha/entities.json` (místo exportů `energie.json`, `spotrebice.json`, `spotrebice_helpery.json` a šablon). `FORECAST.md` je sloučen do `TYDEN.md`, `spotrebice.txt` odstraněn. Podrobnosti a slova uživatele: `DESIGN_HISTORY.md` kitu, záznam z 4. 11. (ha-config jako obraz HA).
- `package.json` a `package-lock.json`: kit připnut na `79c0d626…` místo `e96c781…`, který zmizel při squash `main` kitu.
- Po prvním skutečném obrazu (4. 11., 1815 entit): zásobník je `water_heater.technicka_mistnost_tado_ce_tepla_voda` (Tado CE), příklad `examples/energie.yaml` a testy používají toto ID místo zakázané entity integrace `tado`; `CURRENT_SPEC.md` už neodkazuje na „nový export“. Podrobnosti: `DESIGN_HISTORY.md` kitu, záznam z 4. 11. (práce na `main`).

### 2026-11-04 · Soukromá data a týdenní ladění přesunuty do `ha-config` (potvrzeno uživatelem)

- Uživatel 4. 11. 2026: „Udelal jsem uklid. adresare HA entities, tools a exporty jsem presunul do privatniho ha-config.“ a „Klidne cokoli uprav, smaz, presun - i mezi repository. Pokud bys nasel dalsi veci co patri jinam, uprav to.“ Kde to bude a jak se to bude jmenovat, je mu jedno; nesmí se nic ztratit.
- Přesunuto do soukromého repozitáře `ha-config`, složka `energie/`: `HA entities/` → `entity/` (`export_entit.jinja` → `energie.jinja`, `export_helpery.jinja` → `spotrebice_helpery.jinja`, `export_spotrebice.jinja` → `spotrebice.jinja`, `README.md` → `entity/README.md` a postup exportu do `README.md` repozitáře), `tools/` (`export_hodiny.py`, `tyden_data.py`, `spotrebice.txt`) → `tyden/`, výstupy exportu → `tyden/export/`, `TYDEN.md`, `FORECAST.md` a `data/` → `tyden/`. Skripty mají výchozí cesty `export/` a `data/` vedle sebe a čtou token z `HA_TOKEN` nebo `--token-file`.
- Nahrazeno: pravidlo, že `TYDEN.md`, `FORECAST.md` a `data/` jsou v repozitáři Energie (rozhodnutí 3. 11., záznam níže); platí dál, že se nemažou, jen jsou v `ha-config`. Cesty ve starších záznamech této historie (`HA entities/`, `tools/`) odpovídají stavu před přesunem.
- Zjištěno při přesunu: `HA entities/export_spotrebice.jinja` nebyla šablona, ale uložený export (63 entit, commit „Aktualizace entit“). Šablona je obnovena z historie (commit `3aae47c`) jako `spotrebice.jinja`; export je `spotrebice.json`, starší `spotrebice.json` (53 entit, 2. 11.) je v `archiv/spotrebice_2026-11-02.json`.
- Uživatel 4. 11. 2026: „entity map taky přesun. V dashboardu budou jen veřejné věci. Private budou v ha-config. Tvrdé pravidlo“ (pravidlo 12 v `AGENTS.md` kitu). `ENTITY_MAP.md` je v `ha-config` jako `energie/entity/ENTITY_MAP.md`; z `README.md` odstraněny oddíly „Export entit z Home Assistantu“ a „Týdenní ladění předpovědi“. Přeodvození mapy z exportů z 3. 11. až po novém exportu (uživatel: „zatím ne, az po novem exportu“).
- Zjištěno: `energie.json` a `spotrebice_helpery.json` v `ha-config` jsou z 3. 11. 2026 (374 a 21 entit), `ENTITY_MAP.md` vychází z exportů z 30. 10. a 2. 11.

### 2026-11-04 · Mřížka ve všech grafech: 6 až 10 svislých dělení, vodorovné čáry ve stejném rastru (potvrzeno uživatelem)

- Uživatel (screenshot grafu Nabití a výkon): „Tyhle grafy bez vodících čar, bez os atd jsou nesmyslné. Jsou na hodně místech. Změn si spec - na šířku okna musí být 6-10 dělení. na výšku musí být cca ve stejném rastru. Změň to všude.“
- Nahrazeno: dřívější osa času jen s „−24 h“ a „teď“ a tři hodnoty svislé osy (spec Detail baterie), mikrograf „bez osy hodnot“ (spec Dům), vodicí čáry Slunce po 2 h a po 1 / 2 kW (spec Slunce), osa Klimatu po 6 h (00, 06, 12, 18). Pravidlo je v kitu (`DASHBOARD_UX_SYSTEM.md`, Grafy), společný kód `src/chart-grid.ts` (`timeTicks`, `fillGrid`, `niceStep`) a `renderChart`.
- Co se změnilo: Energie všechny grafy detailů Baterie (Dnes 6 h a 24 h, Historie 1 / 7 / 30 dní, Zdraví), Dům (Historie, mikrograf v rozbalených řádcích), Slunce (Výkon dnes, Historie 7 a 30 dní, přesnost předpovědi); Klima historie místnosti (osa po 2 / 3 / 6 / 12 h podle období, o půlnoci na dlouhém grafu datum, vodorovné čáry ve stejném rastru). Popisky dnů a hodin sloupců jsou pod středem sloupce, popisky hodnot mají kolem sebe barvu karty (čitelné přes sloupce) a kulaté hodnoty (10, 20, 30, ne 12,5). Osa životnosti baterie má desetiny (dřív 177 / 177 / 176).
- Test `grafy (uživatel 4. 11.)` projde všechny grafy Energie a ověří 6 až 10 svislých dělení a poměr buňky mřížky; test Klimatu to ověří pro historii místnosti.
- Konzultace agentů (kontrola vzhledu na screenshotech 393 px): našli překrývání popisků a popisky dnů mezi sloupci (opraveno), nekulaté hodnoty (opraveno), slabé čáry mikrografu (zesíleny). Neopraveno a není součást mřížky: „Možné“ a legenda ve Slunce Historie ve světlém režimu mají kontrast kolem 1,1 : 1; popisky „0 %“ a „+2 kW“ u dvoudílného grafu Baterie se dotýkají; křivka Slunce Dnes v testovacích datech skáče v čase teď (živý výkon 6,8 kW proti historii, vada dat v testovací scéně); dlaždice „Nejnižší nabití −85 %“ v testovacích datech.
- Nepotvrzeno, otázky položeny D. M.: (1) mikrotrendy v hlavní kartě Klimatu (CO₂, PM2.5, teplota, malé čáry široké asi 100 px) jsou bez mřížky, pravidlo se na ně nevztahuje; hlavní karta je odsouhlasená; (2) hodnoty osy v Klimatu jsou vpravo vedle čáry (v Energii vlevo nad čárou); (3) vlhkost v historii Klimatu je čárkovaná čára bez vlastní osy.

### 2026-11-04 · Multilanguage všude, čítače energie kuchyně v YAML (potvrzeno uživatelem)

- Uživatel (k úkolům po přejmenování skupiny): „1 ok. 2 co? nemas config? 3 chci multilanguage vsude“.
- Multilanguage všude: i `title` a `titles.*` v `examples/energie.yaml` mají `{cs, en, sv}` (texty stejné jako výchozí texty karty; dříve prázdné s popisem v komentáři); v Klimatu `title: Domov` v `README.md`. Klíče, které jsou hodnotami entit (například `house_modes` Zima / Léto, které se porovnávají se stavem `input_select`), se nepřekládají. Test úplnosti příkladu bere `{cs, en, sv}` jako jedno nastavení a texty nadpisů ověřuje zvlášť.
- Čítače energie lednice, trouby a mikrovlnky (entity `_energy` jsou v Home Assistantu vypnuté): v soukromém `ha-config`, `yaml/configuration.yaml`, nové senzory `platform: integration` z výkonu (`sensor.kuchyne_lednice_energie`, `…_trouba_energie`, `…_mikrovlnka_energie`). Neověřeno v běžícím Home Assistantu (YAML je jen v repozitáři). Do příkladu karty se `energy:` doplní, až budou entity v obrazu HA.

### 2026-11-04 · Skupina Kuchyně a všechny názvy v příkladu vícejazyčně (potvrzeno uživatelem)

- Uživatel: „aktuální group Vaření přejmenuj na Kuchyně/Kitchen/Kök … Digestoř, Lednice, Trouba, Mikrovlnka.“ „Předělej všechny name a description na multilanguage.“ „Klidně cokoliv uprav, nebo mi řekni. Pak napiš co mám udělat já.“
- Nahrazeno v `examples/energie.yaml`: skupina Vaření (Trouba, Lednice, Kávovar) → Kuchyně / Kitchen / Kök se zařízeními Digestoř (výkon + čítač), Lednice, Trouba, Mikrovlnka (jen výkon). Entity podle obrazu HA v `ha-config` (4. 11. 2026): čítače energie lednice, trouby a mikrovlnky jsou v HA vypnuté, proto se z výkonu počítá energie; digestoř má zapnutý `sensor.kuchyne_digestor_energy`. Kávovar v obrazu není.
- Všechny `name` v příkladu mají podobu `{cs, en, sv}` (pračka, sušička, myčka, zařízení skupin, skupiny). Překlady (Tumble dryer / Torktumlare, Dishwasher / Diskmaskin, Cooker hood / Spisfläkt, Fridge / Kylskåp, Oven / Ugn, Microwave / Mikrovågsugn, Living room / Vardagsrum) jsou moje, uživatel je neschvaloval.
- Testy a fixtury: skupina Kuchyně, čtyři zařízení, překlady Kitchen a Kök.

### 2026-11-03 · Slovo stavu na šedé výplni v barvě textu, Bojler potvrzen (potvrzeno uživatelem)

- Uživatel (odpovědi): „1 výkon max je 4kW víc nemůže takže 4kW je 100% výkonu, 2 ano přepiš, 3 v HA už mám 14“.
- Bojler: „100 %“ znamená výkon (sytost), ne teplotu; zůstává podle záznamu níže (při plném výkonu nejsou vidět hrana výplně a teplota, cena je přijatá).
- Nahrazeno: slovo stavu („nevybíjí“, „nenabíjí“, „připojeno“) a název neaktivní dlaždice se šedou výplní v sekundární šedé (v tmavém režimu 2,8 : 1, spočteno) → barva textu (bílá 8,1 : 1; ve světlém černá). Platí pro Baterii, připojené Auto a Bojler s výplní. Test hlídá barvu slova.
- Ověřeno: `flows.band_max_px_per_kw` je v Home Assistantu uživatele 14.

### 2026-11-03 · Bojler při plném výkonu, věta o stavu podle spotřebičů, barva Boostu auta (potvrzeno uživatelem)

- Uživatel (screenshot: Bojler 4,00 kW ze sítě, Dům bez odběru, věta „Dům jede ze sítě“): „Ten bojler uprav aby byl více aktivní. 4kW je top nejvíc co zvládne. Musí byt 100%“; „Věta „Dům jede ze sítě“ platí i tehdy, když ze sítě jde hlavně auto a bojler. Tak to navrhni a udělej jinak. Ty texty teď nechám na tobě a napíšu až mi něco bude hodně vadit“; „Spec chce výplň Auta a Bojleru „v barvě zdroje“, kód používá barvu dlaždice. Chci barvu dlaždice.“; „U boostu auta je nabíjení oranžové ne modré ze sítě nebo žluté ze slunce. Tam barvu zdroje i u boostu“. K otázkám z minula: Klima „nevím, neřeš zatím“, světlý režim „nevím nemám teď světlý režim“.
- Příčina bojleru: dlaždice s výplní (teplota) ignorovala sílu toku, a když byla teplota pod `water.gauge_min`, měla prázdnou výplň a kreslila se jen ve 14 % barvy, tedy skoro jako neaktivní. Nově je Bojler sytější s výkonem: při `scale.boiler` (4 kW) výplň 62 % a zbytek 48 %. Zkoušeno i pro Auto (stejné posílení): světlá azurová by na sytějším podkladu ztratila kontrast názvu (spočteno 3,6–4,2 : 1 místo 4,5), proto jen Bojler. Axe u gradientu kontrast neměří (nehlásí chybu), proto je kontrast spočten ručně.
- Věta o stavu: nahrazeno pravidlo „věta mluví o Domu“ novým (spec, Věta o stavu): jmenuje spotřebiče s podílem aspoň 15 %, např. „Auto a bojler berou ze sítě“. Návrh textu a hranice (15 %, `flows.source_min_share`) jsou moje, uživatel texty svěřil mně. Změna: scénář „poledne se sluncem a baterií“ nově říká „Auto bere z baterie a slunce“ místo „Dům bere ze slunce“, protože Dům má jen 12 % spotřeby.
- Boost auta: dřív grid nad `flows.grid_deviation_share` kreslil text stavu, světlo pod autem a pruh „Odkud auto nabíjí“ oranžově; při Boostu (zapnutý záměrně) se používá barva zdroje. Mimo Boost zůstává oranžová odchylka. Bojler (Boost bojleru) se nemění. Spec předtím říkal „boost oranžová“.
- Spec, výplň Auta a Bojleru: „v barvě zdroje“ nahrazeno „v barvě dlaždice“ (odpovídalo kódu).
- Oprava: modrý text „ze sítě“ v řádku Wallbox na šedé dlaždici měl kontrast 4,2 : 1 (axe to zachytil); text zdroje je o 18 % světlejší (nejméně 5 : 1).

### 2026-11-03 · Hlavní Energy flow: bez teček, šířka pásu podle odmocniny, číslo a jednotka v dlaždici (potvrzeno uživatelem)

- Uživatel (screenshot současného a nového vzhledu): „Potřebuju jen trochu dolaďit vizuál hlavního Energy flow. Zkritizuj mi tento novější vizuál oproti stávajícímu. Je lepší? Přehlednější? Přijde mi že nepotřebují animaci protože to jde vždy zleva doprava. Potřebuji šířku proudu a trochu vyladit vizuál.“ Po návrzích A, B, C: „1 tečky a animaci zruš, 2 B, 3 mam ted treshold 10W a kW od 100W, 4 ano“, pak „Beru variantu C“. Po ukázce problematické situace (silná výroba): „Nemusíme striktně úplně vždy dodržovat přesné poměry. Klidně to změníme. Chci vidět jak to vypadá, ne že to odpovídá starému pravidlu“ a „1 C odmocnina, 2 Ano změn všude, 3 ano změn, 4 ano změn“.
- Nahrazeno: v oddíle Karta Elektřina, odrážka Pás: tloušťka lineárně „jedno měřítko pro všechny“ (`flows.band_max_px_per_kw` 10 px na kW), bílé tečky s animací a věta o `prefers-reduced-motion`. Nově: tloušťka podle odmocniny výkonu, `flows.band_max_px_per_kw` 14 (px při 1 kW), pás slábne zleva doprava, ve světlém režimu tmavší pásy. Klíč zůstal, změnil se jeho význam (nikdo ho nemusí v konfiguraci přejmenovávat).
- Nahrazeno: v oddíle Dlaždice výška písma hodnoty (15 px polotučně) → číslo 17 px tučně a jednotka 12 px šedě (varianta C). Pravidlo patří do společného jazyka v kitu.
- Zamítnuto: „novější“ vizuál (AI mockup): záře kolem dlaždic (všechno křičí, na 393 px ztrácí hierarchii), přechod barvy zdroj → cíl (kolize s „barva pásu = zdroj“, při křížení vznikají barvy, které žádná entita nemá; uživatel 29. 10. zamítl duhový přechod u Domu), šedý pás u nulového toku. Mock navíc nesedí na data (nejširší pás šel do baterie s 0,02 kW, tok baterie sama do sebe).
- Opuštěno: varianta A (lineárně, 24 px/kW, strop 44 px): poctivé poměry, ale při silné výrobě jsou malé toky tenké (při 10,5 kW výroby Dům 0,6 kW 2,5 px a přetok 0,5 kW 2,1 px); kompromis šířka ~ kW^0,7 (viděn, uživatel zvolil odmocninu).
- Konzultace agentů (2 nezávisle, na screenshotech 393 px, tmavý i světlý režim): `ux-architect` doporučil C. `dashboard-critic`: odmocnina zkresluje poměry (Auto 4,2 kW vs. Do sítě 0,7 kW je 6×, nakreslené 2,5×) a odporuje pravidlu „jedno měřítko pro všechny“ i lineárnímu pruhu podílů pod Domem; uživatel to po zobrazení situace „Extrém“ přijal. Tvrzení kritika, která se neprokázala: A dává Autu a Bojleru stejnou šířku (ve skutečnosti 23,7 a 11,3 px), měřítko se prý počítá pro každou dlaždici (je jedno), Síť 0,03 kW prý porušuje práh (uživatel má `flows.idle_threshold` 10 W).
- Ověření: kontrast textu zdroje na bílé (žlutá 1,41 : 1, zelená 2,02 : 1, modrá 3,31 : 1) platil jen pro mock; karta text stavu ve světlém režimu už ztmavuje (`color-mix` 45 % + černá). Pásy ve světlém režimu: žlutá 68 %, zelená 75 %, modrá 92 % barvy + černá, aspoň 3 : 1 (test). Změny v kódu: `sankey.ts`, `electricity.ts`, `styles.ts`, `config-schema.ts`, `examples/energie.yaml`; testy v `card.spec.ts` (bez teček a animace, odmocnina, jednotka zvlášť, kontrast pásů).
- Kontrola vzhledu na skutečné kartě (pravidlo 9; screenshoty 393 px, tmavý i světlý režim, `ux-architect` a `dashboard-critic`): oba našli šedou jednotku „kW“ na sytých dlaždicích pod 4,5 : 1. Změřeno 2,9 : 1 (žlutá dlaždice, 62 % bílé); opraveno na 90 % v tmavém a 65 % ve světlém režimu (nejhůř 4,3 : 1 na nejsytější žluté dlaždici, jinde přes 4,8). Tvrzení „w“ malým písmenem se neprokázalo (text je „W“, hlídá test).
- Nepotvrzeno, otázky položeny D. M. (nálezy kontroly mimo tuto změnu, nic se nemění): ve světlém režimu mají ikony dlaždic kontrast pod 3 : 1 na dlaždici téže barvy; slovo stavu („nevybíjí“, „připojeno“) na šedé výplni v tmavém režimu má kontrast pod 4,5 : 1; hrana výplně prochází textem; výplň Auta a Bojleru „v barvě zdroje“ (spec) vs. vlastní barva dlaždice v kódu; Bojler s 4 kW vypadá skoro neaktivně; věta „Dům jede ze sítě“, když ze sítě jde hlavně auto a bojler.
- Nepotvrzeno, otázka položena D. M.: tatáž typografie čísel v Klimatu (uživatel: „Ano změn všude“) koliduje s odsouhlasenou hlavní kartou místnosti, kde mají jednotky stejnou velikost jako hodnoty (`CURRENT_SPEC.md` Klimatu, Jednotná velikost). V Klimatu se zatím nic nemění.

### 2026-11-03 · Týdenní ladění se ukládá do repozitáře, export pro ladění celé karty (potvrzeno uživatelem)

- Uživatel: „Chtěl bych v repu mít historii těch našich týdenních analýz. Klidně ty soubory obnov a přidej do nich co je potřeba. Je nutný to trackovat abychom to mohli časem analyzovat komplexně. Asi jsem to nechal smazat omylem. Uprav i pravidla aby ty soubory byly ok a nemazaly se.“ Dále: „do exportu chci teda i FVE, předpovědi solar forecast atd abychom mohli ladit celý energy dashboard“, „Budu postupně přidávat další velké spotřebiče - trouba, varná deska apod.“, „tak uprav export entit aby tam bylo vše co potřebuješ“, „Chci nejlepší data. Ulož klidně weather forecast i solar forecast a chci úpravu solar forecastu někam ukládat abychom to mohli upravovat a ladit oproti skutečnosti. Jestli to jde a je to k něčemu dobrý.“
- Nahrazeno: rozhodnutí z 2. 11., že `TYDEN.md` a `FORECAST.md` neexistují (commity a66698e a 79c1cf5). Obnoveno `TYDEN.md` a `FORECAST.md`, nová složka `data/` (denní součty, předpověď proti skutečnosti, snapshoty předpovědí), `tools/tyden_data.py`, `tools/spotrebice.txt`.
- Export (`tools/export_hodiny.py`) rozšířen o FVE stringy PV1/PV2, napětí sítě, baterii, čítače, spotřebiče (nalezené samy podle názvu) a předpověď výroby i počasí (nalezené samy); export entit (`HA entities/export_entit.jinja`) hledá počasí, slunce, předpověď, spotřebiče a ceny a vypisuje názvy atributů. Neověřeno proti skutečnému Home Assistantu, jen proti simulaci; první běh zkontrolovat v `export_report.txt`.
- Doplněno 3. 11. po exportu entit: uživatel potvrdil `recorder.purge_keep_days: 90`, předpověď z Open-Meteo Solar Forecast a počasí v oblasti Střecha. Export proto čte i zpětnou ranní předpověď a počasí ze stavové historie (`predpoved_historie.csv`, `pocasi_hodiny.csv`), `tools/tyden_data.py` z ní počítá chybu s předstihem 0 až 3 dny a po hodinách. Zjištěno: senzory předpovědi nemají `state_class`, statistiky pro kartu neexistují (otázka položena D. M.); z nového exportu zmizelo 19 entit AZ Routeru (diagnostika) a Tada (otázka položena D. M.).
- Doplněno 3. 11. večer: uživatel: diagnostika AZ Routeru (`sensor.master_hdo`, `master_mode`, `master_system_status`, `master_cloud_reachable` …) „již není integrací azrouter poskytována“; Tado smazáno, místo něj Tado CE; k předpovědi: „klidně dám state_class. Ale já vidím předpověď až na 5 dní - mám to dát všem?“ Zapsáno do `ENTITY_MAP.md`; šablona exportu hledá `water_heater.*`. Nahrazeno: můj dřívější návrh `customize` pro `state_class` (nevhodný pro třídu `energy`) šablonovými senzory.
- Pravidlo 11 v `AGENTS.md` kitu, `check-docs` kitu soubory povoluje. Hodinová data a tokeny se do veřejného repa neukládají (`.gitignore`).

### 2026-11-02 · Detail spotřebiče: malý trend po hodinách (potvrzeno uživatelem)

- Uživatel (screenshot): „Mně se to nelíbí. Nevím jestli je to hodiny dnes, nebo hodiny zpět, ten nadpis a pod tím [hodnoty] zarovnaný doleva a pod tím zarovnaný doprava. U vaření nevidím rozpad jednotlivých appliances v grafu který tam není. Myslel jsem že normální graf bude lepší než tenhle 1D čára kterou nikde jinde nemáme.“ „Ten poslední cyklus klidně bez délky jen 12:47 - 14:13 třeba plus spotřeba. Ne H a min“ „Pak to může být pod sebou nadpis vlevo hodnoty vpravo“. Potom k velkému grafu: „To je zase moc velký. Fakt nemůžeme mít ten mikrotrend? Jak je u baterie soc apod? Jen malý. A u vaření jich bude víc přes sebe? … Nekomplikuj to“.
- Zamítnuto uživatelem: pruh cyklů (1D čára), velký graf s čtením a osou hodnot v řádku spotřebiče, délka cyklu v řádku, popisek nad hodnotou zalomený doleva.
- Nahrazeno: malý trend „Dnes od půlnoci po hodinách“ (sloupky po hodinách, osa 0–24, u skupiny zařízení na sobě s legendou); řádek „Poslední cyklus“ popisek vlevo, hodnoty vpravo.

### 2026-11-02 · Detail spotřebičů, cykly po restartu, graf Historie (potvrzeno uživatelem)

- Uživatel: „Po restartu HA je u appliances cyklu Skoncilo pred 10 min. Ale to byl cas restartu.“ „Pokud to skoncilo vcera 23:20 je tam 23:20 a ne včera. Matoucí.“ „Ukazovat kdy skončil cyklus 24h zpět, ne jen 12.“ „Ty detaily appliances vylepšit … Poslední cyklus: 12:49 - 14:27 (1 h 38 min) * 0,84 kWh … Dnes 3 cykly * 1,21 kWh. A pod to mikrotrend/graf … Pokud je to blbý nápad, navrhni lepší.“ „V historii nevidím v grafu skupinu vaření … A ten graf rozdelovat rovnou čarou, ne zaoblenyma hranama“ „ten popis nahoře to Co se dělo je hrozný. nedává smysl, nepoužívám to. Vymysli lepší řešení. A klikani na ten graf moc nefunguje. Kliká to o sloupec vedle.“
- Příčiny: (1) po restartu se stav helperu změní z `unavailable` na `off` a karta to bral jako konec cyklu a čas posledního cyklu z `last_changed`; (2) čas bez dne; (3) 12 h; (5) skupiny jsem z grafu vyřadil, když uživatel řekl „Nepotřebuju rozpad v grafu“, což mínilo rozpad uvnitř skupiny, ne skupinu; (6) text „Co se dělo“ a řádek čtení byly nečitelné; klepnutí se mapovalo na sloupec podle šířky celého grafu, ale sloupce začínají vpravo od popisků osy, a posuvník měl široký palec.
- Nahrazeno: řádky Začátek, Konec, Trvání, Spotřeba cyklu → „Poslední cyklus“ jedním řádkem a pruh cyklů; „Co se dělo“ + legenda → nadpis „Spotřeba domu po hodinách / po dnech“ a panel čtení pod grafem; stav „Skončilo“ 12 h → 24 h.
- Z kontroly vzhledu (oponent): modrý rámeček grafu po klepnutí jen při ovládání klávesnicí; stálý text pod grafem odstraněn (vysvětlivky jen za ⓘ); běžící cyklus „Aktuální cyklus“ bez opakované délky; pruh cyklů má ryskou „teď“ a světlejší dráhu; „Celkem“ v panelu větší. Nepotvrzeno, otázka položena D. M.: společná časová osa Dnes a Historie (hodiny 0–24 vs −24 h … teď).
- Navrženo mnou místo mikrografu „24 h za sebou“: pruh od půlnoci do půlnoci (souhlasí s „Dnes“); cykly z minulého dne jsou v řádku „Poslední cyklus“.

### 2026-11-02 · Úklid: mrtvý kód (potvrzeno uživatelem)

- Uživatel: „Promaž z Gitu Energy i klima vše co není potřebné … Dead code pryc.“
- Smazáno: nepoužité importy a proměnné (`tiles()` bez parametru `unit`), nepoužité překlady (`chartLabel`, `infoLabel`, `plugOn`, `sourceForecast`, `sourcePace`, `trendLabel`), nepoužité CSS `.bat-trend`, nepoužité typy `NumberSection`, re-export `LANGUAGES`. V Energii žádné cizí soubory nebyly (jen `.github/copilot-instructions.md`).
- Ponecháno: `tools/export_hodiny.py` (export popsaný v README), vygenerovaný `ha-energie-dashboard.js` (HACS).

### 2026-11-02 · Texty podle jazyka v konfiguraci (potvrzeno uživatelem)

- Uživatel: „Název více jazykově super. To chci všude. Každý name i title bude mít podporu multilamguage. Energy i klima Dashboard. Připrav i examples.“
- Nahrazeno: „Nepřekládají se texty z konfigurace (`title`, `titles.*`)“. Nově každý `title`, `titles.*` a `name` (`house.appliances`, `house.groups`) je text, nebo mapa jazyk → text; vybírá se jazyk karty, jeho základ, angličtina, první uvedený (kit `pickText`). `name` spotřebiče se hledá mezi názvy zařízení v Home Assistantu podle kteréhokoli uvedeného jazyka.
- Karta kit připnutý na commit `e96c781`.

### 2026-11-02 · Skupiny spotřebičů místo řádku Vaření (potvrzeno uživatelem)

- Uživatel (po prvním nasazení řádku Vaření): „U vaření nechci ikony io. Chci celkem aktuální spotřebu a rozpad spotřeby.“ „udělej to obecnější tak abych těchto skupin mohl mít více - napr. Vaření, klimatizace, IT apod. A nejlépe i s možností překladu a ikony. Nebo to vymysli obecněji jinak“ „Pořád chybí ty ikony ze zařízení. Je ikona u vaření, ok ale chybí u pračky myčky sušičky. Stejný styl a způsob.“ „Digestoř je zatím jediná, zítra přidám další sensor.kuchyne_digestor_power a Energy“ „U skupin není žádný treshold. Bude se ukazovat reálné co spotřebovává. Není cyklus, není stav že běží, běží pořád.“
- Nahrazeno: `house.cooking` (jeden pevný řádek Vaření s prahem 1 W a symbolem vypnutí) → `house.groups` (libovolný počet skupin: `name` textem nebo podle jazyka, `icon`, `appliances`). Práh 1 W, symbol vypnutí a „součty jen při známých všech zařízeních“ z předchozího záznamu: práh a symbol zrušeny uživatelem; pravidlo součtů zůstává, nepotvrzeno, otázka položena D. M.
- Ikony spotřebičů: skutečné entity uživatele nemají atribut `icon`, proto se ikona nastavuje i v YAML (`house.appliances[].icon`), jinak se hledá na entitách zařízení a pomocnících, jinak zásuvka.
- Změna je nekompatibilní: `house.cooking` už neexistuje, karta ukáže chybu s názvem klíče.

### 2026-11-02 · Řádek Vaření v Detailu Dům (potvrzeno uživatelem)

- Zadání: „Přidávám další appliances. U nich ale nesledovat cykly. Jen spotřebu za den. I u myčky pračky atd bude spotřeba od půlnoci. Není tu graf, není potřeba mít 24h. … Bude to digestoř, varná deska, mikrovlnka, trouba, lednice, kávovar atd. Udělej to tak aby šly přidávat další. Bude to jedna společná karta vaření.“ Po mém návrhu: „Dejme to do konfigurace. Jen to proste sečte a zobrazí jako vaření. Součet za den bez cyklu. Toť vše. Jednoduché. Nevymýšlej nový tag. To zapomenu. Nepotřebuju rozpad v grafu. Tam taky nemam jednozlive cykly. Po rozkliku vaření mam u cyklu start konec atd a tady budu mít jednotlivé appliances. Teď a celkem. Ok? GO“.
- Zamítnuto uživatelem: nový štítek `vareni`, samostatný panel Vaření na hlavní stránce, jedna barevná řada „Vaření“ v grafu.
- Provedeno: `house.cooking` v YAML (`name`, `power`, volitelně `energy`); řádek „Vaření“ za spotřebiči s cykly; zavřený = výkon teď a „Dnes X kWh“, rozkliknutý = tabulka zařízení „Teď“ | „Celkem dnes“. Víc řádků lze rozkliknout najednou.
- Rozhodnuto mnou (uživatel nerozhodl, **nepotvrzeno, otázka položena D. M.**; ve spec není): výkon se ukáže od 1 W, protože lednice je pod prahem toků `flows.idle_threshold`; součty jen při známých všech zařízeních; zařízení bez čítače počítá energii z průměru výkonu; popup Dům vaření neobsahuje.
- Z kritiky expertního agenta: zařízení s víc senzory (varná deska po zónách) vyžaduje součtový senzor v HA; entity vaření nejsou v žádném exportu entit.

### 2026-11-02 · Detail Dům: záložky Dnes | Historie, víc rozkliků, den od půlnoci (potvrzeno uživatelem)

- Uživatel: „Rozkliknout obě nejdou“; „jinde máme dnes historie a výhled, nebo dnes historie a zdraví. Tak to udělej stejně. Ty grafy do historie, dnes jen ty spotřebiče. A za den je od půlnoci, ne 24h“; k BMW i3: „bmw nemá obdélník ale obrázek auta, za mne ok“.
- Nahrazeno: jedna obrazovka s přepínačem období nad grafem a jedním otevřeným spotřebičem. Řádek „Za 1 den“ (24 h) je „Dnes“ (od půlnoci).
- Neprovedeno, otázka: graf Historie „1 den“ zůstává posledních 24 h jako u Baterie (nepotvrzeno, otázka položena D. M.).

### 2026-11-02 · Ikona spotřebiče (potvrzeno uživatelem)

- Uživatel: „Myčka pračka sušička by mohli mít ikonu. Zařízení ji má přiřazenou. Když běží ma výkon, když neběží ma ikonu io. Nic složitého nevymýšlej“.
- Provedeno: ikona z atributu `icon` entity zařízení (zásuvka, výkon, kterákoli), vykreslená `ha-icon` před názvem v detailu i popupu. Export `HA entities/spotrebice.json` atribut `icon` neobsahuje, takže ověřeno jen testem s ikonami ve fixtuře; na skutečných datech ověří uživatel.

### 2026-11-02 · Čtvrté kolo kontroly vzhledu Detailu Dům (potvrzeno uživatelem: „Těch 327 W nemá popisek.“)

- Uživatel: „Hele upřímně, vidím ze ti agenti moc nefungují nebo mají blbě instrukce. Toto vše vidím na první pohled. To by nemělo projít!“ Příčina: návrh oponenta odebrat popisek „DŮM“ jsem provedl bez ověření proti dřívějšímu zadání. Opatření: kontrolní seznam „Visual review checklist“ v agentech kitu, pravidlo 9 v `AGENTS.md` kitu, test, že číslo v hlavě detailu má popisek „Spotřeba domu teď“.
- Nahrazeno ve spec: popup Dům měl „název a doba běhu, pod nimi výkon“; platí jeden řádek (název vlevo, výkon vpravo) podle zpětné vazby uživatele k popupu. Slovo „neodebírá“ v popupu se nepoužívá: běžící cyklus ukazuje výkon ve W.
- Provedeno z kritiky: čtení grafu (celek nikdy menší než součet spotřebičů, zbytek „Dům (neměřeno)“ jako v legendě); „Neběží“ velkým písmenem; poslední dokončený cyklus = poslední konec a poslední začátek před ním (Začátek a Trvání v rozkliku).
- Neprovedeno: ikona vypnutí u zastaveného spotřebiče zůstává (ikonu uživatel viděl a řešil jen její barvu); hierarchie hlavičky popupu stejná jako u popupů Baterie a Slunce; přesun přepínače období a kontrast vedlejšího textu jsou návrhy kritika bez rozhodnutí uživatele (kontrast hlídá axe test v obou režimech).

### 2026-11-02 · Popup Dům a Detail Dům (návrh, nepotvrzeno, otázky položeny 2. 11. 2026)

- Zadání uživatele 2. 11. 2026: popup Dům s aktuální spotřebou spotřebičů se štítkem `appliances` (pračka, sušička, myčka; přibudou trouba, varná deska), „kdo má velkou spotřebu“, aktuální cyklus a počet cyklů z helperů, možná predikce kdy prát a sušit, historie pro rozbor „proč baterie spadla / proč byly přetoky“. Jen návrh, bez kódu.
- Postup: idea-generator, energie-expert, klima-expert, ux-architect, dashboard-critic. Klima popup Dům nepřebírá (nemá měřený celek ve W).
- Zpětná vazba uživatele: text „Ochrana vybavila“ je špatný (nepřesný překlad), nutno předělat. Nový text: „Zásuvka hlásí přehřátí“ (nadproud, přehřátí, přetížení, přepětí); netvrdí, že zásuvka vypnula.
- Kritika (hlavní body): „Ostatní“ je klamavý rozdíl tří zdrojů; ochrana patří do skupiny Upozornění, ne do popupu; popup je moc vysoký; Výhled je L4+ nad rozsah Slunce a duplikuje Slunce; graf „Co se dělo“ má obsahovat spotřebiče; počet cyklů za 7/30 dní je omezen retencí recorderu; pračka má `power_start` 0.0 změněné až po konci cyklu; konfigurace ze štítku vs. YAML; dvě definice kWh Domu.
- Návrh v2 (po kritice): popup = hlavička Dům, jen běžící spotřebiče (helper `bezi` = on, jednořádkově, nejvýš 3, podle W), řádek Dnes, tlačítko Detail; bez „Ostatní“, bez Výhledu. Detail = seznam spotřebičů (rozklik = aktuální nebo poslední cyklus) + přepínač 1 den | 7 dní | 30 dní + jeden graf „Co se dělo“ (u 1 dne pruhy spotřebičů 9/3 px jako Klima), „Data od …“. „Hotovo“ → „Skončilo“.
- Potvrzeno uživatelem 2. 11. (odpovědi na BLOCKERy): bez „Ostatní“; historie a počet cyklů ano; spotřebiče ze štítku `appliances` + YAML jen pro helpery; závada zásuvky = 5. řádek Upozornění. Uživatel dodal YAML automatizací pračky a sušičky: stejná logika jako myčka (start nad 15 W, konec pod 1 W, bez zpoždění); 6min rozdíl u pračky byl ruční test.
- Potvrzeno uživatelem 2. 11. (další odpovědi): pračka 1. 11. (vypnutí helperu o 6 min po konci cyklu a `power_start` 0.0 v 17:31:25) byl ruční test uživatele (oprava dřívějšího zápisu „nebyl test“); `purge_keep_days` 90; týdenní úkol zůstává (ladění energie, týdenní AI brainstorming, důvody rozhodnutí); „Dnes spotřebováno“ má fungovat bez ruční práce uživatele, nebo mu řeknu, co nastavit (způsob nerozhodnut); text závady zásuvky „Zásuvka hlásí …“ ano.
- Potvrzeno uživatelem 2. 11.: `sensor.goodwe_house_consumption` zahrnuje vše (i wallbox a bojler), `sensor.wallbox_total_power` a `sensor.tuv_power_total` mají statistiky; barvy Dům/Auto/Bojler potvrdí, až je uvidí (zůstávají mimo spec).
- Potvrzeno uživatelem 2. 11.: „Dnes spotřebováno“ ze statistik bez nastavení v HA; dotazy na názvy entit (předpověď, přepínač Přednost před bojlerem) uživatel nechápe a neřeší.
- Potvrzeno uživatelem 2. 11.: 2min40s spuštění sušičky byl test push notifikace; VIN a MAC adresy nevadí (v repozitáři žádná MAC ani GPS není).

#### Návrh v3 (po odpovědích uživatele, čeká na schválení)

- Popup (236 px): hlavička Dům; jen běžící spotřebiče (helper `bezi` = on), jednořádkově „Název · doba“ + výkon, nejvýš 3, podle výkonu, pořadí zmrazené při otevření; řádek „Dnes spotřebováno“; tlačítko „Detail domu ›“. Nic neběží: jen hlavička, Dnes a Detail. Bez „Ostatní“, bez Výhledu.
- Upozornění nahoře: „Pračka · Zásuvka hlásí přehřátí“ (nadproud, přehřátí, přetížení, přepětí).
- Detail domu (jedna obrazovka): hlava „Dům“; seznam spotřebičů (stav „Běží · 31 min“ / „Skončilo · před 40 min“ / „Bez dat“; rozklik: začátek, trvání, kWh, počet cyklů za zvolené období, zásuvka zapnuta/vypnuta jen čtení); přepínač 1 den | 7 dní | 30 dní; graf „Co se dělo“ (nahoře Slunce, Baterie, Síť; dole Dům, Auto, Bojler, Do baterie, Do sítě; čtení prstem vypíše všechny toky a nabití baterie bez komentáře); u 1 dne pod grafem pruhy spotřebičů (9/3 px jako Klima) a čára nabití; „Data od …“ při krátké historii; vysvětlivky jen za ⓘ.
- Neobsahuje: „Ostatní“, Výhled / predikci „kdy prát“, dlaždice kWh, proužek cyklu, ovládání zásuvek.
- „Skončilo · před X“ se ukazuje nejvýš 12 h po konci, pak nic (uživatel 2. 11.). Čas konce z `last_triggered` automatizace konce cyklu.
- Palety Klima: uživatel „klidně ano a pak ti to změním“ (2. 11.), tedy platí dnešní.

#### Původní návrh v1 (před kritikou)

#### Návrh: popup Dům a Detail Dům (karta Energie), stav 2. 11. 2026, NEPOTVRZENO

Jen návrh, žádný kód. Texty česky (en/sv se doplní ve stejné změně). Všechny entity jsou z exportů v `HA entities/` (`energie.json`, `spotrebice.json`, `spotrebice_helpery.json`).

##### 1. Popup Dům (klepnutí na dlaždici Dům v Sankey)

Šířka 236 px (obsah 208 px), stejná gramatika jako popup Baterie a Slunce (`pop-head`, `pop-rows`, tlačítko Detail). Nová jen dvouřádková varianta řádku: vlevo název (Subhead 15) a pod ním stav (Footnote 13), vpravo výkon (Subhead 15, tučně) a pod ním doplněk (Footnote 13); řádek 44 px; bez ikony kromě výstražné.

Pořadí obsahu: 1) abnormalita (řádek „Ochrana vybavila · …“, oranžová ikona a tónovaný podklad, text bílý), 2) žádná akce (karta spotřebiče neovládá; `switch.…` jen čtení), 3) kdo teď odebírá (sestupně podle W, pak „Ostatní“), 4) stávající řádek „Dnes spotřebováno“, 5) tlačítko „Detail domu ›“.

Pravidla:
- Nejvýš 3 spotřebiče, pořadí: ochrana vybavila, běží (sestupně podle W), bez dat; potom „+ N další“ a vždy „Ostatní“.
- Množina a pořadí řádků se zmrazí při otevření, hodnoty se mění živě. Spotřebič, který skončí, zůstane a ukáže „Hotovo · před 1 min“. Tlačítko Detail se nikdy neposune.
- „Ostatní“ = Dům − Σ všech měřených spotřebičů, nejméně 0, píše se s „≈“, pod `flows.idle_threshold` (100 W) se nezobrazí, při jakémkoli spotřebiči bez dat je „––“. Nedostupná hodnota se nikdy nebere jako 0 W.
- Auto a Bojler v seznamu nejsou (jsou v Sankey vedle Domu a v Detailu v časové ose).
- Hlavička: číslo dlaždice Dům (`model.other`); bez velkého čísla navíc.

Drátěné modely:

```
1. Nic neběží                         2. Jeden běží
┌──────────────────────────────┐      ┌──────────────────────────────┐
│ Dům                  0,45 kW │      │ Dům                  2,80 kW │
│ Žádný spotřebič neběží       │      │ Sušička              2,40 kW │
│ Dnes spotřebováno   12,4 kWh │      │ Běží · 1 h 12 min   0,80 kWh │
│ [ Detail domu              › ]│      │ Ostatní            ≈ 0,40 kW │
└──────────────────────────────┘      │ Dnes spotřebováno   12,4 kWh │
                                      │ [ Detail domu              › ]│
                                      └──────────────────────────────┘
3. Víc běží, 4+ spotřebičů            4. Ochrana vybavila + zásuvka nedostupná
│ Dům                  5,60 kW │      │ Dům                  0,45 kW │
│ Sušička              2,40 kW │      │ ┌ ▲ Pračka ───────────────┐ │
│ Běží · 1 h 12 min   0,80 kWh │      │ │ Ochrana vybavila · přehřátí│ │
│ Trouba               2,10 kW │      │ └─────────────────────────┘ │
│ Běží · 12 min       0,42 kWh │      │ Myčka                     –– │
│ Pračka               0,52 kW │      │ Bez dat                      │
│ Běží · 31 min       0,30 kWh │      │ Ostatní                   –– │
│ + 2 další            0,35 kW │
│ Ostatní            ≈ 0,23 kW │
│ Dnes spotřebováno   12,4 kWh │
│ [ Detail domu              › ]│
```

Stavy a texty:
| Stav | Podmínka | Text |
|---|---|---|
| Nic neběží | žádný helper `bezi` = `on` a žádný výkon ≥ 100 W | „Žádný spotřebič neběží“, Ostatní se nezobrazí |
| Běží | helper `on` nebo výkon ≥ `flows.idle_threshold` | název + výkon; „Běží · 1 h 12 min“ + „0,80 kWh“ |
| 4+ | více než 3 | tři řádky + „+ 2 další“ |
| Ochrana vybavila | kterýkoli ze 4 `binary_sensor` = `on` | oranžový řádek nahoře „▲ Pračka / Ochrana vybavila · přehřátí“ (nadproud, přehřátí, přetížení, přepětí) |
| Pauza | helper `on`, výkon < 100 W | hodnota „pod 0,10 kW“, doba a kWh běží dál |
| Odebírá bez cyklu | helper `off`/chybí, výkon ≥ 100 W | druhý řádek „Odebírá“, bez kWh |
| Zásuvka nedostupná | výkon `unavailable`/`unknown` | „––“, druhý řádek „Bez dat“, nikdy 0 W |
| Dům bez dat | `sensor.goodwe_house_consumption` bez hodnoty | „Dům ––“, spotřebiče se ukážou, Ostatní „––“ |
| Hotovo | helper přešel na `off` při otevřeném popupu | „Hotovo · před 1 min“ |

##### 2. Detail Dům

List přes kartu jako Baterie a Slunce: `‹ Zpět | Dům | Hotovo` (Zpět i Hotovo zavírají i popup), segmentový ovladač **Dnes | Historie** (a podmíněně **Výhled**).

**Dnes** (shora dolů):
- Upozornění (jen při ochraně): stejná komponenta jako skupina Upozornění nahoře; klepnutí rozbalí řádek spotřebiče.
- Hlava: „Dům 2,80 kW“ (dlaždice Dům).
- Seznam Spotřebiče (inset grouped, řádek 64 px, rozbalovací jako Zdraví v Detailu baterie, jedno otevřené najednou): ikona 24 px, název, stav („Běží · 1 h 12 min“ / „Hotovo · před 40 min“ / „Bez dat“), vpravo výkon a kWh od startu. Pořadí zmrazené při otevření. „Ostatní“ bez šipky, s ⓘ.
- Graf **Spotřebiče dnes**: plocha = součet měřených spotřebičů (`…_power`, ne Dům), tři hodnoty svislé osy, osa 00–24 h s „teď“, vytrácení vlevo, živý poslední bod; pod plochou pruh pro každý spotřebič (12 px, ikona, intenzita = výkon na společné stupnici, 3px proužek = cyklus podle helperu); čtení prstem v řádku údajů pevné výšky o dvou řádcích („čas · celkem“, „název hodnota · …“).
- Dvě dlaždice: „Spotřebiče dnes“ (kWh, rozdíl čítače `…_energy` proti půlnoci ze statistik) a „Cyklů dnes“ (počet přechodů helperu na `on`).
- Prázdné stavy: bez statistik „–– bez dat“; historie kratší než období: v ose „Data od 1. 11.“; spotřebič nikdy v provozu: pruhy prázdné.

**Historie** (přepínač 1 den | 7 dní | 30 dní, volba se pamatuje; do schválení čte `battery.default_range`):
- Panel **Co se dělo**: Sankey v čase. Nahoře zdroje (Slunce, Baterie vybíjení, Síť odběr), dole odběr (Dům, Auto, Bojler, Do baterie, Do sítě), sloupce jako Historie baterie (1 den po hodinách, 7 a 30 dní po dnech, kWh), společné měřítko nahoře i dole, tři hodnoty osy, vytrácení vlevo. Stávající barvy (Slunce, Baterie, Síť, Dům, Auto, Bojler), nová žádná.
- Zdroje dat: Slunce, Baterie, Síť, Do baterie, Do sítě z čítačů střídače (`sensor.goodwe_total_pv_generation`, `…_total_battery_discharge`, `…_total_battery_charge`, `…_meter_total_energy_import/_export`); Dům, Auto, Bojler z hodinových průměrů výkonu (`sensor.goodwe_house_consumption`, `sensor.wallbox_total_power`, `sensor.tuv_power_total`; kWh = průměr W × 1 h); Dům v grafu = max(0, dům − Auto − Bojler).
- Čtení prstem vypíše všechny toky ve stejném okamžiku a nabití baterie; nic nehodnotí ani nekomentuje (pro přetoky např. „Slunce 12,3 · Do sítě 7,2 · Do baterie 0 · Bojler 0 · Nabití 100 %“).
- Čára nabití baterie jako malý graf se stejnou osou (`sensor.goodwe_battery_state_of_charge`).
- Je-li Auto nebo Bojler bez statistik (`sensor.wallbox_total_power`, `sensor.tuv_power_total` mají podle `energie.json` `state_class: measurement`), graf kreslí pásmo „Dům (celkem)“; jinak nikdy vymyšlená křivka.

**Výhled** (podmíněná záložka): jediný panel „Slunce nad běžnou spotřebou domu · do večera“ z existující simulace „Dnes do večera“ (čtvrthodinové sloupce) + jedna věta „Největší rozdíl ≈ 1,4 kW kolem 12:30 (odhad)“. Popisuje, neradí. Bez entit předpovědi se nestaví.

ⓘ texty (bublina přes kartu, druhé klepnutí zavře): Ostatní („Zbytek Domu, který zásuvky neměří … Počítá se jako Dům minus měřené spotřebiče, proto je to odhad a může se lišit o stovky wattů.“), Spotřebiče dnes, Cyklus („„Běží“ nastavují vaše automatizace začátku a konce cyklu. Karta cyklus neodvozuje z výkonu.“), Od startu („Čítač zásuvky minus hodnota uložená při startu. Je to přibližně, čítač se obnovuje po minutách.“), Co se dělo („Hodinové průměry z dlouhodobých statistik, krátké špičky se vyhladí. Zdroje a odběr nejsou měřeny stejným přístrojem, proto se nemusí rovnat.“), Dům (celkem), Cykly 7 a 30 dní.

##### 3. Rozklik spotřebiče (rozbalovací řádek v seznamu)

Obsah: (ochrana vybavila), Cyklus (Začal dnes 14:05 · Běží 1 h 12 min · Od startu 0,80 kWh ⓘ), tři dlaždice Dnes / 7 dní / 30 dní (počet cyklů a kWh), Zásuvka „Vypnuto“ (jen čtení, jen když je vypnutá). Skončený cyklus: „Skončil dnes 15:17 (před 40 min)“, „Trvání 1 h 12 min“, „Spotřeba cyklu asi 0,93 kWh“. Cyklus se nikdy neodvozuje z velikosti výkonu.

| Údaj | Odkud |
|---|---|
| Běží ano/ne | `input_boolean.technicka_mistnost_pracka_bezi`, `input_boolean.technicka_mistnost_susicka_bezi`, `input_boolean.kuchyne_mycka_bezi` |
| Doba běhu / Hotovo před | `last_changed` booleanu, případně `last_triggered` automatizací `automation.<mycka\|pracka\|susicka>_zacatek_cyklu` / `_konec_cyklu` |
| Od startu (kWh) | `sensor.<spotřebič>_energy` − `input_number.technicka_mistnost_pracka_power_start` / `input_number.technicka_mistnost_susicka_power_start` / `input_number.kuchyne_mycka_start_energie` |
| Počet cyklů Dnes/7/30 | přechody `off→on` z historie stavů booleanu (`history/history_during_period`), v rozsahu uchování recorderu |
| kWh za období | `change` ze statistik `sensor.<spotřebič>_energy` (`total_increasing`) |
| Ochrany, Zásuvka | 4 × `binary_sensor.*_overcurrent/_overheating/_overpowering/_overvoltage`; `switch.technicka_mistnost_pracka`, `switch.technicka_mistnost_susicka`, `switch.kuchyne_mycka` (jen čtení) |

Degradace: bez/`unavailable` helperu `bezi` jen výkon a „Odebírá“; bez `start_energy` bez „Od startu“; bez historie stavů počet cyklů „––“; spotřebič bez helperu (trouba, varná deska) cyklus z výkonu neodvozuje.

##### 4. Konfigurace

Explicitní seznam `appliances` (ID se neodhadují; názvy zobrazované entitami jsou zdvojené „Sušička Sušička power“):

```yaml
appliances:
  - name: Pračka
    power: sensor.technicka_mistnost_pracka_power
    energy: sensor.technicka_mistnost_pracka_energy
    switch: switch.technicka_mistnost_pracka
    running: input_boolean.technicka_mistnost_pracka_bezi
    start_energy: input_number.technicka_mistnost_pracka_power_start
    cycle_start: automation.pracka_zacatek_cyklu
    cycle_end: automation.pracka_konec_cyklu
    protections: [binary_sensor.technicka_mistnost_pracka_overcurrent, binary_sensor.technicka_mistnost_pracka_overheating, binary_sensor.technicka_mistnost_pracka_overpowering, binary_sensor.technicka_mistnost_pracka_overvoltage]
```

##### 5. Dopad na ostatní karty a detaily ([SJEDNOTIT VŠUDE])

- SV1: jedna volba období 1 den | 7 dní | 30 dní napříč detaily s jednou pamětí (Baterie `battery.default_range`, Slunce `forecast.default_range` 7|30, Wallbox Dnes|7 dní, Dům).
- SV2: společný stav grafu „Data od …“ při historii kratší než období.
- SV3: ⓘ jako jediné místo vysvětlivek (dnes jen ve Slunci; inline poznámka `bandsNote` v Baterii se přesune za ⓘ).
- SV4: čtení bodu prstem vypíše ve všech detailech stejnou sadu toků (Baterie „Nabití a výkon“, Slunce „Výkon dnes“, Dům).
- SV5: seznam řazený podle živé hodnoty se řadí jen při otevření (jedna věta v `DASHBOARD_UX_SYSTEM.md`).
- Klima: popup Dům se nepřenáší (nemá měřený celek ve W); sdílené vzory: seznam „stav · doba“, abnormalita první, křivka + pruhy pod grafem, řádek údajů nad grafem, dvě jednotky doby. Do kitu: formát doby (tři kopie), `fetchHistory`, komponenta ⓘ, první bod statistiky.

##### 6. Zamítnuto

Věta „… nejvíc sušička“ pod Elektřinou; pruh „kdo odebírá“ a barvy po spotřebičích; zvýrazňování „velké spotřeby“; klepací řádky v popupu; seznam jen ze štítku; průměr kWh na cyklus; ovládání relé; konec cyklu z `last_changed` výkonu; učení typického cyklu; cena v Kč; „nevyužité slunce“; „sušička jede z baterie“; Roborock; upozornění „Neměřeno je velké“. Push „Pračka hotová“ patří do automatizací Home Assistantu, ne do karty.

##### 7. Přístupnost

Slovo a ikona vedle barvy (oranžová jen ikona a podklad, text bílý, kontrast oranžové malého textu 5,1 : 1); čtečka čte celou větu řádku, ochranu jako `role=status`, „––“ jako „bez dat“; řádek údajů grafu je živá oblast; dotykové plochy ≥ 44 px; 320 px bez posunu (obsah popupu 208 px, hodnota s jednotkou se nezalamuje); tmavý i světlý režim ze stávajících proměnných; `prefers-reduced-motion` bez animací; nic se neposouvá (popup i ⓘ jen překrývají, množina řádků zmrazená, pevná výška řádku údajů).



### 2026-11-02 · Rozklik spotřebiče v Detailu Dům, popup na jeden řádek (potvrzeno)

- Uživatel 2. 11. (iPhone): „Začátek 2:42“ u myčky byl konec (čas se bral z `last_changed` helperu); spotřebiče v rozkliku nešlo od sebe odlišit; „Běží“ se symbolem vypnutí při výkonu 6 W je nekonzistentní; „Zásuvka zapnuta“ nezobrazovat; „Počet cyklů“ je nesrozumitelný (chce spotřebu posledního cyklu nebo za období); popup na dva řádky zbytečně zabírá místo.
- Nahrazeno: začátek, konec a trvání z přechodů helperu v recorderu; každý spotřebič ve vlastní kartě s vnořeným blokem; běžící cyklus ukazuje výkon i pod prahem; zásuvka jen když je vypnutá; „Za 1 den: N cyklů · X kWh“; popup má spotřebič na jednom řádku (dřívější „spotřeba pod názvem“ nahrazeno).

### 2026-11-02 · Barvy spotřebičů v grafu Dům, zarovnání v popupu (potvrzeno)

- Uživatel 2. 11. (iPhone): odstíny fialové se špatně rozlišují, najít ladící paletu s rezervou tří barev; výkon spotřebiče v popupu byl vlevo, ostatní hodnoty vpravo. Nahrazeno: odstíny barvy Domu pevnou paletou šesti barev; výkon spotřebiče vpravo.

### 2026-11-02 · Popup Dům širší (potvrzeno)

- Uživatel 2. 11. (iPhone): popup může být širší, nezalamovat; spotřeba pod názvem spotřebiče, jednotka za číslem. Šířka 236 → 300 px, hodnoty bez zalomení.

### 2026-11-02 · Upozornění: zablokované nabíjení a Boost bojleru jsou varování (potvrzeno)

- Uživatel 2. 11.: „Nabíjení zablokované je warning. To je nestandardní stav. Stejně jako boost bojleru. … Bojler nemá běžet vůbec, max přetoky. Pokud je puštěný plynový kotel, nemá boost bojleru FVE smysl.“ Boost wallboxu je normální stav (není upozornění).
- Nahrazeno: dřívější zrušení upozornění na blokaci a na Boost bojleru. Zásobník v jiném režimu než Off: text „Plynový zásobník je zapnutý, Boost bojleru FVE nemá smysl.“
- Ostatní otázky z UX auditu uživatel nechápe a neřeší (zůstávají jen v historii).

### 2026-11-02 · UX audit obou dashboardů (ux-architect a dashboard-critic; nepotvrzeno, otázky položeny 2. 11. 2026)

- Chyby kódu proti spec: oranžový podtitulek „Boost · bere i ze sítě…“ a oranžová zablokovaná volba a „Připojeno, nenabíjí“ v kartě Auto; hláška při selhání vypnutí Boostu říká „Boost je zapnutý“; pruh „Odkud auto nabíjí“ posouvá ovladač; stálé vysvětlivky v panelech (zakázané); info odznak upozornění je modrý místo šedého; Klima: Boost červený, kruh Plánu oranžový, neznámý přepis oranžově.
- Otázky (rozhodnutí ve spec): oranžová pro podíl sítě nad 50 % u auta a vody; baterie na rezervě trvale oranžová; Klima: oranžové štítky Topí / Ručně / Boost; zapomenuté okno není v kódu Klimatu; venkovní kvalita vzduchu v hlavičce Klimatu; jedna sémantika oranžové v kitu.
- Překlady: sv „laddar ur inte“, en „boiler“ u zásobníku, sv nadpis „Varningar“ a „köper/säljer“.

### 2026-11-02 · Stálé pořadí dlaždic, menší upozornění, spotřebič bez odběru (potvrzeno)

- Uživatel 2. 11.: „neodebírá“ je moc velké, najít lepší řešení; panely na hlavní Energii nesmí měnit pořadí; Boost wallboxu je v zimě normální stav, ne „mega panel“, zkontrolovat přehnaná upozornění i jinde.
- Nahrazeno: řazení dlaždic podle nejméně křížení (pořadí je stálé); upozornění na Boost wallboxu a bojleru a na zablokované nabíjení (zrušena, stav ukazují ovladače); velké řádky Upozornění (zmenšeny); text „neodebírá“ u spotřebiče (šedá ikona vypnutí).
- Klima: zkontrolovat přehnaná upozornění zatím neprovedeno.

### 2026-11-02 · Implementace popupu a Detailu Dům, oprava podle iPhonu (potvrzeno)

- Implementováno (`src/house.ts`). Uživatel na iPhonu: graf měl ukazovat jen spotřebu domu bez auta a bojleru, bez slunce a baterie, rozloženou na spotřebiče („Max rozpad na appliances zařízení“); a detail hlásil „Žádné spotřebiče“, přestože sušička běžela (štítek se v živém Home Assistantu nenačetl). Opraveno: graf je jen Dům rozložený na spotřebiče; spotřebič lze zadat v `house.appliances` i s `power` a `energy` (bez štítku); detail při prázdném seznamu ukáže, co vidí o štítku.
- Nahrazeno: dřívější graf zdrojů a odběru (Slunce, Baterie, Síť, Auto, Bojler) a rozhodnutí „v YAML jen helpery cyklů“ (zdroj spotřebiče může být i v YAML).

### 2026-11-02 · Export spotřebičů a helperů (potvrzeno exportem)

- Uživatel dodal export entit se štítkem `appliances` (`HA entities/spotrebice.json`, 53 entit: pračka, sušička, myčka, dva vysavače Roborock) a export helperů cyklů (`HA entities/spotrebice_helpery.json`: 3× `input_boolean`, 3× `input_number`, 6× `automation`). Zapsáno do `ENTITY_MAP.md`, oddíl Spotřebiče.
- Poslední cykly podle helperů: myčka 3 h 58 min a asi 0,935 kWh, pračka 37 min 56 s (start energie 0,0, čítač 2,119719 kWh), sušička 2 min 40 s a 0,008 kWh.
- Zjištění: `HA entities/energie.json` je export z 30. 10. 2026 (ne z 24. 10.); `sensor.wallbox_total_power` a `sensor.tuv_power_total` v něm mají `state_class: measurement`; existují `sensor.goodwe_today_load` a `sensor.goodwe_total_load`. Opraveno v `ENTITY_MAP.md`.
- Entita vedlejší spotřeby elektroniky auta (ID obsahuje VIN) se z exportu helperů do repozitáře nezapsala.

### 2026-11-02 · Konsolidace dokumentace (potvrzeno)

- Uživatel 2. 11. 2026: „Zkonsoliduj všechny md soubory. Chci všude ukládat design history. Chci jen ověřené a potvrzené věci. Pokud něco není ověřené a potvrzené, ptej se tady ne v todo. Už nesmí nastat situace, že si někde koliduje zadání s nějakým jiným výstupem. Zápis si to a příště to udělej stejným způsobem.“ Pravidla jsou v `AGENTS.md` kitu, oddíl Dokumentace.
- Zrušeno a přeneseno níže (příloha): `TODO.md`, `AUDIT.md`, `MEMORY_SUMMARIZED.md`, `TYDEN.md`. `AI_MCP.md` přesunut do kitu. Potvrzené odpovědi uživatele z `TYDEN.md` jsou ve `CURRENT_SPEC.md`, oddíl Provoz domu.
- Dřívější pravidlo „historie se nevede, neplatné se maže“ (`MEMORY_SUMMARIZED.md`, `.github/copilot-instructions.md`) je nahrazeno: nahrazený text se přesouvá sem.
- `ENTITY_MAP.md`: odstraněny sloupec Stav, poznámky „k ověření“ a oddíl Chybějící údaje; znaménko přetoku sítě opraveno podle uživatele 28. 10. (kladné = přetok).
- Ze `CURRENT_SPEC.md` odstraněno jako nepotvrzené (původní znění; v kódu karty zůstává, dokud uživatel nerozhodne):
- „, Dům `#BF5AF2`, Auto `#40D0E6`, Bojler `#FF6F59`; stejná barva“
- „ Dům, Auto a Bojler jsou návrh.“
- „ Zbývá jedna shoda, modrá Síť × modrý akcent, zapsáno v `TODO.md`.“
- „; HIG stránku Gestures jsem nečetl, přetažení je moje, TODO E17)“
- „ K ověření zůstává, zda spotřeba domu zahrnuje bojler (TODO E4).“
- „; zda i bojleru, k ověření | střídač (počítaná hodnota, viz `AUDIT.md` bod 1)“
- „ Jak zdroje sjednotit, je otevřené (TODO E2).“
- „ Návrh (TODO E17).“
- „v barvě zdroje (Auto `#40D0E6`, Bojler `#FF6F59`) v 50 % krytí“
- „**Věta s odhadem času**: nabíjí = „Plná za asi 7 h 30 min“ (zbývá (100 − nabití) % z `battery.capacity` při okamžitém výkonu), vybíjí = „Vydrží asi 3 h 30 min“ (do rezervy, tedy (nabití − rezerva) %); pod prahem toků (`flows.idle_threshold`) věta není. Je to odhad při dnešním výkonu, proto „asi“. “
- „ a věta s odhadem; čtyři dlaždice“
- „Slovní hodnocení vyvážení (Výborné ≤ 15 mV, Dobré ≤ 30 mV, Pozor ≤ 100 mV, Chyba nad tím) je návrh (TODO E20), prahy jsou `battery.imbalance_good`, `.imbalance_warn`, `.imbalance_fault`. “
- „plocha pod čárou, zelený pás výborného rozsahu od nuly do `battery.imbalance_good` (osa popsaná „0“, „15 mV“ a nahoře maximem), čára zelená a nad `battery.imbalance_warn` oranžová; legenda „výborné do 15 mV“.“
- „- Ilustrační čísla v návrhu nejsou měření. **Ověřit v živém Home Assistantu:** název a jednotky entit předpovědi, existence statistik `pv.total_generation`, přesnost „Skončí asi“.“
- „ Pokud by Home Assistant vracel obrázek s bílým pozadím, musí karta pozadí odstranit nebo auto dát na světlou plochu (ověřit na reálné entitě).“
- „text vypisuje zdroje s podílem ≥ 15 % od největšího (při shodě slunce první), pruh a legenda ukazují přesné podíly, tečka stavu má barvu největšího zdroje; zdroj pod 5 % se do textu nedostane. Síť nad 50 % je odchylka (oranžová). Hranice jsou návrh (TODO E11).“
- „): Zablokovat nabíjení – zapnuto „Auto nenabíjí, přebytek ohřívá vodu“, vypnuto „Auto smí nabíjet“; Přednost před bojlerem – zapnuto „Auto nabíjí dřív než bojler“, vypnuto „Auto nemá přednost“. Texty jsou návrh (TODO E17).“
- „; jak ji zobrazit, je otevřené (TODO E3);“
- „ Od kolika minut je která hodnota zastaralá, je otevřené (TODO E1).“
- „ | `battery.imbalance_good`, `.imbalance_warn`, `.imbalance_fault` | `15`, `30`, `100` | mV, hranice slov Výborné, Dobré, Pozor, Chyba u rozbalancování (návrh, TODO E20) |“

## Rekonstrukce z historie Gitu (vygenerováno 2. 11. 2026, nezávazné)

Chronologický seznam všech commitů do `da09864` (včetně) a u každého řádky z `CURRENT_SPEC.md`, které commit nahradil (text zkrácen na 600 znaků; úplné znění: `git show <commit>`). Slouží jako doplněk historie tam, kde nebyla vedena průběžně; potvrzené je jen to, co je dnes ve spec.

- `62863ea` 2026-10-28 · Konsolidace: hlavni soubor rozdelen na casti, testy 63 -> 21, TODO E1-E18, zadani bez duplicit
- `ecaf2a8` 2026-10-29 · Energie: flows.decimals (auto = aspon 3 cislice, 1, 2), vychozi auto; kit s two()
  - nahrazeno: „- **Malé hodnoty se nezobrazují** (uživatel 27. 10.: „Při výrobě FVE občas skáče pár W ± ze sítě. Pokud je to do ±99 W, tak to zobrazovat jako nic. Žádné 0.0 odebírá nebo posílá“ a „Hodnoty <0.1 kW nezobrazovat, nebo jen minimálně. Zobrazení 0.0 kW je divné (třeba u nabíjení baterie nebo přetoků)“): výkon s absolutní hodnotou pod `flows.idle_threshold` (výchozí 100 W, tedy do ±99 W) je žádný tok, u všech zdrojů a spotřebičů, u sítě kladný i záporný. Dlaždice je neaktivní se slovem místo hodnoty (neodebírá, nedodává, nenabíjí, vypnuto …), bez pásu a bez záře. Taková hodnota se nezapočítá do pod …“
  - nahrazeno: „- **Jednotky:** všechny hodnoty v jedné jednotce: kW (jedna desetina), když je některý výkon aspoň 1 kW, jinak W. Energie (kWh) s jednou desetinou. Čísla, procenta a čas podle profilu Home Assistantu a jazyka karty (oddíl Jazyky).“
- `df26a08` 2026-10-29 · Popupy: kWh aspon na 3 cislice, Baterie a Sit ukazuji jen klepnuty smer
  - nahrazeno: „- **Jednotky:** všechny hodnoty v jedné jednotce: kW s aspoň třemi číslicemi (`flows.decimals: auto`, výchozí: 0,13 · 1,36 · 6,43 · 11,3; `1` nebo `2` ho nahradí pevným počtem desetin; uživatel 29. 10.: „Main flow energie. Možnost zobrazit 2 desetinná místa.“ a „Nebo takhle: zobrazovat alespoň 3 číslice? 0.13, 1.36, 6.43, 11.3“), když je některý výkon aspoň 1 kW, jinak W. Energie (kWh) s jednou desetinou. Čísla, procenta a čas podle profilu Home Assistantu a jazyka karty (oddíl Jazyky).“
  - nahrazeno: „- **Popup dlaždice** (uživatel 27. 10.): klepnutí na kteroukoli z osmi dlaždic otevře popover (HIG Popovers, na iPhonu bublina se šipkou u dlaždice, `#3A3A3C`, šířka 236 px; pod dlaždicí, u dolních dlaždic nad ní). Je to jediné místo, kde jsou denní součty; v kartě nejsou žádné stálé (uživatel: „Nepotřebuju to mít neustále a zabírá to místo. Stačí popisy.“). Obsah shora: název a okamžitý stav („nabíjí 0,8 kW“, „bez ohřevu“); u Baterie, Bojleru a připojeného Auta úroveň (Nabití 88 %, Teplota 52 °C, Nabití 62 %) velkým číslem a 8px gauge, u baterie na rezervě poznámka „pod rezervou“; pak řádky s …“
  - nahrazeno: „- **Popup záhlaví** (uživatel 27. 10.: „Klik na záhlaví Energie otevře větší popup se součty všeho“): klepnutí na nadpis nebo větu stavu karty Elektřina (nadpis má chevron „›“) otevře větší popover (`#3A3A3C`, šířka karty, šipka pod nadpisem) „Dnes · kWh“ se dvěma sloupci. **Zdroje** (součet v záhlaví sloupce): Slunce (vyrobeno), Z baterie (vybito), Ze sítě (odebráno). **Spotřeba** (součet): Dům, Auto, Bojler, Do baterie (nabito), Do sítě (přetoky). Dům je zbytek, takže se oba součty rovnají; barvy teček jsou barvy zdrojů a spotřebičů z diagramu; nula se píše „0“. Zavře se klepnutím mimo; otev …“
  - nahrazeno: „| `flows.decimals` | `auto` | desetinná místa výkonů v kW: `auto` = aspoň tři číslice („0,13“, „1,36“, „6,43“, „11,3“, od 100 kW celé), `1` („6,8 kW“) nebo `2` („6,81 kW“); platí pro celou kartu, W jsou vždy celé a kWh mají jednu desetinu |“
- `8a42d05` 2026-10-29 · Baterie na rezerve: text 'na rezerve' misto 'pod rezervou'
  - nahrazeno: „- **Úroveň jako výplň dlaždice: Baterie, Auto, Bojler** (uživatel 28. 10.: „Ten hlavní Energy mi pořád nesedí ty stavy baterie. Když se vybíjí, chtěl bych vidět, kolik má %, a u nabíjení taky. … Wallbox % a teplota bojleru zatím pryč. … potřebuji nabití baterie lépe profi vizualizovat na obou stranách.“, pak „Ta ikona a % jen u aktivní strany. … Aby tam nemusela být ta %, už je to přeplácané.“, pak „Text pořád ujíždí. Co takhle nějaké zobrazení jako výplň toho boxu celého nebo jen levá část?“). **Nabití je výplň pozadí aktivní dlaždice Baterie** (vlevo zdroj, když vybíjí; vpravo spotřebič, kdy …“
  - nahrazeno: „- **Popup dlaždice** (uživatel 27. 10.): klepnutí na kteroukoli z osmi dlaždic otevře popover (HIG Popovers, na iPhonu bublina se šipkou u dlaždice, `#3A3A3C`, šířka 236 px; pod dlaždicí, u dolních dlaždic nad ní). Je to jediné místo, kde jsou denní součty; v kartě nejsou žádné stálé (uživatel: „Nepotřebuju to mít neustále a zabírá to místo. Stačí popisy.“). Obsah shora: název a okamžitý stav („nabíjí 0,8 kW“, „bez ohřevu“); u Baterie, Bojleru a připojeného Auta úroveň (Nabití 88 %, Teplota 52 °C, Nabití 62 %) velkým číslem a 8px gauge, u baterie na rezervě poznámka „pod rezervou“; pak řádky s …“
  - nahrazeno: „- **Upozornění a nestandardní stavy jsou úplně nahoře stránky** (uživatel 27. 10.: „všechna upozornění / nestandardní stavy úplně nahoře, jako u Klima dashboardu“), pod nadpisem „Energie“ a nad kartou Elektřina; skupina „Upozornění“ se objeví jen, když nějaké jsou (žádný prázdný stav). Řádek: ikona 24 px v odznaku 40 px, název 17 px, text 13 px `#C7C7CC`; oranžová ikona = odchylka, šedá = informace. Řádky: auto je připojené, ale nenabíjí (přednost před bojlerem, slunce nad 200 W; oranžová); nabíjení auta je zablokované (šedá); Boost wallboxu zapnutý (oranžová); Boost bojleru zapnutý (oranžová) …“
- `948f67c` 2026-10-29 · Toky: zdroje plni spotrebice poporade (Slunce, Baterie, Sit -> Dum, Auto, Bojler), pasy se nekrizi
  - nahrazeno: „- Zdroje energie pro spotřebiče se dělí podle podílu naměřených toků (slunce bez nabíjení baterie a přetoku, vybíjení baterie, odběr ze sítě); nabíjení baterie a přetok do sítě jsou jen ze slunce.“
- `ccedbe0` 2026-10-29 · Nabiti auta: deset pilulek po 10 % s mezerou 3 px a castecnou vyplni posledniho bloku
  - nahrazeno: „- **Karta BMW i3:** obrázek auta z BavarianData je hlavní prvek vpravo nahoře (v návrhu 204 × 101 px, záhlaví 168 px; uživatel 27. 10.: „Obrázek auta je moc malý, je potřeba ho zvětšit“) (uživatel 24. 10.: „Tady chci obrázek mého auta, resp. stačí z BavarianData“), pod ním světlo v barvě stavu (slunce žlutá, boost oranžová, jinak neutrální); velké číslo nabití a dojezd; nabití je měřič s dílky po 10 % a značkou limitu, **která je vidět jen když je limit pod 100 %** (100 % je výchozí a nezobrazuje se nikde; uživatel 27. 10.: „Když je limit wallboxu/auta 100 %, tak nikde nezobrazovat“); pod ním  …“
- `3e5dc38` 2026-10-29 · Nabiti auta: puvodni vyska 34 px, siroke mezery 5 px mezi bloky po 10 %
  - nahrazeno: „- **Karta BMW i3:** obrázek auta z BavarianData je hlavní prvek vpravo nahoře (v návrhu 204 × 101 px, záhlaví 168 px; uživatel 27. 10.: „Obrázek auta je moc malý, je potřeba ho zvětšit“) (uživatel 24. 10.: „Tady chci obrázek mého auta, resp. stačí z BavarianData“), pod ním světlo v barvě stavu (slunce žlutá, boost oranžová, jinak neutrální); velké číslo nabití a dojezd; nabití je měřič z deseti pilulek po 10 % (výška 16 px, mezera 3 px, stopa `--ed-gauge-track`, poslední začatý blok je vyplněný jen částečně, stejně jako úroveň baterie v popupu dlaždice; uživatel 29. 10.: „Tu baterii 10% bloky  …“
- `566e91f` 2026-10-29 · TODO E19: spinac Prednost pred bojlerem neodpovida AZ Routeru (overit entitu)
- `de3e8cf` 2026-10-29 · Nabiti auta: mezera 3 px jako v pruhu Odkud auto nabiji
  - nahrazeno: „- **Karta BMW i3:** obrázek auta z BavarianData je hlavní prvek vpravo nahoře (v návrhu 204 × 101 px, záhlaví 168 px; uživatel 27. 10.: „Obrázek auta je moc malý, je potřeba ho zvětšit“) (uživatel 24. 10.: „Tady chci obrázek mého auta, resp. stačí z BavarianData“), pod ním světlo v barvě stavu (slunce žlutá, boost oranžová, jinak neutrální); velké číslo nabití a dojezd; nabití je měřič z deseti bloků po 10 % (výška 34 px, mezera 5 px, vnější rohy 12 px, vnitřní 3 px, podklad `#2C2C2E`, poslední začatý blok je vyplněný jen částečně; uživatel 29. 10.: „Tu baterii 10% bloky rozděl silnější mezero …“
- `f8eefa6` 2026-10-29 · Mezery 2 px: gauge nabiti auta i pruh Odkud auto nabiji
  - nahrazeno: „**Pruhy zdrojů a cílů** (Odkud auto nabíjí, Wallbox „dnes nabito“) mají jednotný vzhled na celém dashboardu (uživatel 25. 10.: „všechny zobrazovače by měly být přes celý dashboard konzistentní“): titulek + celkový výkon, pruh 20 px, radius 7, mezera 3 px, legenda s čtverečky 10 px, na jednom řádku bez nadpisu (uživatel 25. 10.: „max 1 řádek. je to legenda, zabírá míň místa“; průměr 5 min je jen ve specifikaci a v popisku pro čtečky).“
  - nahrazeno: „- **Karta BMW i3:** obrázek auta z BavarianData je hlavní prvek vpravo nahoře (v návrhu 204 × 101 px, záhlaví 168 px; uživatel 27. 10.: „Obrázek auta je moc malý, je potřeba ho zvětšit“) (uživatel 24. 10.: „Tady chci obrázek mého auta, resp. stačí z BavarianData“), pod ním světlo v barvě stavu (slunce žlutá, boost oranžová, jinak neutrální); velké číslo nabití a dojezd; nabití je měřič z deseti bloků po 10 % (výška 34 px, mezera 3 px jako v pruhu „Odkud auto nabíjí“ pod ním (uživatel 29. 10.: „Chtěl jsem stejné mezery nahoře jako dole“), vnější rohy 12 px, vnitřní 3 px, podklad `#2C2C2E`, posl …“
- `d137e88` 2026-10-29 · Nabiti auta: zaoblene jen krajni rohy u 0 a 100 %, mezi bloky rovne rezy 2 px
  - nahrazeno: „- **Karta BMW i3:** obrázek auta z BavarianData je hlavní prvek vpravo nahoře (v návrhu 204 × 101 px, záhlaví 168 px; uživatel 27. 10.: „Obrázek auta je moc malý, je potřeba ho zvětšit“) (uživatel 24. 10.: „Tady chci obrázek mého auta, resp. stačí z BavarianData“), pod ním světlo v barvě stavu (slunce žlutá, boost oranžová, jinak neutrální); velké číslo nabití a dojezd; nabití je měřič z deseti bloků po 10 % (výška 34 px, mezera 2 px, stejná jako v pruhu „Odkud auto nabíjí“ pod ním (uživatel 29. 10.: „Chtěl jsem stejné mezery nahoře jako dole … Dole je 2 a nahoře 3 … chci to stejně. 2 px“), vn …“
- `caec736` 2026-10-29 · Novy popup a Detail baterie (Dnes, Historie, Zdravi)
  - nahrazeno: „- **Kód nezahrnuje:** „Jak dlouho“ u zásobníku, detailní obrazovky Voda a Wallbox (odkazy v záhlaví karet), 24h historii a historii po klepnutí (TODO E10), ovládání limitu nabití auta, zvýšený kontrast (TODO E18). Denní součty fungují jen s čítači podle `examples/denni_soucty.yaml`; čítače pro auto a bojler nejsou ověřené (TODO E14), bez nich ukazuje Dům a součty „––“. Čas posledního ohřevu bojleru se po vymazání dat prohlížeče ztratí (dlaždice Bojler se pak ukáže, dokud nezačne ohřev).“
  - nahrazeno: „- Odhad „do plného / do vybití“ by potřeboval entitu s kapacitou, zatím není.“
  - nahrazeno: „- Detail po klepnutí (zatím nenavržen, TODO E10): křivka nabití za 24 h s čárkovanou čárou rezervy 20 %; při nabití ≤ 20 % oranžová.“
- `17a39d1` 2026-10-29 · Popup baterie: mensi (236 px), bez mikrotrendu
  - nahrazeno: „- **Popup baterie** (uživatel 29. 10.: „Více se mi líbí ten můj stávající popup“, „Na popup nepotřebuji vidět SOH a teplotu. To si nechme na detail“): klepnutí na dlaždici Baterie (vlevo vybíjí, vpravo nabíjí) otevře popover přes šířku karty se šipkou u dlaždice. Obsah shora: název a okamžitý stav („nabíjí 0,85 kW“, „nevybíjí“); **Nabití** velkým číslem (34 px, `.pop-big`) a pod ním **gauge z deseti pilulek** po 10 % s mezerou 2 px (uživatel: „Zaoblené jen u 0 a 100. Jinde jen rovné rozdělení po 10 % bez zaoblených rohů“, „A ten gauge nechci animovaný“): zaoblené jsou jen vnější rohy první a p …“
- `3bde22d` 2026-10-29 · Dlazdice: syte barvy zdroju (pres cernou/bilou) a Dum bez duhy: barva nejvetsiho zdroje + pruh s podily
  - nahrazeno: „**Diagram.** Dlaždice zdrojů a spotřebičů jsou plné podložky `#2C2C2E` (aktivní: barva zdroje 21–28 % přes `#2C2C2E`), bez okraje, bez rozmazání. Ikona dlaždice (26 px) září podle výkonu: poloměr 2–11 px a krytí 30–90 % rostou s výkonem, bez toku žádná záře. Pásy Sankey a tečky podle výkonu jsou obsah, ne materiál. Ikony jsou vlastní, ne ikony Home Assistantu; SF Symbols karta nepoužívá (nejsou dostupné na webu).“
  - nahrazeno: „- **Pás** = tok jednoho zdroje do jednoho spotřebiče: barva zdroje (slunce, baterie, síť), tloušťka = výkon (jedno měřítko pro všechny, `flows.band_max_px_per_kw` 10, `flows.band_min_px` 1,6), okraje se průhledně ztrácejí pod dlaždicí, po středu tečou bílé tečky (rychlost podle výkonu). Oranžová se v tocích nepoužívá (uživatel 26. 10.: „Oranžová mi nic neřekne“). Dlaždice Dům je podbarvená podle podílů zdrojů. Animace respektují `prefers-reduced-motion` (tečky stojí).“
- `69954b2` 2026-10-29 · Detail baterie: graf Vyvazeni clanku jako jedna cara rozdilu v mV se zelenym pasem vyborneho rozsahu
  - nahrazeno: „- **Zdraví**: nahoře věta o stavu (Baterie je v pořádku / Chyba … / Bez dat) podle `battery.error` a `battery.warning`; pod ní rozbalovací řádky s hodnotou a historií **1 den | 7 dní | 30 dní** (výchozí 1 den, uživatel 29. 10.: „Výchozí 1 den nebo konfigurace“; volba je jedna pro všechny řádky a karta si ji pamatuje v prohlížeči, klíč `battery.default_range`): **Kapacita** (SOH a využitelná kapacita = SOH × kapacita, bez grafu: pomalá hodnota), **Vyvážení článků**, **Teplota**, **Životnost**; dole **Diagnostika** (režim, limit nabíjení a vybíjení, chyby, varování, jak je střídač hlásí). **Vyvá …“
- `af0d1a8` 2026-10-29 · Karta pise do konzole razitko sestaveni (verze, cas, commit), README: jak poznat stary cache
- `ea1ee6c` 2026-10-29 · Pridan IDEAS.md (30 napadu) a AI_MCP.md (navod Claude pres MCP), napady E10 a E18 presunuty z TODO
  - nahrazeno: „- **Kód nezahrnuje:** „Jak dlouho“ u zásobníku, detailní obrazovky Voda a Wallbox (odkazy v záhlaví karet), historii po klepnutí u ostatních dlaždic (TODO E10; baterie ji má), ovládání limitu nabití auta, zvýšený kontrast (TODO E18). Denní součty fungují jen s čítači podle `examples/denni_soucty.yaml`; čítače pro auto a bojler nejsou ověřené (TODO E14), bez nich ukazuje Dům a součty „––“. Čas posledního ohřevu bojleru se po vymazání dat prohlížeče ztratí (dlaždice Bojler se pak ukáže, dokud nezačne ohřev).“
  - nahrazeno: „- **Popup dlaždice** (uživatel 27. 10.): klepnutí na kteroukoli z osmi dlaždic otevře popover (HIG Popovers, na iPhonu bublina se šipkou u dlaždice, `#3A3A3C`, šířka 236 px; pod dlaždicí, u dolních dlaždic nad ní). Je to jediné místo, kde jsou denní součty; v kartě nejsou žádné stálé (uživatel: „Nepotřebuju to mít neustále a zabírá to místo. Stačí popisy.“). Obsah shora: název a okamžitý stav („nabíjí 0,8 kW“, „bez ohřevu“); u Baterie, Bojleru a připojeného Auta úroveň (Nabití 88 %, Teplota 52 °C, Nabití 62 %) velkým číslem a 8px gauge, u baterie na rezervě (nabití ≤ rezerva) poznámka „na reze …“
- `9b7764a` 2026-10-29 · Koncept vyhledu dne a popisku podle normy (FORECAST.md), napady N31-N34, N9 jen v historii auta
- `ea429bb` 2026-10-29 · Oprava vykonu panelu (20x500 Wp, 10 kW), export hodinovych dat a sablona popisku, napad N35 (kdyz-tak)
- `9a8cf81` 2026-10-29 · Navrh vyhledu: metoda uzivatele (start 50 %, stop 30 %) jako vychozi scenar, oprava zaveru o minimu wallboxu, N14 prepsan
- `5e79496` 2026-10-29 · IDEAS N32: prepinac scenaru zacina metodou uzivatele
- `a8596b1` 2026-10-29 · export_hodiny: prijima http(s) adresu jako v prohlizeci, srozumitelna chyba pri odmitnutem spojeni
- `76d12f7` 2026-10-29 · FORECAST: kalibrace na exportu 15.-29.10, zpetne prehrani metody uzivatele, oprava predstrelu modelu
- `d944748` 2026-10-29 · export_hodiny: zaloha z historie stavu pro entity bez statistik; example state_class pro wallbox a bojler
- `c962093` 2026-10-29 · gitignore: __pycache__
- `7153ad5` 2026-10-29 · TYDEN.md: tydenni ladeni, pravidla nabijeni a cil auta z vysvetleni uzivatele, otazky tohoto tydne
- `de10097` 2026-10-29 · TYDEN: odpovedi uzivatele (zatezovy test 18.10, bojler nikdy z baterie, HDO ceny, boost 4 kW)
- `e811a4c` 2026-10-29 · TYDEN: automaticky tydenni ukol a pripominka
- `f1b48a7` 2026-10-29 · TYDEN: overeni wallboxu a bojleru z noveho exportu
- `97abdb2` 2026-10-29 · TYDEN, IDEAS N14: bojler je tlumic vykyvu (sum), 28.10 vysvetleno
- `19877ee` 2026-10-30 · Baterie: pruh nabito/vybito jako dva segmenty s mezerou 2 px, bez nulovych segmentu, test a spec
  - nahrazeno: „- **Dnes**: Nabití (číslo + stejný gauge, 32 px) a věta s odhadem; čtyři dlaždice **Výkon, Proud, Napětí, Zátěž** (zátěž v C = |výkon| ÷ kapacita); graf **Nabití a výkon** (čára nabití, sloupce výkonu nahoře nabíjení a dole vybíjení) s přepínačem **6 h | 24 h**; karta **Energie dnes** (nabito, vybito, poměr a „Čistě uloženo +1,7 kWh“).“
- `60f3496` 2026-10-30 · Detail baterie: Zpet zavre i puvodni popup
  - nahrazeno: „- **Detail baterie** (uživatel 29. 10.: „Navrhni nejlepší kartu pro detail baterie“): plný list přes kartu (dialog, Escape a „Hotovo“ zavírají, „‹ Zpět“ vrací do popupu) se segmentovým ovladačem **Dnes | Historie | Zdraví**. Všechny grafy se posouvají prstem (neviditelný posuvník přes graf, klávesnicí šipkami), údaj o bodu je v řádku nad grafem, dole osa času vlevo „−24 h“ a vpravo „dnes“, **svislá osa má tři hodnoty (horní, střední, dolní) vlevo nad vodorovnými čárami** (uživatel: „Není tu svislá osa“) a data se vlevo plynule vytrácejí, aby byly popisky čitelné (uživatel: „Vlevo alpha gradien …“
- `cc55875` 2026-10-30 · FORECAST: Slunce popup a detail, rozhodnuti z komentaru (bez procent mozneho, odhad s jistotou, naucena krivka mozneho)
- `271bd15` 2026-10-30 · SPEC: pravidlo pro kolecka s cislem (cislo uprostred, jednotka mensi pod nim)
- `3402593` 2026-10-30 · Slunce: bez komentare k omezeni vyvozu (jen v lete), hinty za i, zaznam rozhodnuti z komentaru
- `3dc3919` 2026-10-30 · FORECAST.md: výběr dat do Výhledu, úprava popisu Historie
- `619d180` 2026-10-30 · FORECAST.md: plošný graf a klidnější barvy v Historii
- `a560019` 2026-10-30 · Slunce: popup a detail (Dnes, Historie, Výhled) na dílech detailu baterie
- `51b7362` 2026-10-30 · Slunce: Dnes do večera ve stejných jednotkách (baterie ve 22:00 a v 6:00 v %), auto jen když není odpojené
  - nahrazeno: „- **Výhled**: odhad dne s ≈, rozsahem, jistotou a kolečkem; **Pět dní dopředu** (jeden řádek na den: počasí, hodinový pruh od `forecast.strip_from` do `strip_to`, plná žlutá od `forecast.good_power`, vpravo kWh a okno; bez předpovědi dalších dní se panel nekreslí); **Dnes do večera** (baterie plná, baterie v `evening_hour`, auto ze slunce v kWh a km, ze sítě v noci); dlaždice Den (délka a změna za den) a Nejlepší den.“
- `5758a6f` 2026-10-30 · Slunce: Dnes do večera ukazuje, s čím počítá (baterie teď, slunce, dům, přepínač Auto), osa y po 1 kW
  - nahrazeno: „- **Dnes**: výkon teď a kam jde; graf **Výkon dnes** (výroba z pětiminutových průměrů, tečkovaná křivka „možné“, pásmo předpovědi od teď, posun prstu); dlaždice Dnes zatím (kolečko), Špička dnes, Výroba začala (východ slunce), Skončí asi (západ slunce); **Kam dnes slunce šlo**: slunce bez baterie a sítě (výroba − nabito − dodáno) se dělí mezi dům, auto a bojler podle jejich spotřeby, baterie a síť jsou skutečné součty. Je to odhad z denních čítačů.“
  - nahrazeno: „- **Výhled**: odhad dne s ≈, rozsahem, jistotou a kolečkem; **Pět dní dopředu** (jeden řádek na den: počasí, hodinový pruh od `forecast.strip_from` do `strip_to`, plná žlutá od `forecast.good_power`, vpravo kWh a okno; bez předpovědi dalších dní se panel nekreslí); **Dnes do večera** (baterie plná, baterie v `evening_hour`, auto ze slunce v kWh a km, baterie v `morning_hour` dalšího dne; všechny stavy baterie v %; auto se počítá, jen když není odpojené); dlaždice Den (délka a změna za den) a Nejlepší den.“
- `e28cd95` 2026-10-30 · Slunce: pryc prepinac Auto, auto se pocita samo podle pravidla wallboxu
  - nahrazeno: „- **Výhled**: odhad dne s ≈, rozsahem, jistotou a kolečkem; **Pět dní dopředu** (jeden řádek na den: počasí, hodinový pruh od `forecast.strip_from` do `strip_to`, plná žlutá od `forecast.good_power`, vpravo kWh a okno; bez předpovědi dalších dní se panel nekreslí); **Dnes do večera** (baterie plná, baterie v `evening_hour`, s čím se počítá (baterie teď, slunce a dům do `evening_hour`), přepínač Auto (Nenabíjet = výchozí, Ze slunce = pravidlo wallboxu; pamatuje se v prohlížeči, jen když je `wallbox.power`), pak výsledky: baterie plná, auto ze slunce v kWh a km, baterie v `evening_hour` a v `mor …“
- `060e81d` 2026-10-30 · examples: blok forecast s entitami Open-Meteo Solar Forecast a weather
- `bf5f183` 2026-10-30 · Slunce: zbytek dne z predpovedi se drzi toho, co slunce jeste muze dat
- `1d4ecda` 2026-10-30 · Slunce: spotreba auta z nabiti, kapacity a dojezdu
  - nahrazeno: „- **Dnes do večera:** simulace po čtvrthodinách od teď do `morning_hour` dalšího dne: slunce (zbytek dne z odhadu) krmí dům (medián spotřeby domu stejné hodiny za `learn_days`, wallbox v ní je, proto medián), přebytek plní baterii s účinností `forecast.efficiency`, nedostatek ji vybíjí do rezervy a pak jde ze sítě. Auto jen s `wallbox.power`: startuje při baterii ≥ `car_start_soc` a slunci ≥ `car_min_sun`, zastaví při ≤ `car_stop_soc`, výkon = `wallbox.power_min`; km = kWh ze slunce ÷ `car_kwh_per_km`. Bez SOC baterie, spotřeby domu nebo odhadu dne se panel nekreslí.“
- `e36daf7` 2026-10-30 · Konfigurace: pryc spotreba auta (forecast.car_kwh_per_km, car.battery_capacity)
  - nahrazeno: „- **Dnes do večera:** simulace po čtvrthodinách od teď do `morning_hour` dalšího dne: slunce (zbytek dne z odhadu) krmí dům (medián spotřeby domu stejné hodiny za `learn_days`, wallbox v ní je, proto medián), přebytek plní baterii s účinností `forecast.efficiency`, nedostatek ji vybíjí do rezervy a pak jde ze sítě. Auto jen s `wallbox.power`: startuje při baterii ≥ `car_start_soc` a slunci ≥ `car_min_sun`, zastaví při ≤ `car_stop_soc`, výkon = `wallbox.power_min`; km = kWh ze slunce ÷ spotřeba auta; spotřeba se počítá z nabití auta, `car.battery_capacity` (výchozí 37,9 kWh) a dojezdu: kapacita …“
- `cc252ab` 2026-10-30 · Grafy: posledni bod je zivá hodnota (Nabiti a vykon, Vykon dnes); testy Slunce s pevnym casem
- `e07a93a` 2026-10-30 · Vykon dnes: svisle vodici linky po 2 h s cislem hodiny
  - nahrazeno: „- **Dnes**: výkon teď a kam jde; graf **Výkon dnes** (výroba z pětiminutových průměrů, tečkovaná křivka „možné“, pásmo předpovědi od teď, posun prstu; vodicí linky osy y po 1 kW, nad 7 linek po 2 kW); dlaždice Dnes zatím (kolečko), Špička dnes, Výroba začala (východ slunce), Skončí asi (západ slunce); **Kam dnes slunce šlo**: slunce bez baterie a sítě (výroba − nabito − dodáno) se dělí mezi dům, auto a bojler podle jejich spotřeby, baterie a síť jsou skutečné součty. Je to odhad z denních čítačů.“
- `b8dd324` 2026-10-31 · Sankey: dlazdice se radi tak, aby se pasy kriziily co nejmene
  - nahrazeno: „- **Zdroje plní spotřebiče popořadě, aby se pásy nekřížily** (uživatel 29. 10.: „Můžeme nějak simplify ty toky energie? Aby se co nejméně toků křížilo? Toto bych viděl že slunce jde do dům a auto. Baterie jde do auto. Síť jde do auto. A to pak stejné se objeví i v Odkud auto nabíjí atd“). Zdroje: Slunce (bez nabíjení baterie a přetoku), Baterie (vybíjení), Síť (odběr); spotřebiče: Dům, Auto, Bojler. Nejdřív slunce pokryje Dům, zbytek Auto a Bojler, potom stejně baterie a nakonec síť; nabíjení baterie a přetok do sítě jsou jen ze zbytku slunce. Zdroje i spotřebiče jsou v diagramu ve stejném poř …“
- `79c1cf5` 2026-11-02 · Point agents to ha-dashboard-kit, drop old ideas and forecast docs
  - nahrazeno: „- **Kód nezahrnuje:** „Jak dlouho“ u zásobníku, detailní obrazovky Voda a Wallbox (odkazy v záhlaví karet), historii po klepnutí u ostatních dlaždic (`IDEAS.md` N1; baterie ji má), ovládání limitu nabití auta, zvýšený kontrast (`IDEAS.md` N2). Denní součty fungují jen s čítači podle `examples/denni_soucty.yaml`; čítače pro auto a bojler nejsou ověřené (TODO E14), bez nich ukazuje Dům a součty „––“. Čas posledního ohřevu bojleru se po vymazání dat prohlížeče ztratí (dlaždice Bojler se pak ukáže, dokud nezačne ohřev).“
  - nahrazeno: „- **Popup dlaždice** (uživatel 27. 10.): klepnutí na kteroukoli z osmi dlaždic otevře popover (HIG Popovers, na iPhonu bublina se šipkou u dlaždice, `#3A3A3C`, šířka 236 px; pod dlaždicí, u dolních dlaždic nad ní). Je to jediné místo, kde jsou denní součty; v kartě nejsou žádné stálé (uživatel: „Nepotřebuju to mít neustále a zabírá to místo. Stačí popisy.“). Obsah shora: název a okamžitý stav („nabíjí 0,8 kW“, „bez ohřevu“); u Baterie, Bojleru a připojeného Auta úroveň (Nabití 88 %, Teplota 52 °C, Nabití 62 %) velkým číslem a 8px gauge, u baterie na rezervě (nabití ≤ rezerva) poznámka „na reze …“
  - nahrazeno: „Návrh: Design artefakt „Energie – Výhled dne, km ze slunce, popisky“, boardy 5 až 8; rozhodnutí z komentářů uživatele (30. 10.) jsou v `FORECAST.md`, oddíly 8 a 8b. Kód: `src/sun.ts` (popup a detail, mixin `withSun`), `src/sun-data.ts` (čisté výpočty). Staví na dílech detailu baterie (záložky `ed-segmented`, karty `bat-card`, dlaždice `bat-kpi`, graf `renderChart` s posunem prstu, `fetchStatistics`, „––“ místo vymyšlených dat), aby se chovaly stejně.“
- `da09864` 2026-11-02 · Move shared visual language to ha-dashboard-kit
  - nahrazeno: „Rozhodnutí uživatele 27. 10. 2026: „Použij Apple guidelines. Všude, na všech kartách. Důležité, uprav spec. Ne Liquid Glass, ale“ [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines) (segmented controls, toggles, sliders atd.). Z HIG jsem přečetl stránky Segmented controls, Toggles, Sliders, Buttons, Lists and tables, Typography, Color, Dark Mode a Materials (stav 27. 10. 2026); čísla níže jsou buď z HIG (označeno „HIG“), nebo rozhodnutí návrhu (označeno „návrh“) či uživatele.“
  - nahrazeno: „**Princip.** Karta vypadá jako standardní iOS v tmavém i světlém režimu: ploché povrchy ze systémových barev, písmo SF Pro v obvyklých textových stylech, standardní ovladače. Žádný Liquid Glass: HIG (Materials) říká „Don’t use Liquid Glass in the content layer“ a používat ho „sparingly“; obsah karty je obsahová vrstva, takže bez rozmazání pozadí, bez lesku a odlesku, bez světelných okrajů. Dlaždice, karty a skupiny nemají stín; jezdce ovladačů mají bílou výplň a jemný stín. (HIG dovoluje u jezdce posuvníku a přepínače skleněný vzhled při dotyku; zatím se nepoužívá.) Karta stojí v `ha-card`, po …“
  - nahrazeno: „**Pravidlo pro kolečka a měřiče s číslem** (uživatel 30. 10.: „Číslo musí být uprostřed. To je základní pravidlo. A jednotka menší pod value.“): hodnota je vždy uprostřed kolečka vodorovně i svisle, jednotka je menší (a šedá) přímo pod číslem, ne vedle něj. Žádné slovo navíc v kolečku („hotovo“ apod.). Totéž platí pro karty Klima.“
  - nahrazeno: „**Povrchy (tmavý režim, HIG iOS grouped backgrounds).** Podklad stránky `#000000` (systemGroupedBackground); karta a skupina řádků `#1C1C1E` (secondarySystemGroupedBackground); prvek uvnitř skupiny, dlaždice diagramu, stopa ovladače a podklad měřiče `#2C2C2E` (tertiarySystemGroupedBackground); oddělovač `rgba(84,84,88,.65)`; bez okrajů kolem karet. Světlý režim: `#F2F2F7`, `#FFFFFF`, `#F2F2F7` (tertiary) a oddělovač `rgba(60,60,67,.29)`. Poloměr karty a skupiny 12 px, dlaždice diagramu 12 px, ovladače jsou kapsle (poloměr plný, rozhodnutí uživatele 27. 10.: „Chci tu kapsli. Všude. Na slideru i …“
  - nahrazeno: „**Text (HIG Color, Dark Mode).** Hlavní text `#FFFFFF` (světlý `#000000`), vedlejší `#98989F` (≈ secondaryLabel; světlý `rgba(60,60,67,.6)`), bez dat (ikona i „––“) `#8E8E93` (světlý `#6E6E73`). Kontrast textu aspoň 4,5 : 1, u malého textu snaha o 7 : 1 (HIG); měřeno: bílá na `#1C1C1E` 17 : 1, `#98989F` na `#1C1C1E` 5,9 : 1. Barva sama nenese význam (HIG Inclusive color): stav je vždy i slovem nebo ikonou, ne jen barvou.“
  - nahrazeno: „**Písmo (HIG Typography, iOS).** Systémové písmo (`-apple-system, "SF Pro", Inter, Roboto`), tabulkové číslice. Jen tyto styly: Title 1 28/34 (velká čísla), Title 2 22/28 (název karty), Body 17/22 (název řádku, popisek ovladače, text tlačítka), Subhead 15/20 (vedlejší text, hodnoty), Footnote 13/18 (popisky pod ovladači, osy a popisky v grafech; uživatel 25. 10.: popisky v grafech aspoň 13 px, malé jsou nečitelné), Caption 1 12/16 (jen názvy dlaždic a pomocné popisky; HIG minimum je 11 pt). Výjimka: hero čísla (nabití auta 52 px, teploty nádrží 32 px).“
  - nahrazeno: „**Barvy.** Akcent ovladačů je systemBlue `#0A84FF` (výplň posuvníku, zapnutý přepínač). Primární tlačítko má výplň `#0A6ED1` s bílým popiskem (kontrast 5,0 : 1; čistá modrá s bílým textem měla 3,7 : 1). Odchylka (upozornění) je systemOrange `#FF9230`, destruktivní akce systemRed `#FF4245` (v kartě zatím není). Barvy zdrojů a spotřebičů (uživatel 25. 10.: „potřebuju každou položku jinou barvu, aby to bylo možné rozeznat i v grafu níž“; barvy musí být od sebe zřetelně odlišené odstínem i světlostí): Slunce `#FFD60A`, Baterie `#30D158` (zelená podle Tesly a energy dashboardů Home Assistantu; růžo …“
  - nahrazeno: „**Přepínač (HIG Toggles).** Jen v řádku seznamu, bez vlastního popisku (řádek je popisek). Šířka 60 × výška 32 px, podlouhlý bílý jezdec 40 × 26 px (přání uživatele 27. 10.: „Chci podlouhlý … a ne ta kulička“); vypnuto: stopa `rgba(120,120,128,.36)`, jezdec vlevo; zapnuto: stopa akcent, jezdec vpravo. Stav je i textem ve druhém řádku („Vypnuto“, při zapnutí popis toho, co se děje, viz Popisky stavu ovládání), ne jen polohou a barvou. Dotyková plocha aspoň 44 px (neviditelné rozšíření). **Chráněný přepínač: podržení nebo dvojklepnutí** (uživatel 28. 10.: „Mísení vody nemůže být na single click. …“
  - nahrazeno: „**Segmentový ovladač (HIG Segmented controls).** Dvě až pět položek stejné šířky, popisky podstatná jména, text, ne text s ikonou. Používá se jen pro volbu režimu nebo pohledu (Přetoky | Boost u auta, Auto | Manual | Off, Dnes | 7 dní), ne pro akci; tak jsou řešeny režim wallboxu a režim zásobníku; Boost bojleru a Mísení vody jsou přepínače (viz Teplá voda). U dvojic, kde je zapnutí opatrná volba (Přetoky | Boost u auta), je vlevo vždy klidný stav a vpravo aktivní; u přepínačů je vypnuto vlevo, zapnuto vpravo (uživatel 27. 10.: „Potřebuji mít konzistentní, že vlevo je vypnuté mísení a vpravo z …“
  - nahrazeno: „**Posuvník (HIG Sliders).** Jeden styl všude; nesmí být citlivý (uživatel). Minimum vlevo, maximum vpravo; zvolená hodnota velkým číslem nad ovladačem a krajní hodnoty pod ním. Vzhled: kapsle výšky 52 px se stopou `#2C2C2E`, v ní tenká lišta 6 px vyplněná akcentem po jezdec, podlouhlý bílý jezdec 38 × 24 px (podle uživatelova snímku z iOS 27); dílky po krocích pod lištou, aby se kroky 5 °C a 5 % daly najít (HIG zmiňuje dílky u macOS, v iOS jsou jen koncové body; ponecháno z designových důvodů). Kroky: 5 °C, 5 %, výkon nabíjení po 0,3 kW (TODO E12). Neexistuje „text + stepper“ varianta (HIG ji  …“
  - nahrazeno: „**Tlačítka (HIG Buttons).** Dotyková plocha aspoň 44 × 44 px; popisek sloveso (Hotovo, Přepnout, Zrušit). Role: normální = výplň `rgba(118,118,128,.24)`, bílý popisek 17 px; primární = výplň `#0A6ED1`, bílý popisek polotučný; zrušit = jako normální; destruktivní = červená a nikdy primární. Nejvýše jedno nebo dvě prominentní tlačítka na pohled. Tlačítko má stav stisknuto (tmavší výplň). Tlačítko, které se chová jako přepínač (chip v simulaci), je zapnuté výplní `#0A6ED1`, vypnuté šedě.“
  - nahrazeno: „**Seznam (HIG Lists and tables, inset grouped).** Skupina řádků na `#1C1C1E` s poloměrem 12 px, mezi řádky oddělovač; řádek: ikona 24 px v podkladu 40 × 40 px, název Body 17, pod ním vedlejší text 13–15, vpravo ovladač, hodnota nebo chevron „›“ (chevron = přechod do detailu, ne tlačítko „info“); text řádků stručný; řádky aspoň 44 px (v kartě 60–64 px kvůli dvěma řádkům textu). Řádky všech karet mají stejnou mřížku (ikona | název, pod ním stav | doplněk vpravo). Popisek skupiny nad ní: Footnote 13, vedlejší barva.“
  - nahrazeno: „**Režim Přetoky | Boost** je v kartě vždy vidět (auto pod měřičem, bojler pod schématem), bez řádku „Boost“ a bez chevronu (uživatel 27. 10.: „Chci ten rozklik rovnou. Ne na single click, ale buď slide, nebo doubleclick / dlouhý stisk. Nechci omylem kliknout. Ale nemůže tam být boost a po rozkliku Přetoky.“). Přepíná se chráněně jako ostatní chráněné ovladače (podržením nebo dvojklepnutím, viz Přepínač) a navíc **přetažením jezdce** na druhou položku (vzor iOS „posunutím potvrdit“, např. Slide to power off; HIG stránku Gestures jsem nečetl, přetažení je moje, TODO E17). Jedno klepnutí nic nepř …“
  - nahrazeno: „- Způsob potvrzení: chráněné ovladače viz Přepínač a Režim Přetoky | Boost, ostatní volby jedním klepnutím bez potvrzení. Rozhodnutí uživatele 28. 10.: potvrzují se 2× jen přepínače, které fyzicky něco dělají (žaluzie, mísení vody, zapnutí boostů); nastavení se nepotvrzuje a Zásobník (plyn) také ne („to není elektřina“). Volba se v kartě ukáže hned a vrátí se ke skutečnému stavu, když ho Home Assistant do `ui.revert_after` (6 s) nepotvrdí.“
  - nahrazeno: „- Tmavý a světlý režim: karta kreslí vlastní povrchy z oddílu Vzhled podle Apple HIG a přepíná se podle Home Assistantu (`hass.themes.darkMode`); klíč `theme` v konfiguraci není (starý klíč v YAML se toleruje jako neznámý klíč horní úrovně).“

## Příloha: dřívější soubory (původní znění k 2. 11. 2026, nepotvrzené body jsou **nepotvrzeno, otázka položena 2. 11. 2026**)

### Dřívější `TODO.md` (E1–E22)

#### TODO – Energie Dashboard

Jen to, co je rozpracované a čeká na vaši odpověď nebo na ověření v živém Home Assistantu a na iPhonu 14 Pro (Apple Human Interface Guidelines). **Nejsou součástí zadání**: platí `CURRENT_SPEC.md`. Kde se v kitu dá sdílet kód, je to v `TODO.md` kitu (K1–K3).

Pravidla:
- Čísla E1–E21 jsou trvalá (odkazuje se na ně ze `CURRENT_SPEC.md`, `ENTITY_MAP.md` a `AUDIT.md`). Vyřízený bod se odsud smaže (platné chování je ve specifikaci) a jeho číslo se nepoužije znovu; nový bod dostane další volné číslo.
- Do TODO patří jen jasná otázka nebo jasný úkol. Co jste potvrdil, je ve specifikaci.
- Druh: **Rozhodnutí** (čeká na vás), **Ověření** (v živém Home Assistantu nebo na zařízení).

Konsolidace 29. 10.: E10 (historie po klepnutí na dlaždici) a E18 (zvýšený kontrast, skleněný jezdec) byly nápady, ne rozpracované body; čísla E10 a E18 se nepoužijí znovu. `IDEAS.md` byl 2. 11. 2026 smazán, obsah zůstává v historii gitu.

Konsolidace 28. 10.: čísla přepsána od E1. Smazáno: popisné body bez otázky (co kód zatím nezahrnuje je ve `CURRENT_SPEC.md`, Stav implementace), budoucí řízení AZ Routeru (je ve specifikaci, Mimo rozsah, entity v `ENTITY_MAP.md`), nepotvrzené vlastní nápady (pomocný senzor pro čas posledního ohřevu bojleru) a statistiky testů (jsou v README). Starší znění je v historii gitu.

##### Přehled

| Č. | Druh | Bod |
|---|---|---|
| [E1](#e1) | Rozhodnutí | Kdy jsou data zastaralá |
| [E2](#e2) | Rozhodnutí | „Dům“: odečet wallboxu a bojleru z jednoho zdroje |
| [E3](#e3) | Rozhodnutí | Mísení vody: neplatná kombinace ventilů |
| [E4](#e4) | Ověření | Bojler ve spotřebě domu |
| [E5](#e5) | Rozhodnutí | Telefon na šířku: jeden, nebo dva sloupce |
| [E6](#e6) | Rozhodnutí | Odkaz na nástěnku Baterie |
| [E7](#e7) | Ověření | Hodnoty stavu wallboxu mimo tři známé |
| [E8](#e8) | Rozhodnutí | Barva nabití auta |
| [E9](#e9) | Rozhodnutí | Starý commit s polohou na GitHubu |
| [E11](#e11) | Rozhodnutí | Nabíjení auta podle zdrojů: dopočet, průměr a hystereze |
| [E12](#e12) | Rozhodnutí | Krok výkonu nabíjení wallboxu |
| [E13](#e13) | Rozhodnutí | Sytost ohřevu v historii bojleru |
| [E14](#e14) | Ověření | Denní součty: čítače pro auto a bojler |
| [E15](#e15) | Rozhodnutí | Licence repozitáře |
| [E16](#e16) | Rozhodnutí | Modrá Síť × modrý akcent ovladačů |
| [E17](#e17) | Rozhodnutí | Prototyp: co jsem rozhodl sám |
| [E19](#e19) | Ověření | Přednost před bojlerem: spínač neodpovídá AZ Routeru |
| [E20](#e20) | Rozhodnutí | Detail baterie: prahy rozbalancování a odhad času |
| [E21](#e21) | Ověření | Detail baterie: znaménko proudu, hodnoty režimu, statistiky, vzhled na zařízení |
| [E22](#e22) | Ověření | Detail slunce: entity předpovědi, statistiky, konec výroby, simulace večera |

##### E1 Kdy jsou data zastaralá · Rozhodnutí

Zapnutý boost se hlásí jako stav (rozhodnuto 28. 10.). Zbývá práh zastaralosti; karta zatím zastaralé hodnoty nijak neoznačuje.
Doporučení podle exportu 24. 10. (`ENTITY_MAP.md`, Jak často entity hlásí): střídač a AZ Router hlásí každých několik sekund, hodnota bez hlášení déle než 5 min je zastaralá; zásobník hlásí řídce (11 min), zastaralý po 60 min; ventily hlásí jen při změně, takže se u nich stáří nepoužije (jen dostupnost); u auta se stáří bere z času poslední zprávy z auta (`sensor.garaz_bmw_i3_2`), šedě od 1 h. Zastaralá hodnota je neutrální (nikdy oranžová ani červená). Pravidlo zastaralých dat nesmí pro ventily a auto stát na `last_reported` (`AUDIT.md` bod 6).

##### E2 „Dům“: odečet wallboxu a bojleru z jednoho zdroje · Rozhodnutí

Dům = spotřeba domu bez wallboxu a bojleru, ale všechny tři hodnoty mají být ze stejného zdroje (nemíchat GoodWe a AZ Router, každý měří v jiný čas a obnovuje jinak; rozhodnuto 28. 10.). Karta teď počítá `house.power` (GoodWe, včetně auta a bojleru) − `wallbox.power` − `boiler.power` (AZ Router), tedy právě to míchání.
Otázka: má GoodWe vlastní měření výkonu wallboxu a bojleru (pak je dám do konfigurace a odečítat se bude jen v GoodWe), nebo se má Dům počítat jen z hodnot, které se obnovily ve stejném okně (např. do 10 s od sebe, jinak se drží poslední shodná hodnota)? Do rozhodnutí zůstává dnešní výpočet se spodní mezí 0.

##### E3 Mísení vody: neplatná kombinace ventilů · Rozhodnutí

Dnes je kombinace oba zapnuté / oba vypnuté neutrální „nejasný stav ventilů“ a přepínač jde použít. Doporučení: oranžově „Ventily: oba zapnuté“ / „oba vypnuté“ (skutečná odchylka, ne chybějící údaj); nedostupný ventil „––“ neutrálně.

##### E4 Bojler ve spotřebě domu · Ověření

Když bojler topí (`sensor.tuv_power_total` > 0), roste o totéž `sensor.goodwe_house_consumption`? Z odečtu screenshotu 25. 10. ano (dům 10,7 kW = auto 1,4 + bojler 4,0 + ostatní 5,3 kW), přímé ověření chybí. Souvisí s [E2](#e2).

##### E5 Telefon na šířku: jeden, nebo dva sloupce · Rozhodnutí

Karta má jeden sloupec na každé šířce; na 852 × 393 jsou karty široké a vysoké. Návrh: na šířku dva sloupce (toky vlevo, systémy vpravo), podle šířky karty jako v kartě Klima (od 620 px).

##### E6 Odkaz na nástěnku Baterie · Rozhodnutí

Dnešní dashboard: podržení uzlu Baterie otevře `/dashboard-baterie`. Odkaz na BMW už je hotový (`car.link`). Stejné chráněné gesto na dlaždici Baterie by kolidovalo s klepnutím, které otevírá popup; návrh: šipka „›“ v popupu Baterie s odkazem (nový klíč `battery.link`).

##### E7 Hodnoty stavu wallboxu mimo tři známé · Ověření

Známé jsou `Disconnected`, `Waiting`, `Charging` (měřeno 15. 10.). Senzor není výčtový (nemá `options`), další hodnoty z exportu 24. 10. nezjistíme; ověřit v kódu integrace AZ Router, nebo pozorováním. Karta jinou hodnotu ukáže, jak je. Návrh: neznámou hodnotu ukázat neutrálně a bez barvy.

##### E8 Barva nabití auta · Rozhodnutí

Dnešní dashboard: zelená od 50 %, oranžová od 20 %, jinak červená (ikona i pruh). Podle pravidla „barva jen při odchylce“ návrh: normálně neutrálně, oranžově pod 20 %, bez zelené (`AUDIT.md` bod 5).

##### E9 Starý commit s polohou na GitHubu · Rozhodnutí

První export (commit `092a870`) obsahoval polohu auta (tedy polohu domu), sériové číslo střídače a MAC adresu AZ Routeru; repozitář je veřejný. Historie `main` je sloučená do jednoho commitu bez těchto údajů a šablona exportu je napříště skrývá. GitHub ale podle své dokumentace starý commit ještě zobrazí tomu, kdo zná jeho SHA (cached views), dokud ho nesmaže podpora GitHubu. Návrh: požádat podporu GitHubu o odstranění cached views (formulář podpory, název repozitáře a commit `092a870`); poloha se na rozdíl od hesla změnit nedá.

##### E11 Nabíjení auta podle zdrojů: dopočet, průměr a hystereze · Rozhodnutí

Home Assistant rozdělení nabíjení na slunce, baterii a síť neměří (wallbox hlásí jen svůj výkon); karta ho dopočítá z toků domu v daném okamžiku. V létě se zdroje mění i několikrát za minutu (pár sekund ze sítě).
Návrh: (1) v detailu auta sloupce po zdrojích s poznámkou „odhad“; (2) podíl zdrojů z energie za posledních 5 minut; (3) zdroj se objeví v textu stavu od 15 % a zmizí pod 5 % („Nabíjí ze slunce“, „… ze slunce a baterie“, „… ze slunce, baterie a sítě“); (4) přesný podíl ukazuje pruh „Odkud auto nabíjí · průměr 5 min“ jen během nabíjení. Kód dnes ukazuje okamžité podíly, text od 15 %. Hodnoty 5 min, 15 % a 5 % jsou moje.

##### E12 Krok výkonu nabíjení wallboxu · Rozhodnutí

AZ Router nastavuje 100 W na fázi, tedy 0,3 kW celkem; 0,5 kW přesně nejde. Dnes: 4,2–11,1 kW po 0,3 kW (24 poloh, trefí oba konce rozsahu; `wallbox.power_step` 300). Alternativa: 0,6 kW odshora (11,1 · 10,5 · … · 4,5 kW). Potvrdit.

##### E13 Sytost ohřevu v historii bojleru · Rozhodnutí

Výplň ohřevu pod křivkou teploty bude mít tři stupně sytosti (24 / 44 / 68 % jako vlny topení v Klima). Návrh hranic: třetiny největšího výkonu bojleru, tj. do 0,9 kW slabý, do 1,8 kW střední, nad 1,8 kW silný. Největší výkon není ověřený: `number.tuv_1_max_power` je 1325 W a bojler je na 3 fázích (`switch.tuv_1_1_connected_l1` až `_l3`), takže maximum je buď 1,3 kW, nebo asi 4 kW – podle toho, zda je nastavení na fázi. Historie bojleru není implementovaná.

##### E14 Denní součty: čítače pro auto a bojler · Ověření

Popup dlaždic potřebuje energii za den pro Slunce, Baterii (vybito, nabito), Síť (odebráno, dodáno), Auto, Bojler a Dům. První čtyři mají ověřené čítače střídače (`ENTITY_MAP.md`; denní součet = rozdíl čítače od půlnoci přes `utility_meter`, `examples/denni_soucty.yaml`). Pro auto (wallbox) a bojler (AZ Router) čítač energie v `ENTITY_MAP.md` není. Možnosti: čítač, pokud ho zařízení nabízí; jinak integrál výkonu (helper Riemann sum) s drobnou chybou. Dům = zbytek, takže se chyba měření v něm sečte. Do vyřešení ukazují součty „––“. Ověřit v živém Home Assistantu.

##### E15 Licence repozitáře · Rozhodnutí

Repozitář Klima má licenci MIT; sem jsem ji bez vašeho souhlasu nepřevzal.

##### E16 Modrá Síť × modrý akcent ovladačů · Rozhodnutí

HIG (Color): „Avoid using the same color to mean different things.“ Síť je `#3D8BFF`, akcent posuvníků a přepínačů `#0A84FF`. Buď Síť jiným odstínem (např. systemIndigo `#6D7CFF`), nebo akcent ovladačů neutrální. Zatím ponecháno, protože modrou Síť jste schválil dříve.

##### E17 Prototyp: co jsem rozhodl sám · Rozhodnutí

Potvrdit, nebo změnit:
1. **Bojler jen při ohřevu:** výchozí `boiler.show` je `heating` (dlaždice Bojler jen při ohřevu a 15 min po něm); má být výchozí `always`?
2. **Auto jen když je připojené:** skrývá se dlaždice Auto v diagramu a řádek Wallbox. Má se při odpojeném autu skrýt i celá karta BMW i3 (zatím zůstává a ukazuje stav a nabití)?
3. **Úroveň jako výplň dlaždice** (baterie, auto, bojler) je bez čísla „%“ a „°C“, přesná hodnota je v popupu. Stačí to?
4. **Přetoky | Boost u auta:** kromě podržení a dvojklepnutí (vaše přání) se přepíná i přetažením jezdce; to je moje. Nechat, nebo jen podržení a dvojklepnutí?
5. **Popisky pod přepínači** Zablokovat nabíjení a Přednost před bojlerem popisují důsledek („Auto nenabíjí, přebytek ohřívá vodu“, „Auto nabíjí dřív než bojler“); znění je moje, ověřit, že sedí na skutečné chování wallboxu a AZ Routeru.
6. **Vzhled teplé vody:** jemný rámeček dlaždic Sankey (1 px, `rgba(255,255,255,.14)`), rozměry oblouku (124 × 112 px, silnice 9 px) a skupina Upozornění nahoře.
7. **Entity k ověření v živém Home Assistantu:** `wallbox.charging_power` (v příkladu `number.wallbox_7_1_manual_charging_power`); ID obrázku auta obsahuje VIN, v příkladu je zástupné `image.bmw_i3_vin_image`.

##### E19 Přednost před bojlerem: spínač neodpovídá AZ Routeru · Ověření

Uživatel 29. 10.: „switch.wallbox_2_prioritize_when_connected neodpovídá tomu co je zobrazeno v AZ routeru.“ Karta jen čte a přepíná tuto entitu (`wallbox.prioritize_connected`), takže chyba je v mapování nebo v integraci, ne v kartě. Ověřit v živém Home Assistantu: (1) zda neexistuje i `switch.wallbox_1_prioritize_when_connected` nebo jiná podobná entita a která patří kterému wallboxu v routeru; (2) zda se stav entity mění, když se volba přepne v routeru (a naopak), a za jak dlouho; (3) zda není stav obrácený. Podle výsledku změnit entitu v `examples/energie.yaml` a v `ENTITY_MAP.md`, případně popsat zpoždění. Do vyřešení platí údaj v `ENTITY_MAP.md` jako neověřený.

##### E20 Detail baterie: prahy rozbalancování a odhad času · Rozhodnutí

Moje návrhy, které uživatel nepotvrdil: slova u rozbalancování článků (Výborné do 15 mV, Dobré do 30 mV, Pozor do 100 mV, nad tím Chyba; klíče `battery.imbalance_*`) a odhad času do plné/prázdné baterie (z okamžitého výkonu, po 5 minutách, jen pod 48 h, jen při toku nad prahem). Potvrdit, nebo změnit podle praxe s GoodWe.

##### E21 Detail baterie: znaménko proudu, hodnoty režimu, statistiky, vzhled na zařízení · Ověření

(1) Znaménko `battery_current` a hodnoty `battery_mode`/`battery_error` nejsou v exportu potvrzené (`ENTITY_MAP.md`, „k ověření“); karta ukazuje velikost proudu a směr podle výkonu. (2) Historie vyžaduje `state_class` u entit a statistiky po 5 minutách se v Home Assistantu ve výchozím nastavení drží asi 10 dní, hodinové bez omezení; 7denní a 30denní grafy zdraví proto používají hodinové. Ověřit u skutečné instalace. (3) Grafy a posouvání prstem v iPhonu (aplikace Home Assistant) nebyly ověřeny na zařízení, jen v Chromiu s testovacími daty.

##### E22 Detail slunce: entity předpovědi, statistiky, konec výroby, simulace večera · Ověření

(1) Doplnit do `forecast.*` entity integrace předpovědi (Open-Meteo Solar Forecast, Forecast.Solar nebo Solcast) a `forecast.weather`; názvy a jednotky ověřit v Nástroje pro vývojáře → Stavy. Bez nich karta odhaduje den z tempa a nekreslí dalších pět dní. (2) `sensor.goodwe_total_pv_generation` (`pv.total_generation`) musí mít dlouhodobé statistiky (`state_class: total_increasing`), jinak se historie čte z `pv.power`. (3) „Skončí asi“ a „Začala“ čtou pětiminutové statistiky `pv.power` (drží se asi 10 dní). (4) „Dnes do večera“ používá medián spotřeby domu, ve které je wallbox; zkontrolovat proti skutečnému večeru a upravit `forecast.car_*`. Km ze slunce se počítají z nabití, `car.capacity` a dojezdu auta (BMW i3 120 Ah: asi 0,19 kWh/km).

### Dřívější `AUDIT.md`

#### AUDIT

Otevřené rozpory a zjištění mezi zdroji: zadání projektu (stav k 17. 10. 2026), YAML a screenshot dnešního dashboardu „Energie dům“ (24. 10.), export entit `HA entities/energie.json` (24. 10., 22:53), Memory (14.–19. 10.) a zdrojový kód Home Assistant 2026.10.1 a knihovny goodwe 0.4.10. Nic z toho není domyšlené; doporučení jsou označená. Rozhodnutí se zapíší do `CURRENT_SPEC.md` a `ENTITY_MAP.md`; vyřešené body se odsud mažou.

##### Rozpory

| # | Rozpor | Doporučení | Stav |
|---|---|---|---|
| 1 | **Spotřeba domu není součet toků.** Knihovna goodwe 0.4.10 (`goodwe/et.py`) počítá `house_consumption` = PV + výkon baterie − `active_power` (registr 35140), ne z elektroměru (`meter_active_power_total`, registr 36025), který dnešní dashboard ukazuje jako Síť. Screenshot 24. 10.: Síť 148 W odběr + Baterie 351 W = 499 W, Dům 459 W. Export 22:53: 0 + 274 − (−119) = 393 W přesně podle vzorce; elektroměr −103 W (součet s baterií 377 W), AZ Router −130 W. | Karta nebude dopočítávat žádný uzel z ostatních ani tvrdit, že toky „sedí“. Zda „Dům“ ukázat jako celkový odběr, nebo bez wallboxu a bojleru, je TODO E2. | potvrzeno exportem |
| 2 | **Ventily přepíná i něco jiného než dashboard.** Memory (Oct 2026): automatizace v aplikaci Tuya „Vypnout FVE cirkulaci“ denně v 17:58 spouští scénu „Malý okruh“; skript na Synology spouští „Velký okruh“ / „Malý okruh“ podle teploty bojleru (10:00–17:30). Zadání to nezmiňuje. | Karta ukáže skutečný stav ventilů, ne svůj poslední příkaz. Ověřit, zda obojí ještě běží a zda „Malý okruh“ = C1 zapnutý, C2 vypnutý (TODO E3). | k ověření |
| 3 | **Mísení: obsah skriptu.** Zadání: přepínají se oba ventily současně. Dnešní dashboard volá `script.prepnout_miseni_vody` (export: režim `single`), jehož obsah není znám. | Ověřit skript (pošlete jeho YAML); karta bude buď volat skript, nebo přepínat ventily sama – TODO E3. | k ověření |
| 4 | **Dnešní dashboard proti pravidlu „chybějící data nejsou poplach“.** Mísení vody: každá jiná kombinace než dvě platné, tedy i nedostupný ventil, je „Nejasný stav“ červeně. | V kartě: nedostupný ventil „––“ neutrálně; oba zapnuté / oba vypnuté je skutečná odchylka – TODO E3. | otevřeno |
| 5 | **Dnešní dashboard proti pravidlu „barva jen při odchylce“.** Nabití auta je zelené od 50 %, oranžové od 20 %, červené pod 20 % (ikona i pruh). | Normální stav bez zelené; barvu jen při odchylce – TODO E8. | otevřeno |
| 6 | **Stáří hlášení není stáří dat.** Export: ventily a skript hlásily naposledy při startu Home Assistantu (před 9,5 h), auto před 2,7 h; střídač a AZ Router před pár sekundami. | Pravidlo zastaralých dat nesmí pro ventily a auto stát na `last_reported` – TODO E1. | zjištění |
| 7 | **Export spotřebičů 2. 11. (`HA entities/spotrebice.json`): chybí helpery a názvy jsou zdvojené.** (a) ~~Helpery chyběly~~ vyřízeno: `HA entities/spotrebice_helpery.json` (2. 11.) je potvrzuje; zůstává nepoznaná logika automatizací („začátek / konec cyklu“) a 6min rozdíl mezi spuštěním konce a vypnutím helperu u pračky. (b) Zobrazované názvy sušičky mají zdvojené slovo („Sušička Sušička power“, „… energy“, „… overcurrent“), ID jsou v pořádku. (c) `last_changed` ochran: sušička 2. 11. 08:23 UTC, pračka 1. 11. 11:11, myčka 1. 11. 13:13. Sušička ale používala helpery už 1. 11. 18:13, takže 08:23 je znovuvytvoření entit, ne první vznik; délka historie výkonu zůstává nedoložená. (d) Vysavač přízemí je od 31. 10. 13:36 UTC `unavailable`. | (a) poslat YAML šesti automatizací cyklů (TODO E23); (b) přejmenovat zařízení / entity v Home Assistantu, karta názvy ze stavů bere tak, jak jsou; (c) ověřit, odkud je historie; (d) ověřit vysavač (netýká se spotřeby). | zjištění |
| 8 | **`HA entities/energie.json` je export z 30. 10. 2026 (poslední `last_reported` 14:30 UTC), ne z 24. 10. 22:53, jak tvrdí `ENTITY_MAP.md` a `HA entities/README.md`.** Všech 355 záznamů s `last_reported` je z 30. 10. (358 entit). Dopady: (a) hodnoty „E“ v `ENTITY_MAP.md` (např. dům 393 W) jsou z jiného snímku než soubor (1557 W); (b) `sensor.wallbox_total_power` a `sensor.tuv_power_total` mají v souboru `state_class: measurement` (`ENTITY_MAP.md`: „bez `state_class`“); (c) existují `sensor.goodwe_today_load` a `sensor.goodwe_total_load` (kWh, `total_increasing`), které `ENTITY_MAP.md` nezná. | Opravit datum v `ENTITY_MAP.md` a README, případně export zopakovat; (b) ověřit, od kdy mají statistiky; (c) posoudit jako změřený čítač spotřeby domu (TODO E14), nejdřív zmapovat. | zjištění (agent energie-expert) |

##### Doporučení pro údržbu

- `ENTITY_MAP.md` měnit jen z nového exportu (`HA entities/`); export obnovit po každém přejmenování entit nebo zařízení.
- Repozitář je veřejný: do exportů a dokumentů nepatří poloha, sériová čísla ani MAC adresy. Šablona exportu je skrývá; před commitem nového exportu to zkontrolovat.
- Pravidla nekopírovat do README ani komentářů v kódu; odkazovat na `CURRENT_SPEC.md`.
- Tvrzení o Home Assistantu a integracích dokládat zdrojem na release tagu; u AZ Routeru a BavarianData (HACS) kódem integrace v použité verzi.

### Dřívější `MEMORY_SUMMARIZED.md`

#### Project Memory – Home Assistant Energie Dashboard

- Účel: mobilní (iPhone 14 Pro) přehled energie domu – kam teď teče energie a co potřebuje pozornost; jedna vlastní karta `custom:ha-energie-dashboard` přes HACS z GitHubu (`michal-madle/ha-energie-dashboard`), nahrazuje dashboard „Energie dům“ (`/energie-dum`). Vzor: projekt Klima (`michal-madle/ha-klima-dashboard`).
- Systémy: FVE, baterie a elektroměr (střídač GoodWe), Wallbox a Bojler (FVE) (AZ Router), Zásobník (Plyn) (Tado), Mísení vody (ventily Nous L3), Auto (BMW i3, jen čtení).
- Zdroj pravdy: `CURRENT_SPEC.md`.
- Entity: `ENTITY_MAP.md` (potvrzené jen exportem ve složce `HA entities/`); chybějící entity, jednotky a znaménka se neodhadují. Otevřené rozpory mezi zdroji: `AUDIT.md`.
- Otevřené body: `TODO.md`. Dnešní dashboard (v0, výchozí rozsah) je popsaný v `CURRENT_SPEC.md`. Historie se nevede: neplatné se maže.
- Pravidlo: `CURRENT_SPEC.md` má vždy přednost před čímkoli jiným (staré poznámky, kód, příklady).
- Jazyky: čeština, angličtina, švédština podle profilu Home Assistantu (`language: auto`); každá změna textu upraví všechny tři slovníky v `src/translations/` (oddíl Jazyky ve specifikaci).

### Dřívější `TYDEN.md`

#### Týdenní ladění (předpověď a algoritmus)

Smyčka, na které se dohodneme 29. 10.: jednou týdně napíšu, co z dat nechápu nebo co se liší od předpovědi, vy odpovíte několika větami a podle toho upravím předpověď výroby a pravidla. Čím dál míň otázek, protože se karta učí z dat sama.

Automaticky: každou neděli v 19:40 (pražského času) běží plánovaný úkol, který si export přečte z vašeho počítače (musí být zapnutý a s aplikací Claude) a napíše otázky; export ale pořád spouštíte vy (token). Připomínka v kalendáři: neděle 19:30.

##### Postup (asi 10 minut vašeho času)

1. Spustíte export (`python tools\export_hodiny.py --url http://… --token … --days 14`). Wallbox a bojler se doplní z historie stavů, dokud nemají statistiky (`examples/statistiky_wallbox_bojler.yaml`).
2. Já načtu `tools/energie_hodiny.csv`, porovnám týden s předpovědí a s pravidly níže a napíšu sem otázky (jen to, co z dat nejde zjistit).
3. Odpovíte (i jednou větou), já upravím parametry, tento soubor a návrh karty.

##### Co už o vašem provozu platí (z vašich vět, 29. 10.)

- **Jízdní dny:** pondělí, úterý, pátek; auto se vrací odpoledne, takže přes den se nedobíjí. **Cíl: v neděli večer v autě aspoň 75 %.**
- **Dva způsoby nabíjení:**
  1. *Ze slunce s baterií jako zásobníkem* (v dobrém dni, kolem poledne): start při baterii kolem 50 % a slunci kolem 2 kW, stop kolem 30 %. V říjnu stačí hodina až dvě a baterie doma na to potřebuje jen pár kWh.
  2. *Rychle, když je baterie na rezervě a slunce nebude:* výkon libovolně vysoký, protože není z čeho šetřit. Vysoký výkon má menší ztráty při nabíjení a baterie doma se rychleji začne dobíjet ze slunce.
- **Výsledek, kterému data odpovídají:** 25. 10. (neděle, výroba jen 4,3 kWh) nabito asi 22 kWh ze sítě na 88 % v autě; 19. a 20. 10. a 26. 10. ráno nabíjení při rezervě z 6 až 8 kW.

Důsledek pro kartu: místo okamžitého prahu „kolik dá slunce“ se počítá **plán do cíle**: kolik kWh auto potřebuje do neděle (75 %), kolik jich zítra dá slunce podle předpovědi, a když to nevychází, karta navrhne rychlé nabití ze sítě v nejlepší hodinu (nízký tarif, pokud ho máte), ne „nenabíjej“.

##### Odpovědi z 29. 10. (21:14) a co z nich plyne

- **18. 10. byl zátěžový test baterie:** celou sobotu schválně na 100 % a v noci plynulé vybíjení bez vlivu okolí. Ten den (17. až 19. 10.) se **nepočítá do učení** výroby, normy ani pravidel; v exportu je označen jako `test`.
- **Noční odběr 1,3 až 1,4 kW** je pračka, sušička nebo myčka. Běžné velké spotřebiče jsou auto, pračka, sušička, myčka, trouba.
- **Bojler z baterie nikdy nejede.** Teplá voda je primárně ze zásobníku na plyn. Karta proto bojler z baterie nikdy nenavrhuje a upozornění „baterie krmí bojler“ je skutečný problém, na rozdíl od auta.
- **Nízký tarif (HDO)** se mění každý den a spíná ho distributor: 20 h denně 3,21587 Kč/kWh, 4 h denně 3,87691 Kč/kWh. Rozdíl je 0,66 Kč/kWh (asi 17 %), pro 10 kWh do auta 6,6 Kč. **Čas nabíjení se tedy podle tarifu neladí**, rozhoduje cíl a slunce. Plán z API distributora zatím není potřeba.
- **Jak nabíjíte:** vždy pustíte jen wallbox. V létě z přebytku při nabité baterii. Když baterie doma nabitá není a auto je potřeba, **boost 4 kW**; víc výkonu jen když potřebujete jet a auto má málo. Rychlé nabíjení 6 až 10,5 kW je tedy výjimka pro naléhavý případ, ne běžné pravidlo.

- **Ověření z nového exportu (wallbox a bojler ze stavů, 15. až 29. 10.):** skutečný výkon wallboxu sedí s mým odhadem z domu (25. 10. 23,3 kWh skutečně proti odhadnutým 21,7; základ domu při nabíjení medián 0,54 kW). Bojler jede hlavně z přebytku (nejvíc 27. 10., 4,3 kWh). Drobné odběry 0,12 až 0,27 kW kolem 18:00 při vybíjení baterie jsou **šum, ne chyba**: bojler je podle uživatele (29. 10., 21:20) hlavní tlumič výkyvů, AZ Router do něj přesměruje energii na sekundy při přepnutí baterie z nabíjení na vybíjení a obráceně (a vždy, když jde o víc než jednotky W). Karta ani pravidla to nehlásí jako problém a `switch.tuv_3_3_block_heating_from_battery` se **nemá zapínat**. Bojler jako tlumič se do popisků nezapočítává.

28. 10. odběr ze sítě 9,8 kWh při baterii na rezervě: vysvětleno (dlouho jela pračka se sušičkou a 2 h se vařil oběd, tedy všechno dohromady). Žádná otevřená otázka z prvního týdne.

##### Odpovědi z 30. 10.

- **Omezení vývozu střídačem (5 kW) nastává jen v létě**, když je vše nabité a nahřáté a odpoledne svítí přes 5,5 kW. Jindy ne. **V kartě se nekomentuje** a v návrzích se nemá objevit „nevyužité slunce“. Za přetoky skoro nic nemáte, takže to netrápí. (Moje dřívější domněnka o ořezu 26. a 27. 10. byla chybná.)
- **Texty a hinty do panelů nepatří**, vysvětlivky jen za ⓘ po klepnutí.

##### Jak se měří, že to funguje

- Chyba předpovědi výroby na den (cíl pod 15 %, po týdnu učení).
- Kolik kWh do auta bylo ze slunce, z baterie a ze sítě a jestli byl cíl 75 % splněn.
- Kolikrát pravidlo spustilo nabíjení, které jste zrušil (znamená špatný práh).
