import { LitElement, html, nothing, svg } from "lit";
import { property, state } from "lit/decorators.js";
import type { PropertyValues, TemplateResult } from "lit";
import { normalizeConfig } from "./config";
import { EPS, SINKS, SOURCES, buildModel } from "./model";
import type { FlowModel, Sink, Source } from "./model";
import { bands, layout } from "./sankey";
import { styles } from "./styles";
import type { DashboardConfig, EntityId, HomeAssistant, Settings } from "./types";
import { entityState, formatNumber, formatPower, powerUnit, readNumber, readText } from "./utils";
import type { PowerUnit } from "./utils";
import type { SegmentOption } from "./ed-segmented";
import { ICON } from "./icons";

/** Shown for every value without data (CURRENT_SPEC.md, Chybějící a zastaralá data). */
const NO_DATA = "––";
const COLOR: Record<Source | Sink, string> = {
  sun: "--ed-sun", bat: "--ed-bat", grid: "--ed-grid",
  house: "--ed-home", car: "--ed-car", boil: "--ed-boil", batIn: "--ed-bat", gridOut: "--ed-grid",
};

interface Tile {
  side: "L" | "R";
  key: Source | Sink;
  name: string;
  watts?: number;
  /** Rating of the power 0–1: the stronger the flow, the stronger the tint and glow. */
  k: number;
  icon: string;
  /** Second path inside the icon (arrow in the battery). */
  icon2?: string;
  idleIcon: string;
  idleText: string;
  entity?: EntityId;
}

const WALLBOX_TEXT: Record<string, string> = { Disconnected: "Odpojeno", Waiting: "Připojeno, nenabíjí", Charging: "Nabíjí" };

/*
 * Energie card: the Sankey diagram of the energy flows (sources left, consumers right, bands in
 * the colour of the source), three gauges and the controls. Styled like Home Assistant: ha-card,
 * the theme's colours and font, mdi icons; only the sliders and choices are iOS 27 style.
 */
export class HaEnergieDashboard extends LitElement {
  static styles = styles;

  @state() private _config?: Settings;
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _width = 329;
  /** A chosen value shown at once until Home Assistant reports it (entity → value). */
  @state() private _optimistic: Record<string, string> = {};
  @state() private _feedback = "";

  private _observer?: ResizeObserver;
  private _timers = new Map<string, number>();

  setConfig(config: DashboardConfig): void {
    this._config = normalizeConfig(config);
  }

  getCardSize(): number {
    return 9;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._observer?.disconnect();
    this._observer = undefined;
    this._timers.forEach((timer) => window.clearTimeout(timer));
    this._timers.clear();
  }

  protected willUpdate(): void {
    // Home Assistant's light theme: the card darkens its source-coloured text (4.5 : 1 on white).
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
    const config = this._config;
    if (!config) return nothing;
    const model = buildModel(this.hass, config);
    return html`
      <ha-card>
        <div class="dashboard">
          ${this.renderHeader(config, model)} ${this.renderNotice(config, model)} ${this.renderFlow(model)}
          ${this.renderGauges(model)} ${this.renderControls(config)}
          <p class="feedback" aria-live="polite">${this._feedback}</p>
        </div>
      </ha-card>
    `;
  }

  private renderHeader(config: Settings, model: FlowModel): TemplateResult {
    const color = model.summarySource ? `var(${COLOR[model.summarySource]})` : "var(--secondary-text-color)";
    return html`<header class="header">
      ${config.title === "" ? nothing : html`<h1>${config.title}</h1>`}
      <p class="summary" style="--sc:${color}">
        <span class="dot" aria-hidden="true"></span>${model.summary ?? html`${NO_DATA}<span class="sr-only">bez dat</span>`}
      </p>
    </header>`;
  }

