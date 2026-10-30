/* The sun: its popup and the sun detail with Dnes, Historie and Výhled (CURRENT_SPEC.md, Slunce). Built from the pieces of the battery detail. */
import { html, nothing, svg } from "lit";
import type { TemplateResult } from "lit";
import type { FlowModel, Sink } from "./model";
import { SINKS, carLink, isOn } from "./model";
import type { Layout } from "./sankey";
import type { HomeAssistant, Settings } from "./types";
import { entityState, formatClock, formatDayName, formatFixed, formatKwh, formatNumber, formatPercent, formatPower, formatWeekday, readEnergy, readNumber, readText } from "./utils";
import type { PowerUnit } from "./utils";
import { CardBase } from "./base";
import { NO_DATA, SUN_RANGE_KEY, TILE_VAR, clamp } from "./view";
import type { BatEntry, Constructor, SunTab, Tile } from "./view";
import { DAY, HOUR, W, areaPath, bandPath, bin, fetchStatistics, linePath, midnight, niceCeil, round1 } from "./battery-data";
import type { Period, StatRow, StatType, Stats } from "./battery-data";
import type { Batteried, Chart } from "./battery";
import {
  addDays, blockOf, dayBlocks, dayTotal, estimateDay, hourlyEnergy, learn, median, possibleOfDay, simulateEvening, smooth, spread,
  strongWindow, sunTimes, todayHours, typicalDeviation,
} from "./sun-data";
import type { Estimate, HourlyDays, Learned } from "./sun-data";

/** How long a loaded history is used before it is fetched again (ms), and the weather forecast. */
const REFRESH = 5 * 60000;
const WEATHER_REFRESH = 30 * 60000;
/** Bins of the chart of today: five minutes. */
const PER_HOUR = 12;
/** The left margin of the charts for the labels of the vertical axis (viewBox units). */
const PAD = 26;
/** The five blocks of the day from the east to the west: from the warning colour through the sun to a light yellow. */
const BLOCK_COLORS = [
  "var(--ed-warning)",
  "color-mix(in srgb, var(--ed-warning) 60%, var(--ed-sun))",
  "color-mix(in srgb, var(--ed-warning) 25%, var(--ed-sun))",
  "var(--ed-sun)",
  "color-mix(in srgb, var(--ed-sun) 62%, white)",
];

type SunRange = "7d" | "30d";
const SUN_RANGES: readonly SunRange[] = ["7d", "30d"];
const RANGE_DAYS: Record<SunRange, number> = { "7d": 7, "30d": 30 };

/** What the sun detail knows about the day, put together from the loaded history and the live values. */
export interface SunView {
  now: number;
  today: number;
  ready: boolean;
  /** Energy by hour of the days before today (and today up to the last full hour). */
  days: HourlyDays;
  learned: Learned;
  /** kWh produced today, from the counter of the configuration or from the history. */
  done?: number;
  forecastToday?: number;
  deviation: number;
  pairs: Array<{ day: number; forecast: number; actual: number }>;
  estimate?: Estimate;
  /** kWh of today by hour: what was produced and, from now on, what is expected. */
  hours: Array<number | undefined>;
  rise?: number;
  set?: number;
  started?: number;
  ends?: { at: number; over: boolean };
  peak?: { kw: number; at: number };
  fiveRows?: StatRow[];
}

