# CURRENT_SPEC – Energie domu (Energie Dashboard)

Jediný zdroj pravdy o chování a vzhledu. Obsahuje pouze platná rozhodnutí. Entity jsou v `ENTITY_MAP.md`, otevřené body v `TODO.md`, rozpory mezi zdroji v `AUDIT.md`.
Co uživatel nerozhodl, se nedomýšlí: je to otázka v `TODO.md`. Kde jsem kvůli kostře musel rozhodnout sám, je to výslovně označené a čeká na potvrzení (TODO P1.13).

## Cíl projektu

- Nahradit dnešní dashboard „Energie dům“ (`/energie-dum`) jednou vlastní kartou (custom card) hostovanou na GitHubu přes HACS, jako to udělala karta Klima pro místnosti. Typ karty `custom:ha-energie-dashboard`.
- Pracovní cíl (čeká na potvrzení, TODO P1.1): na první pohled je vidět, kam teď teče energie a co potřebuje pozornost; stav je důležitější než číslo.
- Výchozí rozsah je to, co umí dnešní dashboard (oddíl Dnešní dashboard). Co z toho zůstane a v jaké podobě, rozhodne uživatel.
- Stav popisuje, neradí. Barva jen při odchylce; výjimkou jsou barvy zdrojů u toků energie. Chybějící data nejsou poplach.

## Stav implementace

- **Kód karty (prototyp)** čte skutečné entity a kreslí tři panely v podobě podle Apple HIG: **Elektřina** (věta o stavu, Sankey, tři měřiče), **BMW i3** (obrázek, nabití, dojezd, měřič s limitem, upozornění, „Odkud auto nabíjí“ při nabíjení, řádky Wallbox a Boost) a **Teplá voda** (schéma bojleru, zásobníku a mísení, řádky Zásobník (plyn) a Boost bojleru). Řádky Boost, Boost bojleru a Zásobník se rozbalují a obsahují ovládání: segment Přetoky | Boost, nabíjecí výkon (jen v boostu, celkový výkon všech fází), Zablokovat nabíjení, Přednost před bojlerem, cíl ohřevu bojleru, režim a teplotu zásobníku, Mísení vody s potvrzením. Klepnutí na dlaždici otevře historii entity.
- **Konfigurace:** každá proměnná (limity, prahy, stupnice, kroky, barvy, nadpisy) je klíč s výchozí hodnotou; v kódu žádná skrytá konstanta není (oddíl Konfigurace).
- **Kód zaostává za specifikací (změny 27. 10. dopoledne):** má ještě tři měřiče pod diagramem (bez nich a s nabitím baterie a teplotou bojleru v dlaždicích), práh toků 10 W a klíče `flows.sun_covers`, `flows.battery_flow`, `boiler.gauge_max` (spec: práh 100 W v `flows.idle_threshold`, ostatní klíče odpadají), řádky Boost a Boost bojleru s rozklikem (spec: vždy viditelný ovladač, přepíná se přetažením nebo dvojklepnutím).
- **Kód nezahrnuje:** popupy s denními součty (dlaždice, záhlaví Elektřiny; kód dlaždice ještě otevírá historii entity), podbarvení dlaždice Dům podle podílů zdrojů, 24h historii a historii po klepnutí, „Jak dlouho“, ovládání limitu nabití auta, stáří dat auta, rozlišení „světlé varianty accessible“ při zvýšeném kontrastu (TODO P4.3), potvrzování ostatního ovládání (TODO P1.6).
- **Obrázek auta** se bere z atributu `entity_picture` entity `car.image`; chybí-li entita, panel je bez obrázku.
- **Návrh** v canvasu „Energie – návrh karty“ (Elektřina, BMW i3, Teplá voda, detail auta a wallboxu, detail teplé vody; jedna interaktivní deska; detaily jsou na plátně vpravo od hlavní desky a vedou do nich odkazy v nadpisech karet BMW i3 a Teplá voda) odpovídá této specifikaci. Rozdíly návrhu proti ní jsou v `TODO.md`.
- Karta nemá ověřenou funkci v živém Home Assistantu: entity a směr přetoku musí uživatel zkontrolovat.

## Vzhled podle Apple HIG

Rozhodnutí uživatele 27. 10. 2026: „Použij Apple guidelines. Všude, na všech kartách. Důležité, uprav spec. Ne Liquid Glass, ale“ [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines) (segmented controls, toggles, sliders atd.). Z HIG jsem přečetl stránky Segmented controls, Toggles, Sliders, Buttons, Lists and tables, Typography, Color, Dark Mode a Materials (stav 27. 10. 2026); čísla níže jsou buď z HIG (označeno „HIG“), nebo rozhodnutí návrhu (označeno „návrh“) či uživatele.

**Princip.** Karta vypadá jako standardní iOS v tmavém i světlém režimu: ploché povrchy ze systémových barev, písmo SF Pro v obvyklých textových stylech, standardní ovladače. Žádný Liquid Glass: HIG (Materials) říká „Don’t use Liquid Glass in the content layer“ a používat ho „sparingly“; obsah karty je obsahová vrstva, takže bez rozmazání pozadí, bez lesku a odlesku, bez světelných okrajů. Dlaždice, karty a skupiny nemají stín; jezdce ovladačů mají bílou výplň a jemný stín. (HIG dovoluje u jezdce posuvníku a přepínače skleněný vzhled při dotyku; zatím se nepoužívá.) Karta stojí v `ha-card`, povrchy kreslí sama.

**Povrchy (tmavý režim, HIG iOS grouped backgrounds).** Podklad stránky `#000000` (systemGroupedBackground); karta a skupina řádků `#1C1C1E` (secondarySystemGroupedBackground); prvek uvnitř skupiny, dlaždice diagramu, stopa ovladače a podklad měřiče `#2C2C2E` (tertiarySystemGroupedBackground); oddělovač `rgba(84,84,88,.65)`; bez okrajů kolem karet. Světlý režim: `#F2F2F7`, `#FFFFFF`, `#F2F2F7` (tertiary) a oddělovač `rgba(60,60,67,.29)`. Poloměr karty a skupiny 12 px, dlaždice diagramu 12 px, ovladače jsou kapsle (poloměr plný, rozhodnutí uživatele 27. 10.: „Chci tu kapsli. Všude. Na slideru i radiobuttony“). Karta kreslí tyto povrchy sama (ne z motivu Home Assistantu), jen přepíná tmavý/světlý podle Home Assistantu; vlastní nastavení vzhledu karta nemá (HIG Dark Mode: „Avoid offering an app-specific appearance setting“). Při zapnutém zvýšeném kontrastu (`prefers-contrast: more`) se oddělovače a obrysy zesílí a barvy nahradí „accessible“ varianty systémových barev (implementace s kódem).

**Text (HIG Color, Dark Mode).** Hlavní text `#FFFFFF` (světlý `#000000`), vedlejší `#98989F` (≈ secondaryLabel; světlý `rgba(60,60,67,.6)`), bez dat (ikona i „––“) `#8E8E93` (světlý `#6E6E73`). Kontrast textu aspoň 4,5 : 1, u malého textu snaha o 7 : 1 (HIG); měřeno: bílá na `#1C1C1E` 17 : 1, `#98989F` na `#1C1C1E` 5,9 : 1. Barva sama nenese význam (HIG Inclusive color): stav je vždy i slovem nebo ikonou, ne jen barvou.

