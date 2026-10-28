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

/** One unit for every value of the card: kW when any power reaches `from` W (flows.kw_from), otherwise W. */
export function powerUnit(values: Array<number | undefined>, from = 1000): PowerUnit {
  return values.some((value) => value !== undefined && Math.abs(value) >= from) ? "kW" : "W";
}

export function formatPower(watts: number, unit: PowerUnit): string {
  return unit === "kW" ? `${kw.format(watts / 1000)} kW` : `${whole.format(Math.round(watts))} W`;
}

export function formatNumber(value: number, digits = 0): string {
  return new Intl.NumberFormat("cs-CZ", { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
}

/**
 * Energy of an entity in kWh (Wh and MWh are converted), or undefined when it is missing,
 * unavailable, unknown or not numeric. Used for the counters of today.
 */
export function readEnergy(hass: HomeAssistant | undefined, id: string | undefined): number | undefined {
  const entity = entityState(hass, id);
  const text = readText(hass, id);
  if (text === undefined) return undefined;
  const value = Number(text);
  if (!Number.isFinite(value)) return undefined;
  const unit = entity?.attributes?.unit_of_measurement;
  return unit === "Wh" ? value / 1000 : unit === "MWh" ? value * 1000 : value;
}

/** kWh with one decimal, "0" for nothing (CURRENT_SPEC.md, Popup záhlaví). */
export function formatKwh(value: number): string {
  return value < 0.05 ? "0" : formatNumber(value, 1);
}

/** "právě teď", "před 4 min", "před 2 h", "před 3 d" from an ISO time. */
export function ago(iso: string | undefined, now: number): string | undefined {
  const time = iso ? Date.parse(iso) : NaN;
  if (!Number.isFinite(time)) return undefined;
  const minutes = Math.max(0, Math.round((now - time) / 60000));
  if (minutes < 1) return "právě teď";
  if (minutes < 60) return `před ${minutes} min`;
  if (minutes < 60 * 24) return `před ${Math.round(minutes / 60)} h`;
  return `před ${Math.round(minutes / (60 * 24))} d`;
}
