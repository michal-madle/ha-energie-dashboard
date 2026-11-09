import { checkKeys, entityId, fail, isRecord, languageSetting, localizedText, section, withCardName } from "ha-dashboard-kit/config";
import type { LocalizedText } from "ha-dashboard-kit/config";
import { DEFAULT_HOUSE_LABEL, BATTERY_RANGES, BOILER_SHOW, DEFAULT_SUN_RANGE, SUN_RANGES, COLORS, DEFAULT_BATTERY_RANGE, DEFAULT_BOILER_SHOW, DEFAULT_POWER_DECIMALS, EXTRA_KEYS, NUMBERS, POWER_DECIMALS, SECTION_KEYS, SECTION_NAMES, TEMP_SCALE, TITLE_KEYS } from "./config-schema";
import type { Range } from "./config-schema";
import type { ApplianceConfig, Colors, DashboardConfig, EntitySections, GroupConfig, GroupItemConfig, NumberSettings, SectionName, Settings, TempStop, Titles } from "./types";

/*
 * Card configuration (CURRENT_SPEC.md, Konfigurace): every key is optional. A key without a
 * value (`power:` in YAML, i.e. null) is the same as no key, so the example can list every
 * setting. Entities have no default: an entity that is not configured is missing data ("––").
 * Every number (limit, threshold, scale) and colour has a default, listed below. A wrong value
 * stops the card with an error that names the key; nothing is silently ignored, except unknown
 * top-level keys, which Home Assistant adds itself (grid_options, view_layout).
 */


function entitySection<Name extends SectionName>(config: DashboardConfig, name: Name): EntitySections[Name] {
  const input = section(config[name], name);
  const keys = SECTION_KEYS[name] as Record<string, string | undefined>;
  // A section may also hold numbers (battery.reserve, wallbox.power_min …): only entity keys are read here.
  const extra = [...Object.keys((NUMBERS as Record<string, Record<string, Range>>)[name] ?? {}), ...(EXTRA_KEYS[name] ?? [])];
  checkKeys(input, [...Object.keys(keys), ...extra], name);
  const result: Record<string, string> = {};
  for (const [key, domain] of Object.entries(keys)) {
    const id = entityId(input[key], `${name}.${key}`, { domain });
    if (id) {
      result[key] = id;
    }
  }
  return result as EntitySections[Name];
}

function numbers(config: DashboardConfig): NumberSettings {
  const result: Record<string, Record<string, number>> = {};
  for (const [name, keys] of Object.entries(NUMBERS) as Array<[string, Record<string, Range>]>) {
    const input = section(config[name], name);
    const entityKeys = Object.keys((SECTION_KEYS as Record<string, object>)[name] ?? {});
    checkKeys(input, [...entityKeys, ...Object.keys(keys), ...(EXTRA_KEYS[name] ?? [])], name);
    result[name] = {};
    for (const [key, spec] of Object.entries(keys)) {
      const raw = input[key];
      const where = `${name}.${key}`;
      if (raw === undefined || raw === null) {
        result[name][key] = spec.value;
        continue;
      }
      if (typeof raw !== "number" || !Number.isFinite(raw)) {
        fail(`${where} must be a number (${spec.what}).`);
      }
      if (raw < spec.min || raw > spec.max || (spec.integer && !Number.isInteger(raw))) {
        fail(`${where} must be ${spec.integer ? "a whole number " : "a number "}from ${spec.min} to ${spec.max} (${spec.what}), not ${raw}.`);
      }
      result[name][key] = raw;
    }
  }
  return result as unknown as NumberSettings;
}

function colors(config: DashboardConfig): Colors {
  const input = section(config.colors, "colors");
  checkKeys(input, [...Object.keys(COLORS), "temp_scale"], "colors");
  const result: Record<string, string> = { ...COLORS };
  for (const key of Object.keys(COLORS)) {
    const raw = input[key];
    if (raw === undefined || raw === null) {
      continue;
    }
    if (typeof raw !== "string" || !/^#[0-9a-fA-F]{6}$/.test(raw.trim())) {
      fail(`colors.${key} must be a colour like #FFD60A (six hex digits).`);
    }
    result[key] = raw.trim().toUpperCase();
  }
  return result as unknown as Colors;
}

