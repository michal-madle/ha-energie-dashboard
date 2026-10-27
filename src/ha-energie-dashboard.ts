import { LitElement, html, nothing, svg } from "lit";
import { property, state } from "lit/decorators.js";
import type { PropertyValues, TemplateResult } from "lit";
import { normalizeConfig } from "./config";
import { SINKS, SOURCES, buildModel, mixingState, sourceText } from "./model";
import type { FlowModel, Mixing, Sink, Source, SourceText } from "./model";
import { bands, layout } from "./sankey";
import { styles } from "./styles";
import type { DashboardConfig, EntityId, HassEntity, HomeAssistant, Settings } from "./types";
import { entityState, formatNumber, formatPower, powerUnit, readNumber, readText } from "./utils";
import type { PowerUnit } from "./utils";
import type { SegmentOption } from "./ed-segmented";
import { ICON } from "./icons";

/** Shown for every value without data (CURRENT_SPEC.md, Chybějící a zastaralá data). */
const NO_DATA = "––";

const SOURCE_VAR: Record<Source, string> = { sun: "--ed-sun", bat: "--ed-battery", grid: "--ed-grid" };
const TILE_VAR: Record<Source | Sink, string> = {
  sun: "--ed-sun", bat: "--ed-battery", grid: "--ed-grid",
  house: "--ed-house", car: "--ed-car", boil: "--ed-boiler", batIn: "--ed-battery", gridOut: "--ed-grid",
};
const TANK_MODES: Record<string, string> = { auto: "Auto", heat: "Manual", off: "Off" };
const TANK_MODE_TEXT: Record<string, string> = { auto: "auto", heat: "manual", off: "vypnuto" };

interface Tile {
  side: "L" | "R";
  key: Source | Sink;
  name: string;
  watts?: number;
  /** Strength of the power 0–1 on the scale of the tile (scale.* in the configuration). */
  k: number;
  icon: string;
  /** Second path inside the icon (arrow in the battery). */
  icon2?: string;
  idleIcon: string;
  idleText: string;
  entity?: EntityId;
}

type Panel = "wallbox" | "boiler" | "tank";

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

