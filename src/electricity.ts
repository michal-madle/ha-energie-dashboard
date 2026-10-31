/* The Elektřina panel: alerts, the Sankey diagram, the popups of the tiles and of the heading. */
import { html, nothing, svg } from "lit";
import type { TemplateResult } from "lit";
import { SOURCES, isOn } from "./model";
import type { FlowModel, Sink, Source } from "./model";
import { bands, layout, order } from "./sankey";
import type { Layout } from "./sankey";
import type { Settings } from "./types";
import { formatKwh, formatNumber, formatPercent, formatPower, powerUnit, readEnergy, readNumber, readText } from "./utils";
import type { PowerUnit } from "./utils";
import { ICON } from "./icons";
import type { Sunned } from "./sun";
import { NO_DATA, SOURCE_VAR, TILE_VAR, clamp, mix, segments, tint } from "./view";
import type { Alert, Constructor, Level, PopInfo, Tile, TileKey } from "./view";

/** The strength of the colour of an active tile (percent of the source colour over black or white): the stronger the flow, the stronger the colour. */
const TINT_MIN = 42;
const TINT_RANGE = 10;

export const withElectricity = <T extends Constructor<Sunned>>(Base: T) =>
  class extends Base {
    onKey(event: KeyboardEvent): void {
      if (event.key === "Escape" && this._batDetail) {
        this.closeBatteryDetail(true);
      } else if (event.key === "Escape" && this._sunDetail) {
        this.closeSunDetail();
      } else if (event.key === "Escape" && (this._pop || this._all)) {
        this._pop = undefined;
        this._all = false;
      }
    }

    // ----------------------------------------------------------------- alerts

    /** Deviations only (CURRENT_SPEC.md, Upozornění): a battery on its reserve and a house on the grid are not alerts. */
    alerts(s: Settings, model: FlowModel): Alert[] {
      const t = this.t;
      const w = s.entities.wallbox;
      const result: Alert[] = [];
      const connected = model.carLink === "connected" || model.carLink === "charging";
      const blocked = readText(this.hass, w.block_charging) === "on";
      const priorityWaiting = readText(this.hass, w.prioritize_connected) === "on" && model.carLink === "connected" && (model.sun ?? 0) > s.num.wallbox.priority_min_sun;
      if (blocked) {
        result.push({ kind: "info", ...t.alerts.blocked });
      } else if (priorityWaiting) {
        result.push({ kind: "warn", ...t.alerts.priorityWaiting });
      }
      if (readText(this.hass, w.boost) === "on" && connected) {
        result.push({ kind: "warn", ...t.alerts.boostWallbox });
      }
      if (readText(this.hass, s.entities.boiler.boost) === "on") {
        result.push({ kind: "warn", ...t.alerts.boostBoiler });
      }
      return result;
    }

    renderAlerts(s: Settings, model: FlowModel): TemplateResult | typeof nothing {
      const items = this.alerts(s, model);
      if (!items.length) return nothing;
      return html`<section class="alerts" aria-labelledby="h-al">
        <h2 id="h-al" class="group-label">${this.t.alerts.heading}</h2>
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

    renderElectricity(s: Settings, model: FlowModel): TemplateResult {
      const color = model.summarySource ? `var(${SOURCE_VAR[model.summarySource]})` : undefined;
      return html`<section class="panel" aria-labelledby="h-el">
        <div class="head click" @click=${() => this.openAll()}>
          <h2 id="h-el">
            <button type="button" class="title-btn" aria-haspopup="dialog" aria-expanded=${this._all ? "true" : "false"} @click=${(event: Event) => { event.stopPropagation(); this.openAll(); }}>
              ${s.titles.electricity ?? this.t.titles.electricity}<svg viewBox="0 0 24 24" aria-hidden="true"><path d=${ICON.chevron}></path></svg>
            </button>
          </h2>
          ${this.stateLine(model.summary, color)}
        </div>
        ${this.renderFlow(s, model)} ${this._all ? this.renderDayPopup(s, model) : nothing}
        ${this._pop || this._all ? html`<button type="button" class="scrim" aria-label=${this.t.close} @click=${() => this.closePop()}></button>` : nothing}
      </section>`;
    }

    openAll(): void {
      this._all = !this._all;
      this._pop = undefined;
    }

    closePop(): void {
      this._pop = undefined;
      this._all = false;
    }

    /** The level of a tile (battery, car, boiler) as the fill of its background. */
    tiles(s: Settings, model: FlowModel, unit: PowerUnit): Tile[] {
      const t = this.t;
      const e = s.entities;
      const sc = s.num.scale;
      const idle = s.num.flows.idle_threshold;
      const link = model.carLink;
      const soc = model.soc;
      const low = soc !== undefined && soc <= this.batteryReserve(s);
      const batLevel = (active: boolean): Level | undefined =>
        soc === undefined ? undefined : { f: soc / 100, active, color: low ? "var(--ed-warning)" : "var(--ed-battery)", a1: low ? 0.5 : 0.58 };
      const batText = (discharging: boolean) =>
        `${t.tileSpoken.batteryState(discharging)}, ${soc === undefined ? t.noData : t.tileSpoken.chargeLevel(formatPercent(soc))}${low ? `, ${t.tileSpoken.atReserve}` : ""}`;
      const carConnected = link === "connected" || link === "charging" || isOn(model.car, idle);
      const gMin = s.num.water.gauge_min;
      const gMax = Math.max(s.num.water.gauge_max, readNumber(this.hass, e.boiler.target_temperature) ?? 0);
      const bT = model.boilTemp;
      const on = (watts: number | undefined) => isOn(watts, idle);
      const power = (watts: number | undefined) => (watts === undefined ? t.noData : formatPower(watts, unit));
      // The house tile has the colour of the largest source that feeds it; when it is fed by more, a thin bar
      // along its bottom edge shows the shares of the sources in the order of the diagram (CURRENT_SPEC.md, Dlaždice).
      const houseShare = model.loadShare.house;
      const parts = SOURCES.filter((source) => houseShare[source] >= 0.02);
      const houseBg = on(model.other) && parts.length ? this.houseBackground(parts, houseShare, clamp((model.other ?? 0) / sc.house, 0, 1)) : undefined;
      const tiles: Tile[] = [
        { side: "L", key: "sun", name: t.tile.sun, watts: model.sun, k: (model.sun ?? 0) / sc.sun, icon: ICON.sun, idleIcon: ICON.moon, idleText: t.idle.sun, aria: model.sun === undefined ? t.noData : "" },
        { side: "L", key: "bat", name: t.tile.bat, watts: model.batDis, k: (model.batDis ?? 0) / sc.battery, icon: ICON.battery, icon2: ICON.batteryDown, idleIcon: ICON.pause, idleText: t.idle.bat, level: batLevel(on(model.batDis)), aria: batText(true) },
        { side: "L", key: "grid", name: t.tile.grid, watts: model.imp, k: (model.imp ?? 0) / sc.grid, icon: ICON.grid, idleIcon: ICON.minus, idleText: t.idle.grid, aria: model.imp === undefined ? t.noData : on(model.imp) ? t.tileSpoken.gridImport : "" },
        { side: "R", key: "house", name: t.tile.house, watts: model.other, k: (model.other ?? 0) / sc.house, icon: ICON.home, idleIcon: ICON.minus, idleText: t.idle.house, background: houseBg, aria: model.other === undefined ? t.noData : t.tileSpoken.houseOther },
      ];
      if (this.carVisible(s, model)) {
        const level: Level | undefined = carConnected && model.carSoc !== undefined ? { f: model.carSoc / 100, active: on(model.car), color: "var(--ed-car)", a1: 0.5 } : undefined;
        tiles.push({
          side: "R", key: "car", name: t.tile.car, watts: link === undefined && model.car === undefined ? undefined : model.car ?? 0, k: (model.car ?? 0) / sc.car, icon: ICON.car,
          idleIcon: link === "disconnected" ? ICON.minus : ICON.plug, idleText: link === "disconnected" ? t.idle.carDisconnected : link === undefined ? t.idle.carNoState : t.idle.carConnected, level,
          aria: [link === undefined && model.car === undefined ? t.noData : on(model.car) ? t.tileSpoken.charging : "", carConnected && model.carSoc !== undefined ? t.tileSpoken.chargeLevel(formatPercent(model.carSoc)) : ""].filter(Boolean).join(", "),
        });
      }
      if (this.boilerVisible(s, model)) {
        const level: Level | undefined = bT === undefined ? undefined : { f: clamp((bT - gMin) / (gMax - gMin), 0, 1), active: on(model.boil), color: "var(--ed-boiler)", a1: 0.5 };
        tiles.push({
          side: "R", key: "boil", name: t.tile.boil, watts: model.boil, k: (model.boil ?? 0) / sc.boiler, icon: ICON.therm, idleIcon: ICON.pause, idleText: t.idle.boil, level,
          aria: [bT === undefined ? t.noData : t.tileSpoken.temperature(`${formatNumber(bT)} °C`), on(model.boil) ? t.tileSpoken.heating : ""].filter(Boolean).join(", "),
        });
      }
      tiles.push(
        { side: "R", key: "batIn", name: t.tile.batIn, watts: model.batIn, k: (model.batIn ?? 0) / sc.battery, icon: ICON.battery, icon2: ICON.batteryBolt, idleIcon: ICON.pause, idleText: t.idle.batIn, level: batLevel(on(model.batIn)), aria: batText(false) },
        { side: "R", key: "gridOut", name: t.tile.gridOut, watts: model.exp, k: (model.exp ?? 0) / sc.grid, icon: ICON.grid, idleIcon: ICON.minus, idleText: t.idle.gridOut, aria: model.exp === undefined ? t.noData : on(model.exp) ? t.tileSpoken.gridExport : "" },
      );
      return tiles;
    }

    renderFlow(s: Settings, model: FlowModel): TemplateResult {
      const idle = s.num.flows.idle_threshold;
      const unit: PowerUnit = powerUnit(
        [model.sun, model.batDis, model.batIn, model.imp, model.exp, model.other, model.car, model.boil].map((value) => (isOn(value, idle) ? value : undefined)),
        s.num.flows.kw_from,
      );
      const tiles = this.tiles(s, model, unit);
      // The tiles stand in the order in which the bands cross the least (CURRENT_SPEC.md, Toky energie).
      const arranged = order(model.flows, tiles.filter((tile) => tile.side === "R").map((tile) => tile.key as Sink));
      const lay = layout(this._width, arranged.sinks, arranged.sources);
      const band = bands(model.flows, lay, { maxPxPerKw: s.num.flows.band_max_px_per_kw, minPx: s.num.flows.band_min_px });
      const stops = (source: Source) =>
        svg`<linearGradient id="rg-${source}" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" style="stop-color:var(${SOURCE_VAR[source]});stop-opacity:0.2"></stop>
          <stop offset="0.14" style="stop-color:var(${SOURCE_VAR[source]});stop-opacity:0.88"></stop>
          <stop offset="0.86" style="stop-color:var(${SOURCE_VAR[source]});stop-opacity:0.88"></stop>
          <stop offset="1" style="stop-color:var(${SOURCE_VAR[source]});stop-opacity:0.2"></stop>
        </linearGradient>`;
      const popTile = this._pop ? tiles.find((tile) => tile.key === this._pop) : undefined;
      return html`<div class="flow" role="group" aria-label=${this.t.flowLabel} style="height:${lay.height}px">
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

    houseBackground(parts: Source[], share: Record<Source, number>, k: number): string {
      const main = parts.reduce((best, source) => (share[source] > share[best] ? source : best));
      const base = `linear-gradient(${tint(`var(${SOURCE_VAR[main]})`, Math.round(TINT_MIN + TINT_RANGE * k))}, ${tint(`var(${SOURCE_VAR[main]})`, Math.round(TINT_MIN + TINT_RANGE * k))}), var(--ed-tile)`;
      if (parts.length === 1) return base;
      const total = parts.reduce((sum, source) => sum + share[source], 0);
      let before = 0;
      const stops: string[] = [];
      parts.forEach((source, i) => {
        const from = (before / total) * 100;
        before += share[source];
        const to = (before / total) * 100;
        const color = `var(${SOURCE_VAR[source]})`;
        // A 2 px gap between the shares, like in the bars of the sources.
        const start = i === 0 ? `${from}%` : `calc(${from}% + 1px)`;
        const end = i === parts.length - 1 ? `${to}%` : `calc(${to}% - 1px)`;
        if (i > 0) stops.push(`transparent calc(${from}% - 1px) calc(${from}% + 1px)`);
        stops.push(`${color} ${start} ${end}`);
      });
      return `linear-gradient(90deg, ${stops.join(", ")}) bottom / 100% 4px no-repeat, ${base}`;
    }

    tileBackground(tile: Tile, on: boolean, k: number): string | undefined {
      const color = `var(${TILE_VAR[tile.key]})`;
      const level = tile.level;
      if (level) {
        const f = clamp(level.f, 0, 1);
        const at = `${(f * 100).toFixed(1)}%`;
        const filled = level.active ? tint(level.color, Math.round(level.a1 * 100)) : "var(--ed-fill-idle)";
        const rest = level.active ? mix(level.color, 14) : "var(--ed-tile)";
        if (f < 0.005) return level.active ? `linear-gradient(${rest}, ${rest}), var(--ed-tile)` : undefined;
        return `linear-gradient(90deg, ${filled} 0%, ${filled} ${at}, ${rest} ${at}, ${rest} 100%), var(--ed-tile)`;
      }
      if (tile.background) return tile.background;
      if (on) {
        const deep = tint(color, Math.round(TINT_MIN + TINT_RANGE * k));
        return `linear-gradient(${deep}, ${deep}), var(--ed-tile)`;
      }
      return undefined;
    }

    renderTile(tile: Tile, lay: Layout, unit: PowerUnit, s: Settings): TemplateResult {
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

    openTile(key: TileKey): void {
      this._all = false;
      this._pop = this._pop === key ? undefined : key;
    }

    renderTilePopup(tile: Tile, lay: Layout, s: Settings, model: FlowModel, unit: PowerUnit): TemplateResult {
      // The battery has a popup of its own with the gauge, the estimate and the trend (CURRENT_SPEC.md, Baterie).
      if (tile.key === "bat" || tile.key === "batIn") return this.renderBatteryPopup(tile, lay, s, model, unit);
      // The sun has one too, with the day so far and the detail (CURRENT_SPEC.md, Slunce).
      if (tile.key === "sun") return this.renderSunPopup(tile, lay, s, model, unit);
      const t = this.t;
      const idle = s.num.flows.idle_threshold;
      const day = this.today(s);
      const kwh = (value: number | undefined) => (value === undefined ? NO_DATA : `${formatKwh(value)} kWh`);
      const p = (watts: number | undefined) => (watts === undefined ? NO_DATA : formatPower(watts, unit));
      const on = (watts: number | undefined) => isOn(watts, idle);
      const soc = model.soc;
      const low = soc !== undefined && soc <= this.batteryReserve(s);
      // Each tile of the battery and of the grid opens only its own direction (uživatel 29. 10.).
      const battery = (out: boolean): PopInfo => ({
        title: out ? t.tile.bat : t.tile.batIn,
        now: out
          ? on(model.batDis) ? t.pop.discharging(p(model.batDis)) : model.batDis === undefined && soc === undefined ? NO_DATA : t.idle.bat
          : on(model.batIn) ? t.pop.charging(p(model.batIn)) : model.batIn === undefined && soc === undefined ? NO_DATA : t.idle.batIn,
        level: soc === undefined ? undefined : { label: t.pop.level, text: formatPercent(soc), percent: soc, color: low ? "var(--ed-warning)" : "var(--ed-battery)", note: low ? t.pop.atReserve : "" },
        rows: out ? [{ label: t.pop.rows.discharged, value: kwh(day.bdis) }] : [{ label: t.pop.rows.charged, value: kwh(day.bchg) }],
      });
      const gridInfo = (out: boolean): PopInfo => ({
        title: out ? t.tile.gridOut : t.tile.grid,
        now: out
          ? on(model.exp) ? t.pop.exporting(p(model.exp)) : model.exp === undefined ? NO_DATA : t.idle.gridOut
          : on(model.imp) ? t.pop.importing(p(model.imp)) : model.imp === undefined ? NO_DATA : t.idle.grid,
        rows: out ? [{ label: t.pop.rows.exported, value: kwh(day.gout) }] : [{ label: t.pop.rows.imported, value: kwh(day.gin) }],
      });
      const link = model.carLink;
      const bT = model.boilTemp;
      const gMin = s.num.water.gauge_min;
      const gMax = Math.max(s.num.water.gauge_max, readNumber(this.hass, s.entities.boiler.target_temperature) ?? 0);
      const info: Record<TileKey, PopInfo> = {
        sun: { title: t.tile.sun, now: on(model.sun) ? p(model.sun) : model.sun === undefined ? NO_DATA : t.idle.sun, rows: [{ label: t.pop.rows.produced, value: kwh(day.pv) }] },
        bat: battery(true),
        batIn: battery(false),
        grid: gridInfo(false),
        gridOut: gridInfo(true),
        house: { title: t.tile.house, now: on(model.other) ? p(model.other) : model.other === undefined ? NO_DATA : t.idle.house, rows: [{ label: t.pop.rows.consumed, value: kwh(day.house) }] },
        car: {
          title: t.tile.car, now: on(model.car) ? t.pop.charging(p(model.car)) : link === "connected" || link === "charging" ? t.pop.carConnectedIdle : link === "disconnected" ? t.idle.carDisconnected : NO_DATA,
          level: model.carSoc !== undefined && (link === "connected" || link === "charging") ? { label: t.pop.level, text: formatPercent(model.carSoc), percent: model.carSoc, color: "var(--ed-car)", note: "" } : undefined,
          rows: [{ label: t.pop.rows.carCharged, value: kwh(day.car) }],
        },
        boil: {
          title: t.tile.boil, now: on(model.boil) ? t.pop.heating(p(model.boil)) : model.boil === undefined ? NO_DATA : t.idle.boil,
          level: bT === undefined ? undefined : { label: t.pop.temperature, text: `${formatNumber(bT)} °C`, percent: clamp(((bT - gMin) / (gMax - gMin)) * 100, 0, 100), color: "var(--ed-boiler)", note: "" },
          rows: [{ label: t.pop.rows.boilerHeated, value: kwh(day.boil) }],
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
    renderDayPopup(s: Settings, model: FlowModel): TemplateResult {
      void model;
      const t = this.t;
      const day = this.today(s);
      const item = (value: number | undefined) => (value === undefined ? NO_DATA : formatKwh(value));
      const sources = [day.pv, day.bdis, day.gin];
      const srcTotal = sources.every((value) => value !== undefined) ? sources.reduce((sum, value) => sum! + value!, 0) : undefined;
      const useTotal = day.house === undefined ? undefined : day.house + day.car! + day.boil! + day.bchg! + day.gout!;
      const src = [
        { label: t.tile.sun, color: "var(--ed-sun)", value: day.pv },
        { label: t.pop.fromBattery, color: "var(--ed-battery)", value: day.bdis },
        { label: t.pop.fromGrid, color: "var(--ed-grid)", value: day.gin },
      ];
      const use = [
        { label: t.tile.house, color: "var(--ed-house)", value: day.house },
        { label: t.tile.car, color: "var(--ed-car)", value: day.car },
        { label: t.tile.boil, color: "var(--ed-boiler)", value: day.boil },
        { label: t.pop.toBattery, color: "var(--ed-battery)", value: day.bchg },
        { label: t.tile.gridOut, color: "var(--ed-grid)", value: day.gout },
      ];
      const column = (title: string, total: number | undefined, items: typeof src) => html`<div role="list" aria-label=${title} class="day-col">
        <div class="day-total"><span>${title}</span><b>${item(total)}</b></div>
        ${items.map((row) => html`<div role="listitem" class="day-item"><i style="background:${row.color}" aria-hidden="true"></i><span>${row.label}</span><b>${item(row.value)}</b></div>`)}
      </div>`;
      return html`<div class="pop day" role="dialog" aria-labelledby="day-h" tabindex="-1">
        <i class="arrow up" aria-hidden="true" style="left:30px"></i>
        <h3 id="day-h">${t.pop.day} <span>· kWh</span></h3>
        <div class="day-cols">${column(t.pop.sources, srcTotal, src)} ${column(t.pop.consumption, useTotal, use)}</div>
      </div>`;
    }
  };
