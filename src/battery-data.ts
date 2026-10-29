/*
 * Data and geometry of the battery detail (CURRENT_SPEC.md, Baterie): the history is read from the
 * long-term statistics of Home Assistant (websocket `recorder/statistics_during_period`, see
 * homeassistant/components/recorder/websocket_api.py, 2026.10.1), and the charts are drawn from
 * it as plain SVG paths. Everything here is pure (no Lit, no kit), so it is easy to reason about.
 * A bin without a sample is `undefined`: the charts then leave a gap, they never invent a value.
 */
import type { HomeAssistant } from "./types";

export type Period = "5minute" | "hour" | "day";
export type StatType = "mean" | "min" | "max" | "state" | "change" | "sum";

/** One row of a statistic: `start` is in ms (the websocket answers with ms timestamps). */
export interface StatRow {
  start: number;
  mean?: number | null;
  min?: number | null;
  max?: number | null;
  state?: number | null;
  change?: number | null;
  sum?: number | null;
}

export type Stats = Record<string, StatRow[]>;

export type Range = "1d" | "7d" | "30d";
export const RANGES: readonly Range[] = ["1d", "7d", "30d"];
export const RANGE_DAYS: Record<Range, number> = { "1d": 1, "7d": 7, "30d": 30 };

/** The width of every chart (the SVGs scale to the card with this viewBox). */
export const W = 310;

export const HOUR = 3600000;
export const DAY = 24 * HOUR;

const finite = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);

/** The statistics of some entities between two times; rejects when Home Assistant refuses. */
export async function fetchStatistics(hass: HomeAssistant, ids: string[], start: number, end: number, period: Period, types: StatType[]): Promise<Stats> {
  if (!ids.length) return {};
  const result = await hass.callWS<Stats | null>({
    type: "recorder/statistics_during_period",
    start_time: new Date(start).toISOString(),
    end_time: new Date(end).toISOString(),
    statistic_ids: ids,
    period,
    types,
  });
  return result ?? {};
}

