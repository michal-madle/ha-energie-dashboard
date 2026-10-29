import type { Colors, EntitySections, NumberSettings, SectionName, TempStop } from "./types";

/*
 * The schema of the card configuration (CURRENT_SPEC.md, Konfigurace): the keys, the entity domains,
 * the ranges of the numbers and the default colours. Pure data without the kit, so the browser
 * tests can import it (Playwright does not transpile the kit in node_modules); the validation that
 * uses these tables is config.ts.
 */

/**
 * Keys of every entity section and the domain an entity must have, where the card will call a
 * service on it or read a domain-specific attribute (undefined = any entity).
 */
export const SECTION_KEYS: { [Name in SectionName]: Record<keyof EntitySections[Name], string | undefined> } = {
  pv: { power: undefined },
  battery: { power: undefined, state_of_charge: undefined, depth_of_discharge: "number" },
  grid: { power: undefined },
  house: { power: undefined },
  car: { state_of_charge: undefined, range: undefined, image: "image" },
  wallbox: { power: undefined, status: undefined, boost: "switch", block_charging: "switch", prioritize_connected: "switch", charging_power: "number" },
  boiler: { power: undefined, temperature: undefined, boost: "switch", target_temperature: "number", boost_target_temperature: "number" },
  tank: { water_heater: "water_heater" },
  mixing: { valve_c1: "switch", valve_c2: "switch" },
  daily: { pv_generation: undefined, battery_charge: undefined, battery_discharge: undefined, grid_import: undefined, grid_export: undefined, car: undefined, boiler: undefined },
};

/** Non-numeric, non-entity keys inside sections that also hold numbers (boiler.show). */
export const EXTRA_KEYS: Partial<Record<string, readonly string[]>> = { boiler: ["show"], car: ["link"], flows: ["decimals"] };

export const BOILER_SHOW = ["always", "heating"] as const;
export const DEFAULT_BOILER_SHOW = "heating";

/** flows.decimals: decimal places of the kW values; "auto" shows at least three digits (0,13 · 1,36 · 6,43 · 11,3). */
export const POWER_DECIMALS = ["auto", 1, 2] as const;
export const DEFAULT_POWER_DECIMALS = "auto";

export const SECTION_NAMES = Object.keys(SECTION_KEYS) as SectionName[];

export interface Range {
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
  car: {
    charge_limit: range(100, 1, 100, "% charge limit of the car (the marker is drawn below 100)"),
    image_scale: range(2, 0.5, 3, "× size of the car picture (grows up and to the sides, the bottom stays)"),
  },
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

/** Headings of the three panels; without a text the card names them in its language (i18n.ts). */
export const TITLE_KEYS = ["electricity", "car", "water"] as const;

/** Every setting as a dotted key, for the example configuration and its test. */
export const CONFIG_KEYS: string[] = [
  "type",
  "title",
  "language",
  ...SECTION_NAMES.flatMap((name) => Object.keys(SECTION_KEYS[name]).map((key) => `${name}.${key}`)),
  ...Object.entries(NUMBERS).flatMap(([section, keys]) => Object.keys(keys).map((key) => `${section}.${key}`)),
  ...TITLE_KEYS.map((key) => `titles.${key}`),
  ...Object.keys(COLORS).map((key) => `colors.${key}`),
  "colors.temp_scale",
  "boiler.show",
  "flows.decimals",
  "car.link",
];
