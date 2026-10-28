/* The Elektřina panel: alerts, the Sankey diagram, the popups of the tiles and of the heading. */
import { html, nothing, svg } from "lit";
import type { TemplateResult } from "lit";
import { SOURCES, isOn } from "./model";
import type { FlowModel, Sink, Source } from "./model";
import { bands, layout } from "./sankey";
import type { Layout } from "./sankey";
import type { Settings } from "./types";
import { formatKwh, formatNumber, formatPercent, formatPower, powerUnit, readEnergy, readNumber, readText } from "./utils";
import type { PowerUnit } from "./utils";
import { ICON } from "./icons";
import { CardBase } from "./base";
import { NO_DATA, SOURCE_VAR, TILE_VAR, clamp, mix, segments } from "./view";
import type { Alert, Constructor, Level, PopInfo, Tile, TileKey } from "./view";

export const withElectricity = <T extends Constructor<CardBase>>(Base: T) =>
  class extends Base {
    onKey(event: KeyboardEvent): void {
      if (event.key === "Escape" && (this._pop || this._all)) {
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
        `${t.tileSpoken.batteryState(discharging)}, ${soc === undefined ? t.noData : t.tileSpoken.chargeLevel(formatPercent(soc))}${low ? `, ${t.tileSpoken.belowReserve}` : ""}`;
      const carConnected = link === "connected" || link === "charging" || isOn(model.car, idle);
      const gMin = s.num.water.gauge_min;
      const gMax = Math.max(s.num.water.gauge_max, readNumber(this.hass, e.boiler.target_temperature) ?? 0);
      const bT = model.boilTemp;
      const on = (watts: number | undefined) => isOn(watts, idle);
      const power = (watts: number | undefined) => (watts === undefined ? t.noData : formatPower(watts, unit));
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

    tileBackground(tile: Tile, on: boolean, k: number): string | undefined {
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

    /** Energy of today in kWh from the counters of the configuration; undefined = no data. */
    today(s: Settings) {
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

    renderTilePopup(tile: Tile, lay: Layout, s: Settings, model: FlowModel, unit: PowerUnit): TemplateResult {
      const t = this.t;
      const idle = s.num.flows.idle_threshold;
      const day = this.today(s);
      const kwh = (value: number | undefined) => (value === undefined ? NO_DATA : `${formatKwh(value)} kWh`);
      const p = (watts: number | undefined) => (watts === undefined ? NO_DATA : formatPower(watts, unit));
      const on = (watts: number | undefined) => isOn(watts, idle);
      const soc = model.soc;
      const low = soc !== undefined && soc <= this.batteryReserve(s);
      const batNow = on(model.batDis) ? t.pop.discharging(p(model.batDis)) : on(model.batIn) ? t.pop.charging(p(model.batIn)) : soc === undefined ? NO_DATA : t.idle.bat;
      const battery: PopInfo = {
        title: t.tile.bat, now: batNow,
        level: soc === undefined ? undefined : { label: t.pop.level, text: formatPercent(soc), percent: soc, color: low ? "var(--ed-warning)" : "var(--ed-battery)", note: low ? t.pop.belowReserve : "" },
        rows: [{ label: t.pop.rows.discharged, value: kwh(day.bdis) }, { label: t.pop.rows.charged, value: kwh(day.bchg) }],
      };
      const gridInfo: PopInfo = {
        title: t.tile.grid, now: on(model.imp) ? t.pop.importing(p(model.imp)) : on(model.exp) ? t.pop.exporting(p(model.exp)) : model.imp === undefined && model.exp === undefined ? NO_DATA : t.pop.noFlow,
        rows: [{ label: t.pop.rows.imported, value: kwh(day.gin) }, { label: t.pop.rows.exported, value: kwh(day.gout) }],
      };
      const link = model.carLink;
      const bT = model.boilTemp;
      const gMin = s.num.water.gauge_min;
      const gMax = Math.max(s.num.water.gauge_max, readNumber(this.hass, s.entities.boiler.target_temperature) ?? 0);
      const info: Record<TileKey, PopInfo> = {
        sun: { title: t.tile.sun, now: on(model.sun) ? p(model.sun) : model.sun === undefined ? NO_DATA : t.idle.sun, rows: [{ label: t.pop.rows.produced, value: kwh(day.pv) }] },
        bat: battery,
        batIn: battery,
        grid: gridInfo,
        gridOut: gridInfo,
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
