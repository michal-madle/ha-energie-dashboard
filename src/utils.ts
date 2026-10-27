import type { HassEntity, HomeAssistant } from "./types";

/** An entity state that carries no value (CURRENT_SPEC.md, Chybějící a zastaralá data). */
const NO_VALUE = new Set(["unavailable", "unknown", ""]);

export function entityState(hass: HomeAssistant | undefined, id: string | undefined): HassEntity | undefined {
  return id ? hass?.states?.[id] : undefined;
}

/** The text state of an entity, or undefined when it is missing, unavailable or unknown. */
export function readText(hass: HomeAssistant | undefined, id: string | undefined): string | undefined {
  const state = entityState(hass, id)?.state;
  return state === undefined || NO_VALUE.has(state) ? undefined : state;
}

/**
 * A number from an entity, or undefined when the entity is missing, unavailable, unknown or not
 * numeric. Power sensors in kW are converted to W; the card works in W.
 */
export function readNumber(hass: HomeAssistant | undefined, id: string | undefined): number | undefined {
  const entity = entityState(hass, id);
  const text = readText(hass, id);
  if (text === undefined) {
    return undefined;
  }
  const value = Number(text);
  if (!Number.isFinite(value)) {
    return undefined;
  }
  return entity?.attributes?.unit_of_measurement === "kW" ? value * 1000 : value;
}

const kw = new Intl.NumberFormat("cs-CZ", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const whole = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 0 });

export type PowerUnit = "W" | "kW";

/** One unit for every value of the card: kW when any power reaches 1 kW, otherwise W. */
export function powerUnit(values: Array<number | undefined>): PowerUnit {
  return values.some((value) => value !== undefined && Math.abs(value) >= 1000) ? "kW" : "W";
}

export function formatPower(watts: number, unit: PowerUnit): string {
  return unit === "kW" ? `${kw.format(watts / 1000)} kW` : `${whole.format(Math.round(watts))} W`;
}

export function formatNumber(value: number, digits = 0): string {
  return new Intl.NumberFormat("cs-CZ", { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
}
