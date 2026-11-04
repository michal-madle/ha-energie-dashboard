/*
 * Data and calculations of the sun detail (CURRENT_SPEC.md, Slunce): the curve of what is possible that
 * the card learns from the recent days, the estimate of the day with its range and certainty, the five
 * days ahead, the evening estimate of the battery and the sunrise and sunset. Everything here is pure
 * (no Lit, no kit). An hour without data is `undefined`; nothing is invented, so the callers show "––".
 */
import { DAY, HOUR, midnight } from "./battery-data";
import type { StatRow } from "./battery-data";

const finite = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);

/** kWh of every hour of a day, by the local midnight of the day; an hour without a row is undefined. */
export type HourlyDays = Map<number, Array<number | undefined>>;

/** The energy of every local hour from hourly statistics: `change` in kWh, or `mean` in W (which is Wh in an hour, so /1000). */
export function hourlyEnergy(rows: StatRow[] | undefined, field: "change" | "mean"): HourlyDays {
  const days: HourlyDays = new Map();
  for (const row of rows ?? []) {
    const value = row[field];
    if (!finite(value) || !finite(row.start)) continue;
    const date = new Date(row.start);
    const key = midnight(row.start);
    const hours = days.get(key) ?? new Array<number | undefined>(24).fill(undefined);
    hours[date.getHours()] = Math.max(0, field === "mean" ? value / 1000 : value);
    days.set(key, hours);
  }
  return days;
}

/** The sum of the known hours of a day; undefined when fewer than `min` hours are known. */
export function dayTotal(hours: Array<number | undefined> | undefined, min = 1): number | undefined {
  if (!hours) return undefined;
  const known = hours.filter((value): value is number => value !== undefined);
  return known.length >= min ? known.reduce((sum, value) => sum + value, 0) : undefined;
}

/** The p-th percentile (0–100) of the values, interpolated; undefined without values. */
export function percentile(values: number[], p: number): number | undefined {
  if (!values.length) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const position = (Math.min(100, Math.max(0, p)) / 100) * (sorted.length - 1);
  const low = Math.floor(position);
  const high = Math.ceil(position);
  return sorted[low] + (sorted[high] - sorted[low]) * (position - low);
}

export const median = (values: number[]): number | undefined => percentile(values, 50);

/** The local midnights of the `count` days before `today`, newest first. */
export function daysBefore(today: number, count: number): number[] {
  const result: number[] = [];
  const date = new Date(today);
  for (let i = 0; i < count; i++) {
    date.setDate(date.getDate() - 1);
    result.push(date.getTime());
  }
  return result;
}