/** Midnight of the local day of `time`. */
export function midnight(time: number): number {
  const date = new Date(time);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

/**
 * The values of `field` of the rows spread over `n` equal bins between `start` and `end`: the mean
 * of the rows in a bin (or their minimum, maximum, sum or last value). A bin without a row is undefined.
 * `slack` moves the rows later (ms): the rows of days start at midnight, which in a day of 23 or 25 hours is not a multiple of 24 h.
 */
export function bin(rows: StatRow[] | undefined, field: StatType, start: number, end: number, n: number, how: "mean" | "min" | "max" | "last" | "sum" = "mean", slack = 0): Array<number | undefined> {
  const sums: number[] = new Array(n).fill(0);
  const counts: number[] = new Array(n).fill(0);
  const picked: Array<number | undefined> = new Array(n).fill(undefined);
  const width = (end - start) / n;
  for (const row of rows ?? []) {
    const value = row[field];
    if (!finite(value) || !finite(row.start) || width <= 0) continue;
    const index = Math.floor((row.start - start + slack) / width);
    if (index < 0 || index >= n) continue;
    counts[index]++;
    sums[index] += value;
    const current = picked[index];
    if (how === "min") picked[index] = current === undefined ? value : Math.min(current, value);
    else if (how === "max") picked[index] = current === undefined ? value : Math.max(current, value);
    else if (how === "last") picked[index] = value;
  }
  return picked.map((value, index) => {
    if (!counts[index]) return undefined;
    if (how === "mean") return sums[index] / counts[index];
    if (how === "sum") return sums[index];
    return value;
  });
}

/** Rows of an entity are present (at least one finite value of the field). */
export function hasValues(rows: StatRow[] | undefined, field: StatType): boolean {
  return (rows ?? []).some((row) => finite(row[field]));
}

export const round1 = (value: number): number => Math.round(value * 10) / 10;

/** "M x y L x y …" through the values; a missing value breaks the line. */
export function linePath(values: Array<number | undefined>, x: (index: number) => number, y: (value: number) => number): string {
  let path = "";
  let pen = false;
  values.forEach((value, index) => {
    if (value === undefined) {
      pen = false;
      return;
    }
    path += `${pen ? " L" : path ? " M" : "M"}${round1(x(index))} ${round1(y(value))}`;
    pen = true;
  });
  return path;
}

/** A closed shape between a line and a baseline, one piece per run of known values. */
export function areaPath(values: Array<number | undefined>, x: (index: number) => number, y: (value: number) => number, base: number): string {
  let path = "";
  let start = -1;
  const close = (end: number) => {
    if (start < 0) return;
    path += `${path ? " " : ""}M${round1(x(start))} ${round1(base)}`;
    for (let i = start; i <= end; i++) path += ` L${round1(x(i))} ${round1(y(values[i]!))}`;
    path += ` L${round1(x(end))} ${round1(base)} Z`;
    start = -1;
  };
  values.forEach((value, index) => {
    if (value === undefined) close(index - 1);
    else if (start < 0) start = index;
  });
  close(values.length - 1);
  return path;
}

/** The band between two lines (upper and lower), one piece per run of bins where both are known. */
export function bandPath(low: Array<number | undefined>, high: Array<number | undefined>, x: (index: number) => number, y: (value: number) => number): string {
  let path = "";
  let start = -1;
  const known = (i: number) => low[i] !== undefined && high[i] !== undefined;
  const close = (end: number) => {
    if (start < 0) return;
    path += `${path ? " " : ""}M${round1(x(start))} ${round1(y(high[start]!))}`;
    for (let i = start + 1; i <= end; i++) path += ` L${round1(x(i))} ${round1(y(high[i]!))}`;
    for (let i = end; i >= start; i--) path += ` L${round1(x(i))} ${round1(y(low[i]!))}`;
    path += " Z";
    start = -1;
  };
  for (let i = 0; i < low.length; i++) {
    if (!known(i)) close(i - 1);
    else if (start < 0) start = i;
  }
  close(low.length - 1);
  return path;
}

/** A round upper limit above a value (1, 2, 3, 5, 10, 20 …), so the axis labels are tidy. */
export function niceCeil(value: number): number {
  if (!(value > 0)) return 1;
  const exponent = Math.floor(Math.log10(value));
  const base = 10 ** exponent;
  const fraction = value / base;
  const step = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 3 ? 3 : fraction <= 5 ? 5 : 10;
  return step * base;
}

/** The domain of an auto-scaled axis around the data: a margin of a tenth and at least `minSpan`. */
export function domain(values: Array<number | undefined>, minSpan: number): { lo: number; hi: number } | undefined {
  const known = values.filter((value): value is number => value !== undefined);
  if (!known.length) return undefined;
  let lo = Math.min(...known);
  let hi = Math.max(...known);
  const span = Math.max(hi - lo, minSpan);
  const centre = (hi + lo) / 2;
  lo = centre - span / 2 - span * 0.1;
  hi = centre + span / 2 + span * 0.1;
  return { lo, hi };
}

/** The minutes left until the battery is full or empty at the present power, rounded to 5 minutes; undefined = no estimate. */
export function minutesLeft(percentLeft: number, capacityKwh: number, watts: number): number | undefined {
  if (!(watts > 0) || !(percentLeft > 0) || !(capacityKwh > 0)) return undefined;
  const hours = ((percentLeft / 100) * capacityKwh) / (watts / 1000);
  const minutes = Math.round((hours * 60) / 5) * 5;
  return minutes >= 5 && minutes < 48 * 60 ? minutes : undefined;
}

/** "7 h 30 min", "45 min", "3 h" (the same in all three languages). */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h === 0 ? `${m} min` : m === 0 ? `${h} h` : `${h} h ${m} min`;
}
