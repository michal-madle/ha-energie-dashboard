import { checkKeys, entityId, fail, isRecord, languageSetting, section, withCardName } from "ha-dashboard-kit/config";
import { BOILER_SHOW, COLORS, DEFAULT_BOILER_SHOW, EXTRA_KEYS, NUMBERS, SECTION_KEYS, SECTION_NAMES, TEMP_SCALE, TITLE_KEYS } from "./config-schema";
import type { Range } from "./config-schema";
import type { Colors, DashboardConfig, EntitySections, NumberSettings, SectionName, Settings, TempStop, Titles } from "./types";

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

function titles(config: DashboardConfig): Partial<Titles> {
  const input = section(config.titles, "titles");
  checkKeys(input, [...TITLE_KEYS], "titles");
  const result: Record<string, string> = {};
  for (const key of TITLE_KEYS) {
    const raw = input[key];
    if (raw === undefined || raw === null) {
      continue;
    }
    if (typeof raw !== "string" || raw.trim() === "") {
      fail(`titles.${key} must be a non-empty text.`);
    }
    result[key] = raw.trim();
  }
  return result as Partial<Titles>;
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
  return withCardName("Energie Dashboard", () => normalize(config));
}

function normalize(config: DashboardConfig): Settings {
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
  const language = languageSetting(config.language);
  return { title: config.title ?? undefined, language, entities, titles: titles(config), num, colors: colors(config), tempScale: tempScale(config), boilerShow: boilerShow(config), carLink: carLink(config) };
}