**Písmo (HIG Typography, iOS).** Systémové písmo (`-apple-system, "SF Pro", Inter, Roboto`), tabulkové číslice. Jen tyto styly: Title 1 28/34 (velká čísla), Title 2 22/28 (název karty), Body 17/22 (název řádku, popisek ovladače, text tlačítka), Subhead 15/20 (vedlejší text, hodnoty), Footnote 13/18 (popisky pod ovladači, osy a popisky v grafech; uživatel 25. 10.: popisky v grafech aspoň 13 px, malé jsou nečitelné), Caption 1 12/16 (jen názvy dlaždic a pomocné popisky; HIG minimum je 11 pt). Výjimka: hero čísla (nabití auta 52 px, teploty nádrží 32 px).

**Barvy.** Akcent ovladačů je systemBlue `#0A84FF` (výplň posuvníku, zapnutý přepínač). Primární tlačítko má výplň `#0A6ED1` s bílým popiskem (kontrast 5,0 : 1; čistá modrá s bílým textem měla 3,7 : 1). Odchylka (upozornění) je systemOrange `#FF9230`, destruktivní akce systemRed `#FF4245` (v kartě zatím není). Barvy zdrojů a spotřebičů (uživatel 25. 10.: „potřebuju každou položku jinou barvu, aby to bylo možné rozeznat i v grafu níž“; barvy musí být od sebe zřetelně odlišené odstínem i světlostí): Slunce `#FFD60A`, Baterie `#30D158` (zelená podle Tesly a energy dashboardů Home Assistantu; růžovou uživatel zamítl), Síť `#3D8BFF` (odběr i přetok, směr říká slovo), Dům `#BF5AF2`, Auto `#40D0E6`, Bojler `#FF6F59`; stejná barva v diagramu, měřiči auta, pruzích, legendách i grafech. Dům, Auto a Bojler jsou návrh. Zdroj bez toku (0 W) je neutrální. HIG (Color): „Avoid using the same color to mean different things.“ Proto přepínač nemá zelenou (zelená je Baterie), zapnutý je akcentem. Zbývá jedna shoda, modrá Síť × modrý akcent, zapsáno v `TODO.md`.

**Přepínač (HIG Toggles).** Jen v řádku seznamu, bez vlastního popisku (řádek je popisek). Šířka 60 × výška 32 px, podlouhlý bílý jezdec 40 × 26 px (přání uživatele 27. 10.: „Chci podlouhlý … a ne ta kulička“); vypnuto: stopa `rgba(120,120,128,.36)`, jezdec vlevo; zapnuto: stopa akcent, jezdec vpravo. Stav je i textem ve druhém řádku („Vypnuto“, při zapnutí popis toho, co se děje, viz Popisky stavu ovládání), ne jen polohou a barvou. Dotyková plocha aspoň 44 px (neviditelné rozšíření).

**Segmentový ovladač (HIG Segmented controls).** Dvě až pět položek stejné šířky, popisky podstatná jména, text, ne text s ikonou. Používá se jen pro volbu režimu nebo pohledu (Přetoky | Boost, Auto | Manual | Off, Vypnuto | Zapnuto, Dnes | 7 dní), ne pro akci; tak jsou řešeny režim wallboxu a bojleru, režim zásobníku a mísení. U dvojic, kde je zapnutí opatrná volba (Přetoky | Boost, Vypnuto | Zapnuto u mísení), je vlevo vždy klidný stav a vpravo aktivní (uživatel 27. 10.: „Potřebuji mít konzistentní, že vlevo je vypnuté mísení a vpravo zapnuté“). Vzhled: stopa `#2C2C2E` ve tvaru kapsle, výška 48 px (položka se dvěma řádky, např. „Přetoky 60 °C“, 66 px), vybraná položka je bílý jezdec s černým popiskem (jezdec 3 px od okraje, posun 0,28 s, bez pohybu při `prefers-reduced-motion`). Nevybrané popisky `#EBEBF5`. Role `radiogroup`, šipky mění volbu, prvky aspoň 44 px.

**Posuvník (HIG Sliders).** Jeden styl všude; nesmí být citlivý (uživatel). Minimum vlevo, maximum vpravo; zvolená hodnota velkým číslem nad ovladačem a krajní hodnoty pod ním. Vzhled: kapsle výšky 52 px se stopou `#2C2C2E`, v ní tenká lišta 6 px vyplněná akcentem po jezdec, podlouhlý bílý jezdec 38 × 24 px (podle uživatelova snímku z iOS 27); dílky po krocích pod lištou, aby se kroky 5 °C a 5 % daly najít (HIG zmiňuje dílky u macOS, v iOS jsou jen koncové body; ponecháno z designových důvodů). Kroky: 5 °C, 5 %, výkon nabíjení po 0,3 kW (TODO P2.9). Neexistuje „text + stepper“ varianta (HIG ji jen doporučuje u širokého rozsahu); hodnota se mění jen jezdcem a klávesnicí (šipky); dotyková plocha aspoň 44 px.

**Tlačítka (HIG Buttons).** Dotyková plocha aspoň 44 × 44 px; popisek sloveso (Hotovo, Přepnout, Zrušit). Role: normální = výplň `rgba(118,118,128,.24)`, bílý popisek 17 px; primární = výplň `#0A6ED1`, bílý popisek polotučný; zrušit = jako normální; destruktivní = červená a nikdy primární. Nejvýše jedno nebo dvě prominentní tlačítka na pohled. Tlačítko má stav stisknuto (tmavší výplň). Tlačítko, které se chová jako přepínač (chip v simulaci), je zapnuté výplní `#0A6ED1`, vypnuté šedě.

**Seznam (HIG Lists and tables, inset grouped).** Skupina řádků na `#1C1C1E` s poloměrem 12 px, mezi řádky oddělovač; řádek: ikona 24 px v podkladu 40 × 40 px, název Body 17, pod ním vedlejší text 13–15, vpravo ovladač, hodnota nebo chevron „›“ (chevron = přechod do detailu, ne tlačítko „info“); text řádků stručný; řádky aspoň 44 px (v kartě 60–64 px kvůli dvěma řádkům textu). Řádky všech karet mají stejnou mřížku (ikona | název, pod ním stav | doplněk vpravo). Popisek skupiny nad ní: Footnote 13, vedlejší barva.

**Diagram.** Dlaždice zdrojů a spotřebičů jsou plné podložky `#2C2C2E` (aktivní: barva zdroje 21–28 % přes `#2C2C2E`), bez okraje, bez rozmazání. Ikona dlaždice (26 px) září podle výkonu: poloměr 2–11 px a krytí 30–90 % rostou s výkonem, bez toku žádná záře. Pásy Sankey a tečky podle výkonu jsou obsah, ne materiál. Ikony jsou vlastní, ne ikony Home Assistantu; SF Symbols karta nepoužívá (nejsou dostupné na webu).

