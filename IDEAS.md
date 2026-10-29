# Nápady – Energie Dashboard

Nápady a „nice to have“, ze kterých se vybírá. **Není to TODO** (to je jen to, co už rozpracované čeká na odpověď nebo ověření, `TODO.md`) a **není to zadání** (to je `CURRENT_SPEC.md`). Co si vyberete, dostane místo ve specifikaci a odtud se smaže (číslo se pak nepoužije znovu).

Vznik 29. 10. (zadání uživatele: „Chci mít jak přehled tak kontrolu. Chci využít a vyždímat ze senzorů a dat co mám co nejvíce.“). Vychází z vašeho exportu entit (`HA entities/energie.json`, 358 entit), z `ENTITY_MAP.md` a z toho, co dělají nejlepší energetické projekty: [Power Flow Card Plus](https://www.github.com/flixlix/power-flow-card-plus), [Predbat](https://springfall2008.github.io/batpred/what-does-predbat-do), [EMHASS](https://emhass.readthedocs.io/en/latest/), [evcc](https://docs.evcc.io/en/blog/2026/09/25/highlights-smart-battery-solar-share) a nová karta „Now“ v energetickém přehledu Home Assistantu 2026.3.

Pravidla:
- Čísla **N1–N35** jsou trvalá a nezávislá na E (karta Energie), C (Klima) a K (kit). N1 a N2 jsou bývalé E10 a E18.
- U každého nápadu: **Přínos** (co z toho mám), **Náročnost** (S = hodina, M = večer, L = víc večerů nebo cizí komponenta) a **Data** (co už máte a co by přibylo). Stav dat: ✔ v exportu, ＋ je potřeba doplnit.
- Co nesedí na kartu, může být automace v Home Assistantu, samostatná karta nebo nástěnka; je to u každého napsané.
- Údaje v exportu jsem nemohl ověřit na živém systému. Co je jen odvozené z názvu entity, je označeno „ověřit“.

## Přehled

| Č. | Oblast | Nápad | Přínos | Nár. |
|---|---|---|---|---|
| [N1](#n1) | Přehled | Historie po klepnutí na dlaždici toku (bývalé E10) | ★★★ | L |
| [N2](#n2) | Vzhled | Zvýšený kontrast a skleněný jezdec (bývalé E18) | ★ | M |
| [N3](#n3) | Přehled | Soběstačnost a vlastní spotřeba v % | ★★★ | S |
| [N4](#n4) | Přehled | „Router ušetřil“: energie nasměrovaná AZ Routerem v Kč | ★★★ | S |
| [N5](#n5) | Přehled | Dnes / týden / měsíc / rok v popupech | ★★★ | M |
| [N6](#n6) | Přehled | Pás sazeb (HDO a spot) pod grafem dne | ★★★ | M |
| [N7](#n7) | Přehled | Nejlevnější okno pro auto, bojler a baterii | ★★★ | M |
| [N8](#n8) | Přehled | Fáze: zátěž L1–L3 proti jističi | ★★ | M |
| [N9](#n9) | Přehled | Auto: kolik km ujelo ze slunce (v historii 1 / 7 / 30 dní) | ★★★ | M |
| [N10](#n10) | Přehled | Cena a výdělek dnes | ★★ | M |
| [N11](#n11) | Přehled | Účinnost a cykly baterie | ★★ | S |
| [N12](#n12) | Přehled | Porovnání stringů PV1 a PV2 | ★★ | S |
| [N13](#n13) | Přehled | Největší spotřebiče domu v čase (stopa spotřeby) | ★★ | L |
| [N14](#n14) | Detekce | Baterie krmí auto nebo bojler | ★★★ | S |
| [N15](#n15) | Detekce | Ořez výroby exportním limitem | ★★★ | M |
| [N16](#n16) | Detekce | Napětí v síti a frekvence | ★★ | S |
| [N17](#n17) | Detekce | Panel zdraví zařízení (Wi-Fi, uptime, cloud, teploty) | ★★ | S |
| [N18](#n18) | Detekce | Nejslabší článek baterie v čase | ★★ | M |
| [N19](#n19) | Detekce | Zastaralá data a „němý“ senzor | ★★★ | M |
| [N20](#n20) | Detekce | Push s tlačítky (actionable notifications) | ★★★ | S |
| [N21](#n21) | Řízení | Pravidla AZ Routeru jednou větou a rychlé spínače | ★★★ | M |
| [N22](#n22) | Řízení | Plán nabití auta „do 7:00 za nejmíň“ | ★★★ | L |
| [N23](#n23) | Řízení | Režim střídače podle ceny a předpovědi | ★★ | L |
| [N24](#n24) | Řízení | Exportní limit podle ceny (záporné ceny) | ★★ | M |
| [N25](#n25) | AI | Claude přes MCP: „zeptej se domu“ | ★★★ | S |
| [N26](#n26) | AI | Denní a týdenní souhrn od Claude jako senzor | ★★★ | M |
| [N27](#n27) | AI | Vysvětlení anomálie: „proč se baterie nedobila“ | ★★ | M |
| [N28](#n28) | AI | Claude Code upravuje dashboard a automace | ★★ | S |
| [N29](#n29) | Telefon | Live Activity a widget: nabíjení auta na zamčené obrazovce | ★★ | M |
| [N30](#n30) | Telefon | Siri a zkratky: „kolik mám přebytku“ | ★ | S |
| [N31](#n31) | Výhled | Výhled dne: předpověď výroby z vašich panelů | ★★★ | L |
| [N32](#n32) | Výhled | „Co když s autem“: baterie večer a ráno, kdy začít a přestat | ★★★ | L |
| [N33](#n33) | AI | Popisky podle normy (bez pevných limitů) | ★★★ | M |
| [N34](#n34) | AI | „Shrnutí od Claude“ jen při události | ★★ | M |
| [N35](#n35) | Řízení | Pravidla „když – tak“ jako přepínače na kartě | ★★★ | M |

Návod na připojení Claude: [AI_MCP.md](./AI_MCP.md).

---

## Co už máte v datech a karta nepoužívá

Nejrychlejší zisk; z toho vychází většina nápadů níže.

| Co | Entity (✔ v exportu) | Pro |
|---|---|---|
| Výkon po fázích domu a sítě | `sensor.goodwe_meter_active_power_l1..l3`, `sensor.goodwe_load_l1..l3`, `sensor.master_grid_power_l1..l3`, `sensor.master_grid_voltage_l1..l3`, `sensor.master_grid_current_l*` | N8, N16 |
| Napětí a frekvence sítě | `sensor.goodwe_on_grid_l*_voltage`, `sensor.goodwe_meter_frequency`, `sensor.goodwe_meter_power_factor*` | N16 |
| Dva stringy panelů | `sensor.goodwe_pv1_*`, `sensor.goodwe_pv2_*` (výkon, napětí, proud, režim) | N12, N15 |
| Nejslabší a nejsilnější článek | `sensor.goodwe_battery_min_cell_voltage_id`, `…_max_cell_voltage_id`, teploty `…_temperature_id`, počet modulů `sensor.goodwe_battery_modules` (6) | N18 |
| Denní čítače střídače | `sensor.goodwe_today_s_pv_generation`, `today_load`, `today_battery_charge`, `today_battery_discharge` | zjednoduší `denni_soucty.yaml` (viz níže) |
| Energie nasměrovaná routerem | `sensor.master_saved_energy_today/week/month/year/total` (v exportu rok 315 kWh, celkem 4294 kWh), `sensor.master_routed_power_*` | N4 |
| Nízký tarif | `sensor.master_hdo` | N6, N7 |
| Pravidla routeru | `number.wallbox_6_4_trigger_on_power` (1100 W), `…_6_5` (30 s), `…_6_6`, `…_6_7` (15 s), časová okna `time.wallbox_6_2/3` (08:00–17:30) a `time.tuv_3_4_1/2` (07:00–19:00), `number.tuv_1_max_power`, `select.tuv_4_2_boost_mode` | N21 |
| Blokace odběru z baterie | `switch.wallbox_4_block_charging_from_battery`, `switch.tuv_3_3_block_heating_from_battery` | N14 |
| Zdraví | `sensor.goodwe_rssi`, `sensor.master_cloud_reachable`, `sensor.master_system_status`, `sensor.master_system_uptime`, `sensor.master_system_temperature`, `sensor.wallbox_charger_temperature`, `sensor.wallbox_wifi_signal`, `sensor.goodwe_diag_status` | N17 |
| Řízení střídače | `select.goodwe_inverter_operation_mode` (`general`, `off_grid`, `backup`, `eco`, `peak_shaving`), `number.goodwe_grid_export_limit` (5000 W) | N23, N24 |
| Auto | `sensor.i3_120_battery_hv_max_size` (36,7 kWh), `sensor.wby8p210007k43709_nabita_energie_tento_mesic` (58,6 kWh), `sensor.i3_120_driving_distance_this_month` (169,7 km), `sensor.i3_120_range_ev_remaining_range`, `device_tracker.i3_120` | N9, N22, N29 |

**Zjednodušení hned (bez nového nápadu):** střídač sám počítá denní součty (`sensor.goodwe_today_s_pv_generation`, `today_load`, `today_battery_charge`, `today_battery_discharge`). Pro Slunce, Baterii a Dům tak odpadnou tři z pěti `utility_meter` v `examples/denni_soucty.yaml`. Síť zůstává na `utility_meter`, protože `sensor.goodwe_today_energy_import/export` nejsou čítače sítě (`ENTITY_MAP.md`). Ověřit: v kolik hodin se denní čítače střídače nulují (půlnoc podle hodin střídače, proto tlačítko `button.goodwe_synchronize_inverter_clock`), a zda je jejich `state_class` `total_increasing`.

## Co by se hodilo doplnit (a jde to jednoduše)

| Co | Jak | Odemkne |
|---|---|---|
| **Spotové ceny** | HACS „Czech Energy Spot Prices“ ([rnovacek/homeassistant_cz_energy_spot_prices](https://www.github.com/rnovacek/homeassistant_cz_energy_spot_prices)): aktuální cena, atribut s cenami dopředu, nejlevnější a nejdražší hodina, binární senzory „je nejlevnější“, vlastní hledání nejlevnějšího bloku, 15minutový krok. Distribuci a DPH si dopočítáte šablonou. | N6, N7, N10, N22–N24 |
| **Předpověď výroby** | Solcast nebo Forecast.Solar (obě mají integraci pro Home Assistant), zadáte sklon a azimut obou stringů. | N7, N22, N23, N26 |
| **Počasí** | integrace Met.no (je v Home Assistantu zdarma) | N26 (kontext pro Claude) |
| **Čítače auta a bojleru** | `Riemann sum` z `sensor.wallbox_…power` a `sensor.tuv_power_total` (TODO E14), pro N9 ještě integrál „auto ze slunce“ | N5, N9, N10 |
| **Ceník** | `input_number` pro distribuci, DPH, výkup a fixní složku | N10 |
| **HDO rozpis** | `sensor.master_hdo` už říká, zda je nízký tarif; plán na zítřek by dala integrace [EG.D distribuce](https://github.com/rattkin/HomeAssistant-EGDdistribuce) (nepodařilo se mi ověřit její obsah, jen že existuje) | N6, N7 |
| **Statistiky u všech entit** | `state_class: measurement` u entit pro grafy dlouhých období | N1, N5 |

---

## Přehled a vychytávky

<a id="n1"></a>
### N1 Historie po klepnutí na dlaždici toku (bývalé E10)
Odsouhlasený směr 24. 10., čeká na obsah. Baterie už historii má (detail baterie). Zbývá Slunce, Síť, Dům a spotřebiče. Návrh: list jako „Historie místnosti – 24 h“ v kartě Klima: křivka výkonu uzlu, pod ní pruh zdrojů v jejich barvách, prohlížení prstem, odkaz na standardní detail entity; křivky se doleva plynule ztrácejí. Rozhodnout obsah, pak navrhnu v canvasu.
**Přínos** ★★★ · **Náročnost** L · **Data** ✔ (historie z dlouhodobých statistik, entity potřebují `state_class`)

<a id="n2"></a>
### N2 Zvýšený kontrast a skleněný jezdec (bývalé E18)
HIG (Materials, Color) dovoluje u jezdce posuvníku a přepínače skleněný vzhled při dotyku a vyžaduje podporu zvýšeného kontrastu (`prefers-contrast: more`). V kartě zatím není.
**Přínos** ★ · **Náročnost** M · **Data** –

<a id="n3"></a>
### N3 Soběstačnost a vlastní spotřeba v %
Dva prstence v popupu Slunce a Domu: **soběstačnost** (kolik spotřeby domu pokryla výroba a baterie, ne síť) a **vlastní spotřeba** (kolik výroby zůstalo doma, ne v síti). Obě jsou vidět na jednu hodnotu a dobře se porovnávají den ode dne. Počítá se z denních součtů, které popupy už mají.
**Přínos** ★★★ · **Náročnost** S · **Data** ✔

<a id="n4"></a>
### N4 „Router ušetřil“: energie nasměrovaná AZ Routerem v Kč
`sensor.master_saved_energy_*` (dnes, týden, měsíc, rok, celkem) ukazuje energii, kterou router poslal do spotřebičů místo do sítě. V popupu Bojler a Auto: „Letos 315 kWh = X Kč při Y Kč/kWh“. Neutrální informace, bez barvy. Ověřit, co přesně router do „saved“ počítá (jen bojler, nebo i wallbox), a v jakých jednotkách sensor hlásí.
**Přínos** ★★★ · **Náročnost** S · **Data** ✔ + cena ＋

<a id="n5"></a>
### N5 Dnes / týden / měsíc / rok v popupech
Přepínač „Dnes | Týden | Měsíc | Rok“ nad řádky součtů v popupu dlaždice. Týdny a roky se čtou z dlouhodobých statistik (karta to už umí pro baterii). Dodá srovnání s předchozím obdobím („+12 % proti minulému týdnu“).
**Přínos** ★★★ · **Náročnost** M · **Data** ✔ (a čítače auta a bojleru, TODO E14)

<a id="n6"></a>
### N6 Pás sazeb (HDO a spot) pod grafem dne
Tenký barevný pás pod časovou osou dne (nebo v historii N1): nízký tarif z `sensor.master_hdo`, ceny spotu po hodinách (15 min) odstíny šedé, nejlevnější okno zvýrazněné. Na jedné ose uvidíte, kdy se vyplatilo nabíjet a kdy dům jel ze sítě draze.
**Přínos** ★★★ · **Náročnost** M · **Data** ✔ HDO, ＋ spot

<a id="n7"></a>
### N7 Nejlevnější okno pro auto, bojler a baterii
Řádek ve stavu Auto a Bojler: „Nejlevnější 3 h dnes: 13:00–16:00 (1,2 Kč)“, nebo „Zítra 02:00–05:00“. Z binárních senzorů „nejlevnější blok“ spotové integrace; s předpovědí výroby i „zítra bude slunce, nenabíjej ze sítě“.
**Přínos** ★★★ · **Náročnost** M · **Data** ＋ spot, ＋ předpověď

<a id="n8"></a>
### N8 Fáze: zátěž L1–L3 proti jističi
Tři tenké pruhy fází v popupu Síť a Wallbox: proud na fázi proti jističi (wallbox 16 A, `sensor.wallbox_circuit_breaker`) a nesymetrie (rozdíl nejvíc a nejméně zatížené fáze). U wallboxu s fází spouštění (`select.wallbox_5_triggering_phase`) vidíte, kterou fázi zrovna dobíjí auto. Pozor: `sensor.wallbox_current_l*` je podle exportu v mA, i když jednotka říká A (`ENTITY_MAP.md`).
**Přínos** ★★ · **Náročnost** M · **Data** ✔

<a id="n9"></a>
### N9 Auto: kolik km ujelo ze slunce
Nápad, který jinde nenajdete: kolik kWh z nabíjení auta bylo ze slunce (integrál přidělení „Odkud auto nabíjí“, které karta už dopočítává), vynásobené spotřebou na km (`nabita_energie_tento_mesic` 58,6 kWh / `driving_distance_this_month` 169,7 km). Výsledek: „Za 30 dní vás slunce svezlo 116 km ze 170“.
**Rozhodnuto 29. 10. (uživatel: „Na hlavní kartě nechci mít měsíční souhrny. Tam bude poměr zdrojů z aktuální seance. Na rozklik možná zahrnout do historie na 1 7 30 dní“):** na hlavní kartě zůstává jen pruh „Odkud auto nabíjí“ pro aktuální seanci; km ze slunce jsou v historii po klepnutí na něj, s přepínačem 1 den / 7 dní / 30 dní (stejný vzor jako Detail baterie), sloupce po dnech podle zdrojů. Návrh je v canvasu (artboardy 1 a 2), výpočet v `FORECAST.md`, bod 5. Počítá se mimo kartu (šablona + Riemann), karta jen zobrazí.
**Přínos** ★★★ · **Náročnost** M · **Data** ✔ + integrál podílu slunce ＋

<a id="n10"></a>
### N10 Cena a výdělek dnes
Dnes zaplaceno za odběr, dnes získáno za dodávku, rozdíl; srovnání „kdyby nebylo FVE“ (spotřeba × cena) a „kdyby nebyla baterie“. Podobně jako „What If“ v Predbatu. Základem je ceník a spot. Ukazovat jen jako popis v popupu Síť a Dům.
**Přínos** ★★ · **Náročnost** M · **Data** ✔ + ceník a spot ＋

<a id="n11"></a>
### N11 Účinnost a cykly baterie
Z čítačů nabito a vybito: účinnost za den, týden, měsíc (typicky 90–95 %; propad je včasný signál stárnutí nebo vysokého vlastního odběru) a ekvivalent plných cyklů (`celkem vybito / využitelná kapacita`). Do záložky Zdraví v detailu baterie.
**Přínos** ★★ · **Náročnost** S · **Data** ✔ (`sensor.goodwe_total_battery_charge/discharge`, kapacita z konfigurace)

<a id="n12"></a>
### N12 Porovnání stringů PV1 a PV2
Dva sloupce výkonu a napětí. Sdílejí-li střechu, mají být ve stejném poměru (podle orientace); rozdíl v poměru po týdnech ukáže stínění, špínu nebo vadný panel. Doplnit denní maxima. Do popupu Slunce.
**Přínos** ★★ · **Náročnost** S · **Data** ✔ (`sensor.goodwe_pv1_*`, `pv2_*`)

<a id="n13"></a>
### N13 Největší spotřebiče domu v čase (stopa spotřeby)
Dům je „zbytek“. Skokové změny výkonu domu (trouba, pračka, indukce) se dají označit v historii („17:42 +2,1 kW na 18 min“). Bez dalších měřičů to jsou odhady z tvaru křivky; přesnější by byly zásuvky s měřením. Pro Claude (N27) je to dobrý vstup.
**Přínos** ★★ · **Náročnost** L · **Data** ✔ (spotřeba domu), ＋ podle toho, jak přesně

## Detekce problémů

<a id="n14"></a>
### N14 Baterie krmí auto nebo bojler bez vašeho záměru
Dřívější znění („baterie krmí auto je problém, zablokuj“) bylo špatně: uživatel 29. 10. nabíjí auto záměrně ze slunce i z baterie (start při baterii kolem 50 %, potom se baterie dobije). Upozornění má proto jen hlídat, aby se to nestalo **mimo vaše pravidlo**: baterie vybíjí do auta nebo bojleru pod dolní mezí (např. pod 30 %), nebo wallbox běží i po dosažení rezervy. Reakce: oranžová zpráva na kartě s tlačítkem „Zastavit wallbox“ (a možností `switch.wallbox_4_block_charging_from_battery`, `switch.tuv_3_3_block_heating_from_battery`, obě dnes `off`). Pravidlo „start při 50 %, stop při 30 %“ je v N35.
**Přínos** ★★ · **Náročnost** S · **Data** ✔

<a id="n15"></a>
### N15 Ořez výroby exportním limitem
Kdy střídač zahazuje energii: dodávka se drží u `number.goodwe_grid_export_limit` (5000 W), baterie je plná a výroba stringů (`pv1` + `pv2`) leží pod tím, co by slunce dalo (rostoucí napětí stringu, klesající proud). Karta by řekla „Výroba omezena limitem 5 kW od 12:10 do 14:40“ a spočítala ztrátu v kWh. Řešení: přesměrovat přebytek do bojleru nebo auta dřív, než se oříznou (router to dělá, když je jeho práh nastaven nízko).
**Přínos** ★★★ · **Náročnost** M · **Data** ✔ (odhad ztráty je odhad)

<a id="n16"></a>
### N16 Napětí v síti a frekvence
Jednoduchý graf `sensor.goodwe_on_grid_l*_voltage` s hranicí kolem 253 V (nad ní střídač omezuje výkon podle normy; hodnotu ověřit v dokumentaci střídače a v nastavení `safety_country` CZ-A1). V létě v poledne napětí roste, ořez výroby pak není vina limitu, ale sítě. Upozornit, když se napětí blíží limitu; frekvence a účiník jen v detailu.
**Přínos** ★★ · **Náročnost** S · **Data** ✔

<a id="n17"></a>
### N17 Panel zdraví zařízení
Jedna čtečka „Vše v pořádku“, po rozbalení: Wi-Fi (`goodwe_rssi`, `wallbox_wifi_signal`), doba běhu (`master_system_uptime`: náhlý restart je signál), `master_cloud_reachable`, teploty (wallbox, router, střídač), `goodwe_diag_status`. Podle pravidla „barva jen při odchylce“: nic, dokud není problém.
**Přínos** ★★ · **Náročnost** S · **Data** ✔

<a id="n18"></a>
### N18 Nejslabší článek baterie v čase
`…_min_cell_voltage_id` říká, který článek je nejníž. Pokud je to tentýž článek týdny, je slabý (jiný při každém měření je v pořádku). Karta ukáže „Nejslabší: článek 7 (82 % dní)“. Šest modulů (`goodwe_battery_modules`). Doplňuje graf rozdílu napětí v detailu baterie.
**Přínos** ★★ · **Náročnost** M · **Data** ✔

<a id="n19"></a>
### N19 Zastaralá data a „němý“ senzor
Rozšíření TODO E1: kromě šedé zastaralé hodnoty i upozornění, že střídač nebo router neposlal nic pět minut, a automace, která to pošle jako push. Navíc kontrola nesmyslů: výkon FVE v noci, výkon sítě přesně 0 po dobu minut, SoC mimo 0–100.
**Přínos** ★★★ · **Náročnost** M · **Data** ✔

<a id="n20"></a>
### N20 Push s tlačítky (actionable notifications)
Aplikace Home Assistant v iPhonu umí notifikace s tlačítky. „Baterie krmí auto 2,5 kW. [Zablokovat] [Ignorovat 1 h]“, „Auto je za 10 % a zítra bude pošmourno. [Nabít ze sítě v noci]“. Tlačítko spustí akci v Home Assistantu, nemusíte otevírat kartu.
**Přínos** ★★★ · **Náročnost** S · **Data** ✔ (automace v Home Assistantu, ne v kartě)

## Řízení (kontrola)

<a id="n21"></a>
### N21 Pravidla AZ Routeru jednou větou a rychlé spínače
Nastavení wallboxu a bojleru je rozeseté po deseti entitách. Jedna sekce „Pravidla“ by je přeložila do vět: „Auto začne nabíjet při přebytku 1,1 kW po 30 s, přestane po 15 s bez přebytku, jen 8:00–17:30. Bojler jen 7:00–19:00, z baterie zakázáno.“ Klepnutím upravíte hodnotu (stejný ochranný vzor jako u přepínače Přetoky | Boost). Řeší i vaše E19, protože vidíte skutečný stav vedle věty.
**Přínos** ★★★ · **Náročnost** M · **Data** ✔

<a id="n22"></a>
### N22 Plán nabití auta „do 7:00 za nejmíň“
V detailu auta: zadáte cílové nabití a čas odjezdu. Z SoC auta (`sensor.parkovani_bmw_i3_soc`), kapacity 36,7 kWh a předpovědi slunce plus cen spotu se spočítá, kolik vezme slunce a kolik se doplní v nejlevnějších hodinách. Nastaví časové okno wallboxu (`switch.wallbox_9_1_time_window_charging_enabled`, `switch.wallbox_10_1_hdo_charging_enabled`, `number.wallbox_10_2_hdo_charging_power`). Stejný model používá [evcc](https://docs.evcc.io/en/blog/2026/09/25/highlights-smart-battery-solar-share) (nabíjecí plány, podíl slunce) a ukazuje, že to jde; hotová alternativa je evcc nebo EMHASS vedle karty.
**Přínos** ★★★ · **Náročnost** L · **Data** ✔ + ＋ spot, předpověď

<a id="n23"></a>
### N23 Režim střídače podle ceny a předpovědi
`select.goodwe_inverter_operation_mode` má `eco` a `peak_shaving`. Automace: levné hodiny a zítra pošmourno, tak ze sítě dobít na rezervu; drahé večerní hodiny, tak vybíjet; jinak `general`. Příklad s podobnou logikou: [blog o Solis a spotu](https://mkuthan.github.io/blog/2025/04/12/home-assistant-solar). Nativní integrace GoodWe nabízí jen volbu režimu; nabíjení z sítě s výkonem a SoC má komunitní fork ([mletenay/home-assistant-goodwe-inverter](https://www.github.com/mletenay/home-assistant-goodwe-inverter)). **Rizikové**: špatná automace vybije nebo nenabije baterii; začít v režimu „jen upozorni“.
**Přínos** ★★ · **Náročnost** L · **Data** ✔ + ＋ spot, předpověď

<a id="n24"></a>
### N24 Exportní limit podle ceny (záporné ceny)
Při záporné spotové ceně nastavit `number.goodwe_grid_export_limit` na 0 (výroba jde do bojleru, auta a baterie, jinak se zastaví), po návratu ceny na normál zpět na 5000 W. Pozor na smlouvu s odběratelem a na to, že limit píše do střídače (nezapisovat každých pár sekund).
**Přínos** ★★ · **Náročnost** M · **Data** ✔ + ＋ spot

## AI (Claude)

<a id="n25"></a>
### N25 Claude přes MCP: „zeptej se domu“
Připojíte Claude k Home Assistantu (oficiální server MCP nebo komunitní ha-mcp) a ptáte se: „Kolik jsem tento týden ušetřil routerem?“, „Proč dnes auto nenabíjelo?“, „Který den byla baterie nejméně využitá?“. Claude čte historii, statistiky a šablony. Postup krok za krokem: [AI_MCP.md](./AI_MCP.md).
**Přínos** ★★★ · **Náročnost** S · **Data** ✔

<a id="n26"></a>
### N26 Denní a týdenní souhrn od Claude jako senzor
Integrace Anthropic v Home Assistantu přidá entitu `ai_task` a akci `ai_task.generate_data`. Ve 21:30 pošlete Claude dnešní čísla (výroba, spotřeba, soběstačnost, router, ceny, počasí na zítra) a dostanete 3 věty česky: co se povedlo, co bylo divné a co udělat zítra. Text uložíte do atributu senzoru a karta ho ukáže jako řádek „Souhrn dne“ nebo ho dostanete jako push. Hotový příklad v [AI_MCP.md](./AI_MCP.md). Cena: pár halířů za volání, potřeba API klíč s fakturací.
**Přínos** ★★★ · **Náročnost** M · **Data** ✔

<a id="n27"></a>
### N27 Vysvětlení anomálie: „proč se baterie nedobila“
Když N14, N15 nebo N19 něco odhalí, automace pošle Claude kontext (posledních 6 h hlavních senzorů, stav spínačů AZ Routeru, předpověď) a do notifikace přidá vysvětlení a doporučení: „Baterie byla v 10:00 na 14 %, auto brala 6,3 kW z přebytku a baterie se nedobila; navrhuji zapnout blokaci odběru z baterie.“
**Přínos** ★★ · **Náročnost** M · **Data** ✔

<a id="n28"></a>
### N28 Claude Code upravuje dashboard a automace
Komunitní ha-mcp umí číst a měnit dashboardy, automace a skripty, čte logy a stopy automací (traces) a před změnou dělá zálohu. Hodí se na ladění: „najdi, proč automace X nešla“. Pro kartu samotnou stačí tento repozitář a Claude Code.
**Přínos** ★★ · **Náročnost** S · **Data** –

## Telefon

<a id="n29"></a>
### N29 Live Activity a widget: nabíjení auta na zamčené obrazovce
Aplikace Home Assistant pro iOS umí Live Activity (stav na zamčené obrazovce a v Dynamic Islandu iPhonu 14 Pro): „BMW i3 62 % → 80 %, 3,2 kW ze slunce, hotovo ve 13:40“. Ověřit podporu ve vaší verzi aplikace (funkce je novější). Aktualizuje se notifikací z automace.
**Přínos** ★★ · **Náročnost** M · **Data** ✔

<a id="n30"></a>
### N30 Siri a zkratky: „kolik mám přebytku“
Zkratky v iPhonu volající Home Assistant: odpověď nahlas z jednoho templatu (přebytek, soběstačnost, stav baterie). Jen pro pohodlí.
**Přínos** ★ · **Náročnost** S · **Data** ✔

## Výhled a popisky (koncept v `FORECAST.md`)

Zadání 29. 10.: popisky bez pevných limitů („večer v zimě je to jiné než na jaře nebo v poledne v létě“), výhled na dnešek z panelů (Aiko Neostar 2S 500 Wp: 10× východ 82°, 10× západ 262°, sklon 15°), z něj kdy začít a kdy přestat nabíjet a „když přestanu teď, baterie bude večer mít tolik %“. Vizuální návrh: canvas „Energie – Výhled dne, km ze slunce, popisky“.

<a id="n31"></a>
### N31 Výhled dne: předpověď výroby z vašich panelů
Panely se zapíšou do konfigurace karty (roviny: kWp, azimut, sklon, ztráty). Výroba po hodinách = fyzika (poloha slunce, jasná obloha, oblačnost z předpovědi počasí v HA nebo hotová předpověď z Open-Meteo Solar Forecast / Forecast.Solar / Solcast) × oprava naučená z vašich posledních 14 dní. Graf ukáže dosavadní výrobu, zbytek dne s pásmem „pravděpodobný rozsah“, jasnou oblohu tečkovaně a vodorovnou čáru „minimum pro auto 4,2 kW“. Zbývá vyrobit X kWh. Panely 20 × 500 Wp = 10 kWp (východ 82° / západ 262°, 15°), špička v květnu a června 10 kW. Odhad za jasného dne: 21. 12. asi 12 kWh se špičkou 2,6 kW, 29. 10. asi 27 kWh a 4,6 kW, 21. 3. asi 46 kWh a 7 kW, v květnu a červnu asi 85 kWh a 10 kW; slunce samo pokryje minimum wallboxu (4,2 kW + dům) za jasného dne od března do září kolem poledne.
**Přínos** ★★★ · **Náročnost** L · **Data** ＋ entita `weather` (v HA zdarma) nebo integrace předpovědi

<a id="n32"></a>
### N32 „Co když s autem“: baterie večer a ráno, kdy začít a přestat
Přepínač pod grafem: „Přestat teď“ / „Do 80 %“ / „Jen ze slunce“. Pod ním křivka baterie do půlnoci (zvolený scénář, horší počasí, rezerva) a tři čísla: baterie ve 22:00, ráno v 6:00, kWh ze sítě. Navíc „nabíjejte nejdéle do 13:20“ (najde se v simulaci tak, aby baterie večer zůstala nad vaším cílem i při horším počasí). Ukáže důsledky bez verdiktu: vaše metoda (baterie 50 % → wallbox → stop při 30 %) dnes dá do auta 5,2 kWh, ale baterie dojde v 18:45 a ze sítě bude v noci o 5 kWh víc; nabíjení do 80 % vybije baterii na rezervu kolem 13:00. Model je zjednodušený a nezná váš jev prudkého poklesu SOC pod ~30 % při velkém odběru, takže pod 30 % předpověď označí jako nejistou.
**Přínos** ★★★ · **Náročnost** L · **Data** ✔ + N31

<a id="n33"></a>
### N33 Popisky podle normy (bez pevných limitů)
Věta pod diagramem se nevyhodnocuje proti pevným prahům, ale proti vaší normě pro tuto hodinu, typ dne a roční dobu (prostřední polovina hodnot za 28 dní) a proti „indexu jasné oblohy“ (výroba / možná výroba). „Slunce dává 92 % možného“, „odběr je v tuto hodinu běžný“, „baterie → auto 2,5 kW, běžně 0“. Barva (oranžová) jen při odchylce. Věty jsou šablony cs/en/sv, bez internetu a bez AI.
**Přínos** ★★★ · **Náročnost** M · **Data** ✔ (dlouhodobé statistiky; karta je čte pro baterii)

<a id="n34"></a>
### N34 „Shrnutí od Claude“ jen při události
Při události (odchylka od normy, baterie krmí auto, ořez výroby) pošle HA Claude hotová fakta přes `ai_task.generate_data` a dostane nadpis a 1–2 věty vysvětlení. Čísla počítá model, ne Claude; v textu smí být jen čísla ze vstupu, jinak se použije šablona (N33); nejvýš jednou za 15 minut. Lze vypnout, karta funguje i bez toho.
**Přínos** ★★ · **Náročnost** M · **Data** ✔ + API klíč Anthropic ＋

<a id="n35"></a>
### N35 Pravidla „když – tak“ jako přepínače na kartě
Uživatel 29. 10.: „Více co-když-tak.“ Seznam pravidel v řeči, které nikdo nemusí překládat, každé s přepínačem: „Když baterie ≥ 50 % a slunce ≥ 2 kW, tak pusť wallbox; při baterii ≤ 30 % ho zastav“, „Když baterie dosáhne rezervy a auto nabíjí, tak zastav wallbox a upozorni mě“, „Když zítra bude pod 10 kWh slunce, tak dobij baterii v noci aspoň na 60 %“, „Když je auto pod 30 % a zítra svítí, tak počkej na zítřejší slunce“. Pravidla běží jako automace v Home Assistantu (spínače routeru `switch.wallbox_4_…`, `switch.tuv_3_3_…`, `select.goodwe_inverter_operation_mode`); karta je jen zobrazí a přepne, takže při zavřené kartě fungují dál. Přepínače, které mění nastavení měniče, by měly mít ochranu (podržení). Návrh: artboard 4 v canvasu.
**Přínos** ★★★ · **Náročnost** M · **Data** ✔ (N14, N31). Hlavní pravidlo je vaše metoda: „Když baterie ≥ 50 % a slunce ≥ 2 kW, tak pusť wallbox; při baterii ≤ 30 % ho zastav“ (prahy nastavitelné).

---

## Co bych vybral jako první

1. **N14 + N20**: baterie krmí auto/bojler s tlačítkem Zablokovat. Řeší konkrétní věc, kterou jste viděl na vlastní obrazovce, a je to většinou hotové (spínače existují).
2. **N3 + N4**: soběstačnost a „router ušetřil“. Hodiny práce, data máte.
3. **N25**: Claude přes MCP. Za večer se můžete ptát na všechno, a naučíte se, co vám v datech chybí.
4. **Spotové ceny + předpověď** (doplnit data): odemkne N6, N7, N10, N22–N24.
5. **N33 + N31 + N32**: popisky podle normy, výhled dne a „co když s autem“ (`FORECAST.md`); nejdřív N33, nepotřebuje žádná nová data.
6. **N9**: „kolik km ze slunce“ v historii auta, protože to jinde nemá nikdo.

## Zdroje

- [Power Flow Card Plus](https://www.github.com/flixlix/power-flow-card-plus) – uzly spotřebičů, zobrazení nuly, výpadek sítě
- [Predbat](https://springfall2008.github.io/batpred/what-does-predbat-do) – plánování po 5 min na 48 h, „What If“, cena na slot
- [EMHASS](https://emhass.readthedocs.io/en/latest/) – lineární plánování odložitelných zátěží, tepelná setrvačnost bojleru
- [evcc](https://docs.evcc.io/en/blog/2026/09/25/highlights-smart-battery-solar-share) – režim Smart, plány nabíjení, podíl slunce
- [Czech Energy Spot Prices](https://www.github.com/rnovacek/homeassistant_cz_energy_spot_prices) – spotové ceny pro HA
- [GoodWe fork s režimy EMS](https://www.github.com/mletenay/home-assistant-goodwe-inverter)
- [Solis + spot + Solcast](https://mkuthan.github.io/blog/2025/04/12/home-assistant-solar) – příklad řízení střídače
- [AI Task](https://www.home-assistant.io/integrations/ai_task/) a [Anthropic](https://home-assistant.io/integrations/anthropic) – Claude uvnitř Home Assistantu
- [Helios Forecast](https://github.com/ReikanYsora/Helios-Forecast), [Open-Meteo Solar Forecast](https://github.153394839.workers.dev/rany2/ha-open-meteo-solar-forecast), [Forecast.Solar v HA](https://www.home-assistant.io/components/forecast_solar) – předpověď výroby
