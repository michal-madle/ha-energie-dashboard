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
  battery: { power?: EntityId; state_of_charge?: EntityId };
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
  mixing: { valve_c1?: EntityId; valve_c2?: EntityId; script?: EntityId };
}

export type SectionName = keyof EntitySections;

/** Numeric settings (limits, thresholds, scales); every one has a default (config.ts, NUMBERS). */
export interface NumberSettings {
  battery: { reserve: number };
  car: { charge_limit: number };
  wallbox: { phases: number; power_min: number; power_max: number; power_step: number; priority_min_sun: number };
  boiler: {
    target_min: number;
    target_max: number;
    target_step: number;
    scale_min: number;
    gauge_max: number;
    schema_max: number;
    cold_below: number;
    hot_from: number;
  };
  tank: { temp_min: number; temp_max: number; temp_step: number };
  flows: {
    idle_threshold: number;
    kw_from: number;
    sun_covers: number;
    export_notice: number;
    battery_flow: number;
    source_min_share: number;
    grid_deviation_share: number;
    band_max_px_per_kw: number;
    band_min_px: number;
  };
  scale: { sun: number; battery: number; grid: number; house: number; car: number; boiler: number };
  ui: { revert_after: number };
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
  button: string;
  warning: string;
  /** Water below the cold limit, and the neutral grey of idle icons and lukewarm water. */
  cold: string;
  neutral: string;
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
