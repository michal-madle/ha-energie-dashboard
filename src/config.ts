import type { Colors, DashboardConfig, EntitySections, NumberSettings, SectionName, Settings, TempStop, Titles } from "./types";

/*
 * Card configuration (CURRENT_SPEC.md, Konfigurace): every key is optional. A key without a
 * value (`power:` in YAML, i.e. null) is the same as no key, so the example can list every
 * setting. Entities have no default: an entity that is not configured is missing data ("––").
 * Every number (limit, threshold, scale) and colour has a default, listed below. A wrong value
 * stops the card with an error that names the key; nothing is silently ignored, except unknown
 * top-level keys, which Home Assistant adds itself (grid_options, view_layout).
 */

export const DEFAULT_TITLE = "Energie";

/**
 * Keys of every entity section and the domain an entity must have, where the card will call a
 * service on it or read a domain-specific attribute (undefined = any entity).
 */
export const SECTION_KEYS: { [Name in SectionName]: Record<keyof EntitySections[Name], string | undefined> } = {
  pv: { power: undefined },
  battery: { power: undefined, state_of_charge: undefined },
  grid: { power: undefined },
  house: { power: undefined },
  car: { state_of_charge: undefined, range: undefined, image: "image" },
  wallbox: { power: undefined, status: undefined, boost: "switch", block_charging: "switch", prioritize_connected: "switch", charging_power: "number" },
  boiler: { power: undefined, temperature: undefined, boost: "switch", target_temperature: "number", boost_target_temperature: "number" },
  tank: { water_heater: "water_heater" },
  mixing: { valve_c1: "switch", valve_c2: "switch", script: "script" },
  daily: { pv_generation: undefined, battery_charge: undefined, battery_discharge: undefined, grid_import: undefined, grid_export: undefined, car: undefined, boiler: undefined },
};

/** Non-numeric, non-entity keys inside sections that also hold numbers (boiler.show). */
const EXTRA_KEYS: Partial<Record<string, readonly string[]>> = { boiler: ["show"] };

export const BOILER_SHOW = ["always", "heating"] as const;
export const DEFAULT_BOILER_SHOW = "always";

export const SECTION_NAMES = Object.keys(SECTION_KEYS) as SectionName[];

interface Range {
  /** Default value. */
  value: number;
  /** Accepted range, inclusive. */
  min: number;
  max: number;
  integer?: boolean;
  /** Unit and meaning, for the error message. */
  what: string;
}

const range = (value: number, min: number, max: number, what: string, integer = false): Range => ({ value, min, max, what, integer });