**Schéma Teplé vody.** Nádrže bojleru a zásobníku jsou ploché podložky `#2C2C2E` (96 × 132 px, radius 20), bez záře a stínů, bez svislého odlesku uvnitř (uživatel 25. 10.: „co je ten sloupec vlevo uvnitř bojleru? hrůza“). Hladina je systémová barva ve 38 % se souvislou linkou 2 px na povrchu (bojler: modrá pod 30 °C, šedá 30–45 °C, oranžová od 45 °C nebo při ohřevu ze sítě); bojler má navíc čárkovanou značku cílové teploty (60 °C). Zásobník na plyn má linku čárkovanou, protože teplota je jen nastavená, ne měřená (popisek „nastaveno“). Mísení jsou dvě šipky s otevřenou hlavou (bílé při zapnutí, šedé `#8E8E93` čárkované při vypnutí) a popisek „mísení“ s hodnotou „zapnuto“ / „vypnuto“.

**Popisky stavu ovládání.** Stav se odvozuje z toků, ne z přepínače (uživatel 27. 10.: „Zapnuto neuvádět. je vidět z barevné ikony + textu nabíjí“): říká ho věta pod nadpisem panelu (auto „Nabíjí ze slunce / z baterie / ze sítě“ jen při skutečném nabíjení, jinak „Připojeno, nenabíjí“ nebo „Odpojeno“; voda „Bojler ohřívá …“ jen při příkonu, jinak „Bez ohřevu“). Slovo „Zapnuto“ se neuvádí. Samostatný řádek „Boost“ s podtitulkem v kartách není.

**Režim Přetoky | Boost se nepřepíná omylem** (uživatel 27. 10.: „Boost a rozklik Přetoky nebo Boost je divné. Chci ten rozklik rovnou. Ne na single click, ale buď slide, nebo doubleclick / dlouhý stisk. Nechci omylem kliknout. Ale nemůže tam být boost a po rozkliku Přetoky.“): segmentový ovladač **Přetoky | Boost** je v kartě vždy vidět (auto pod měřičem, bojler pod schématem), bez řádku „Boost“ a bez chevronu. Režim se změní **přetažením jezdce** na druhou položku, nebo **dvojklepnutím** na ni. Jedno klepnutí nic nepřepne: jezdec se krátce vychýlí k klepnuté položce a vrátí (0,28 s, při `prefers-reduced-motion` bez pohybu) a pod ovladačem je 3 s nápověda „Přetáhněte jezdec nebo klepněte dvakrát.“ Dlouhý stisk se nepoužívá: nikdo ho neobjeví a čtečka ho nenabídne. Klávesnice (šipky) a aktivace čtečkou obrazovky přepnou hned, protože jsou záměrné. Postup vychází ze vzoru iOS „posunutím potvrdit“ (např. Slide to power off); HIG stránku Gestures jsem pro tuto změnu nečetl, je to návrh a čeká na potvrzení (TODO P4.2). Stejně se přepíná **Vypnuto | Zapnuto u mísení vody** (vlevo vypnuto, vpravo zapnuto). Ostatní volby (přepínače, Auto | Manual | Off zásobníku) se přepínají jedním klepnutím.

**Pruhy zdrojů a cílů** (Odkud auto nabíjí, Wallbox „dnes nabito“) mají jednotný vzhled na celém dashboardu (uživatel 25. 10.: „všechny zobrazovače by měly být přes celý dashboard konzistentní“): titulek + celkový výkon, pruh 20 px, radius 7, mezera 3 px, legenda s čtverečky 10 px, na jednom řádku bez nadpisu (uživatel 25. 10.: „max 1 řádek. je to legenda, zabírá míň místa“; průměr 5 min je jen ve specifikaci a v popisku pro čtečky).

## Zdroje pravdy

Zadání (stav k 17. 10. 2026) a YAML dnešního dashboardu, potvrzené exportem entit z 24. 10. (`ENTITY_MAP.md`). K ověření zůstává znaménko přetoku do sítě a to, zda spotřeba domu zahrnuje bojler.

| Hodnota | Entita (klíč konfigurace) | Jednotka | Znaménko / hodnoty | Zdroj pravdy |
|---|---|---|---|---|
| Výkon FVE | `sensor.goodwe_pv_power` (`pv.power`) | W | jen ≥ 0 | střídač (integrace GoodWe) |
| Výkon baterie | `sensor.goodwe_battery_power` (`battery.power`) | W | kladné = vybíjení, záporné = nabíjení (měřeno 15. 10.) | střídač |
| Nabití baterie | `sensor.goodwe_battery_state_of_charge` (`battery.state_of_charge`) | % | 0–100 | střídač |
| Spotřeba domu | `sensor.goodwe_house_consumption` (`house.power`) | W | celkový odběr domu **včetně wallboxu** (měřeno 15. 10.); zda i bojleru, k ověření | střídač (počítaná hodnota, viz `AUDIT.md` bod 1) |
| Síť | `sensor.goodwe_meter_active_power_total` (`grid.power`) | W | záporné = odběr ze sítě (ověřeno v noci); kladné = přetok, **k ověření** při větším přetoku | elektroměr střídače |
| Wallbox – výkon | `sensor.wallbox_total_power` (`wallbox.power`) | W | ≥ 0; celkový výkon za všechny tři fáze | AZ Router |
| Wallbox – stav | `sensor.wallbox_charge_status` (`wallbox.status`) | – | `Disconnected` = odpojeno, `Waiting` = auto připojené a nenabíjí, `Charging` = nabíjí | AZ Router |
| Boost wallboxu | `switch.wallbox_boost` (`wallbox.boost`) | – | `on` / `off` | AZ Router |
| Zablokovat nabíjení | `switch.wallbox_1_block_charging` (`wallbox.block_charging`) | – | `on` / `off` | AZ Router |
| Přednost před bojlerem | `switch.wallbox_2_prioritize_when_connected` (`wallbox.prioritize_connected`) | – | `on` / `off` | AZ Router |
| Bojler (FVE) – výkon | `sensor.tuv_power_total` (`boiler.power`) | W | ≥ 0 | AZ Router |
| Bojler (FVE) – teplota | `sensor.tuv_temperature` (`boiler.temperature`) | °C | – | AZ Router |
| Boost bojleru | `switch.tuv_boost` (`boiler.boost`) | – | `on` / `off` | AZ Router |
| Bojler – cíl z přebytku | `number.tuv_2_1_target_temperature` (`boiler.target_temperature`) | °C | 20–85 | AZ Router |
| Bojler – cíl v boostu | `number.tuv_2_2_boost_target_temperature` (`boiler.boost_target_temperature`) | °C | 20–85 | AZ Router |
| Zásobník (Plyn) – nastavená teplota | `water_heater.technicka_mistnost_tado_tepla_voda` (`tank.water_heater`), atribut `temperature` | °C | jen nastavená, naměřená teplota není | Tado |
| Zásobník (Plyn) – režim | totéž, stav entity | – | `auto`, `heat`, `off`; v0 ukazuje hodnotu tak, jak je (např. „režim auto“) | Tado |
| Mísení vody – ventil C1 | `switch.technicka_mistnost_ventil_c1` (`mixing.valve_c1`) | – | `on` / `off` | Nous L3 (Tuya) |
| Mísení vody – ventil C2 | `switch.technicka_mistnost_ventil_c2` (`mixing.valve_c2`) | – | `on` / `off` | Nous L3 (Tuya) |
| Mísení vody – přepnutí v v0 | `script.prepnout_miseni_vody` (`mixing.script`) | – | režim `single`; obsah skriptu není ověřen | skript v Home Assistantu |
| Auto – nabití | `sensor.parkovani_bmw_i3_soc` (`car.state_of_charge`) | % | při nabíjení predikce integrace, jinak zobrazené nabití | šablonový senzor uživatele |
| Auto – dojezd | `sensor.i3_120_range_ev_remaining_range` (`car.range`) | km | – | BMW (BavarianData) |

