# TODO – otevřené body

Jen otevřené návrhy, chyby a rozhodnutí (iOS, iPhone 14 Pro, Apple Human Interface Guidelines). **Nejsou součástí zadání**: platí `CURRENT_SPEC.md`.

Pravidla:
- Každý bod má trvalé číslo (P1.2, P2.3 …), na které se dá odkazovat. Čísla se nemění; hotové body se odsud mažou (platné chování je v `CURRENT_SPEC.md`) a jejich čísla se znovu nepoužívají. Nový bod dostane další volné číslo ve své prioritě.
- Priorita: **P1** chyby a rozhodnutí, která blokují další práci; **P2** zlepší denní používání; **P3** doladění; **P4** vzhled podle Apple HIG.
- Druh: **Chyba** (nalezeno testem), **Rozhodnutí** (čeká na uživatele), **Návrh** (UX zlepšení), **Ověření** (export, test na skutečném zařízení).

## Přehled

| Č. | Druh | Bod |
|---|---|---|
| [P1.5](#p1-5) | Rozhodnutí | Kdy jsou data zastaralá |
| [P1.8](#p1-8) | Rozhodnutí | „Dům“: odečet wallboxu a bojleru z jednoho zdroje |
| [P1.9](#p1-9) | Rozhodnutí | Mísení vody: neplatná kombinace |
| [P1.11](#p1-11) | Ověření | Bojler ve spotřebě domu |
| [P2.1](#p2-1) | Rozhodnutí | Telefon na šířku: jeden, nebo dva sloupce |
| [P2.2](#p2-2) | Rozhodnutí | Odkaz na nástěnku Baterie |
| [P2.3](#p2-3) | Ověření | Hodnoty stavu wallboxu mimo tři známé |
| [P2.4](#p2-4) | Rozhodnutí | Barva nabití auta |
| [P2.5](#p2-5) | Rozhodnutí | Starý commit s polohou na GitHubu |
| [P2.7](#p2-7) | Návrh | Obrazovka historie po klepnutí na dlaždici toku |
| [P2.8](#p2-8) | Rozhodnutí | Nabíjení auta podle zdrojů je dopočet |
| [P2.9](#p2-9) | Rozhodnutí | Krok výkonu nabíjení wallboxu (0,3 kW, nebo 0,6 kW odshora) |
| [P2.10](#p2-10) | Rozhodnutí | Odkud nabíjí auto: průměr a hystereze |
| [P2.11](#p2-11) | Rozhodnutí | Sytost ohřevu v historii bojleru |
| [P2.12](#p2-12) | Ověření | Denní součty: čítače pro auto a bojler |
| [P3.2](#p3-2) | Rozhodnutí | Licence repozitáře |
| [P3.3](#p3-3) | Návrh | Budoucí řízení (scénáře AZ Routeru, 80 %, noc bez ohřevu z baterie) |
| [P4.1](#p4-1) | Rozhodnutí | Modrá Síť × modrý akcent ovladačů |
| [P4.2](#p4-2) | Rozhodnutí | Prototyp: co chybí a co jsem rozhodl sám |
| [P4.3](#p4-3) | Návrh | Zvýšený kontrast a skleněný jezdec při dotyku |
| [P4.4](#p4-4) | Chyba | Návrh se v několika místech rozchází se specifikací |

## P1 – chyby a rozhodnutí, která blokují

<a id="p1-5"></a>
### P1.5 Kdy jsou data zastaralá · Rozhodnutí

Rozhodnuto 28. 10.: zapnutý boost se hlásí jako stav. Zbývá práh zastaralosti, karta zatím zastaralé hodnoty nijak neoznačuje.
Doporučení podle exportu 24. 10. (`ENTITY_MAP.md`, Jak často entity hlásí): střídač a AZ Router hlásí každých několik sekund, hodnota bez hlášení déle než 5 min je zastaralá; zásobník hlásí řídce (11 min), zastaralý po 60 min; ventily hlásí jen při změně, takže se u nich stáří nepoužije (jen dostupnost); u auta se stáří bere z času poslední zprávy z auta (`sensor.garaz_bmw_i3_2`), šedě od 1 h. Zastaralá hodnota je neutrální (nikdy oranžová ani červená). Pravidlo zastaralých dat nesmí pro ventily a auto stát na `last_reported` (`AUDIT.md` bod 6).

<a id="p1-8"></a>
### P1.8 „Dům“: odečet wallboxu a bojleru z jednoho zdroje · Rozhodnutí

Rozhodnuto 28. 10.: Dům = spotřeba domu bez wallboxu a bojleru, ale všechny tři hodnoty mají být ze stejného zdroje (nemíchat GoodWe a AZ Router, každý měří v jiný čas a obnovuje jinak). Karta teď počítá `house.power` (GoodWe, včetně auta a bojleru) − `wallbox.power` − `boiler.power` (AZ Router), tedy právě to míchání.
Otázka: má GoodWe vlastní měření výkonu wallboxu a bojleru (pak je dám do konfigurace a odečítat se bude jen v GoodWe), nebo se má Dům počítat jen z hodnot, které se obnovily ve stejném okně (např. do 10 s od sebe, jinak se drží poslední shodná hodnota)? Do rozhodnutí zůstává dnešní výpočet se spodní mezí 0.

<a id="p1-9"></a>
### P1.9 Mísení vody: neplatná kombinace · Rozhodnutí

Rozhodnuto 28. 10.: karta přepíná mísení ručně, přímo ventily C1 a C2 (bez skriptu); automatizace řeší uživatel sám.
Zbývá zobrazení kombinace oba zapnuté / oba vypnuté: dnes neutrální „nejasný stav ventilů“ a přepínač jde použít. Doporučení: oranžově „Ventily: oba zapnuté“ / „oba vypnuté“ – je to skutečná odchylka, ne chybějící údaj; nedostupný ventil „––“ neutrálně.

<a id="p1-11"></a>
### P1.11 Bojler ve spotřebě domu · Ověření

Znaménka potvrdil uživatel 28. 10.: kladné hodnoty jsou přetoky do sítě a vybíjení baterie.
Když bojler topí (`sensor.tuv_power_total` > 0), roste o totéž `sensor.goodwe_house_consumption`? Z odečtu screenshotu 25. 10. ano (dům 10,7 kW = auto 1,4 + bojler 4,0 + ostatní 5,3 kW), přímé ověření chybí.

## P2 – denní používání

<a id="p2-1"></a>
### P2.1 Telefon na šířku: jeden, nebo dva sloupce · Rozhodnutí

Karta má jeden sloupec na každé šířce; na 852 × 393 jsou karty široké a vysoké. Návrh: na šířku dva sloupce (toky vlevo, systémy vpravo), podle šířky karty jako v kartě Klima (od 620 px).

<a id="p2-2"></a>
### P2.2 Odkaz na nástěnku Baterie · Rozhodnutí

Dnešní dashboard: podržení uzlu Baterie otevře `/dashboard-baterie`. Odkaz na BMW už je hotový (dvojklep nebo podržení obrázku auta, `car.link`). Podržení není na iPhonu poznat; návrh: stejný chráněný gest na dlaždici Baterie by kolidoval s klepnutím, které otevírá popup, takže spíš šipka „›“ v popupu Baterie s odkazem (nový klíč `battery.link`).

<a id="p2-3"></a>
### P2.3 Hodnoty stavu wallboxu mimo tři známé · Ověření

Známé jsou `Disconnected`, `Waiting`, `Charging` (měřeno 15. 10.). Export 24. 10.: senzor není výčtový (nemá `options`), další hodnoty z něj tedy nezjistíme; ověřit v kódu integrace AZ Router, nebo pozorováním. Dnešní dashboard jinou hodnotu ukáže, jak je. Návrh: neznámou hodnotu ukázat, jak je, neutrálně a bez barvy.

<a id="p2-4"></a>
### P2.4 Barva nabití auta · Rozhodnutí

Dnešní dashboard: zelená od 50 %, oranžová od 20 %, jinak červená (ikona i pruh). Podle pravidla „barva jen při odchylce“ návrh: normálně neutrálně, oranžově pod 20 %, bez zelené (`AUDIT.md` bod 5).

<a id="p2-5"></a>
### P2.5 Starý commit s polohou na GitHubu · Rozhodnutí

První export (commit `092a870`) obsahoval polohu auta GPS (tedy polohu domu), sériové číslo střídače a MAC adresu AZ Routeru; repozitář je veřejný. Historie `main` je sloučená do jednoho commitu bez těchto údajů a šablona exportu je napříště skrývá. GitHub ale podle své dokumentace starý commit ještě zobrazí, kdo zná jeho SHA (cached views), dokud ho nesmaže podpora GitHubu. Návrh: požádat podporu GitHubu o odstranění cached views (formulář podpory, název repozitáře a commit `092a870`); poloha se na rozdíl od hesla změnit nedá.

<a id="p2-7"></a>
### P2.7 Obrazovka historie po klepnutí na dlaždici toku · Návrh

Dlaždice Slunce, Síť, Dům, Baterie (a spotřebiče) budou klikací s historií (rozhodnuto 24. 10.; do té doby otevřou standardní historii entity). Návrh: list jako „Historie místnosti – 24 h“ v kartě Klima – křivka výkonu toho uzlu, pod ní pruh zdrojů v jejich barvách, prohlížení prstem, odkaz na standardní detail entity; křivky se doleva plynule ztrácejí jako v kartě Klima. Pro baterii navíc křivka nabití za 24 h s čárou rezervy 20 %. Rozhodnout obsah, pak navrhnu v canvasu.

<a id="p2-8"></a>
### P2.8 Nabíjení auta podle zdrojů je dopočet · Rozhodnutí

Detail auta ukazuje nabíjení ve sloupcích rozdělených podle zdrojů (slunce, baterie, síť). Home Assistant to přímo neměří: wallbox hlásí jen svůj výkon. Rozdělení by karta dopočítala z toků domu v každém okamžiku (poměrně podle toho, odkud dům právě bere). Návrh: ano, s poznámkou „odhad“ v detailu; bez dopočtu by sloupce byly jen neutrální.

<a id="p2-9"></a>
### P2.9 Krok výkonu nabíjení wallboxu · Rozhodnutí

Výkon wallboxu se v kartě nastavuje (viz `CURRENT_SPEC.md`). 0,5 kW přesně nejde (AZ Router: 100 W na fázi = 0,3 kW celkem). Návrh: 4,2–11,1 kW po 0,3 kW (trefí oba konce rozsahu, 24 poloh). Alternativa: 0,6 kW odshora (11,1 · 10,5 · … · 4,5 kW). Čeká na potvrzení.

<a id="p2-10"></a>
### P2.10 Odkud nabíjí auto: průměr a hystereze · Rozhodnutí

V létě se zdroje nabíjení mění i několikrát za minutu (pár sekund ze sítě). Návrh: podíl zdrojů z energie za posledních 5 minut; zdroj se objeví v textu stavu od 15 % a zmizí pod 5 %; text „Nabíjí ze slunce“, „Nabíjí ze slunce a baterie“, „Nabíjí ze slunce, baterie a sítě“; přesný podíl ukazuje pruh „Odkud nabíjí · průměr 5 min“ jen během nabíjení. Hodnoty 5 min, 15 % a 5 % jsou moje. Souvisí s P2.8 (dopočet).

<a id="p2-11"></a>
### P2.11 Sytost ohřevu v historii bojleru · Rozhodnutí

Výplň ohřevu pod křivkou teploty má tři stupně sytosti (24 / 44 / 68 % jako vlny topení v Klima). Návrh hranic: třetiny největšího výkonu bojleru. Ten není ověřený: `number.tuv_1_max_power` je 1325 W a bojler je připojený na 3 fáze (`switch.tuv_1_1_connected_l1` až `_l3`), takže maximum je buď 1,3 kW, nebo asi 4 kW – podle toho, zda je nastavení na fázi. V návrhu: do 0,9 kW slabý, do 1,8 kW střední, nad 1,8 kW silný.

<a id="p2-12"></a>
### P2.12 Denní součty: čítače pro auto a bojler · Ověření

Popup dlaždic potřebuje energii za den pro Slunce, Baterii (vybito, nabito), Síť (odebráno, dodáno), Auto, Bojler a Dům. První čtyři mají ověřené čítače střídače (`ENTITY_MAP.md`; denní součet = rozdíl čítače od půlnoci, např. přes `utility_meter` nebo statistiky Home Assistantu). Pro auto (wallbox) a bojler (AZ Router) čítač energie v `ENTITY_MAP.md` není. Možnosti: čítač, pokud ho zařízení nabízí; jinak integrál výkonu (helper Riemann sum) s drobnou chybou. Dům = zbytek, takže chyba měření se v něm sečte; návrh drží rovnost zdrojů a spotřeby. Ověřit v živém Home Assistantu, než se popup implementuje.

## P3 – doladění

<a id="p3-2"></a>
### P3.2 Licence repozitáře · Rozhodnutí

Repozitář Klima má licenci MIT; sem jsem ji bez vašeho souhlasu nepřevzal.

<a id="p3-3"></a>
### P3.3 Budoucí řízení · Návrh

Mimo rozsah (`CURRENT_SPEC.md`, Mimo rozsah): scénáře AZ Routeru (boost auta asi 4 kW i ze sítě; auto z přebytku do 10 kW; nejdřív voda na 60 °C; co největší přetok), zastavení nabíjení auta na 80 %, v noci neohřívat vodu z baterie. Souvisí (export 24. 10., `ENTITY_MAP.md`): `switch.tuv_3_3_block_heating_from_battery` je **vypnutý**, takže blokace ohřevu bojleru z baterie neplatí; ohřev z FVE je povolen jen v okně 07:00–19:00 (`switch.tuv_3_4_allow_solar_heating_only_in_time_window`); `switch.wallbox_4_block_charging_from_battery` je vypnutý. Nastavení výkonu nabíjení wallboxu jsou na fázi (1400–3700 W); karta je nastavuje jako celý odběr 4,2–11,1 kW (`ENTITY_MAP.md`, Wallbox). Která z entit 7.1 (ruční), 9.2 (časové okno) a 10.2 (HDO) platí pro boost, je k ověření.

## P4 – vzhled podle Apple HIG

<a id="p4-1"></a>
### P4.1 Modrá Síť × modrý akcent ovladačů · Rozhodnutí

HIG (Color): „Avoid using the same color to mean different things.“ Síť je `#3D8BFF`, akcent posuvníků a přepínačů `#0A84FF`. Rozhodnutí: buď Síť jiným odstínem (např. systemIndigo `#6D7CFF`), nebo akcent ovladačů neutrální. Zatím ponecháno, protože modrou Síť uživatel schválil dříve.

<a id="p4-2"></a>
### P4.2 Prototyp: co chybí a co jsem rozhodl sám · Rozhodnutí

Prototyp karty je v podobě podle Apple HIG (tři panely, vlastní přepínač, slider a segmentový ovladač) a čte živá data; všechny limity, prahy, stupnice, barvy a nadpisy jsou v konfiguraci.

**Neimplementováno:** souhrn dnešních součtů pod nadpisem, 24h historie a historie po klepnutí, „Jak dlouho“, ovládání limitu nabití auta (limit je jen značka na měřiči), stáří dat auta, podbarvení dlaždice Dům podle podílů zdrojů (dlaždice má odstín barvy Dům), zvýšený kontrast (P4.3).

**Rozhodl jsem sám, čeká na potvrzení:**
- Nadpisy panelů jsou klíče `titles.*` (výchozí „Elektřina“, „BMW i3“, „Teplá voda“), aby auto nebylo napevno BMW.
- Řádek Wallbox otevře historii výkonu; rozbalují se řádky Boost, Boost bojleru a Zásobník (plyn). Mísení vody je v detailu Zásobníku.
- „Odkud auto nabíjí“ ukazuje okamžité podíly zdrojů, ne průměr za 5 minut; ve větě stavu je jen „Nabíjí ze slunce“ bez dodatku „· boost“ (uživatel 27. 10.: „Zapnuto neuvádět“).
- Bojler jen při ohřevu (uživatel 28. 10.): přes zimu je dlaždice Bojler v diagramu skrytá a objeví se při ohřevu a `boiler.hold_minutes` (15) po něm; sloupec se zkrátí na čtyři dlaždice. Návrh; čeká na potvrzení, zda výchozí hodnota má být `always`, nebo `heating` (v návrhu je zapnuto `heating`, ve spec výchozí `always`) (Auto se skrývá, když je odpojené, rozhodnuto 28. 10.).
- Auto jen když je připojené (uživatel 28. 10.): dlaždice Auto v diagramu Elektřina se při odpojeném autu skryje; návrh. Čeká na potvrzení, zda se tím myslí jen dlaždice v diagramu (návrh), nebo i karta Auto a Wallbox na nástěnce (zatím zůstává, ukazuje stav BMW i odpojeného).
- Úroveň v dlaždicích (uživatel 27. 10. a 28. 10.): nabití baterie, nabití připojeného auta a teplota bojleru jsou výplň pozadí dlaždice (zleva, bez čísla „%“, číslo je v popupu); aktivní = barva zdroje, jinak šedá; odpojené auto bez výplně; obě strany Baterie mají výplň vždy, aktivní strana barevnou, neaktivní šedou (uživatel 28. 10.). Diskrétní měřiče jsou pryč. Návrh; čeká na potvrzení, zda bez čísla stačí (přesná hodnota jen v popupu) (uživatel 28. 10. při nulovém toku určil šedou na obou stranách).
- Popisky pod přepínači Zablokovat nabíjení a Přednost před bojlerem popisují důsledek („Auto nenabíjí, přebytek ohřívá vodu“, „Auto nabíjí dřív než bojler“), ne stav; znění je moje, ověř, že sedí na skutečné chování wallboxu a AZ Routeru.
- Přetažení nebo dvojklepnutí pro Přetoky | Boost u auta je můj návrh podle iOS vzoru „posunutím potvrdit“; dlouhý stisk jsem nezvolil (nezjistitelný, bez alternativy pro čtečky). Pokud chceš jen dlouhý stisk nebo jen dvojklepnutí, stačí říct.
- Práh toků je jeden, `flows.idle_threshold` 100 W; klíče `sun_covers` a `battery_flow` (50 W) odpadají, aby věta o stavu nebyla v rozporu s dlaždicí („nevyrábí“ při 80 W).
- Měřič nabití auta je plochý v barvě Auto, s ryskami po 10 % a značkou limitu pod 100 %.
- Jemný rámeček dlaždic Sankey (1 px, `rgba(255,255,255,.14)`) a dvě dlaždice Teplé vody (obloukový měřič vlevo, ovládání vpravo a v rozbalovacích řádcích; Mísení vody jako přepínač v kapsli mezi nimi; změna teploty zásobníku přepne na Manual) jsou návrh; rozměry oblouku (124 × 112 px, silnice 9 px) a skupina Upozornění nahoře čekají na potvrzení.
- Barva výplně obloukových měřičů teplé vody je přechod `colors.temp_scale` (kód zatím používá `colors.cold` a `colors.neutral`).
- Nabíjecí výkon používá `wallbox.charging_power` (v příkladu `number.wallbox_7_1_manual_charging_power`, k ověření v živém Home Assistantu); ID obrázku auta obsahuje VIN, v příkladu je zástupné `image.bmw_i3_vin_image`.

<a id="p4-3"></a>
### P4.3 Zvýšený kontrast a skleněný jezdec při dotyku · Návrh

HIG (Materials, Color) dovoluje u jezdce posuvníku a přepínače skleněný vzhled při dotyku a vyžaduje podporu zvýšeného kontrastu. Není v návrhu; řešit s kódem.

<a id="p4-4"></a>
### P4.4 Návrh se v několika místech rozchází se specifikací · Chyba

- Prototyp v kódu (28. 10.) už odpovídá návrhu v1.17; zbývá rozdíl v tom, co kód nezahrnuje (viz `CURRENT_SPEC.md`, Stav implementace): „Jak dlouho“, detailní obrazovky Voda a Wallbox, historie, ovládání limitu nabití auta.
- Čas posledního ohřevu bojleru (`boiler.show: heating`) se drží jen v `localStorage` prohlížeče; po jeho vymazání se dlaždice Bojler ukáže, dokud nezačne ohřev. Spolehlivější by byl pomocný senzor v Home Assistantu (návrh, nerozhodnuto).
- Denní součty v popupech potřebují čítače z `examples/denni_soucty.yaml` (utility_meter z ověřených celkových čítačů střídače); čítače pro auto a bojler viz P2.12, do té doby ukazují součty „––“.

## Jak se testuje

`npm test` sestaví kartu a spustí testy v prohlížeči (Playwright, Chromium) na zkušební stránce `tests/harness.html` s náhradními daty: chybná konfigurace (chyba s názvem klíče, prázdná hodnota = výchozí), příklad YAML obsahuje všechna nastavení, bez vodorovného posouvání na šířkách 320–768 px a na telefonu na šířku (852 × 393), axe-core v tmavém i světlém režimu, chybějící a nedostupná data jako „––“ s ikonou a neutrální barvou, přepínání režimů. Co se v prohlížeči ověřit nedá, je v P1.11.

Stav kódu: 50 testů prošlo (konfigurace včetně čísel a barev, Sankey a hladiny, skrývání Auta a Bojleru, popupy, upozornění, karty auta a vody, chráněné ovládání podržením a dvojklikem, rozměry prvků podle HIG, rozložení, chybějící data, přístupnost v obou režimech). Pokrytí kódu (`npm run coverage`) se po posledních změnách neměřilo.