/** colors.temp_scale: a list of {temp, color}, at least two points, rising temperatures. */
function tempScale(config: DashboardConfig): TempStop[] {
  const raw = section(config.colors, "colors").temp_scale;
  if (raw === undefined || raw === null) {
    return TEMP_SCALE.map((stop) => ({ ...stop }));
  }
  const where = "colors.temp_scale";
  if (!Array.isArray(raw) || raw.length < 2) {
    fail(`${where} must be a list of at least two points like {temp: 20, color: "#0A84FF"}.`);
  }
  const stops = raw.map((item, index): TempStop => {
    if (!isRecord(item)) {
      fail(`${where}[${index}] must be a mapping like {temp: 20, color: "#0A84FF"}.`);
    }
    checkKeys(item, ["temp", "color"], `${where}[${index}]`);
    if (typeof item.temp !== "number" || !Number.isFinite(item.temp)) {
      fail(`${where}[${index}].temp must be a number (°C).`);
    }
    if (typeof item.color !== "string" || !/^#[0-9a-fA-F]{6}$/.test(item.color.trim())) {
      fail(`${where}[${index}].color must be a colour like #0A84FF (six hex digits).`);
    }
    return { temp: item.temp, color: item.color.trim().toUpperCase() };
  });
  stops.forEach((stop, index) => {
    if (index > 0 && stop.temp <= stops[index - 1].temp) {
      fail(`${where}: temperatures must rise (${stops[index - 1].temp} is followed by ${stop.temp}).`);
    }
  });
  return stops;
}

/** boiler.show: always, or only while heating (and boiler.hold_minutes after). */
function boilerShow(config: DashboardConfig): "always" | "heating" {
  const raw = section(config.boiler, "boiler").show;
  if (raw === undefined || raw === null) {
    return DEFAULT_BOILER_SHOW;
  }
  if (typeof raw !== "string" || !(BOILER_SHOW as readonly string[]).includes(raw)) {
    fail(`boiler.show must be one of ${BOILER_SHOW.join(", ")}, not ${JSON.stringify(raw)}.`);
  }
  return raw as "always" | "heating";
}

/** battery.default_range: 1d, 7d or 30d. */
function batteryRange(config: DashboardConfig): "1d" | "7d" | "30d" {
  const raw = section(config.battery, "battery").default_range;
  if (raw === undefined || raw === null) {
    return DEFAULT_BATTERY_RANGE;
  }
  if (typeof raw !== "string" || !(BATTERY_RANGES as readonly string[]).includes(raw)) {
    fail(`battery.default_range must be one of ${BATTERY_RANGES.join(", ")}, not ${JSON.stringify(raw)}.`);
  }
  return raw as "1d" | "7d" | "30d";
}

/** forecast.default_range: 7d or 30d. */
function sunRange(config: DashboardConfig): "7d" | "30d" {
  const raw = section(config.forecast, "forecast").default_range;
  if (raw === undefined || raw === null) {
    return DEFAULT_SUN_RANGE;
  }
  if (typeof raw !== "string" || !(SUN_RANGES as readonly string[]).includes(raw)) {
    fail(`forecast.default_range must be one of ${SUN_RANGES.join(", ")}, not ${JSON.stringify(raw)}.`);
  }
  return raw as "7d" | "30d";
}

/** house.label: the label of the appliances. */
function houseLabel(config: DashboardConfig): string {
  const raw = section(config.house, "house").label;
  if (raw === undefined || raw === null) {
    return DEFAULT_HOUSE_LABEL;
  }
  if (typeof raw !== "string" || raw.trim() === "") {
    fail("house.label must be a non-empty text (the label of the appliances in Home Assistant).");
  }
  return raw.trim();
}

/** house.default_range: 1d, 7d or 30d. */
function houseRange(config: DashboardConfig): "1d" | "7d" | "30d" {
  const raw = section(config.house, "house").default_range;
  if (raw === undefined || raw === null) {
    return DEFAULT_BATTERY_RANGE;
  }
  if (typeof raw !== "string" || !(BATTERY_RANGES as readonly string[]).includes(raw)) {
    fail(`house.default_range must be one of ${BATTERY_RANGES.join(", ")}, not ${JSON.stringify(raw)}.`);
  }
  return raw as "1d" | "7d" | "30d";
}

/** The icon of a group without `icon`. */
const DEFAULT_GROUP_ICON = "mdi:power-plug";