/** The local midnight `count` days after `day` (negative = before). */
export function addDays(day: number, count: number): number {
  const date = new Date(day);
  date.setDate(date.getDate() + count);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

/** What the sun gave in the days before today, by hour: the learned curve of what is possible (kWh in the hour), and the days it comes from. */
export interface Learned {
  /** The p-th percentile of each hour over the last days; undefined where fewer than three days have the hour. */
  curve: Array<number | undefined>;
  /** The p-th percentile of the daily totals of the last days; undefined without three complete days. */
  daily?: number;
  days: number;
}

export function learn(days: HourlyDays, today: number, count: number, p: number): Learned {
  const recent = daysBefore(today, count).filter((day) => days.has(day));
  const curve = Array.from({ length: 24 }, (_, hour) => {
    const values = recent.map((day) => days.get(day)![hour]).filter((value): value is number => value !== undefined);
    return values.length >= 3 ? percentile(values, p) : undefined;
  });
  // A day counts for the daily total when most of its hours are known (a day with a hole would give a false low).
  const totals = recent.map((day) => dayTotal(days.get(day), 20)).filter((value): value is number => value !== undefined);
  return { curve, daily: totals.length >= 3 ? percentile(totals, p) : undefined, days: recent.length };
}

/** The curve spread to a total: how much of it falls in each hour (sums to 1); undefined for a curve of nothing. */
export function shape(curve: Array<number | undefined>): number[] | undefined {
  const sum = curve.reduce<number>((total, value) => total + (value ?? 0), 0);
  return sum > 0 ? curve.map((value) => (value ?? 0) / sum) : undefined;
}

/** A whole day of `total` kWh spread over the hours by the curve; undefined when there is no curve. */
export function spread(total: number, curve: Array<number | undefined>): number[] | undefined {
  const s = shape(curve);
  return s ? s.map((part) => part * total) : undefined;
}

/**
 * Today by hour: the hours that are over are what the sun gave, the rest is `remaining` kWh spread by the curve
 * (the present hour only for the part of it that is left).
 */
export function todayHours(actual: Array<number | undefined> | undefined, remaining: number, curve: Array<number | undefined>, now: number): Array<number | undefined> {
  const date = new Date(now);
  const hour = date.getHours();
  const left = 1 - (date.getMinutes() * 60 + date.getSeconds()) / 3600;
  const weights = curve.map((value, h) => (h < hour ? 0 : h === hour ? (value ?? 0) * left : value ?? 0));
  const sum = weights.reduce((total, value) => total + value, 0);
  return Array.from({ length: 24 }, (_, h) => {
    if (h < hour) return actual?.[h];
    return sum > 0 ? (weights[h] / sum) * Math.max(0, remaining) : undefined;
  });
}

// ----------------------------------------------------------------------------- the estimate of the day

export type Certainty = "low" | "medium" | "high";

export interface Estimate {
  /** kWh of the whole day. */
  value: number;
  low: number;
  high: number;
  /** How much of the estimate is done (0–1). */
  done: number;
  certainty: Certainty;
  source: "forecast" | "pace";
}

/** The kWh the learned curve still has from `now` to the end of the day (the present hour only for the part of it that is left). */
export function curveLeft(curve: Array<number | undefined>, now: number): number {
  const date = new Date(now);
  const hour = date.getHours();
  const left = 1 - (date.getMinutes() * 60 + date.getSeconds()) / 3600;
  return curve.reduce<number>((sum, value, h) => sum + (h < hour ? 0 : h === hour ? (value ?? 0) * left : value ?? 0), 0);
}

/**
 * The estimate of the whole day. With a forecast it is the forecast (never below what is already produced), but what is still to
 * come is held to what the sun can still give: never above what the learned curve has left, and scaled by how the last hour went
 * against the curve (`recent`: kWh produced and kWh the curve had in it). Without a forecast it is
 * the pace: what is produced plus what the learned curve still has, scaled by how the day went so far against the curve.
 * The range narrows through the day (what is done is certain) by the typical deviation of the forecast (`deviation`, 0–1);
 * the certainty rises with the share of the day that is done and falls when the forecast is usually far off.
 */
export function estimateDay(done: number | undefined, forecast: number | undefined, curve: Array<number | undefined>, now: number, deviation: number, recent?: { actual: number; possible: number }): Estimate | undefined {
  if (done === undefined) return undefined;
  const date = new Date(now);
  const hour = date.getHours() + date.getMinutes() / 60;
  const curveBefore = curve.reduce<number>((sum, value, h) => sum + (value ?? 0) * Math.min(1, Math.max(0, hour - h)), 0);
  const curveTotal = curve.reduce<number>((sum, value) => sum + (value ?? 0), 0);
  let value: number | undefined;
  let source: Estimate["source"] = "forecast";
  if (forecast !== undefined) {
    const possibleRest = curveLeft(curve, now);
    let rest = Math.min(Math.max(forecast - done, 0), possibleRest);
    // The last hour says how the sky is now; with too little in it (morning, evening) it says nothing.
    if (recent && recent.possible >= 0.3) rest = Math.min(rest, possibleRest * Math.min(1, Math.max(0, recent.actual / recent.possible)));
    value = done + rest;
  } else if (curveTotal > 0 && curveBefore >= 0.5) {
    // The pace is trusted only after the curve has had something to say (half a kWh); before it there is no estimate.
    const rest = curveTotal - curveBefore;
    value = done + rest * Math.min(2, done / curveBefore);
    source = "pace";
  }
  if (value === undefined) return undefined;
  const share = value > 0 ? Math.min(1, done / value) : 1;
  const k = Math.min(0.6, deviation * (1 + (1 - share)));
  const rest = Math.max(0, value - done);
  const possibleLeft = curveTotal > 0 ? curveLeft(curve, now) : Infinity;
  let certainty: Certainty = share < 0.35 ? "low" : share < 0.7 ? "medium" : "high";
  if (deviation > 0.3 && certainty !== "low") certainty = certainty === "high" ? "medium" : "low";
  return { value, low: done + rest * (1 - k), high: done + Math.min(rest * (1 + k), possibleLeft), done: share, certainty, source };
}

/** The typical relative deviation of the forecast (0–1) from pairs of (forecast, produced); undefined with fewer than three pairs. */
export function typicalDeviation(pairs: Array<{ forecast: number; actual: number }>): number | undefined {
  const usable = pairs.filter((pair) => pair.actual > 0.5);
  if (usable.length < 3) return undefined;
  return usable.reduce((sum, pair) => sum + Math.abs(pair.forecast - pair.actual) / pair.actual, 0) / usable.length;
}

// ----------------------------------------------------------------------------- hours and windows

/** The hours of [from, to] (inclusive) where the kWh of the hour reaches `good` kWh: [first, last + 1] as a window, undefined without a strong hour. */
export function strongWindow(hours: Array<number | undefined>, from: number, to: number, good: number): [number, number] | undefined {
  let first = -1;
  let last = -1;
  for (let h = from; h <= to; h++) {
    if ((hours[h] ?? 0) >= good) {
      if (first < 0) first = h;
      last = h;
    }
  }
  return first < 0 ? undefined : [first, last + 1];
}

/** Hours of the day the day's energy is split into for the "denní doba" chart: before 9, 9–11, 11–13, 13–15, from 15. */
export const BLOCK_EDGES = [9, 11, 13, 15] as const;

export function blockOf(hour: number): number {
  const index = BLOCK_EDGES.findIndex((edge) => hour < edge);
  return index < 0 ? BLOCK_EDGES.length : index;
}

/** The kWh of the five blocks of a day; undefined when the day has no known hour. */
export function dayBlocks(hours: Array<number | undefined> | undefined): number[] | undefined {
  if (!hours || !hours.some((value) => value !== undefined)) return undefined;
  const blocks = [0, 0, 0, 0, 0];
  hours.forEach((value, hour) => {
    if (value !== undefined) blocks[blockOf(hour)] += value;
  });
  return blocks;
}

// ----------------------------------------------------------------------------- sunrise and sunset

/**
 * Sunrise and sunset of the local day starting at `day` (ms) for a place, by the sunrise equation (an error of a minute or two);
 * undefined in the polar day and night.
 */
export function sunTimes(day: number, latitude: number, longitude: number): { rise: number; set: number } | undefined {
  const date = new Date(day);
  const noon = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12);
  const n = Math.round(noon / 86400000 + 2440587.5 - 2451545.0);
  const rad = Math.PI / 180;
  const jStar = n - longitude / 360;
  const m = (357.5291 + 0.98560028 * jStar) % 360;
  const c = 1.9148 * Math.sin(m * rad) + 0.02 * Math.sin(2 * m * rad) + 0.0003 * Math.sin(3 * m * rad);
  const lambda = (m + c + 180 + 102.9372) % 360;
  const transit = 2451545.0 + jStar + 0.0053 * Math.sin(m * rad) - 0.0069 * Math.sin(2 * lambda * rad);
  const sinDecl = Math.sin(lambda * rad) * Math.sin(23.4397 * rad);
  const cosDecl = Math.cos(Math.asin(sinDecl));
  const cosOmega = (Math.sin(-0.833 * rad) - Math.sin(latitude * rad) * sinDecl) / (Math.cos(latitude * rad) * cosDecl);
  if (cosOmega < -1 || cosOmega > 1) return undefined;
  const omega = Math.acos(cosOmega) / rad;
  const toMs = (jd: number) => (jd - 2440587.5) * 86400000;
  return { rise: toMs(transit - omega / 360), set: toMs(transit + omega / 360) };
}

