/* The battery: its popup (level, gauge, estimate, trend) and the battery detail with the history (CURRENT_SPEC.md, Baterie). */
import { html, nothing, svg } from "lit";
import type { TemplateResult } from "lit";
import type { FlowModel } from "./model";
import { isOn } from "./model";
import type { Layout } from "./sankey";
import type { Settings } from "./types";
import { entityState, formatFixed, formatKwh, formatNumber, formatPercent, formatPower, formatWeekday, formatClock, readEnergy, readNumber } from "./utils";
import type { PowerUnit } from "./utils";
import { CardBase } from "./base";
import { BATTERY_RANGE_KEY, NO_DATA, clamp, mix } from "./view";
import type { BatEntry, BatRow, BatTab, Constructor, Tile } from "./view";
import { DAY, HOUR, RANGES, RANGE_DAYS, W, areaPath, bandPath, bin, domain, fetchStatistics, formatDuration, hasValues, linePath, midnight, minutesLeft, niceCeil, round1 } from "./battery-data";
import type { Period, Range, StatType, Stats } from "./battery-data";

/** How long a loaded history is used before it is fetched again (ms). */
const REFRESH = 5 * 60000;
/** Bins of the charts. */
const TREND_BINS = 28;
const LEVEL_BINS = 48;
const HEALTH_BINS = 60;
/** The width of the fade-in on the left of the charts, in the units of the viewBox. */
const FADE = 90;

/** One chart of the detail: the geometry in viewBox units, what lies under the cursor and the labels. */
interface Chart {
  id: string;
  h: number;
  /** Horizontal lines of the grid; `strong` is the zero axis. */
  grid: Array<{ y: number; strong?: boolean }>;
  /** Labels of the vertical axis, written above their line on the left. */
  labels: Array<{ y: number; text: string }>;
  body: TemplateResult;
  n: number;
  x: (index: number) => number;
  dot?: (index: number) => { y: number; color: string } | undefined;
  read: (index: number) => string;
  from: string;
  to: string;
  legend?: TemplateResult;
}

/** A request for the statistics (the parts of one view of the detail). */
interface Request {
  part: string;
  ids: string[];
  start: number;
  end: number;
  period: Period;
  types: StatType[];
}

