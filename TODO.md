# TODO – Energie Dashboard

Jen to, co čeká na vaši odpověď nebo na ověření v živém Home Assistantu a na iPhonu 14 Pro (Apple Human Interface Guidelines). **Nejsou součástí zadání**: platí `CURRENT_SPEC.md`. Kde se v kitu dá sdílet kód, je to v `TODO.md` kitu (K1–K3).

Pravidla:
- Čísla E1–E19 jsou trvalá (odkazuje se na ně ze `CURRENT_SPEC.md`, `ENTITY_MAP.md` a `AUDIT.md`). Vyřízený bod se odsud smaže (platné chování je ve specifikaci) a jeho číslo se nepoužije znovu; nový bod dostane další volné číslo.
- Do TODO patří jen jasná otázka nebo jasný úkol. Co jste potvrdil, je ve specifikaci; nápady bez vaší žádosti se nevedou.
- Druh: **Rozhodnutí** (čeká na vás), **Ověření** (v živém Home Assistantu nebo na zařízení), **Návrh** (zlepšení, které jste chtěl nebo odsouhlasil směr).

Konsolidace 28. 10.: čísla přepsána od E1. Smazáno: popisné body bez otázky (co kód zatím nezahrnuje je ve `CURRENT_SPEC.md`, Stav implementace), budoucí řízení AZ Routeru (je ve specifikaci, Mimo rozsah, entity v `ENTITY_MAP.md`), nepotvrzené vlastní nápady (pomocný senzor pro čas posledního ohřevu bojleru) a statistiky testů (jsou v README). Starší znění je v historii gitu.

