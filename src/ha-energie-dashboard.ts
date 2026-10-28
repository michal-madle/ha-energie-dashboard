import { LitElement, html, nothing, svg } from "lit";
import { property, state } from "lit/decorators.js";
import type { PropertyValues, TemplateResult } from "lit";
import { normalizeConfig } from "./config";
import { SINKS, SOURCES, buildModel, isOn, mixingState, sourceText } from "./model";
import type { FlowModel, Mixing, Sink, Source, SourceText } from "./model";
import { bands, layout } from "./sankey";
import type { Layout } from "./sankey";
import { arcSvg } from "./gauge";
import { styles } from "./styles";
import type { DashboardConfig, HassEntity, HomeAssistant, Settings } from "./types";
import { ago, entityState, formatKwh, formatNumber, formatPower, powerUnit, readEnergy, readNumber, readText } from "./utils";
import type { PowerUnit } from "./utils";
import type { SegmentOption } from "./ed-segmented";
import { ICON } from "./icons";

/** Shown for every value without data (CURRENT_SPEC.md, Chybějící a zastaralá data). */
const NO_DATA = "––";

const SOURCE_VAR: Record<Source, string> = { sun: "--ed-sun", bat: "--ed-battery", grid: "--ed-grid" };
const TILE_VAR: Record<TileKey, string> = {
  sun: "--ed-sun", bat: "--ed-battery", grid: "--ed-grid",
  house: "--ed-house", car: "--ed-car", boil: "--ed-boiler", batIn: "--ed-battery", gridOut: "--ed-grid",
};
const TANK_MODES: Record<string, string> = { auto: "Auto", heat: "Manual", off: "Off" };
const BOOST_OPTIONS: SegmentOption[] = [{ value: "off", label: "Přetoky" }, { value: "on", label: "Boost" }];

/** Where the time the boiler last heated is kept, so the "boiler only while heating" tile survives a reload. */
const HEATING_KEY = "ha-energie-dashboard:boiler-heating";

type TileKey = Source | Sink;

/** Level shown as the fill of a tile, from the left up to `f` (0–1). */
interface Level {
  f: number;
  /** Active: the colour of the tile; otherwise the fill is grey. */
  active: boolean;
  color: string;
  /** Opacity of the filled part when active. */
  a1: number;
}

interface Tile {
  side: "L" | "R";
  key: TileKey;
  name: string;
  watts?: number;
  /** Strength of the power 0–1 on the scale of the tile (scale.* in the configuration). */
  k: number;
  icon: string;
  /** Second path inside the icon (arrow in the battery). */
  icon2?: string;
  idleIcon: string;
  idleText: string;
  level?: Level;
  /** Prepared background, for the house tile (shares of the sources). */
  background?: string;
  aria: string;
}

interface PopRow {
  label: string;
  value: string;
}

interface PopInfo {
  title: string;
  now: string;
  level?: { label: string; text: string; percent: number; color: string; note: string };
  rows: PopRow[];
}

interface Alert {
  kind: "warn" | "info";
  title: string;
  text: string;
}

type Panel = "wallbox" | "targets" | "tank";

