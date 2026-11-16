/*
 * The timeline of the car today in the sheet „Co se děje s autem“ (uživatel 16. 11. 2026: „Q298 varianta 2“): what happened,
 * when and why, built from the recorder of Home Assistant (history of the Boost switch, the mode, the state of the wallbox,
 * the reason of the last end and the charge of the car). Changes a few seconds apart are one row.
 */
import type { Texts } from "./i18n";

/** One state of an entity at a moment (ms), as the recorder returns it. */
export interface Point { at: number; state: string }
export type Series = Partial<Record<"boost" | "mode" | "status" | "end" | "soc", Point[]>>;

export interface TimelineRow { at: number; title: string; detail: string[] }

const SAME = 20000; // ms: changes this close to each other are one event (the Boost goes off, the mode returns, charging stops)
const UNKNOWN = new Set(["unknown", "unavailable", ""]);

/** The value of a series at a moment (the last known state before it). */
function valueAt(points: Point[] | undefined, at: number): string | undefined {
  let value: string | undefined;
  for (const point of points ?? []) {
    if (point.at > at) break;
    if (!UNKNOWN.has(point.state)) value = point.state;
  }
  return value;
}

/** The real changes of a series (a restart, unknown or unavailable, is not a change). */
function changes(points: Point[] | undefined): Array<{ at: number; from: string | undefined; to: string }> {
  const out: Array<{ at: number; from: string | undefined; to: string }> = [];
  let last: string | undefined;
  for (const point of points ?? []) {
    if (UNKNOWN.has(point.state) || point.state === last) continue;
    if (last !== undefined) out.push({ at: point.at, from: last, to: point.state });
    last = point.state;
  }
  return out;
}

/**
 * Rows of the timeline since `from`, oldest first. `percent` formats the charge, `reasons` names the codes of the end of a
 * Boost (the same as the row Wallbox).
 */
export function timeline(series: Series, from: number, t: Texts, percent: (value: number) => string): TimelineRow[] {
  const i = t.car.info.timeline;
  type Raw = { at: number; kind: string; text: string };
  const raw: Raw[] = [];
  for (const c of changes(series.boost)) {
    if (c.to === "on") {
      const mode = valueAt(series.mode, c.at + SAME);
      raw.push({ at: c.at, kind: "start", text: mode === "Auto" ? i.houseStart : i.boostOn });
    } else if (c.to === "off") raw.push({ at: c.at, kind: "end", text: i.boostOff });
  }
  // Every new reason is an end, also the first of the day (the helper may start empty).
  let lastEnd: string | undefined;
  for (const point of series.end ?? []) {
    if (point.state === "unknown" || point.state === "unavailable" || point.state === lastEnd) continue;
    const first = lastEnd === undefined;
    lastEnd = point.state;
    const why = t.wallbox.endReason[point.state.split("|")[0]];
    if (why && !(first && point.at < from)) raw.push({ at: point.at, kind: "why", text: why });
  }
  for (const c of changes(series.status)) {
    const text = c.to === "Charging" ? i.charging : c.to === "Disconnected" ? i.unplugged : c.from === "Disconnected" ? i.plugged : c.from === "Charging" ? i.stopped : undefined;
    if (text) raw.push({ at: c.at, kind: "status", text });
  }
  for (const c of changes(series.mode)) raw.push({ at: c.at, kind: "mode", text: i.mode(t.chargeModes[c.to] ?? c.to) });
  raw.sort((a, b) => a.at - b.at);

  // Changes a few seconds apart are one row: the most telling one is the title, the others go to the detail.
  const weight: Record<string, number> = { end: 5, start: 4, status: 3, mode: 2, why: 1 };
  const rows: TimelineRow[] = [];
  let group: Raw[] = [];
  const flush = () => {
    if (!group.length) return;
    const main = [...group].sort((a, b) => weight[b.kind] - weight[a.kind])[0];
    const why = group.find((item) => item.kind === "why");
    const title = main.kind === "end" && why ? `${main.text}: ${why.text}` : main.text;
    // The other changes of the moment follow the title in small letters („režim Přetoky · přestalo nabíjet“).
    const lower = (text: string) => text.charAt(0).toLocaleLowerCase() + text.slice(1);
    const detail = group.filter((item) => item !== main && !(main.kind === "end" && item === why) && item.kind !== "why").map((item) => lower(item.text));
    const soc = Number(valueAt(series.soc, group[group.length - 1].at + SAME));
    if (Number.isFinite(soc)) detail.push(i.soc(percent(soc)));
    if (group[0].at >= from) rows.push({ at: group[0].at, title, detail });
    group = [];
  };
  for (const item of raw) {
    if (group.length && item.at - group[group.length - 1].at > SAME) flush();
    group.push(item);
  }
  flush();
  return rows;
}
