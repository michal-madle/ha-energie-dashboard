// Test scenarios for the Energie Dashboard card: a configuration and a fake `hass` object.
// Open /tests/harness.html?s=<scenario> (&theme=light for Home Assistant's light mode).
// Every scenario uses the configuration of examples/energie.yaml itself, read and parsed here;
// the scenarios differ in the entity states Home Assistant reports.
import "/ha-energie-dashboard.js";
import { parse } from "/node_modules/yaml/browser/index.js";

const params = new URLSearchParams(location.search);
const scenario = params.get("s") ?? "full";
const now = new Date().toISOString();

const config = parse(await (await fetch("/examples/energie.yaml")).text());
// The example hides the Bojler tile while it does not heat (boiler.show: heating); most tests need the tile.
config.boiler.show = "always";

const state = (value, attributes = {}) => ({ state: value, attributes, last_changed: now, last_updated: now });

/** Today's dashboard on 24. 10. in the evening (screenshot): no PV, battery to the house, import. */
const EVENING = {
  "sensor.goodwe_pv_power": state("0", { unit_of_measurement: "W" }),
  "sensor.goodwe_battery_power": state("351", { unit_of_measurement: "W" }),
  "sensor.goodwe_battery_state_of_charge": state("65", { unit_of_measurement: "%" }),
  "sensor.goodwe_meter_active_power_total": state("-148", { unit_of_measurement: "W" }),
  "sensor.goodwe_house_consumption": state("459", { unit_of_measurement: "W" }),
  "sensor.parkovani_bmw_i3_soc": state("50.2", { unit_of_measurement: "%" }),
  "sensor.i3_120_range_ev_remaining_range": state("95", { unit_of_measurement: "km" }),
  "sensor.wallbox_total_power": state("0", { unit_of_measurement: "W" }),
  "sensor.wallbox_charge_status": state("Waiting"),
  "switch.wallbox_boost": state("off"),
  "switch.wallbox_1_block_charging": state("off"),
  "switch.wallbox_2_prioritize_when_connected": state("on"),
  "sensor.tuv_power_total": state("0", { unit_of_measurement: "W" }),
  "sensor.tuv_temperature": state("15", { unit_of_measurement: "°C" }),
  "switch.tuv_boost": state("off"),
  "number.tuv_2_1_target_temperature": state("60", { min: 20, max: 85, step: 5 }),
  "number.tuv_2_2_boost_target_temperature": state("55", { min: 20, max: 85, step: 5 }),
  "water_heater.technicka_mistnost_tado_tepla_voda": state("auto", { temperature: 40, min_temp: 30, max_temp: 65, operation_list: ["auto", "heat", "off"] }),
  "switch.technicka_mistnost_ventil_c1": state("on"),
  "switch.technicka_mistnost_ventil_c2": state("off"),
  "number.goodwe_depth_of_discharge_on_grid": state("80"),
  "image.bmw_i3_vin_image": state("2026-10-24T10:00:00", { entity_picture: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='168' height='83'%3E%3Crect width='168' height='83' rx='20' fill='%23888'/%3E%3C/svg%3E" }),
  "number.wallbox_7_1_manual_charging_power": state("1400", { min: 1400, max: 3700, step: 100, unit_of_measurement: "W" }),
  // The battery detail (examples/energie.yaml, battery.*): values of the export of 24. 10.
  "sensor.goodwe_battery_state_of_health": state("98", { unit_of_measurement: "%" }),
  "sensor.goodwe_battery_voltage": state("294.9", { unit_of_measurement: "V" }),
  "sensor.goodwe_battery_current": state("0.9", { unit_of_measurement: "A" }),
  "sensor.goodwe_battery_temperature": state("23.8", { unit_of_measurement: "°C" }),
  "sensor.goodwe_battery_min_cell_voltage": state("3.274", { unit_of_measurement: "V" }),
  "sensor.goodwe_battery_max_cell_voltage": state("3.279", { unit_of_measurement: "V" }),
  "sensor.goodwe_battery_min_cell_temperature": state("22.3", { unit_of_measurement: "°C" }),
  "sensor.goodwe_battery_max_cell_temperature": state("25.7", { unit_of_measurement: "°C" }),
  "sensor.goodwe_total_battery_charge": state("2730.8", { unit_of_measurement: "kWh" }),
  "sensor.goodwe_total_battery_discharge": state("2031.8", { unit_of_measurement: "kWh" }),
  "sensor.goodwe_inverter_temperature_air": state("33.5", { unit_of_measurement: "°C" }),
  "sensor.goodwe_inverter_temperature_radiator": state("27.8", { unit_of_measurement: "°C" }),
  "sensor.goodwe_battery_mode": state("Discharge"),
  "sensor.goodwe_battery_charge_limit": state("30", { unit_of_measurement: "A" }),
  "sensor.goodwe_battery_discharge_limit": state("30", { unit_of_measurement: "A" }),
  "sensor.goodwe_battery_error": state(""),
  "sensor.goodwe_battery_warning": state(""),
  // Today's counters (examples/denni_soucty.yaml); the car and boiler ones are not in the example configuration.
  "sensor.energie_fve_dnes": state("18.4", { unit_of_measurement: "kWh" }),
  "sensor.energie_baterie_nabito_dnes": state("5.2", { unit_of_measurement: "kWh" }),
  "sensor.energie_baterie_vybito_dnes": state("3.1", { unit_of_measurement: "kWh" }),
  "sensor.energie_sit_odber_dnes": state("2.6", { unit_of_measurement: "kWh" }),
  "sensor.energie_sit_dodavka_dnes": state("4.9", { unit_of_measurement: "kWh" }),
  "sensor.test_auto_dnes": state("6.0", { unit_of_measurement: "kWh" }),
  "sensor.test_bojler_dnes": state("2500", { unit_of_measurement: "Wh" }),
};

/** Noon: the sun charges the car and the battery, the boiler heats, a little goes to the grid. */
const DAY = {
  ...EVENING,
  "sensor.goodwe_pv_power": state("6800", { unit_of_measurement: "W" }),
  "sensor.goodwe_battery_power": state("-800", { unit_of_measurement: "W" }),
  "sensor.goodwe_battery_state_of_charge": state("88", { unit_of_measurement: "%" }),
  "sensor.goodwe_meter_active_power_total": state("200", { unit_of_measurement: "W" }),
  "sensor.goodwe_house_consumption": state("5800", { unit_of_measurement: "W" }),
  "sensor.parkovani_bmw_i3_soc": state("62", { unit_of_measurement: "%" }),
  "sensor.wallbox_total_power": state("4100", { unit_of_measurement: "W" }),
  "sensor.wallbox_charge_status": state("Charging"),
  "sensor.tuv_power_total": state("1200", { unit_of_measurement: "W" }),
  "sensor.tuv_temperature": state("52", { unit_of_measurement: "°C" }),
};

/** Boost from the grid: little sun, the battery rests, the house takes from the grid. */
const GRID = {
  ...EVENING,
  "sensor.goodwe_pv_power": state("400", { unit_of_measurement: "W" }),
  "sensor.goodwe_battery_power": state("0", { unit_of_measurement: "W" }),
  "sensor.goodwe_battery_state_of_charge": state("25", { unit_of_measurement: "%" }),
  "sensor.goodwe_meter_active_power_total": state("-10300", { unit_of_measurement: "W" }),
  "sensor.goodwe_house_consumption": state("10700", { unit_of_measurement: "W" }),
  "sensor.wallbox_total_power": state("5300", { unit_of_measurement: "W" }),
  "sensor.wallbox_charge_status": state("Charging"),
  "switch.wallbox_boost": state("on"),
  "sensor.tuv_power_total": state("4000", { unit_of_measurement: "W" }),
  "switch.tuv_boost": state("on"),
};

/** The power of the sun in W at a moment: a bell between 6:48 and 16:42 with a different strength every day (the made-up days of the history). */
const SUN_DAYS = [0.9, 0.55, 0.8, 0.3, 0.95, 0.85, 0.7];
function sunWatts(time) {
  const date = new Date(time);
  const hour = date.getHours() + date.getMinutes() / 60;
  const x = (hour - 6.8) / (16.7 - 6.8);
  if (x <= 0 || x >= 1) return 0;
  return 3300 * SUN_DAYS[Math.floor(time / 86400000) % 7] * Math.sin(Math.PI * x) ** 1.4;
}
/** The made-up house: a basic load with the evening higher. */
function houseWatts(time) {
  const hour = new Date(time).getHours();
  return 500 + (hour >= 17 && hour <= 22 ? 700 : 0);
}
/** The mean and the maximum of a curve over the bin of a statistic (sampled every 5 minutes). */
function sampled(curve, time, step) {
  const points = Math.max(1, Math.round(step / 300000));
  let sum = 0;
  let max = 0;
  for (let i = 0; i < points; i++) {
    const value = curve(time + i * 300000 + 150000);
    sum += value;
    max = Math.max(max, value);
  }
  return { mean: sum / points, max };
}

/**
 * The long-term statistics of Home Assistant (websocket `recorder/statistics_during_period`):
 * smooth made-up curves for the battery entities. ?stats=none answers with nothing, ?stats=error refuses.
 */
const statsMode = params.get("stats") ?? "ok";
function fakeStatistics(message) {
  if (statsMode === "error") throw new Error("statistics are not available");
  if (statsMode === "none") return {};
  const step = { "5minute": 300000, hour: 3600000, day: 86400000 }[message.period];
  const start = Date.parse(message.start_time);
  const end = Date.parse(message.end_time);
  const result = {};
  for (const id of message.statistic_ids) {
    const rows = [];
    for (let time = Math.floor(start / step) * step; time < end; time += step) {
      const hours = time / 3600000;
      const wave = Math.sin((hours / 24) * 2 * Math.PI);
      const mean = {
        "sensor.goodwe_battery_power": 1500 * wave + 400,
        "sensor.goodwe_battery_state_of_charge": 55 + 40 * wave,
        "sensor.goodwe_battery_min_cell_voltage": 3.31 + 0.01 * wave,
        "sensor.goodwe_battery_max_cell_voltage": 3.325 + 0.01 * wave,
        "sensor.goodwe_battery_min_cell_temperature": 21 + 2 * wave,
        "sensor.goodwe_battery_max_cell_temperature": 25 + 2 * wave,
        "sensor.goodwe_battery_temperature": 23 + 2 * wave,
        "sensor.energy_production_today": 12 + 4 * SUN_DAYS[Math.floor(time / 86400000) % 7],
      }[id];
      const row = { start: time, end: time + step };
      const curve = id === "sensor.goodwe_pv_power" || id === "sensor.goodwe_total_pv_generation" ? sunWatts : id === "sensor.goodwe_house_consumption" ? houseWatts : undefined;
      if (curve) {
        const { mean: w, max } = sampled(curve, time, step);
        for (const type of message.types) {
          if (type === "mean") row.mean = w;
          else if (type === "max") row.max = max;
          else if (type === "change") row.change = (w / 1000) * (step / 3600000);
        }
        rows.push(row);
        continue;
      }
      for (const type of message.types) {
        if (type === "change") row.change = ((id.endsWith("_discharge") ? 0.3 : 0.35) * step) / 3600000;
        else if (type === "state") row.state = 1980 + (time - start) / 3600000 / 24;
        else if (mean !== undefined) row[type] = type === "min" ? mean - 100 : type === "max" ? mean + 100 : mean;
      }
      rows.push(row);
    }
    result[id] = rows;
  }
  return result;
}

/** full = evening; day, grid; unavailable: unavailable / unknown; missing: no entity at all. */
const states = {};
if (scenario === "full") {
  Object.assign(states, structuredClone(EVENING));
} else if (scenario === "day") {
  Object.assign(states, structuredClone(DAY));
} else if (scenario === "grid") {
  Object.assign(states, structuredClone(GRID));
} else if (scenario === "unavailable") {
  Object.keys(EVENING).forEach((id, index) => {
    states[id] = state(index % 2 ? "unknown" : "unavailable");
  });
}

// ?forecast=1: the forecast of the sun (examples/energie.yaml, forecast.*) with its entities and a weather entity.
if (params.get("forecast") === "1") {
  Object.assign(config.forecast, {
    energy_today: "sensor.energy_production_today", energy_tomorrow: "sensor.energy_production_tomorrow", energy_day_2: "sensor.energy_production_d2",
    energy_day_3: "sensor.energy_production_d3", energy_day_4: "sensor.energy_production_d4", weather: "weather.forecast_domov",
  });
  Object.assign(states, {
    "sensor.energy_production_today": state("13.8", { unit_of_measurement: "kWh" }),
    "sensor.energy_production_tomorrow": state("9.6", { unit_of_measurement: "kWh" }),
    "sensor.energy_production_d2": state("5.1", { unit_of_measurement: "kWh" }),
    "sensor.energy_production_d3": state("11.8", { unit_of_measurement: "kWh" }),
    "sensor.energy_production_d4": state("14.9", { unit_of_measurement: "kWh" }),
    "weather.forecast_domov": state("partlycloudy"),
  });
}

const test = { states, config };
window.__test = test;

// Like Home Assistant: the frontend reports the dark mode in effect (?theme=light for the light one).
const light = params.get("theme") === "light";
if (light) {
  // The page around the card in Home Assistant's light mode.
  document.documentElement.style.background = "#f2f2f7";
  document.body.style.background = "#f2f2f7";
  document.body.style.color = "#000";
}

const card = document.createElement("ha-energie-dashboard");
card.setConfig(config);
test.calls = [];
/** The websocket requests of the card (statistics). */
test.requests = [];
// ?lang=sv|en|cs: the language of the Home Assistant profile (Czech by default, so the tests read Czech texts).
const lang = params.get("lang") ?? "cs";
let current = { states, config: { latitude: 50.16, longitude: 14.39 }, themes: { darkMode: !light }, language: lang, locale: { language: lang }, callService: async (domain, service, data) => { test.calls.push({ domain, service, data }); },
  callWS: async (message) => {
    test.requests.push(message);
    if (message.type === "call_service" && message.service === "get_forecasts") {
      const day = (offset, condition) => ({ datetime: new Date(new Date().setHours(12, 0, 0, 0) + offset * 86400000).toISOString(), condition });
      return { response: { [message.target.entity_id]: { forecast: [day(0, "partlycloudy"), day(1, "rainy"), day(2, "cloudy"), day(3, "partlycloudy"), day(4, "sunny")] } } };
    }
    return fakeStatistics(message);
  } };
card.hass = current;
test.card = card;
document.querySelector("main").append(card);

/** The user changing the language in the profile of Home Assistant. */
test.setLanguage = (language) => {
  current = { ...current, language, locale: { ...current.locale, language } };
  card.hass = current;
};
/** Home Assistant switching between its dark and light mode (theme "Auto" follows the system). */
test.setDarkMode = (dark) => {
  current = { ...current, themes: { darkMode: dark } };
  card.hass = current;
};
/** A frontend that does not report its dark mode: the card follows the system colour scheme. */
test.dropThemes = () => {
  const { themes: _themes, ...rest } = current;
  current = rest;
  card.hass = current;
};
/** Replace entity states like a Home Assistant push: new objects, so the card sees a change. */
test.update = (changes) => {
  const next = { ...current, states: { ...current.states } };
  for (const [id, value] of Object.entries(changes)) {
    next.states[id] = typeof value === "object" ? state(value.state, value.attributes) : state(value);
  }
  current = next;
  card.hass = next;
};
