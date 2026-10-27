# ENTITY_MAP – mapa entit

Stav: **potvrzeno** = entita, jednotka a třída jsou v exportu `HA entities/energie.json` (24. 10. 2026, 22:53); **k ověření** = export ji nepotvrzuje celou (znaménko, seznam hodnot, obsah skriptu). Export vytváří šablona `HA entities/export_entit.jinja` (postup v `HA entities/README.md`).

Zdroje: **E** = export 24. 10.; **Z** = zadání 24. 10. (stav k 17. 10.); **Y** = YAML dnešního dashboardu a screenshot (24. 10.); **M** = Memory (14.–19. 10.); **Měř.** = měření uživatele. Otevřené rozpory mezi zdroji jsou v `AUDIT.md`.

## FVE, baterie, elektroměr (střídač GoodWe GW10KN-ET, integrace GoodWe)

| Entita | Význam | Jednotka / třída (E) | Znaménko / hodnoty | Zdroj | Stav |
|---|---|---|---|---|---|
| `sensor.goodwe_pv_power` | výkon FVE | W, `power`, `measurement` | ≥ 0 (součet vstupů PV, knihovna goodwe 0.4.10, `et.py`) | E, Z, Y | potvrzeno |
| `sensor.goodwe_battery_power` | výkon baterie | W, `power`, `measurement` | kladné = vybíjení, záporné = nabíjení (Měř. 15. 10.: −3360 W při nabíjení; E v noci +274 W) | E, Z, Y, Měř. | potvrzeno |
| `sensor.goodwe_battery_state_of_charge` | nabití baterie | %, `battery`, `measurement` | 0–100 | E, Z, Y | potvrzeno |
| `sensor.goodwe_house_consumption` | spotřeba domu | W, `power`, `measurement` | počítaná: PV + baterie − `sensor.goodwe_active_power` (goodwe 0.4.10, `et.py`; E: 0 + 274 − (−119) = 393 W); zahrnuje wallbox (Měř. 15. 10.) a podle uživatele 25. 10. i bojler (dům 10,7 kW = auto 1,4 + bojler 4,0 + ostatní 5,3 kW); přímé ověření bojleru chybí | E, Z, Y, Měř. | potvrzeno (bojler k ověření) |
| `sensor.goodwe_meter_active_power_total` | výkon na elektroměru | W, `power`, `measurement` | záporné = odběr ze sítě (Měř. v noci, E −103 W); kladné = přetok **k ověření** při větším přetoku | E, Z, Y, Měř. | potvrzeno (přetok k ověření) |
| `sensor.goodwe_total_pv_generation` | čítač výroby FVE | kWh, `energy`, `total_increasing` | ověřeno proti SEMS+ (15. 10.: +16,6 kWh) | E, Z, M | potvrzeno |
| `sensor.goodwe_total_battery_charge` | čítač nabití baterie | kWh, `energy`, `total_increasing` | SEMS+ 15. 10.: +9,8 kWh | E, Z, M | potvrzeno |
| `sensor.goodwe_total_battery_discharge` | čítač vybití baterie | kWh, `energy`, `total_increasing` | SEMS+ 15. 10.: +3,7 kWh (SEMS 3,8) | E, Z, M | potvrzeno |
| `sensor.goodwe_meter_total_energy_import` | čítač odběru ze sítě | kWh, `energy`, `total_increasing` | SEMS+ 15. 10.: +1,04 kWh | E, Z, M | potvrzeno |
| `sensor.goodwe_meter_total_energy_export` | čítač přetoku do sítě | kWh, `energy`, `total_increasing` | SEMS+ 15. 10.: +0,03 kWh | E, Z, M | potvrzeno |
| `number.goodwe_depth_of_discharge_on_grid` | hloubka vybití baterie | %, rozsah 0–99 | E: 80 % = rezerva 20 % (knihovna počítá DoD = 100 − registr 45356, goodwe 0.4.10 `et.py`; Home Assistant `goodwe/number.py`)| E | potvrzeno |

Existuje, ale spec nepoužívá (E): `sensor.goodwe_today_energy_import` a `sensor.goodwe_today_energy_export` (**nejsou čítače sítě**, Z; E: 0,1 a 8,0 kWh), `sensor.goodwe_active_power` (W, záporné = odběr; registr 35140, ze kterého se počítá spotřeba domu), `sensor.goodwe_load` (W; E 382 W), `sensor.goodwe_total_power` (W), `number.goodwe_grid_export_limit` (5000 W), `select.goodwe_inverter_operation_mode` (`general`; možnosti `general`, `off_grid`, `backup`, `eco`, `peak_shaving`), `button.goodwe_synchronize_inverter_clock`. Integrace čte střídač každých 10 s (`SCAN_INTERVAL`, Home Assistant 2026.10.1, `homeassistant/components/goodwe/const.py`).