/** Every number of the card with its default (the units are in the example configuration). */
export const NUMBERS: { [Section in keyof NumberSettings]: { [Key in keyof NumberSettings[Section]]: Range } } = {
  battery: { reserve: range(20, 0, 100, "% battery reserve") },
  car: { charge_limit: range(100, 1, 100, "% charge limit of the car (the marker is drawn below 100)") },
  wallbox: {
    phases: range(3, 1, 3, "number of phases", true),
    power_min: range(4200, 0, 100000, "W, lowest charging power (all phases)"),
    power_max: range(11100, 0, 100000, "W, highest charging power (all phases)"),
    power_step: range(300, 1, 100000, "W, step of the charging power (all phases)"),
    priority_min_sun: range(200, 0, 100000, "W of sun above which a waiting car is reported"),
  },
  boiler: {
    target_min: range(20, 0, 100, "°C, lowest target"),
    target_max: range(85, 0, 100, "°C, highest target"),
    target_step: range(5, 1, 50, "°C, target step"),
    hold_minutes: range(15, 0, 1440, "min the boiler tile stays after heating (boiler.show: heating)"),
  },
  water: {
    gauge_min: range(15, -50, 100, "°C, start of the hot-water gauges and of the boiler tile fill"),
    gauge_max: range(65, 0, 150, "°C, end of the hot-water gauges (the higher of this and the surplus target counts)"),
  },
  tank: {
    temp_min: range(38, 0, 100, "°C, lowest temperature"),
    temp_max: range(65, 0, 100, "°C, highest temperature"),
    temp_step: range(1, 1, 50, "°C, temperature step"),
  },
  flows: {
    idle_threshold: range(100, 0, 1000, "W, below this a flow counts as none"),
    kw_from: range(1000, 100, 100000, "W, from this any power is shown in kW"),
    export_notice: range(300, 0, 100000, "W of export that counts as a surplus"),
    source_min_share: range(15, 0, 100, "% a source needs to be named in a text"),
    grid_deviation_share: range(50, 0, 100, "% of the grid above which it is a deviation"),
    band_max_px_per_kw: range(10, 0.5, 50, "px per kW, thickness of the bands"),
    band_min_px: range(1.6, 0.5, 10, "px, thinnest band"),
  },
  scale: {
    sun: range(10000, 100, 1000000, "W, full strength of the sun tile"),
    battery: range(5000, 100, 1000000, "W, full strength of the battery tiles"),
    grid: range(10000, 100, 1000000, "W, full strength of the grid tiles"),
    house: range(10000, 100, 1000000, "W, full strength of the house tile"),
    car: range(11100, 100, 1000000, "W, full strength of the car tile"),
    boiler: range(4000, 100, 1000000, "W, full strength of the boiler tile"),
  },
  ui: {
    revert_after: range(6, 1, 60, "s until a chosen value falls back to the real state"),
    hold_ms: range(550, 200, 3000, "ms to hold a protected control to switch it", true),
    double_tap_ms: range(400, 150, 1000, "ms between the two taps of a double tap", true),
    hint_seconds: range(3, 1, 10, "s the hint of a protected control stays"),
  },
};

/** Colours of the card with their defaults. */
export const COLORS: Colors = {
  sun: "#FFD60A",
  battery: "#30D158",
  grid: "#3D8BFF",
  house: "#BF5AF2",
  car: "#40D0E6",
  boiler: "#FF6F59",
  accent: "#0A84FF",
  warning: "#FF9230",
  neutral: "#8E8E93",
  cold: "#64D2FF",
  hot: "#FF9F0A",
};

/** Colour scale of the temperature gauges (°C and colour), blue → yellow → orange → red. */
export const TEMP_SCALE: TempStop[] = [
  { temp: 20, color: "#0A84FF" },
  { temp: 32, color: "#5AC8FA" },
  { temp: 44, color: "#FFD60A" },
  { temp: 58, color: "#FF9F0A" },
  { temp: 85, color: "#FF453A" },
];

/** Headings of the three panels with their defaults. */
export const TITLES: Titles = { electricity: "Elektřina", car: "BMW i3", water: "Teplá voda" };

/** Every setting as a dotted key, for the example configuration and its test. */
export const CONFIG_KEYS: string[] = [
  "type",
  "title",
  ...SECTION_NAMES.flatMap((name) => Object.keys(SECTION_KEYS[name]).map((key) => `${name}.${key}`)),
  ...Object.entries(NUMBERS).flatMap(([section, keys]) => Object.keys(keys).map((key) => `${section}.${key}`)),
  ...Object.keys(TITLES).map((key) => `titles.${key}`),
  ...Object.keys(COLORS).map((key) => `colors.${key}`),
  "colors.temp_scale",
  "boiler.show",
];

