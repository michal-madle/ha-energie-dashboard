# Výhled dne, „co když“ a popisky podle situace – koncept

Návrh k výběru (nápady N9, N31–N34 v `IDEAS.md`), ne zadání. Vizuální návrh: canvas „Energie – Výhled dne, km ze slunce, popisky“ (čtyři artboardy: karta auta se seancí, historie po klepnutí, popisky, výhled). Čísla v návrhu jsou simulace pro čt 29. 10. 11:30, ne měření.

Vychází z toho, co jste napsal 29. 10.: popisky bez pevných limitů, výhled dne z vašich panelů, „když přestanu nabíjet teď, baterie bude večer mít tolik %“.

## 1. Panely v konfiguraci

```yaml
forecast:
  planes:
    - name: Východ
      kwp: 5.0            # 10 × 500 Wp, Aiko Neostar 2S (celkem 20 panelů = 10 kWp)
      azimuth: 82         # kompas: 0 sever, 90 východ, 180 jih, 270 západ
      tilt: 15
    - name: Západ
      kwp: 5.0
      azimuth: 262
      tilt: 15
  losses: 0               # % ztráty; kalibruje se z vašich dní (v květnu a červnu 10 kW z 10 kWp)
  inverter_kw: 10         # ořez výkonu (GW10KN-ET)
  weather: weather.forecast_domov   # entita počasí v Home Assistantu (hodinová předpověď); ověřit název
  forecast_entity:        # volitelné: hotová hodinová předpověď (viz úroveň 1)
```

Azimut: HA a Forecast.Solar používají kompas (0 sever, 90 východ, 180 jih, 270 západ), takže 82° a 262° zadáte přímo. Open-Meteo API a evcc používají 0 = jih, −90 = východ, +90 = západ, tj. 82° → −98° a 262° → +82°.

## 2. Jak se spočítá výroba (tři úrovně)