## Wallbox (AZ Router, integrace z HACS)

| Entita | Význam | Jednotka / třída (E) | Znaménko / hodnoty | Zdroj | Stav |
|---|---|---|---|---|---|
| `sensor.wallbox_total_power` | výkon wallboxu | W, `power`, bez `state_class` | ≥ 0; celkový výkon za 3 fáze (uživatel 25. 10.) | E, Z, Y | potvrzeno |
| `sensor.wallbox_charge_status` | stav nabíjení | bez jednotky a třídy (není výčtový, nemá `options`) | `Disconnected` = odpojeno, `Waiting` = auto připojené a nenabíjí, `Charging` = nabíjí (Měř. 15. 10.; E `Waiting`); jiné hodnoty **k ověření** | E, Z, Y, Měř. | potvrzeno (seznam hodnot k ověření) |
| `switch.wallbox_boost` | boost wallboxu (nabíjení i ze sítě) | – | `on` / `off` | E, Z, Y | potvrzeno |
| `switch.wallbox_1_block_charging` | „Zablokovat nabíjení“: wallbox nenabíjí, bojler má přednost | – | `on` / `off` (E `off`) | E, uživatel 25. 10. | potvrzeno |
| `switch.wallbox_2_prioritize_when_connected` | „Aktivovat pokud je auto připojeno“: auto má přednost před bojlerem, dokud je připojené | – | `on` / `off` (E `on`) | E, uživatel 25. 10. | potvrzeno |

Existuje, ale spec nepoužívá (E): `sensor.wallbox_charge_status_code` (0 / 1 / 2 podle stavu, Měř. 15. 10.; E 1), `sensor.wallbox_charge_state` (E 0), `sensor.wallbox_current_l1`, `_l2`, `_l3` (**v mA, i když jednotka je A**, Měř. 15. 10.; E bez nabíjení 2), `sensor.wallbox_circuit_breaker` (16 A), `switch.wallbox_3_block_solar_charging` (off), `switch.wallbox_4_block_charging_from_battery` (off), `switch.wallbox_6_1_allow_solar_charging_only_in_time_window` (on, `time.wallbox_6_2_start_time` 08:00 – `time.wallbox_6_3_stop_time` 17:30), `number.wallbox_7_1_manual_charging_power`, `number.wallbox_9_2_power`, `number.wallbox_10_2_hdo_charging_power` (W **na fázi**, rozsah 1400–3700 po 100; celý odběr = 3 × hodnota, tedy 4,2–11,1 kW; uživatel 24. 10.; sedí 6–16 A × 230 V = 1,4–3,7 kW na fázi a jistič wallboxu 16 A, `sensor.wallbox_circuit_breaker`), `number.wallbox_6_4_trigger_on_power` (1100 W), `switch.master_master_boost` (off).

## Bojler (FVE) (AZ Router)

| Entita | Význam | Jednotka / třída (E) | Znaménko / hodnoty | Zdroj | Stav |
|---|---|---|---|---|---|
| `sensor.tuv_power_total` | výkon bojleru | W, `power`, bez `state_class` | ≥ 0 | E, Z, Y | potvrzeno |
| `sensor.tuv_temperature` | teplota vody v bojleru | °C, `temperature` | E 15 °C; na podzim normální, není chyba | E, Z, Y | potvrzeno |
| `switch.tuv_boost` | boost bojleru (název entity jen „Boost“) | – | `on` / `off` | E, Z, Y | potvrzeno |

Karta od kola 2 používá `number.tuv_2_1_target_temperature` (cíl z přebytku, 60 °C) a `number.tuv_2_2_boost_target_temperature` (cíl boostu, 55 °C). Existuje, ale spec nepoužívá (E): `number.tuv_1_max_power` (1325 W), `select.tuv_4_2_boost_mode` (`manual`; `manual`, `hdo`, `window`, `window+hdo`), `switch.tuv_3_1_keep_heated` (on), `switch.tuv_3_2_block_solar_heating` (off), `switch.tuv_3_3_block_heating_from_battery` (**off**), `switch.tuv_3_4_allow_solar_heating_only_in_time_window` (on, `time.tuv_3_4_1_window_start` 07:00 – `time.tuv_3_4_2_window_stop` 19:00), `sensor.tuv_power_l1`, `_l2`, `_l3`. Zařízení Master: `sensor.master_grid_power_total` (W, záporné = odběr; E −130 W), `sensor.master_routed_power_total`, `sensor.master_mode` (`Summer`), `sensor.master_hdo`.

## Zásobník (Plyn) (Tado)

| Entita | Význam | Jednotka / třída (E) | Znaménko / hodnoty | Zdroj | Stav |
|---|---|---|---|---|---|
| `water_heater.technicka_mistnost_tado_tepla_voda` | zásobník; stav = režim, atribut `temperature` = nastavená teplota | °C (atributy) | E: stav `auto`, `temperature` 40, `current_temperature` prázdné (naměřená teplota není), režimy `auto` / `heat` / `off`, rozsah 30–65 °C | E, Y | potvrzeno |

