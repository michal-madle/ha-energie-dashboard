/* Constants, types and small helpers shared by the parts of the card. */
import type { HassEntity } from "./types";
import type { Sink, Source } from "./model";

/** Shown for every value without data (CURRENT_SPEC.md, Chybějící a zastaralá data). */
export const NO_DATA = "––";

export const SOURCE_VAR: Record<Source, string> = { sun: "--ed-sun", bat: "--ed-battery", grid: "--ed-grid" };
export const TILE_VAR: Record<TileKey, string> = {
  sun: "--ed-sun", bat: "--ed-battery", grid: "--ed-grid",
  house: "--ed-house", car: "--ed-car", boil: "--ed-boiler", batIn: "--ed-battery", gridOut: "--ed-grid",
};

/** Where the time the boiler last heated is kept, so the "boiler only while heating" tile survives a reload. */
export const HEATING_KEY = "ha-energie-dashboard:boiler-heating";

export type TileKey = Source | Sink;

/** Level shown as the fill of a tile, from the left up to `f` (0–1). */
export interface Level {
  f: number;
  /** Active: the colour of the tile; otherwise the fill is grey. */
  active: boolean;
  color: string;
  /** Opacity of the filled part when active. */
  a1: number;
}

export interface Tile {
  side: "L" | "R";
  key: TileKey;
  name: string;
  watts?: number;
  /** Strength of the power 0–1 on the scale of the tile (scale.* in the configuration). */
  k: number;
  icon: string;
  /** Second path inside the icon (arrow in the battery). */
  icon2?: string;
  idleIcon: string;
  idleText: string;
  level?: Level;
  /** Prepared background, for the house tile (shares of the sources). */
  background?: string;
  aria: string;
}

export interface PopRow {
  label: string;
  value: string;
}

export interface PopInfo {
  title: string;
  now: string;
  level?: { label: string; text: string; percent: number; color: string; note: string };
  rows: PopRow[];
}

export interface Alert {
  kind: "warn" | "info";
  title: string;
  text: string;
}

export type Panel = "wallbox" | "targets" | "tank";

/** Parts of the battery detail and its accordion rows (CURRENT_SPEC.md, Baterie). */
export type BatTab = "now" | "hist" | "health";
export type BatRow = "gap" | "temp" | "life";

/** The history of one view of the battery detail: loading, ready or failed (then retried later). */
export interface BatEntry {
  status: "loading" | "ready" | "error";
  /** When the request started (ms); an entry older than the refresh time is fetched again. */
  at: number;
  parts: Record<string, import("./battery-data").Stats>;
}

/** Where the last history range chosen in the battery detail is kept in the browser. */
export const BATTERY_RANGE_KEY = "ha-energie-dashboard:battery-range";

/** A number from an entity attribute, undefined when it is not one. */
export function attribute(entity: HassEntity | undefined, key: string): number | undefined {
  const value = entity?.attributes?.[key];
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

/** Whole percentages of the values that add up to exactly 100 (largest remainder). */
export function percentages(values: number[]): number[] {
  const total = values.reduce((sum, value) => sum + value, 0);
  if (total <= 0) return values.map(() => 0);
  const raw = values.map((value) => (value / total) * 100);
  const result = raw.map(Math.floor);
  let left = 100 - result.reduce((sum, value) => sum + value, 0);
  raw
    .map((value, index) => ({ index, rest: value - result[index] }))
    .sort((a, b) => b.rest - a.rest)
    .forEach(({ index }) => {
      if (left-- > 0) result[index]++;
    });
  return result;
}

export const clamp = (value: number, low: number, high: number) => Math.max(low, Math.min(high, value));

export const mix = (color: string, percent: number) => `color-mix(in srgb, ${color} ${percent}%, transparent)`;

/** A deep, saturated tint of a colour for a tile: the colour over black (dark mode) or white (light mode), not see-through grey. */
export const tint = (color: string, percent: number) => `color-mix(in srgb, ${color} ${percent}%, var(--ed-tint-base))`;

/** Ten segments of a level meter, each filled 0–100 %. */
export const segments = (percent: number) => Array.from({ length: 10 }, (_, q) => clamp((percent - q * 10) / 10, 0, 1) * 100);

/** Where a level (0–100 %) lies on a meter of ten blocks with a 2 px gap (the same as the bar of the sources below it): the end of its block (so a limit of 80 % sits at the end of block eight). */
export const meterPosition = (percent: number): string => `calc((100% - 18px) * ${clamp(percent, 0, 100) / 100} + ${Math.max(0, Math.ceil(clamp(percent, 0, 100) / 10) - 1) * 2}px)`;

/** A class constructor, for the mixins that build the card (base.ts, controls.ts, electricity.ts, car.ts, water.ts). */
export type Constructor<T = object> = new (...args: any[]) => T;
