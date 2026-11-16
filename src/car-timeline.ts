/*
 * The timeline of the car today in the sheet „Co se děje s autem“ (uživatel 16. 11. 2026: „Q298 varianta 2“): what happened,
 * when and why, built from the recorder of Home Assistant (history of the Boost switch, the mode, the state of the wallbox,
 * the reason of the last end and the charge of the car). Changes a few seconds apart are one row.
 */
import type { Texts } from "./i18n";

/** One state of an entity at a moment (ms), as the recorder returns it. */
export interface Point { at: number; state: string }
export type Series = Partial<Record<"boost" | "mode" | "status" | "end" | "soc" | "target", Point[]>>;

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
export function timeline(series: Series, from: number, t: Texts, percent: (value: number) => string, clock: (ms: number) => string): TimelineRow[] {
  const i = t.car.info.timeline;
  type Raw = { at: number; kind: string; text: string; house?: boolean; extra?: string[] };
  const raw: Raw[] = [];
  const target = (at: number) => {
    const value = Number(valueAt(series.target, at + SAME));
    return Number.isFinite(value) && value < 100 ? percent(value) : undefined;
  };
  // A Boost that already ran at midnight: the first row says since when (dashboard-critic 16. 11. 2026).
  let house = false;
  const firstBoost = (series.boost ?? []).find((point) => !UNKNOWN.has(point.state));
  if (firstBoost?.state === "on" && firstBoost.at < from) raw.push({ at: from, kind: "start", text: i.overnight });
  for (const c of changes(series.boost)) {
    if (c.to === "on") {
      house = valueAt(series.mode, c.at + SAME) === "Auto";
      const goal = target(c.at);
      const text = house ? i.houseStart : goal ? i.boostTo(goal) : i.boostOn;
      raw.push({ at: c.at < from ? from : c.at, kind: "start", text: c.at < from ? i.since(text, clock(c.at)) : text });
    } else if (c.to === "off") raw.push({ at: c.at, kind: "end", text: house ? i.houseEnd : i.boostOff, house });
  }
  // Every new reason is an end, also the first of the day (the helper may start empty). It carries the charge the end
  // was decided on and the energy the wallbox delivered („kód|čas|nabití|energie“).
  let lastEnd: string | undefined;
  for (const point of series.end ?? []) {
    if (point.state === "unknown" || point.state === "unavailable" || point.state === lastEnd) continue;
    const first = lastEnd === undefined;
    lastEnd = point.state;
    const [code, , soc, kwh] = point.state.split("|");
    const why = t.wallbox.endReason[code];
    if (!why || (first && point.at < from)) continue;
    const extra: string[] = [];
    if (soc !== undefined && soc !== "" && Number.isFinite(Number(soc))) extra.push(i.soc(percent(Number(soc))));
    if (kwh !== undefined && kwh !== "" && Number.isFinite(Number(kwh))) extra.push(i.delivered(kwh.replace(".", ",")));
    raw.push({ at: point.at, kind: "why", text: why, extra });
  }
  for (const c of changes(series.status)) {
    const text = c.to === "Charging" ? i.charging : c.to === "Disconnected" ? i.unplugged : c.from === "Disconnected" ? i.plugged
      : c.from === "Charging" ? i.stopped : c.to !== "Waiting" ? i.wallbox(c.to) : undefined;
    if (text) raw.push({ at: c.at, kind: "status", text });
  }
  for (const c of changes(series.mode)) raw.push({ at: c.at, kind: "mode", text: i.mode(t.chargeModes[c.to] ?? c.to) });
  raw.sort((a, b) => a.at - b.at);

  // Changes a few seconds apart are one row (counted from the first one): the most telling one is the title.
  const weight: Record<string, number> = { end: 5, start: 4, status: 3, mode: 2, why: 1 };
  const lower = (text: string) => text.charAt(0).toLocaleLowerCase() + text.slice(1);
  type Row = TimelineRow & { statusOnly: boolean; charging: boolean };
  const rows: Row[] = [];
  let group: Raw[] = [];
  const flush = () => {
    if (!group.length) return;
    const main = [...group].sort((a, b) => weight[b.kind] - weight[a.kind])[0];
    const why = group.find((item) => item.kind === "why");
    const title = main.kind === "end" && why ? `${main.text}: ${why.text}` : main.text;
    // The mode the Boost switched to says nothing new; the return to Přetoky after it does.
    const detail = group
      .filter((item) => item !== main && item.kind !== "why" && !(main.kind === "start" && item.kind === "mode"))
      .map((item) => lower(item.text));
    if (why?.extra?.length) detail.push(...why.extra);
    else {
      const soc = Number(valueAt(series.soc, main.kind === "end" ? main.at - 1 : group[group.length - 1].at + SAME));
      if (Number.isFinite(soc)) detail.push(i.soc(percent(soc)));
    }
    if (group[0].at >= from) {
      const statusOnly = group.every((item) => item.kind === "status");
      rows.push({ at: group[0].at, title, detail, statusOnly, charging: statusOnly && main.text === i.charging });
    }
    group = [];
  };
  for (const item of raw) {
    if (group.length && item.at - group[0].at > SAME) flush();
    group.push(item);
  }
  flush();

  // A cloudy day in Přetoky: the AZ Router starts and stops many times. Runs of bare starts and stops are one row.
  const out: TimelineRow[] = [];
  for (let n = 0; n < rows.length; n++) {
    const row = rows[n];
    let m = n;
    while (m + 1 < rows.length && rows[m + 1].statusOnly && row.statusOnly) m++;
    const starts = rows.slice(n, m + 1).filter((r) => r.charging).length;
    if (m - n >= 2 && starts >= 2) {
      out.push({ at: row.at, title: i.surplusRuns(starts), detail: [i.until(clock(rows[m].at))] });
      n = m;
    } else out.push({ at: row.at, title: row.title, detail: row.detail });
  }
  return out;
}
