/* The state, the lifecycle and the helpers every part of the card shares (the parts are the mixins of the other files). */
import { html } from "lit";
import type { PropertyValues, TemplateResult } from "lit";
import { normalizeConfig } from "./config";
import { isOn, SHOWN_W } from "./model";
import type { FlowModel, SourceText } from "./model";
import type { DashboardConfig, HomeAssistant, Settings } from "./types";
import { entityState, readEnergy, readNumber, useFormat } from "./utils";
import { cardLanguage, getI18n } from "./i18n";
import { pickText } from "ha-dashboard-kit/config";
import type { LocalizedText } from "ha-dashboard-kit/config";
import type { I18n, Texts } from "./i18n";
import type { SegmentOption } from "ha-dashboard-kit/controls";
import { LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { HEATING_KEY, NO_DATA, SOURCE_VAR, attribute } from "./view";
import { fitJoined, joined } from "ha-dashboard-kit/joined";
import type { BatEntry, BatRow, BatTab, Panel, SunTab, TileKey } from "./view";
import type { Range } from "./battery-data";

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
  /** The battery detail (a page of its own inside the card) and what is open in it. */
  @state() _batDetail = false;
  @state() _batTab: BatTab = "now";
  @state() _batSpan: "6h" | "24h" = "24h";
  /** The history range of the detail; undefined until the first use (then the saved choice or battery.default_range). */
  @state() _batRange?: Range;
  @state() _batOpen?: BatRow;
  /** Position (0–100) of the finger on a chart, by chart. */
  @state() _batScrub: Record<string, number> = {};
  /** A touch on a chart that is being decided: where it started (the picked bar, none while the whole period is read) and whether it moved to another bar. */
  _scrubTap?: { id: string; index?: number; moved: boolean };
  /** History by view ("trend", "day:24h", "hist:7d" …). */
  @state() _batData: Record<string, BatEntry> = {};
  /** The sun detail (a page of its own inside the card), its part, history range, chart view and the hint that is open. */
  @state() _sunDetail = false;
  @state() _sunTab: SunTab = "today";
  @state() _sunRange?: "7d" | "30d";
  @state() _sunMode: "total" | "parts" = "total";
  @state() _sunHint?: string;
  /** The daily forecast of the weather entity (condition by day), asked for when the outlook is open. */
  @state() _sunWeather?: { at: number; days: Array<{ day: number; condition?: string }> };
  /** The house detail (a page of its own inside the card), its history range, the open appliance, the loaded history by view, and the cycles of the helpers. */
  @state() _houseDetail = false;
  @state() _houseRange?: Range;
  @state() _houseOpen: string[] = [];
  @state() _houseTab: "now" | "hist" = "now";
  @state() _houseData: Record<string, BatEntry> = {};
  /** Energy of the car and of the boiler today (kWh), computed from the statistics of their power when the counters are not configured. */
  @state() _houseToday?: { at: number; car?: number; boil?: number; apps?: Record<string, number>; groups?: Record<string, number>; detail?: boolean };
  @state() _houseCycles?: { at: number; byId: Record<string, { starts: number[]; ends: number[] }> };
  /** The appliances shown in the open popup, in the order they were opened in (the rows do not jump while the popup is open). */
  _houseFrozen?: string[];
  /** The order of the rows of the open house detail (what runs first, from the largest power), decided when the detail opened. */
  _houseOrder?: string[];
  /** The order of the appliances inside each opened group of the detail (the power sensors, from the largest power), decided when the detail opened. */
  _houseMembers?: Record<number, string[]>;
  /** Texts and number formats of the card language (CURRENT_SPEC.md, Jazyky); set in willUpdate. */
  _i18n: I18n = getI18n("cs");
  /** A temperature of the tank just chosen, shown until Home Assistant reports it. */
  @state() _tankTemp?: { id: string; value: number };

  _observer?: ResizeObserver;
  _fonts = 0;
  _onFonts = (): void => {
    this._fonts++;
    this.requestUpdate();
  };
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
    // Text widths change when a web font arrives: joined texts are measured again.
    document.fonts?.addEventListener("loadingdone", this._onFonts);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._observer?.disconnect();
    this._observer = undefined;
    this._timers.forEach((timer) => window.clearTimeout(timer));
    this._timers.clear();
    window.clearInterval(this._clock);
    document.fonts?.removeEventListener("loadingdone", this._onFonts);
  }

  /** The texts of the card language. */
  /** A text of the configuration (title, name) in the language of the card: the language, its base, English, the first given. */
  pickText(value: LocalizedText | undefined): string | undefined {
    return pickText(value, this._i18n?.language ?? this.lang ?? "en");
  }

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
    if (s && isOn(readNumber(this.hass, s.entities.boiler.power), SHOWN_W)) {
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

  /** Overridden by the battery part: loads the history of what is open, and moves the focus to the detail. */
  loadBattery(): void {}
  batteryToggled(): void {}

  updated(changed: PropertyValues): void {
    super.updated(changed);
    this.loadBattery();
    if (changed.has("_batDetail")) this.batteryToggled();
    const flow = this.renderRoot.querySelector<HTMLElement>(".flow");
    if (flow && !this._observer) {
      this._observer = new ResizeObserver(() => {
        const width = Math.round(flow.getBoundingClientRect().width);
        if (width > 0 && width !== this._width) this._width = width;
      });
      this._observer.observe(flow);
    }
    this.fitJoined();
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

  /** Texts joined by a dot: one line, one part per line or one flowing text (ha-dashboard-kit/joined). */
  fitJoined(): void {
    fitJoined(this.renderRoot, `${this._width}|${this._fonts}`);
  }

  /** The colour of a source text: the grid beyond its share is a deviation (orange). */
  sourceColor(text: SourceText): string {
    return text.deviation ? "var(--ed-warning)" : `var(${SOURCE_VAR[text.main]})`;
  }

  /** The state under a panel title; parts ("Bojler ohřívá ze slunce", "Boost") are joined by a dot (ha-dashboard-kit/joined). */
  stateLine(text: string | readonly unknown[] | undefined, color: string | undefined): TemplateResult {
    return html`<p class="state ${color ? "tinted" : ""}" style="--sc:${color ?? "var(--ed-secondary)"}">
      <span class="dot" aria-hidden="true"></span>${text === undefined ? html`<span>${this.noData()}</span>` : typeof text === "string" ? html`<span>${text}</span>` : joined(text)}
    </p>`;
  }

  /** „Boost“ in the state line, orange: the one mark that Boost is on (uživatel 12. 11. 2026: „Q137 A“; CURRENT_SPEC.md, Bojler: „oranžový zůstává jen popisek stavu“). */
  boostMark(): TemplateResult {
    return html`<span class="boost-mark">${this.t.boostOptions.on}</span>`;
  }

  /** "––" in the grey of no data, read as „bez dat“ (CURRENT_SPEC.md, Chybějící a zastaralá data; DASHBOARD_UX_SYSTEM.md, Text). */
  noData(): TemplateResult {
    return html`<span class="nodata">${NO_DATA}<span class="sr-only">${this.t.noData}</span></span>`;
  }

  carVisible(s: Settings, model: FlowModel): boolean {
    // Hidden only when the car is known to be disconnected and the wallbox delivers nothing.
    return !(model.carLink === "disconnected" && !isOn(model.car, SHOWN_W));
  }

  boilerVisible(s: Settings, model: FlowModel): boolean {
    if (s.boilerShow === "always" || model.boil === undefined) return true;
    if (isOn(model.boil, SHOWN_W)) return true;
    return this._lastHeating > 0 && Date.now() - this._lastHeating < s.num.boiler.hold_minutes * 60000;
  }

  /** Energy of today in kWh from the counters of the configuration; undefined = no data. */
  today(s: Settings) {
    const d = s.entities.daily;
    const read = (id: string | undefined) => readEnergy(this.hass, id);
    const v = {
      pv: read(d.pv_generation), bchg: read(d.battery_charge), bdis: read(d.battery_discharge),
      gin: read(d.grid_import), gout: read(d.grid_export), car: read(d.car) ?? this._houseToday?.car, boil: read(d.boiler) ?? this._houseToday?.boil,
    };
    const all = [v.pv, v.gin, v.bdis, v.gout, v.bchg, v.car, v.boil];
    // The house is what is left (produced + from the grid + from the battery − the rest), so it needs every counter.
    const house = all.every((item) => item !== undefined) ? Math.max(0, v.pv! + v.gin! + v.bdis! - v.gout! - v.bchg! - v.car! - v.boil!) : undefined;
    return { ...v, house };
  }

  /** Battery reserve in %: 100 − the inverter's depth of discharge (on-grid); the configured number only when the inverter does not report it. */
  batteryReserve(s: Settings): number {
    const depth = readNumber(this.hass, s.entities.battery.depth_of_discharge);
    return depth !== undefined && depth >= 0 && depth <= 100 ? 100 - depth : s.num.battery.reserve;
  }
}