## Přehled

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
| [E10](#e10) | Návrh | Obrazovka historie po klepnutí na dlaždici toku |
| [E11](#e11) | Rozhodnutí | Nabíjení auta podle zdrojů: dopočet, průměr a hystereze |
| [E12](#e12) | Rozhodnutí | Krok výkonu nabíjení wallboxu |
| [E13](#e13) | Rozhodnutí | Sytost ohřevu v historii bojleru |
| [E14](#e14) | Ověření | Denní součty: čítače pro auto a bojler |
| [E15](#e15) | Rozhodnutí | Licence repozitáře |
| [E16](#e16) | Rozhodnutí | Modrá Síť × modrý akcent ovladačů |
| [E17](#e17) | Rozhodnutí | Prototyp: co jsem rozhodl sám |
| [E18](#e18) | Návrh | Zvýšený kontrast a skleněný jezdec při dotyku |
| [E19](#e19) | Ověření | Přednost před bojlerem: spínač neodpovídá AZ Routeru |
| [E20](#e20) | Rozhodnutí | Detail baterie: prahy rozbalancování a odhad času |
| [E21](#e21) | Ověření | Detail baterie: znaménko proudu, hodnoty režimu, statistiky, vzhled na zařízení |

<a id="e1"></a>
## E1 Kdy jsou data zastaralá · Rozhodnutí

Zapnutý boost se hlásí jako stav (rozhodnuto 28. 10.). Zbývá práh zastaralosti; karta zatím zastaralé hodnoty nijak neoznačuje.
Doporučení podle exportu 24. 10. (`ENTITY_MAP.md`, Jak často entity hlásí): střídač a AZ Router hlásí každých několik sekund, hodnota bez hlášení déle než 5 min je zastaralá; zásobník hlásí řídce (11 min), zastaralý po 60 min; ventily hlásí jen při změně, takže se u nich stáří nepoužije (jen dostupnost); u auta se stáří bere z času poslední zprávy z auta (`sensor.garaz_bmw_i3_2`), šedě od 1 h. Zastaralá hodnota je neutrální (nikdy oranžová ani červená). Pravidlo zastaralých dat nesmí pro ventily a auto stát na `last_reported` (`AUDIT.md` bod 6).

<a id="e2"></a>
## E2 „Dům“: odečet wallboxu a bojleru z jednoho zdroje · Rozhodnutí

Dům = spotřeba domu bez wallboxu a bojleru, ale všechny tři hodnoty mají být ze stejného zdroje (nemíchat GoodWe a AZ Router, každý měří v jiný čas a obnovuje jinak; rozhodnuto 28. 10.). Karta teď počítá `house.power` (GoodWe, včetně auta a bojleru) − `wallbox.power` − `boiler.power` (AZ Router), tedy právě to míchání.
Otázka: má GoodWe vlastní měření výkonu wallboxu a bojleru (pak je dám do konfigurace a odečítat se bude jen v GoodWe), nebo se má Dům počítat jen z hodnot, které se obnovily ve stejném okně (např. do 10 s od sebe, jinak se drží poslední shodná hodnota)? Do rozhodnutí zůstává dnešní výpočet se spodní mezí 0.

<a id="e3"></a>
## E3 Mísení vody: neplatná kombinace ventilů · Rozhodnutí

Dnes je kombinace oba zapnuté / oba vypnuté neutrální „nejasný stav ventilů“ a přepínač jde použít. Doporučení: oranžově „Ventily: oba zapnuté“ / „oba vypnuté“ (skutečná odchylka, ne chybějící údaj); nedostupný ventil „––“ neutrálně.

<a id="e4"></a>
## E4 Bojler ve spotřebě domu · Ověření

Když bojler topí (`sensor.tuv_power_total` > 0), roste o totéž `sensor.goodwe_house_consumption`? Z odečtu screenshotu 25. 10. ano (dům 10,7 kW = auto 1,4 + bojler 4,0 + ostatní 5,3 kW), přímé ověření chybí. Souvisí s [E2](#e2).

<a id="e5"></a>
## E5 Telefon na šířku: jeden, nebo dva sloupce · Rozhodnutí

Karta má jeden sloupec na každé šířce; na 852 × 393 jsou karty široké a vysoké. Návrh: na šířku dva sloupce (toky vlevo, systémy vpravo), podle šířky karty jako v kartě Klima (od 620 px).

<a id="e6"></a>
## E6 Odkaz na nástěnku Baterie · Rozhodnutí

Dnešní dashboard: podržení uzlu Baterie otevře `/dashboard-baterie`. Odkaz na BMW už je hotový (`car.link`). Stejné chráněné gesto na dlaždici Baterie by kolidovalo s klepnutím, které otevírá popup; návrh: šipka „›“ v popupu Baterie s odkazem (nový klíč `battery.link`).

<a id="e7"></a>
## E7 Hodnoty stavu wallboxu mimo tři známé · Ověření

Známé jsou `Disconnected`, `Waiting`, `Charging` (měřeno 15. 10.). Senzor není výčtový (nemá `options`), další hodnoty z exportu 24. 10. nezjistíme; ověřit v kódu integrace AZ Router, nebo pozorováním. Karta jinou hodnotu ukáže, jak je. Návrh: neznámou hodnotu ukázat neutrálně a bez barvy.

<a id="e8"></a>
## E8 Barva nabití auta · Rozhodnutí

Dnešní dashboard: zelená od 50 %, oranžová od 20 %, jinak červená (ikona i pruh). Podle pravidla „barva jen při odchylce“ návrh: normálně neutrálně, oranžově pod 20 %, bez zelené (`AUDIT.md` bod 5).

<a id="e9"></a>
## E9 Starý commit s polohou na GitHubu · Rozhodnutí

První export (commit `092a870`) obsahoval polohu auta (tedy polohu domu), sériové číslo střídače a MAC adresu AZ Routeru; repozitář je veřejný. Historie `main` je sloučená do jednoho commitu bez těchto údajů a šablona exportu je napříště skrývá. GitHub ale podle své dokumentace starý commit ještě zobrazí tomu, kdo zná jeho SHA (cached views), dokud ho nesmaže podpora GitHubu. Návrh: požádat podporu GitHubu o odstranění cached views (formulář podpory, název repozitáře a commit `092a870`); poloha se na rozdíl od hesla změnit nedá.

<a id="e10"></a>
## E10 Obrazovka historie po klepnutí na dlaždici toku · Návrh

Baterie už historii má (detail baterie, `CURRENT_SPEC.md`). Zbývá Slunce, Síť, Dům a spotřebiče: dlaždice budou klikací s historií (rozhodnuto 24. 10.). Návrh: list jako „Historie místnosti – 24 h“ v kartě Klima: křivka výkonu toho uzlu, pod ní pruh zdrojů v jejich barvách, prohlížení prstem, odkaz na standardní detail entity; křivky se doleva plynule ztrácejí. Rozhodnout obsah, pak navrhnu v canvasu.

<a id="e11"></a>
## E11 Nabíjení auta podle zdrojů: dopočet, průměr a hystereze · Rozhodnutí

Home Assistant rozdělení nabíjení na slunce, baterii a síť neměří (wallbox hlásí jen svůj výkon); karta ho dopočítá z toků domu v daném okamžiku. V létě se zdroje mění i několikrát za minutu (pár sekund ze sítě).
Návrh: (1) v detailu auta sloupce po zdrojích s poznámkou „odhad“; (2) podíl zdrojů z energie za posledních 5 minut; (3) zdroj se objeví v textu stavu od 15 % a zmizí pod 5 % („Nabíjí ze slunce“, „… ze slunce a baterie“, „… ze slunce, baterie a sítě“); (4) přesný podíl ukazuje pruh „Odkud auto nabíjí · průměr 5 min“ jen během nabíjení. Kód dnes ukazuje okamžité podíly, text od 15 %. Hodnoty 5 min, 15 % a 5 % jsou moje.

<a id="e12"></a>
## E12 Krok výkonu nabíjení wallboxu · Rozhodnutí

AZ Router nastavuje 100 W na fázi, tedy 0,3 kW celkem; 0,5 kW přesně nejde. Dnes: 4,2–11,1 kW po 0,3 kW (24 poloh, trefí oba konce rozsahu; `wallbox.power_step` 300). Alternativa: 0,6 kW odshora (11,1 · 10,5 · … · 4,5 kW). Potvrdit.

<a id="e13"></a>
## E13 Sytost ohřevu v historii bojleru · Rozhodnutí

Výplň ohřevu pod křivkou teploty bude mít tři stupně sytosti (24 / 44 / 68 % jako vlny topení v Klima). Návrh hranic: třetiny největšího výkonu bojleru, tj. do 0,9 kW slabý, do 1,8 kW střední, nad 1,8 kW silný. Největší výkon není ověřený: `number.tuv_1_max_power` je 1325 W a bojler je na 3 fázích (`switch.tuv_1_1_connected_l1` až `_l3`), takže maximum je buď 1,3 kW, nebo asi 4 kW – podle toho, zda je nastavení na fázi. Historie bojleru není implementovaná.

<a id="e14"></a>
## E14 Denní součty: čítače pro auto a bojler · Ověření

Popup dlaždic potřebuje energii za den pro Slunce, Baterii (vybito, nabito), Síť (odebráno, dodáno), Auto, Bojler a Dům. První čtyři mají ověřené čítače střídače (`ENTITY_MAP.md`; denní součet = rozdíl čítače od půlnoci přes `utility_meter`, `examples/denni_soucty.yaml`). Pro auto (wallbox) a bojler (AZ Router) čítač energie v `ENTITY_MAP.md` není. Možnosti: čítač, pokud ho zařízení nabízí; jinak integrál výkonu (helper Riemann sum) s drobnou chybou. Dům = zbytek, takže se chyba měření v něm sečte. Do vyřešení ukazují součty „––“. Ověřit v živém Home Assistantu.

<a id="e15"></a>
## E15 Licence repozitáře · Rozhodnutí

Repozitář Klima má licenci MIT; sem jsem ji bez vašeho souhlasu nepřevzal.

<a id="e16"></a>
## E16 Modrá Síť × modrý akcent ovladačů · Rozhodnutí

HIG (Color): „Avoid using the same color to mean different things.“ Síť je `#3D8BFF`, akcent posuvníků a přepínačů `#0A84FF`. Buď Síť jiným odstínem (např. systemIndigo `#6D7CFF`), nebo akcent ovladačů neutrální. Zatím ponecháno, protože modrou Síť jste schválil dříve.

<a id="e17"></a>
## E17 Prototyp: co jsem rozhodl sám · Rozhodnutí

Potvrdit, nebo změnit:
1. **Bojler jen při ohřevu:** výchozí `boiler.show` je `heating` (dlaždice Bojler jen při ohřevu a 15 min po něm); má být výchozí `always`?
2. **Auto jen když je připojené:** skrývá se dlaždice Auto v diagramu a řádek Wallbox. Má se při odpojeném autu skrýt i celá karta BMW i3 (zatím zůstává a ukazuje stav a nabití)?
3. **Úroveň jako výplň dlaždice** (baterie, auto, bojler) je bez čísla „%“ a „°C“, přesná hodnota je v popupu. Stačí to?
4. **Přetoky | Boost u auta:** kromě podržení a dvojklepnutí (vaše přání) se přepíná i přetažením jezdce; to je moje. Nechat, nebo jen podržení a dvojklepnutí?
5. **Popisky pod přepínači** Zablokovat nabíjení a Přednost před bojlerem popisují důsledek („Auto nenabíjí, přebytek ohřívá vodu“, „Auto nabíjí dřív než bojler“); znění je moje, ověřit, že sedí na skutečné chování wallboxu a AZ Routeru.
6. **Vzhled teplé vody:** jemný rámeček dlaždic Sankey (1 px, `rgba(255,255,255,.14)`), rozměry oblouku (124 × 112 px, silnice 9 px) a skupina Upozornění nahoře.
7. **Entity k ověření v živém Home Assistantu:** `wallbox.charging_power` (v příkladu `number.wallbox_7_1_manual_charging_power`); ID obrázku auta obsahuje VIN, v příkladu je zástupné `image.bmw_i3_vin_image`.

<a id="e18"></a>
## E18 Zvýšený kontrast a skleněný jezdec při dotyku · Návrh

HIG (Materials, Color) dovoluje u jezdce posuvníku a přepínače skleněný vzhled při dotyku a vyžaduje podporu zvýšeného kontrastu (`prefers-contrast: more`). V kartě zatím není.

<a id="e19"></a>
## E19 Přednost před bojlerem: spínač neodpovídá AZ Routeru · Ověření

Uživatel 29. 10.: „switch.wallbox_2_prioritize_when_connected neodpovídá tomu co je zobrazeno v AZ routeru.“ Karta jen čte a přepíná tuto entitu (`wallbox.prioritize_connected`), takže chyba je v mapování nebo v integraci, ne v kartě. Ověřit v živém Home Assistantu: (1) zda neexistuje i `switch.wallbox_1_prioritize_when_connected` nebo jiná podobná entita a která patří kterému wallboxu v routeru; (2) zda se stav entity mění, když se volba přepne v routeru (a naopak), a za jak dlouho; (3) zda není stav obrácený. Podle výsledku změnit entitu v `examples/energie.yaml` a v `ENTITY_MAP.md`, případně popsat zpoždění. Do vyřešení platí údaj v `ENTITY_MAP.md` jako neověřený.

<a id="e20"></a>
## E20 Detail baterie: prahy rozbalancování a odhad času · Rozhodnutí

Moje návrhy, které uživatel nepotvrdil: slova u rozbalancování článků (Výborné do 15 mV, Dobré do 30 mV, Pozor do 100 mV, nad tím Chyba; klíče `battery.imbalance_*`) a odhad času do plné/prázdné baterie (z okamžitého výkonu, po 5 minutách, jen pod 48 h, jen při toku nad prahem). Potvrdit, nebo změnit podle praxe s GoodWe.

<a id="e21"></a>
## E21 Detail baterie: znaménko proudu, hodnoty režimu, statistiky, vzhled na zařízení · Ověření

(1) Znaménko `battery_current` a hodnoty `battery_mode`/`battery_error` nejsou v exportu potvrzené (`ENTITY_MAP.md`, „k ověření“); karta ukazuje velikost proudu a směr podle výkonu. (2) Historie vyžaduje `state_class` u entit a statistiky po 5 minutách se v Home Assistantu ve výchozím nastavení drží asi 10 dní, hodinové bez omezení; 7denní a 30denní grafy zdraví proto používají hodinové. Ověřit u skutečné instalace. (3) Grafy a posouvání prstem v iPhonu (aplikace Home Assistant) nebyly ověřeny na zařízení, jen v Chromiu s testovacími daty.
