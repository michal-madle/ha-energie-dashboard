export type EntityId = string;

export interface HassEntity {
  state: string;
  attributes: Record<string, unknown>;
  /** ISO time; changes only when the state or an attribute changes. */
  last_updated?: string;
  last_changed?: string;
}

export interface HomeAssistant {
  states: Record<EntityId, HassEntity>;
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
  ): Promise<unknown>;
  /** Home Assistant's theme: the card only follows its dark / light mode; surfaces and colours are its own. */
  themes?: { darkMode?: boolean };
}

// ------------------------------------------------------------ configuration (YAML)

/**
 * Entity sections of the card configuration, one per system (CURRENT_SPEC.md, Konfigurace). Every
 * entity key is optional; an entity that is not configured is missing data ("––").
 */
export interface EntitySections {
  pv: { power?: EntityId };
  battery: { power?: EntityId; state_of_charge?: EntityId; depth_of_discharge?: EntityId };
  grid: { power?: EntityId };
  house: { power?: EntityId };
  car: { state_of_charge?: EntityId; range?: EntityId; image?: EntityId };
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
  battery: { reserve: number };
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

/** Headings of the three panels; every one has a default (config.ts, TITLES). */
export interface Titles {
  electricity: string;
  car: string;
  water: string;
}

/** The card YAML as Home Assistant passes it: sections may be absent or null. */
export type DashboardConfig = {
  type?: string;
  title?: string | null;
} & { [Name in SectionName]?: Record<string, unknown> | null } & Record<string, unknown>;

/** Normalized configuration used by the card. */
export interface Settings {
  title: string;
  entities: EntitySections;
  titles: Titles;
  num: NumberSettings;
  colors: Colors;
  /** Colour scale of the temperature gauges, ordered by temperature. */
  tempScale: TempStop[];
  /** Whether the boiler tile is always in the diagram or only while it heats (and `boiler.hold_minutes` after). */
  boilerShow: "always" | "heating";
  /** Where a double tap or long press on the car picture goes; empty = nowhere. */
  carLink: string;
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview: boolean;
    }>;
  }
}