/** house.appliances: the helpers of the cycle of each appliance, by the name of its device. */
function appliances(config: DashboardConfig): ApplianceConfig[] {
  const raw = section(config.house, "house").appliances;
  if (raw === undefined || raw === null) {
    return [];
  }
  if (!Array.isArray(raw)) {
    fail("house.appliances must be a list of {name, icon, power, energy, running, start_energy}.");
  }
  return raw.map((item, index): ApplianceConfig => {
    const where = `house.appliances[${index}]`;
    if (!isRecord(item)) {
      fail(`${where} must be a mapping like {name: Pračka, running: input_boolean.…, start_energy: input_number.…}.`);
    }
    checkKeys(item, ["name", "power", "energy", "running", "start_energy", "icon"], where);
    // The name of the device in Home Assistant (a text, or the texts by language: any of them can be the name of the device).
    const name = localizedText(item.name, `${where}.name`);
    if (name === undefined) {
      fail(`${where}.name must be the name of the device of the appliance.`);
    }
    const running = runningHelper(item.running, `${where}.running`);
    const start = entityId(item.start_energy, `${where}.start_energy`, { domain: "input_number" });
    const power = entityId(item.power, `${where}.power`, { domain: "sensor" });
    const energy = entityId(item.energy, `${where}.energy`, { domain: "sensor" });
    const icon = iconName(item.icon, `${where}.icon`);
    return { name, ...(power ? { power } : {}), ...(energy ? { energy } : {}), ...(running ? { running } : {}), ...(start ? { start_energy: start } : {}), ...(icon ? { icon } : {}) };
  });
}

/** The helper "running" of an appliance: an input_boolean (set by the automations of the cycle) or a binary_sensor (the power above a threshold, with a delay). */
function runningHelper(value: unknown, where: string): string | undefined {
  const id = entityId(value, where, { example: "input_boolean.technicka_mistnost_pracka_bezi" });
  if (id && !/^(input_boolean|binary_sensor)\./.test(id)) {
    fail(`${where} must be an input_boolean or a binary_sensor entity, not ${id}.`);
  }
  return id;
}

/** A name that must be given. */
function required(value: LocalizedText | undefined, where: string): LocalizedText {
  return value ?? fail(`${where} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
}

/** An icon such as mdi:washing-machine. */
function iconName(value: unknown, where: string): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (typeof value !== "string" || !/^[a-z0-9]+:[a-z0-9-]+$/i.test(value)) {
    fail(`${where} must be an icon such as mdi:washing-machine.`);
  }
  return value;
}

/** house.groups: the groups of appliances, each summed up in one row ({name, icon, appliances: [{name, power, energy}]}). */
function groups(config: DashboardConfig): GroupConfig[] {
  const raw = section(config.house, "house").groups;
  if (raw === undefined || raw === null) {
    return [];
  }
  if (!Array.isArray(raw)) {
    fail("house.groups must be a list of {name, icon, appliances}.");
  }
  return raw.map((group, index): GroupConfig => {
    const where = `house.groups[${index}]`;
    if (!isRecord(group)) {
      fail(`${where} must be a mapping like {name: Vaření, icon: mdi:silverware-fork-knife, appliances: [...]}.`);
    }
    checkKeys(group, ["name", "icon", "appliances"], where);
    if (!Array.isArray(group.appliances) || group.appliances.length === 0) {
      fail(`${where}.appliances must be a list of {name, power, energy, running}.`);
    }
    const items = group.appliances.map((item, at): GroupItemConfig => {
      const here = `${where}.appliances[${at}]`;
      if (!isRecord(item)) {
        fail(`${here} must be a mapping like {name: Trouba, power: sensor.…, energy: sensor.…}.`);
      }
      checkKeys(item, ["name", "power", "energy", "running"], here);
      const power = entityId(item.power, `${here}.power`, { domain: "sensor" });
      if (!power) {
        fail(`${here}.power must be the power sensor (sensor.…) of the appliance.`);
      }
      const energy = entityId(item.energy, `${here}.energy`, { domain: "sensor" });
      const running = runningHelper(item.running, `${here}.running`);
      return { name: required(localizedText(item.name, `${here}.name`), `${here}.name`), power, ...(energy ? { energy } : {}), ...(running ? { running } : {}) };
    });
    return { name: required(localizedText(group.name, `${where}.name`), `${where}.name`), icon: iconName(group.icon, `${where}.icon`) ?? DEFAULT_GROUP_ICON, appliances: items };
  });
}

/** flows.decimals: "auto" (default, at least three digits), 1 or 2. */
function powerDecimals(config: DashboardConfig): 1 | 2 | "auto" {
  const raw = section(config.flows, "flows").decimals;
  if (raw === undefined || raw === null) {
    return DEFAULT_POWER_DECIMALS;
  }
  if (!(POWER_DECIMALS as readonly unknown[]).includes(raw)) {
    fail(`flows.decimals must be one of ${POWER_DECIMALS.join(", ")}, not ${JSON.stringify(raw)}.`);
  }
  return raw as 1 | 2 | "auto";
}

/** car.link: where a double tap or long press on the car picture goes ("/dashboard-bmw", a full address, or "" for nowhere). */
export const DEFAULT_CAR_LINK = "/dashboard-bmw";
function carLink(config: DashboardConfig): string {
  const raw = section(config.car, "car").link;
  if (raw === undefined || raw === null) {
    return DEFAULT_CAR_LINK;
  }
  if (typeof raw !== "string" || (raw !== "" && !/^(\/(?!\/)\S*|https?:\/\/\S+)$/.test(raw))) {
    fail(`car.link must be a path such as /dashboard-bmw, an address starting with http:// or https://, or an empty text, not ${JSON.stringify(raw)}.`);
  }
  return raw;
}