  /** Notices that need attention (CURRENT_SPEC.md, Blokace a přednost wallboxu); never a poplach. */
  private renderNotice(config: Settings, model: FlowModel): TemplateResult | typeof nothing {
    const w = config.entities.wallbox;
    const blocked = readText(this.hass, w.block_charging) === "on";
    const priority = readText(this.hass, w.prioritize_connected) === "on";
    if (blocked) {
      return html`<div class="notice" role="status"><svg class="n-icon" viewBox="0 0 24 24" aria-hidden="true"><path d=${ICON.lock}></path></svg><span>Nabíjení auta je zablokované.</span></div>`;
    }
    if (priority && model.carLink === "connected" && (model.sun ?? 0) > 200) {
      return html`<div class="notice warn" role="status">
        <svg class="n-icon" viewBox="0 0 24 24" aria-hidden="true"><path d=${ICON.alert}></path></svg>
        <span>Auto je připojené, ale nenabíjí. Přednost před bojlerem je zapnutá, ale slunce zřejmě nestačí na rozjezd wallboxu.</span>
      </div>`;
    }
    return nothing;
  }

  private tiles(model: FlowModel, config: Settings): Tile[] {
    const e = config.entities;
    const link = model.carLink;
    return [
      { side: "L", key: "sun", name: "Slunce", watts: model.sun, k: (model.sun ?? 0) / 10000, icon: ICON.sun, idleIcon: ICON.moon, idleText: "nevyrábí", entity: e.pv.power },
      { side: "L", key: "bat", name: "Baterie", watts: model.batDis, k: (model.batDis ?? 0) / 5000, icon: ICON.battery, icon2: ICON.batteryDown, idleIcon: ICON.pause, idleText: "nevybíjí", entity: e.battery.power },
      { side: "L", key: "grid", name: "Síť", watts: model.imp, k: (model.imp ?? 0) / 10000, icon: ICON.grid, idleIcon: ICON.minus, idleText: "neodebírá", entity: e.grid.power },
      { side: "R", key: "house", name: "Dům", watts: model.other, k: (model.other ?? 0) / 10000, icon: ICON.home, idleIcon: ICON.minus, idleText: "bez odběru", entity: e.house.power },
      {
        side: "R", key: "car", name: "Auto", watts: link === undefined && model.car === undefined ? undefined : model.car ?? 0, k: (model.car ?? 0) / 11100,
        icon: ICON.car, idleIcon: link === "disconnected" ? ICON.minus : ICON.plug,
        idleText: link === "disconnected" ? "odpojeno" : link === undefined ? "bez stavu" : "připojeno", entity: e.wallbox.power,
      },
      { side: "R", key: "boil", name: "Bojler", watts: model.boil, k: (model.boil ?? 0) / 4000, icon: ICON.therm, idleIcon: ICON.pause, idleText: "vypnuto", entity: e.boiler.power },
      { side: "R", key: "batIn", name: "Do baterie", watts: model.batIn, k: (model.batIn ?? 0) / 5000, icon: ICON.battery, icon2: ICON.batteryBolt, idleIcon: ICON.pause, idleText: "nenabíjí", entity: e.battery.power },
      { side: "R", key: "gridOut", name: "Do sítě", watts: model.exp, k: (model.exp ?? 0) / 10000, icon: ICON.grid, idleIcon: ICON.minus, idleText: "nedodává", entity: e.grid.power },
    ];
  }

  private renderFlow(model: FlowModel): TemplateResult {
    const config = this._config!;
    const lay = layout(this._width);
    const band = bands(model.flows, lay);
    const unit: PowerUnit = powerUnit([model.sun, model.batDis, model.batIn, model.imp, model.exp, model.other, model.car, model.boil]);
    const stops = (source: Source) =>
      svg`<linearGradient id="rg-${source}" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" style="stop-color:var(${COLOR[source]});stop-opacity:0.2"></stop>
        <stop offset="0.14" style="stop-color:var(${COLOR[source]});stop-opacity:0.88"></stop>
        <stop offset="0.86" style="stop-color:var(${COLOR[source]});stop-opacity:0.88"></stop>
        <stop offset="1" style="stop-color:var(${COLOR[source]});stop-opacity:0.2"></stop>
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
      ${this.tiles(model, config).map((tile) => this.renderTile(tile, lay, unit, model))}
    </div>`;
  }