// ----------------------------------------------------------------------------- the evening

export interface EveningInput {
  now: number;
  /** % */
  soc: number;
  /** kWh usable capacity and the reserve in % */
  capacity: number;
  reserve: number;
  /** kWh of the sun in each hour of today (from now on), 24 entries; the hours after today give nothing. */
  sun: Array<number | undefined>;
  /** kWh of the house in each hour of the day (the median of recent days), 24 entries. */
  house: Array<number | undefined>;
  /** Efficiency of the battery in one direction (0–1). */
  efficiency: number;
  eveningHour: number;
  morningHour: number;
  /** The wallbox as the user runs it: undefined = no car in the estimate. */
  car?: { startSoc: number; stopSoc: number; minSun: number; watts: number };
}

export interface Evening {
  /** When the battery gets full (ms), undefined when it does not before the evening or already is. */
  fullAt?: number;
  /** % at the evening hour, undefined when the evening hour has passed. */
  socAtEvening?: number;
  /** kWh the car takes from the sun, in total and the km it makes (the caller multiplies by km/kWh). */
  carSun: number;
  carTotal: number;
  /** kWh of the sun and of the house from now until the evening hour. */
  sunUntilEvening: number;
  houseUntilEvening: number;
  /** % at the morning hour of the next day (the reserve at the lowest). */
  socAtMorning?: number;
}

/**
 * The simulation in steps of a quarter of an hour from now to the morning hour of the next day: the sun feeds the house (and the
 * car, if it runs), the surplus fills the battery, a lack empties it down to the reserve and then comes from the grid. The car
 * follows the user's rule: it starts when the battery has `startSoc` and the sun `minSun`, and stops at `stopSoc`.
 */