function titles(config: DashboardConfig): Partial<Record<keyof Titles, LocalizedText>> {
  const input = section(config.titles, "titles");
  checkKeys(input, [...TITLE_KEYS], "titles");
  const result: Partial<Record<keyof Titles, LocalizedText>> = {};
  for (const key of TITLE_KEYS) {
    const title = localizedText(input[key], `titles.${key}`);
    if (title !== undefined) {
      result[key] = title;
    }
  }
  return result;
}

/** Pairs that must be ordered: a lower limit above its upper limit would give a broken scale. */
function checkOrder(num: NumberSettings): void {
  const pairs: Array<[number, number, string, string, boolean]> = [
    [num.wallbox.power_min, num.wallbox.power_max, "wallbox.power_min", "wallbox.power_max", true],
    [num.boiler.target_min, num.boiler.target_max, "boiler.target_min", "boiler.target_max", true],
    [num.water.gauge_min, num.water.gauge_max, "water.gauge_min", "water.gauge_max", true],
    [num.tank.temp_min, num.tank.temp_max, "tank.temp_min", "tank.temp_max", true],
    [num.forecast.strip_from, num.forecast.strip_to, "forecast.strip_from", "forecast.strip_to", true],
    [num.forecast.car_stop_soc, num.forecast.car_start_soc, "forecast.car_stop_soc", "forecast.car_start_soc", true],
    [num.forecast.morning_hour, num.forecast.evening_hour, "forecast.morning_hour", "forecast.evening_hour", true],
    [num.battery.imbalance_good, num.battery.imbalance_warn, "battery.imbalance_good", "battery.imbalance_warn", false],
    [num.battery.imbalance_warn, num.battery.imbalance_fault, "battery.imbalance_warn", "battery.imbalance_fault", false],
  ];
  for (const [low, high, lowKey, highKey, strict] of pairs) {
    if (strict ? low >= high : low > high) {
      fail(`${lowKey} (${low}) must be ${strict ? "below" : "at most"} ${highKey} (${high}).`);
    }
  }
}

export function normalizeConfig(config: DashboardConfig): Settings {
  return withCardName("Energie Dashboard", () => normalize(config));
}

function normalize(config: DashboardConfig): Settings {
  if (!isRecord(config)) {
    fail("the configuration must be a mapping of keys.");
  }
  // An empty text leaves the heading out; otherwise a text or the texts by language.
  const title = config.title === "" ? "" : localizedText(config.title, "title");
  const entities = Object.fromEntries(SECTION_NAMES.map((name) => [name, entitySection(config, name)])) as unknown as EntitySections;
  // The two mixing valves are never on together and switch together (CURRENT_SPEC.md, Mísení vody).
  if (entities.mixing.valve_c1 && entities.mixing.valve_c1 === entities.mixing.valve_c2) {
    fail("mixing.valve_c1 and mixing.valve_c2 must be two different valves.");
  }
  const num = numbers(config);
  checkOrder(num);
  const language = languageSetting(config.language);
  return { title, language, entities, titles: titles(config), num, colors: colors(config), tempScale: tempScale(config), boilerShow: boilerShow(config), powerDecimals: powerDecimals(config), carLink: carLink(config), batteryRange: batteryRange(config), sunRange: sunRange(config), houseLabel: houseLabel(config), houseRange: houseRange(config), appliances: appliances(config), groups: groups(config) };
}