- Čítače energie (kWh) ověřené proti SEMS+ jsou v `ENTITY_MAP.md`; dnešní dashboard je nezobrazuje, karta zatím také ne. `sensor.goodwe_today_energy_import` a `_export` nejsou čítače sítě a nepoužívají se.
- Proudy fází wallboxu jsou v mA, i když entita hlásí jednotku A. Karta je zatím nepoužívá; kdyby je použila, jednotka se nepřebírá z entity.

## Toky energie

- Uzly: FVE, Síť, Dům, Baterie; spotřebiče Wallbox a Bojler (FVE).
- Směr toku se určuje jen ze znamének ze Zdrojů pravdy. **Směr přetoku do sítě:** kladná hodnota elektroměru se bere jako dodávka do sítě (záporná jako odběr, to je změřené). Kladné znaménko zatím není změřené při větším přetoku (TODO P1.11), proto se při prvním přetoku musí ověřit; stačí pak otočit znaménko v `src/model.ts`.
- Spotřeba domu ze střídače zahrnuje wallbox i bojler (uživatel 25. 10.: „Do domu se počítá bojler i auto“; měření 25. 10.: dům 10,7 kW = auto 1,4 + bojler 4,0 + ostatní 5,3 kW). Dům v návrhu = ostatní spotřeba, tedy celková spotřeba domu bez wallboxu a bojleru; zda tak i v kartě, je otevřené (TODO P1.8).
- Zdroje energie pro spotřebiče se dělí podle podílu naměřených toků (slunce bez nabíjení baterie a přetoku, vybíjení baterie, odběr ze sítě); nabíjení baterie a přetok do sítě jsou jen ze slunce.
- **Malé hodnoty se nezobrazují** (uživatel 27. 10.: „Při výrobě FVE občas skáče pár W ± ze sítě. Pokud je to do ±99 W, tak to zobrazovat jako nic. Žádné 0.0 odebírá nebo posílá“ a „Hodnoty <0.1 kW nezobrazovat, nebo jen minimálně. Zobrazení 0.0 kW je divné (třeba u nabíjení baterie nebo přetoků)“): výkon s absolutní hodnotou pod `flows.idle_threshold` (výchozí 100 W, tedy do ±99 W) je žádný tok, u všech zdrojů a spotřebičů, u sítě kladný i záporný. Dlaždice je neaktivní se slovem místo hodnoty (neodebírá, nedodává, nenabíjí, vypnuto …), bez pásu a bez záře. Taková hodnota se nezapočítá do podílů zdrojů (věty a texty „ze sítě“ ji nejmenují) ani do volby jednotky W / kW; wallbox pod prahem „nenabíjí“, bojler „bez ohřevu“ a pruh „Odkud auto nabíjí“ se neukáže. Nikdy se tedy neukáže „0,0 kW“ ani „5 W“; od 100 W se hodnota ukáže normálně („0,1 kW“ v kW). Stejný práh platí pro věty o stavu (slunce pokrývá dům, baterie se nabíjí).
- Hodnoty pocházejí z různých registrů a okamžiků, proto se součet zdrojů nemusí přesně rovnat spotřebě domu (`AUDIT.md` bod 1). Karta neodvozuje stav „vyrovnáno“ ani jinou hodnotu z rozdílu.
- **Jednotky:** všechny hodnoty v jedné jednotce: kW (jedna desetina), když je některý výkon aspoň 1 kW, jinak W. Energie (kWh) s jednou desetinou. Čísla podle `cs-CZ`.

## Karta Elektřina (Sankey)