function fail(message: string): never {
  throw new Error(`Energie Dashboard: ${message}`);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** A section of the YAML; absent or null is an empty section. */
function section(value: unknown, where: string): Record<string, unknown> {
  if (value === undefined || value === null) {
    return {};
  }
  if (!isRecord(value)) {
    fail(`"${where}" must be a mapping of keys.`);
  }
  return value;
}

function checkKeys(value: Record<string, unknown>, allowed: readonly string[], where: string): void {
  for (const key of Object.keys(value)) {
    if (!allowed.includes(key)) {
      fail(`${where}: unknown key "${key}" (allowed: ${allowed.join(", ")}).`);
    }
  }
}

/** Home Assistant entity IDs: lower-case domain and object ID of letters, digits and "_". */
function entityId(value: unknown, where: string, domain: string | undefined): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  const id = typeof value === "string" ? value.trim() : "";
  if (!/^[a-z0-9_]+\.[a-z0-9_]+$/.test(id)) {
    fail(`${where} must be an entity ID such as ${domain ?? "sensor"}.example.`);
  }
  if (domain && !id.startsWith(`${domain}.`)) {
    fail(`${where} must be a ${domain} entity (${domain}.…), not ${id}.`);
  }
  return id;
}

function entitySection<Name extends SectionName>(config: DashboardConfig, name: Name): EntitySections[Name] {
  const input = section(config[name], name);
  const keys = SECTION_KEYS[name] as Record<string, string | undefined>;
  // A section may also hold numbers (battery.reserve, wallbox.power_min …): only entity keys are read here.
  const extra = [...Object.keys((NUMBERS as Record<string, Record<string, Range>>)[name] ?? {}), ...(EXTRA_KEYS[name] ?? [])];
  checkKeys(input, [...Object.keys(keys), ...extra], name);
  const result: Record<string, string> = {};
  for (const [key, domain] of Object.entries(keys)) {
    const id = entityId(input[key], `${name}.${key}`, domain);
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

function titles(config: DashboardConfig): Titles {
  const input = section(config.titles, "titles");
  checkKeys(input, Object.keys(TITLES), "titles");
  const result: Record<string, string> = { ...TITLES };
  for (const key of Object.keys(TITLES)) {
    const raw = input[key];
    if (raw === undefined || raw === null) {
      continue;
    }
    if (typeof raw !== "string" || raw.trim() === "") {
      fail(`titles.${key} must be a non-empty text.`);
    }
    result[key] = raw.trim();
  }
  return result as unknown as Titles;
}

/** Pairs that must be ordered: a lower limit above its upper limit would give a broken scale. */
function checkOrder(num: NumberSettings): void {
  const pairs: Array<[number, number, string, string, boolean]> = [
    [num.wallbox.power_min, num.wallbox.power_max, "wallbox.power_min", "wallbox.power_max", true],
    [num.boiler.target_min, num.boiler.target_max, "boiler.target_min", "boiler.target_max", true],
    [num.water.gauge_min, num.water.gauge_max, "water.gauge_min", "water.gauge_max", true],
    [num.tank.temp_min, num.tank.temp_max, "tank.temp_min", "tank.temp_max", true],
  ];
  for (const [low, high, lowKey, highKey, strict] of pairs) {
    if (strict ? low >= high : low > high) {
      fail(`${lowKey} (${low}) must be ${strict ? "below" : "at most"} ${highKey} (${high}).`);
    }
  }
}

export function normalizeConfig(config: DashboardConfig): Settings {
  if (!isRecord(config)) {
    fail("the configuration must be a mapping of keys.");
  }
  if (config.title != null && typeof config.title !== "string") {
    fail("title must be a text (an empty text leaves the heading out).");
  }
  const entities = Object.fromEntries(SECTION_NAMES.map((name) => [name, entitySection(config, name)])) as unknown as EntitySections;
  // The two mixing valves are never on together and switch together (CURRENT_SPEC.md, Mísení vody).
  if (entities.mixing.valve_c1 && entities.mixing.valve_c1 === entities.mixing.valve_c2) {
    fail("mixing.valve_c1 and mixing.valve_c2 must be two different valves.");
  }
  const num = numbers(config);
  checkOrder(num);
  return { title: config.title ?? DEFAULT_TITLE, entities, titles: titles(config), num, colors: colors(config), tempScale: tempScale(config), boilerShow: boilerShow(config) };
}