Existuje, ale spec nepoužívá (E): `binary_sensor.technicka_mistnost_tado_tepla_voda_connectivity` (on), `_overlay` (off), `_power` (on), `sensor.technicka_mistnost_tado_tepla_voda_tado_mode` (`HOME`).

## Mísení vody (ventily Nous L3, Tuya)

| Entita | Význam | Jednotka / třída (E) | Znaménko / hodnoty | Zdroj | Stav |
|---|---|---|---|---|---|
| `switch.technicka_mistnost_ventil_c1` | ventil C1 | `outlet` | Mísí = C1 `off` + C2 `on`; Nemísí = C1 `on` + C2 `off` (E: C1 `on`, C2 `off` = nemísí) | E, Y, Z | potvrzeno |
| `switch.technicka_mistnost_ventil_c2` | ventil C2 | `outlet` | viz C1 | E, Y, Z | potvrzeno |
| `script.prepnout_miseni_vody` | přepnutí mísení (v0 tlačítko) | režim skriptu `single` | obsah **k ověření** | E, Y | potvrzeno (obsah k ověření) |

Existuje, ale spec nepoužívá (E): `select.technicka_mistnost_ventil_c1_power_on_behavior`, `select.technicka_mistnost_ventil_c2_power_on_behavior` (oba `last`).

## Auto (BMW i3, BavarianData – jen čtení)

| Entita | Význam | Jednotka / třída (E) | Znaménko / hodnoty | Zdroj | Stav |
|---|---|---|---|---|---|
| `sensor.parkovani_bmw_i3_soc` | nabití auta (šablonový senzor: při `Charging` predikce integrace, jinak zobrazené nabití) | %, `battery`, `measurement` | 0–100 (E 49,6 = zobrazené nabití, auto nenabíjí) | E, Z, Y | potvrzeno |
| `sensor.i3_120_range_ev_remaining_range` | dojezd | km, `distance`, `measurement` | E 95 km | E, Z, Y | potvrzeno |

Obrázek auta (návrh, uživatel 24. 10.): entita `image.…` integrace BavarianData z exportu (E: 1 entita `image`, ID obsahuje VIN); adresa obrázku v atributu `entity_picture` (`/api/image_proxy/<entity_id>?token=…`, Home Assistant 2026.10.1). Stav: k ověření (export atributy obrázku nevypisuje).

Nepoužívá se: `sensor.i3_120_charging_port_plug_state` (nespolehlivé, Měř. 15. 10.; „auto připojeno“ se bere ze stavu wallboxu). Existuje, ale spec nepoužívá (E): `sensor.i3_120_battery_ev_displayed_state_of_charge`, `sensor.wby8p210007k43709_stav_nabiti_predikce_integrace` (zdroje šablonového senzoru), `sensor.wby8p210007k43709_stav_nabijeni` (výčet `nocharging`, `chargingactive`, …), `sensor.garaz_bmw_i3_2` (čas poslední zprávy z auta), `device_tracker.i3_120`. Poloha auta je v exportu skrytá.

## Jak často entity hlásí (export 24. 10. 2026, 22:53)

Podle `last_reported` v okamžiku exportu (ve 22:53:34):

| Systém | Poslední hlášení | Co z toho plyne |
|---|---|---|
| Střídač (GoodWe) | do 6 s | integrace se dotazuje každých 10 s |
| Wallbox, bojler (AZ Router) | do 10 s | hlásí průběžně (interval integrace neověřen) |
| Zásobník (Tado) | 11 min | hlásí řídce |
| Ventily, skript | 13:26 (start Home Assistantu) | hlásí jen při změně; stáří hlášení **neznamená** zastaralá data |
| Auto | nabití a dojezd 20:09, poslední zpráva 22:47 | hlásí podle událostí |

## Odkazy z dnešního dashboardu (v0)

| Cíl | Kde v v0 | Zdroj | Stav |
|---|---|---|---|
| `/dashboard-baterie` | podržení na uzlu Baterie | Y | k ověření (export entit nástěnky neobsahuje) |
| `/dashboard-bmw` | podržení na dlaždici BMW i3 | Y | k ověření |

## Chybějící údaje

| Co chybí | Poznámka |
|---|---|
| Znaménko elektroměru při přetoku | ověřit při větším přetoku (kladné = přetok?), TODO P1.11 |
| Zda spotřeba domu zahrnuje bojler | ověřit, když bojler topí, TODO P1.11 |
| Hodnoty `sensor.wallbox_charge_status` mimo tři známé | senzor není výčtový, export je neukáže (TODO P2.3) |
| Obsah `script.prepnout_miseni_vody` | přepíná oba ventily současně? (zadání to požaduje) |