- Pořadí shora: nadpis „Energie“ → upozornění (jen když je; objeví se nad diagramem) → Sankey. Denní součty jsou jen v popupech: u jedné dlaždice v jejím popupu (viz Popup dlaždice) a všechny najednou ve velkém popupu po klepnutí na záhlaví „Elektřina ›“ (viz Popup záhlaví); věta „Dnes vyrobeno … · ze sítě … · do sítě …“ pod nadpisem se ruší (uživatel 27. 10.: „Chybí mi celkové hodnoty. Kolik se za den vyrobilo, bralo ze sítě a baterie, kolik se poslalo pryč přebytku, použilo na bojler, auto, nabíjení baterie a dům.“ a pak „Já to nechci vidět pořád. Já to chci vidět v popupu. … zabírá to místo“). Pod nadpisem karty Elektřina je věta o stavu („Přebytek jde do sítě“, „Slunce nabíjí baterii i auto“ …) s tečkou ve stavové barvě. Ovládání je v kartách BMW i3 a Teplá voda a v jejich rozbalovacích řádcích.
- **Sankey:** vlevo zdroje (Slunce, Baterie, Síť), vpravo spotřebiče (Dům = ostatní spotřeba, Auto, Bojler, Do baterie, Do sítě); vždy všech 3 + 5 dlaždic, neaktivní jsou zašedlé s šedou ikonou (měsíc, pauza, pomlčka, zástrčka) a slovem místo nuly (bez výroby, nevybíjí, neodebírá, vypnuto, nenabíjí, nedodává; auto připojeno / odpojeno); chybějící data „––“. Dlaždice 116–132 × 50 px (šířka 35 % diagramu), bez vodorovného posouvání od 320 px.
- **Pás** = tok jednoho zdroje do jednoho spotřebiče: barva zdroje (slunce, baterie, síť), tloušťka = výkon (jedno měřítko pro všechny, `flows.band_max_px_per_kw` 10, `flows.band_min_px` 1,6), okraje se průhledně ztrácejí pod dlaždicí, po středu tečou bílé tečky (rychlost podle výkonu). Oranžová se v tocích nepoužívá (uživatel 26. 10.: „Oranžová mi nic neřekne“). Dlaždice Dům je podbarvená podle podílů zdrojů. Animace respektují `prefers-reduced-motion` (tečky stojí).
- **Nabití baterie, teplota bojleru a nabití auta v dlaždicích** (uživatel 27. 10.: „Stav baterie auta není potřeba, je kousek pod tím znovu. Teplotu bojleru a % nabití baterie bych rád viděl hned u těch chlívků spotřeby.“; „Ty % musí být zobrazeny lépe … Pokud je auto připojené (ať už nabíjí nebo ne) tak zobrazit i % u něj. U odpojeného ne, protože není v domě“; „Můžeme to do toho panelu dát dolů malý HIG gauge diskrétní, nebo HIG progress?“; „Ty malé % vpravo nahoře u panelu pryč. Budou se zobrazovat na popup spolu s celkovým denním součtem.“): měřiče pod diagramem se ruší. Dlaždice **Baterie** (dřív „Do baterie“), **Bojler** a **Auto** mají u dolního okraje malý **diskrétní gauge** (HIG Gauge, 10 dílků po 10 %, výška 4 px, zaokrouhleno na nejbližší dílek, prázdné dílky šedé): u Baterie nabití, u Bojleru teplota na stupnici 10–60 °C, u Auta nabití; barva dílků je barva zdroje, u baterie na nebo pod `battery.reserve` (20 %) oranžová. Číslo (%, °C) v dlaždici není, je jen v popupu. Gauge je vidět i bez toku. Auto ho a nabití má, **jen když je připojené** (nabíjí i nenabíjí); odpojené auto není v domě a dlaždice říká jen „odpojeno“. Dlaždice jsou kvůli gauge vyšší (56 px). Bez dat „––“ a gauge se nekreslí; čtečka gauge nečte (je `aria-hidden`), hodnotu čte z názvu dlaždice a z popupu, u baterie i „pod rezervou“. Návrh (TODO P4.2).
- **Popup dlaždice** (uživatel 27. 10.): klepnutí na kteroukoli z osmi dlaždic otevře popover (HIG Popovers, na iPhonu bublina se šipkou u dlaždice, `#3A3A3C`, šířka 236 px; pod dlaždicí, u dolních dlaždic nad ní). Je to jediné místo, kde jsou denní součty; v kartě nejsou žádné stálé (uživatel: „Nepotřebuju to mít neustále a zabírá to místo. Stačí popisy.“). Obsah shora: název a okamžitý stav („nabíjí 0,8 kW“, „bez ohřevu“); u Baterie, Bojleru a připojeného Auta úroveň (Nabití 88 %, Teplota 52 °C, Nabití 62 %) velkým číslem a 8px gauge, u baterie na rezervě poznámka „pod rezervou“; pak řádky s dnešním součtem v kWh: Slunce „Dnes vyrobeno“; **Baterie „Dnes vybito“ a „Dnes nabito“; Síť „Dnes odebráno“ a „Dnes dodáno“** (uživatel: „A když má baterie in i out, síť by měla mít taky in i out“); Dům „Dnes spotřebováno“; Auto „Dnes nabito“; Bojler „Dnes ohřev“. Obě dlaždice Baterie ukazují stejný popup a obě dlaždice Sítě (Síť a Do sítě) také. Dům = zbytek (vyrobeno + ze sítě + z baterie − do sítě − do baterie − auto − bojler). Zdroje dat: čítače střídače (`ENTITY_MAP.md`) pro slunce, baterii a síť; čítače pro auto a bojler nejsou ověřené (TODO P2.12). Zavře se klepnutím mimo; klepnutí na dlaždici už neotevírá historii entity (původně `hass-more-info`; historie po klepnutí je TODO P2.7 a může být odkaz z popupu).
- **Popup záhlaví** (uživatel 27. 10.: „Klik na záhlaví Energie otevře větší popup se součty všeho“): klepnutí na nadpis nebo větu stavu karty Elektřina (nadpis má chevron „›“) otevře větší popover (`#3A3A3C`, šířka karty, šipka pod nadpisem) „Dnes · kWh“ se dvěma sloupci. **Zdroje** (součet v záhlaví sloupce): Slunce (vyrobeno), Z baterie (vybito), Ze sítě (odebráno). **Spotřeba** (součet): Dům, Auto, Bojler, Do baterie (nabito), Do sítě (přetoky). Dům je zbytek, takže se oba součty rovnají; barvy teček jsou barvy zdrojů a spotřebičů z diagramu; nula se píše „0“. Zavře se klepnutím mimo; otevřený popup dlaždice se zavře. Zdroje dat viz Popup dlaždice (TODO P2.12).
- Upozornění (stálá výška se tu nehlídá): „Nabíjení auta je zablokované.“ a, když platí přednost před bojlerem, auto je připojené, nenabíjí a slunce je nad 200 W: „Auto je připojené, ale nenabíjí…“ (oranžově).
- **Stav boost ze sítě:** slunce málo, baterie nevybíjí, dům bere ze sítě, boost auta i bojleru zapnutý. Boost zapnutý je odchylka → oranžová (ikona a text stavu); stav elektřiny „Dům jede ze sítě“ (barva sítě); baterie „nevybíjí“ šedě.
- **Interaktivní návrh** (uživatel 26. 10.: „Chci jedno klikací, kde budu nastavovat všechny hodnoty“): jedna deska s panelem nahoře: předvolby (Večer, Poledne, Boost ze sítě, Upozornění, Podzim), posuvníky Slunce, Dům · ostatní, Auto, Bojler, Baterie (nabití, limit výkonu), Nabití auta, Teplota bojleru, Cíl zásobníku, Výroba dnes, Odběr/Dodávka ze sítě dnes, Dnes z baterie, Dnes do baterie, Dnes auto, Dnes bojler a přepínače (auto připojeno, přednostní nabíjení, boost wallboxu, boost bojleru, držet baterii, smíšené nabíjení auta). Panel se dá sbalit („Skrýt / Upravit hodnoty“) a v kartě není. Texty a pruhy se počítají z hodnot v panelu.
- **Model** (návrh pro implementaci): Dům = ostatní + auto + bojler; přebytek slunce nad domem nabíjí baterii (do limitu výkonu, pokud není plná), zbytek jde do sítě; schodek kryje baterie (pokud není držená a je nad rezervou 20 %, do limitu výkonu), zbytek síť. Zdroje auta a bojleru se dělí poměrem zdrojů domu; text vypisuje zdroje „ze slunce / z baterie / ze sítě“ (podíl ≥ 15 %), síť nad 50 % je odchylka.
- **Podzimní scénář** (slunce 3 kW, dům 4,8 kW vč. auta 4,2 kW na minimu wallboxu s přednostním nabíjením): schodek 1,8 kW kryje baterie, dokud je nad rezervou 20 %; síť 0 W. Text „Nabíjí ze slunce a baterie“, podíly 62 / 38 %. Síť se přidá až při baterii na rezervě nebo při překročení výkonu baterie (uživatel 25. 10.: „Pokud je FVE 3 kW, dům 4.8 a baterie > min tak pojede i z baterie“).

## Baterie

- Kapacita 11,2 kWh, rezerva 20 % (zadání, k 17. 10.). Střídač má hloubku vybití 80 %, tedy stejnou rezervu 20 % (export 24. 10.). Odkud karta rezervu vezme, je otevřené (TODO P1.12).
- Odhad „do plného / do vybití“ by potřeboval entitu s kapacitou, zatím není.
- Detail po klepnutí (zatím nenavržen, TODO P2.7): křivka nabití za 24 h s čárkovanou čárou rezervy 20 %; při nabití ≤ 20 % oranžová.

## Auto