  private renderTile(tile: Tile, lay: ReturnType<typeof layout>, unit: PowerUnit, model: FlowModel): TemplateResult {
    const noData = tile.watts === undefined;
    const on = !noData && tile.watts! > EPS;
    const left = tile.side === "L" ? 0 : lay.width - lay.tile.w;
    const centre = tile.side === "L" ? lay.left[tile.key as Source] : lay.right[tile.key as Sink];
    const k = Math.max(0, Math.min(1, tile.k));
    const value = noData ? NO_DATA : formatPower(tile.watts!, unit);
    const spoken = noData ? "bez dat" : on ? value : tile.idleText;
    let style = `left:${left}px;top:${(centre - lay.tile.h / 2).toFixed(1)}px;width:${lay.tile.w}px;height:${lay.tile.h}px;--tc:var(${COLOR[tile.key]});--tint:${on ? Math.round(24 + 12 * k) : 0}%;--gr:${(2 + 9 * k).toFixed(1)}px;--ga:${Math.round(30 + 60 * k)}%`;
    if (tile.key === "house" && on) {
      const parts = SOURCES.filter((source) => model.share[source] >= 0.02);
      let at = 0;
      const stopsCss = parts.map((source) => {
        const mid = (at + model.share[source] / 2) * 100;
        at += model.share[source];
        return `color-mix(in srgb, var(${COLOR[source]}) 42%, transparent) ${mid.toFixed(0)}%`;
      });
      if (stopsCss.length) style += `;--house-bg:linear-gradient(135deg, ${stopsCss.length === 1 ? `${stopsCss[0]}, ${stopsCss[0]}` : stopsCss.join(", ")})`;
    }
    return html`<button
      type="button"
      class="tile ${on ? "on" : "idle"} ${tile.key === "house" ? "house" : ""}"
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

  private renderGauges(model: FlowModel): TemplateResult {
    const pct = (value: number | undefined) => (value === undefined ? undefined : Math.max(0, Math.min(100, value)));
    const items = [
      { label: "Baterie", text: model.soc === undefined ? NO_DATA : `${formatNumber(model.soc)} %`, fill: pct(model.soc), color: (model.soc ?? 100) <= 20 ? "var(--warning-color, #ff9800)" : "var(--ed-bat)", tick: 20 },
      { label: "Auto → 80 %", text: model.carSoc === undefined ? NO_DATA : `${formatNumber(model.carSoc)} %`, fill: pct(model.carSoc), color: "var(--ed-car)", tick: 80 },
      { label: "Bojler", text: model.boilTemp === undefined ? NO_DATA : `${formatNumber(model.boilTemp)} °C`, fill: model.boilTemp === undefined ? undefined : pct(((model.boilTemp - 10) / 50) * 100), color: "var(--ed-boil)", tick: undefined },
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

  // --------------------------------------------------------------- controls

  /** The state shown: a just chosen value, until Home Assistant reports it. */
  private shown(id: string | undefined): string | undefined {
    if (!id) return undefined;
    return this._optimistic[id] ?? readText(this.hass, id);
  }

  private renderControls(config: Settings): TemplateResult | typeof nothing {
    const e = config.entities;
    const parts = [this.renderWallbox(e), this.renderBoiler(e), this.renderTank(e)].filter((part) => part !== nothing);
    if (!parts.length) return nothing;
    return html`<section class="controls" aria-labelledby="h-ctl"><h2 id="h-ctl">Ovládání</h2>${parts}</section>`;
  }

  private renderWallbox(e: Settings["entities"]): TemplateResult | typeof nothing {
    const w = e.wallbox;
    if (!w.boost && !w.block_charging && !w.prioritize_connected) return nothing;
    const status = readText(this.hass, w.status);
    const options: SegmentOption[] = [{ value: "off", label: "Přetoky" }, { value: "on", label: "Boost" }];
    return html`<div class="ctl">
      <div class="ctl-head"><span class="ctl-title">Nabíjení auta</span><span class="ctl-state">${status ? WALLBOX_TEXT[status] ?? status : NO_DATA}</span></div>
      ${w.boost ? this.segmented("Režim nabíjení auta", options, this.shown(w.boost), w.boost, (value) => this.setBoost("wallbox", value === "on")) : nothing}
      ${w.block_charging ? this.switchRow("Zablokovat nabíjení", w.block_charging, "bojler má přednost") : nothing}
      ${w.prioritize_connected ? this.switchRow("Přednost před bojlerem", w.prioritize_connected, "dokud je auto připojené") : nothing}
    </div>`;
  }

  private renderBoiler(e: Settings["entities"]): TemplateResult | typeof nothing {
    const b = e.boiler;
    if (!b.boost && !b.target_temperature && !b.boost_target_temperature) return nothing;
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
    let min = Number(entity?.attributes?.min ?? 20);
    let max = Number(entity?.attributes?.max ?? 85);
    // The flow target may never be below the boost target (CURRENT_SPEC.md, Cíle ohřevu bojleru).
    if (boost && flowTarget !== undefined) max = Math.min(max, flowTarget);
    if (!boost && boostTarget !== undefined) min = Math.max(min, boostTarget);
    return html`<div class="ctl">
      <div class="ctl-head"><span class="ctl-title">Bojler</span><span class="ctl-state">${boost ? "boost" : "z přebytku"}</span></div>
      ${b.boost ? this.segmented("Režim ohřevu bojleru a jeho cílová teplota", options, boost ? "on" : this.shown(b.boost) === undefined ? "" : "off", b.boost, (v) => this.setBoost("boiler", v === "on")) : nothing}
      ${id
        ? html`<div class="slider-row">
            <span class="slider-label">Cíl ohřevu (${boost ? "boost" : "přetoky"})</span><span class="slider-value">${value === undefined ? NO_DATA : `${formatNumber(value)} °C`}</span>
            <ed-slider
              .min=${min} .max=${max} .step=${Number(entity?.attributes?.step ?? 5)} .value=${value ?? min}
              label="Cíl ohřevu bojleru, ${boost ? "boost" : "přetoky"}" valueText=${value === undefined ? "bez dat" : `${value} °C`}
              ?disabled=${value === undefined}
              @ed-change=${(event: CustomEvent<{ value: number }>) => this.setNumber(id, event.detail.value, "Cíl ohřevu bojleru")}
            ></ed-slider>
          </div>`
        : nothing}
    </div>`;
  }

  private renderTank(e: Settings["entities"]): TemplateResult | typeof nothing {
    const id = e.tank.water_heater;
    if (!id) return nothing;
    const entity = entityState(this.hass, id);
    const mode = this.shown(id);
    const modes: Record<string, string> = { auto: "Auto", heat: "Manual", off: "Off" };
    const list = Array.isArray(entity?.attributes?.operation_list) ? (entity!.attributes.operation_list as string[]) : Object.keys(modes);
    const options: SegmentOption[] = Object.keys(modes).filter((value) => list.includes(value)).map((value) => ({ value, label: modes[value] }));
    const temp = Number(entity?.attributes?.temperature);
    const hasTemp = Number.isFinite(temp);
    const manual = mode === "heat";
    return html`<div class="ctl">
      <div class="ctl-head"><span class="ctl-title">Zásobník</span><span class="ctl-state">${mode === undefined ? NO_DATA : `režim ${modes[mode] ?? mode}`}</span></div>
      ${this.segmented("Režim zásobníku", options, mode, id, (value) => this.setTank(id, value))}
      <div class="slider-row">
        <span class="slider-label">Teplota</span><span class="slider-value ${mode === "off" || !hasTemp ? "dim" : ""}">${hasTemp ? `${formatNumber(temp)} °C` : NO_DATA}</span>
        <div class="fold ${manual ? "open" : ""}" ?inert=${!manual}>
          <div>
            <ed-slider
              .min=${Number(entity?.attributes?.min_temp ?? 30)} .max=${Number(entity?.attributes?.max_temp ?? 65)} .step=${5} .value=${hasTemp ? temp : 40}
              label="Teplota zásobníku" valueText=${hasTemp ? `${temp} °C` : "bez dat"}
              @ed-change=${(event: CustomEvent<{ value: number }>) => this.setTankTemperature(id, event.detail.value)}
            ></ed-slider>
          </div>
        </div>
      </div>
    </div>`;
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
      <span class="switch-text"><span>${title}</span><span class="hint">${value === undefined ? NO_DATA : hint}</span></span>
      <ha-switch
        aria-label=${title} .checked=${value === "on"} ?disabled=${value === undefined}
        @change=${(event: Event) => this.setSwitch(id, (event.target as HTMLInputElement).checked, title)}
      ></ha-switch>
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
    // If Home Assistant never reports it, fall back to the real state after a few seconds.
    this._timers.set(id, window.setTimeout(() => {
      const next = { ...this._optimistic };
      delete next[id];
      this._optimistic = next;
    }, 6000));
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
}
