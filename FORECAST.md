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

Na všech úrovních karta přidá **vlastní korekci z vašich dní**: poměr skutečné a předpovězené výroby po hodinách za posledních 14 dní (medián, omezený na 0,5–1,3; hodiny, kdy střídač výrobu omezoval, se do učení nepočítají). Stejný princip používá Helios a jednodušší varianta z komunity (7denní průměr chyby, ±10 % na den: [HA komunita](https://community.home-assistant.io/t/automatic-error-correction-for-solar-forecast-based-upon-last-7-days/916110)). Rozptyl poměru dává pásmo „pravděpodobný rozsah“ (jako PV10/PV90 v [Predbatu](https://springfall2008.github.io/batpred/what-does-predbat-do)).

Úroveň 0 vzorec: výkon roviny = `kWp × GTI / 1000 × (1 − ztráty)`; GTI z jasné oblohy a polohy slunce na rovinu (sklon, azimut), oblačnost podle Kasten–Czeplak `GHI = GHI_jasno × (1 − 0,75 × oblačnost^3,4)`, oblačnost 0–1. Dvě roviny se sečtou a ořežou na výkon střídače.

### Co z vašich panelů vychází (odhad, bude se kalibrovat)

Panely: 20 × 500 Wp = 10 kWp (10 na východ 82°, 10 na západ 262°, sklon 15°), špička v květnu a červnu 10 kW (uživatel 29. 10.). Jasná obloha, Roztoky, dvě roviny po 5 kWp, model pvlib (Ineichen), **bez ztrát** a s čistým vzduchem (Linke 2,5); k tomu faktor 1,1, aby červnová špička seděla s vaší naměřenou (model sám dal 9,0 kW, střídač 10 kW pak špičku ořeže). Můj první pokus se ztrátami 18 % dával jen 6,8 kW a podhodnocoval o třetinu, proto karta nesmí věřit modelu naslepo a učí se z vašich dní (bod výše).

| Den | Výroba za jasný den | Špička |
|---|---|---|
| 21. 12. | asi 12 kWh | asi 2,6 kW |
| 29. 10. | asi 27 kWh | asi 4,6 kW |
| 21. 3. | asi 46 kWh | asi 7,1 kW |
| 15. 5. a 21. 6. | asi 85 kWh | 10 kW (ořez střídačem) |

Východ + západ dává široké ploché maximum.

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

Podobný výpočet pro jasný den 29. 10. (výroba × 1,9): vaše metoda dá do auta 13,7 kWh a večer ze sítě přibude 6,9 kWh proti nenabíjení (1,5 → 8,4 kWh), tedy čistě ze slunce asi 6,8 kWh. Dnes (pošmourno) jen 5,2 kWh do auta a čistě ze slunce asi 0,2 kWh; zbytek vrací síť v noci. Jestli se to vyplatí, záleží na ceně nočního proudu (HDO), proto má karta ukázat oba počty vedle sebe.

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

## 7. Co z toho vybrat

Doporučené pořadí: (1) popisky podle normy (N33) – nepotřebují žádná nová data; (2) úroveň 0 výhledu (N31) s kartou „co když“ (N32); (3) Open-Meteo Solar Forecast jako úroveň 1; (4) km ze slunce (N9); (5) Claude jen k vysvětlení (N34).

## Zdroje

- [Open-Meteo Solar Forecast (HACS)](https://github.153394839.workers.dev/rany2/ha-open-meteo-solar-forecast), [Forecast.Solar v HA](https://www.home-assistant.io/components/forecast_solar), [evcc + Open-Meteo](https://docs.evcc.io/en/nightly/tariffs/open-meteo)
- [Helios Forecast](https://github.com/ReikanYsora/Helios-Forecast), [Predbat](https://springfall2008.github.io/batpred/what-does-predbat-do), [oprava předpovědi z posledních 7 dní](https://community.home-assistant.io/t/automatic-error-correction-for-solar-forecast-based-upon-last-7-days/916110)
- [AI Task](https://www.home-assistant.io/integrations/ai_task/), [Anthropic v HA](https://home-assistant.io/integrations/anthropic)
