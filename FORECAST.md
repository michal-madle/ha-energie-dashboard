# Výhled dne, „co když“ a popisky podle situace – koncept

Návrh k výběru (nápady N9, N31–N34 v `IDEAS.md`), ne zadání. Vizuální návrh: canvas „Energie – Výhled dne, km ze slunce, popisky“ (čtyři artboardy: karta auta se seancí, historie po klepnutí, popisky, výhled). Čísla v návrhu jsou simulace pro čt 29. 10. 11:30, ne měření.

Vychází z toho, co jste napsal 29. 10.: popisky bez pevných limitů, výhled dne z vašich panelů, „když přestanu nabíjet teď, baterie bude večer mít tolik %“.

## 1. Panely v konfiguraci

```yaml
forecast:
  planes:
    - name: Východ
      kwp: 5.0            # 10 × 500 Wp, Aiko Neostar 2S
      azimuth: 82         # kompas: 0 sever, 90 východ, 180 jih, 270 západ
      tilt: 15
    - name: Západ
      kwp: 5.0
      azimuth: 262
      tilt: 15
  losses: 18              # % celkové ztráty (kabeláž, teplota, špína, střídač)
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

### Co z vašich panelů vychází (můj odhad, ne měření)

Jasná obloha, Roztoky, 2 × 5 kWp, sklon 15°, azimuty 82° a 262°, ztráty 18 % (model pvlib, Ineichen; ověřit proti skutečným dnům):

| Den | Výroba za den | Špička |
|---|---|---|
| 21. 12. | 9,8 kWh | 2,1 kW |
| 29. 10. | 18,6 kWh | 3,2 kW |
| 21. 3. | 34,1 kWh | 4,9 kW |
| 21. 6. | 61,6 kWh | 6,8 kW |

Východ + západ s malým sklonem dává široké ploché maximum, ale nízkou špičku: i v červnu ne víc než asi 7 kW z 10 kWp. Z toho plyne důležitý poznatek: **minimální nabíjecí výkon wallboxu 4,2 kW slunce samo pokryje (po odečtu domu) až od března do září kolem poledne**. Od října do února se auto ze samotného přebytku nenabije; nabíjení probíhá z baterie a sítě. Výhled to ukáže čárou „minimum pro auto 4,2 kW“ v grafu.

## 3. Předpověď baterie a „co když“

Simulace po 15 minutách od teď do půlnoci a do rána:

- vstupy: korigovaná předpověď výroby, základní spotřeba domu (medián stejné hodiny za 28 dní, zvlášť pracovní den a víkend, bez auta a bojleru), kapacita baterie (`battery.capacity` 11,2 kWh), rezerva (ze střídače, dnes 20 %), limity nabíjení a vybíjení, účinnost asi 95 % v každém směru;
- tok: výroba → dům → baterie → (přebytek) auto / bojler / síť podle pravidel routeru; deficit: baterie do rezervy, pak síť;
- scénáře auta: **přestat teď**, **nabíjet do cíle** (kdy skončí, spočítá se z nabití auta, kapacity 36,7 kWh a výkonu), **jen z přebytku** (auto jede, jen když přebytek dosáhne minima wallboxu; v říjnu tedy nejede);
- výstup: nabití baterie ve zvolený čas (22:00, 6:00), čas dosažení rezervy, kWh ze sítě, kWh do auta (a z toho ze slunce), scénář P10 („když bude horší počasí“).

Příklad (simulace 29. 10. 11:30, auto 4,2 kW, baterie 46 %):

| Scénář | Baterie 22:00 | Rezerva od | Ze sítě dnes |
|---|---|---|---|
| Přestat teď | 27 % | 23:15 | 2,4 kWh |
| Do 80 % (do 14:30) | 20 % | 13:00 | 14,5 kWh (auto +12,6, ze slunce 5,1) |

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

## 6. Co z toho vybrat

Doporučené pořadí: (1) popisky podle normy (N33) – nepotřebují žádná nová data; (2) úroveň 0 výhledu (N31) s kartou „co když“ (N32); (3) Open-Meteo Solar Forecast jako úroveň 1; (4) km ze slunce (N9); (5) Claude jen k vysvětlení (N34).

## Zdroje

- [Open-Meteo Solar Forecast (HACS)](https://github.153394839.workers.dev/rany2/ha-open-meteo-solar-forecast), [Forecast.Solar v HA](https://www.home-assistant.io/components/forecast_solar), [evcc + Open-Meteo](https://docs.evcc.io/en/nightly/tariffs/open-meteo)
- [Helios Forecast](https://github.com/ReikanYsora/Helios-Forecast), [Predbat](https://springfall2008.github.io/batpred/what-does-predbat-do), [oprava předpovědi z posledních 7 dní](https://community.home-assistant.io/t/automatic-error-correction-for-solar-forecast-based-upon-last-7-days/916110)
- [AI Task](https://www.home-assistant.io/integrations/ai_task/), [Anthropic v HA](https://home-assistant.io/integrations/anthropic)
