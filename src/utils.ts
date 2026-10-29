import { entityState, readNumber as readPlainNumber, readText } from "ha-dashboard-kit/entities";
import { getI18n } from "./i18n";
import type { I18n, Texts } from "./i18n";
import type { HomeAssistant } from "./types";

export { entityState, readText };

/**
 * A number from an entity, or undefined when the entity is missing, unavailable, unknown or not
 * numeric. Power sensors in kW are converted to W; the card works in W.
 */
export function readNumber(hass: HomeAssistant | undefined, id: string | undefined): number | undefined {
  const value = readPlainNumber(hass, id);
  if (value === undefined) {
    return undefined;
  }
  return entityState(hass, id)?.attributes?.unit_of_measurement === "kW" ? value * 1000 : value;
}

/**
 * Numbers follow the card language and the profile of Home Assistant (i18n.ts). The card sets the
 * format at the start of every update, before it renders; until then Czech is used.
 */
let format: I18n = getI18n("cs");
/** Decimal places of the kW values (flows.decimals). */
let powerDigits: 1 | 2 | "auto" = "auto";

export function useFormat(i18n: I18n, decimals: 1 | 2 | "auto" = "auto"): void {
  format = i18n;
  powerDigits = decimals;
}

export type PowerUnit = "W" | "kW";

/** One unit for every value of the card: kW when any power reaches `from` W (flows.kw_from), otherwise W. */
export function powerUnit(values: Array<number | undefined>, from = 1000): PowerUnit {
  return values.some((value) => value !== undefined && Math.abs(value) >= from) ? "kW" : "W";
}

/** kW with the decimals of flows.decimals; "auto" keeps at least three digits: 0,13 · 1,36 · 6,43 · 11,3 · 123. */
function kilowatts(value: number): string {
  const digits = powerDigits === "auto" ? (Math.abs(Math.round(value * 100) / 100) < 10 ? 2 : Math.abs(Math.round(value * 10) / 10) < 100 ? 1 : 0) : powerDigits;
  return digits === 2 ? format.two(value) : digits === 1 ? format.one(value) : format.whole(value);
}

export function formatPower(watts: number, unit: PowerUnit): string {
  return unit === "kW" ? `${kilowatts(watts / 1000)} kW` : `${format.whole(Math.round(watts))} W`;
}

/** A number with no decimal place, or with one (the only two the card uses). */
export function formatNumber(value: number, digits = 0): string {
  return digits === 0 ? format.whole(value) : format.one(value);
}

/** "65 %" in Czech and Swedish, "65%" in English (the rule of Home Assistant). */
export function formatPercent(value: number | string): string {
  return format.percent(typeof value === "number" ? formatNumber(value) : value);
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

/** "právě teď", "před 4 min", "před 2 h", "před 3 d" (in the card language) from an ISO time. */
export function ago(iso: string | undefined, now: number, t: Texts): string | undefined {
  const time = iso ? Date.parse(iso) : NaN;
  if (!Number.isFinite(time)) return undefined;
  const minutes = Math.max(0, Math.round((now - time) / 60000));
  if (minutes < 1) return t.ago.now;
  if (minutes < 60) return t.ago.minutes(minutes);
  if (minutes < 60 * 24) return t.ago.hours(Math.round(minutes / 60));
  return t.ago.days(Math.round(minutes / (60 * 24)));
}