/*
 * Energie card in the look of Apple's HIG (CURRENT_SPEC.md): three panels — Elektřina (Sankey
 * diagram of the flows and three gauges), the car with the wallbox, hot water. Every limit,
 * threshold, scale and colour comes from the configuration (config.ts).
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
  /** Mixing state waiting for the confirmation of the person. */
  @state() private _confirmMix?: "on" | "off";

  private _observer?: ResizeObserver;
  private _timers = new Map<string, number>();

  setConfig(config: DashboardConfig): void {
    this._config = normalizeConfig(config);
  }

  getCardSize(): number {
    return 14;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._observer?.disconnect();
    this._observer = undefined;
    this._timers.forEach((timer) => window.clearTimeout(timer));
    this._timers.clear();
  }

  protected willUpdate(): void {
    // Only the dark / light mode of Home Assistant is followed; the surfaces are the card's own.
    this.toggleAttribute("data-light", this.hass?.themes?.darkMode === false);
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
  }

  // ----------------------------------------------------------------- render

  render(): TemplateResult | typeof nothing {
    const s = this._config;
    if (!s) return nothing;
    const model = buildModel(this.hass, s);
    const c = s.colors;
    const vars = `--ed-sun:${c.sun};--ed-battery:${c.battery};--ed-grid:${c.grid};--ed-house:${c.house};--ed-car:${c.car};--ed-boiler:${c.boiler};--ed-accent:${c.accent};--ed-button:${c.button};--ed-warning:${c.warning};--ed-cold:${c.cold};--ed-off:${c.neutral}`;
    return html`<div class="page" style=${vars}>
      ${s.title === "" ? nothing : html`<h1>${s.title}</h1>`} ${this.renderElectricity(s, model)} ${this.renderCar(s, model)} ${this.renderWater(s, model)}
      <p class="feedback" aria-live="polite">${this._feedback}</p>
    </div>`;
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

  // ------------------------------------------------------------ Elektřina

  private renderElectricity(s: Settings, model: FlowModel): TemplateResult {
    const color = model.summarySource ? `var(${SOURCE_VAR[model.summarySource]})` : undefined;
    return html`<section class="panel" aria-labelledby="h-el">
      <div class="head"><h2 id="h-el">${s.titles.electricity}</h2>${this.stateLine(model.summary, color)}</div>
      ${this.renderFlow(s, model)} ${this.renderGauges(s, model)}
    </section>`;
  }

  private tiles(model: FlowModel, s: Settings): Tile[] {
    const e = s.entities;
    const sc = s.num.scale;
    const link = model.carLink;
    return [
      { side: "L", key: "sun", name: "Slunce", watts: model.sun, k: (model.sun ?? 0) / sc.sun, icon: ICON.sun, idleIcon: ICON.moon, idleText: "nevyrábí", entity: e.pv.power },
      { side: "L", key: "bat", name: "Baterie", watts: model.batDis, k: (model.batDis ?? 0) / sc.battery, icon: ICON.battery, icon2: ICON.batteryDown, idleIcon: ICON.pause, idleText: "nevybíjí", entity: e.battery.power },
      { side: "L", key: "grid", name: "Síť", watts: model.imp, k: (model.imp ?? 0) / sc.grid, icon: ICON.grid, idleIcon: ICON.minus, idleText: "neodebírá", entity: e.grid.power },
      { side: "R", key: "house", name: "Dům", watts: model.other, k: (model.other ?? 0) / sc.house, icon: ICON.home, idleIcon: ICON.minus, idleText: "bez odběru", entity: e.house.power },
      {
        side: "R", key: "car", name: "Auto", watts: link === undefined && model.car === undefined ? undefined : model.car ?? 0, k: (model.car ?? 0) / sc.car,
        icon: ICON.car, idleIcon: link === "disconnected" ? ICON.minus : ICON.plug,
        idleText: link === "disconnected" ? "odpojeno" : link === undefined ? "bez stavu" : "připojeno", entity: e.wallbox.power,
      },
      { side: "R", key: "boil", name: "Bojler", watts: model.boil, k: (model.boil ?? 0) / sc.boiler, icon: ICON.therm, idleIcon: ICON.pause, idleText: "vypnuto", entity: e.boiler.power },
      { side: "R", key: "batIn", name: "Do baterie", watts: model.batIn, k: (model.batIn ?? 0) / sc.battery, icon: ICON.battery, icon2: ICON.batteryBolt, idleIcon: ICON.pause, idleText: "nenabíjí", entity: e.battery.power },
      { side: "R", key: "gridOut", name: "Do sítě", watts: model.exp, k: (model.exp ?? 0) / sc.grid, icon: ICON.grid, idleIcon: ICON.minus, idleText: "nedodává", entity: e.grid.power },
    ];
  }

  private renderFlow(s: Settings, model: FlowModel): TemplateResult {
    const lay = layout(this._width);
    const band = bands(model.flows, lay, { maxPxPerKw: s.num.flows.band_max_px_per_kw, minPx: s.num.flows.band_min_px });
    const unit: PowerUnit = powerUnit([model.sun, model.batDis, model.batIn, model.imp, model.exp, model.other, model.car, model.boil], s.num.flows.kw_from);
    const stops = (source: Source) =>
      svg`<linearGradient id="rg-${source}" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" style="stop-color:var(${SOURCE_VAR[source]});stop-opacity:0.2"></stop>
        <stop offset="0.14" style="stop-color:var(${SOURCE_VAR[source]});stop-opacity:0.88"></stop>
        <stop offset="0.86" style="stop-color:var(${SOURCE_VAR[source]});stop-opacity:0.88"></stop>
        <stop offset="1" style="stop-color:var(${SOURCE_VAR[source]});stop-opacity:0.2"></stop>
      </linearGradient>`;
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
      ${this.tiles(model, s).map((tile) => this.renderTile(tile, lay, unit, s))}
    </div>`;
  }

  private renderTile(tile: Tile, lay: ReturnType<typeof layout>, unit: PowerUnit, s: Settings): TemplateResult {
    const noData = tile.watts === undefined;
    const on = !noData && tile.watts! > s.num.flows.idle_threshold;
    const left = tile.side === "L" ? 0 : lay.width - lay.tile.w;
    const centre = tile.side === "L" ? lay.left[tile.key as Source] : lay.right[tile.key as Sink];
    const k = clamp(tile.k, 0, 1);
    const value = noData ? NO_DATA : formatPower(tile.watts!, unit);
    const spoken = noData ? "bez dat" : on ? value : tile.idleText;
    // The stronger the flow, the stronger the tint of the tile and the glow of the icon.
    const style = `left:${left}px;top:${(centre - lay.tile.h / 2).toFixed(1)}px;width:${lay.tile.w}px;height:${lay.tile.h}px;--tc:var(${TILE_VAR[tile.key]});--tint:${on ? Math.round(21 + 7 * k) : 0}%;--gr:${(2 + 9 * k).toFixed(1)}px;--ga:${Math.round(30 + 60 * k)}%`;
    return html`<button
      type="button"
      class="tile ${on ? "on" : "idle"}"
      style=${style}
      aria-label="${tile.name} ${spoken}"
      @click=${() => this.moreInfo(tile.entity)}
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

  private renderGauges(s: Settings, model: FlowModel): TemplateResult {
    const { reserve } = s.num.battery;
    const limit = s.num.car.charge_limit;
    const { scale_min: low, gauge_max: high } = s.num.boiler;
    const pct = (value: number | undefined) => (value === undefined ? undefined : clamp(value, 0, 100));
    const items = [
      { label: "Baterie", text: model.soc === undefined ? NO_DATA : `${formatNumber(model.soc)} %`, fill: pct(model.soc), color: (model.soc ?? 100) <= reserve ? "var(--ed-warning)" : "var(--ed-battery)", tick: reserve },
      { label: `Auto → ${formatNumber(limit)} %`, text: model.carSoc === undefined ? NO_DATA : `${formatNumber(model.carSoc)} %`, fill: pct(model.carSoc), color: "var(--ed-car)", tick: limit },
      { label: "Bojler", text: model.boilTemp === undefined ? NO_DATA : `${formatNumber(model.boilTemp)} °C`, fill: model.boilTemp === undefined ? undefined : pct(((model.boilTemp - low) / (high - low)) * 100), color: "var(--ed-boiler)", tick: undefined },
    ];
    return html`<div class="gauges" role="group" aria-label="Stav baterie, auta a bojleru">
      ${items.map(
        (item) => html`<div class="gauge">
          <div class="g-label">${item.label}</div>
          <div class="g-value">${item.text}${item.fill === undefined ? html`<span class="sr-only">bez dat</span>` : nothing}</div>
          <div class="bar" aria-hidden="true">
            <div class="fill" style="width:${item.fill ?? 0}%;background:${item.color}"></div>
            ${item.tick === undefined ? nothing : html`<div class="tick" style="left:${item.tick}%"></div>`}
          </div>
        </div>`,
      )}
    </div>`;
  }

  // ------------------------------------------------------------------- car

  private renderCar(s: Settings, model: FlowModel): TemplateResult {
    const e = s.entities;
    const flows = s.num.flows;
    const idle = flows.idle_threshold;
    const limit = s.num.car.charge_limit;
    const charging = (model.car ?? 0) > idle && model.carLink !== "disconnected";
    const src = sourceText(model.share, flows);
    const srcColor = this.sourceColor(src);
    const priorityWaiting =
      readText(this.hass, e.wallbox.prioritize_connected) === "on" && model.carLink === "connected" && (model.sun ?? 0) > s.num.wallbox.priority_min_sun;
    const blocked = readText(this.hass, e.wallbox.block_charging) === "on";

    let stateText: string | undefined;
    let stateColor: string | undefined;
    if (charging) {
      stateText = `Nabíjí ${src.text}`;
      stateColor = srcColor;
    } else if (model.carLink === "connected") {
      stateText = "Připojeno, nenabíjí";
      stateColor = priorityWaiting ? "var(--ed-warning)" : undefined;
    } else if (model.carLink === "disconnected") {
      stateText = "Odpojeno";
    }
    const glow = `color-mix(in srgb, ${stateColor ?? "#d8d8dc"} ${stateColor ? 42 : 28}%, transparent)`;
    const picture = entityState(this.hass, e.car.image)?.attributes?.entity_picture;
    const soc = model.carSoc;
    const unit = powerUnit([model.car], flows.kw_from);
    const mixTotal = model.car ?? 0;

    return html`<section class="panel" aria-labelledby="h-car">
      <div class="car-top">
        <div class="car-art" aria-hidden="true" style="--glow:${glow}">
          <div class="glow"></div><div class="shadow"></div>
          ${typeof picture === "string" && picture ? html`<img src=${picture} alt="" />` : nothing}
        </div>
        <div class="head"><h2 id="h-car">${s.titles.car}</h2>${this.stateLine(stateText, stateColor)}</div>
        <div class="car-soc">
          <span class="soc">${soc === undefined ? NO_DATA : formatNumber(soc)}<small> %</small>${soc === undefined ? html`<span class="sr-only">bez dat</span>` : nothing}</span>
          <span class="range">dojezd <b>${model.carRange === undefined ? NO_DATA : `${formatNumber(model.carRange)} km`}</b></span>
        </div>
      </div>
      <div>
        <div class="meter" role="img" aria-label="Nabití auta ${soc === undefined ? "bez dat" : `${formatNumber(soc)} %`}, limit ${formatNumber(limit)} %">
          <div class="fill" style="width:${clamp(soc ?? 0, 0, 100)}%"></div>
          <div class="ticks"></div>
          <div class="limit" style="left:${limit}%"></div>
        </div>
        <div class="meter-label" aria-hidden="true"><span style="left:${limit}%">limit ${formatNumber(limit)} %</span></div>
      </div>
      ${blocked
        ? html`<div class="notice" role="status"><svg viewBox="0 0 24 24" aria-hidden="true"><path d=${ICON.lock}></path></svg><p>Nabíjení auta je zablokované.</p></div>`
        : priorityWaiting
          ? html`<div class="notice warn" role="status"><svg viewBox="0 0 24 24" aria-hidden="true"><path d=${ICON.alert}></path></svg><p>Přednost před bojlerem je zapnutá, auto je připojené, ale nenabíjí. Slunce zřejmě nestačí na rozjezd wallboxu.</p></div>`
          : nothing}
      ${charging ? this.renderCarSources(model, flows, formatPower(mixTotal, unit)) : nothing}
      ${this.renderWallboxRows(s, model, charging, src, srcColor, unit)}
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
      <p class="mix-legend" role="group" aria-label="Odkud auto nabíjí">
        ${parts.map((source, i) => html`<span><i style="background:${colorOf(source)}"></i>${names[source]}<em>${pct[i]} %</em></span>`)}
      </p>
    </div>`;
  }

  private renderWallboxRows(s: Settings, model: FlowModel, charging: boolean, src: SourceText, srcColor: string, unit: PowerUnit): TemplateResult {
    const w = s.entities.wallbox;
    const boost = this.shown(w.boost);
    const open = !!this._open.wallbox;
    const hasDetail = !!(w.boost || w.block_charging || w.prioritize_connected);
    let boostText = NO_DATA;
    if (boost === "off") boostText = "Vypnuto";
    else if (boost === "on") boostText = charging ? `Nabíjí ${src.text}` : model.carLink === "connected" ? "Auto nenabíjí" : model.carLink === "disconnected" ? "Auto není připojeno" : NO_DATA;
    const boostOn = boost === "on";
    const boostColor = boostOn ? (charging ? srcColor : "var(--ed-warning)") : undefined;

    const wallboxSub =
      model.carLink === "charging" || charging
        ? html`nabíjí <b style="--c:${srcColor}">${formatPower(model.car ?? 0, unit)}</b>`
        : model.carLink === "connected"
          ? html`nenabíjí`
          : model.carLink === "disconnected"
            ? html`odpojeno`
            : html`${NO_DATA}`;
    return html`<ul class="group">
      <li>
        <button type="button" class="row row-btn" @click=${() => this.moreInfo(w.power)}>
          <span class="badge" aria-hidden="true" style=${charging ? `--bc:${srcColor}` : ""}><svg viewBox="0 0 24 24"><path d=${ICON.wallbox}></path></svg></span>
          <span class="row-text"><span class="row-title">Wallbox</span><span class="row-sub">${wallboxSub}</span></span>
          <span></span>
        </button>
      </li>
      <li class=${open ? "open" : ""}>
        ${hasDetail
          ? html`<button type="button" class="row row-btn" aria-expanded=${open ? "true" : "false"} @click=${() => this.toggle("wallbox")}>
              <span class="badge" aria-hidden="true" style=${boostOn ? "--bc:var(--ed-warning)" : ""}><svg viewBox="0 0 24 24"><path d=${ICON.bolt}></path></svg></span>
              <span class="row-text"><span class="row-title">Boost</span><span class="row-sub ${boostColor ? "accent" : ""}" style=${boostColor ? `--c:${boostColor}` : ""}>${boostText}</span></span>
              <svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d=${ICON.chevron}></path></svg>
            </button>
            <div class="fold ${open ? "open" : ""}" ?inert=${!open}><div>${this.renderWallboxDetail(s)}</div></div>`
          : nothing}
      </li>
    </ul>`;
  }

  private renderWallboxDetail(s: Settings): TemplateResult {
    const w = s.entities.wallbox;
    const options: SegmentOption[] = [{ value: "off", label: "Přetoky" }, { value: "on", label: "Boost" }];
    return html`<div class="detail">
      ${w.boost ? this.segmented("Režim nabíjení auta", options, this.shown(w.boost), w.boost, (value) => this.setBoost("wallbox", value === "on")) : nothing}
      ${this.shown(w.boost) === "on" ? this.renderPower(s) : nothing}
      ${w.block_charging ? this.switchRow("Zablokovat nabíjení", w.block_charging, "bojler má přednost") : nothing}
      ${w.prioritize_connected ? this.switchRow("Přednost před bojlerem", w.prioritize_connected, "dokud je auto připojené") : nothing}
    </div>`;
  }

  /** Charging power in boost: the card shows the total of all phases, the entity holds the power of one phase. */
  private renderPower(s: Settings): TemplateResult | typeof nothing {
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
    return html`<div class="field">
      <span class="field-label">Nabíjecí výkon</span><span class="field-value">${total === undefined ? NO_DATA : `${formatNumber(total, 1)} kW`}</span>
      <ed-slider
        .min=${min} .max=${max} .step=${power_step / 1000} .value=${total ?? min}
        label="Nabíjecí výkon wallboxu" valueText=${total === undefined ? "bez dat" : `${formatNumber(total, 1)} kW`}
        minLabel="${formatNumber(min, 1)} kW" maxLabel="${formatNumber(max, 1)} kW"
        ?disabled=${total === undefined}
        @ed-change=${(event: CustomEvent<{ value: number }>) => this.setNumber(id, Math.round((event.detail.value * 1000) / phases), "Nabíjecí výkon")}
      ></ed-slider>
    </div>`;
  }

  // ----------------------------------------------------------------- water

  private renderWater(s: Settings, model: FlowModel): TemplateResult {
    const e = s.entities;
    const nb = s.num.boiler;
    const flows = s.num.flows;
    const idle = flows.idle_threshold;
    const heating = (model.boil ?? 0) > idle;
    const src = sourceText(model.share, flows);
    const srcColor = this.sourceColor(src);
    const boost = this.shown(e.boiler.boost) === "on";
    const flowTarget = readNumber(this.hass, e.boiler.target_temperature);
    const boostTarget = readNumber(this.hass, e.boiler.boost_target_temperature);
    const target = boost ? boostTarget : flowTarget;
    const t = model.boilTemp;
    const span = nb.schema_max - nb.scale_min;
    const level = (value: number) => clamp(Math.round(((value - nb.scale_min) / span) * 100), 8, 95);
    const waterColor = t === undefined ? "var(--ed-off)" : heating && src.deviation ? "var(--ed-warning)" : t >= nb.hot_from ? "var(--ed-warning)" : t >= nb.cold_below ? "var(--ed-off)" : "var(--ed-cold)";
    const unit = powerUnit([model.boil], flows.kw_from);

    let stateText: string | undefined;
    if (heating) stateText = `Bojler ohřívá ${src.text}`;
    else if (model.boil !== undefined) stateText = "Bez ohřevu";

    const mix = mixingState(this.hass, e.mixing);
    const heater = entityState(this.hass, e.tank.water_heater);
    const tankMode = this.shown(e.tank.water_heater);
    const tankSet = attribute(heater, "temperature");

    return html`<section class="panel" aria-labelledby="h-water">
      <div class="head"><h2 id="h-water">${s.titles.water}</h2>${this.stateLine(stateText, heating ? srcColor : undefined)}</div>
      <div class="water">
        <div class="tank-col">
          <div class="tank" role="img" aria-label="Bojler ${t === undefined ? "bez dat" : `${formatNumber(t)} °C`}${target === undefined ? "" : `, cíl ${formatNumber(target)} °C`}">
            ${t === undefined
              ? nothing
              : html`<div class="tank-water" style="height:${level(t)}%;background:color-mix(in srgb, ${waterColor} 38%, transparent);border-top-color:${waterColor}"></div>`}
            ${target === undefined ? nothing : html`<div class="tank-target" style="top:${100 - clamp(((target - nb.scale_min) / span) * 100, 0, 100)}%"></div>`}
            <div class="tank-temp">${t === undefined ? NO_DATA : formatNumber(t)}<small>${t === undefined ? "" : "°C"}</small></div>
          </div>
          <div class="tank-caption"><b>Bojler (FVE)</b><span class=${heating ? "src" : ""} style="--c:${srcColor}">ohřev ${model.boil === undefined ? NO_DATA : formatPower(model.boil, unit)}</span></div>
        </div>
        ${this.renderMixingArrows(mix)}
        <div class="tank-col">
          <div class="tank" role="img" aria-label="Zásobník, ${tankSet === undefined ? "nastavení bez dat" : `nastaveno ${formatNumber(tankSet)} °C`}, naměřená teplota není">
            ${tankSet === undefined || tankMode === "off"
              ? nothing
              : html`<div class="tank-water" style="height:${level(tankSet)}%;background:color-mix(in srgb, var(--ed-warning) 38%, transparent);border-top:2px dashed var(--ed-warning)"></div>`}
            <div class="tank-temp top">${tankSet === undefined ? NO_DATA : formatNumber(tankSet)}<small>${tankSet === undefined ? "" : "°C"}</small></div>
          </div>
          <div class="tank-caption"><b>Zásobník (plyn)</b><span>${tankMode === "off" ? "vypnuto" : "nastaveno"}</span></div>
        </div>
      </div>
      ${this.renderWaterRows(s, model, heating, src, srcColor, tankSet, tankMode, mix)}
    </section>`;
  }

  /** Arrows of the mixing: both ways while it is on (solid white), dashed grey otherwise. */
  private renderMixingArrows(mix: Mixing): TemplateResult {
    const on = mix === "on";
    const text = mix === "on" ? "zapnuto" : mix === "off" ? "vypnuto" : mix === "unclear" ? "nejasné" : NO_DATA;
    return html`<svg class="mixing" viewBox="0 0 121 132" aria-hidden="true">
      <g fill="none" stroke=${on ? "var(--ed-text)" : "var(--ed-off)"} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray=${on ? "none" : "3 3"}>
        <path d="M8 40 H112"></path><path d="M113 96 H9"></path>
      </g>
      <g fill="none" stroke=${on ? "var(--ed-text)" : "var(--ed-off)"} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M104 32 L113 40 L104 48"></path><path d="M17 88 L8 96 L17 104"></path>
      </g>
      <text x="60.5" y="70" text-anchor="middle" font-size="13">mísení</text>
      <text x="60.5" y="88" text-anchor="middle" font-size="15" font-weight="500" style=${on ? "fill:var(--ed-text)" : ""}>${text}</text>
    </svg>`;
  }

  private renderWaterRows(s: Settings, model: FlowModel, heating: boolean, src: SourceText, srcColor: string, tankSet: number | undefined, tankMode: string | undefined, mix: Mixing): TemplateResult {
    const e = s.entities;
    const b = e.boiler;
    const boost = this.shown(b.boost);
    const boostOn = boost === "on";
    let boostText = NO_DATA;
    if (boost === "off") boostText = "Vypnuto";
    else if (boostOn) boostText = heating ? `Hřeje ${src.text}` : "Nehřeje";
    const boostColor = boostOn ? (heating ? srcColor : "var(--ed-warning)") : undefined;
    const tankDetail = !!(e.tank.water_heater || (e.mixing.script && (e.mixing.valve_c1 || e.mixing.valve_c2)));
    const boilerDetail = !!(b.boost || b.target_temperature || b.boost_target_temperature);
    const tankOpen = !!this._open.tank;
    const boilerOpen = !!this._open.boiler;
    return html`<ul class="group">
      <li class=${tankOpen ? "open" : ""}>
        <button type="button" class="row row-btn" aria-expanded=${tankOpen ? "true" : "false"} ?disabled=${!tankDetail} @click=${() => this.toggle("tank")}>
          <span class="badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d=${ICON.waterTemp}></path></svg></span>
          <span class="row-text">
            <span class="row-title">Zásobník (plyn)</span>
            <span class="row-sub">${tankSet === undefined && tankMode === undefined ? NO_DATA : html`nastaveno <b>${tankSet === undefined ? NO_DATA : `${formatNumber(tankSet)} °C`}</b>${tankMode === undefined ? nothing : ` · režim ${TANK_MODE_TEXT[tankMode] ?? tankMode}`}`}</span>
          </span>
          ${tankDetail ? html`<svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d=${ICON.chevron}></path></svg>` : html`<span></span>`}
        </button>
        ${tankDetail ? html`<div class="fold ${tankOpen ? "open" : ""}" ?inert=${!tankOpen}><div>${this.renderTankDetail(s, mix)}</div></div>` : nothing}
      </li>
      <li class=${boilerOpen ? "open" : ""}>
        <button type="button" class="row row-btn" aria-expanded=${boilerOpen ? "true" : "false"} ?disabled=${!boilerDetail} @click=${() => this.toggle("boiler")}>
          <span class="badge" aria-hidden="true" style=${boostOn ? "--bc:var(--ed-warning)" : ""}><svg viewBox="0 0 24 24"><path d=${ICON.bolt}></path></svg></span>
          <span class="row-text"><span class="row-title">Boost bojleru</span><span class="row-sub ${boostColor ? "accent" : ""}" style=${boostColor ? `--c:${boostColor}` : ""}>${boostText}</span></span>
          ${boilerDetail ? html`<svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d=${ICON.chevron}></path></svg>` : html`<span></span>`}
        </button>
        ${boilerDetail ? html`<div class="fold ${boilerOpen ? "open" : ""}" ?inert=${!boilerOpen}><div>${this.renderBoilerDetail(s)}</div></div>` : nothing}
      </li>
    </ul>`;
  }

  private renderBoilerDetail(s: Settings): TemplateResult {
    const b = s.entities.boiler;
    const nb = s.num.boiler;
    const boost = this.shown(b.boost) === "on";
    const flowTarget = readNumber(this.hass, b.target_temperature);
    const boostTarget = readNumber(this.hass, b.boost_target_temperature);
    const options: SegmentOption[] = [
      { value: "off", label: "Přetoky", detail: flowTarget === undefined ? undefined : `${formatNumber(flowTarget)} °C` },
      { value: "on", label: "Boost", detail: boostTarget === undefined ? undefined : `${formatNumber(boostTarget)} °C` },
    ];
    const id = boost ? b.boost_target_temperature : b.target_temperature;
    const entity = entityState(this.hass, id);
    const value = boost ? boostTarget : flowTarget;
    let min = nb.target_min;
    let max = nb.target_max;
    const entityMin = attribute(entity, "min");
    const entityMax = attribute(entity, "max");
    if (entityMin !== undefined) min = Math.max(min, entityMin);
    if (entityMax !== undefined) max = Math.min(max, entityMax);
    // The flow target may never be below the boost target (CURRENT_SPEC.md, Cíle ohřevu bojleru).
    if (boost && flowTarget !== undefined) max = Math.min(max, flowTarget);
    if (!boost && boostTarget !== undefined) min = Math.max(min, boostTarget);
    const kind = boost ? "boost" : "přetoky";
    return html`<div class="detail">
      ${b.boost ? this.segmented("Režim ohřevu bojleru a jeho cílová teplota", options, boost ? "on" : this.shown(b.boost) === undefined ? "" : "off", b.boost, (v) => this.setBoost("boiler", v === "on")) : nothing}
      ${id
        ? html`<div class="field">
            <span class="field-label">Cíl ohřevu (${kind})</span><span class="field-value">${value === undefined ? NO_DATA : `${formatNumber(value)} °C`}</span>
            <ed-slider
              .min=${min} .max=${max} .step=${nb.target_step} .value=${value ?? min}
              label="Cíl ohřevu bojleru, ${kind}" valueText=${value === undefined ? "bez dat" : `${value} °C`}
              minLabel="${formatNumber(min)} °C" maxLabel="${formatNumber(max)} °C"
              ?disabled=${value === undefined}
              @ed-change=${(event: CustomEvent<{ value: number }>) => this.setNumber(id, event.detail.value, "Cíl ohřevu bojleru")}
            ></ed-slider>
          </div>`
        : nothing}
    </div>`;
  }

  private renderTankDetail(s: Settings, mix: Mixing): TemplateResult {
    const e = s.entities;
    const nt = s.num.tank;
    const id = e.tank.water_heater;
    const entity = entityState(this.hass, id);
    const mode = this.shown(id);
    const list = Array.isArray(entity?.attributes?.operation_list) ? (entity!.attributes.operation_list as string[]) : Object.keys(TANK_MODES);
    const options: SegmentOption[] = Object.keys(TANK_MODES).filter((value) => list.includes(value)).map((value) => ({ value, label: TANK_MODES[value] }));
    const temp = attribute(entity, "temperature");
    const manual = mode === "heat";
    const min = Math.max(nt.temp_min, attribute(entity, "min_temp") ?? nt.temp_min);
    const max = Math.min(nt.temp_max, attribute(entity, "max_temp") ?? nt.temp_max);
    const canMix = !!(e.mixing.script && e.mixing.valve_c1 && e.mixing.valve_c2);
    return html`<div class="detail">
      ${id ? this.segmented("Režim zásobníku", options, mode, id, (value) => this.setTank(id, value)) : nothing}
      ${id
        ? html`<div class="fold ${manual ? "open" : ""}" ?inert=${!manual}>
            <div>
              <div class="field">
                <span class="field-label">Teplota</span><span class="field-value">${temp === undefined ? NO_DATA : `${formatNumber(temp)} °C`}</span>
                <ed-slider
                  .min=${min} .max=${max} .step=${nt.temp_step} .value=${temp ?? min}
                  label="Teplota zásobníku" valueText=${temp === undefined ? "bez dat" : `${temp} °C`}
                  minLabel="${formatNumber(min)} °C" maxLabel="${formatNumber(max)} °C"
                  ?disabled=${temp === undefined}
                  @ed-change=${(event: CustomEvent<{ value: number }>) => this.setTankTemperature(id, event.detail.value)}
                ></ed-slider>
              </div>
            </div>
          </div>`
        : nothing}
      ${canMix ? this.renderMixingControl(mix) : nothing}
    </div>`;
  }

  /** Mixing is switched by a script that toggles the valves, so the card asks first (CURRENT_SPEC.md, Mísení vody). */
  private renderMixingControl(mix: Mixing): TemplateResult {
    const options: SegmentOption[] = [{ value: "off", label: "Vypnuto" }, { value: "on", label: "Zapnuto" }];
    const known = mix === "on" || mix === "off";
    const target = this._confirmMix;
    return html`<div class="field">
      <span class="field-label">Mísení vody</span><span class="hint">${mix === undefined ? NO_DATA : mix === "unclear" ? "stav ventilů je nejasný" : ""}</span>
      <ed-segmented
        style="grid-column:1 / -1;margin-top:6px"
        .options=${options} .value=${known ? mix : ""} label="Mísení vody" ?disabled=${!known}
        @ed-select=${(event: CustomEvent<{ value: string }>) => {
          this._confirmMix = event.detail.value === mix ? undefined : (event.detail.value as "on" | "off");
        }}
      ></ed-segmented>
      ${target && known
        ? html`<div class="confirm" role="alertdialog" aria-label="Potvrzení přepnutí mísení" style="grid-column:1 / -1;margin-top:10px">
            <span>Přepnout mísení vody na ${target === "on" ? "zapnuto" : "vypnuto"}?</span>
            <div class="buttons">
              <button type="button" class="btn" @click=${() => { this._confirmMix = undefined; }}>Zrušit</button>
              <button type="button" class="btn primary" @click=${() => this.setMixing(target, mix!)}>Přepnout</button>
            </div>
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

  private segmented(label: string, options: SegmentOption[], value: string | undefined, id: string, onSelect: (value: string) => void): TemplateResult {
    const noData = readText(this.hass, id) === undefined && this._optimistic[id] === undefined;
    return html`<ed-segmented
      .options=${options} .value=${value ?? ""} label=${label} ?disabled=${noData}
      @ed-select=${(event: CustomEvent<{ value: string }>) => onSelect(event.detail.value)}
    ></ed-segmented>`;
  }

  private switchRow(title: string, id: string, hint: string): TemplateResult {
    const value = this.shown(id);
    return html`<div class="switch-row">
      <span class="switch-text"><span class="switch-title">${title}</span><span class="hint">${value === undefined ? NO_DATA : hint}</span></span>
      <ed-switch
        label=${title} .checked=${value === "on"} ?disabled=${value === undefined}
        @ed-toggle=${(event: CustomEvent<{ checked: boolean }>) => this.setSwitch(id, event.detail.checked, title)}
      ></ed-switch>
    </div>`;
  }

  // ---------------------------------------------------------------- actions

  private moreInfo(entityId: string | undefined): void {
    if (!entityId) return;
    this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true }));
  }

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
    await this.call("water_heater", "set_operation_mode", { entity_id: id, operation_mode: mode }, id, "Režim zásobníku");
  }

  private async setTankTemperature(id: string, temperature: number): Promise<void> {
    this._feedback = "";
    await this.call("water_heater", "set_temperature", { entity_id: id, temperature }, id, "Teplota zásobníku");
  }

  /** The script toggles the valves, so it is called only when the wanted state differs from the real one. */
  private async setMixing(wanted: "on" | "off", current: Mixing): Promise<void> {
    const script = this._config!.entities.mixing.script;
    this._confirmMix = undefined;
    if (!script || wanted === current) return;
    this._feedback = "";
    await this.call("script", "turn_on", { entity_id: script }, script, "Mísení vody");
  }
}
