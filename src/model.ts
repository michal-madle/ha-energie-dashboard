import type { Texts } from "./i18n";
import type { HomeAssistant, NumberSettings, Settings } from "./types";
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

/** The loads whose sources the texts name (house, car, boiler). */
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
 * A power counts as a flow when it shows as at least 1 W (whole W, from 0,5 W): there is no threshold, everything
 * is shown (uživatel 12. 11. 2026: „zrus threshold na zobrazovani zdroje/spotreby energie. Bude se zobrazovat vse“).
 */
export const SHOWN_W = 0.5;

export const isOn = (watts: number | undefined, idle: number = SHOWN_W): boolean => watts !== undefined && watts >= idle;

export function carLink(status: string | undefined): CarLink {
  if (status === "Disconnected") return "disconnected";
  if (status === "Waiting") return "connected";
  if (status === "Charging") return "charging";
  return undefined;
}

export function buildModel(hass: HomeAssistant | undefined, settings: Settings, t: Texts): FlowModel {
  const e = settings.entities;
  const idle = SHOWN_W;
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
  // The sources fill the consumers in order, top to bottom on both sides (the sun first, then the battery, then the
  // grid; the house first, then the car, the boiler, the battery and the grid), so the bands never cross while the
  // order of the tiles stays (CURRENT_SPEC.md, Toky energie). The battery is charged and the grid is fed by whatever
  // source is left after the consumers above them, not always by the sun (uživatel 12. 11. 2026: „ma jit odtamtud
  // odkud je zdroj elektriny“). The supply is scaled to the consumers, so each of them shows its whole power.
  const supply: Record<Source, number> = { sun: real(sun), bat: real(batDis), grid: real(imp) };
  const supplied = supply.sun + supply.bat + supply.grid;
  const sinks: Array<[Sink, number | undefined]> = [
    ["house", other],
    ["car", car],
    ["boil", boil],
    ["batIn", batIn],
    ["gridOut", exp],
  ];
  const demand = sinks.reduce((sum, [, watts]) => sum + real(watts), 0);
  const left: Record<Source, number> = { sun: 0, bat: 0, grid: 0 };
  for (const source of SOURCES) left[source] = supplied > 0 ? (supply[source] * demand) / supplied : 0;
  const flows: Flow[] = [];
  const own = {} as Record<Sink, Record<Source, number>>;
  const toLoads: Record<Source, number> = { sun: 0, bat: 0, grid: 0 };
  for (const [sink, watts] of sinks) {
    if (!isOn(watts, idle)) continue;
    let need = watts!;
    const parts: Record<Source, number> = { sun: 0, bat: 0, grid: 0 };
    for (const source of SOURCES) {
      const part = Math.min(left[source], need);
      left[source] -= part;
      need -= part;
      parts[source] = part / watts!;
      if (sink === "house" || sink === "car" || sink === "boil") toLoads[source] += part;
      if (part > 0.5) flows.push({ from: source, to: sink, watts: part });
    }
    own[sink] = parts;
  }
  // Per source, its share of what the loads (house, car, boiler) take; a load without its own flow shows this share.
  const total = toLoads.sun + toLoads.bat + toLoads.grid;
  const share: Record<Source, number> = { sun: 0, bat: 0, grid: 0 };
  if (total > 0) {
    for (const source of SOURCES) share[source] = toLoads[source] / total;
  } else if (supplied > 0) {
    for (const source of SOURCES) share[source] = supply[source] / supplied;
  }
  const loadShare: Record<LoadSink, Record<Source, number>> = { house: { ...share }, car: { ...share }, boil: { ...share } };
  for (const load of ["house", "car", "boil"] as const) {
    const parts = own[load];
    if (parts && parts.sun + parts.bat + parts.grid > 0) loadShare[load] = parts;
  }

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
  const idle = SHOWN_W;
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
  // The sentence names the loads that take most of the energy (uživatel 3. 11. 2026: "Dům jede ze sítě" was wrong when the
  // grid fed mostly the car and the boiler): the loads with at least `source_min_share` of the demand, the largest first.
  // When the house is the only one, the sentences below apply.
  const demands: Array<["house" | "car" | "boil", number]> = [["house", m.other], ["car", m.car], ["boil", m.boil]]
    .filter(([, watts]) => on(watts as number | undefined))
    .map(([key, watts]) => [key as "house" | "car" | "boil", watts as number]);
  const demand = demands.reduce((sum, [, watts]) => sum + watts, 0);
  const named = demands.filter(([, watts]) => watts >= (flows.source_min_share / 100) * demand).sort((a, b) => b[1] - a[1]);
  if (named.length && !(named.length === 1 && named[0][0] === "house")) {
    const namedDemand = named.reduce((sum, [, watts]) => sum + watts, 0);
    const share = { sun: 0, bat: 0, grid: 0 } as Record<Source, number>;
    for (const [key, watts] of named) for (const source of SOURCES) share[source] += (m.loadShare[key][source] * watts) / namedDemand;
    const src = sourceText(share, flows, t);
    return { summary: t.summary.loadsTake(named.map(([key]) => key), src.text), summarySource: src.main };
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
