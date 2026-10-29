/* The state, the lifecycle and the helpers every part of the card shares (the parts are the mixins of the other files). */
import { html, nothing } from "lit";
import type { PropertyValues, TemplateResult } from "lit";
import { normalizeConfig } from "./config";
import { isOn } from "./model";
import type { FlowModel, SourceText } from "./model";
import type { DashboardConfig, HomeAssistant, Settings } from "./types";
import { entityState, readNumber, useFormat } from "./utils";
import { cardLanguage, getI18n } from "./i18n";
import type { I18n, Texts } from "./i18n";
import type { SegmentOption } from "ha-dashboard-kit/controls";
import { LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { HEATING_KEY, NO_DATA, SOURCE_VAR, attribute } from "./view";
import type { Panel, TileKey } from "./view";

export class CardBase extends LitElement {
  @state() _config?: Settings;
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() _width = 329;
  /** A chosen value shown at once until Home Assistant reports it (entity → value). */
  @state() _optimistic: Record<string, string> = {};
  @state() _feedback = "";
  @state() _open: Partial<Record<Panel, boolean>> = {};
  /** The tile whose popup is open, and the big popup of the heading. */
  @state() _pop?: TileKey;
  @state() _all = false;
  /** Room the Elektřina panel adds above and below the diagram so that an open popup is not cut off. */
  @state() _now = Date.now();
  @state() _carHint = false;
  /** Texts and number formats of the card language (CURRENT_SPEC.md, Jazyky); set in willUpdate. */
  _i18n: I18n = getI18n("cs");
  /** A temperature of the tank just chosen, shown until Home Assistant reports it. */
  @state() _tankTemp?: { id: string; value: number };

  _observer?: ResizeObserver;
  _timers = new Map<string, number>();
  _clock?: number;
  /** When the boiler last heated (ms); 0 = not known. */
  _lastHeating = 0;
  _storedHeating = 0;

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

  /** The texts of the card language. */
  get t(): Texts {
    return this._i18n.t;
  }

  get boostOptions(): SegmentOption[] {
    return [{ value: "off", label: this.t.boostOptions.off }, { value: "on", label: this.t.boostOptions.on }];
  }

  willUpdate(): void {
    // The card language; `lang` on the host tells screen readers which voice to use, also when
    // the card falls back to English in a Home Assistant in another language.
    this._i18n = getI18n(cardLanguage(this._config?.language ?? "auto", this.hass), this.hass);
    useFormat(this._i18n, this._config?.powerDecimals);
    if (this.lang !== this._i18n.language) this.lang = this._i18n.language;
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

  updated(changed: PropertyValues): void {
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

  /** The colour of a source text: the grid beyond its share is a deviation (orange). */
  sourceColor(text: SourceText): string {
    return text.deviation ? "var(--ed-warning)" : `var(${SOURCE_VAR[text.main]})`;
  }

  stateLine(text: string | undefined, color: string | undefined): TemplateResult {
    return html`<p class="state" style="--sc:${color ?? "var(--ed-secondary)"}">
      <span class="dot" aria-hidden="true"></span>${text ?? html`${NO_DATA}<span class="sr-only">${this.t.noData}</span>`}
    </p>`;
  }

  carVisible(s: Settings, model: FlowModel): boolean {
    // Hidden only when the car is known to be disconnected and the wallbox delivers nothing.
    return !(model.carLink === "disconnected" && !isOn(model.car, s.num.flows.idle_threshold));
  }

  boilerVisible(s: Settings, model: FlowModel): boolean {
    if (s.boilerShow === "always" || model.boil === undefined) return true;
    if (isOn(model.boil, s.num.flows.idle_threshold)) return true;
    return this._lastHeating > 0 && Date.now() - this._lastHeating < s.num.boiler.hold_minutes * 60000;
  }

  /** Battery reserve in %: 100 − the inverter's depth of discharge (on-grid); the configured number only when the inverter does not report it. */
  batteryReserve(s: Settings): number {
    const depth = readNumber(this.hass, s.entities.battery.depth_of_discharge);
    return depth !== undefined && depth >= 0 && depth <= 100 ? 100 - depth : s.num.battery.reserve;
  }
}