export function simulateEvening(input: EveningInput): Evening {
  const { capacity, efficiency } = input;
  let stored = (input.soc / 100) * capacity;
  const reserveKwh = (input.reserve / 100) * capacity;
  const result: Evening = { carSun: 0, carTotal: 0, sunUntilEvening: 0, houseUntilEvening: 0 };
  let t = Math.ceil(input.now / (HOUR / 4)) * (HOUR / 4);
  const dayStart = midnight(input.now);
  const eveningAt = dayStart + input.eveningHour * HOUR;
  const end = addDays(dayStart, 1) + input.morningHour * HOUR;
  let carRunning = false;
  let wasFull = stored >= capacity - 0.01;
  for (; t <= end; t += HOUR / 4) {
    if (!result.socAtEvening && t >= eveningAt && input.now < eveningAt) {
      result.socAtEvening = (stored / capacity) * 100;
    }
    const hour = new Date(t - 1).getHours();
    const sameDay = t - 1 < addDays(dayStart, 1);
    const sun = sameDay ? (input.sun[hour] ?? 0) / 4 : 0;
    const house = (input.house[hour] ?? 0) / 4;
    if (t <= eveningAt) {
      result.sunUntilEvening += sun;
      result.houseUntilEvening += house;
    }
    const soc = (stored / capacity) * 100;
    let carStep = 0;
    if (input.car && sameDay) {
      if (carRunning && soc <= input.car.stopSoc) carRunning = false;
      else if (!carRunning && soc >= input.car.startSoc && sun * 4 * 1000 >= input.car.minSun) carRunning = true;
      carStep = carRunning ? input.car.watts / 1000 / 4 : 0;
    }
    const demand = house + carStep;
    const fromSun = Math.min(sun, demand);
    const surplus = sun - fromSun;
    const lack = demand - fromSun;
    if (carStep > 0) {
      // The car takes from the sun what is left after the house, the rest of it from the battery or the grid.
      result.carTotal += carStep;
      result.carSun += Math.min(carStep, Math.max(0, sun - house));
    }
    if (surplus > 0) {
      stored = Math.min(capacity, stored + surplus * efficiency);
    } else if (lack > 0) {
      const available = Math.max(0, stored - reserveKwh) * efficiency;
      const fromBattery = Math.min(lack, available);
      stored -= fromBattery / efficiency;
    }
    if (!wasFull && stored >= capacity - 0.01 && result.fullAt === undefined && t < eveningAt) {
      result.fullAt = t;
    }
    if (stored >= capacity - 0.01) wasFull = true;
    if (t >= end) result.socAtMorning = (stored / capacity) * 100;
  }
  return result;
}

// ----------------------------------------------------------------------------- smooth curves

/** The points of a smooth curve through (xs, ys) that never overshoots between the points (monotone cubic Hermite). */
export function smooth(xs: number[], ys: number[], samples = 8): Array<[number, number]> {
  const m = ys.length;
  if (m === 0) return [];
  if (m === 1) return [[xs[0], ys[0]]];
  const d = Array.from({ length: m - 1 }, (_, i) => (ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i]));
  const tangent = [d[0], ...Array.from({ length: m - 2 }, (_, k) => (d[k] * d[k + 1] <= 0 ? 0 : (2 * d[k] * d[k + 1]) / (d[k] + d[k + 1]))), d[m - 2]];
  const out: Array<[number, number]> = [];
  for (let i = 0; i < m - 1; i++) {
    const h = xs[i + 1] - xs[i];
    for (let j = 0; j < samples; j++) {
      const u = j / samples;
      const h00 = 2 * u ** 3 - 3 * u ** 2 + 1;
      const h10 = u ** 3 - 2 * u ** 2 + u;
      const h01 = -2 * u ** 3 + 3 * u ** 2;
      const h11 = u ** 3 - u ** 2;
      out.push([xs[i] + u * h, h00 * ys[i] + h10 * h * tangent[i] + h01 * ys[i + 1] + h11 * h * tangent[i + 1]]);
    }
  }
  out.push([xs[m - 1], ys[m - 1]]);
  return out;
}

/** The p-th percentile of the daily totals of the `count` days before `day` that are in `days`; undefined with fewer than three. */
export function possibleOfDay(days: HourlyDays, day: number, count: number, p: number): number | undefined {
  const totals = daysBefore(day, count)
    .map((d) => dayTotal(days.get(d), 20))
    .filter((value): value is number => value !== undefined);
  return totals.length >= 3 ? percentile(totals, p) : undefined;
}

export { DAY, HOUR };
