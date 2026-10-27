# TODO – otevřené body

Jen otevřené návrhy, chyby a rozhodnutí (iOS, iPhone 14 Pro, Apple Human Interface Guidelines). **Nejsou součástí zadání**: platí `CURRENT_SPEC.md`.

Pravidla:
- Každý bod má trvalé číslo (P1.2, P2.3 …), na které se dá odkazovat. Čísla se nemění; hotové body se odsud mažou (platné chování je v `CURRENT_SPEC.md`) a jejich čísla se znovu nepoužívají. Nový bod dostane další volné číslo ve své prioritě.
- Priorita: **P1** chyby a rozhodnutí, která blokují další práci; **P2** zlepší denní používání; **P3** doladění; **P4** vzhled podle Apple HIG.
- Druh: **Chyba** (nalezeno testem), **Rozhodnutí** (čeká na uživatele), **Návrh** (UX zlepšení), **Ověření** (export, test na skutečném zařízení).

## Přehled

| Č. | Druh | Bod |
|---|---|---|
| [P1.1](#p1-1) | Rozhodnutí | Potvrdit pracovní cíl |
| [P1.2](#p1-2) | Rozhodnutí | Co musí být vidět na první pohled |
| [P1.5](#p1-5) | Rozhodnutí | Které situace hlásit; kdy jsou data zastaralá |
| [P1.6](#p1-6) | Rozhodnutí | Jak potvrzovat ovládání |
| [P1.7](#p1-7) | Rozhodnutí | Pravidlo pro názvy |
| [P1.8](#p1-8) | Rozhodnutí | „Dům“: celkový odběr, nebo bez wallboxu a bojleru |
| [P1.9](#p1-9) | Rozhodnutí | Mísení vody: neplatná kombinace a čím přepínat |
| [P1.11](#p1-11) | Ověření | Znaménko elektroměru při přetoku, bojler ve spotřebě domu |
| [P1.12](#p1-12) | Rozhodnutí | Rezerva baterie: 20 %, nebo nastavení střídače |
| [P1.13](#p1-13) | Rozhodnutí | Potvrdit rozhodnutí, která jsem udělal sám |
| [P2.1](#p2-1) | Rozhodnutí | Telefon na šířku: jeden, nebo dva sloupce |
| [P2.2](#p2-2) | Rozhodnutí | Odkazy na nástěnky Baterie a BMW |
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

<a id="p1-1"></a>
### P1.1 Potvrdit pracovní cíl · Rozhodnutí

Návrh ze zadání: „na první pohled je vidět, kam teď teče energie a co potřebuje pozornost; stav je důležitější než číslo.“
Doporučení: potvrdit beze změny a doplnit, že karta nic neradí (stejně jako Klima: stav popisuje, neradí).

<a id="p1-2"></a>
### P1.2 Co musí být vidět na první pohled · Rozhodnutí

Doporučení (první obrazovka iPhonu na výšku, bez posouvání): odkud se teď bere energie a kam jde (FVE, Síť, Baterie → Dům, Auto, Bojler), nabití baterie, stav auta (připojené / nabíjí, nabití) a upozornění, jen když nějaké je. Teplota bojleru, nastavení zásobníku, mísení a boosty jsou o úroveň níž (karty systémů).
Důvod: na tyto otázky odpovídá dnešní dashboard až po prohlédnutí celé obrazovky diagramu; čísla jsou až druhá úroveň.

<a id="p1-5"></a>
### P1.5 Které situace hlásit; kdy jsou data zastaralá · Rozhodnutí

Doporučení:

| Situace | Hlásit? | Jak |
|---|---|---|
| Auto připojené a nenabíjí (Waiting) | ano, jako stav | neutrálně „Připojeno, nenabíjí“ – je to běžné čekání na přebytek, ne chyba |
| Baterie u rezervy (≤ 20 %) | ano | oranžově u baterie a v upozorněních |
| Přetok do sítě | ano, jako stav | u řádku Síť „přetok“; až po ověření znaménka (P1.11) |
| Staré údaje z auta | ano, neutrálně | „před 3 h“ šedě u auta, starší než 1 h; nikdy poplach (auto data posílá po událostech) |
| Boost zapnutý | ano | oranžově (odebírá i ze sítě nebo baterie) |
| Ventily mísení v neplatné kombinaci | ano | viz P1.9 |
| Studený bojler | ne | není chyba |
| Nedostupná data střídače | ano, neutrálně | „––“; žádný souhrn „v pořádku“ |

Zastaralá data podle exportu 24. 10. (`ENTITY_MAP.md`, Jak často entity hlásí): střídač a AZ Router hlásí každých několik sekund, hodnota bez hlášení déle než 5 min je zastaralá; zásobník hlásí řídce (11 min), zastaralý po 60 min; ventily a skript hlásí jen při změně, takže stáří hlášení se u nich nepoužije (jen dostupnost); u auta se stáří nebere z nabití (to se u zaparkovaného auta nemění), ale z času poslední zprávy z auta (`sensor.garaz_bmw_i3_2`), šedě od 1 h. Pravidlo zastaralých dat nesmí pro ventily a auto stát na `last_reported` (`AUDIT.md` bod 6).

<a id="p1-6"></a>
### P1.6 Jak potvrzovat ovládání · Rozhodnutí

Možnosti: (a) jako předvolby žaluzií v kartě Klima – dvojité klepnutí do 400 ms nebo podržení 550 ms, jednoduché klepnutí jen ukáže bublinu „Podržte nebo klepněte dvakrát“, haptika; (b) klepnutí otevře list s tlačítkem „Zapnout boost“; (c) jedno klepnutí jako v dnešním dashboardu.
Doporučení: (a) pro oba boosty i mísení. Důvod: stejný pohyb jako v kartě Klima, chrání před náhodným klepnutím při posouvání, nepřidává dialog; boost wallboxu umí odebírat asi 4 kW ze sítě nebo baterie, takže náhodné zapnutí něco stojí. Při chybě služby haptika a hláška u tlačítka; nedostupná entita nic neodešle.

<a id="p1-7"></a>
### P1.7 Pravidlo pro názvy · Rozhodnutí

Návrh pravidla (obdoba Topení / Klimatizace): systém se jmenuje tím, co je nebo co dělá; když mají dvě zařízení stejnou funkci, rozliší je zdroj energie v závorce. Nikdy výrobce, model ani integrace (GoodWe, AZ Router, Tado, Nous, BMW, BavarianData); ID entit se nemění.
Názvy podle pravidla: FVE, Síť, Dům, Baterie, **Auto** (místo „BMW i3“), Wallbox, Bojler (FVE), Zásobník (Plyn), Mísení vody; ovládání Boost wallboxu, Boost bojleru. „Solární“ z dnešního dashboardu (výchozí popisek Power Flow Card Plus) se nahradí „FVE“.

<a id="p1-8"></a>
### P1.8 „Dům“: celkový odběr, nebo bez wallboxu a bojleru · Rozhodnutí

Spotřeba domu ze střídače zahrnuje wallbox (měřeno 15. 10.) a bojler (uživatel 25. 10.; ověření P1.11). Návrh ukazuje „Dům“ jako ostatní spotřebu (celek bez wallboxu a bojleru), dnešní dashboard celkový odběr a wallbox a bojler navíc jako samostatné spotřebiče.
Doporučení: „Dům“ = celkový odběr jako dnes a auto a bojler pod ním jako „z toho“ („Dům 5,0 kW · z toho auto 4,0 kW“). Důvod: nic se nepočítá dvakrát ani neodečítá hodnoty z různých registrů a okamžiků (`AUDIT.md` bod 1), takže se nemůže objevit záporný „zbytek domu“.

<a id="p1-9"></a>
### P1.9 Mísení vody: neplatná kombinace a čím přepínat · Rozhodnutí

1. Oba ventily zapnuté nebo oba vypnuté: dnešní dashboard ukáže červeně „Nejasný stav“ (i u nedostupného ventilu). Doporučení: nedostupný ventil „––“ neutrálně; oba zapnuté / oba vypnuté oranžově „Ventily: oba zapnuté“ / „oba vypnuté“ – je to skutečná odchylka, ne chybějící údaj.
2. Čím přepínat: doporučení je volat váš `script.prepnout_miseni_vody`, aby přepínání bylo na jednom místě. Potřebuju jeho YAML, abych ověřil, že přepíná oba ventily současně a nikdy nenechá zapnuté oba (`AUDIT.md` bod 3).
3. Ověřit, zda ještě běží automatizace Tuya „Vypnout FVE cirkulaci“ (17:58) a skript na Synology (`AUDIT.md` bod 2); karta pak ukáže, že mísení vypnulo něco jiného, jen skutečným stavem ventilů.

<a id="p1-11"></a>
### P1.11 Znaménko elektroměru při přetoku, bojler ve spotřebě domu · Ověření

Karta bere kladnou hodnotu elektroměru jako dodávku do sítě (odběr záporný, to je změřené). Když se při prvním přetoku ukáže opak, stačí otočit znaménko v `src/model.ts`.

1. Při větším přetoku (baterie plná, slunce) zapsat `sensor.goodwe_meter_active_power_total` a stav SEMS+: kladné = přetok?
2. Když bojler topí (`sensor.tuv_power_total` > 0), roste o totéž `sensor.goodwe_house_consumption`? Z odečtu screenshotu 25. 10. ano (dům 10,7 kW = auto 1,4 + bojler 4,0 + ostatní 5,3 kW), přímé ověření chybí.

<a id="p1-12"></a>
### P1.12 Rezerva baterie: 20 %, nebo nastavení střídače · Rozhodnutí

Export 24. 10.: hloubka vybití ve střídači je 80 %, tedy rezerva 20 % – shodně se zadáním. Zbývá rozhodnout, odkud ji karta vezme.
Doporučení: ze střídače (`number.goodwe_depth_of_discharge_on_grid`, rezerva = 100 − hodnota), aby karta po změně nastavení nehlásila podle staré hranice; klíč `battery.reserve` v konfiguraci jen jako náhrada, když entita chybí. Důvod: jeden zdroj pravdy, nastavení střídače se mění.

<a id="p1-13"></a>
### P1.13 Potvrdit rozhodnutí, která jsem udělal sám · Rozhodnutí

1. Nadpis karty bez klíče `title` je „Energie“.
2. Struktura konfigurace po systémech (`pv`, `battery`, `grid`, `house`, `car`, `wallbox`, `boiler`, `tank`, `mixing`), entity bez výchozích ID (nenakonfigurovaná = „––“); `boost`, ventily, zásobník a skript musí mít správnou doménu.
3. Export entit má navíc ke klíčům vzoru (`entity`, `name`, `state`) i `system`, `unit`, `device_class`, `state_class`, `last_changed`, `last_updated`, `last_reported` a vybrané atributy (`options`, nastavení zásobníku). Důvod: jednotky, výčty hodnot a stáří dat se jinak ověřit nedají.
4. Karta používá názvy z dnešního dashboardu, dokud nerozhodnete P1.7.
5. Neznámé klíče na horní úrovni karty se tolerují jako ve vzoru, takže překlep v názvu sekce (`walbox:`) se neohlásí. Alternativa: seznam klíčů, které přidává Home Assistant, a ostatní odmítnout – vyžaduje ověřit ten seznam ve zdrojích frontendu.

## P2 – denní používání

<a id="p2-1"></a>
### P2.1 Telefon na šířku: jeden, nebo dva sloupce · Rozhodnutí

Karta má jeden sloupec na každé šířce; na 852 × 393 jsou karty široké a vysoké. Návrh: na šířku dva sloupce (toky vlevo, systémy vpravo), podle šířky karty jako v kartě Klima (od 620 px).

<a id="p2-2"></a>
### P2.2 Odkazy na nástěnky Baterie a BMW · Rozhodnutí

Dnešní dashboard: podržení uzlu Baterie otevře `/dashboard-baterie`, podržení dlaždice BMW `/dashboard-bmw`. Podržení není na iPhonu poznat. Návrh: šipka „›“ za názvem řádku jako odkaz místnosti v kartě Klima (`link` v konfiguraci).

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
- Stav v dlaždicích (uživatel 27. 10.: „Ty % musí být zobrazeny lépe“, pak „malý HIG gauge diskrétní“, pak „Ty malé % vpravo nahoře … pryč. Budou se zobrazovat na popup“): dole diskrétní gauge o 10 dílcích, číslo (%, °C) jen v popupu po klepnutí na dlaždici spolu s denním součtem; nabití auta jen u připojeného auta. Zvolil jsem diskrétní variantu (stejné dílky po 10 % jako měřič v kartě auta); dlaždice jsou 56 px vysoké. Dlaždice Do baterie se jmenuje „Baterie“ (směr říká pás a druhý řádek). Popup jako HIG popover se šipkou, zavírá se klepnutím mimo; denní součty jsou jen v něm (Baterie i Síť mají vstup i výstup), stálý blok v kartě není.
- Přetažení nebo dvojklepnutí pro Přetoky | Boost je můj návrh podle iOS vzoru „posunutím potvrdit“; dlouhý stisk jsem nezvolil (nezjistitelný, bez alternativy pro čtečky). Pokud chceš jen dlouhý stisk nebo jen dvojklepnutí, stačí říct.
- Práh toků je jeden, `flows.idle_threshold` 100 W; klíče `sun_covers` a `battery_flow` (50 W) odpadají, aby věta o stavu nebyla v rozporu s dlaždicí („nevyrábí“ při 80 W).
- Měřič nabití auta je plochý v barvě Auto, s ryskami po 10 % a značkou limitu.
- Studená a vlažná voda ve schématu mají barvy `colors.cold` a `colors.neutral`.
- Nabíjecí výkon používá `wallbox.charging_power` (v příkladu `number.wallbox_7_1_manual_charging_power`, k ověření v živém Home Assistantu); ID obrázku auta obsahuje VIN, v příkladu je zástupné `image.bmw_i3_vin_image`.

<a id="p4-3"></a>
### P4.3 Zvýšený kontrast a skleněný jezdec při dotyku · Návrh

HIG (Materials, Color) dovoluje u jezdce posuvníku a přepínače skleněný vzhled při dotyku a vyžaduje podporu zvýšeného kontrastu. Není v návrhu; řešit s kódem.

<a id="p4-4"></a>
### P4.4 Návrh se v několika místech rozchází se specifikací · Chyba

- Kód má ještě tři měřiče pod diagramem Elektřina, řádky Boost / Boost bojleru s rozklikem, hodnoty „0,0 kW“, větu s dnešními součty pod nadpisem a historii entity po klepnutí na dlaždici; spec je ruší nebo mění (viz Malé hodnoty, Nabití baterie a teplota bojleru, Režim Přetoky | Boost).
- Měřič nabití auta v kartě BMW i3 má lesklou výplň a vnitřní stín; spec: ploché povrchy bez lesku.
- Upozornění a část detailů používají oranžovou `#FF9F0A`; spec: odchylka je `#FF9230`.

## Jak se testuje

`npm test` sestaví kartu a spustí testy v prohlížeči (Playwright, Chromium) na zkušební stránce `tests/harness.html` s náhradními daty: chybná konfigurace (chyba s názvem klíče, prázdná hodnota = výchozí), příklad YAML obsahuje všechna nastavení, bez vodorovného posouvání na šířkách 320–768 px a na telefonu na šířku (852 × 393), axe-core v tmavém i světlém režimu, chybějící a nedostupná data jako „––“ s ikonou a neutrální barvou, přepínání režimů. Co se v prohlížeči ověřit nedá, je v P1.11.

Stav kódu: 33 testů, dvakrát po sobě prošly (konfigurace včetně čísel a barev, Sankey a měřiče, karty auta a vody, rozbalovací detaily a ovládání, mísení s potvrzením, rozměry prvků podle HIG, rozložení, chybějící data, přístupnost v obou režimech). Pokrytí kódu (`npm run coverage`) se po posledních změnách neměřilo.