- Údaje z auta chodí po událostech a mohou být hodiny staré; karta je pouze čte.
- Stav zástrčky z auta je nespolehlivý a nepoužívá se. „Auto připojeno“ = stav wallboxu `Waiting` nebo `Charging`.
- **Karta BMW i3:** obrázek auta z BavarianData je hlavní prvek vpravo nahoře (uživatel 24. 10.: „Tady chci obrázek mého auta, resp. stačí z BavarianData“), pod ním světlo v barvě stavu (slunce žlutá, boost oranžová, jinak neutrální); velké číslo nabití a dojezd; nabití je měřič s dílky po 10 % a značkou limitu 80 %; pod ním upozornění a, jen při nabíjení, pruh „Odkud auto nabíjí“ s legendou; pak ovladač režimu **Přetoky | Boost** (popisek „Režim nabíjení“ nad ním, v Boostu se pod něj plynule vysune posuvník „Nabíjecí výkon“) a seznam s řádkem Wallbox (výkon a stav; rozbalí se klepnutím na Zablokovat nabíjení a Přednost před bojlerem).
- **Obrázek auta:** entita `image.…` integrace, adresa obrázku v atributu `entity_picture` (`/api/image_proxy/<entity_id>?token=…`; Home Assistant 2026.10.1, `homeassistant/components/image/__init__.py`). Klíč konfigurace `car.image` (zatím neimplementováno). Pokud by Home Assistant vracel obrázek s bílým pozadím, musí karta pozadí odstranit nebo auto dát na světlou plochu (ověřit na reálné entitě).
- **Smíšené nabíjení** (např. 2 kW síť + 2 kW slunce): text vypisuje zdroje s podílem ≥ 15 % od největšího (při shodě slunce první), pruh a legenda ukazují přesné podíly, tečka stavu má barvu největšího zdroje; zdroj pod 5 % se do textu nedostane. Síť nad 50 % je odchylka (oranžová). Hranice jsou návrh (TODO P2.8, P2.10).
- **Limit nabití:** 50–100 % po 5 %. Auto umí jen 100 %, nižší limit je odchylka (oranžová poznámka). Limit je malý řádek „Limit nabití · 100 %“ na konci Ovládání; posuvník se rozbalí klepnutím.

## Wallbox

- Třífázový, nejméně 6 A, tedy asi 4 kW při nabíjení.
- Texty stavu v v0: `Disconnected` → „Odpojeno“, `Waiting` → „Připojeno, nenabíjí“, `Charging` → „Nabíjí“. Jiné hodnoty nejsou ověřené (TODO P2.3).
- **Výkon nabíjení** je nastavení boostu: vidí se jen v režimu Boost, v režimu Přetoky se nezobrazuje. Nastavuje se v celkových kW za všechny tři fáze, ne na fázi jako v AZ Routeru (1400–3700 W na fázi po 100 W); karta při zápisu dělí třemi. `sensor.wallbox_total_power` je celkový výkon za 3 fáze (uživatel 25. 10.: „spotřeba je celkově“). Měření 25. 10. 12:04: při 3 700 W na fázi je celkový odběr 10,4 kW, takže 11,1 kW je reálný konec rozsahu; v návrhu je 4,2–11,1 kW po 0,3 kW (TODO P2.9). Posuvník „Nabíjet do“ zůstává. **Výkon a fáze bojleru (TUV) se v kartě nenastavují**, jsou to systémová nastavení AZ Routeru jen pro přetoky.
- **Režim:** přepínač „Přetoky | Boost“ = `switch.wallbox_boost`.
- **Zablokovat nabíjení** (`wallbox.block_charging`): uživatel ho používá, když chce dát přednost bojleru; není to velká anomálie, ale má se ukázat jako upozornění (tlumené, ne poplach). Zapnuté blokování: na detailu upozornění „Nabíjení je zablokované“ s odblokováním; na hlavní kartě auta jen stav. Zapnutí boostu při zablokovaném nabíjení: blokování se **samo vypne** a řádek zpětné vazby to řekne („Nabíjení bylo zablokované, blokování jsem vypnul, aby boost fungoval.“); boost by se jinak hned vypnul.
- **Přednost před bojlerem** (`wallbox.prioritize_connected`): dává autu přednost před bojlerem, dokud je připojené. Problém: při slabém slunci není dost výkonu na rozjezd wallboxu a auto nenabíjí. Upozornění (oranžové, výraznější než blokace), když platí **vše**: přednost zapnutá, auto připojené (`Waiting`), nabíjení není zablokované. Text: „Auto je připojené, ale nenabíjí. Přednost před bojlerem je zapnutá, ale slunce zřejmě nestačí na rozjezd wallboxu.“ + možnost vypnout přednost. Když auto nabíjí (`Charging`), upozornění není. Při zablokovaném nabíjení se místo něj ukáže jen upozornění na blokování (dvě upozornění najednou ne). Obě volby jsou přepínače (switch), ne radiobuttony, protože jsou nezávislé.
- **Detail wallboxu (graf nabíjení):** štíhlé zaoblené sloupce skládané po zdrojích (slunce dole, baterie, síť nahoře, mezera 1,5 px mezi zdroji, osa kW/kWh vpravo, čárkované hrázky), přepínač Dnes | 7 dní. Dnes = sloupce po 10 minutách (výkon v kW); 7 dní = sloupce po dnech s hodnotou nad sloupcem, dnešek plný, ostatní ztlumené. Plošný graf uživatel zamítl: „area graf nevypadá dobře. Asi zpět sloupcový, ale jiný styl“. Pod grafem pruh zdrojů a řádky kWh / %, „X kWh nabito“ a nabití auta od–do.
- **Hlavička detailu** má pevnou výšku (132 px) ve všech stavech, takže nic neskáče. Stav / upozornění se v režimu Boost (nabíjí) beze změny výšky nahradí posuvníkem „Výkon nabíjení“ (celkem 4,2–11,1 kW); v Přetoky a při upozornění je tam text stavu (uživatel 25. 10.: „Nechci aby to skákalo. Slider místo toho nabíjení ze sítě“).
- Rozdělení nabíjení podle zdrojů (slunce, baterie, síť) není přímé měření, ale dopočet z toků domu (TODO P2.8).

## Bojler (FVE)

- Elektrický, ohřívá se jen z přebytku FVE. Nízká teplota (na podzim i 15 °C) není chyba ani upozornění.
- **Cíle ohřevu:** dvě teploty, 20–85 °C po 5 °C: přetoky `number.tuv_2_1_target_temperature` (60 °C) a boost `number.tuv_2_2_boost_target_temperature` (55 °C); musí platit přetoky ≥ boost (posuvník to hlídá a ukáže důvod). Režim a cíl jsou v jednom prvku, který je v kartě Teplá voda vždy vidět pod schématem (přepíná se přetažením nebo dvojklepnutím, viz Popisky stavu ovládání): dlaždice segmentového ovladače „Přetoky 60 °C“ / „Boost 55 °C“, která je zároveň `switch.tuv_boost`; posuvník pod ní upravuje jen cíl právě zvoleného režimu (uživatel 25. 10.: „Tu teplotu tedy nastavuješ podle toho zda je zapnutý boost nebo ne“), druhá hodnota je na stupnici označená. Vybraná dlaždice i teplota jsou bílé i v Boostu, ne oranžové (uživatel 25. 10.); oranžový zůstává jen popisek stavu.
- **Historie bojleru** jako „Historie místnosti“ v kartě Klima (uživatel 24. 10.: „historie teplot, plné area a alpha podle intenzity nabíjení / ohřevu“): křivka teploty s plnou plochou pod ní, ohřev jako výplň pod křivkou v barvě zdroje (ze slunce žlutá) s neprůhledností podle výkonu ohřevu (TODO P2.11), noc ztmavená, pruh mísení pod grafem, popisky aspoň 13 px.

## Zásobník (Plyn)