export const withSun = <T extends Constructor<Batteried>>(Base: T) =>
  class extends Base {
    _sunCache?: { entry: BatEntry; days: HourlyDays; houseCurve: Array<number | undefined>; pairs: SunView["pairs"] };
    _sunWeatherBusy = false;

    // ----------------------------------------------------------------- state and history

    sunRange(s: Settings): SunRange {
      if (this._sunRange) return this._sunRange;
      try {
        const saved = localStorage.getItem(SUN_RANGE_KEY);
        if (saved && (SUN_RANGES as readonly string[]).includes(saved)) return saved as SunRange;
      } catch {
        /* no storage: the configured default */
      }
      return s.sunRange;
    }

    setSunRange(range: SunRange): void {
      this._sunRange = range;
      this._batScrub = {};
      try {
        localStorage.setItem(SUN_RANGE_KEY, range);
      } catch {
        /* no storage: the choice lasts until the page is closed */
      }
    }

    /** The views of the history the open parts need: the popup and the detail both show the day. */
    sunNeeds(): string[] {
      return this._sunDetail || this._pop === "sun" ? ["sun:hist", "sun:five"] : [];
    }

    sunRequests(s: Settings, key: string, at: number): Array<{ part: string; ids: string[]; start: number; end: number; period: Period; types: StatType[] }> {
      const e = s.entities;
      const ids = (...list: Array<string | undefined>) => list.filter((id): id is string => !!id);
      const today = midnight(at);
      if (key === "sun:five") {
        return [{ part: "power", ids: ids(e.pv.power), start: addDays(today, -10), end: at, period: "5minute", types: ["mean"] }];
      }
      // Hourly statistics are kept for good: a month shown, plus the days the curve of what is possible is learned from.
      const start = addDays(today, -(Math.max(30, s.num.forecast.learn_days) + s.num.forecast.learn_days + 1));
      return [
        { part: "energy", ids: ids(e.pv.total_generation), start, end: at, period: "hour", types: ["change"] },
        { part: "power", ids: ids(e.pv.power), start, end: at, period: "hour", types: ["mean", "max"] },
        { part: "house", ids: ids(e.house.power), start: addDays(today, -s.num.forecast.learn_days), end: at, period: "hour", types: ["mean"] },
        { part: "forecast", ids: ids(e.forecast.energy_today), start: addDays(today, -s.num.forecast.learn_days), end: at, period: "hour", types: ["mean"] },
      ];
    }

    loadSun(): void {
      const s = this._config;
      if (!s || !this.hass) return;
      for (const key of this.sunNeeds()) {
        const entry = this._batData[key];
        if (entry && (entry.status === "loading" || Date.now() - entry.at < REFRESH)) continue;
        void this.fetchSun(s, key, entry);
      }
      if (this._sunDetail && this._sunTab === "outlook") void this.loadWeather(s);
    }

    async fetchSun(s: Settings, key: string, previous: BatEntry | undefined): Promise<void> {
      const hass = this.hass;
      if (!hass) return;
      const at = Date.now();
      this._batData = { ...this._batData, [key]: { status: "loading", at, parts: previous?.parts ?? {} } };
      try {
        const requests = this.sunRequests(s, key, at);
        const parts: Record<string, Stats> = {};
        await Promise.all(requests.map(async (request) => (parts[request.part] = await fetchStatistics(hass, request.ids, request.start, request.end, request.period, request.types))));
        this._batData = { ...this._batData, [key]: { status: "ready", at, parts } };
      } catch {
        // Home Assistant refused or the history is not there: the panels say "––", the next refresh tries again.
        this._batData = { ...this._batData, [key]: { status: "error", at, parts: {} } };
      }
    }

    /** The daily forecast of the weather entity: the condition of each day; none when the entity is missing or the action is refused. */
    async loadWeather(s: Settings): Promise<void> {
      const id = s.entities.forecast.weather;
      const hass = this.hass;
      if (!id || !hass || this._sunWeatherBusy) return;
      if (this._sunWeather && Date.now() - this._sunWeather.at < WEATHER_REFRESH) return;
      this._sunWeatherBusy = true;
      const at = Date.now();
      try {
        const answer = await hass.callWS<{ response?: Record<string, { forecast?: Array<{ datetime?: string; condition?: string }> }> }>({
          type: "call_service", domain: "weather", service: "get_forecasts", service_data: { type: "daily" }, target: { entity_id: id }, return_response: true,
        });
        const list = answer?.response?.[id]?.forecast ?? [];
        this._sunWeather = { at, days: list.filter((item) => item.datetime).map((item) => ({ day: midnight(Date.parse(item.datetime!)), condition: item.condition })) };
      } catch {
        this._sunWeather = { at, days: [] };
      } finally {
        this._sunWeatherBusy = false;
      }
    }

    loadBattery(): void {
      super.loadBattery();
      this.loadSun();
    }

    updated(changed: Map<PropertyKey, unknown>): void {
      super.updated(changed as never);
      if (changed.has("_sunDetail") && this._sunDetail) {
        const detail = this.renderRoot.querySelector<HTMLElement>(".bat-detail");
        detail?.scrollIntoView({ block: "start" });
        detail?.focus({ preventScroll: true });
      }
    }

    openSunDetail(): void {
      this._sunDetail = true;
      this._sunTab = "today";
      this._sunHint = undefined;
      this._batScrub = {};
    }

    /** "Zpět" and "Hotovo" both return to the card; the popup the detail was opened from is closed too. */
    closeSunDetail(): void {
      this._sunDetail = false;
      this._sunHint = undefined;
      this._pop = undefined;
      this.updateComplete.then(() => this.scrollIntoView({ block: "nearest" }));
    }

    // ----------------------------------------------------------------- what the card knows about the day

    place(): { latitude: number; longitude: number } | undefined {
      const config = (this.hass as (HomeAssistant & { config?: { latitude?: number; longitude?: number } }) | undefined)?.config;
      return typeof config?.latitude === "number" && typeof config.longitude === "number" ? { latitude: config.latitude, longitude: config.longitude } : undefined;
    }

    sunView(s: Settings): SunView {
      const now = Date.now();
      const today = midnight(now);
      const num = s.num.forecast;
      const hist = this._batData["sun:hist"];
      const five = this._batData["sun:five"];
      const e = s.entities;
      let days: HourlyDays = new Map();
      let houseCurve: Array<number | undefined> = new Array(24).fill(undefined);
      let pairs: SunView["pairs"] = [];
      if (hist && Object.keys(hist.parts).length) {
        if (this._sunCache?.entry !== hist) {
          const energy = e.pv.total_generation ? hist.parts.energy?.[e.pv.total_generation] : undefined;
          let built = hourlyEnergy(energy, "change");
          if (!built.size) built = hourlyEnergy(e.pv.power ? hist.parts.power?.[e.pv.power] : undefined, "mean");
          const houseDays = hourlyEnergy(e.house.power ? hist.parts.house?.[e.house.power] : undefined, "mean");
          const curve = Array.from({ length: 24 }, (_, hour) => {
            const values = [...houseDays.entries()].filter(([day]) => day < today).map(([, hours]) => hours[hour]).filter((v): v is number => v !== undefined);
            return values.length >= 3 ? median(values) : undefined;
          });
          // The forecast of the morning (the hour at 8) against what the day really gave.
          const morning = (e.forecast.energy_today ? hist.parts.forecast?.[e.forecast.energy_today] : undefined) ?? [];
          const made = morning
            .filter((row) => typeof row.mean === "number" && new Date(row.start).getHours() === 8)
            .map((row) => ({ day: midnight(row.start), forecast: row.mean as number, actual: dayTotal(built.get(midnight(row.start)), 20) }))
            .filter((pair): pair is { day: number; forecast: number; actual: number } => pair.actual !== undefined && pair.day < today);
          this._sunCache = { entry: hist, days: built, houseCurve: curve, pairs: made };
        }
        days = this._sunCache.days;
        houseCurve = this._sunCache.houseCurve;
        pairs = this._sunCache.pairs;
      }
      const learned = learn(days, today, num.learn_days, num.possible_percentile);
      const fiveRows = e.pv.power ? five?.parts.power?.[e.pv.power] : undefined;
      // Today by hour from the five-minute means (the statistics of the present hour are not compiled yet).
      let actual: Array<number | undefined> | undefined = days.get(today);
      if (fiveRows?.length) {
        const sums: Array<number | undefined> = new Array(24).fill(undefined);
        for (const row of fiveRows) {
          if (row.start < today || typeof row.mean !== "number") continue;
          const hour = new Date(row.start).getHours();
          sums[hour] = (sums[hour] ?? 0) + Math.max(0, row.mean) / 1000 / PER_HOUR;
        }
        actual = sums;
      }
      const counter = readEnergy(this.hass, s.entities.daily.pv_generation);
      const done = counter ?? (actual && actual.some((v) => v !== undefined) ? actual.reduce<number>((sum, v) => sum + (v ?? 0), 0) : undefined);
      const forecastToday = readEnergy(this.hass, e.forecast.energy_today);
      const deviation = typicalDeviation(pairs) ?? num.typical_deviation / 100;
      const estimate = estimateDay(done, forecastToday, learned.curve, now, deviation);
      const rest = estimate ? Math.max(0, estimate.value - (done ?? 0)) : 0;
      const hours = todayHours(actual, estimate ? rest : 0, learned.curve, now);
      if (!estimate) for (let h = new Date(now).getHours(); h < 24; h++) hours[h] = undefined;
      const place = this.place();
      const times = place ? sunTimes(today, place.latitude, place.longitude) : undefined;
      // The first and the last five-minute mean of today above the idle threshold.
      const idle = s.num.flows.idle_threshold;
      const todayRows = (fiveRows ?? []).filter((row) => row.start >= today && typeof row.mean === "number");
      const producing = todayRows.filter((row) => (row.mean as number) >= idle);
      const started = producing.length ? producing[0].start : undefined;
      const peakRow = todayRows.reduce<StatRow | undefined>((best, row) => (!best || (row.mean as number) > (best.mean as number) ? row : best), undefined);
      let ends: SunView["ends"];
      if (times) {
        const lags: number[] = [];
        for (const day of [...new Set((fiveRows ?? []).map((row) => midnight(row.start)))].filter((d) => d < today)) {
          const last = (fiveRows ?? []).filter((row) => midnight(row.start) === day && (row.mean as number) >= idle).pop();
          const dayTimes = place ? sunTimes(day, place.latitude, place.longitude) : undefined;
          if (last && dayTimes) lags.push(dayTimes.set - (last.start + 5 * 60000));
        }
        const lag = lags.length >= 3 ? median(lags)! : 0;
        const lastNow = producing.length ? producing[producing.length - 1].start + 5 * 60000 : undefined;
        const over = now > times.set && (lastNow === undefined || now - lastNow > 15 * 60000);
        ends = over && lastNow !== undefined ? { at: lastNow, over: true } : { at: times.set - lag, over: false };
      }
      return {
        now, today, ready: !!hist && hist.status !== "loading" || !!hist?.parts && Object.keys(hist.parts).length > 0, days, learned, done, forecastToday, deviation, pairs, estimate, hours,
        rise: times?.rise, set: times?.set, started, ends, fiveRows,
        peak: peakRow ? { kw: (peakRow.mean as number) / 1000, at: peakRow.start } : undefined,
        // Kept for the evening estimate.
        ...({ houseCurve } as object),
      } as SunView;
    }

    /** The house by hour (the median of the recent days) kept in the cache of the view. */
    sunHouseCurve(): Array<number | undefined> {
      return this._sunCache?.houseCurve ?? [];
    }

    // ----------------------------------------------------------------- shared pieces

    /** The small ⓘ and the bubble it opens over the card (a second tap closes it); the hint never takes room in a panel. */
    hint(key: string, text: string): TemplateResult {
      const open = this._sunHint === key;
      return html`<button type="button" class="sun-hint" aria-label=${this.t.sun.info} aria-expanded=${open ? "true" : "false"} @click=${() => { this._sunHint = open ? undefined : key; }}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.2"></circle><path d="M12 11v5.2"></path><circle cx="12" cy="7.6" r="0.7"></circle></svg>
        </button>${open ? html`<div class="sun-note" role="note" @click=${() => { this._sunHint = undefined; }}>${text}</div>` : nothing}`;
    }

    /** A ring with the number centred in it and the unit under the number. */
    ring(fraction: number, size: number, stroke: number, num: string, unit: string, label: string): TemplateResult {
      const r = (size - stroke) / 2;
      const c = 2 * Math.PI * r;
      const f = clamp(fraction, 0, 1);
      return html`<div class="sun-ring" style="width:${size}px;height:${size}px" role="img" aria-label=${label}>
        <svg viewBox="0 0 ${size} ${size}" aria-hidden="true">
          <circle cx=${size / 2} cy=${size / 2} r=${r} fill="none" class="track" stroke-width=${stroke}></circle>
          <circle cx=${size / 2} cy=${size / 2} r=${r} fill="none" class="fill" stroke-width=${stroke} stroke-linecap="round" stroke-dasharray="${(c * f).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 ${size / 2} ${size / 2})"></circle>
        </svg>
        <span class="num" style="font-size:${Math.round(size * (size <= 44 ? 0.3 : 0.27))}px">${num}</span><span class="unit">${unit}</span>
      </div>`;
    }

    /** The one panel "Dnes zatím" with the ring, the same in the popup and in the detail. */
    renderSoFar(v: SunView): TemplateResult {
      const t = this.t.sun;
      const est = v.estimate;
      const percent = est && v.done !== undefined && est.value > 0 ? Math.min(100, Math.round((v.done / est.value) * 100)) : undefined;
      return html`<div class="sun-sofar">
        <div class="text"><span class="sub">${t.soFar}</span><span class="val">${v.done === undefined ? NO_DATA : `${formatKwh(v.done)} kWh`}</span><span class="sub">${est ? t.ofEstimate(formatKwh(est.value)) : NO_DATA}</span></div>
        ${percent === undefined ? nothing : this.ring(percent / 100, 40, 6, String(percent), "%", t.ringLabel(formatPercent(percent)))}
      </div>`;
    }

    /** Where the sun goes now: the bar and the legend of the sinks (house, car, boiler, battery, grid). */
    renderSunFlow(model: FlowModel, s: Settings, large: boolean): TemplateResult {
      const t = this.t;
      const idle = s.num.flows.idle_threshold;
      const parts = SINKS.map((sink) => ({ sink, watts: model.flows.filter((f) => f.from === "sun" && f.to === sink).reduce((sum, f) => sum + f.watts, 0) })).filter((part) => isOn(part.watts, idle));
      if (!parts.length) return html`<p class="bat-sub">${model.sun === undefined ? NO_DATA : t.sun.flowNone}</p>`;
      const unit: PowerUnit = "kW";
      return html`<div class="mix-bar sun-bar ${large ? "large" : ""}" role="img" aria-label=${parts.map((part) => `${t.tile[part.sink]} ${formatPower(part.watts, unit)}`).join(", ")}>${parts.map((part) => html`<div style="flex:${part.watts.toFixed(0)} 1 0;background:var(${TILE_VAR[part.sink]})"></div>`)}</div>
        ${large ? html`<div class="sun-legend" role="group" aria-label=${t.sun.flowTitle}>${parts.map((part) => html`<span><span class="name"><i style="background:var(${TILE_VAR[part.sink]})"></i>${t.tile[part.sink]}</span><b>${formatPower(part.watts, unit)}</b></span>`)}</div>` : nothing}`;
    }

    /** The condition of the weather entity as a group of the card's texts ("partly", "rain" …). */
    weatherGroup(condition: string | undefined): string | undefined {
      if (!condition) return undefined;
      if (condition === "sunny" || condition === "clear-night") return "clear";
      if (condition === "partlycloudy") return "partly";
      if (condition === "cloudy") return "cloudy";
      if (condition === "rainy" || condition === "pouring") return "rain";
      if (condition === "snowy" || condition === "snowy-rainy" || condition === "hail") return "snow";
      if (condition === "fog") return "fog";
      if (condition === "lightning" || condition === "lightning-rainy") return "storm";
      if (condition === "windy" || condition === "windy-variant") return "wind";
      return undefined;
    }

    weatherNow(s: Settings): string | undefined {
      const id = s.entities.forecast.weather;
      const group = this.weatherGroup(id ? entityState(this.hass, id)?.state : undefined);
      return group ? this.t.sun.weather[group] : undefined;
    }

    // ----------------------------------------------------------------- popup

    renderSunPopup(tile: Tile, lay: Layout, s: Settings, model: FlowModel, unit: PowerUnit): TemplateResult {
      const t = this.t;
      const v = this.sunView(s);
      const on = isOn(model.sun, s.num.flows.idle_threshold);
      const weather = this.weatherNow(s);
      const now = on ? (weather ? t.sun.producingWith(weather) : t.sun.producing) : model.sun === undefined ? NO_DATA : t.idle.sun;
      const width = Math.min(236, lay.width);
      const centreX = tile.side === "L" ? lay.tile.w / 2 : lay.width - lay.tile.w / 2;
      const left = clamp(centreX - width / 2, 0, lay.width - width);
      const centreY = tile.side === "L" ? lay.left[tile.key as "sun"] : lay.right[tile.key as Sink];
      const top = centreY - lay.tile.h / 2;
      const below = centreY < lay.height / 2;
      const place = below ? `top:${(top + lay.tile.h + 8).toFixed(0)}px` : `bottom:${(lay.height - top + 8).toFixed(0)}px`;
      return html`<div class="pop bat-pop sun-pop" role="dialog" aria-label=${tile.name} tabindex="-1" style="left:${left.toFixed(0)}px;${place};width:${width}px">
        <i class="arrow ${below ? "up" : "down"}" aria-hidden="true" style="left:${(centreX - left - 6).toFixed(0)}px"></i>
        <div class="pop-head"><span class="pop-title">${tile.name}</span><span class="pop-now">${now}</span></div>
        <div class="pop-level">
          <div class="pop-level-row"><span class="pop-label">${t.sun.powerNow}</span><span class="pop-big">${model.sun === undefined ? NO_DATA : formatPower(model.sun, unit === "W" && model.sun >= s.num.flows.kw_from ? "kW" : unit)}</span></div>
          ${on ? this.renderSunFlow(model, s, false) : nothing}
        </div>
        ${this.renderSoFar(v)}
        <div class="pop-rows">
          <div class="pop-row"><span>${t.sun.started}</span><b>${v.started === undefined ? NO_DATA : formatClock(v.started)}</b></div>
          <div class="pop-row"><span>${v.ends?.over ? t.sun.ended : t.sun.ends}</span><b>${v.ends === undefined ? NO_DATA : formatClock(v.ends.at)}</b></div>
        </div>
        <button type="button" class="bat-open" @click=${() => this.openSunDetail()}><span>${t.sun.open}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg></button>
      </div>`;
    }

    // ----------------------------------------------------------------- the detail

    renderSunDetail(s: Settings, model: FlowModel): TemplateResult {
      const t = this.t;
      const tabs: Array<{ value: SunTab; label: string }> = (["today", "hist", "outlook"] as const).map((value) => ({ value, label: t.sun.tabs[value] }));
      const v = this.sunView(s);
      return html`<section class="bat-detail sun-detail" role="dialog" aria-modal="true" aria-label=${t.sun.detailLabel} tabindex="-1">
        <div class="bat-nav">
          <button type="button" class="bat-link" @click=${() => this.closeSunDetail()}>‹ ${t.sun.back}</button>
          <h2>${t.sun.title}</h2>
          <button type="button" class="bat-link end" @click=${() => this.closeSunDetail()}>${t.sun.done}</button>
        </div>
        <ed-segmented .options=${tabs} .value=${this._sunTab} label=${t.sun.tabsLabel} @hdk-select=${(event: CustomEvent<{ value: string }>) => { this._sunTab = event.detail.value as SunTab; this._sunHint = undefined; this._batScrub = {}; }}></ed-segmented>
        ${this._sunTab === "today" ? this.renderSunToday(s, model, v) : this._sunTab === "hist" ? this.renderSunHistory(s, v) : this.renderSunOutlook(s, v)}
      </section>`;
    }

    // ----------------------------------------------------------------- Dnes

    /** Clock hour of a time as a fraction (7:30 = 7.5). */
    hourOf(ms: number): number {
      const date = new Date(ms);
      return date.getHours() + date.getMinutes() / 60;
    }

    /** The chart of the power today: the production, the learned "possible" curve and the band of the forecast. */
    todayChart(s: Settings, v: SunView): Chart | undefined {
      const e = s.entities;
      if (!e.pv.power || !v.fiveRows?.some((row) => row.start >= v.today)) return undefined;
      const t = this.t.sun;
      const h0 = v.rise !== undefined ? clamp(Math.floor(this.hourOf(v.rise) - 0.5), 0, 22) : 6;
      const h1 = v.set !== undefined ? clamp(Math.ceil(this.hourOf(v.set) + 0.5), h0 + 2, 24) : 18;
      const n = (h1 - h0) * PER_HOUR;
      const start = v.today + h0 * HOUR;
      const end = v.today + h1 * HOUR;
      const x = (i: number) => round1(PAD + (i / (n - 1)) * (W - PAD));
      const actual = bin(v.fiveRows, "mean", start, end, n).map((value) => (value === undefined ? undefined : value / 1000));
      const hourAt = (i: number) => h0 + (i + 0.5) / PER_HOUR;
      const nowIndex = Math.floor(((v.now - start) / (end - start)) * n);
      // A value read between the centres of the hours.
      const between = (hours: Array<number | undefined>, at: number): number | undefined => {
        const f = at - 0.5;
        const lo = Math.floor(f);
        const a = hours[lo];
        const b = hours[lo + 1];
        if (a === undefined && b === undefined) return undefined;
        const u = f - lo;
        return (a ?? 0) * (1 - u) + (b ?? 0) * u;
      };
      const hasCurve = v.learned.curve.some((value) => value !== undefined);
      const possible = Array.from({ length: n }, (_, i) => (hasCurve ? between(v.learned.curve, hourAt(i)) : undefined));
      const est = v.estimate;
      const rest = est ? Math.max(0, est.value - (v.done ?? 0)) : 0;
      const lowRatio = est && rest > 0 ? (est.low - (v.done ?? 0)) / rest : 1;
      const highRatio = est && rest > 0 ? (est.high - (v.done ?? 0)) / rest : 1;
      const future = (i: number) => i >= nowIndex;
      const fc = Array.from({ length: n }, (_, i) => (est && future(i) ? between(v.hours.map((value, h) => (h >= new Date(v.now).getHours() ? value : undefined)), hourAt(i)) : undefined));
      const low = fc.map((value) => (value === undefined ? undefined : value * lowRatio));
      const high = fc.map((value) => (value === undefined ? undefined : value * highRatio));
      const peak = Math.max(1, ...actual.map((value) => value ?? 0), ...possible.map((value) => value ?? 0), ...high.map((value) => value ?? 0));
      // Guide lines every 1 kW, every 2 kW when that would be more than 7 lines.
      const step = Math.ceil(peak) > 7 ? 2 : 1;
      const top = Math.ceil(peak / step) * step;
      const hy = 150;
      const y = (value: number) => round1(hy - (clamp(value, 0, top) / top) * (hy - 12));
      const kw = (value: number) => formatPower(value * 1000, "kW");
      const levels = Array.from({ length: top / step }, (_, k) => (k + 1) * step);
      return {
        id: "sun-today", h: 170, n, x, fade: 0, start: clamp((nowIndex / (n - 1)) * 100, 0, 100),
        grid: [{ y: hy, strong: true }, ...levels.map((level) => ({ y: y(level) }))],
        labels: [...levels.map((level) => ({ y: y(level), text: formatNumber(level) })), { y: hy, text: "0" }],
        body: svg`<defs><linearGradient id="sun-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--ed-sun)" stop-opacity="0.28"></stop><stop offset="1" style="stop-color:var(--ed-sun)" stop-opacity="0"></stop></linearGradient></defs>
          <path d=${bandPath(low, high, x, y)} style="fill:var(--ed-sun);fill-opacity:0.24"></path>
          <path d=${linePath(possible, x, y)} fill="none" style="stroke:var(--ed-secondary)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="0.1 6"></path>
          <path d=${areaPath(actual, x, y, hy)} fill="url(#sun-area)"></path>
          <path d=${linePath(actual, x, y)} fill="none" style="stroke:var(--ed-sun)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
        dot: (i) => (actual[i] === undefined ? undefined : { y: y(actual[i]!), color: "var(--ed-sun)" }),
        read: (i) => {
          const clock = formatClock(start + (i + 0.5) * ((end - start) / n));
          const parts = [actual[i] !== undefined ? kw(actual[i]!) : fc[i] !== undefined ? `${t.chartLegend.forecast.toLowerCase()} ≈ ${kw(fc[i]!)}` : NO_DATA];
          if (possible[i] !== undefined) parts.push(`${t.possibleShort} ${kw(possible[i]!)}`);
          return `${clock} · ${parts.join(" · ")}`;
        },
        from: formatClock(start), to: formatClock(end),
        legend: html`<div class="bat-legend wrap"><span><i class="bar" style="background:var(--ed-sun)"></i>${t.chartLegend.production}</span><span><i class="dots" aria-hidden="true"></i>${t.chartLegend.possible}</span><span><i class="swatch" style="background:var(--ed-sun);opacity:.3"></i>${t.chartLegend.forecast}</span></div>`,
      };
    }

    /** The kWh the sun gave today to the house, the car, the boiler, the battery and the grid (an estimate from the totals of the day). */
    whereToday(s: Settings): Array<{ key: Sink; kwh: number }> | undefined {
      const d = this.today(s);
      if (d.pv === undefined || d.bchg === undefined || d.gout === undefined || d.gin === undefined || d.bdis === undefined) return undefined;
      const consumption = Math.max(0, d.pv + d.gin + d.bdis - d.gout - d.bchg);
      const fromSun = Math.max(0, d.pv - d.bchg - d.gout);
      const car = d.car ?? 0;
      const boil = d.boil ?? 0;
      const house = Math.max(0, consumption - car - boil);
      const share = consumption > 0 ? Math.min(1, fromSun / consumption) : 0;
      return [
        { key: "house" as Sink, kwh: house * share }, { key: "car" as Sink, kwh: car * share }, { key: "boil" as Sink, kwh: boil * share },
        { key: "batIn" as Sink, kwh: d.bchg }, { key: "gridOut" as Sink, kwh: d.gout },
      ].filter((part) => part.kwh > 0.005);
    }

    renderSunToday(s: Settings, model: FlowModel, v: SunView): TemplateResult {
      const t = this.t;
      const unit: PowerUnit = "kW";
      const chart = this.todayChart(s, v);
      const where = this.whereToday(s);
      const total = where?.reduce((sum, part) => sum + part.kwh, 0) ?? 0;
      const kw = model.sun === undefined ? NO_DATA : formatPower(model.sun, unit);
      return html`<div class="bat-card">
          <span class="bat-cap">${t.sun.powerNow}</span>
          <span class="bat-huge">${kw}</span>
          ${isOn(model.sun, s.num.flows.idle_threshold) ? this.renderSunFlow(model, s, true) : nothing}
        </div>
        <div class="bat-card rel">
          <div class="bat-card-bar"><span class="sun-title">${t.sun.chartTitle}</span><span class="sun-unit">${t.sun.chartUnit}${this.hint("chart", t.sun.hints.chart)}</span></div>
          ${this.renderChartOrEmpty("sun:five", 170, chart)}
        </div>
        <div class="bat-kpis">
          <div class="bat-kpi sun-kpi-ring">${this.renderSoFar(v)}</div>
          <div class="bat-kpi"><span class="sub">${t.sun.peakToday}</span><span class="val">${v.peak ? formatPower(v.peak.kw * 1000, unit) : NO_DATA}</span><span class="sub">${v.peak ? t.sun.at(formatClock(v.peak.at)) : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${t.sun.startedLong}</span><span class="val">${v.started === undefined ? NO_DATA : formatClock(v.started)}</span><span class="sub">${v.rise === undefined ? "" : t.sun.sunrise(formatClock(v.rise))}</span></div>
          <div class="bat-kpi"><span class="sub">${v.ends?.over ? t.sun.ended : t.sun.ends}</span><span class="val">${v.ends === undefined ? NO_DATA : formatClock(v.ends.at)}</span><span class="sub">${v.set === undefined ? "" : t.sun.sunset(formatClock(v.set))}</span></div>
        </div>
        ${where
          ? html`<div class="bat-card rel">
              <div class="bat-card-bar"><span class="bat-cap">${t.sun.whereTitle}</span>${this.hint("where", t.sun.hints.where)}</div>
              <div class="mix-bar sun-bar large" aria-hidden="true">${where.map((part) => html`<div style="flex:${part.kwh.toFixed(3)} 1 0;background:var(${TILE_VAR[part.key]})"></div>`)}</div>
              <div class="sun-legend" role="group" aria-label=${t.sun.whereTitle}>${where.map((part) => html`<span><span class="name"><i style="background:var(${TILE_VAR[part.key]})"></i>${t.tile[part.key]}</span><b>${formatKwh(part.kwh)}</b></span>`)}</div>
              <span class="bat-sub">${total > 0 ? t.sun.whereUnit : NO_DATA}</span>
            </div>`
          : nothing}`;
    }

    // ----------------------------------------------------------------- Historie

    renderSunRange(s: Settings): TemplateResult {
      const t = this.t.sun.hist;
      const options = SUN_RANGES.map((value) => ({ value, label: t.ranges[value] }));
      return html`<ed-segmented .options=${options} .value=${this.sunRange(s)} label=${t.rangeLabel} @hdk-select=${(event: CustomEvent<{ value: string }>) => this.setSunRange(event.detail.value as SunRange)}></ed-segmented>`;
    }

    /** The complete days of a range, oldest first (today is not in it: a day that is not over would lower every figure). */
    rangeDays(v: SunView, range: SunRange, back = 0): number[] {
      const count = RANGE_DAYS[range];
      return Array.from({ length: count }, (_, i) => addDays(v.today, -(count - i) - back));
    }

    /** The production by day of the range: the totals, the blocks of the day and what was possible. */
    histData(s: Settings, v: SunView, range: SunRange) {
      const num = s.num.forecast;
      const days = this.rangeDays(v, range);
      return days.map((day) => {
        const hours = v.days.get(day);
        const total = dayTotal(hours, 20);
        return { day, hours, total, blocks: total === undefined ? undefined : dayBlocks(hours), possible: possibleOfDay(v.days, day, num.learn_days, num.possible_percentile) };
      });
    }

    histChart(s: Settings, v: SunView, range: SunRange): Chart | undefined {
      const t = this.t.sun.hist;
      const data = this.histData(s, v, range);
      if (!data.some((d) => d.total !== undefined)) return undefined;
      const n = data.length;
      const step = (W - PAD) / n;
      const x = (i: number) => round1(PAD + i * step + step / 2);
      const peak = Math.max(1, ...data.map((d) => Math.max(d.total ?? 0, d.possible ?? 0)));
      const top = niceCeil(peak);
      const hy = 150;
      const y = (value: number) => round1(hy - (clamp(value, 0, top) / top) * (hy - 14));
      const parts = this._sunMode === "parts";
      const label = (i: number) => (range === "7d" ? new Intl.DateTimeFormat(this._i18n.locale, { weekday: "short" }).format(data[i].day) : formatWeekday(data[i].day).replace(/^\S+\s/, ""));
      let body: TemplateResult;
      if (parts) {
        const xs = data.map((_, i) => x(i));
        const known = data.map((d) => d.blocks);
        // A hole in the data would draw a false dip: the layers are drawn only through days that have blocks.
        const idx = known.map((b, i) => (b ? i : -1)).filter((i) => i >= 0);
        const cum = idx.map((i) => known[i]!.reduce<number[]>((acc, value) => [...acc, acc[acc.length - 1] + value], [0]));
        const bounds = Array.from({ length: 6 }, (_, k) => smooth(idx.map((i) => xs[i]), cum.map((c) => y(c[k]))));
        const polyline = (points: Array<[number, number]>) => points.map(([px, py]) => `${round1(px)},${round1(py)}`).join(" ");
        const possible = data.map((d) => d.possible);
        const track = possible.some((p) => p !== undefined) ? areaPath(possible, x, y, hy) : "";
        body = svg`<path d=${track} style="fill:var(--ed-tile)"></path>
          ${[0, 1, 2, 3, 4].map((k) => svg`<polygon points=${`${polyline(bounds[k + 1])} ${polyline([...bounds[k]].reverse())}`} style="fill:${BLOCK_COLORS[k]}"></polygon>`)}
          ${[1, 2, 3, 4].map((k) => svg`<polyline points=${polyline(bounds[k])} fill="none" stroke="#fff" stroke-opacity="0.38" stroke-width="1"></polyline>`)}`;
      } else {
        const bw = Math.min(range === "7d" ? 26 : 7, step - 3);
        body = svg`${data.map((d, i) => svg`
          ${d.possible === undefined ? nothing : svg`<rect x=${round1(x(i) - bw / 2)} y=${y(d.possible)} width=${bw} height=${round1(hy - y(d.possible))} rx=${range === "7d" ? 5 : 2} style="fill:var(--ed-tile)"></rect>`}
          ${d.total === undefined ? nothing : svg`<rect x=${round1(x(i) - bw / 2)} y=${y(d.total)} width=${bw} height=${round1(Math.max(1, hy - y(d.total)))} rx=${range === "7d" ? 5 : 2} style="fill:var(--ed-sun)"></rect>`}
          ${d.total !== undefined && range === "7d" ? svg`<text x=${x(i)} y=${y(d.total) - 5} text-anchor="middle" style="fill:var(--ed-text)" font-size="11" font-weight="600">${formatFixed(d.total, 1)}</text>` : nothing}`)}`;
      }
      const ticks = range === "7d" ? data.map((_, i) => i) : [0, 7, 14, 21, n - 1];
      const legend = parts
        ? html`<div class="sun-blocks" role="group">${t.blocks.map((name, k) => html`<span><i style="background:${BLOCK_COLORS[k]}"></i><span>${name}</span></span>`)}</div>`
        : html`<div class="bat-legend sun-legend-row"><span><i class="dot" style="background:var(--ed-sun)"></i>${t.production}</span><span><i class="dot" style="background:var(--ed-tile)"></i>${t.possible}</span></div>`;
      return {
        id: `sun-hist-${parts ? "parts" : "total"}`, h: 170, n, x, fade: 0,
        grid: [{ y: hy, strong: true }, { y: y(top / 2) }, { y: y(top) }],
        labels: [{ y: y(top), text: formatNumber(top) }, { y: y(top / 2), text: formatNumber(top / 2, top / 2 % 1 ? 1 : 0) }, { y: hy, text: "0" }],
        body: svg`${body}${ticks.map((i) => svg`<text x=${x(i)} y=${hy + 16} text-anchor="middle" style="fill:var(--ed-secondary)" font-size="11">${label(i)}</text>`)}`,
        dot: (i) => (data[i].total === undefined ? undefined : { y: y(data[i].total!), color: "var(--ed-sun)" }),
        read: (i) => {
          const d = data[i];
          const when = formatWeekday(d.day);
          if (d.total === undefined) return `${when} · ${NO_DATA}`;
          if (parts && d.blocks) {
            const best = d.blocks.indexOf(Math.max(...d.blocks));
            return `${when} · ${formatFixed(d.total, 1)} kWh · ${t.mostIn(t.blocks[best])}`;
          }
          return `${when} · ${formatFixed(d.total, 1)} kWh${d.possible ? ` · ${t.ofPossible(formatPercent(Math.round((d.total / d.possible) * 100)))}` : ""}`;
        },
        from: "", to: "", legend,
      };
    }

    /** A half ring: the share of the production in the morning (east) and in the afternoon (west). */
    eastWest(east: number): TemplateResult {
      const t = this.t.sun.hist;
      const r = 46;
      const arc = (a0: number, a1: number, color: string) => {
        const p = (a: number) => `${round1(70 + r * Math.cos((a * Math.PI) / 180))},${round1(64 - r * Math.sin((a * Math.PI) / 180))}`;
        return svg`<path d="M${p(a0)} A${r},${r} 0 0 1 ${p(a1)}" fill="none" style="stroke:${color}" stroke-width="10"></path>`;
      };
      const split = 180 - 180 * east;
      const percent = Math.round(east * 100);
      return html`<svg viewBox="0 0 140 78" class="sun-half" role="img" aria-label=${t.eastWestLabel(formatPercent(percent), formatPercent(100 - percent))}>${arc(180, split + 1.5, "var(--ed-warning)")}${arc(split - 1.5, 0, "var(--ed-sun)")}</svg>
        <div class="sun-half-text"><span style="color:color-mix(in srgb, var(--ed-warning) 45%, var(--ed-text))">${formatPercent(percent)}</span><span style="color:color-mix(in srgb, var(--ed-sun) 45%, var(--ed-text))">${formatPercent(100 - percent)}</span></div>`;
    }

    renderSunHistory(s: Settings, v: SunView): TemplateResult {
      const t = this.t.sun;
      const num = s.num.forecast;
      const range = this.sunRange(s);
      const data = this.histData(s, v, range);
      const known = data.filter((d): d is typeof d & { total: number } => d.total !== undefined);
      const loading = !v.ready;
      const total = known.reduce((sum, d) => sum + d.total, 0);
      const possible = data.reduce((sum, d) => sum + (d.possible ?? 0), 0);
      const withPossible = known.filter((d) => d.possible !== undefined);
      const percent = withPossible.length ? Math.round((withPossible.reduce((sum, d) => sum + d.total, 0) / withPossible.reduce((sum, d) => sum + d.possible!, 0)) * 100) : undefined;
      void possible;
      const chart = this.histChart(s, v, range);
      const modes = (["total", "parts"] as const).map((value) => ({ value, label: t.hist.modes[value] }));
      const best = known.reduce<typeof known[number] | undefined>((a, d) => (!a || d.total > a.total ? d : a), undefined);
      const worst = known.reduce<typeof known[number] | undefined>((a, d) => (!a || d.total < a.total ? d : a), undefined);
      const day = (d: { day: number; total: number; possible?: number }) => t.hist.dayOfPossible(formatWeekday(d.day), d.possible ? formatPercent(Math.round((d.total / d.possible) * 100)) : NO_DATA);
      // The strongest hour of the range and the length of the production (hours with some sun) against the range before.
      const e = s.entities;
      const powerRows = (e.pv.power && this._batData["sun:hist"]?.parts.power?.[e.pv.power]) || [];
      const first = data[0]?.day ?? v.today;
      const peakRow = powerRows.filter((row) => row.start >= first && row.start < v.today && typeof row.max === "number").reduce<StatRow | undefined>((a, row) => (!a || (row.max as number) > (a.max as number) ? row : a), undefined);
      const lengthOf = (list: Array<{ hours?: Array<number | undefined> }>) => {
        const lengths = list.map((d) => (d.hours ? d.hours.filter((value) => (value ?? 0) >= 0.05).length : undefined)).filter((value): value is number => value !== undefined);
        return lengths.length ? lengths.reduce((a, b) => a + b, 0) / lengths.length : undefined;
      };
      const length = lengthOf(data);
      const before = lengthOf(this.rangeDays(v, range, RANGE_DAYS[range]).map((day) => ({ hours: v.days.get(day) })));
      // East and west: the production before and after the middle of the day (the middle between sunrise and sunset, or noon).
      const noon = v.rise !== undefined && v.set !== undefined ? this.hourOf((v.rise + v.set) / 2) : 12;
      let east = 0;
      let west = 0;
      for (const d of known) d.hours?.forEach((value, hour) => { if (value) (hour + 0.5 < noon ? (east += value) : (west += value)); });
      const eastShare = east + west > 0 ? east / (east + west) : undefined;
      const good = known.filter((d) => d.total > num.good_day).length;
      const pairs = v.pairs.slice(-7);
      return html`${this.renderSunRange(s)}
        <div class="bat-card">
          <span class="bat-cap">${t.hist.last(RANGE_DAYS[range])}</span>
          <span class="bat-huge sun-huge">${known.length ? `${formatFixed(total, 1)} kWh` : NO_DATA}</span>
          <span class="bat-sub">${known.length ? html`${percent === undefined ? nothing : html`<b class="sun-yellow">${t.hist.ofPossible(formatPercent(percent))}</b> · `}${t.hist.average(`${formatFixed(total / known.length, 1)} kWh`)}` : loading ? NO_DATA : NO_DATA}</span>
        </div>
        <div class="bat-card">
          <div class="bat-card-bar sun-mode"><span class="sun-title">${t.hist.chartTitle}</span>
            <ed-segmented compact .options=${modes} .value=${this._sunMode} label=${t.hist.modeLabel} @hdk-select=${(event: CustomEvent<{ value: string }>) => { this._sunMode = event.detail.value as "total" | "parts"; }}></ed-segmented>
          </div>
          ${this.renderChartOrEmpty("sun:hist", 170, chart)}
        </div>
        <div class="bat-kpis">
          <div class="bat-kpi"><span class="sub">${t.hist.best}</span><span class="val">${best ? `${formatFixed(best.total, 1)} kWh` : NO_DATA}</span><span class="sub">${best ? day(best) : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${t.hist.worst}</span><span class="val">${worst ? `${formatFixed(worst.total, 1)} kWh` : NO_DATA}</span><span class="sub">${worst ? day(worst) : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${t.hist.peak}</span><span class="val">${peakRow ? formatPower(peakRow.max as number, "kW") : NO_DATA}</span><span class="sub">${peakRow ? `${formatWeekday(peakRow.start)} ${t.at(formatClock(peakRow.start))}` : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${t.hist.length}</span><span class="val">${length === undefined ? NO_DATA : t.hist.lengthValue(formatFixed(length, 1))}</span><span class="sub">${before === undefined ? "" : (range === "7d" ? t.hist.before7 : t.hist.before30)(formatFixed(before, 1))}</span></div>
        </div>
        <div class="sun-two">
          <div class="bat-card"><span class="bat-cap">${t.hist.eastWest}</span>${eastShare === undefined ? html`<span class="bat-sub">${NO_DATA}</span>` : this.eastWest(eastShare)}</div>
          <div class="bat-card"><span class="bat-cap">${t.hist.goodDays}</span><span class="val big">${known.length ? t.hist.goodOf(good, known.length) : NO_DATA}</span><span class="bat-sub">${t.hist.over(formatNumber(num.good_day))}</span>
            <div class="sun-dots" aria-hidden="true">${known.map((d) => html`<i class=${d.total > num.good_day ? "on" : ""}></i>`)}</div></div>
        </div>
        ${pairs.length >= 3 ? this.renderAccuracy(pairs, v) : nothing}`;
    }

    renderAccuracy(pairs: SunView["pairs"], v: SunView): TemplateResult {
      const t = this.t.sun;
      const top = niceCeil(Math.max(...pairs.flatMap((pair) => [pair.forecast, pair.actual])));
      const width = 310;
      const base = 60;
      const bw = 14;
      const step = width / pairs.length;
      return html`<div class="bat-card rel">
        <div class="bat-card-bar"><span class="bat-cap">${t.hist.accuracyTitle}</span>${this.hint("acc", t.hints.acc)}</div>
        <div class="sun-acc"><b>±${formatPercent(Math.round(v.deviation * 100))}</b><span class="bat-sub">${t.hist.accuracyAverage(v.pairs.length)}</span></div>
        <svg viewBox="0 0 ${width} 80" class="sun-pairs" role="img" aria-label=${t.hist.accuracyLabel}>
          <line x1="0" y1=${base} x2=${width} y2=${base} class="axis"></line>
          ${pairs.map((pair, i) => {
            const x = i * step + (step - 2 * bw - 2) / 2;
            const h = (value: number) => round1((value / top) * 50);
            return svg`<rect x=${round1(x)} y=${round1(base - h(pair.forecast))} width=${bw} height=${h(pair.forecast)} rx="3" style="fill:var(--ed-off)"></rect>
              <rect x=${round1(x + bw + 2)} y=${round1(base - h(pair.actual))} width=${bw} height=${h(pair.actual)} rx="3" style="fill:var(--ed-sun)"></rect>
              <text x=${round1(x + bw + 1)} y="76" text-anchor="middle" style="fill:var(--ed-secondary)" font-size="11">${new Intl.DateTimeFormat(this._i18n.locale, { weekday: "short" }).format(pair.day)}</text>`;
          })}
        </svg>
        <div class="bat-legend"><span><i class="dot" style="background:var(--ed-off)"></i>${t.hist.forecast}</span><span><i class="dot" style="background:var(--ed-sun)"></i>${t.hist.actual}</span></div>
      </div>`;
    }

    // ----------------------------------------------------------------- Výhled

    renderSunOutlook(s: Settings, v: SunView): TemplateResult {
      const t = this.t.sun;
      const o = t.outlook;
      const num = s.num.forecast;
      const e = s.entities;
      const est = v.estimate;
      const good = num.good_power / 1000;
      const strongText = `${formatFixed(num.good_power / 1000, num.good_power % 1000 ? 1 : 0)} kW`;
      const percent = est && v.done !== undefined && est.value > 0 ? Math.min(100, Math.round((v.done / est.value) * 100)) : undefined;
      const level = est ? { low: 1, medium: 2, high: 3 }[est.certainty] : 0;
      // The five days: today from the hours, the next ones from the forecast of the day spread by the learned curve.
      const entities = [e.forecast.energy_today, e.forecast.energy_tomorrow, e.forecast.energy_day_2, e.forecast.energy_day_3, e.forecast.energy_day_4];
      const weather = this._sunWeather?.days ?? [];
      const rows = entities.map((id, i) => {
        const day = addDays(v.today, i);
        const kwh = i === 0 ? est?.value : readEnergy(this.hass, id);
        const hours = i === 0 ? v.hours : kwh === undefined ? undefined : spread(kwh, v.learned.curve);
        const condition = i === 0 ? this.weatherGroup(e.forecast.weather ? entityState(this.hass, e.forecast.weather)?.state : undefined) : this.weatherGroup(weather.find((item) => item.day === day)?.condition);
        return { i, day, kwh, hours, condition };
      }).filter((row) => row.kwh !== undefined || row.i === 0);
      const withData = rows.filter((row) => row.kwh !== undefined);
      const window = (hours: Array<number | undefined> | undefined) => (hours ? strongWindow(hours, num.strip_from, num.strip_to, good) : undefined);
      const best = withData.filter((row) => row.i > 0 || withData.length === 1).reduce<typeof rows[number] | undefined>((a, row) => (!a || row.kwh! > a.kwh! ? row : a), undefined);
      const bestWindow = best ? window(best.hours) : undefined;
      // The day length and its change.
      const place = this.place();
      const today = place ? sunTimes(v.today, place.latitude, place.longitude) : undefined;
      const tomorrow = place ? sunTimes(addDays(v.today, 1), place.latitude, place.longitude) : undefined;
      const length = today ? Math.round((today.set - today.rise) / 60000) : undefined;
      const change = today && tomorrow ? Math.round((tomorrow.set - tomorrow.rise - (today.set - today.rise)) / 60000) : undefined;
      const evening = this.evening(s, v);
      const hoursRange = Array.from({ length: num.strip_to - num.strip_from + 1 }, (_, k) => num.strip_from + k);
      const nowHour = new Date(v.now).getHours();
      return html`<div class="bat-card rel">
          <div class="sun-hero">
            <div class="text">
              <span class="bat-cap">${o.heroTitle}</span>
              <span class="sun-est"><span class="approx">≈</span> ${est ? `${formatKwh(est.value)} kWh` : NO_DATA}</span>
              <span class="bat-sub">${est ? o.between(formatKwh(est.low), formatKwh(est.high)) : ""}</span>
              ${est ? html`<span class="sun-conf"><span class="level" aria-hidden="true">${[1, 2, 3].map((k) => html`<i class=${k <= level ? "on" : ""}></i>`)}</span><b>${o.certainty[est.certainty]}</b>${this.hint("conf", t.hints.conf)}</span>` : nothing}
            </div>
            ${percent === undefined ? nothing : this.ring(percent / 100, 76, 8, String(percent), "%", t.ringLabel(formatPercent(percent)))}
          </div>
        </div>
        ${rows.length > 1
          ? html`<div class="bat-card rel">
              <div class="bat-card-bar"><span class="bat-cap">${o.fiveTitle}</span>${this.hint("five", t.hints.five(strongText))}</div>
              <div class="sun-five">
                <div class="sun-five-head"><span class="day"></span><span class="strip">${hoursRange.map((h) => html`<span>${h % 3 === 0 ? h : ""}</span>`)}</span><span class="end">kWh</span></div>
                ${rows.map((row) => {
                  const w = window(row.hours);
                  return html`<div class="sun-five-row">
                    <span class="day"><b>${row.i === 0 ? o.today : formatDayName(row.day)}</b><span>${row.condition ? t.weather[row.condition] : ""}</span></span>
                    <span class="strip" aria-hidden="true">${hoursRange.map((h) => {
                      const value = row.hours?.[h];
                      const strength = value === undefined ? "none" : value >= good ? "strong" : value >= good * 0.35 ? "mid" : value >= good * 0.075 ? "faint" : "none";
                      return html`<i class="${strength} ${row.i === 0 && h === nowHour ? "now" : ""}"></i>`;
                    })}</span>
                    <span class="end"><b>${row.kwh === undefined ? NO_DATA : `${row.i ? "≈ " : ""}${formatKwh(row.kwh)}`}</b><span class=${w ? "" : "off"}>${row.kwh === undefined ? "" : w ? o.window(w[0], w[1]) : o.below(strongText)}</span></span>
                  </div>`;
                })}
              </div>
              <div class="bat-legend wrap"><span><i class="swatch" style="background:var(--ed-sun)"></i>${o.strong(strongText)}</span><span><i class="swatch" style="background:var(--ed-sun);opacity:.38"></i>${o.weak}</span></div>
            </div>`
          : nothing}
        ${evening
          ? html`<div class="bat-card rel">
              <div class="bat-card-bar"><span class="bat-cap">${o.eveningTitle}</span>${this.hint("eve", t.hints.eve)}</div>
              <div class="bat-list">${evening.map((row) => html`<div class="bat-line sun-line"><span><i style="background:var(${row.color})"></i>${row.label}</span><b>${row.value}</b></div>`)}
              </div>
            </div>`
          : nothing}
        <div class="bat-kpis">
          <div class="bat-kpi"><span class="sub">${o.dayLength}</span><span class="val">${length === undefined ? NO_DATA : o.hoursMinutes(Math.floor(length / 60), length % 60)}</span><span class="sub">${change === undefined ? "" : o.dayChange(change)}</span></div>
          <div class="bat-kpi"><span class="sub">${o.bestDay}</span><span class="val">${best ? (best.i === 0 ? o.today : formatDayName(best.day)) : NO_DATA}</span><span class="sub">${best ? o.bestSub(formatKwh(best.kwh!), bestWindow ? o.window(bestWindow[0], bestWindow[1]) : "") : ""}</span></div>
        </div>`;
    }

    /** The rows of "Dnes do večera": the battery full, its level in the evening, the car from the sun, the grid at night; none without the data it needs. */
    evening(s: Settings, v: SunView): Array<{ color: string; label: string; value: string }> | undefined {
      const num = s.num.forecast;
      const model = s.entities;
      const soc = readNumber(this.hass, model.battery.state_of_charge);
      const house = this.sunHouseCurve();
      if (soc === undefined || !house.some((value) => value !== undefined) || !v.estimate) return undefined;
      const result = simulateEvening({
        now: v.now, soc, capacity: s.num.battery.capacity, reserve: this.batteryReserve(s), sun: v.hours, house,
        efficiency: num.efficiency / 100, eveningHour: num.evening_hour, morningHour: num.morning_hour,
        car: model.wallbox.power && carLink(readText(this.hass, model.wallbox.status)) !== "disconnected" ? { startSoc: num.car_start_soc, stopSoc: num.car_stop_soc, minSun: num.car_min_sun, watts: s.num.wallbox.power_min } : undefined,
      });
      const o = this.t.sun.outlook;
      const rows: Array<{ color: string; label: string; value: string }> = [];
      const evening = formatClock(v.today + num.evening_hour * HOUR);
      if (result.socAtEvening !== undefined) {
        rows.push({ color: "--ed-battery", label: o.batteryNow, value: formatPercent(Math.round(soc)) });
        rows.push({ color: "--ed-sun", label: o.sunUntil(evening), value: `≈ ${formatKwh(result.sunUntilEvening)} kWh` });
        rows.push({ color: "--ed-house", label: o.houseUntil(evening), value: `≈ ${formatKwh(result.houseUntilEvening)} kWh` });
      }
      if (result.fullAt !== undefined) rows.push({ color: "--ed-battery", label: o.full, value: `≈ ${formatClock(result.fullAt)}` });
      if (result.socAtEvening !== undefined) rows.push({ color: "--ed-battery", label: o.batteryAt(formatClock(v.today + num.evening_hour * HOUR)), value: `≈ ${formatPercent(Math.round(result.socAtEvening))}` });
      if (result.carTotal > 0) {
        rows.push({ color: "--ed-car", label: o.carSun, value: `≈ ${formatKwh(result.carSun)} kWh · ${formatNumber(result.carSun / num.car_kwh_per_km)} km` });
      }
      if (result.socAtMorning !== undefined) rows.push({ color: "--ed-battery", label: o.batteryAt(formatClock(addDays(v.today, 1) + num.morning_hour * HOUR)), value: `≈ ${formatPercent(Math.round(result.socAtMorning))}` });
      return rows;
    }
  };

export type Sunned = InstanceType<ReturnType<typeof withSun>>;
void DAY;
void blockOf;
