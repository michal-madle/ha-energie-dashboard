import type { EntitySections, HomeAssistant, NumberSettings, Settings } from "./types";
import { readNumber, readText } from "./utils";

/*
 * Power flows of the card (CURRENT_SPEC.md, Karta Elektřina (Sankey)). Everything is derived from
 * the measured values and the signs of ENTITY_MAP.md; nothing is derived from a difference of the
 * sources, except which source feeds the loads (shares of the measured source flows). Every
 * threshold comes from the configuration (settings.num).
 */

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

/**
 * Whether a power counts as a flow: from `flows.idle_threshold` W (default 100) upwards. Below it
 * (noise such as ±99 W on the meter) there is no flow at all (CURRENT_SPEC.md, Toky energie).
 */
export const isOn = (watts: number | undefined, idle: number): boolean => watts !== undefined && watts >= idle;

export function carLink(status: string | undefined): CarLink {
  if (status === "Disconnected") return "disconnected";
  if (status === "Waiting") return "connected";
  if (status === "Charging") return "charging";
  return undefined;
}

export function buildModel(hass: HomeAssistant | undefined, settings: Settings): FlowModel {
  const e = settings.entities;
  const idle = settings.num.flows.idle_threshold;
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

  // Only flows from the threshold up take part in the shares and in the bands (noise is no flow).
  const real = (value: number | undefined) => (isOn(value, idle) ? value! : 0);
  // What each source gives to the loads: the sun without what it puts into the battery and the grid.
  const toLoads: Record<Source, number> = {
    sun: Math.max(0, real(sun) - real(batIn) - real(exp)),
    bat: real(batDis),
    grid: real(imp),
  };
  const total = toLoads.sun + toLoads.bat + toLoads.grid;
  const share: Record<Source, number> = { sun: 0, bat: 0, grid: 0 };
  if (total > 0) {
    for (const source of SOURCES) share[source] = toLoads[source] / total;
  }

  const flows: Flow[] = [];
  const loads: Array<[Sink, number | undefined]> = [
    ["house", other],
    ["car", car],
    ["boil", boil],
  ];
  for (const [sink, watts] of loads) {
    if (!isOn(watts, idle)) continue;
    for (const source of SOURCES) {
      const part = watts! * share[source];
      if (part > 0.5) flows.push({ from: source, to: sink, watts: part });
    }
  }
  if (isOn(batIn, idle)) flows.push({ from: "sun", to: "batIn", watts: batIn! });
  if (isOn(exp, idle)) flows.push({ from: "sun", to: "gridOut", watts: exp! });

  const model: FlowModel = {
    sun, batDis, batIn, imp, exp, other, car, boil, share, flows,
    soc: readNumber(hass, e.battery.state_of_charge),
    carSoc: readNumber(hass, e.car.state_of_charge),
    carRange: readNumber(hass, e.car.range),
    boilTemp: readNumber(hass, e.boiler.temperature),
    carLink: carLink(readText(hass, e.wallbox.status)),
  };
  Object.assign(model, summarize(model, settings.num.flows));
  return model;
}

/** The sentence under the title (what the sun does; otherwise where the house gets its energy). */
export function summarize(m: FlowModel, flows: NumberSettings["flows"]): { summary?: string; summarySource?: Source } {
  const idle = flows.idle_threshold;
  const on = (value: number | undefined) => isOn(value, idle);
  const noData = [m.sun, m.batDis, m.imp, m.other].every((value) => value === undefined);
  if (noData) return {};
  // The sun covers the house when nothing is taken from the battery or the grid.
  const sunCovers = on(m.sun) && !on(m.imp) && !on(m.batDis);
  if (sunCovers) {
    let text: string;
    if ((m.exp ?? 0) > flows.export_notice && !on(m.batIn)) text = "Přebytek jde do sítě";
    else if (on(m.car)) text = `Slunce nabíjí ${on(m.batIn) ? "baterii i " : ""}auto`;
    else if (on(m.batIn)) text = "Slunce nabíjí baterii";
    else text = "Slunce pokrývá dům";
    return { summary: text, summarySource: "sun" };
  }
  const { sun, bat, grid } = m.share;
  if (grid > flows.grid_deviation_share / 100) return { summary: "Dům jede ze sítě", summarySource: "grid" };
  const min = flows.source_min_share / 100;
  if (sun < min && grid < min && bat > 0) return { summary: "Dům jede z baterie", summarySource: "bat" };
  const list = sourceList(m.share, min);
  if (!list.length) return { summary: "Dům nic neodebírá" };
  const names = { sun: "slunce", bat: "baterie", grid: "sítě" } as const;
  const text = `Dům bere ${SOURCE_TEXT[list[0]]}${list.slice(1).map((source) => ` a ${names[source]}`).join("")}`;
  return { summary: text, summarySource: list[0] };
}

const SOURCE_TEXT: Record<Source, string> = { sun: "ze slunce", bat: "z baterie", grid: "ze sítě" };

/** Sources with a share of at least `min` (0–1), largest first; the sun first on a tie. */
export function sourceList(share: Record<Source, number>, min: number): Source[] {
  return SOURCES.filter((source) => share[source] >= min).sort((a, b) => share[b] - share[a]);
}

export interface SourceText {
  /** "ze slunce", "z baterie a sítě" … */
  text: string;
  /** The largest source. */
  main: Source;
  /** More than the configured share comes from the grid: a deviation (orange). */
  deviation: boolean;
}

/** Where a load gets its energy, as text (CURRENT_SPEC.md, Auto: smíšené nabíjení); the sun when nothing is measured. */
export function sourceText(share: Record<Source, number>, flows: NumberSettings["flows"]): SourceText {
  const names = { sun: "slunce", bat: "baterie", grid: "sítě" } as const;
  let list = sourceList(share, flows.source_min_share / 100);
  if (!list.length) list = ["sun"];
  const deviation = share.grid > flows.grid_deviation_share / 100;
  return { text: SOURCE_TEXT[list[0]] + list.slice(1).map((source) => ` a ${names[source]}`).join(""), main: deviation ? "grid" : list[0], deviation };
}

/** State of the water mixing from its two valves (CURRENT_SPEC.md, Mísení vody). */
export type Mixing = "on" | "off" | "unclear" | undefined;

export function mixingState(hass: HomeAssistant | undefined, mixing: EntitySections["mixing"]): Mixing {
  const c1 = readText(hass, mixing.valve_c1);
  const c2 = readText(hass, mixing.valve_c2);
  if (c1 === undefined || c2 === undefined) return undefined;
  if (c1 === "off" && c2 === "on") return "on";
  if (c1 === "on" && c2 === "off") return "off";
  return "unclear";
}