| Úroveň | Odkud předpověď | Co potřebuje | Přesnost |
|---|---|---|---|
| **0 – jen karta** | Slunce a jasná obloha spočítané z polohy domu, panelů a data (bez internetu), krát útlum oblačností z předpovědi počasí v HA | entita `weather` s hodinovou předpovědí | hrubá, ale funguje hned |
| **1 – integrace** | hodinová předpověď z [Open-Meteo Solar Forecast](https://github.153394839.workers.dev/rany2/ha-open-meteo-solar-forecast) (HACS, zdarma, více rovin, azimut kompasem), [Forecast.Solar](https://www.home-assistant.io/components/forecast_solar) (více rovin jen v placeném účtu) nebo Solcast | integrace v HA, karta čte její entity | dobrá |
| **2 – samoučící** | například [Helios Forecast](https://github.com/ReikanYsora/Helios-Forecast): fyzika z Open-Meteo plus naučená oprava po hodinách, pásmo P10/P90 a rovnou předpověď nabití baterie | kumulativní čítač výroby (kWh) | nejlepší, mladý projekt |

Na všech úrovních karta přidá **vlastní korekci z vašich dní**: poměr skutečné a předpovězené výroby po hodinách za posledních 14 dní (medián, omezený na 0,5–1,3; v létě se nepočítají hodiny, kdy střídač drží vývoz na limitu 5 kW; mimo léto se to neděje). Stejný princip používá Helios a jednodušší varianta z komunity (7denní průměr chyby, ±10 % na den: [HA komunita](https://community.home-assistant.io/t/automatic-error-correction-for-solar-forecast-based-upon-last-7-days/916110)). Rozptyl poměru dává pásmo „pravděpodobný rozsah“ (jako PV10/PV90 v [Predbatu](https://springfall2008.github.io/batpred/what-does-predbat-do)).

Úroveň 0 vzorec: výkon roviny = `kWp × GTI / 1000 × (1 − ztráty)`; GTI z jasné oblohy a polohy slunce na rovinu (sklon, azimut), oblačnost podle Kasten–Czeplak `GHI = GHI_jasno × (1 − 0,75 × oblačnost^3,4)`, oblačnost 0–1. Dvě roviny se sečtou a ořežou na výkon střídače.

### Co z vašich panelů vychází (odhad, bude se kalibrovat)

Panely: 20 × 500 Wp = 10 kWp (10 na východ 82°, 10 na západ 262°, sklon 15°), špička v květnu a červnu 10 kW (uživatel 29. 10.). Jasná obloha, Roztoky, dvě roviny po 5 kWp, model pvlib (Ineichen), **bez ztrát** a s čistým vzduchem (Linke 2,5); k tomu faktor 1,1, aby červnová špička seděla s vaší naměřenou (model sám dal 9,0 kW, střídač 10 kW pak špičku ořeže). Můj první pokus se ztrátami 18 % dával jen 6,8 kW a podhodnocoval o třetinu, proto karta nesmí věřit modelu naslepo a učí se z vašich dní (bod výše).

| Den | Výroba za jasný den | Špička |
|---|---|---|
| 21. 12. | asi 12 kWh | asi 2,6 kW |
| 29. 10. | teorie asi 27 kWh, **v datech nejlepší dny 17 až 17,5 kWh** | teorie 4,6 kW, **v datech 3,2 až 3,3 kW** (hodinový průměr) |
| 21. 3. | asi 46 kWh | asi 7,1 kW |
| 15. 5. a 21. 6. | asi 85 kWh | 10 kW (ořez střídačem) |

Východ + západ dává široké ploché maximum.

**Kalibrace na vašich datech (export 15. až 29. 10., 14 dní):** model nad říjnovým sluncem přestřeluje asi o třetinu až o 40 %. Nejlepší dny vyrobily 16,6 až 17,5 kWh (15., 16., 22., 26., 27. 10.), hodinový průměr výkonu nejvýš 3,2 až 3,3 kW (okamžitá špička vzorku 5,4 až 5,7 kW). Dny 18., 19. a 25. 10. byly zataženo (4 až 8 kWh). Dnešek (13,8 kWh do 19:00) je tedy **běžný dobrý říjnový den**, ne pošmourný. Ostatní řádky tabulky (prosinec, březen) jsou stejný teoretický horní odhad a opraví je učená korekce, orientačně násobkem 0,65 až 0,7. Červnovou špičku 10 kW udává uživatel. Pozor na ořez: 26. a 27. 10. dosáhla baterie 100 % a výroba 12 až 14 h zůstala pod možnostmi (dům bral jen 0,5 kW, vývoz nulový), do učení se tyto hodiny nepočítají.

**Pozor na závěr z minima wallboxu.** Moje první verze z toho dělala pravidlo „od října do března auto nenabíjet“ (slunce samo nedosáhne 4,2 kW + dům). To je špatná otázka. Uživatel 29. 10.: „Aktuálně když svítí 2 kW tak nechám baterii nabít na nějakou hodnotu třeba 50 % a pak pustím wallbox. 2 kW jdou ze slunce a 2 z baterie. Po skončení se zase baterie vrátí a dobije.“ Baterie je zásobník a rozhoduje **energie za celý den**, ne okamžitý výkon. Správná otázka je: kolik z auta se po celém dni vyrovná sluncem a kolik se vrátí ze sítě večer a v noci. Karta proto neříká „nenabíjej“, ale ukáže důsledky a nechá rozhodnutí na vás; vaše metoda je v návrhu výchozí scénář (viz bod 3).

## 3. Předpověď baterie a „co když“

Simulace po 15 minutách od teď do půlnoci a do rána:

- vstupy: korigovaná předpověď výroby, základní spotřeba domu (medián stejné hodiny za 28 dní, zvlášť pracovní den a víkend, bez auta a bojleru), kapacita baterie (`battery.capacity` 11,2 kWh), rezerva (ze střídače, dnes 20 %), limity nabíjení a vybíjení, účinnost asi 95 % v každém směru;
- tok: výroba → dům → baterie → (přebytek) auto / bojler / síť podle pravidel routeru; deficit: baterie do rezervy, pak síť;
- scénáře auta: **vaše metoda** (wallbox start při baterii ≥ 50 % a slunci ≥ 2 kW, stop při baterii ≤ 30 %, parametry nastavitelné), **nenabíjet**, **nabíjet do cíle** (kdy skončí, spočítá se z nabití auta, kapacity 36,7 kWh a výkonu), **jen z přebytku** (volitelně: auto jede, jen když přebytek dosáhne minima wallboxu);
- výstup: nabití baterie ve zvolený čas (22:00, 6:00), čas dosažení rezervy, kWh ze sítě, kWh do auta (a z toho ze slunce), scénář P10 („když bude horší počasí“).

Příklad (simulace 29. 10. 11:30, auto 4,2 kW, baterie 46 %):

| Scénář | Baterie 22:00 | Rezerva od | Ze sítě dnes |
|---|---|---|---|
| Nenabíjet | 27 % | 23:15 | 2,4 kWh |
| Vaše metoda (50 % → wallbox → stop při 30 %) | 20 % | 18:45 | 7,4 kWh (auto +5,2 kWh) |
| Do 80 % (do 14:30) | 20 % | 13:00 | 14,5 kWh (auto +12,6, ze slunce 5,1) |

Dnešek v tabulce je běžný dobrý říjnový den (výroba 14 až 15 kWh), nikoli pošmourný; dřívější popisek „pošmourno“ i scénář „jasný den ×1,9“ (13,7 kWh do auta) jsem opravil, protože nejlepší dny ve vašich datech jsou jen asi ×1,2.

**Zpětné přehrání vaší metody na skutečných datech (15. až 28. 10.).** Skutečná hodinová výroba a spotřeba domu bez odhadnutého auta, baterie 11,2 kWh, rezerva 20 %, začátek dne na 20 %, wallbox 4,2 kW, start při baterii ≥ 50 % a slunci ≥ 2 kW před 17:00, stop při ≤ 30 %. Model je hodinový a zjednodušený, nezná vaše dobíjení ze sítě v noci ani ráno.

| Den | Výroba | Auto | Ze sítě navíc | Čistě ze slunce |
|---|---|---|---|---|
| 15. 10. | 16,6 kWh | 4,2 | 0 | 4,2 |
| 16. 10. | 17,0 | 5,2 | 1,4 | 3,9 |
| 17. 10. | 15,3 | 4,2 | 1,3 | 2,9 |
| 20. 10. | 14,0 | 4,2 | 0 | 4,2 |
| 21. 10. | 14,5 | 4,2 | 1,8 | 2,4 |
| 22. 10. | 17,5 | 10,5 | 3,3 | 7,2 |
| 24. 10. | 13,9 | 3,2 | 0,1 | 3,0 |
| 26. 10. | 16,8 | 8,4 | 2,0 | 6,4 |
| 27. 10. | 16,6 | 9,5 | 7,4 | 2,1 |
| 18., 19., 23., 25., 28. 10. | 4 až 11,5 | 0 | 0 | 0 (baterie nedosáhla 50 %) |

Závěr z dat: za běžného dobrého dne v říjnu vaše metoda dá do auta 3 až 10 kWh a skoro celé ji pokryje slunce (síť navíc 0 až 3 kWh, jednou 7). Za zataženo se vůbec nespustí, což je správně. To odpovídá i skutečnosti: ve vašich datech jste při nabíjení 16., 21., 22. a 29. 10. brali ze sítě kolem 0,1 kW. Okamžitý práh 4,2 kW by tedy auto zakázal a ve skutečnosti se nabíjí, takže práh „kolik mi dá slunce teď“ se z návrhu definitivně ruší; karta počítá energii za celý den.

Samostatná zjištění: 19. 10. v 5 a 6 h, 20. 10. v 8 h, 25. 10. v 12 a 13 h a 26. 10. v 7 h jste nabíjeli auto ze sítě o výkonu 6 až 10,5 kW (boost nebo HDO), 25. 10. dohromady asi 22 kWh. To je legitimní, jen se na kartě má ukázat jako „ze sítě“, ne jako chyba.

**Kdy začít, kdy přestat:** *Začít* = první čas, od kterého předpověď přebytku (výroba − základ domu) přesáhne minimum wallboxu na 30 minut. *Přestat* = nejpozdější čas, při kterém baterie večer (ve 22:00, v pesimistickém scénáři P10) zůstane nad cílem, který nastavíte (např. 30 %). Najde se půlením intervalu v simulaci. Výsledek se řekne větou: „Nabíjejte nejdéle do 13:20, jinak baterie večer nevydrží.“

Upozornění: model je zjednodušený. Váš měřený jev, kdy SOC pod asi 30 % při velkém odběru (kolem 5 kW) náhle klesá, model nezná. Pod 30 % proto předpověď označí jako nejistou (navazuje na E21 a data pro servis).

## 4. Popisky podle situace (žádné pevné limity)

Pevný práh (například „spotřeba nad 2 kW je vysoká“) je v zimě večer a v létě v poledne jiný. Řešení je porovnávat s tím, co je běžné **u vás, v tuto hodinu, v tomto ročním období**:

1. **Normy.** Z dlouhodobých statistik (karta je už čte pro baterii) se pro každý údaj (spotřeba domu, dodávka, odběr, baterie, výroba) spočítá prostřední polovina hodnot (25.–75. percentil) pro stejnou hodinu a typ dne za posledních 28 dnů (±14 dnů roku, když je historie delší).
2. **Index jasné oblohy.** Výroba / výroba za jasné oblohy v tuto chvíli (z úrovně 0). Říká „slunce dává 92 % možného“ bez ohledu na roční dobu.
3. **Události.** Odchylka od normy, baterie krmí auto nebo bojler, ořez výroby, rezerva, zastaralá data, zamýšlená změna toku. Každá má váhu a typ (informace / odchylka).
4. **Věta ze šablony** (česky, anglicky, švédsky; bez internetu a bez AI): „Dům jede z baterie. Odběr 1,3 kW je v tuto hodinu běžný. Baterie vydrží do cca 23:10.“ Vždy platí jako záloha.
5. **Claude jen při události** (volitelné): doplní jednu až dvě věty vysvětlení s čísly, která dostal. Pravidla: dostane hotová fakta, ne surová data; výstup se ověří (každé číslo v textu musí být ve vstupu), jinak se použije šablona; nejvýš jednou za 15 minut; označeno „Shrnutí od Claude“.

Příklad volání (`ai_task`, HA 2026.10; entita podle vaší instalace):

```yaml
action: ai_task.generate_data
data:
  task_name: Co se děje
  entity_id: ai_task.claude          # ověřit v Nástroje pro vývojáře → Stavy
  instructions: >
    Jsi stručný energetický poradce. Použij JEN čísla z faktů, žádná nevymýšlej.
    Česky, max 2 věty, bez emoji.
    Fakta: {{ fakta | tojson }}
  structure:
    headline:
      description: "Nadpis, max 40 znaků"
      required: true
      selector:
        text:
    detail:
      description: "Vysvětlení, max 160 znaků"
      required: true
      selector:
        text:
response_variable: situace
```

Spouštěč: šablonový binární senzor „situace se změnila“ (nová událost s váhou nad prahem) po dobu 2 minut a od posledního volání uplynulo 15 minut.

## 5. Km ze slunce (N9)

Na hlavní kartě zůstává jen pruh „Odkud auto nabíjí“ pro aktuální seanci (rozhodnuto 29. 10.); km ze slunce jsou v historii po klepnutí (1 / 7 / 30 dní). Karta už dopočítává, odkud auto bere (waterfall zdroj → spotřeba v `model.ts`). Totéž se dá spočítat v HA a integrovat do energií:

```yaml
template:
  - sensor:
      - name: Auto ze slunce
        unique_id: energie_auto_ze_slunce
        unit_of_measurement: W
        device_class: power
        state_class: measurement
        state: >
          {% set pv = states('sensor.goodwe_pv_power')|float(0) %}
          {% set car = states('sensor.wallbox_total_power')|float(0) %}
          {% set boil = states('sensor.tuv_power_total')|float(0) %}
          {% set house = states('sensor.goodwe_house_consumption')|float(0) %}
          {% set rest = [house - car - boil, 0]|max %}
          {{ [car, [pv - rest, 0]|max]|min|round(0) }}
      - name: Auto z baterie
        unique_id: energie_auto_z_baterie
        unit_of_measurement: W
        device_class: power
        state_class: measurement
        state: >
          {% set pv = states('sensor.goodwe_pv_power')|float(0) %}
          {% set bat = [states('sensor.goodwe_battery_power')|float(0), 0]|max %}
          {% set car = states('sensor.wallbox_total_power')|float(0) %}
          {% set boil = states('sensor.tuv_power_total')|float(0) %}
          {% set house = states('sensor.goodwe_house_consumption')|float(0) %}
          {% set rest = [house - car - boil, 0]|max %}
          {% set sun_car = [car, [pv - rest, 0]|max]|min %}
          {% set bat_for_house = [bat, [rest - pv, 0]|max]|min %}
          {{ [car - sun_car, bat - bat_for_house]|min|max(0)|round(0) }}
```

Pak v Nastavení → Pomocníci: dva **Integrály (Riemann)** z těchto senzorů do kWh a **měřič spotřeby** (měsíční cyklus). Km ze slunce za měsíc = `nabito ze slunce / nabito celkem × ujeto` (`sensor.wby8p210007k43709_nabita_energie_tento_mesic`, `sensor.i3_120_driving_distance_this_month`). Je to odhad (wallbox rozdělení neměří); stejný princip jako E11.

## 6. Export dat a šablona popisků

Aby popisky seděly na vaši skutečnost, ne na moje odhady, potřebuju hodinová data za posledních 14 dní. `tools/export_hodiny.py` je přečte z dlouhodobých statistik Home Assistantu (ty se na rozdíl od stavů nemažou po 10 dnech) a vytvoří:

- `energie_hodiny.csv`: jeden řádek na hodinu, průměr, minimum a maximum výkonu FVE, baterie, sítě, domu, wallboxu, bojleru a nabití baterie a auta;
- `popisky_sablona.csv`: stejné hodiny a prázdné sloupce `hlavni_karta_veta`, `auto_veta`, `bojler_veta`, `poznamka`;
- `export_report.txt`: které entity statistiky nemají.

Postup je v záhlaví skriptu (token, `pip install websocket-client`, spuštění). Skript jen čte; protokol WebSocket jsem ověřil proti vlastnímu simulovanému serveru, ne proti vašemu Home Assistantu, takže první spuštění prosím zkontrolujte (`export_report.txt`). Kdo nechce skript, může v panelu Historie vybrat entity a použít „Stáhnout data“, ale stavy se drží jen 10 dní.

Co pak: z CSV hodinu po hodině vypíšu, co by karta napsala a kde (hlavní karta, auto, bojler), a vy do šablony přepíšete věty, které se vám nelíbí. Z vašich oprav odvodím šablony vět a pásma „běžně“.

## 6b. Wallbox a bojler bez statistik

`sensor.wallbox_total_power` a `sensor.tuv_power_total` nemají `state_class`, takže Home Assistant pro ně nedrží dlouhodobé statistiky, jen stavy za posledních asi 10 dní. Export proto u nich sáhne po historii stavů (hodinový časově vážený průměr). Od teď se statistiky naplní po přidání `examples/statistiky_wallbox_bojler.yaml` (`state_class: measurement`); pro hlavní kartu je to potřeba i kvůli normě pro hodinu a roční dobu.

## 7. Co z toho vybrat

Doporučené pořadí: (1) popisky podle normy (N33) – nepotřebují žádná nová data; (2) úroveň 0 výhledu (N31) s kartou „co když“ (N32); (3) Open-Meteo Solar Forecast jako úroveň 1; (4) km ze slunce (N9); (5) Claude jen k vysvětlení (N34).

## 8. Slunce: popup a detail (návrh 30. 10.)

**Implementováno 30. 10.** (`src/sun.ts`, `src/sun-data.ts`; specifikace v `CURRENT_SPEC.md`, oddíl Slunce). Oproti konceptu výše karta nepočítá fyziku z panelů (`forecast.planes` se nepoužívá): kWh dne čte z entit integrace předpovědi, tvar dne bere z učené křivky a bez předpovědi odhaduje z tempa. Popup nemá legendu toku (uživatel 30. 10.).

Návrh je v Design artefaktu (boardy 5 až 8). Rozhodnutí z komentářů uživatele (30. 10.):

- **Popup:** jen výkon teď, „kam teď slunce jde“ (dům, baterie, auto, bojler) a tři řádky (dnes zatím, odhad dne, začátek a konec výroby). **Žádné „% možného“:** je nepřesné (záleží na špíně a zahřátí panelů) a uživatel s ním nic neudělá; procento zůstává jen jako malá informace v detailu (Historie).
- **Odhad vždy s „≈“, rozsahem a jistotou.** Ráno je odhad hodně nepřesný, odpoledne téměř jistý; jistota (nízká, střední, vysoká) se počítá z podílu dne, který už proběhl, a z rozptylu odchylek předpovědi za posledních 14 dní. Velké číslo bez znaménka vypadá jako jistota, proto se nikdy neukazuje samotné.
- **Křivka „možné“ se učí z historie:** pro každou hodinu a roční dobu je to horní kvantil (kolem 90 %) výroby z posledních dní, v létě bez hodin, kdy střídač drží vývoz na limitu 5 kW, spojený s fyzikou (poloha slunce) pro dny bez dat. S podzimem **klesá** (kratší dny, nižší slunce): v říjnu asi o 0,15 až 0,2 kWh denně. Stejná křivka se používá v grafu dne, v „podílu možného“ v Historii a v předpovědi dalších dnů.
- **Žádné „nevyužité slunce“ ani komentář k omezení výkonu** (uživatel 30. 10.): střídač drží vývoz na 5 kW, ale jen v létě, když je vše nabité a nahřáté a odpoledne svítí přes 5,5 kW; jindy se to neděje a za přetoky skoro nic nedostává. Karta to nikde nekomentuje (v létě se jen vynechají tyto hodiny z učení křivky možného). Dřívější domněnka o ořezu 26. a 27. 10. byla chybná.
- **Texty a hinty nepatří do panelů.** Vysvětlivky jsou za malým ⓘ, které se ukáže až po klepnutí (bublina přes kartu, druhé klepnutí ji zavře): jistota odhadu, pruh „podíl z možného dne“, zdroj předpovědi, čára možného a barvy bloků dne.
- **Záložky detailu: Dnes, Historie, Výhled** (v tomto pořadí). Historie má přepínač rozsahu **7 dní / 30 dní** (bez „1 den“, ten je Dnes). V Dnes je graf výkonu hned pod číslem „výkon teď“.
- **Historie, graf po dnech:** přepínač **Celkem / Denní doba**. Denní doba je plošný graf (hladké vrstvy mezi dny) o pěti blocích (do 9, 9–11, 11–13, 13–15, od 15 h), bez černého dělení, jen tenká světlá linka; barvy od východu k západu v klidném přechodu od tmavší oranžové přes žlutou (poledne) po světle žlutou (uživatel 30. 10.: méně diverzifikovat). Možné množství za den je šedá stopa za každým sloupcem (hodnoty kWh nad sloupci), vysvětlení je za ⓘ. Dlaždice: nejlepší den, nejhorší den, špička týdne/měsíce, délka výroby (podzim zkracuje: 9,7 h proti 10,7 h před týdnem), dobré dny (nad 10 kWh) a malý půlkruh východ/západ.
- **Popup a detail Dnes sdílejí jeden panel „Dnes zatím 8,5 kWh, z odhadu ≈ 13,8“** s malým kolečkem; vedle něj v popupu časy „Začala 7:08“ a „Skončí asi 16:50“ v jedné dlaždici, obě stejně vysoké.
- **Poměr východ/západ** jen jako malá informace (půlkruh), ozve se až při vychýlení.

### 8b. Výhled: co zobrazit (výběr z dat, 30. 10.)

Zadání uživatele: projít jiné dashboardy, `IDEAS.md` a všechny senzory a data, která máme nebo můžeme získat, a vybrat, co patří do Výhledu. Rozhodnutí z komentářů: **jeden panel „Pět dní dopředu“** (každý den jeden řádek: počasí, hodinový pruh od 6 do 17 h, kde plná žlutá je výkon aspoň 2 kW, vpravo kWh a hodiny nad 2 kW; „kompaktně, jeden řádek na položku“), karta „Jak se předpověď trefovala“ je v **Historii** (pod grafem).

**Jak to dělají jiní:** integrace Forecast.Solar a Solcast pro HA dávají energii dnes a zítra, výkon teď a v příští hodině, čas a výšku špičky dnes, zbývající energii dneška a pásmo 10/90 %; evcc používá předpověď pro plán nabíjení a „nejlevnější okno“; Predbat a EMHASS z ní skládají plán baterie a ceny; Solariance nabízí akci „nejlepší čas pro spotřebič na solár“.

| Data | Zdroj | Ve Výhledu |
|---|---|---|
| Odhad dneška, rozsah, jistota, dosud vyrobeno | předpověď + `sensor.goodwe_today_s_pv_generation` ✔ | **ano** (hero) |
| Pět dní: kWh, počasí, hodinový tvar | Open-Meteo / `weather` entita ＋ | **ano** (panel) |
| Baterie plná v…, SOC ve 22:00, auto ze slunce (kWh a km), ze sítě v noci | simulace z N32: předpověď + běžná spotřeba + vaše metoda; `sensor.goodwe_battery_state_of_charge`, kapacita 11,2 kWh, rezerva 20 % ✔, spotřeba auta 0,34 kWh/km z `…nabita_energie_tento_mesic` a `…driving_distance_this_month` ✔ | **ano** („Dnes do večera“) |
| Délka dne a její změna | `sun.sun` (východ, západ) ✔ | **ano** (dlaždice „Den“) |
| Nejlepší den týdne (kWh a hodiny) | z pětidenní předpovědi | **ano** (dlaždice) |
| Sezóna: odhad výroby dalších měsíců | model + historie; po roce provozu skutečná data z `sensor.goodwe_total_pv_generation` | později (po prvním roce) |
| Kdy zítra začít nabíjet auto (okno nad 2 kW) | pruh dne už to ukazuje | v pruhu, ne zvlášť |
| Spotová cena a nejlevnější hodiny, HDO | HACS Czech Energy Spot Prices ＋, `sensor.master_hdo` ✔ | ne do Slunce; patří do N6, N7, N22 |
| Teplota panelů, sníh, vlhkost, déšť | Open-Meteo ＋ | ne (zbytečný detail); sníh jen jako varování, pokud se ukáže, že kryje panely |
| Střídač: napětí sítě, stringy PV1/PV2, teploty | GoodWe ✔ | ne do Výhledu; N12, N16, N17 |
| Bojler: teplota, cíl | `sensor.tuv_temperature`, `number.tuv_2_1_target_temperature` ✔ | ne; patří k bojleru |

Pravidlo výběru: do Výhledu jen to, co odpovídá na „co dnes a v příštích dnech udělám“ (kdy svítí, kolik z toho půjde do baterie a auta, kdy pustit velké spotřebiče). Čísla v návrhu jsou ilustrační.

## Zdroje

- [Open-Meteo Solar Forecast (HACS)](https://github.153394839.workers.dev/rany2/ha-open-meteo-solar-forecast), [Forecast.Solar v HA](https://www.home-assistant.io/components/forecast_solar), [evcc + Open-Meteo](https://docs.evcc.io/en/nightly/tariffs/open-meteo)
- [Helios Forecast](https://github.com/ReikanYsora/Helios-Forecast), [Predbat](https://springfall2008.github.io/batpred/what-does-predbat-do), [oprava předpovědi z posledních 7 dní](https://community.home-assistant.io/t/automatic-error-correction-for-solar-forecast-based-upon-last-7-days/916110)
- [AI Task](https://www.home-assistant.io/integrations/ai_task/), [Anthropic v HA](https://home-assistant.io/integrations/anthropic)
