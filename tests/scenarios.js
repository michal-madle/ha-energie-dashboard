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
  "script.prepnout_miseni_vody": state("off"),
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

const test = { states, config };
window.__test = test;

// Like Home Assistant: the frontend reports the dark mode in effect (?theme=light for the light one).
const light = params.get("theme") === "light";
if (light) {
  // Home Assistant's default light theme around the card.
  document.documentElement.style.background = "#fafafa";
  document.body.style.background = "#fafafa";
  document.body.style.color = "#212121";
  for (const [name, value] of Object.entries({
    "--primary-text-color": "#212121", "--secondary-text-color": "#727272", "--divider-color": "rgb(0 0 0 / 12%)",
    "--card-background-color": "#ffffff", "--secondary-background-color": "#e5e5e5", "--state-icon-color": "#44739e",
  })) document.body.style.setProperty(name, value);
}

const card = document.createElement("ha-energie-dashboard");
card.setConfig(config);
test.calls = [];
let current = { states, themes: { darkMode: !light }, callService: async (domain, service, data) => { test.calls.push({ domain, service, data }); } };
card.hass = current;
test.card = card;
document.querySelector("main").append(card);

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
    next.states[id] = state(value);
  }
  current = next;
  card.hass = next;
};
