import type { EntityId, Language, LanguageSetting } from "ha-dashboard-kit/types";

/* Types shared with the other cards live in the kit (ha-dashboard-kit/types). */
export type { EntityId, HassEntity, HomeAssistant, Language, LanguageSetting } from "ha-dashboard-kit/types";
export { LANGUAGES } from "ha-dashboard-kit/types";

// ------------------------------------------------------------ configuration (YAML)

/**
 * Entity sections of the card configuration, one per system (CURRENT_SPEC.md, Konfigurace). Every
 * entity key is optional; an entity that is not configured is missing data ("––").
 */
export interface EntitySections {
  pv: { power?: EntityId; /** Counter of the whole production in kWh (total_increasing); the history of the sun detail is read from its statistics. */ total_generation?: EntityId };
  battery: {
    power?: EntityId;
    state_of_charge?: EntityId;
    depth_of_discharge?: EntityId;
    /** Detail baterie (CURRENT_SPEC.md, Baterie): state of health, live values, cells, counters, diagnostics. */
    state_of_health?: EntityId;
    voltage?: EntityId;
    current?: EntityId;
    temperature?: EntityId;
    min_cell_voltage?: EntityId;
    max_cell_voltage?: EntityId;
    min_cell_temperature?: EntityId;
    max_cell_temperature?: EntityId;
    total_charge?: EntityId;
    total_discharge?: EntityId;
    inverter_temperature_air?: EntityId;
    inverter_temperature_radiator?: EntityId;
    mode?: EntityId;
    charge_limit?: EntityId;
    discharge_limit?: EntityId;
    error?: EntityId;
    warning?: EntityId;
  };
  grid: { power?: EntityId };
  house: { power?: EntityId };
  car: { state_of_charge?: EntityId; range?: EntityId; capacity?: EntityId; image?: EntityId };
  wallbox: {
    power?: EntityId;
    status?: EntityId;
    boost?: EntityId;
    block_charging?: EntityId;
    prioritize_connected?: EntityId;
    charging_power?: EntityId;
  };
  boiler: { power?: EntityId; temperature?: EntityId; boost?: EntityId; target_temperature?: EntityId; boost_target_temperature?: EntityId };
  tank: { water_heater?: EntityId };
  mixing: { valve_c1?: EntityId; valve_c2?: EntityId };
  /** Forecast of the sun (CURRENT_SPEC.md, Slunce): the energy of the day in kWh from Open-Meteo Solar Forecast, Forecast.Solar or Solcast, and a weather entity for the days; all optional. */
  forecast: {
    energy_today?: EntityId;
    energy_tomorrow?: EntityId;
    energy_day_2?: EntityId;
    energy_day_3?: EntityId;
    energy_day_4?: EntityId;
    weather?: EntityId;
  };
  /** Energy of today in kWh (counters that restart at midnight, e.g. utility_meter); shown only in the popups. */
  daily: {
    pv_generation?: EntityId;
    battery_charge?: EntityId;
    battery_discharge?: EntityId;
    grid_import?: EntityId;
    grid_export?: EntityId;
    car?: EntityId;
    boiler?: EntityId;
  };
}

export type SectionName = keyof EntitySections;

/** Numeric settings (limits, thresholds, scales); every one has a default (config.ts, NUMBERS). */
export interface NumberSettings {
  battery: { reserve: number; capacity: number; imbalance_good: number; imbalance_warn: number; imbalance_fault: number };
  car: { charge_limit: number; image_scale: number };
  wallbox: { phases: number; power_min: number; power_max: number; power_step: number; priority_min_sun: number };
  boiler: { target_min: number; target_max: number; target_step: number; hold_minutes: number };
  water: { gauge_min: number; gauge_max: number };
  tank: { temp_min: number; temp_max: number; temp_step: number };
  flows: {
    idle_threshold: number;
    kw_from: number;
    export_notice: number;
    source_min_share: number;
    grid_deviation_share: number;
    band_max_px_per_kw: number;
    band_min_px: number;
  };
  forecast: {
    good_power: number; good_day: number; learn_days: number; possible_percentile: number; typical_deviation: number;
    strip_from: number; strip_to: number; evening_hour: number; morning_hour: number;
    car_start_soc: number; car_stop_soc: number; car_min_sun: number; efficiency: number;
  };
  scale: { sun: number; battery: number; grid: number; house: number; car: number; boiler: number };
  ui: { revert_after: number; hold_ms: number; double_tap_ms: number; hint_seconds: number };
}

export type NumberSection = keyof NumberSettings;

/** Colours of the card (hex, #RRGGBB); every one has a default (config.ts, COLORS). */
export interface Colors {
  sun: string;
  battery: string;
  grid: string;
  house: string;
  car: string;
  boiler: string;
  /** Discharging in the charts of the battery (charging is the colour of the battery). */
  discharge: string;
  accent: string;
  warning: string;
  /** The neutral grey of idle icons and texts. */
  neutral: string;
  /** The two halves of the drop of the water mixing. */
  cold: string;
  hot: string;
}

/** One point of the temperature colour scale of the hot-water gauges. */
export interface TempStop {
  temp: number;
  color: string;
}

/** Headings of the three panels; one that is not set is named in the card language (i18n.ts). */
export interface Titles {
  electricity: string;
  car: string;
  water: string;
}

/** The card YAML as Home Assistant passes it: sections may be absent or null. */
export type DashboardConfig = {
  type?: string;
  title?: string | null;
  language?: LanguageSetting | null;
} & { [Name in SectionName]?: Record<string, unknown> | null } & Record<string, unknown>;

/** Normalized configuration used by the card. */
export interface Settings {
  /** Undefined: the heading of the card language ("Energie", "Energy", "Energi"); "" leaves it out. */
  title: string | undefined;
  language: LanguageSetting;
  entities: EntitySections;
  /** A heading that is not set is undefined and takes the card language. */
  titles: Partial<Titles>;
  num: NumberSettings;
  colors: Colors;
  /** Colour scale of the temperature gauges, ordered by temperature. */
  tempScale: TempStop[];
  /** Whether the boiler tile is always in the diagram or only while it heats (and `boiler.hold_minutes` after). */
  boilerShow: "always" | "heating";
  /** Decimal places of the kW values: 1, 2 or "auto" (at least three digits). */
  powerDecimals: 1 | 2 | "auto";
  /** Where a double tap or long press on the car picture goes; empty = nowhere. */
  carLink: string;
  /** The history range the battery detail opens with (battery.default_range); the last choice of the user wins. */
  batteryRange: "1d" | "7d" | "30d";
  /** The history range the sun detail opens with (forecast.default_range). */
  sunRange: "7d" | "30d";
}

declare global {
  /** The build stamp (version, time, the commit the build was made after), written by vite.config.ts. */
  const __BUILD__: string;
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview: boolean;
    }>;
  }
}
