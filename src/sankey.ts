import type { Flow, Sink, Source } from "./model";
import { SINKS, SOURCES } from "./model";

/*
 * Geometry of the Sankey diagram: sources on the left, consumers on the right, one band per flow.
 * Band thickness is the power on one scale for the whole diagram.
 */

export interface Layout {
  width: number;
  tile: { w: number; h: number };
  gap: number;
  height: number;
  /** Vertical centre of each tile. */
  left: Record<Source, number>;
  right: Record<Sink, number>;
  /** Where the bands start and end (a little under the tiles, so the ends fade out beneath them). */
  xa: number;
  xb: number;
}

export interface Band {
  from: Source;
  to: Sink;
  watts: number;
  /** Closed outline and centre line, SVG path data. */
  d: string;
  centre: string;
  thickness: number;
}

export function layout(width: number): Layout {
  const tileW = Math.round(Math.max(116, Math.min(132, width * 0.35)));
  const h = 50;
  const gap = 6;
  const height = SINKS.length * h + (SINKS.length - 1) * gap;
  const right = Object.fromEntries(SINKS.map((sink, i) => [sink, h / 2 + i * (h + gap)])) as Record<Sink, number>;
  const left = Object.fromEntries(SOURCES.map((source, i) => [source, ((i + 0.5) * height) / SOURCES.length])) as Record<Source, number>;
  return { width, tile: { w: tileW, h }, gap, height, left, right, xa: tileW - 8, xb: width - tileW + 8 };
}

const n = (value: number) => value.toFixed(1);

export interface BandScale {
  /** Thickest band per kW (px). */
  maxPxPerKw: number;
  /** Thinnest band (px). */
  minPx: number;
}

export function bands(flows: Flow[], lay: Layout, band: BandScale): Band[] {
  if (!flows.length) return [];
  const sums = (key: "from" | "to") => {
    const total = new Map<string, number>();
    for (const flow of flows) total.set(flow[key], (total.get(flow[key]) ?? 0) + flow.watts);
    return total;
  };
  const peak = Math.max(...sums("from").values(), ...sums("to").values());
  const scale = Math.min(band.maxPxPerKw / 1000, 44 / peak); // px per W: at most maxPxPerKw per kW, and the busiest tile still fits
  const thick = (flow: Flow) => Math.max(band.minPx, flow.watts * scale);

  const cursorLeft = new Map<Source, number>();
  for (const source of SOURCES) {
    const total = flows.filter((flow) => flow.from === source).reduce((sum, flow) => sum + thick(flow), 0);
    cursorLeft.set(source, lay.left[source] - total / 2);
  }
  const cursorRight = new Map<Sink, number>();
  for (const sink of SINKS) {
    const total = flows.filter((flow) => flow.to === sink).reduce((sum, flow) => sum + thick(flow), 0);
    cursorRight.set(sink, lay.right[sink] - total / 2);
  }
  const y0 = new Map<Flow, number>();
  const y1 = new Map<Flow, number>();
  for (const source of SOURCES) {
    for (const flow of flows.filter((f) => f.from === source).sort((a, b) => SINKS.indexOf(a.to) - SINKS.indexOf(b.to))) {
      y0.set(flow, cursorLeft.get(source)!);
      cursorLeft.set(source, cursorLeft.get(source)! + thick(flow));
    }
  }
  for (const sink of SINKS) {
    for (const flow of flows.filter((f) => f.to === sink).sort((a, b) => SOURCES.indexOf(a.from) - SOURCES.indexOf(b.from))) {
      y1.set(flow, cursorRight.get(sink)!);
      cursorRight.set(sink, cursorRight.get(sink)! + thick(flow));
    }
  }
  const { xa, xb } = lay;
  const xm = (xa + xb) / 2;
  return flows.map((flow) => {
    const t = thick(flow);
    const a = y0.get(flow)!;
    const b = a + t;
    const c = y1.get(flow)!;
    const d = c + t;
    return {
      from: flow.from,
      to: flow.to,
      watts: flow.watts,
      thickness: t,
      d: `M${xa} ${n(a)} C${n(xm)} ${n(a)} ${n(xm)} ${n(c)} ${xb} ${n(c)} L${xb} ${n(d)} C${n(xm)} ${n(d)} ${n(xm)} ${n(b)} ${xa} ${n(b)} Z`,
      centre: `M${xa} ${n(a + t / 2)} C${n(xm)} ${n(a + t / 2)} ${n(xm)} ${n(c + t / 2)} ${xb} ${n(c + t / 2)}`,
    };
  });
}
