import type { HomeAssistant, Settings } from "./types";
import { readNumber, readText } from "./utils";

/*
 * Power flows of the card (CURRENT_SPEC.md, Karta Elektřina = Sankey). Everything is derived from
 * the measured values and the signs of ENTITY_MAP.md; nothing is derived from a difference of the
 * sources, except which source feeds the loads (shares of the measured source flows).
 */

/** Below this power (W) a flow counts as none: sensors jitter around zero. */
export const EPS = 10;

export type Source = "sun" | "bat" | "grid";
export const SOURCES: readonly Source[] = ["sun", "bat", "grid"];

/** The five consumers on the right of the diagram, top to bottom. */
export type Sink = "house" | "car" | "boil" | "batIn" | "gridOut";
export const SINKS: readonly Sink[] = ["house", "car", "boil", "batIn", "gridOut"];

export interface Flow {
  from: Source;
  to: Sink;
  /** W */
  watts: number;
}

export type CarLink = "disconnected" | "connected" | "charging" | undefined;

export interface FlowModel {
  /** W, undefined = no data (missing, unavailable, unknown). */
  sun?: number;
  batDis?: number;
  batIn?: number;
  imp?: number;
  exp?: number;
  /** House without car and boiler (the house total includes both, CURRENT_SPEC.md). */
  other?: number;
  car?: number;
  boil?: number;
  /** Per source, the share of the loads it feeds (0–1); all 0 when nothing can be attributed. */
  share: Record<Source, number>;
  flows: Flow[];
  soc?: number;
  carSoc?: number;
  carRange?: number;
  boilTemp?: number;
  carLink: CarLink;
  /** One sentence about where the energy comes from and goes to; undefined without data. */
  summary?: string;
  summarySource?: Source;
}

const positive = (value: number | undefined): number | undefined => (value === undefined ? undefined : Math.max(0, value));

export function carLink(status: string | undefined): CarLink {
  if (status === "Disconnected") return "disconnected";
  if (status === "Waiting") return "connected";
  if (status === "Charging") return "charging";
  return undefined;
}

export function buildModel(hass: HomeAssistant | undefined, settings: Settings): FlowModel {
  const e = settings.entities;
  const sun = positive(readNumber(hass, e.pv.power));
  const battery = readNumber(hass, e.battery.power); // + discharging, − charging (measured 15. 10.)
  const grid = readNumber(hass, e.grid.power); // − import (measured); + export (sign by definition, TODO P1.11)
  const house = positive(readNumber(hass, e.house.power));
  const car = positive(readNumber(hass, e.wallbox.power));
  const boil = positive(readNumber(hass, e.boiler.power));

  const batDis = battery === undefined ? undefined : Math.max(0, battery);
  const batIn = battery === undefined ? undefined : Math.max(0, -battery);
  const imp = grid === undefined ? undefined : Math.max(0, -grid);
  const exp = grid === undefined ? undefined : Math.max(0, grid);
  const other = house === undefined ? undefined : Math.max(0, house - (car ?? 0) - (boil ?? 0));

  // What each source gives to the loads: the sun without what it puts into the battery and the grid.
  const toLoads: Record<Source, number> = {
    sun: Math.max(0, (sun ?? 0) - (batIn ?? 0) - (exp ?? 0)),
    bat: batDis ?? 0,
    grid: imp ?? 0,
  };
  const total = toLoads.sun + toLoads.bat + toLoads.grid;
  const share: Record<Source, number> = { sun: 0, bat: 0, grid: 0 };
  if (total > EPS) {
    for (const source of SOURCES) share[source] = toLoads[source] / total;
  }

  const flows: Flow[] = [];
  const loads: Array<[Sink, number | undefined]> = [
    ["house", other],
    ["car", car],
    ["boil", boil],
  ];
  for (const [sink, watts] of loads) {
    if (!watts || watts <= EPS) continue;
    for (const source of SOURCES) {
      const part = watts * share[source];
      if (part > EPS / 2) flows.push({ from: source, to: sink, watts: part });
    }
  }
  if ((batIn ?? 0) > EPS) flows.push({ from: "sun", to: "batIn", watts: batIn! });
  if ((exp ?? 0) > EPS) flows.push({ from: "sun", to: "gridOut", watts: exp! });

  const model: FlowModel = {
    sun, batDis, batIn, imp, exp, other, car, boil, share, flows,
    soc: readNumber(hass, e.battery.state_of_charge),
    carSoc: readNumber(hass, e.car.state_of_charge),
    carRange: readNumber(hass, e.car.range),
    boilTemp: readNumber(hass, e.boiler.temperature),
    carLink: carLink(readText(hass, e.wallbox.status)),
  };
  Object.assign(model, summarize(model));
  return model;
}

/** The sentence under the title (what the sun does; otherwise where the house gets its energy). */
export function summarize(m: FlowModel): { summary?: string; summarySource?: Source } {
  const noData = [m.sun, m.batDis, m.imp, m.other].every((value) => value === undefined);
  if (noData) return {};
  // The sun covers the house when nothing is taken from the battery or the grid.
  const sunCovers = (m.sun ?? 0) > 50 && (m.imp ?? 0) <= EPS && (m.batDis ?? 0) <= EPS;
  if (sunCovers) {
    let text: string;
    if ((m.exp ?? 0) > 300 && (m.batIn ?? 0) < 50) text = "Přebytek jde do sítě";
    else if ((m.car ?? 0) > EPS) text = `Slunce nabíjí ${(m.batIn ?? 0) > 50 ? "baterii i " : ""}auto`;
    else if ((m.batIn ?? 0) > 50) text = "Slunce nabíjí baterii";
    else text = "Slunce pokrývá dům";
    return { summary: text, summarySource: "sun" };
  }
  const { sun, bat, grid } = m.share;
  if (grid > 0.5) return { summary: "Dům jede ze sítě", summarySource: "grid" };
  if (sun < 0.15 && grid < 0.15 && bat > 0) return { summary: "Dům jede z baterie", summarySource: "bat" };
  const list = ([["ze slunce", sun, "sun"], ["z baterie", bat, "bat"], ["ze sítě", grid, "grid"]] as const)
    .filter((item) => item[1] >= 0.15)
    .sort((a, b) => b[1] - a[1]);
  if (!list.length) return { summary: "Dům nic neodebírá" };
  const names = { "ze slunce": "slunce", "z baterie": "baterie", "ze sítě": "sítě" } as const;
  const text = `Dům bere ${list[0][0]}${list.slice(1).map((item) => ` a ${names[item[0]]}`).join("")}`;
  return { summary: text, summarySource: list[0][2] };
}
