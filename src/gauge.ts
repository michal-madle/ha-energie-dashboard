import { svg } from "lit";
import type { TemplateResult } from "lit";
import type { TempStop } from "./types";

/*
 * Arc gauge of the hot-water tiles (CURRENT_SPEC.md, Teplá voda: dvě dlaždice; HIG Gauges): 270°
 * from the lower left to the lower right, a track of 45 short segments, the fill up to the value in
 * the colour of the temperature scale (the same temperature has the same colour on both gauges),
 * a white dot at the value. No ticks, no target marks.
 */

const SEGMENTS = 45;
const RADIUS = 46;
const CX = 62;
const CY = 58;

/** Colour of a temperature on the scale: blue → yellow → orange → red, linear between the points. */
export function tempColor(scale: TempStop[], temp: number): string {
  let i = 1;
  while (i < scale.length - 1 && temp > scale[i].temp) i++;
  const a = scale[i - 1];
  const b = scale[i];
  const k = Math.max(0, Math.min(1, (temp - a.temp) / (b.temp - a.temp)));
  const rgb = (hex: string) => [1, 3, 5].map((at) => parseInt(hex.slice(at, at + 2), 16));
  const from = rgb(a.color);
  const to = rgb(b.color);
  return `rgb(${[0, 1, 2].map((c) => Math.round(from[c] + (to[c] - from[c]) * k)).join(",")})`;
}

const point = (fraction: number, radius: number): [number, number] => {
  const angle = ((135 + 270 * fraction) * Math.PI) / 180;
  return [CX + radius * Math.cos(angle), CY + radius * Math.sin(angle)];
};

const segment = (from: number, to: number): string => {
  const [x0, y0] = point(from, RADIUS);
  const [x1, y1] = point(to, RADIUS);
  return `M${x0.toFixed(2)} ${y0.toFixed(2)} A${RADIUS} ${RADIUS} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
};

/** The SVG of one gauge: `value` between `min` and `max`; undefined = an empty track without the dot. */
export function arcSvg(value: number | undefined, min: number, max: number, scale: TempStop[]): TemplateResult {
  const fraction = value === undefined ? 0 : Math.max(0, Math.min(1, (value - min) / (max - min)));
  const track = "var(--ed-gauge-track)";
  const paths = Array.from({ length: SEGMENTS }, (_, i) => {
    const mid = (i + 0.5) / SEGMENTS;
    const color = value !== undefined && mid <= fraction ? tempColor(scale, min + mid * (max - min)) : track;
    return svg`<path d=${segment(i / SEGMENTS, Math.min(1, (i + 1) / SEGMENTS + 0.004))} fill="none" stroke=${color} stroke-width="10"></path>`;
  });
  const [ax, ay] = point(0, RADIUS);
  const [bx, by] = point(1, RADIUS);
  const [kx, ky] = point(fraction, RADIUS);
  return svg`<svg viewBox="0 0 124 112" width="108" height="98" aria-hidden="true">
    ${paths}
    <circle cx=${ax.toFixed(1)} cy=${ay.toFixed(1)} r="5" fill=${value !== undefined && fraction > 0 ? tempColor(scale, min) : track}></circle>
    <circle cx=${bx.toFixed(1)} cy=${by.toFixed(1)} r="5" fill=${value !== undefined && fraction >= 0.99 ? tempColor(scale, max) : track}></circle>
    ${value === undefined ? null : svg`<circle class="knob" cx=${kx.toFixed(1)} cy=${ky.toFixed(1)} r="6.5" fill="#ffffff" stroke="var(--ed-tile)" stroke-width="2.5"></circle>`}
  </svg>`;
}