- Teplou vodu dům bere hlavně odsud. Entita má jen nastavenou teplotu; naměřená teplota není a karta ji nenahrazuje jinou hodnotou.
- Nahoře režim **Auto | Manual | Off** (`auto` | `heat` | `off`). Blok „Teplota“ (číslo 26 px vpravo, posuvník 30–65 °C po 5 °C) je ve všech třech režimech na stejném místě a má stejnou výšku, takže 40 °C neskáče; posuvník i „Jak dlouho“ se zobrazují **jen v Manual** (v Auto a Off zmizí, číslo zůstane na místě); číslo teploty je svisle vycentrované vůči textu vlevo; v Auto a Manual je bílé (aktivní; v Auto je to teplota podle plánu, 40 °C), v Off šedé (teplota, kterou drží kotel, 38 °C). Přepnutí na Manual vychází z teploty, která právě platí.
- Jen v Manual se plynule vysune „Jak dlouho“ jako v aplikaci Tado: posuvník s kroky 15, 30, 45 min, 1 h, 1,5 h, 2 h, 3 h, 4 h, 6 h, 8 h, pak ikona kalendáře = do další změny plánu a ikona ∞ = dokud neobnovíte plán; nad posuvníkem velký text, vpravo „do 18:07“, pod ním věta, co se stane potom (návrat do Auto).

## Mísení vody

- Mísí = C1 vypnutý a C2 zapnutý. Nemísí = C1 zapnutý a C2 vypnutý.
- Zapnutý smí být vždy jen jeden ventil a přepínají se oba současně.
- Jiná kombinace (oba zapnuté, oba vypnuté) není chybějící údaj; jak ji zobrazit, je otevřené (TODO P1.9). Nedostupný nebo neznámý ventil je chybějící údaj („––“, neutrálně).
- V kartě Teplá voda je mísení vidět jen jednou, mezi nádržemi (šipky a „zapnuto / vypnuto“); žádný samostatný řádek ani zmínka v hlavičce (duplicita). Ovládání mísení je v detailu: segmentový ovladač **Vypnuto | Zapnuto** (vlevo vypnuto, vpravo zapnuto; uživatel 27. 10.: „Mísení vody udělej taky ten slider with confirm a ne to vyjeté potvrzení“ a „vlevo je vypnuté mísení a vpravo zapnuté“) se stejným ovládáním jako Přetoky | Boost: přetažení jezdce na druhou položku nebo dvojklepnutí, jedno klepnutí jezdec jen vychýlí a na 3 s ukáže nápovědu, klávesnice a čtečka přepnou hned. Oba ventily se přepnou zároveň. Rozbalovací potvrzení s tlačítky Přepnout / Zrušit se nepoužívá. Ventily C1 a C2 jsou jen v detailu.

## Karta Teplá voda

- Dvě nádrže (bojler s naměřenou teplotou a hladinou, zásobník jen s nastavenou teplotou a přerušovanou hladinou), mezi nimi mísení (viz Schéma Teplé vody); pod tím ovladač **Přetoky 60 °C | Boost 55 °C** s posuvníkem cíle ohřevu právě zvoleného režimu (vždy vidět, bez rozkliku) a seznam s řádkem Zásobník (plyn) (nastavená teplota a režim; po klepnutí se rozbalí Auto | Manual | Off, teplota a Mísení vody přetažením). Historie bojleru je v detailu.

## Ovládání a pojistky

- Ovládat lze: Boost wallboxu, Zablokovat nabíjení, Přednost před bojlerem, výkon nabíjení a limit nabití auta, Boost bojleru a jeho dva cíle, režim, teplotu a dobu zásobníku, Mísení vody.
- Způsob potvrzení ovládání: Přetoky | Boost přetažením nebo dvojklepnutím (viz Režim Přetoky | Boost se nepřepíná omylem), mísení vody stejně (Vypnuto | Zapnuto, viz Mísení vody), ostatní volby jedním klepnutím bez potvrzení (TODO P1.6). Volba se v kartě ukáže hned a vrátí se ke skutečnému stavu, když ho Home Assistant do 6 s nepotvrdí.
- Pojistky, které platí vždy: karta nevolá službu, kterou entita nenabízí; ovládání nedostupné entity nic neodešle a řekne proč; ventily mísení se nikdy nepřepnou jednotlivě ani tak, aby byly zapnuté oba.
- Mimo kartu ventily přepínají i jiné automatizace (`AUDIT.md` bod 2); karta zobrazuje skutečný stav ventilů, ne svůj poslední příkaz.
- **Klidné přepínání režimů.** Při přepínání režimů a voleb se rozvržení nesmí trhat (uživatel 25. 10.: „při přepínání různých režimů to strašně skáče“). Stav a upozornění mají **jedno stálé místo** s pevnou výškou: mění se jen ikona, text a barva, žádné bloky nepřibývají ani neubývají; tlačítka v upozornění nejsou, akce jsou přepínače hned pod ním. Co patří jen k jednomu režimu (výkon boostu) se **plynule vysouvá** (animace výšky ≈ 0,28 s, bez ní při `prefers-reduced-motion`), skryté prvky nejdou focusovat. Stavy, které se střídají na stejném místě (zásobník Auto / Manual / Off), mají **stejnou výšku**. Popisky u přepínačů se vejdou na jeden řádek (≈ 35 znaků).

## Chybějící a zastaralá data

- Stav `unavailable` / `unknown`, neexistující nebo nenakonfigurovaná entita a nečíselná hodnota tam, kde se čeká číslo: řádek zachová ikonu a ukáže „––“ v neutrální barvě, bez upozornění.
- Z neúplných dat karta nikdy neodvodí souhrn „vše v pořádku“.
- Zastaralá hodnota je neutrální (nikdy oranžová ani červená). Od kolika minut je která hodnota zastaralá, je otevřené (TODO P1.5).

## Mobil, režimy, přístupnost

- Mobil napřed: iPhone 14 Pro 393 × 852 a na šířku 852 × 393; bez vodorovného posouvání od 320 px; každý klikací prvek má účinnou dotykovou plochu aspoň 44 × 44 px.
- Tmavý a světlý režim: karta kreslí vlastní povrchy z oddílu Vzhled podle Apple HIG a přepíná se podle Home Assistantu (`hass.themes.darkMode`); klíč `theme` v konfiguraci není (starý klíč v YAML se toleruje jako neznámý klíč horní úrovně).
- Přístupnost: bez porušení axe-core v obou režimech, ovládání klávesnicí, přístupný název = viditelný text, čtečka obrazovky řekne u „––“ „bez dat“.
- Čeština v rozhraní, čísla podle `cs-CZ`.

## Konfigurace

Vše nastavitelné je v YAML konfiguraci karty. Každý klíč je volitelný; klíč bez hodnoty (v YAML např. `power:`) znamená totéž co chybějící klíč, tedy výchozí hodnotu. Entity výchozí hodnotu nemají: nenakonfigurovaná entita je chybějící údaj („––“). Příklad `examples/energie.yaml` obsahuje úplně všechna nastavení; test hlídá, že žádné nechybí. Chybná hodnota zastaví kartu srozumitelnou chybou (název klíče a co se čeká). Neznámý klíč uvnitř sekce je chyba; neznámé klíče na horní úrovni karty se tolerují, protože tam Home Assistant přidává vlastní (např. `grid_options`, `view_layout`).

Struktura klíčů (sekce podle systémů) je moje rozhodnutí (TODO P1.13):

