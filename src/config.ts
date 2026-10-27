import type { DashboardConfig, EntitySections, SectionName, Settings } from "./types";

/*
 * Card configuration (CURRENT_SPEC.md, Konfigurace): every key is optional. A key without a
 * value (`power:` in YAML, i.e. null) is the same as no key, so the example can list every
 * setting. Entities have no default: an entity that is not configured is missing data ("––").
 * A wrong value stops the card with an error that names the key; nothing is silently ignored,
 * except unknown top-level keys, which Home Assistant adds itself (grid_options, view_layout).
 */

export const DEFAULT_TITLE = "Energie";

/**
 * Keys of every section and the domain an entity must have, where the card will call a service
 * on it or read a domain-specific attribute (undefined = any entity).
 */
export const SECTION_KEYS: { [Name in SectionName]: Record<keyof EntitySections[Name], string | undefined> } = {
  pv: { power: undefined },
  battery: { power: undefined, state_of_charge: undefined },
  grid: { power: undefined },
  house: { power: undefined },
  car: { state_of_charge: undefined, range: undefined },
  wallbox: { power: undefined, status: undefined, boost: "switch", block_charging: "switch", prioritize_connected: "switch" },
  boiler: { power: undefined, temperature: undefined, boost: "switch", target_temperature: "number", boost_target_temperature: "number" },
  tank: { water_heater: "water_heater" },
  mixing: { valve_c1: "switch", valve_c2: "switch", script: "script" },
};

export const SECTION_NAMES = Object.keys(SECTION_KEYS) as SectionName[];

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
  checkKeys(input, Object.keys(keys), name);
  const result: Record<string, string> = {};
  for (const [key, domain] of Object.entries(keys)) {
    const id = entityId(input[key], `${name}.${key}`, domain);
    if (id) {
      result[key] = id;
    }
  }
  return result as EntitySections[Name];
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
  return { title: config.title ?? DEFAULT_TITLE, entities };
}
