/*
 * Why a device does not take the surplus: the second part of its state sentence, grey (CURRENT_SPEC.md, Důvod ve stavové
 * větě a scénáře nabíjení; uživatel 14. 11. 2026: „Q242 A“, „Q243 ano“; 15. 11. 2026: „Q277 GO“ to the plan with the
 * reasons H7 and H8). One reason at most, the first that holds in a fixed order; without data no reason.
 */
import type { FlowModel } from "./model";
import { isOn } from "./model";
import type { Settings } from "./types";
import type { Texts } from "./i18n";
import { formatClock } from "./utils";

/** Reads the state of an entity (undefined when missing, unknown or unavailable). */
export type Read = (id: string | undefined) => string | undefined;

/** "08:00:00" → minutes after midnight. */
function minutes(value: string | undefined): number | undefined {
  const match = value?.match(/^(\d{1,2}):(\d{2})/);
  return match ? Number(match[1]) * 60 + Number(match[2]) : undefined;
}

/** "8:00–17:30" when the window of the AZ Router is on and now is outside it; undefined otherwise or without data. */
export function outsideWindow(read: Read, window: string | undefined, start: string | undefined, end: string | undefined, now: number): string | undefined {
  if (read(window) !== "on") return undefined;
  const from = minutes(read(start));
  const to = minutes(read(end));
  if (from === undefined || to === undefined || from === to) return undefined;
  const date = new Date(now);
  const at = date.getHours() * 60 + date.getMinutes();
  // A window over midnight (22:00–6:00) is inside when after the start or before the end.
  const inside = from < to ? at >= from && at < to : at >= from || at < to;
  if (inside) return undefined;
  const clock = (m: number) => formatClock(new Date(date.getFullYear(), date.getMonth(), date.getDate(), Math.floor(m / 60), m % 60).getTime());
  return `${clock(from)}–${clock(to)}`;
}

/**
 * The car is connected and does not charge in Přetoky (H7). Order: the user's block, solar charging blocked, outside the
 * window, the surplus heats the water (the cascade of the AZ Router gives the surplus to one unit only, the water has
 * the first place: TYDEN.md, Kaskáda AZ Routeru), the sun charges the battery, no sun, too little surplus.
 */
export function carReason(read: Read, s: Settings, model: FlowModel, t: Texts, now: number): string | undefined {
  const w = s.entities.wallbox;
  const idle = s.num.flows.idle_threshold;
  if (read(w.block_charging) === "on" && read(w.block_by_automation) !== "on") return t.reasons.blocked;
  if (read(w.block_solar) === "on") return t.reasons.solarBlocked;
  const window = outsideWindow(read, w.window, w.window_start, w.window_end, now);
  if (window) return t.reasons.outsideWindow(window);
  if (model.sun === undefined) return undefined;
  if (!isOn(model.sun, idle)) return t.reasons.noSun;
  // Only the boiler heated from the surplus takes it from the car; its Boost heats from the grid as well.
  if (isOn(model.boil, idle) && read(s.entities.boiler.boost) !== "on") return t.reasons.waterFirst;
  if (isOn(model.batIn, idle) && (model.soc === undefined || model.soc < s.num.battery.full)) return t.reasons.batteryCharges;
  // Enough surplus goes to the grid for the lowest charging power, and the car still does not take it (full, own limit).
  if ((model.exp ?? 0) >= s.num.wallbox.power_min) return t.reasons.carNotTaking;
  return t.reasons.littleSurplus;
}

/**
 * Boost chosen and the car does not charge („klikám a nejde to“, uživatel 15. 11. 2026): the user's block, otherwise the
 * car does not take it, after `wallbox.boost_grace` seconds (the car needs a moment to start).
 */
export function boostReason(read: Read, s: Settings, t: Texts, now: number, since?: number): string | undefined {
  const w = s.entities.wallbox;
  if (read(w.block_charging) === "on" && read(w.block_by_automation) !== "on") return t.reasons.blocked;
  if (since !== undefined && Number.isFinite(since) && now - since < s.num.wallbox.boost_grace * 1000) return undefined;
  return t.reasons.carNotTaking;
}

/** The surplus goes to the grid and the boiler does not heat (H8): solar heating blocked, outside the window, heated. */
export function boilerReason(read: Read, s: Settings, model: FlowModel, t: Texts, now: number): string | undefined {
  const b = s.entities.boiler;
  if ((model.exp ?? 0) <= s.num.flows.export_notice || isOn(model.boil, s.num.flows.idle_threshold)) return undefined;
  if (read(b.block_solar) === "on") return t.reasons.solarBlocked;
  const window = outsideWindow(read, b.window, b.window_start, b.window_end, now);
  if (window) return t.reasons.outsideWindow(window);
  const target = Number(read(b.target_temperature));
  if (model.boilTemp !== undefined && Number.isFinite(target) && model.boilTemp >= target - s.num.boiler.hot_margin) return t.reasons.heated;
  return undefined;
}

/** After „Přebytek jde do sítě“: a mode of the inverter other than general, otherwise a full battery (H8). */
export function gridReason(read: Read, s: Settings, model: FlowModel, t: Texts): string | undefined {
  if (model.summary !== t.summary.exportSurplus) return undefined;
  const mode = read(s.entities.battery.operation_mode);
  if (mode && mode !== "general") return t.reasons.inverterMode(t.reasons.inverterModes[mode] ?? mode);
  if (model.soc !== undefined && model.soc >= s.num.battery.full) return t.reasons.batteryFull;
  return undefined;
}