| Klíč | Výchozí | Význam |
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
| `car.charge_limit` | `80` | % limit nabití auta (značka na měřiči auta) |
| `wallbox.power`, `wallbox.status`, `wallbox.boost` | – | výkon, stav a boost wallboxu (`boost` je `switch.…`) |
| `wallbox.block_charging`, `wallbox.prioritize_connected` | – | zablokovat nabíjení a přednost před bojlerem (`switch.…`) |
| `wallbox.charging_power` | – | nabíjecí výkon v boostu (`number.…`, W na fázi; k ověření) |
| `wallbox.phases` | `3` | počet fází; celkový výkon = hodnota entity × fáze |
| `wallbox.power_min`, `wallbox.power_max`, `wallbox.power_step` | `4200`, `11100`, `300` | W, rozsah a krok nabíjecího výkonu (všechny fáze) |
| `wallbox.priority_min_sun` | `200` | W slunce, od kterého karta hlásí, že přednostní auto čeká |
| `boiler.power`, `boiler.temperature`, `boiler.boost` | – | výkon, teplota a boost bojleru (`boost` je `switch.…`) |
| `boiler.target_temperature`, `boiler.boost_target_temperature` | – | cíl ohřevu z přebytku a v boostu (`number.…`) |
| `boiler.target_min`, `boiler.target_max`, `boiler.target_step` | `20`, `85`, `5` | °C, rozsah a krok cíle ohřevu |
| `boiler.scale_min`, `boiler.schema_max` | `10`, `70` | °C, prázdný a plný konec schématu nádrží |
| `boiler.cold_below`, `boiler.hot_from` | `30`, `45` | °C, hranice studené a teplé vody ve schématu |
| `tank.water_heater` | – | zásobník (`water_heater.…`) |
| `tank.temp_min`, `tank.temp_max`, `tank.temp_step` | `30`, `65`, `5` | °C, rozsah a krok teploty zásobníku |
| `mixing.valve_c1`, `mixing.valve_c2`, `mixing.script` | – | ventily mísení (`switch.…`) a skript přepnutí (`script.…`) |
| `flows.idle_threshold` | `100` | W, pod tím je tok žádný (šum, „0,0 kW“); platí pro všechny toky i věty o stavu |
| `flows.kw_from` | `1000` | W, od tohoto se všechny výkony ukazují v kW |
| `flows.export_notice` | `300` | W přetoků do sítě, od kterých věta o stavu říká „Přebytek jde do sítě“ |
| `flows.source_min_share`, `flows.grid_deviation_share` | `15`, `50` | %, podíl zdroje pojmenovaný v textu; podíl sítě, nad kterým je to odchylka |
| `flows.band_max_px_per_kw`, `flows.band_min_px` | `10`, `1.6` | px, nejtlustší (na kW) a nejtenčí pás ve Sankey |
| `scale.sun`, `scale.battery`, `scale.grid`, `scale.house`, `scale.car`, `scale.boiler` | `10000`, `5000`, `10000`, `10000`, `11100`, `4000` | W, výkon, při kterém má dlaždice plný odstín a záři |
| `ui.revert_after` | `6` | s, po kterých se zvolená hodnota vrátí na skutečný stav, když ji Home Assistant nepotvrdí |
| `colors.sun`, `.battery`, `.grid`, `.house`, `.car`, `.boiler` | `#FFD60A`, `#30D158`, `#3D8BFF`, `#BF5AF2`, `#40D0E6`, `#FF6F59` | barvy zdrojů a spotřebičů (`#RRGGBB`) |
| `colors.accent`, `.button`, `.warning` | `#0A84FF`, `#0A6ED1`, `#FF9230` | akcent ovladačů, hlavní tlačítko, odchylka a upozornění |
| `colors.cold`, `.neutral` | `#3CD3FE`, `#8E8E93` | studená voda ve schématu; vypnuté ikony a vlažná voda |

- Kontroly: `title` je text; sekce je mapa klíčů; entita má tvar `doména.objekt` (malá písmena, číslice, `_`); u `boost`, `block_charging`, `prioritize_connected`, `target_temperature`, `boost_target_temperature`, `valve_c1`, `valve_c2`, `water_heater` a `script` musí sedět doména, protože na ně bude karta volat služby nebo číst jejich atributy; `valve_c1` a `valve_c2` nesmějí být stejná entita.

## Dnešní dashboard (v0, stav 24. 10. 2026)

Výchozí rozsah karty. Zdroj: YAML a screenshot od uživatele (24. 10.). Zobrazení `sections`, jedna sekce (mřížka přes celou šířku):

1. **Nadpis „Toky energie“** (`heading`, styl titulek).
2. **Power Flow Card Plus** (`clickable_entities: true`):
   - Síť: elektroměr, `invert_state: true` (hodnoty pak sedí se SEMS+), barva kruhu i ikony podle toku, `display_state: one_way_no_zero`, nula skrytá.
   - Solární: výkon FVE, ikona barevná, nula zobrazená (bez textu stavu).
   - Baterie: výkon a nabití, bez otočení znaménka (kladné = vybíjení), `one_way_no_zero`, nula skrytá; podržení otevře `/dashboard-baterie`.
   - Dům: spotřeba domu, `subtract_individual: false` (celkový odběr), bez animace kruhu.
   - Spotřebiče Wallbox (`mdi:ev-station`) a Bojler (`mdi:water-boiler`): zobrazí se jen při výkonu nad 0 W, bez akce; boost je na dlaždicích.
   - Screenshot 24. 10. (večer, FVE 0 W): Síť „→ 148 W“, Baterie „65 %“ a „↑ 351 W“, Dům 459 W.
3. **BMW i3** (vodorovně dvě poloviny): vlevo Mushroom šablona „BMW i3“ s textem „50 % · dojezd 95 km“ (nabití zaokrouhlené na celá %, bez čísla „—“), barva ikony zelená od 50 %, oranžová od 20 %, jinak červená; podržení otevře `/dashboard-bmw`. Vpravo minimální pruh 0–100 % (button-card) v téže barvě, bez ikony a textu; klepnutí otevře detail entity.
4. **Mřížka 2 sloupce:**
   - **Wallbox**: „Odpojeno“ / „Připojeno, nenabíjí“ / „Nabíjí“ (jiná hodnota se ukáže, jak je) a „· N W“; ikona zelená při nabíjení, modrá při Waiting, jinak šedá. | **Boost wallboxu**: Mushroom entita, klepnutí přepne (`toggle`) bez potvrzení; podklad zelený při zapnutí, jinak šedý (card-mod).
   - **Bojler (FVE)**: „15 °C · 0 W“; ikona oranžová, když topí. | **Boost bojleru**: klepnutí přepne bez potvrzení; podklad oranžový při zapnutí.
   - **Zásobník (Plyn)**: „nastaveno 40 °C · režim auto“ (nastavená teplota z atributu `temperature`, režim = stav entity). | **Mísení vody**: „Mísí“ / „Nemísí“ / „Nejasný stav“; klepnutí spustí `script.prepnout_miseni_vody`; podklad modrý při mísení, šedý bez mísení, červený při jakékoli jiné kombinaci (i při nedostupném ventilu; karta to řeší jinak, viz Mísení vody).

## Mimo rozsah (zatím neimplementováno)

Teď se neimplementuje; struktura konfigurace po systémech nechává místo pro další klíče:

- scénáře AZ Routeru: boost auta asi 4 kW i ze sítě; auto z přebytku do 10 kW; nejdřív voda na 60 °C; co největší přetok;
- zastavení nabíjení auta na 80 %;
- v noci neohřívat vodu z baterie.