/** A number from an entity attribute, undefined when it is not one. */
function attribute(entity: HassEntity | undefined, key: string): number | undefined {
  const value = entity?.attributes?.[key];
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

/** Whole percentages of the values that add up to exactly 100 (largest remainder). */
function percentages(values: number[]): number[] {
  const total = values.reduce((sum, value) => sum + value, 0);
  if (total <= 0) return values.map(() => 0);
  const raw = values.map((value) => (value / total) * 100);
  const result = raw.map(Math.floor);
  let left = 100 - result.reduce((sum, value) => sum + value, 0);
  raw
    .map((value, index) => ({ index, rest: value - result[index] }))
    .sort((a, b) => b.rest - a.rest)
    .forEach(({ index }) => {
      if (left-- > 0) result[index]++;
    });
  return result;
}

const clamp = (value: number, low: number, high: number) => Math.max(low, Math.min(high, value));

const mix = (color: string, percent: number) => `color-mix(in srgb, ${color} ${percent}%, transparent)`;

/** Ten segments of a level meter, each filled 0–100 %. */
const segments = (percent: number) => Array.from({ length: 10 }, (_, q) => clamp((percent - q * 10) / 10, 0, 1) * 100);

/*
 * Energie card in the look of Apple's HIG (CURRENT_SPEC.md): alerts on top, then three panels —
 * Elektřina (Sankey diagram of the flows with the level in the tiles, popups with today's totals),
 * the car with the wallbox, hot water (two arc gauges, mixing). Every limit, threshold, scale and
 * colour comes from the configuration (config.ts).
 */
export class HaEnergieDashboard extends LitElement {
  static styles = styles;

  @state() private _config?: Settings;
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _width = 329;
  /** A chosen value shown at once until Home Assistant reports it (entity → value). */
  @state() private _optimistic: Record<string, string> = {};
  @state() private _feedback = "";
  @state() private _open: Partial<Record<Panel, boolean>> = {};
  /** The tile whose popup is open, and the big popup of the heading. */
  @state() private _pop?: TileKey;
  @state() private _all = false;
  @state() private _now = Date.now();
  /** A temperature of the tank just chosen, shown until Home Assistant reports it. */
  @state() private _tankTemp?: { id: string; value: number };

  private _observer?: ResizeObserver;
  private _timers = new Map<string, number>();
  private _clock?: number;
  /** When the boiler last heated (ms); 0 = not known. */
  private _lastHeating = 0;
  private _storedHeating = 0;

  setConfig(config: DashboardConfig): void {
    this._config = normalizeConfig(config);
  }

  getCardSize(): number {
    return 14;
  }

  connectedCallback(): void {
    super.connectedCallback();
    try {
      this._lastHeating = Math.max(this._lastHeating, Number(localStorage.getItem(HEATING_KEY)) || 0);
    } catch {
      /* no storage: the tile then follows only what it has seen */
    }
    // The age of the car data ("před 4 min") and the end of the boiler hold move with the time.
    this._clock = window.setInterval(() => (this._now = Date.now()), 30000);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._observer?.disconnect();
    this._observer = undefined;
    this._timers.forEach((timer) => window.clearTimeout(timer));
    this._timers.clear();
    window.clearInterval(this._clock);
  }

  protected willUpdate(): void {
    // Only the dark / light mode of Home Assistant is followed; the surfaces are the card's own.
    this.toggleAttribute("data-light", this.hass?.themes?.darkMode === false);
    const s = this._config;
    if (s && isOn(readNumber(this.hass, s.entities.boiler.power), s.num.flows.idle_threshold)) {
      this._lastHeating = Date.now();
      if (this._lastHeating - this._storedHeating > 60000) {
        this._storedHeating = this._lastHeating;
        try {
          localStorage.setItem(HEATING_KEY, String(this._lastHeating));
        } catch {
          /* no storage */
        }
      }
    }
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    const flow = this.renderRoot.querySelector<HTMLElement>(".flow");
    if (flow && !this._observer) {
      this._observer = new ResizeObserver(() => {
        const width = Math.round(flow.getBoundingClientRect().width);
        if (width > 0 && width !== this._width) this._width = width;
      });
      this._observer.observe(flow);
    }
    if (changed.has("hass")) {
      // Drop a chosen value as soon as Home Assistant reports it.
      const settled = Object.entries(this._optimistic).filter(([id, value]) => this.hass?.states?.[id]?.state === value);
      if (settled.length) {
        const next = { ...this._optimistic };
        settled.forEach(([id]) => delete next[id]);
        this._optimistic = next;
      }
    }
    if (changed.has("hass") && this._tankTemp && attribute(entityState(this.hass, this._tankTemp.id), "temperature") === this._tankTemp.value) {
      this._tankTemp = undefined;
    }
    // The end of the hold after heating: draw again when the boiler tile has to go.
    const s = this._config;
    window.clearTimeout(this._timers.get("hold"));
    if (s && s.boilerShow === "heating" && this._lastHeating) {
      const left = this._lastHeating + s.num.boiler.hold_minutes * 60000 - Date.now();
      if (left > 0) this._timers.set("hold", window.setTimeout(() => this.requestUpdate(), left + 50));
    }
  }

  // ----------------------------------------------------------------- render

  render(): TemplateResult | typeof nothing {
    const s = this._config;
    if (!s) return nothing;
    const model = buildModel(this.hass, s);
    const c = s.colors;
    const vars = `--ed-sun:${c.sun};--ed-battery:${c.battery};--ed-grid:${c.grid};--ed-house:${c.house};--ed-car:${c.car};--ed-boiler:${c.boiler};--ed-accent:${c.accent};--ed-warning:${c.warning};--ed-off:${c.neutral}`;
    return html`<div class="page" style=${vars} @keydown=${this.onKey}>
      ${s.title === "" ? nothing : html`<h1>${s.title}</h1>`} ${this.renderAlerts(s, model)} ${this.renderElectricity(s, model)} ${this.renderCar(s, model)}
      ${this.renderWater(s, model)}
      <p class="feedback" aria-live="polite">${this._feedback}</p>
    </div>`;
  }

  private onKey(event: KeyboardEvent): void {
    if (event.key === "Escape" && (this._pop || this._all)) {
      this._pop = undefined;
      this._all = false;
    }
  }

  /** The colour of a source text: the grid beyond its share is a deviation (orange). */
  private sourceColor(text: SourceText): string {
    return text.deviation ? "var(--ed-warning)" : `var(${SOURCE_VAR[text.main]})`;
  }

  private stateLine(text: string | undefined, color: string | undefined): TemplateResult {
    return html`<p class="state" style="--sc:${color ?? "var(--ed-secondary)"}">
      <span class="dot" aria-hidden="true"></span>${text ?? html`${NO_DATA}<span class="sr-only">bez dat</span>`}
    </p>`;
  }

  // ----------------------------------------------------------------- alerts

  /** Deviations only (CURRENT_SPEC.md, Upozornění): a battery on its reserve and a house on the grid are not alerts. */
  private alerts(s: Settings, model: FlowModel): Alert[] {
    const w = s.entities.wallbox;
    const result: Alert[] = [];
    const connected = model.carLink === "connected" || model.carLink === "charging";
    const blocked = readText(this.hass, w.block_charging) === "on";
    const priorityWaiting = readText(this.hass, w.prioritize_connected) === "on" && model.carLink === "connected" && (model.sun ?? 0) > s.num.wallbox.priority_min_sun;
    if (blocked) {
      result.push({ kind: "info", title: "Nabíjení auta je zablokované", text: "Auto nenabíjí, ani v Boostu. Přebytek ohřívá vodu." });
    } else if (priorityWaiting) {
      result.push({ kind: "warn", title: "Auto je připojené, ale nenabíjí", text: "Přednost před bojlerem je zapnutá, ale slunce zřejmě nestačí na rozjezd wallboxu." });
    }
    if (readText(this.hass, w.boost) === "on" && connected) {
      result.push({ kind: "warn", title: "Boost wallboxu je zapnutý", text: "Auto smí nabíjet i ze sítě a z baterie." });
    }
    if (readText(this.hass, s.entities.boiler.boost) === "on") {
      result.push({ kind: "warn", title: "Boost bojleru je zapnutý", text: "Bojler smí topit i ze sítě a z baterie." });
    }
    return result;
  }

  private renderAlerts(s: Settings, model: FlowModel): TemplateResult | typeof nothing {
    const items = this.alerts(s, model);
    if (!items.length) return nothing;
    return html`<section class="alerts" aria-labelledby="h-al">
      <h2 id="h-al" class="group-label">Upozornění</h2>
      <ul class="group">
        ${items.map(
          (item) => html`<li class="alert ${item.kind}">
            <span class="badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d=${item.kind === "warn" ? ICON.alert : ICON.info}></path></svg></span>
            <span class="row-text"><span class="row-title">${item.title}</span><span class="alert-text">${item.text}</span></span>
          </li>`,
        )}
      </ul>
    </section>`;
  }

  // ------------------------------------------------------------ Elektřina

  private carVisible(s: Settings, model: FlowModel): boolean {
    // Hidden only when the car is known to be disconnected and the wallbox delivers nothing.
    return !(model.carLink === "disconnected" && !isOn(model.car, s.num.flows.idle_threshold));
  }

  private boilerVisible(s: Settings, model: FlowModel): boolean {
    if (s.boilerShow === "always" || model.boil === undefined) return true;
    if (isOn(model.boil, s.num.flows.idle_threshold)) return true;
    return this._lastHeating > 0 && Date.now() - this._lastHeating < s.num.boiler.hold_minutes * 60000;
  }

  private renderElectricity(s: Settings, model: FlowModel): TemplateResult {
    const color = model.summarySource ? `var(${SOURCE_VAR[model.summarySource]})` : undefined;
    return html`<section class="panel" aria-labelledby="h-el">
      <div class="head click" @click=${() => this.openAll()}>
        <h2 id="h-el">
          <button type="button" class="title-btn" aria-haspopup="dialog" aria-expanded=${this._all ? "true" : "false"} @click=${(event: Event) => { event.stopPropagation(); this.openAll(); }}>
            ${s.titles.electricity}<svg viewBox="0 0 24 24" aria-hidden="true"><path d=${ICON.chevron}></path></svg>
          </button>
        </h2>
        ${this.stateLine(model.summary, color)}
      </div>
      ${this.renderFlow(s, model)} ${this._all ? this.renderDayPopup(s, model) : nothing}
      ${this._pop || this._all ? html`<button type="button" class="scrim" aria-label="Zavřít" @click=${() => this.closePop()}></button>` : nothing}
    </section>`;
  }

  private openAll(): void {
    this._all = !this._all;
    this._pop = undefined;
  }

  private closePop(): void {
    this._pop = undefined;
    this._all = false;
  }

  /** The level of a tile (battery, car, boiler) as the fill of its background. */
  private tiles(s: Settings, model: FlowModel, unit: PowerUnit): Tile[] {
    const e = s.entities;
    const sc = s.num.scale;
    const idle = s.num.flows.idle_threshold;
    const link = model.carLink;
    const soc = model.soc;
    const low = soc !== undefined && soc <= s.num.battery.reserve;
    const batLevel = (active: boolean): Level | undefined =>
      soc === undefined ? undefined : { f: soc / 100, active, color: low ? "var(--ed-warning)" : "var(--ed-battery)", a1: low ? 0.5 : 0.58 };
    const batText = (what: string) =>
      `${what === "vybíjí" ? "vybíjení" : "nabíjení"}, ${soc === undefined ? "bez dat" : `nabití ${formatNumber(soc)} %`}${low ? ", pod rezervou" : ""}`;
    const carConnected = link === "connected" || link === "charging" || isOn(model.car, idle);
    const gMin = s.num.water.gauge_min;
    const gMax = Math.max(s.num.water.gauge_max, readNumber(this.hass, e.boiler.target_temperature) ?? 0);
    const bT = model.boilTemp;
    const on = (watts: number | undefined) => isOn(watts, idle);
    const power = (watts: number | undefined) => (watts === undefined ? "bez dat" : formatPower(watts, unit));
    // The house tile is tinted by the shares of the sources.
    const parts = SOURCES.filter((source) => model.share[source] >= 0.02);
    const houseBg =
      on(model.other) && parts.length
        ? parts.length === 1
          ? `linear-gradient(135deg, ${mix(`var(${SOURCE_VAR[parts[0]]})`, 40)}, ${mix(`var(${SOURCE_VAR[parts[0]]})`, 12)}), var(--ed-tile)`
          : `linear-gradient(135deg, ${parts
              .map((source, i) => {
                const before = parts.slice(0, i).reduce((sum, item) => sum + model.share[item], 0);
                return `${mix(`var(${SOURCE_VAR[source]})`, 40)} ${((before + model.share[source] / 2) * 100).toFixed(0)}%`;
              })
              .join(", ")}), var(--ed-tile)`
        : undefined;
    const tiles: Tile[] = [
      { side: "L", key: "sun", name: "Slunce", watts: model.sun, k: (model.sun ?? 0) / sc.sun, icon: ICON.sun, idleIcon: ICON.moon, idleText: "bez výroby", aria: model.sun === undefined ? "bez dat" : "" },
      { side: "L", key: "bat", name: "Baterie", watts: model.batDis, k: (model.batDis ?? 0) / sc.battery, icon: ICON.battery, icon2: ICON.batteryDown, idleIcon: ICON.pause, idleText: "nevybíjí", level: batLevel(on(model.batDis)), aria: batText("vybíjí") },
      { side: "L", key: "grid", name: "Síť", watts: model.imp, k: (model.imp ?? 0) / sc.grid, icon: ICON.grid, idleIcon: ICON.minus, idleText: "neodebírá", aria: model.imp === undefined ? "bez dat" : on(model.imp) ? "odběr" : "" },
      { side: "R", key: "house", name: "Dům", watts: model.other, k: (model.other ?? 0) / sc.house, icon: ICON.home, idleIcon: ICON.minus, idleText: "bez odběru", background: houseBg, aria: model.other === undefined ? "bez dat" : "ostatní spotřeba" },
    ];
    if (this.carVisible(s, model)) {
      const level: Level | undefined = carConnected && model.carSoc !== undefined ? { f: model.carSoc / 100, active: on(model.car), color: "var(--ed-car)", a1: 0.5 } : undefined;
      tiles.push({
        side: "R", key: "car", name: "Auto", watts: link === undefined && model.car === undefined ? undefined : model.car ?? 0, k: (model.car ?? 0) / sc.car, icon: ICON.car,
        idleIcon: link === "disconnected" ? ICON.minus : ICON.plug, idleText: link === "disconnected" ? "odpojeno" : link === undefined ? "bez stavu" : "připojeno", level,
        aria: `${link === undefined && model.car === undefined ? "bez dat, " : on(model.car) ? "nabíjí, " : ""}${carConnected && model.carSoc !== undefined ? `nabití ${formatNumber(model.carSoc)} %` : ""}`.replace(/, $/, ""),
      });
    }
    if (this.boilerVisible(s, model)) {
      const level: Level | undefined = bT === undefined ? undefined : { f: clamp((bT - gMin) / (gMax - gMin), 0, 1), active: on(model.boil), color: "var(--ed-boiler)", a1: 0.5 };
      tiles.push({
        side: "R", key: "boil", name: "Bojler", watts: model.boil, k: (model.boil ?? 0) / sc.boiler, icon: ICON.therm, idleIcon: ICON.pause, idleText: "bez ohřevu", level,
        aria: `${bT === undefined ? "bez dat" : `teplota ${formatNumber(bT)} °C`}${on(model.boil) ? ", ohřev" : ""}`,
      });
    }
    tiles.push(
      { side: "R", key: "batIn", name: "Baterie", watts: model.batIn, k: (model.batIn ?? 0) / sc.battery, icon: ICON.battery, icon2: ICON.batteryBolt, idleIcon: ICON.pause, idleText: "nenabíjí", level: batLevel(on(model.batIn)), aria: batText("nabíjí") },
      { side: "R", key: "gridOut", name: "Do sítě", watts: model.exp, k: (model.exp ?? 0) / sc.grid, icon: ICON.grid, idleIcon: ICON.minus, idleText: "nedodává", aria: model.exp === undefined ? "bez dat" : on(model.exp) ? "dodávka" : "" },
    );
    return tiles;
  }

  private renderFlow(s: Settings, model: FlowModel): TemplateResult {
    const idle = s.num.flows.idle_threshold;
    const unit: PowerUnit = powerUnit(
      [model.sun, model.batDis, model.batIn, model.imp, model.exp, model.other, model.car, model.boil].map((value) => (isOn(value, idle) ? value : undefined)),
      s.num.flows.kw_from,
    );
    const tiles = this.tiles(s, model, unit);
    const lay = layout(this._width, tiles.filter((tile) => tile.side === "R").map((tile) => tile.key as Sink));
    const band = bands(model.flows, lay, { maxPxPerKw: s.num.flows.band_max_px_per_kw, minPx: s.num.flows.band_min_px });
    const stops = (source: Source) =>
      svg`<linearGradient id="rg-${source}" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" style="stop-color:var(${SOURCE_VAR[source]});stop-opacity:0.2"></stop>
        <stop offset="0.14" style="stop-color:var(${SOURCE_VAR[source]});stop-opacity:0.88"></stop>
        <stop offset="0.86" style="stop-color:var(${SOURCE_VAR[source]});stop-opacity:0.88"></stop>
        <stop offset="1" style="stop-color:var(${SOURCE_VAR[source]});stop-opacity:0.2"></stop>
      </linearGradient>`;
    const popTile = this._pop ? tiles.find((tile) => tile.key === this._pop) : undefined;
    return html`<div class="flow" role="group" aria-label="Toky energie" style="height:${lay.height}px">
      <svg width=${lay.width} height=${lay.height} viewBox="0 0 ${lay.width} ${lay.height}" aria-hidden="true">
        <defs>${SOURCES.map(stops)}</defs>
        ${band.map(
          (b) => svg`<g>
            <path d=${b.d} fill="url(#rg-${b.from})"></path>
            <path class="dots" d=${b.centre} style="stroke-width:${Math.max(1.8, Math.min(3.2, b.thickness * 0.55)).toFixed(1)}px;animation-duration:${(14 / (14 + 6 * Math.min(b.watts / 1000, 10))).toFixed(2)}s"></path>
          </g>`,
        )}
      </svg>
      ${tiles.map((tile) => this.renderTile(tile, lay, unit, s))} ${popTile ? this.renderTilePopup(popTile, lay, s, model, unit) : nothing}
    </div>`;
  }

  private tileBackground(tile: Tile, on: boolean, k: number): string | undefined {
    const color = `var(${TILE_VAR[tile.key]})`;
    const level = tile.level;
    if (level) {
      const f = clamp(level.f, 0, 1);
      const at = `${(f * 100).toFixed(1)}%`;
      const filled = level.active ? mix(level.color, level.a1 * 100) : "var(--ed-fill-idle)";
      const rest = level.active ? mix(level.color, 10) : "var(--ed-tile)";
      if (f < 0.005) return level.active ? `linear-gradient(${rest}, ${rest}), var(--ed-tile)` : undefined;
      return `linear-gradient(90deg, ${filled} 0%, ${filled} ${at}, ${rest} ${at}, ${rest} 100%), var(--ed-tile)`;
    }
    if (tile.background) return tile.background;
    if (on) {
      const tint = mix(color, Math.round(21 + 7 * k));
      return `linear-gradient(${tint}, ${tint}), var(--ed-tile)`;
    }
    return undefined;
  }

  private renderTile(tile: Tile, lay: Layout, unit: PowerUnit, s: Settings): TemplateResult {
    const noData = tile.watts === undefined;
    const on = isOn(tile.watts, s.num.flows.idle_threshold);
    const left = tile.side === "L" ? 0 : lay.width - lay.tile.w;
    const centre = tile.side === "L" ? lay.left[tile.key as Source] : lay.right[tile.key as Sink];
    const k = clamp(tile.k, 0, 1);
    const value = noData ? NO_DATA : formatPower(tile.watts!, unit);
    const background = this.tileBackground(tile, on, k);
    // The stronger the flow, the stronger the glow of the icon.
    const style = `left:${left}px;top:${(centre - lay.tile.h / 2).toFixed(1)}px;width:${lay.tile.w}px;height:${lay.tile.h}px;--tc:var(${TILE_VAR[tile.key]});--gr:${(2 + 9 * k).toFixed(1)}px;--ga:${Math.round(30 + 60 * k)}%${background ? `;background:${background}` : ""}`;
    return html`<button
      type="button"
      class="tile ${on ? "on" : "idle"} ${tile.key === "bat" || tile.key === "batIn" ? "battery" : ""}"
      data-tile=${tile.key}
      style=${style}
      aria-haspopup="dialog"
      aria-expanded=${this._pop === tile.key ? "true" : "false"}
      aria-label=${[`${tile.name} ${on ? value : noData ? NO_DATA : tile.idleText}`, tile.aria].filter(Boolean).join(", ")}
      @click=${() => this.openTile(tile.key)}
    >
      <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d=${on ? tile.icon : tile.idleIcon}></path>${on && tile.icon2 ? svg`<path class="icon2" d=${tile.icon2}></path>` : nothing}
      </svg>
      <span class="text">
        <span class="name">${tile.name}</span>
        <span class="value" aria-hidden="true">${on ? value : noData ? NO_DATA : tile.idleText}</span>
      </span>
    </button>`;
  }

  private openTile(key: TileKey): void {
    this._all = false;
    this._pop = this._pop === key ? undefined : key;
  }

  /** Energy of today in kWh from the counters of the configuration; undefined = no data. */
  private today(s: Settings) {
    const d = s.entities.daily;
    const read = (id: string | undefined) => readEnergy(this.hass, id);
    const v = {
      pv: read(d.pv_generation), bchg: read(d.battery_charge), bdis: read(d.battery_discharge),
      gin: read(d.grid_import), gout: read(d.grid_export), car: read(d.car), boil: read(d.boiler),
    };
    const all = [v.pv, v.gin, v.bdis, v.gout, v.bchg, v.car, v.boil];
    // The house is what is left (produced + from the grid + from the battery − the rest), so it needs every counter.
    const house = all.every((item) => item !== undefined) ? Math.max(0, v.pv! + v.gin! + v.bdis! - v.gout! - v.bchg! - v.car! - v.boil!) : undefined;
    return { ...v, house };
  }

  private renderTilePopup(tile: Tile, lay: Layout, s: Settings, model: FlowModel, unit: PowerUnit): TemplateResult {
    const idle = s.num.flows.idle_threshold;
    const day = this.today(s);
    const kwh = (value: number | undefined) => (value === undefined ? NO_DATA : `${formatKwh(value)} kWh`);
    const p = (watts: number | undefined) => (watts === undefined ? NO_DATA : formatPower(watts, unit));
    const on = (watts: number | undefined) => isOn(watts, idle);
    const soc = model.soc;
    const low = soc !== undefined && soc <= s.num.battery.reserve;
    const batNow = on(model.batDis) ? `vybíjí ${p(model.batDis)}` : on(model.batIn) ? `nabíjí ${p(model.batIn)}` : soc === undefined ? NO_DATA : "nevybíjí";
    const battery: PopInfo = {
      title: "Baterie", now: batNow,
      level: soc === undefined ? undefined : { label: "Nabití", text: `${formatNumber(soc)} %`, percent: soc, color: low ? "var(--ed-warning)" : "var(--ed-battery)", note: low ? "pod rezervou" : "" },
      rows: [{ label: "Dnes vybito", value: kwh(day.bdis) }, { label: "Dnes nabito", value: kwh(day.bchg) }],
    };
    const gridInfo: PopInfo = {
      title: "Síť", now: on(model.imp) ? `odebírá ${p(model.imp)}` : on(model.exp) ? `dodává ${p(model.exp)}` : model.imp === undefined && model.exp === undefined ? NO_DATA : "bez toku",
      rows: [{ label: "Dnes odebráno", value: kwh(day.gin) }, { label: "Dnes dodáno", value: kwh(day.gout) }],
    };
    const link = model.carLink;
    const bT = model.boilTemp;
    const gMin = s.num.water.gauge_min;
    const gMax = Math.max(s.num.water.gauge_max, readNumber(this.hass, s.entities.boiler.target_temperature) ?? 0);
    const info: Record<TileKey, PopInfo> = {
      sun: { title: "Slunce", now: on(model.sun) ? p(model.sun) : model.sun === undefined ? NO_DATA : "bez výroby", rows: [{ label: "Dnes vyrobeno", value: kwh(day.pv) }] },
      bat: battery,
      batIn: battery,
      grid: gridInfo,
      gridOut: gridInfo,
      house: { title: "Dům", now: on(model.other) ? p(model.other) : model.other === undefined ? NO_DATA : "bez odběru", rows: [{ label: "Dnes spotřebováno", value: kwh(day.house) }] },
      car: {
        title: "Auto", now: on(model.car) ? `nabíjí ${p(model.car)}` : link === "connected" || link === "charging" ? "připojeno, nenabíjí" : link === "disconnected" ? "odpojeno" : NO_DATA,
        level: model.carSoc !== undefined && (link === "connected" || link === "charging") ? { label: "Nabití", text: `${formatNumber(model.carSoc)} %`, percent: model.carSoc, color: "var(--ed-car)", note: "" } : undefined,
        rows: [{ label: "Dnes nabito", value: kwh(day.car) }],
      },
      boil: {
        title: "Bojler", now: on(model.boil) ? `ohřev ${p(model.boil)}` : model.boil === undefined ? NO_DATA : "bez ohřevu",
        level: bT === undefined ? undefined : { label: "Teplota", text: `${formatNumber(bT)} °C`, percent: clamp(((bT - gMin) / (gMax - gMin)) * 100, 0, 100), color: "var(--ed-boiler)", note: "" },
        rows: [{ label: "Dnes ohřev", value: kwh(day.boil) }],
      },
    };
    const pop = info[tile.key];
    // Below the tile, or above it for the lower tiles; the arrow points at the tile.
    const width = 236;
    const centreX = tile.side === "L" ? lay.tile.w / 2 : lay.width - lay.tile.w / 2;
    const centreY = tile.side === "L" ? lay.left[tile.key as Source] : lay.right[tile.key as Sink];
    const top = centreY - lay.tile.h / 2;
    const below = centreY < lay.height / 2;
    const left = clamp(centreX - width / 2, 0, lay.width - width);
    const place = below ? `top:${(top + lay.tile.h + 8).toFixed(0)}px` : `bottom:${(lay.height - top + 8).toFixed(0)}px`;
    return html`<div class="pop" role="dialog" aria-label=${pop.title} tabindex="-1" style="left:${left.toFixed(0)}px;${place};width:${Math.min(width, lay.width)}px">
      <i class="arrow ${below ? "up" : "down"}" aria-hidden="true" style="left:${(centreX - left - 6).toFixed(0)}px"></i>
      <div class="pop-head"><span class="pop-title">${pop.title}</span><span class="pop-now">${pop.now}</span></div>
      ${pop.level
        ? html`<div class="pop-level">
            <div class="pop-level-row">
              <span class="pop-label">${pop.level.label}${pop.level.note ? html`<span class="note"> ${pop.level.note}</span>` : nothing}</span>
              <span class="pop-big" style="color:${pop.level.note ? "var(--ed-warning)" : "var(--ed-text)"}">${pop.level.text}</span>
            </div>
            <div class="segs" aria-hidden="true">${segments(pop.level.percent).map((fill) => html`<span><i style="width:${fill.toFixed(0)}%;background:${pop.level!.color}"></i></span>`)}</div>
          </div>`
        : nothing}
      <div class="pop-rows">${pop.rows.map((row) => html`<div class="pop-row"><span>${row.label}</span><b>${row.value}</b></div>`)}</div>
    </div>`;
  }

  /** The big popup of the heading: today's totals of everything (sources = consumption, the house is the rest). */
  private renderDayPopup(s: Settings, model: FlowModel): TemplateResult {
    void model;
    const day = this.today(s);
    const item = (value: number | undefined) => (value === undefined ? NO_DATA : formatKwh(value));
    const sources = [day.pv, day.bdis, day.gin];
    const srcTotal = sources.every((value) => value !== undefined) ? sources.reduce((sum, value) => sum! + value!, 0) : undefined;
    const useTotal = day.house === undefined ? undefined : day.house + day.car! + day.boil! + day.bchg! + day.gout!;
    const src = [
      { label: "Slunce", color: "var(--ed-sun)", value: day.pv },
      { label: "Z baterie", color: "var(--ed-battery)", value: day.bdis },
      { label: "Ze sítě", color: "var(--ed-grid)", value: day.gin },
    ];
    const use = [
      { label: "Dům", color: "var(--ed-house)", value: day.house },
      { label: "Auto", color: "var(--ed-car)", value: day.car },
      { label: "Bojler", color: "var(--ed-boiler)", value: day.boil },
      { label: "Do baterie", color: "var(--ed-battery)", value: day.bchg },
      { label: "Do sítě", color: "var(--ed-grid)", value: day.gout },
    ];
    const column = (title: string, total: number | undefined, items: typeof src) => html`<div role="list" aria-label=${title} class="day-col">
      <div class="day-total"><span>${title}</span><b>${item(total)}</b></div>
      ${items.map((row) => html`<div role="listitem" class="day-item"><i style="background:${row.color}" aria-hidden="true"></i><span>${row.label}</span><b>${item(row.value)}</b></div>`)}
    </div>`;
    return html`<div class="pop day" role="dialog" aria-labelledby="day-h" tabindex="-1">
      <i class="arrow up" aria-hidden="true" style="left:30px"></i>
      <h3 id="day-h">Dnes <span>· kWh</span></h3>
      <div class="day-cols">${column("Zdroje", srcTotal, src)} ${column("Spotřeba", useTotal, use)}</div>
    </div>`;
  }

  // ------------------------------------------------------------------- car

  private renderCar(s: Settings, model: FlowModel): TemplateResult {
    const e = s.entities;
    const flows = s.num.flows;
    const limit = s.num.car.charge_limit;
    const link = model.carLink;
    const charging = isOn(model.car, flows.idle_threshold) && link !== "disconnected";
    const src = sourceText(model.share, flows);
    const srcColor = this.sourceColor(src);
    const blocked = readText(this.hass, e.wallbox.block_charging) === "on";
    const boost = this.shown(e.wallbox.boost);
    const priorityWaiting = readText(this.hass, e.wallbox.prioritize_connected) === "on" && link === "connected" && !blocked && (model.sun ?? 0) > s.num.wallbox.priority_min_sun;

    let stateText: string | undefined;
    let stateColor: string | undefined;
    if (charging) {
      stateText = `Nabíjí ${src.text}${boost === "on" ? " · Boost" : ""}`;
      stateColor = srcColor;
    } else if (link === "connected" || link === "charging") {
      stateText = "Připojeno, nenabíjí";
      stateColor = priorityWaiting ? "var(--ed-warning)" : undefined;
    } else if (link === "disconnected") {
      stateText = "Odpojeno";
    }
    const glow = mix(stateColor ?? "#d8d8dc", stateColor ? 42 : 28);
    const picture = entityState(this.hass, e.car.image)?.attributes?.entity_picture;
    const soc = model.carSoc;
    const unit = powerUnit([isOn(model.car, flows.idle_threshold) ? model.car : undefined], flows.kw_from);
    const hasLimit = limit < 100;
    const meterLabel = `Nabití auta ${soc === undefined ? "bez dat" : `${formatNumber(soc)} %`}${hasLimit ? `, limit ${formatNumber(limit)} %` : ""}`;
    const w = e.wallbox;
    const mode = boost === "on" ? "on" : boost === "off" ? "off" : "";
    const modeOptions = BOOST_OPTIONS;
    const modeSub = boost === "on" ? "Boost · bere i ze sítě a z baterie" : boost === "off" ? "Přetoky · jen z přebytku" : NO_DATA;

    return html`<section class="panel" aria-labelledby="h-car">
      <div class="car-top" style="height:${Math.round(168 + 40 * Math.max(0, s.num.car.image_scale - 1))}px">
        <div class="car-art" aria-hidden="true" style="transform:scale(${s.num.car.image_scale})">
          <div class="glow" style="background:radial-gradient(closest-side, ${glow}, transparent)"></div><div class="shadow"></div>
          ${typeof picture === "string" && picture ? html`<img src=${picture} alt="" />` : nothing}
        </div>
        <div class="head"><h2 id="h-car">${s.titles.car}</h2>${this.stateLine(stateText, stateColor)}</div>
        <div class="car-soc">
          <span class="soc">${soc === undefined ? NO_DATA : formatNumber(soc)}<small> %</small>${soc === undefined ? html`<span class="sr-only">bez dat</span>` : nothing}</span>
          <span class="range">dojezd <b>${model.carRange === undefined ? NO_DATA : `${formatNumber(model.carRange)} km`}</b></span>
        </div>
      </div>
      <div class="meter-wrap">
        <div class="meter" role="img" aria-label=${meterLabel}>
          <div class="fill" style="width:${clamp(soc ?? 0, 0, 100)}%"></div>
          <div class="ticks"></div>
          ${hasLimit ? html`<div class="limit" style="left:${limit}%"></div>` : nothing}
        </div>
        ${hasLimit ? html`<div class="meter-label" aria-hidden="true"><span style="left:${limit}%">limit ${formatNumber(limit)} %</span></div>` : nothing}
      </div>
      ${charging ? this.renderCarSources(model, flows, formatPower(model.car ?? 0, unit)) : nothing}
      ${w.boost
        ? html`<div class="mode">
            <div class="mode-head"><span id="mode-l">Režim nabíjení</span><span class="mode-sub ${boost === "on" ? "warn" : ""}">${modeSub}</span></div>
            <ed-segmented
              guarded .options=${modeOptions} .value=${mode} label="Režim nabíjení auta" ?disabled=${boost === undefined}
              .holdMs=${s.num.ui.hold_ms} .doubleTapMs=${s.num.ui.double_tap_ms} .hintSeconds=${s.num.ui.hint_seconds}
              @ed-select=${(event: CustomEvent<{ value: string }>) => this.setBoost("wallbox", event.detail.value === "on")}
            ></ed-segmented>
            ${this.renderPowerFold(s, boost === "on")}
          </div>`
        : nothing}
      ${this.renderWallboxGroup(s, model, charging, srcColor, unit)}
    </section>`;
  }

  private renderCarSources(model: FlowModel, flows: Settings["num"]["flows"], total: string): TemplateResult {
    const names: Record<Source, string> = { sun: "Slunce", bat: "Baterie", grid: "Síť" };
    const parts = SOURCES.filter((source) => model.share[source] > 0.004);
    const pct = percentages(parts.map((source) => model.share[source]));
    // The grid beyond its share is a deviation: drawn in the warning colour, like in the texts.
    const colorOf = (source: Source) => (source === "grid" && model.share.grid > flows.grid_deviation_share / 100 ? "var(--ed-warning)" : `var(${SOURCE_VAR[source]})`);
    return html`<div class="mix">
      <div class="mix-head"><span>Odkud auto nabíjí</span><span>${total}</span></div>
      <div class="mix-bar" aria-hidden="true">${parts.map((source) => html`<div style="flex:${model.share[source]} 1 0;background:${colorOf(source)}"></div>`)}</div>
      <p class="mix-legend" role="group" aria-label="Odkud auto nabíjí, průměr za 5 minut">
        ${parts.map((source, i) => html`<span><i style="background:${colorOf(source)}"></i>${names[source]}<em>${pct[i]} %</em></span>`)}
      </p>
    </div>`;
  }

  /** Charging power in boost: the card shows the total of all phases, the entity holds the power of one phase. */
  private renderPowerFold(s: Settings, open: boolean): TemplateResult | typeof nothing {
    const id = s.entities.wallbox.charging_power;
    if (!id) return nothing;
    const { phases, power_min, power_max, power_step } = s.num.wallbox;
    const entity = entityState(this.hass, id);
    const perPhase = readNumber(this.hass, id);
    const total = perPhase === undefined ? undefined : (perPhase * phases) / 1000;
    let min = power_min / 1000;
    let max = power_max / 1000;
    const entityMin = attribute(entity, "min");
    const entityMax = attribute(entity, "max");
    if (entityMin !== undefined) min = Math.max(min, (entityMin * phases) / 1000);
    if (entityMax !== undefined) max = Math.min(max, (entityMax * phases) / 1000);
    return html`<div class="fold ${open ? "open" : ""}" ?inert=${!open}><div>
      <div class="field">
        <span class="field-label">Nabíjecí výkon</span><span class="field-value">${total === undefined ? NO_DATA : formatNumber(total, 1)}<small> kW</small></span>
        <ed-slider
          .min=${min} .max=${max} .step=${power_step / 1000} .value=${total ?? min}
          label="Nabíjecí výkon wallboxu" valueText=${total === undefined ? "bez dat" : `${formatNumber(total, 1)} kW`}
          minLabel="${formatNumber(min, 1)} kW" maxLabel="${formatNumber(max, 1)} kW"
          ?disabled=${total === undefined}
          @ed-change=${(event: CustomEvent<{ value: number }>) => this.setNumber(id, Math.round((event.detail.value * 1000) / phases), "Nabíjecí výkon")}
        ></ed-slider>
      </div>
    </div></div>`;
  }

  private renderWallboxGroup(s: Settings, model: FlowModel, charging: boolean, srcColor: string, unit: PowerUnit): TemplateResult {
    const w = s.entities.wallbox;
    const open = !!this._open.wallbox;
    const hasDetail = !!(w.block_charging || w.prioritize_connected);
    const link = model.carLink;
    const sub =
      charging
        ? html`<span>nabíjí </span><b style="--c:${srcColor}">${formatPower(model.car ?? 0, unit)}</b>`
        : link === "connected" || link === "charging"
          ? html`nenabíjí`
          : link === "disconnected"
            ? html`odpojeno`
            : html`${NO_DATA}`;
    const socId = s.entities.car.state_of_charge;
    // The age of the reading; nothing for a car that reports no value.
    const age = readNumber(this.hass, socId) === undefined ? undefined : ago(entityState(this.hass, socId)?.last_updated, this._now);
    const block = this.shown(w.block_charging);
    const prio = this.shown(w.prioritize_connected);
    return html`<ul class="group">
      <li class=${open ? "open" : ""}>
        <button type="button" class="row row-btn" aria-expanded=${open ? "true" : "false"} ?disabled=${!hasDetail} @click=${() => this.toggle("wallbox")}>
          <span class="badge" aria-hidden="true" style=${charging ? `--bc:${srcColor}` : ""}><svg viewBox="0 0 24 24"><path d=${ICON.wallbox}></path></svg></span>
          <span class="row-text"><span class="row-title">Wallbox</span><span class="row-sub">${sub}</span></span>
          <span class="row-aside">${age ? `z auta ${age}` : ""}</span>
          ${hasDetail ? html`<svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d=${ICON.expand}></path></svg>` : html`<span></span>`}
        </button>
        ${hasDetail
          ? html`<div class="fold ${open ? "open" : ""}" ?inert=${!open}><div>
              ${w.block_charging ? this.switchRow("Zablokovat nabíjení", w.block_charging, block === "on" ? "Auto nenabíjí, přebytek ohřívá vodu" : "Auto smí nabíjet", block === "on") : nothing}
              ${w.prioritize_connected ? this.switchRow("Přednost před bojlerem", w.prioritize_connected, prio === "on" ? "Auto nabíjí dřív než bojler" : "Auto nemá přednost", false) : nothing}
            </div></div>`
          : nothing}
      </li>
    </ul>`;
  }

  // ----------------------------------------------------------------- water

  private renderWater(s: Settings, model: FlowModel): TemplateResult {
    const e = s.entities;
    const flows = s.num.flows;
    const heating = isOn(model.boil, flows.idle_threshold);
    const src = sourceText(model.share, flows);
    const srcColor = this.sourceColor(src);
    const boost = this.shown(e.boiler.boost);
    const boostOn = boost === "on";
    const unit = powerUnit([heating ? model.boil : undefined], flows.kw_from);

    let stateText: string | undefined;
    if (heating) stateText = `Bojler ohřívá ${src.text}${boostOn ? " · Boost" : ""}`;
    else if (model.boil !== undefined) stateText = "Bez ohřevu";

    return html`<section class="panel" aria-labelledby="h-water">
      <div class="head"><h2 id="h-water">${s.titles.water}</h2>${this.stateLine(stateText, heating ? srcColor : undefined)}</div>
      <div class="water">
        ${this.renderBoilerTile(s, model, heating, srcColor, unit)} ${this.renderMixing(s)} ${this.renderTankTile(s)}
      </div>
    </section>`;
  }

  /** The common frame of a water tile: the gauge on the left, name, state and main control on the right. */
  private gauge(value: number | undefined, min: number, max: number, s: Settings, label: string): TemplateResult {
    return html`<div class="arc" role="img" aria-label=${label}>
      ${arcSvg(value, min, max, s.tempScale)}
      <div class="arc-num"><b>${value === undefined ? NO_DATA : formatNumber(value)}</b>${value === undefined ? html`<span class="sr-only">bez dat</span>` : html`<span>°C</span>`}</div>
      <span class="arc-min" aria-hidden="true">${formatNumber(min)}</span><span class="arc-max" aria-hidden="true">${formatNumber(max)}</span>
    </div>`;
  }

  private renderBoilerTile(s: Settings, model: FlowModel, heating: boolean, srcColor: string, unit: PowerUnit): TemplateResult {
    const b = s.entities.boiler;
    const nb = s.num.boiler;
    const boost = this.shown(b.boost);
    const boostOn = boost === "on";
    const flowTarget = readNumber(this.hass, b.target_temperature);
    const boostTarget = readNumber(this.hass, b.boost_target_temperature);
    const target = boostOn ? boostTarget : flowTarget;
    const gMin = s.num.water.gauge_min;
    const gMax = Math.max(s.num.water.gauge_max, flowTarget ?? 0);
    const t = model.boilTemp;
    const open = !!this._open.targets;
    const hasTargets = !!(b.target_temperature || b.boost_target_temperature);
    const label = `Bojler ${t === undefined ? "bez dat" : `${formatNumber(t)} °C`}, ${heating ? `ohřívá výkonem ${formatPower(model.boil!, unit)}` : "neohřívá"}${target === undefined ? "" : `, cíl ${formatNumber(target)} °C`}, stupnice ${formatNumber(gMin)} až ${formatNumber(gMax)} °C`;
    return html`<div class="source">
      <div class="source-top">
        ${this.gauge(t, gMin, gMax, s, label)}
        <div class="source-body">
          <div>
            <div class="source-title">Bojler (FVE)</div>
            <div class="source-line">
              <span class="src" style="--c:${heating ? srcColor : "var(--ed-secondary)"}">${heating ? formatPower(model.boil!, unit) : model.boil === undefined ? NO_DATA : "neohřívá"}</span>${target === undefined ? nothing : html`<span class="dim"> · cíl ${formatNumber(target)} °C</span>`}
            </div>
          </div>
          ${b.boost
            ? html`<ed-segmented
                compact guarded .options=${BOOST_OPTIONS} .value=${boost ?? ""} label="Režim ohřevu bojleru" ?disabled=${boost === undefined}
                .holdMs=${s.num.ui.hold_ms} .doubleTapMs=${s.num.ui.double_tap_ms} .hintSeconds=${s.num.ui.hint_seconds}
                @ed-select=${(event: CustomEvent<{ value: string }>) => this.setBoost("boiler", event.detail.value === "on")}
              ></ed-segmented>`
            : nothing}
        </div>
      </div>
      ${hasTargets
        ? html`<div class="subrow">
            <button type="button" class="rowbtn" aria-expanded=${open ? "true" : "false"} @click=${() => this.toggle("targets")}>
              <span class="rowbtn-title">Cílové teploty</span>
              <span class="rowbtn-value">Přetoky <b>${flowTarget === undefined ? NO_DATA : formatNumber(flowTarget)}</b> · Boost <b>${boostTarget === undefined ? NO_DATA : `${formatNumber(boostTarget)} °C`}</b></span>
              <svg class="chevron ${open ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${ICON.expand}></path></svg>
            </button>
            <div class="fold ${open ? "open" : ""}" ?inert=${!open}><div>${this.renderTargets(s, flowTarget, boostTarget)}</div></div>
          </div>`
        : nothing}
    </div>`;
  }

  /** The two targets of the boiler: Přetoky may not be below Boost (CURRENT_SPEC.md, Cíle ohřevu). */
  private renderTargets(s: Settings, flowTarget: number | undefined, boostTarget: number | undefined): TemplateResult {
    const b = s.entities.boiler;
    const nb = s.num.boiler;
    const field = (id: string | undefined, value: number | undefined, title: string, sub: string, low: number | undefined, high: number | undefined) => {
      if (!id) return nothing;
      const entity = entityState(this.hass, id);
      let min = nb.target_min;
      let max = nb.target_max;
      const entityMin = attribute(entity, "min");
      const entityMax = attribute(entity, "max");
      if (entityMin !== undefined) min = Math.max(min, entityMin);
      if (entityMax !== undefined) max = Math.min(max, entityMax);
      if (low !== undefined) min = Math.max(min, low);
      if (high !== undefined) max = Math.min(max, high);
      return html`<div class="field">
        <span class="field-label">${title}<span class="hint">${sub}</span></span><span class="field-value">${value === undefined ? NO_DATA : formatNumber(value)}<small> °C</small></span>
        <ed-slider
          .min=${min} .max=${max} .step=${nb.target_step} .value=${value ?? min}
          label="Cíl ohřevu bojleru, ${title}" valueText=${value === undefined ? "bez dat" : `${value} °C, ${title}`}
          minLabel="${formatNumber(min)} °C" maxLabel="${formatNumber(max)} °C"
          ?disabled=${value === undefined}
          @ed-change=${(event: CustomEvent<{ value: number }>) => this.setNumber(id, event.detail.value, `Cíl ohřevu bojleru (${title})`)}
        ></ed-slider>
      </div>`;
    };
    return html`<div class="detail">
      ${field(b.target_temperature, flowTarget, "Přetoky", "jen z přebytku", boostTarget, undefined)}
      ${field(b.boost_target_temperature, boostTarget, "Boost", "i ze sítě a z baterie", undefined, flowTarget)}
      <p class="hint">Přetoky nesmí být pod Boostem.</p>
    </div>`;
  }

  /** Mixing: a capsule between the two tiles, joined to them by lines (solid when on, dotted when off). */
  private renderMixing(s: Settings): TemplateResult | typeof nothing {
    const m = s.entities.mixing;
    if (!(m.script && m.valve_c1 && m.valve_c2) && !m.valve_c1 && !m.valve_c2) return nothing;
    const state = mixingState(this.hass, m);
    const on = state === "on";
    const known = state === "on" || state === "off";
    const canSwitch = !!(m.script && m.valve_c1 && m.valve_c2);
    const note = state === "unclear" ? "nejasný stav ventilů" : state === undefined ? "bez dat" : "";
    return html`
      <div class="link ${on ? "on" : ""}" aria-hidden="true"></div>
      <div class="mixcap" role="group" aria-labelledby="l-mix">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M12 2.5 C12 2.5 5.5 10 5.5 15 A6.5 6.5 0 0 0 12 21.5 Z" fill=${on ? s.colors.cold : "var(--ed-off)"}></path>
          <path d="M12 2.5 C12 2.5 18.5 10 18.5 15 A6.5 6.5 0 0 1 12 21.5 Z" fill=${on ? s.colors.hot : "var(--ed-off)"}></path>
        </svg>
        <span class="mixcap-text"><span id="l-mix" style=${on ? "" : "color:var(--ed-secondary)"}>Mísení vody</span>${note ? html`<span class="mixcap-note">${note}</span>` : nothing}</span>
        <ed-switch
          guarded hintPlacement="below" label="Mísení vody" .checked=${on} ?disabled=${!known || !canSwitch}
          .holdMs=${s.num.ui.hold_ms} .doubleTapMs=${s.num.ui.double_tap_ms} .hintSeconds=${s.num.ui.hint_seconds}
          @ed-toggle=${(event: CustomEvent<{ checked: boolean }>) => this.setMixing(event.detail.checked ? "on" : "off", state)}
        ></ed-switch>
      </div>
      <div class="link ${on ? "on" : ""}" aria-hidden="true"></div>`;
  }

  private renderTankTile(s: Settings): TemplateResult {
    const t = s.entities.tank;
    const nt = s.num.tank;
    const id = t.water_heater;
    const entity = entityState(this.hass, id);
    const mode = this.shown(id);
    const off = mode === "off";
    const manual = mode === "heat";
    const reported = attribute(entity, "temperature");
    const chosen = this._tankTemp;
    const set = chosen && chosen.id === id ? chosen.value : reported;
    const gMin = s.num.water.gauge_min;
    const gMax = Math.max(s.num.water.gauge_max, readNumber(this.hass, s.entities.boiler.target_temperature) ?? 0);
    // The tank has no measured temperature: the gauge shows the set value (Off: the minimum the boiler keeps).
    const shownTemp = off ? nt.temp_min : set;
    const list = Array.isArray(entity?.attributes?.operation_list) ? (entity!.attributes.operation_list as string[]) : Object.keys(TANK_MODES);
    const options: SegmentOption[] = Object.keys(TANK_MODES).filter((value) => list.includes(value)).map((value) => ({ value, label: TANK_MODES[value] }));
    const open = !!this._open.tank;
    const { min, max } = this.tankRange(s);
    const modeName = mode === undefined ? NO_DATA : (TANK_MODES[mode] ?? mode);
    const plan = off ? "kotel drží minimum" : manual ? "nastaveno ručně" : "podle plánu";
    const summary = shownTemp === undefined ? NO_DATA : off ? `${formatNumber(nt.temp_min)} °C · vypnuto` : `${formatNumber(shownTemp)} °C · ${manual ? "ručně" : "podle plánu"}`;
    const label = `Zásobník, ${shownTemp === undefined ? "nastavení bez dat" : off ? `vypnuto, kotel drží ${formatNumber(nt.temp_min)} °C` : `nastaveno ${formatNumber(shownTemp)} °C`}, režim ${modeName}, naměřená teplota není, stupnice ${formatNumber(gMin)} až ${formatNumber(gMax)} °C`;
    return html`<div class="source">
      <div class="source-top">
        ${this.gauge(shownTemp, gMin, gMax, s, label)}
        <div class="source-body">
          <div>
            <div class="source-title">Zásobník (plyn)</div>
            <div class="source-line"><span class="src" style="--c:${manual ? "var(--ed-text)" : "var(--ed-secondary)"}">${modeName}</span>${mode === undefined ? nothing : html`<span class="dim"> · ${plan}</span>`}</div>
          </div>
          ${id
            ? html`<ed-segmented compact .options=${options} .value=${mode ?? ""} label="Režim zásobníku" ?disabled=${mode === undefined} @ed-select=${(event: CustomEvent<{ value: string }>) => this.setTank(id, event.detail.value)}></ed-segmented>`
            : nothing}
        </div>
      </div>
      ${id
        ? html`<div class="subrow">
            <button type="button" class="rowbtn" aria-expanded=${open ? "true" : "false"} @click=${() => this.toggle("tank")}>
              <span class="rowbtn-title">Teplota</span>
              <span class="rowbtn-value">${summary}</span>
              <svg class="chevron ${open ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${ICON.expand}></path></svg>
            </button>
            <div class="fold ${open ? "open" : ""}" ?inert=${!open}><div>
              <div class="detail">
                <div class="field ${off ? "off" : ""}">
                  <span class="field-label">Teplota<span class="hint">${off ? "zásobník je vypnutý" : manual ? "nastavujete ručně" : "podle plánu; změna přepne na Manual"}</span></span>
                  <span class="field-value">${shownTemp === undefined ? NO_DATA : formatNumber(shownTemp)}<small> °C</small></span>
                  <ed-slider
                    .min=${min} .max=${max} .step=${nt.temp_step} .tickStep=${5} .value=${shownTemp ?? min}
                    label="Teplota zásobníku" valueText=${set === undefined ? "bez dat" : `${set} °C, nastavená teplota`}
                    minLabel="${formatNumber(min)} °C" maxLabel="${formatNumber(max)} °C"
                    ?disabled=${set === undefined || off}
                    @ed-change=${(event: CustomEvent<{ value: number }>) => this.setTankTemperature(id, event.detail.value, mode)}
                  ></ed-slider>
                </div>
              </div>
            </div></div>
          </div>`
        : nothing}
    </div>`;
  }

  // --------------------------------------------------------------- controls

  /** The state shown: a just chosen value, until Home Assistant reports it. */
  private shown(id: string | undefined): string | undefined {
    if (!id) return undefined;
    return this._optimistic[id] ?? readText(this.hass, id);
  }

  private toggle(panel: Panel): void {
    this._open = { ...this._open, [panel]: !this._open[panel] };
  }

  private switchRow(title: string, id: string, hint: string, warn: boolean): TemplateResult {
    const value = this.shown(id);
    return html`<div class="switch-row">
      <span class="switch-text"><span class="switch-title" id="l-${id.replace(/\W/g, "-")}">${title}</span><span class="hint ${warn ? "warn" : ""}">${value === undefined ? NO_DATA : hint}</span></span>
      <ed-switch
        label=${title} .checked=${value === "on"} ?disabled=${value === undefined}
        @ed-toggle=${(event: CustomEvent<{ checked: boolean }>) => this.setSwitch(id, event.detail.checked, title)}
      ></ed-switch>
    </div>`;
  }

  // ---------------------------------------------------------------- actions

  private choose(id: string, value: string): void {
    this._optimistic = { ...this._optimistic, [id]: value };
    window.clearTimeout(this._timers.get(id));
    // If Home Assistant never reports it, fall back to the real state after the configured time.
    this._timers.set(id, window.setTimeout(() => {
      const next = { ...this._optimistic };
      delete next[id];
      this._optimistic = next;
    }, (this._config?.num.ui.revert_after ?? 6) * 1000));
  }

  /** Calls a service on an entity that is reported; never on a missing or unavailable one (CURRENT_SPEC.md, Pojistky). */
  private async call(domain: string, service: string, data: Record<string, unknown>, id: string, what: string): Promise<boolean> {
    if (!this.hass || readText(this.hass, id) === undefined) {
      this._feedback = `${what}: entita nehlásí data, nic jsem neodeslal.`;
      return false;
    }
    try {
      await this.hass.callService(domain, service, data);
      return true;
    } catch {
      this._feedback = `${what}: Home Assistant příkaz nepřijal.`;
      return false;
    }
  }

  private async setSwitch(id: string, on: boolean, what: string): Promise<void> {
    this._feedback = "";
    this.choose(id, on ? "on" : "off");
    await this.call("switch", on ? "turn_on" : "turn_off", { entity_id: id }, id, what);
  }

  private async setBoost(kind: "wallbox" | "boiler", on: boolean): Promise<void> {
    const e = this._config!.entities;
    const id = kind === "wallbox" ? e.wallbox.boost : e.boiler.boost;
    if (!id) return;
    this._feedback = "";
    // Boost with blocked charging would switch itself off at once: unblock first and say so.
    if (kind === "wallbox" && on && e.wallbox.block_charging && readText(this.hass, e.wallbox.block_charging) === "on") {
      await this.setSwitch(e.wallbox.block_charging, false, "Zablokovat nabíjení");
      this._feedback = "Nabíjení bylo zablokované, blokování jsem vypnul, aby boost fungoval.";
    }
    this.choose(id, on ? "on" : "off");
    await this.call("switch", on ? "turn_on" : "turn_off", { entity_id: id }, id, kind === "wallbox" ? "Boost wallboxu" : "Boost bojleru");
  }

  private async setNumber(id: string, value: number, what: string): Promise<void> {
    this._feedback = "";
    await this.call("number", "set_value", { entity_id: id, value }, id, what);
  }

  private async setTank(id: string, mode: string): Promise<void> {
    this._feedback = "";
    this.choose(id, mode);
    if (!(await this.call("water_heater", "set_operation_mode", { entity_id: id, operation_mode: mode }, id, "Režim zásobníku"))) return;
    // Manual must start inside the range of the card (the tank may report 30 °C, the lowest it knows): set the nearest allowed temperature.
    if (mode === "heat") {
      const { min, max } = this.tankRange(this._config!);
      const current = attribute(entityState(this.hass, id), "temperature");
      if (current === undefined || current < min || current > max) await this.setTemperature(id, clamp(current ?? min, min, max));
    }
  }

  /** The range of the tank temperature: the configured one, narrowed by what the entity allows. */
  private tankRange(s: Settings): { min: number; max: number } {
    const entity = entityState(this.hass, s.entities.tank.water_heater);
    return {
      min: Math.max(s.num.tank.temp_min, attribute(entity, "min_temp") ?? s.num.tank.temp_min),
      max: Math.min(s.num.tank.temp_max, attribute(entity, "max_temp") ?? s.num.tank.temp_max),
    };
  }

  private async setTemperature(id: string, temperature: number): Promise<boolean> {
    // Shown at once; if Home Assistant does not report it in time, the real value comes back.
    this._tankTemp = { id, value: temperature };
    window.clearTimeout(this._timers.get("tank-temp"));
    this._timers.set("tank-temp", window.setTimeout(() => (this._tankTemp = undefined), (this._config?.num.ui.revert_after ?? 6) * 1000));
    return this.call("water_heater", "set_temperature", { entity_id: id, temperature }, id, "Teplota zásobníku");
  }

  /** Moving the temperature in Auto switches the tank to Manual first (CURRENT_SPEC.md, Zásobník). */
  private async setTankTemperature(id: string, temperature: number, mode: string | undefined): Promise<void> {
    this._feedback = "";
    if (mode !== "heat") {
      this.choose(id, "heat");
      if (!(await this.call("water_heater", "set_operation_mode", { entity_id: id, operation_mode: "heat" }, id, "Režim zásobníku"))) return;
    }
    await this.setTemperature(id, temperature);
  }

  /** The script toggles the valves, so it is called only when the wanted state differs from the real one. */
  private async setMixing(wanted: "on" | "off", current: Mixing): Promise<void> {
    const script = this._config!.entities.mixing.script;
    if (!script || wanted === current) return;
    this._feedback = "";
    await this.call("script", "turn_on", { entity_id: script }, script, "Mísení vody");
  }
}
