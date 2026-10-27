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
  /** Home Assistant's theme; the card takes its colours from the theme's CSS variables, not from this. */
  themes?: { darkMode?: boolean };
}

// ------------------------------------------------------------ configuration (YAML)

/**
 * Sections of the card configuration, one per system (CURRENT_SPEC.md, Konfigurace). Every
 * entity key is optional; an entity that is not configured is missing data ("––").
 */
export interface EntitySections {
  pv: { power?: EntityId };
  battery: { power?: EntityId; state_of_charge?: EntityId };
  grid: { power?: EntityId };
  house: { power?: EntityId };
  car: { state_of_charge?: EntityId; range?: EntityId };
  wallbox: { power?: EntityId; status?: EntityId; boost?: EntityId; block_charging?: EntityId; prioritize_connected?: EntityId };
  boiler: { power?: EntityId; temperature?: EntityId; boost?: EntityId; target_temperature?: EntityId; boost_target_temperature?: EntityId };
  tank: { water_heater?: EntityId };
  mixing: { valve_c1?: EntityId; valve_c2?: EntityId; script?: EntityId };
}

export type SectionName = keyof EntitySections;

/** The card YAML as Home Assistant passes it: sections may be absent or null. */
export type DashboardConfig = {
  type?: string;
  title?: string | null;
} & { [Name in SectionName]?: Partial<Record<keyof EntitySections[Name], EntityId | null>> | null } & Record<
    string,
    unknown
  >;

/** Normalized configuration used by the card. */
export interface Settings {
  title: string;
  entities: EntitySections;
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
