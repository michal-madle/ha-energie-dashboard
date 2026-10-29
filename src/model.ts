import type { Texts } from "./i18n";
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

/** The loads the sources fill in order (the battery and the grid take only the sun's surplus). */
export type LoadSink = "house" | "car" | "boil";

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
  /** Per source, the share of all loads it feeds (0–1); all 0 when nothing can be attributed. */
  share: Record<Source, number>;
  /** Per load, the share of each source in it (0–1): the sources fill the loads in order, so the bands do not cross. Without its own flow a load shows the overall share. */
  loadShare: Record<LoadSink, Record<Source, number>>;
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

export function buildModel(hass: HomeAssistant | undefined, settings: Settings, t: Texts): FlowModel {
  const e = settings.entities;
  const idle = settings.num.flows.idle_threshold;
  const sun = positive(readNumber(hass, e.pv.power));
  const battery = readNumber(hass, e.battery.power); // + discharging, − charging (measured 15. 10.)
  const grid = readNumber(hass, e.grid.power); // − import (measured); + export (sign by definition, confirmed 28. 10.)
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

  // The sources fill the loads in order (the sun first, then the battery, then the grid; the house first, then the
  // car, then the boiler), so every source feeds the loads next to each other and the bands do not cross
  // (CURRENT_SPEC.md, Toky energie). The supply is scaled to the loads, so each load shows its whole power.
  const flows: Flow[] = [];
  const loadShare: Record<LoadSink, Record<Source, number>> = { house: { ...share }, car: { ...share }, boil: { ...share } };
  const loads: Array<[LoadSink, number | undefined]> = [
    ["house", other],
    ["car", car],
    ["boil", boil],
  ];
  const demand = loads.reduce((sum, [, watts]) => sum + (isOn(watts, idle) ? watts! : 0), 0);
  const left: Record<Source, number> = { sun: 0, bat: 0, grid: 0 };
  for (const source of SOURCES) left[source] = total > 0 ? (toLoads[source] * demand) / total : 0;
  for (const [sink, watts] of loads) {
    if (!isOn(watts, idle)) continue;
    let need = watts!;
    const own: Record<Source, number> = { sun: 0, bat: 0, grid: 0 };
    for (const source of SOURCES) {
      const part = Math.min(left[source], need);
      left[source] -= part;
      need -= part;
      own[source] = part / watts!;
      if (part > 0.5) flows.push({ from: source, to: sink, watts: part });
    }
    if (own.sun + own.bat + own.grid > 0) loadShare[sink] = own;
  }
  if (isOn(batIn, idle)) flows.push({ from: "sun", to: "batIn", watts: batIn! });
  if (isOn(exp, idle)) flows.push({ from: "sun", to: "gridOut", watts: exp! });

  const model: FlowModel = {
    sun, batDis, batIn, imp, exp, other, car, boil, share, loadShare, flows,
    soc: readNumber(hass, e.battery.state_of_charge),
    carSoc: readNumber(hass, e.car.state_of_charge),
    carRange: readNumber(hass, e.car.range),
    boilTemp: readNumber(hass, e.boiler.temperature),
    carLink: carLink(readText(hass, e.wallbox.status)),
  };
  Object.assign(model, summarize(model, settings.num.flows, t));
  return model;
}

/** The sentence under the title (what the sun does; otherwise where the house gets its energy). */
export function summarize(m: FlowModel, flows: NumberSettings["flows"], t: Texts): { summary?: string; summarySource?: Source } {
  const idle = flows.idle_threshold;
  const on = (value: number | undefined) => isOn(value, idle);
  const noData = [m.sun, m.batDis, m.imp, m.other].every((value) => value === undefined);
  if (noData) return {};
  // The sun covers the house when nothing is taken from the battery or the grid.
  const sunCovers = on(m.sun) && !on(m.imp) && !on(m.batDis);
  if (sunCovers) {
    let text: string;
    if ((m.exp ?? 0) > flows.export_notice && !on(m.batIn)) text = t.summary.exportSurplus;
    else if (on(m.car)) text = t.summary.sunChargesCar(on(m.batIn));
    else if (on(m.batIn)) text = t.summary.sunChargesBattery;
    else text = t.summary.sunCoversHouse;
    return { summary: text, summarySource: "sun" };
  }
  const { sun, bat, grid } = m.loadShare.house;
  if (grid > flows.grid_deviation_share / 100) return { summary: t.summary.fromGrid, summarySource: "grid" };
  const min = flows.source_min_share / 100;
  if (sun < min && grid < min && bat > 0) return { summary: t.summary.fromBattery, summarySource: "bat" };
  const list = sourceList(m.loadShare.house, min);
  if (!list.length) return { summary: t.summary.nothing };
  return { summary: t.summary.houseTakes(sourcePhrase(list, t)), summarySource: list[0] };
}

/** "ze slunce a baterie", "from the sun and the battery": the first source in its own form, the rest after "a". */
function sourcePhrase(list: Source[], t: Texts): string {
  return t.from[list[0]] + list.slice(1).map((source) => ` ${t.and} ${t.alsoFrom[source]}`).join("");
}

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
export function sourceText(share: Record<Source, number>, flows: NumberSettings["flows"], t: Texts): SourceText {
  let list = sourceList(share, flows.source_min_share / 100);
  if (!list.length) list = ["sun"];
  const deviation = share.grid > flows.grid_deviation_share / 100;
  return { text: sourcePhrase(list, t), main: deviation ? "grid" : list[0], deviation };
}

/** State of the water mixing from its two valves (CURRENT_SPEC.md, Mísení vody). */
export type Mixing = "on" | "off" | "unclear" | undefined;

export function mixingState(c1: string | undefined, c2: string | undefined): Mixing {
  if (c1 === undefined || c2 === undefined) return undefined;
  if (c1 === "off" && c2 === "on") return "on";
  if (c1 === "on" && c2 === "off") return "off";
  return "unclear";
}