export const withBattery = <T extends Constructor<CardBase>>(Base: T) =>
  class extends Base {
    // ----------------------------------------------------------------- state and history

    /** The history range: the choice made in the detail (kept in the browser), otherwise battery.default_range. */
    batRange(s: Settings): Range {
      if (this._batRange) return this._batRange;
      try {
        const saved = localStorage.getItem(BATTERY_RANGE_KEY);
        if (saved && (RANGES as readonly string[]).includes(saved)) return saved as Range;
      } catch {
        /* no storage: the configured default */
      }
      return s.batteryRange;
    }

    setBatRange(range: Range): void {
      this._batRange = range;
      this._batScrub = {};
      try {
        localStorage.setItem(BATTERY_RANGE_KEY, range);
      } catch {
        /* no storage: the choice lasts until the page is closed */
      }
    }

    /** The views of the history the open parts need (keys of `_batData`). */
    batNeeds(s: Settings): string[] {
      const keys: string[] = [];
      if (this._pop === "bat" || this._pop === "batIn") keys.push("trend");
      if (this._batDetail) {
        if (this._batTab === "now") keys.push(`day:${this._batSpan}`);
        if (this._batTab === "hist") keys.push(`hist:${this.batRange(s)}`);
        if (this._batTab === "health" && this._batOpen) keys.push(`health:${this.batRange(s)}`);
      }
      return keys;
    }

    /** What to ask Home Assistant for a view; the entities that are not configured are left out. */
    batRequests(s: Settings, key: string, at: number): Request[] {
      const b = s.entities.battery;
      const ids = (...list: Array<string | undefined>) => list.filter((id): id is string => !!id);
      const [view, arg] = key.split(":");
      if (view === "trend") {
        return [{ part: "power", ids: ids(b.power), start: midnight(at), end: at, period: "5minute", types: ["mean"] }];
      }
      if (view === "day") {
        const start = at - (arg === "6h" ? 6 : 24) * HOUR;
        return [{ part: "level", ids: ids(b.power, b.state_of_charge), start, end: at, period: "5minute", types: ["mean"] }];
      }
      const range = arg as Range;
      if (view === "hist") {
        const w = this.histWindow(range, at);
        return [
          { part: "energy", ids: ids(b.total_charge, b.total_discharge), start: w.start, end: at, period: range === "1d" ? "hour" : "day", types: ["change"] },
          { part: "level", ids: ids(b.state_of_charge, b.power), start: w.start, end: at, period: "hour", types: ["mean", "min", "max"] },
        ];
      }
      return [
        {
          part: "health",
          ids: ids(b.min_cell_voltage, b.max_cell_voltage, b.min_cell_temperature, b.max_cell_temperature, b.temperature, b.total_discharge, b.total_charge),
          start: at - RANGE_DAYS[range] * DAY,
          end: at,
          period: range === "1d" ? "5minute" : "hour",
          types: ["mean", "state"],
        },
      ];
    }

    /** The first moment shown by the energy chart: 24 whole hours, or whole days up to today. */
    histWindow(range: Range, at: number): { start: number; bins: number } {
      if (range === "1d") {
        const hour = Math.floor(at / HOUR) * HOUR;
        return { start: hour - 23 * HOUR, bins: 24 };
      }
      const date = new Date(at);
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - (RANGE_DAYS[range] - 1));
      return { start: date.getTime(), bins: RANGE_DAYS[range] };
    }

    loadBattery(): void {
      const s = this._config;
      if (!s || !this.hass) return;
      for (const key of this.batNeeds(s)) {
        const entry = this._batData[key];
        if (entry && (entry.status === "loading" || Date.now() - entry.at < REFRESH)) continue;
        void this.fetchBattery(s, key, entry);
      }
    }

    async fetchBattery(s: Settings, key: string, previous: BatEntry | undefined): Promise<void> {
      const hass = this.hass;
      if (!hass) return;
      const at = Date.now();
      this._batData = { ...this._batData, [key]: { status: "loading", at, parts: previous?.parts ?? {} } };
      try {
        const requests = this.batRequests(s, key, at);
        const parts: Record<string, Stats> = {};
        await Promise.all(requests.map(async (request) => (parts[request.part] = await fetchStatistics(hass, request.ids, request.start, request.end, request.period, request.types))));
        this._batData = { ...this._batData, [key]: { status: "ready", at, parts } };
      } catch {
        // Home Assistant refused or the history is not there: the charts say "no data", the next refresh tries again.
        this._batData = { ...this._batData, [key]: { status: "error", at, parts: {} } };
      }
    }

    /** Rows of one entity from a loaded view. */
    batRows(key: string, part: string, id: string | undefined) {
      return id ? this._batData[key]?.parts[part]?.[id] : undefined;
    }

    batteryToggled(): void {
      if (!this._batDetail) return;
      const detail = this.renderRoot.querySelector<HTMLElement>(".bat-detail");
      detail?.scrollIntoView({ block: "start" });
      detail?.focus({ preventScroll: true });
    }

    openBatteryDetail(): void {
      this._batDetail = true;
      this._batTab = "now";
      this._batOpen = undefined;
      this._batScrub = {};
    }

    /** "Zpět" returns to the popup of the tile, "Hotovo" closes everything. */
    closeBatteryDetail(all: boolean): void {
      this._batDetail = false;
      if (all) this._pop = undefined;
      this.updateComplete.then(() => this.scrollIntoView({ block: "nearest" }));
    }

    // ----------------------------------------------------------------- shared pieces

    batState(model: FlowModel, s: Settings): "charging" | "discharging" | "idle" | undefined {
      const idle = s.num.flows.idle_threshold;
      if (isOn(model.batIn, idle)) return "charging";
      if (isOn(model.batDis, idle)) return "discharging";
      return model.batIn === undefined && model.batDis === undefined ? undefined : "idle";
    }

    /** The gauge of ten pills (the first ones are the reserve); only the outer corners are round, nothing is animated. */
    renderGauge(soc: number | undefined, s: Settings, height: number): TemplateResult {
      const t = this.t;
      const reserve = this.batteryReserve(s);
      const pills = Array.from({ length: 10 }, (_, i) => {
        const inReserve = (i + 1) * 10 <= reserve + 0.001;
        const fill = soc === undefined ? 0 : clamp((soc - i * 10) / 10, 0, 1) * 100;
        const radius = i === 0 ? "8px 0 0 8px" : i === 9 ? "0 8px 8px 0" : "0";
        const colour = inReserve ? "var(--ed-warning)" : "var(--ed-battery)";
        return html`<span class="pill" style="height:${height}px;border-radius:${radius};background:${inReserve ? mix("var(--ed-warning)", 24) : "var(--pill)"}"><i style="width:${fill.toFixed(1)}%;background:${colour}"></i></span>`;
      });
      const label = soc === undefined ? t.noData : t.bat.levelLabel(formatPercent(soc), formatPercent(reserve));
      return html`<div class="bat-gauge" role="img" aria-label=${label}>${pills}</div>`;
    }

    /** "Plná za asi 7 h 30 min" / "Vydrží asi 3 h 30 min" at the present power, none while the battery rests. */
    batEstimate(model: FlowModel, s: Settings): string | undefined {
      const soc = model.soc;
      const state = this.batState(model, s);
      if (soc === undefined) return undefined;
      const capacity = s.num.battery.capacity;
      if (state === "charging") {
        const minutes = minutesLeft(100 - soc, capacity, model.batIn ?? 0);
        return minutes === undefined ? undefined : this.t.bat.fullIn(formatDuration(minutes));
      }
      if (state === "discharging") {
        const minutes = minutesLeft(soc - this.batteryReserve(s), capacity, model.batDis ?? 0);
        return minutes === undefined ? undefined : this.t.bat.lastsFor(formatDuration(minutes));
      }
      return undefined;
    }

    /** Signed power in kW, charging positive (the raw entity is the other way round). */
    batSigned(model: FlowModel): number | undefined {
      if (model.batIn === undefined && model.batDis === undefined) return undefined;
      return ((model.batIn ?? 0) - (model.batDis ?? 0)) / 1000;
    }

    // ----------------------------------------------------------------- popup

    renderBatteryPopup(tile: Tile, lay: Layout, s: Settings, model: FlowModel, unit: PowerUnit): TemplateResult {
      const t = this.t;
      const idle = s.num.flows.idle_threshold;
      const out = tile.key === "bat";
      const soc = model.soc;
      const low = soc !== undefined && soc <= this.batteryReserve(s);
      const watts = out ? model.batDis : model.batIn;
      const on = isOn(watts, idle);
      const now = on
        ? out ? t.pop.discharging(formatPower(watts!, unit)) : t.pop.charging(formatPower(watts!, unit))
        : model.batDis === undefined && model.batIn === undefined && soc === undefined ? NO_DATA : out ? t.idle.bat : t.idle.batIn;
      const day = this.today(s);
      const total = out ? day.bdis : day.bchg;
      const estimate = this.batEstimate(model, s);
      const width = lay.width;
      const centreX = tile.side === "L" ? lay.tile.w / 2 : lay.width - lay.tile.w / 2;
      const centreY = tile.side === "L" ? lay.left[tile.key as "bat"] : lay.right[tile.key as "batIn"];
      const top = centreY - lay.tile.h / 2;
      const below = centreY < lay.height / 2;
      const place = below ? `top:${(top + lay.tile.h + 8).toFixed(0)}px` : `bottom:${(lay.height - top + 8).toFixed(0)}px`;
      return html`<div class="pop bat-pop" role="dialog" aria-label=${tile.name} tabindex="-1" style="left:0;${place};width:${width}px">
        <i class="arrow ${below ? "up" : "down"}" aria-hidden="true" style="left:${(centreX - 6).toFixed(0)}px"></i>
        <div class="pop-head"><span class="pop-title">${tile.name}</span><span class="pop-now">${now}</span></div>
        <div class="pop-level">
          <div class="pop-level-row">
            <span class="pop-label">${t.pop.level}${low ? html`<span class="note"> ${t.pop.atReserve}</span>` : nothing}</span>
            <span class="pop-big" style="color:${low ? "var(--ed-warning)" : "var(--ed-text)"}">${soc === undefined ? NO_DATA : formatPercent(soc)}</span>
          </div>
          ${this.renderGauge(soc, s, 26)}
        </div>
        ${estimate ? html`<p class="bat-estimate"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.2"></circle><path d="M8 4.5V8l2.4 1.6"></path></svg>${estimate}</p>` : nothing}
        ${this.renderTrend(s, model)}
        <div class="pop-rows"><div class="pop-row"><span>${out ? t.pop.rows.discharged : t.pop.rows.charged}</span><b>${total === undefined ? NO_DATA : `${formatKwh(total)} kWh`}</b></div></div>
        <button type="button" class="bat-open" @click=${() => this.openBatteryDetail()}><span>${t.bat.open}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg></button>
      </div>`;
    }

    /** The microtrend of today's power: charging above the zero axis, discharging below, "now" always at the right end. */
    renderTrend(s: Settings, model: FlowModel): TemplateResult {
      const t = this.t;
      const entry = this._batData.trend;
      const rows = this.batRows("trend", "power", s.entities.battery.power);
      const end = entry?.at ?? Date.now();
      const start = midnight(end);
      const values = bin(rows, "mean", start, end, TREND_BINS).map((value) => (value === undefined ? undefined : -value / 1000));
      const live = this.batSigned(model);
      if (live !== undefined) values[TREND_BINS - 1] = live;
      const known = values.filter((value): value is number => value !== undefined);
      const nowX = W - 6;
      const x = (i: number) => (i / (TREND_BINS - 1)) * nowX;
      const peak = Math.max(1, ...known.map((value) => Math.abs(value)));
      const y = (value: number) => 48 - clamp(value / peak, -1, 1) * 42;
      const lastIndex = values.length - 1;
      const dot = values[lastIndex];
      const legend = html`<div class="bat-legend"><span>${t.bat.today}</span><span><i class="dot" style="background:var(--ed-battery)"></i>${t.bat.charging}</span><span><i class="dot" style="background:var(--ed-discharge)"></i>${t.bat.discharging}</span></div>`;
      if (known.length < 2) {
        return html`<div class="bat-trend">${legend}<div class="bat-nodata small">${entry?.status === "loading" ? NO_DATA : t.bat.noDataChart}</div></div>`;
      }
      const line = linePath(values, x, y);
      const area = areaPath(values, x, y, 48);
      return html`<div class="bat-trend">
        ${legend}
        <svg viewBox="0 0 ${W} 96" role="img" aria-label=${t.bat.trendLabel}>
          <defs>
            <linearGradient id="bt-line" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2=${W} y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"></stop><stop offset="1" stop-color="#fff" stop-opacity="1"></stop></linearGradient>
            <linearGradient id="bt-fade" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2=${W} y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"></stop><stop offset="0.5" stop-color="#fff" stop-opacity="0.6"></stop><stop offset="1" stop-color="#fff" stop-opacity="1"></stop></linearGradient>
            <mask id="bt-mask" maskUnits="userSpaceOnUse" x="0" y="0" width=${W} height="96"><rect width=${W} height="96" fill="url(#bt-fade)"></rect></mask>
            <clipPath id="bt-up"><rect x="0" y="0" width=${W} height="48"></rect></clipPath>
            <clipPath id="bt-down"><rect x="0" y="48" width=${W} height="48"></rect></clipPath>
          </defs>
          <line x1="0" y1="48" x2=${W} y2="48" class="axis"></line>
          <g mask="url(#bt-mask)">
            <path d=${area} clip-path="url(#bt-up)" style="fill:var(--ed-battery);fill-opacity:0.32"></path>
            <path d=${area} clip-path="url(#bt-down)" style="fill:var(--ed-discharge);fill-opacity:0.32"></path>
          </g>
          <path d=${line} fill="none" stroke="url(#bt-line)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
          ${dot === undefined ? nothing : svg`<circle cx=${round1(x(lastIndex))} cy=${round1(y(dot))} r="5" style="fill:var(--ed-text)"></circle>`}
        </svg>
      </div>`;
    }

    // ----------------------------------------------------------------- charts

    /** Back in time as a short text: "teď", "−45 min", "−3 h 20 min", "−5 d". */
    back(minutes: number): string {
      const m = Math.round(minutes);
      if (m <= 0) return this.t.bat.now;
      if (m < 60) return `−${m} min`;
      if (m < 24 * 60) return `−${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60} min` : ""}`;
      return `−${Math.round(m / (24 * 60))} d`;
    }

    /** One chart with its readout, finger scrubbing (a slider with no look of its own), the vertical axis and the fade on the left. */
    renderChart(c: Chart): TemplateResult {
      const t = this.t;
      const position = this._batScrub[c.id] ?? 100;
      const index = Math.round((position / 100) * (c.n - 1));
      const x = c.x(index);
      const dot = c.dot?.(index);
      const text = c.read(index);
      const pct = (y: number) => `${((y / c.h) * 100).toFixed(2)}%`;
      return html`<div class="bat-read">${text}</div>
        <div class="bat-chart" style="aspect-ratio:${W} / ${c.h}">
          <svg viewBox="0 0 ${W} ${c.h}" aria-hidden="true">
            <defs>
              <linearGradient id="bf-${c.id}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2=${FADE} y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"></stop><stop offset="1" stop-color="#fff" stop-opacity="1"></stop></linearGradient>
              <mask id="bm-${c.id}" maskUnits="userSpaceOnUse" x="0" y="0" width=${W} height=${c.h}><rect width=${W} height=${c.h} fill="url(#bf-${c.id})"></rect></mask>
            </defs>
            ${c.grid.map((line) => svg`<line x1="0" y1=${line.y} x2=${W} y2=${line.y} class=${line.strong ? "axis" : "grid"}></line>`)}
            <g mask="url(#bm-${c.id})">${c.body}</g>
            <line x1=${x} y1="0" x2=${x} y2=${c.h} class="cursor"></line>
            ${dot ? svg`<circle cx=${x} cy=${dot.y} r="6" style="fill:var(--ed-text)"></circle>` : nothing}
          </svg>
          ${c.labels.map((label) => html`<span class="bat-ylabel" style="top:calc(${pct(label.y)} - 16px)">${label.text}</span>`)}
          <input type="range" min="0" max="100" step="1" .value=${String(position)} aria-label=${t.bat.scrubLabel} aria-valuetext=${text}
            @input=${(event: Event) => { this._batScrub = { ...this._batScrub, [c.id]: Number((event.target as HTMLInputElement).value) }; }} />
        </div>
        <div class="bat-axis"><span>${c.from}</span><span>${c.to}</span></div>
        ${c.legend ?? nothing}`;
    }

    renderChartOrEmpty(key: string, height: number, chart: Chart | undefined): TemplateResult {
      if (chart) return this.renderChart(chart);
      const loading = this._batData[key]?.status === "loading" && !Object.keys(this._batData[key]?.parts ?? {}).length;
      return html`<div class="bat-nodata" style="aspect-ratio:${W} / ${height}">${loading ? NO_DATA : this.t.bat.noDataChart}</div>`;
    }

    /** Nabití a výkon: the line of the charge above, the bars of the power around its own zero axis below. */
    levelChart(s: Settings): Chart | undefined {
      const b = s.entities.battery;
      const key = `day:${this._batSpan}`;
      const entry = this._batData[key];
      if (!entry) return undefined;
      const hours = this._batSpan === "6h" ? 6 : 24;
      const end = entry.at;
      const start = end - hours * HOUR;
      const soc = bin(this.batRows(key, "level", b.state_of_charge), "mean", start, end, LEVEL_BINS);
      const power = bin(this.batRows(key, "level", b.power), "mean", start, end, LEVEL_BINS).map((value) => (value === undefined ? undefined : -value / 1000));
      if (!soc.some((v) => v !== undefined) && !power.some((v) => v !== undefined)) return undefined;
      const n = LEVEL_BINS;
      const x = (i: number) => round1((i / (n - 1)) * W);
      const sy = (v: number) => round1(98 - (clamp(v, 0, 100) / 100) * 90);
      const peak = niceCeil(Math.max(1, ...power.map((v) => Math.abs(v ?? 0))));
      const axis = 160;
      const py = (v: number) => round1(axis - (clamp(v, -peak, peak) / peak) * 44);
      const barW = 4.2;
      const bars = power.map((v, i) => {
        if (v === undefined) return nothing;
        const top = Math.min(axis, py(v));
        const height = Math.max(1.5, Math.abs(py(v) - axis));
        return svg`<rect x=${round1(x(i) - barW / 2)} y=${v >= 0 ? top : axis} width=${barW} height=${round1(height)} rx="1.5" style="fill:${v >= 0 ? "var(--ed-battery)" : "var(--ed-discharge)"}"></rect>`;
      });
      const line = linePath(soc, x, sy);
      const area = areaPath(soc, x, sy, 98);
      const kw = (v: number) => `${formatFixed(v, v % 1 === 0 ? 0 : 1)} kW`;
      return {
        id: "level", h: 210, n, x,
        grid: [{ y: 8 }, { y: 53 }, { y: 98, strong: true }, { y: axis, strong: true }],
        labels: [
          { y: 8, text: formatPercent(100) }, { y: 53, text: formatPercent(50) }, { y: 98, text: formatPercent(0) },
          { y: axis - 44, text: `+${kw(peak)}` }, { y: axis, text: "0" }, { y: axis + 44, text: `−${kw(peak)}` },
        ],
        body: svg`<defs><linearGradient id="bl-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.22"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient></defs>
          <path d=${area} fill="url(#bl-area)"></path>
          <path d=${line} fill="none" style="stroke:var(--ed-text)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>${bars}`,
        dot: (i) => (soc[i] === undefined ? undefined : { y: sy(soc[i]!), color: "var(--ed-text)" }),
        read: (i) => {
          const p = power[i];
          const state = p === undefined ? NO_DATA : Math.abs(p) < s.num.flows.idle_threshold / 1000 ? this.t.bat.status.idle.toLowerCase() : `${p > 0 ? this.t.bat.charging : this.t.bat.discharging} ${formatPower(Math.abs(p) * 1000, "kW")}`;
          return `${this.back((1 - i / (n - 1)) * hours * 60)} · ${soc[i] === undefined ? NO_DATA : formatPercent(soc[i]!)} · ${state}`;
        },
        from: `−${hours} h`, to: this.t.bat.now,
        legend: html`<div class="bat-legend wrap"><span><i class="bar" style="background:var(--ed-text)"></i>${this.t.bat.levelLegend}</span><span><i class="dot" style="background:var(--ed-battery)"></i>${this.t.bat.charging}</span><span><i class="dot" style="background:var(--ed-discharge)"></i>${this.t.bat.discharging}</span></div>`,
      };
    }

    /** The energy chart of the history: charged above, discharged below, the white line is the net sum. */
    energyChart(s: Settings, range: Range): { chart: Chart; charged: number[]; discharged: number[] } | undefined {
      const b = s.entities.battery;
      const key = `hist:${range}`;
      const entry = this._batData[key];
      if (!entry) return undefined;
      const w = this.histWindow(range, entry.at);
      const hourly = range === "1d";
      const n = w.bins;
      const width = hourly ? HOUR : DAY;
      const end = w.start + n * width;
      const slack = hourly ? 0 : 6 * HOUR;
      const rowsIn = this.batRows(key, "energy", b.total_charge);
      const rowsOut = this.batRows(key, "energy", b.total_discharge);
      const inn = bin(rowsIn, "change", w.start, end, n, "sum", slack);
      const out = bin(rowsOut, "change", w.start, end, n, "sum", slack);
      if (!inn.some((v) => v !== undefined) && !out.some((v) => v !== undefined)) return undefined;
      const charged = inn.map((v) => v ?? 0);
      const discharged = out.map((v) => v ?? 0);
      const peak = niceCeil(Math.max(0.5, ...charged, ...discharged));
      const gap = hourly ? 3 : n <= 7 ? 10 : 2;
      const barW = (W - (n - 1) * gap) / n;
      const x = (i: number) => round1(i * (barW + gap) + barW / 2);
      const axis = 100;
      const scale = (v: number) => (clamp(v, 0, peak) / peak) * 92;
      const bars = charged.flatMap((c, i) => {
        const d = discharged[i];
        const opacity = i === n - 1 ? 1 : 0.85;
        return [
          svg`<rect x=${round1(i * (barW + gap))} y=${round1(axis - Math.max(c > 0 ? 1 : 0, scale(c)))} width=${round1(barW)} height=${round1(Math.max(c > 0 ? 1 : 0, scale(c)))} rx="2" style="fill:var(--ed-battery);fill-opacity:${opacity}"></rect>`,
          svg`<rect x=${round1(i * (barW + gap))} y=${axis} width=${round1(barW)} height=${round1(Math.max(d > 0 ? 1 : 0, scale(d)))} rx="2" style="fill:var(--ed-discharge);fill-opacity:${opacity}"></rect>`,
        ];
      });
      const netY = (v: number) => round1(axis - (clamp(v, -peak, peak) / peak) * 92);
      const net = charged.map((c, i) => c - discharged[i]);
      const decimals = hourly ? 2 : 1;
      const sign = (v: number) => `${v >= 0 ? "+" : "−"}${formatFixed(Math.abs(v), decimals)}`;
      const when = (i: number) => (hourly ? formatClock(w.start + i * HOUR) : formatWeekday(w.start + i * DAY));
      const kwh = (v: number) => `${formatFixed(v, v % 1 === 0 ? 0 : 1)} kWh`;
      return {
        charged, discharged,
        chart: {
          id: "energy", h: 200, n, x,
          grid: [{ y: axis, strong: true }, { y: 8 }, { y: 192 }],
          labels: [{ y: 8, text: `+${kwh(peak)}` }, { y: axis, text: "0" }, { y: 192, text: `−${kwh(peak)}` }],
          body: svg`${bars}<path d=${linePath(net, x, netY)} fill="none" style="stroke:var(--ed-text)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>`,
          dot: (i) => ({ y: netY(net[i]), color: "var(--ed-text)" }),
          read: (i) => `${when(i)} · ${sign(charged[i])} / ${sign(-discharged[i])} · ${this.t.bat.net} ${sign(net[i])} kWh`,
          from: hourly ? "−24 h" : formatWeekday(w.start), to: this.t.bat.today,
          legend: html`<div class="bat-legend wrap"><span><i class="dot" style="background:var(--ed-battery)"></i>${this.t.bat.charged.toLowerCase()}</span><span><i class="dot" style="background:var(--ed-discharge)"></i>${this.t.bat.discharged.toLowerCase()}</span><span><i class="bar" style="background:var(--ed-text)"></i>${this.t.bat.net}</span></div>`,
        },
      };
    }

    /** A line (and band) chart of the health rows with an auto-scaled vertical axis. */
    healthChart(id: string, s: Settings, range: Range): Chart | undefined {
      const b = s.entities.battery;
      const key = `health:${range}`;
      const entry = this._batData[key];
      if (!entry) return undefined;
      const days = RANGE_DAYS[range];
      const end = entry.at;
      const start = end - days * DAY;
      const n = HEALTH_BINS;
      const rows = (entity: string | undefined) => this.batRows(key, "health", entity);
      const mean = (entity: string | undefined) => bin(rows(entity), "mean", start, end, n);
      const x = (i: number) => round1((i / (n - 1)) * W);
      const clock = (i: number) => this.back((1 - i / (n - 1)) * days * 24 * 60);
      const from = days === 1 ? "−24 h" : `−${days} d`;
      let spec: { low: Array<number | undefined>; high: Array<number | undefined>; line?: Array<number | undefined>; minSpan: number; text: (v: number) => string; mid: (v: number) => string; read: (i: number) => string; colour: string; legend?: TemplateResult };
      if (id === "gap") {
        const low = mean(b.min_cell_voltage);
        const high = mean(b.max_cell_voltage);
        spec = {
          low, high, minSpan: 0.04, colour: "var(--ed-discharge)",
          text: (v) => `${formatFixed(v, 2)} V`, mid: (v) => `${formatFixed(v, 2)} V`,
          read: (i) => (low[i] === undefined || high[i] === undefined ? `${clock(i)} · ${NO_DATA}` : `${clock(i)} · ${this.t.bat.health.min} ${formatFixed(low[i]!, 3)} V · ${this.t.bat.health.max} ${formatFixed(high[i]!, 3)} V · ${this.t.bat.health.difference} ${formatNumber((high[i]! - low[i]!) * 1000)} mV`),
          legend: html`<div class="bat-legend"><span><i class="swatch" style="background:var(--ed-discharge)"></i>${this.t.bat.health.rangeLegend}</span></div>`,
        };
      } else if (id === "temp") {
        const low = mean(b.min_cell_temperature);
        const high = mean(b.max_cell_temperature);
        const line = mean(b.temperature);
        spec = {
          low, high, line, minSpan: 6, colour: "var(--ed-sun)",
          text: (v) => `${formatNumber(v)} °C`, mid: (v) => `${formatNumber(v)} °C`,
          read: (i) => {
            const parts = [low[i] === undefined ? undefined : `${this.t.bat.health.min} ${formatFixed(low[i]!, 1)}`, line[i] === undefined ? undefined : `${this.t.bat.health.battery.toLowerCase()} ${formatFixed(line[i]!, 1)}`, high[i] === undefined ? undefined : `${this.t.bat.health.max} ${formatFixed(high[i]!, 1)}`].filter(Boolean);
            return `${clock(i)} · ${parts.length ? `${parts.join(" · ")} °C` : NO_DATA}`;
          },
          legend: html`<div class="bat-legend"><span><i class="swatch" style="background:var(--ed-sun)"></i>${this.t.bat.health.rangeLegend}</span><span><i class="bar" style="background:var(--ed-sun)"></i>${this.t.bat.health.battery.toLowerCase()}</span></div>`,
        };
      } else {
        const cycles = bin(rows(b.total_discharge), "state", start, end, n, "last").map((v) => (v === undefined ? undefined : v / s.num.battery.capacity));
        spec = {
          low: cycles, high: cycles, line: cycles, minSpan: 1, colour: "var(--ed-battery)",
          text: (v) => formatNumber(v), mid: (v) => formatNumber(v),
          read: (i) => `${clock(i)} · ${cycles[i] === undefined ? NO_DATA : this.t.bat.health.cycles(formatFixed(cycles[i]!, 1))}`,
        };
      }
      const dom = domain([...spec.low, ...spec.high], spec.minSpan);
      if (!dom) return undefined;
      const y = (v: number) => round1(130 - ((clamp(v, dom.lo, dom.hi) - dom.lo) / (dom.hi - dom.lo)) * 120);
      const band = id === "life" ? "" : bandPath(spec.low, spec.high, x, y);
      const line = spec.line ? linePath(spec.line, x, y) : "";
      const colour = spec.colour;
      return {
        id: `health-${id}`, h: 140, n, x,
        grid: [{ y: 10 }, { y: 70 }, { y: 130 }],
        labels: [{ y: 10, text: spec.text(dom.hi) }, { y: 70, text: spec.mid((dom.hi + dom.lo) / 2) }, { y: 130, text: spec.text(dom.lo) }],
        body: id === "gap"
          ? svg`<path d=${band} style="fill:${colour};fill-opacity:0.22;stroke:${colour}" stroke-width="2" stroke-linejoin="round"></path>`
          : svg`<path d=${band} style="fill:${colour};fill-opacity:0.22"></path><path d=${line} fill="none" style="stroke:${colour}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
        dot: id === "gap" ? undefined : (i) => (spec.line?.[i] === undefined ? undefined : { y: y(spec.line[i]!), color: colour }),
        read: spec.read, from, to: this.t.bat.today, legend: spec.legend,
      };
    }

    // ----------------------------------------------------------------- the detail

    /** The battery detail replaces the card page while it is open (a push, like in iOS), with Back and Done. */
    renderBatteryDetail(s: Settings, model: FlowModel): TemplateResult {
      const t = this.t;
      const tabs: Array<{ value: BatTab; label: string }> = (["now", "hist", "health"] as const).map((value) => ({ value, label: t.bat.tabs[value] }));
      return html`<section class="bat-detail" role="dialog" aria-modal="true" aria-label=${t.bat.detailLabel} tabindex="-1">
        <div class="bat-nav">
          <button type="button" class="bat-link" @click=${() => this.closeBatteryDetail(false)}>‹ ${t.bat.back}</button>
          <h2>${t.bat.title}</h2>
          <button type="button" class="bat-link end" @click=${() => this.closeBatteryDetail(true)}>${t.bat.done}</button>
        </div>
        <ed-segmented .options=${tabs} .value=${this._batTab} label=${t.bat.tabsLabel} @hdk-select=${(event: CustomEvent<{ value: string }>) => { this._batTab = event.detail.value as BatTab; }}></ed-segmented>
        ${this._batTab === "now" ? this.renderBatteryNow(s, model) : this._batTab === "hist" ? this.renderBatteryHistory(s, model) : this.renderBatteryHealth(s, model)}
      </section>`;
    }

    renderRange(s: Settings): TemplateResult {
      const t = this.t;
      const options = RANGES.map((value) => ({ value, label: t.bat.ranges[value] }));
      return html`<ed-segmented .options=${options} .value=${this.batRange(s)} label=${t.bat.rangeLabel} @hdk-select=${(event: CustomEvent<{ value: string }>) => this.setBatRange(event.detail.value as Range)}></ed-segmented>`;
    }

    renderBatteryNow(s: Settings, model: FlowModel): TemplateResult {
      const t = this.t;
      const b = s.entities.battery;
      const soc = model.soc;
      const state = this.batState(model, s);
      const signed = this.batSigned(model);
      const watts = signed === undefined ? undefined : Math.abs(signed) * 1000;
      const unit: PowerUnit = "kW";
      const current = readNumber(this.hass, b.current);
      const voltage = readNumber(this.hass, b.voltage);
      const load = watts === undefined ? undefined : watts / 1000 / s.num.battery.capacity;
      const idle = state === "idle";
      const now = state === "charging" ? t.pop.charging(formatPower(model.batIn ?? 0, unit)) : state === "discharging" ? t.pop.discharging(formatPower(model.batDis ?? 0, unit)) : state === "idle" ? t.bat.status.idle.toLowerCase() : t.noData;
      const estimate = this.batEstimate(model, s);
      const day = this.today(s);
      const tiles = [
        { label: t.bat.live.power, value: watts === undefined ? NO_DATA : idle ? `0 kW` : formatPower(watts, unit), sub: state === undefined ? "" : t.bat.status[state] },
        { label: t.bat.live.current, value: current === undefined ? NO_DATA : `${formatFixed(Math.abs(current), 1)} A`, sub: current === undefined || idle || state === undefined ? "" : state === "charging" ? t.bat.live.chargeCurrent : t.bat.live.dischargeCurrent },
        { label: t.bat.live.voltage, value: voltage === undefined ? NO_DATA : `${formatFixed(voltage, 1)} V`, sub: t.bat.live.ofBattery },
        { label: t.bat.live.load, value: load === undefined ? NO_DATA : `${formatFixed(load, 2)} C`, sub: t.bat.live.loadSub },
      ];
      const inn = day.bchg;
      const out = day.bdis;
      const total = inn !== undefined && out !== undefined ? Math.max(0.01, inn + out) : 1;
      const netStored = inn !== undefined && out !== undefined ? inn - out : undefined;
      const spans = (["6h", "24h"] as const).map((value) => ({ value, label: t.bat.spans[value] }));
      return html`<div class="bat-card">
          <div class="bat-card-head"><div><span class="bat-cap">${t.bat.level}</span><span class="bat-sub">${now}</span></div><span class="bat-huge">${soc === undefined ? NO_DATA : formatPercent(soc)}</span></div>
          ${this.renderGauge(soc, s, 32)}
          ${estimate ? html`<p class="bat-estimate plain">${estimate}</p>` : nothing}
        </div>
        <div class="bat-kpis">${tiles.map((k) => html`<div class="bat-kpi"><span class="sub">${k.label}</span><span class="val">${k.value}</span><span class="sub">${k.sub}</span></div>`)}</div>
        <div class="bat-card">
          <span class="bat-cap">${t.bat.levelChart}</span>
          <ed-segmented .options=${spans} .value=${this._batSpan} label=${t.bat.spanLabel} @hdk-select=${(event: CustomEvent<{ value: string }>) => { this._batSpan = event.detail.value as "6h" | "24h"; this._batScrub = { ...this._batScrub, level: 100 }; }}></ed-segmented>
          ${this.renderChartOrEmpty(`day:${this._batSpan}`, 210, this.levelChart(s))}
        </div>
        <div class="bat-card">
          <span class="bat-cap">${t.bat.energyToday}</span>
          <div class="bat-two"><div><span class="sub">${t.bat.charged}</span><span class="val">${inn === undefined ? NO_DATA : `${formatKwh(inn)} kWh`}</span></div><div><span class="sub">${t.bat.discharged}</span><span class="val">${out === undefined ? NO_DATA : `${formatKwh(out)} kWh`}</span></div></div>
          <div class="bat-split" aria-hidden="true"><i style="width:${inn !== undefined && out !== undefined ? ((inn / total) * 100).toFixed(1) : 0}%;background:var(--ed-battery)"></i><i style="width:${inn !== undefined && out !== undefined ? ((out / total) * 100).toFixed(1) : 0}%;background:var(--ed-discharge)"></i></div>
          <p class="bat-sub">${netStored === undefined ? NO_DATA : t.bat.netStored(`${netStored >= 0 ? "+" : "−"}${formatKwh(Math.abs(netStored))} kWh`)}</p>
        </div>`;
    }

    renderBatteryHistory(s: Settings, model: FlowModel): TemplateResult {
      void model;
      const t = this.t;
      const b = s.entities.battery;
      const range = this.batRange(s);
      const key = `hist:${range}`;
      const energy = this.energyChart(s, range);
      const charged = energy ? energy.charged.reduce((a, c) => a + c, 0) : undefined;
      const discharged = energy ? energy.discharged.reduce((a, c) => a + c, 0) : undefined;
      const over = t.bat.kpi.over(range === "1d" ? "24 h" : t.bat.ranges[range].toLowerCase());
      const level = this._batData[key];
      const days = RANGE_DAYS[range];
      const socRows = this.batRows(key, "level", b.state_of_charge);
      const powerRows = this.batRows(key, "level", b.power);
      const lowest = hasValues(socRows, "min") ? Math.min(...(socRows ?? []).map((r) => r.min).filter((v): v is number => typeof v === "number")) : undefined;
      const peak = hasValues(powerRows, "max") || hasValues(powerRows, "min")
        ? Math.max(...(powerRows ?? []).flatMap((r) => [r.max, r.min]).filter((v): v is number => typeof v === "number").map((v) => Math.abs(v)))
        : undefined;
      const capacity = `${formatFixed(s.num.battery.capacity, s.num.battery.capacity % 1 === 0 ? 0 : 1)} kWh`;
      const dash = NO_DATA;
      const kpis = [
        { label: t.bat.charged, value: charged === undefined ? dash : `${formatFixed(charged, range === "1d" ? 1 : 0)} kWh`, sub: over },
        { label: t.bat.discharged, value: discharged === undefined ? dash : `${formatFixed(discharged, range === "1d" ? 1 : 0)} kWh`, sub: over },
        { label: t.bat.kpi.efficiency, value: charged && discharged !== undefined ? formatPercent(formatFixed((discharged / charged) * 100, 1)) : dash, sub: t.bat.kpi.efficiencySub },
        { label: t.bat.kpi.cycles, value: discharged === undefined ? dash : formatFixed(discharged / s.num.battery.capacity, 1), sub: t.bat.kpi.cyclesSub(capacity) },
        { label: t.bat.kpi.lowest, value: lowest === undefined ? dash : formatPercent(lowest), sub: t.bat.kpi.lowestSub },
        { label: t.bat.kpi.peak, value: peak === undefined ? dash : formatPower(peak, "kW"), sub: t.bat.kpi.peakSub },
      ];
      // Time in the bands of the charge (from the hourly means), the one below the reserve is orange.
      const means = bin(socRows, "mean", this.histWindow(range, level?.at ?? Date.now()).start, level?.at ?? Date.now(), Math.max(1, days * 24));
      const known = means.filter((v): v is number => v !== undefined);
      const edges = [0, 20, 40, 60, 80, 100];
      const shares = edges.slice(0, 5).map((lowEdge, i) => (known.length ? Math.round((known.filter((v) => (i === 4 ? v >= lowEdge : v >= lowEdge && v < edges[i + 1])).length / known.length) * 100) : undefined));
      return html`${this.renderRange(s)}
        <div class="bat-card"><span class="bat-cap">${range === "1d" ? t.bat.energyHours : t.bat.energyDays}</span>${this.renderChartOrEmpty(key, 200, energy?.chart)}</div>
        <div class="bat-kpis">${kpis.map((k) => html`<div class="bat-kpi"><span class="sub">${k.label}</span><span class="val">${k.value}</span><span class="sub">${k.sub}</span></div>`)}</div>
        <div class="bat-card">
          <span class="bat-cap">${t.bat.bandsTitle}</span>
          ${shares.map((share, i) => html`<div class="bat-band"><span class="name">${edges[i]}–${edges[i + 1]} %</span><span class="track"><i style="width:${share ?? 0}%;background:${i === 0 ? "var(--ed-warning)" : "var(--ed-battery)"}"></i></span><span class="pct">${share === undefined ? NO_DATA : formatPercent(share)}</span></div>`)}
          <p class="bat-sub">${t.bat.bandsNote}</p>
        </div>`;
    }

    /** Text of an error or a warning entity: "" = none, undefined = no data. */
    batProblem(id: string | undefined): string | undefined {
      const state = entityState(this.hass, id)?.state;
      if (state === undefined || state === "unavailable" || state === "unknown") return undefined;
      return state === "" || state === "0" ? "" : state;
    }

    renderBatteryHealth(s: Settings, model: FlowModel): TemplateResult {
      const t = this.t;
      const b = s.entities.battery;
      const h = t.bat.health;
      const range = this.batRange(s);
      const read = (id: string | undefined) => readNumber(this.hass, id);
      const soh = read(b.state_of_health);
      const minV = read(b.min_cell_voltage);
      const maxV = read(b.max_cell_voltage);
      const minT = read(b.min_cell_temperature);
      const maxT = read(b.max_cell_temperature);
      const error = this.batProblem(b.error);
      const warning = this.batProblem(b.warning);
      const totalIn = readEnergy(this.hass, b.total_charge);
      const totalOut = readEnergy(this.hass, b.total_discharge);
      const num = s.num.battery;
      const mv = minV !== undefined && maxV !== undefined ? (maxV - minV) * 1000 : undefined;
      const word = mv === undefined ? undefined : mv <= num.imbalance_good ? "good" : mv <= num.imbalance_warn ? "ok" : mv <= num.imbalance_fault ? "warn" : "fault";
      const wordColour = word === "warn" || word === "fault" ? "var(--ed-warning)" : "var(--ed-pop-sec)";
      const noData = [soh, minV, maxV, minT, maxT, model.soc].every((v) => v === undefined) && error === undefined && warning === undefined;
      const problem = error || warning;
      const status = noData
        ? { title: h.noData, sub: h.noDataSub, tone: "off", icon: "M5 12h14" }
        : problem
          ? { title: error ? h.error(error) : h.warning(warning!), sub: h.problemSub, tone: "warn", icon: "M12 7v6M12 17h.01" }
          : { title: h.ok, sub: h.okSub, tone: "ok", icon: "M5 12.5l4.5 4.5L19 7.5" };
      const cycles = totalOut === undefined ? undefined : totalOut / num.capacity;
      const rows: Array<{ key: BatRow | "soh"; label: string; value: string; word?: string; sub: string; details: Array<{ label: string; value: string }> }> = [
        { key: "soh", label: h.capacity, value: soh === undefined ? NO_DATA : formatPercent(soh), sub: soh === undefined ? t.noData : h.capacitySub(`${formatFixed((num.capacity * soh) / 100, 1)} kWh`, `${formatFixed(num.capacity, num.capacity % 1 === 0 ? 0 : 1)} kWh`), details: [] },
        { key: "gap", label: h.balance, value: mv === undefined ? NO_DATA : `${formatNumber(mv)} mV`, word: word ? h.words[word] : undefined, sub: h.balanceSub, details: [] },
        {
          key: "temp", label: h.temperature, value: maxT === undefined ? NO_DATA : `${formatNumber(maxT)} °C`,
          sub: maxT !== undefined && minT !== undefined ? h.temperatureSub(`${formatNumber(maxT - minT)} °C`) : t.noData,
          details: [
            [h.battery, b.temperature], [h.inverterAir, b.inverter_temperature_air], [h.inverterRadiator, b.inverter_temperature_radiator],
          ].filter(([, id]) => id).map(([label, id]) => ({ label: label as string, value: read(id as string) === undefined ? NO_DATA : `${formatFixed(read(id as string)!, 1)} °C` })),
        },
        {
          key: "life", label: h.life, value: cycles === undefined ? NO_DATA : h.cycles(formatNumber(cycles)),
          sub: totalIn && totalOut !== undefined ? h.lifeSub(formatPercent(formatFixed((totalOut / totalIn) * 100, 1))) : t.noData,
          details: [
            { label: h.totalCharged, value: totalIn === undefined ? NO_DATA : `${formatNumber(totalIn)} kWh` },
            { label: h.totalDischarged, value: totalOut === undefined ? NO_DATA : `${formatNumber(totalOut)} kWh` },
          ],
        },
      ];
      const text = (id: string | undefined) => (id ? readText2(this.hass, id) : undefined);
      const diag: Array<{ label: string; value: string; warn?: boolean }> = [];
      if (b.mode) diag.push({ label: h.mode, value: text(b.mode) ?? NO_DATA });
      if (b.charge_limit) diag.push({ label: h.chargeLimit, value: read(b.charge_limit) === undefined ? NO_DATA : `${formatNumber(read(b.charge_limit)!)} A` });
      if (b.discharge_limit) diag.push({ label: h.dischargeLimit, value: read(b.discharge_limit) === undefined ? NO_DATA : `${formatNumber(read(b.discharge_limit)!)} A` });
      if (b.error || b.warning) {
        const issues = [error, warning].filter(Boolean).join(", ");
        diag.push({ label: h.errors, value: error === undefined && warning === undefined ? NO_DATA : issues || h.none, warn: !!issues });
      }
      return html`${this.renderRange(s)}
        <div class="bat-card row">
          <span class="bat-badge ${status.tone}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d=${status.icon}></path></svg></span>
          <div class="bat-col"><span class="bat-title ${status.tone}">${status.title}</span><span class="bat-sub">${status.sub}</span></div>
        </div>
        ${rows.map((row) => {
          const open = row.key !== "soh" && this._batOpen === row.key;
          const chart = open ? this.healthChart(row.key, s, range) : undefined;
          return html`<div class="bat-card flush">
            <button type="button" class="bat-row" ?disabled=${row.key === "soh"} aria-expanded=${row.key === "soh" ? nothing : open ? "true" : "false"}
              @click=${() => { if (row.key !== "soh") { this._batOpen = open ? undefined : row.key; this._batScrub = {}; } }}>
              <span class="bat-col"><span class="bat-label">${row.label}</span><span class="bat-sub">${row.sub}</span></span>
              <span class="bat-value">${row.value}</span>${row.word ? html`<span class="bat-word" style="color:${wordColour}">${row.word}</span>` : nothing}
              ${row.key === "soh" ? nothing : html`<svg class="chev ${open ? "open" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>`}
            </button>
            ${open
              ? html`<div class="bat-body">
                  ${this.renderChartOrEmpty(`health:${range}`, 140, chart)}
                  ${row.details.length ? html`<div class="bat-list">${row.details.map((d) => html`<div class="bat-line"><span>${d.label}</span><b>${d.value}</b></div>`)}</div>` : nothing}
                </div>`
              : nothing}
          </div>`;
        })}
        ${diag.length ? html`<div class="bat-card flush"><span class="bat-cap pad">${h.diagnostics}</span><div class="bat-list pad">${diag.map((d) => html`<div class="bat-line"><span>${d.label}</span><b style="color:${d.warn ? "var(--ed-warning)" : "var(--ed-pop-sec)"}">${d.value}</b></div>`)}</div></div>` : nothing}`;
    }
  };

export type Batteried = InstanceType<ReturnType<typeof withBattery>>;

/** The text state of an entity as the inverter reports it ("Discharge"), undefined when it is missing or has no value. */
function readText2(hass: CardBase["hass"], id: string): string | undefined {
  const state = entityState(hass, id)?.state;
  return state === undefined || state === "" || state === "unavailable" || state === "unknown" ? undefined : state;
}
