import { W } from "./battery-data";
import { formatClock, formatDayShort, formatWeekdayShort } from "./utils";

/*
 * The grid of every chart (CURRENT_SPEC.md, Grafy; uživatel 4. 11. 2026: "Tyhle grafy bez vodících čar, bez os atd jsou nesmyslné. […]
 * na šířku okna musí být 6-10 dělení. na výšku musí být cca ve stejném rastru. Změň to všude."):
 * the width of a chart is divided into 6 to 10 parts by guide lines with the time under them, and the height is divided by lines
 * about the same distance apart, so the cells of the grid are about square.
 */

const MINUTE = 60000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
/** The steps of the time guide lines. */
const STEPS = [10 * MINUTE, 15 * MINUTE, 30 * MINUTE, HOUR, 2 * HOUR, 3 * HOUR, 4 * HOUR, 6 * HOUR, 12 * HOUR, DAY, 2 * DAY, 3 * DAY, 5 * DAY, 7 * DAY];
export const MIN_DIVISIONS = 6;
export const MAX_DIVISIONS = 10;
const TARGET_DIVISIONS = 8;

/** The time axis of a chart: what the left and the right edge of the plot stand for and where they are (viewBox units). */
export interface TimeAxis {
  start: number;
  end: number;
  /** Where `start` and `end` lie (default 0 and W). */
  x0?: number;
  x1?: number;
  /** A mapping of its own (the bars of a chart are centred in their slots), instead of the linear one between x0 and x1. */
  x?: (ms: number) => number;
  /** The duration of one bar: the labels stand under the middle of the bar, the lines between the bars. */
  slot?: number;
}

export interface Tick {
  x: number;
  text: string;
  /** Where the label stands when it is not under its line (the middle of a bar). */
  labelX?: number;
}

/** The step with 6 to 10 divisions of the span, the nearest to 8 (on a tie the larger step). */
export function gridStep(span: number): number {
  let best = STEPS[0];
  let bestScore = Infinity;
  for (const step of STEPS) {
    const divisions = span / step;
    const outside = divisions < MIN_DIVISIONS ? MIN_DIVISIONS - divisions : divisions > MAX_DIVISIONS ? divisions - MAX_DIVISIONS : 0;
    const score = outside * 100 + Math.abs(divisions - TARGET_DIVISIONS) - step / 1e12;
    if (score < bestScore) {
      bestScore = score;
      best = step;
    }
  }
  return best;
}

function localMidnight(ms: number): Date {
  const date = new Date(ms);
  date.setHours(0, 0, 0, 0);
  return date;
}

/** The moments of the guide lines: whole hours of the day for steps up to 12 h, midnights counted back from the end for whole days. */
function moments(start: number, end: number, step: number): number[] {
  const result: number[] = [];
  if (step < DAY) {
    const day = localMidnight(start).getTime();
    for (let t = day + Math.ceil((start - day) / step) * step; t <= end; t += step) if (t >= start) result.push(t);
    return result;
  }
  const days = Math.round(step / DAY);
  const last = localMidnight(end);
  for (let k = 0; ; k++) {
    const date = new Date(last);
    date.setDate(last.getDate() - k * days);
    if (date.getTime() < start) break;
    result.push(date.getTime());
  }
  return result.reverse();
}

/** The time guide lines of a chart with their labels (the clock, the weekday, or the day and the month). */
export function timeTicks(axis: TimeAxis): Tick[] {
  const { start, end } = axis;
  const x0 = axis.x0 ?? 0;
  const x1 = axis.x1 ?? W;
  const at = axis.x ?? ((ms: number) => x0 + ((ms - start) / (end - start)) * (x1 - x0));
  const step = gridStep(end - start);
  const label = (ms: number) => (step < DAY ? formatClock(ms) : step === DAY && end - start <= 8 * DAY ? formatWeekdayShort(ms) : formatDayShort(ms));
  // The line on the very edge of the plot has no label (the neighbour would touch it); the lines inside have.
  const list = moments(start, end, step).map((ms) => {
    const x = Math.round(at(ms) * 10) / 10;
    if (axis.slot) {
      const labelX = Math.round(at(ms + axis.slot / 2) * 10) / 10;
      return { x, text: labelX > x1 + 1 ? "" : label(ms), labelX };
    }
    return { x, text: x < x0 + 6 || x > x1 - 6 ? "" : label(ms) };
  });
  // More than 8 parts: every other label, so the labels do not touch.
  return list.length - 1 > 8 ? list.map((tick, i) => (i % 2 === 1 ? tick : { ...tick, text: "" })) : list;
}

/** The distance of the guide lines of the time (the pitch of the grid), viewBox units. */
export function tickPitch(ticks: Tick[] | undefined): number {
  if (!ticks || ticks.length < 2) return W / TARGET_DIVISIONS;
  const gaps = ticks.slice(1).map((tick, i) => tick.x - ticks[i].x).sort((a, b) => a - b);
  return gaps[Math.floor(gaps.length / 2)];
}

const SPLITS = [1, 2, 4, 5];
const NUMERIC_SPLITS = [1, 2, 3, 4, 5, 6, 8, 10];

/** Whether a step is a round number: 1, 2, 2.5 or 5 times a power of ten. */
function isRound(step: number): boolean {
  if (!(step > 0)) return false;
  const mantissa = step / 10 ** Math.floor(Math.log10(step) + 1e-9);
  return [1, 2, 2.5, 5].some((m) => Math.abs(mantissa - m) < 1e-6 * m);
}

/**
 * The horizontal lines of a chart, filled up so that they are about one pitch apart (the cells of the grid are about square):
 * between two given lines 2, 4 or 5 parts. With `num` (the value at a height) only the parts that give a round value (a step of
 * 10 or 25, never 12,5) are used; `value` names the new lines.
 */
export function fillGrid(
  lines: Array<{ y: number; strong?: boolean }>,
  pitch: number,
  value?: (y: number) => string | undefined,
  num?: (y: number) => number,
): { grid: Array<{ y: number; strong?: boolean }>; labels: Array<{ y: number; text: string }> } {
  const sorted = [...lines].sort((a, b) => a.y - b.y);
  const grid = [...sorted];
  const labels: Array<{ y: number; text: string }> = [];
  sorted.slice(1).forEach((line, i) => {
    const top = sorted[i].y;
    const wanted = (line.y - top) / pitch;
    const choices = num ? NUMERIC_SPLITS.filter((k) => k === 1 || isRound(Math.abs(num(line.y) - num(top)) / k)) : SPLITS;
    const parts = choices.reduce((best, k) => (Math.abs(k - wanted) < Math.abs(best - wanted) ? k : best), choices[0] ?? 1);
    for (let k = 1; k < parts; k++) {
      const y = Math.round((top + ((line.y - top) * k) / parts) * 10) / 10;
      grid.push({ y });
      const text = value?.(y);
      if (text) labels.push({ y, text });
    }
  });
  return { grid: grid.sort((a, b) => a.y - b.y), labels };
}

/** A round step (1, 2, 2.5, 5 × 10^k) for about `count` parts of `range`, so the lines of a value axis fall about one pitch apart. */
export function niceStep(range: number, count: number): number {
  const raw = range / Math.max(1, count);
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  return [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((candidate) => candidate >= raw * 0.8) ?? raw;
}
