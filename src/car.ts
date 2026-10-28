/* The car panel: the picture with its link, the charge level, the sources, the mode and the wallbox. */
import { html, nothing, svg } from "lit";
import type { TemplateResult } from "lit";
import { SOURCES, isOn, sourceText } from "./model";
import type { FlowModel, Source } from "./model";
import type { Settings } from "./types";
import { ago, entityState, formatNumber, formatPercent, formatPower, powerUnit, readNumber, readText } from "./utils";
import type { PowerUnit } from "./utils";
import { HoldOrDoubleTap } from "ha-dashboard-kit/gesture";
import { ICON } from "./icons";
import type { Controlled } from "./controls";
import { NO_DATA, SOURCE_VAR, attribute, clamp, mix, percentages } from "./view";
import type { Constructor } from "./view";

export const withCar = <T extends Constructor<Controlled>>(Base: T) =>
  class extends Base {
    disconnectedCallback(): void {
      super.disconnectedCallback();
      this._carGesture.dispose();
    }

    // ---- the car picture: double tap or long press opens the car dashboard (car.link)
    readonly _carGesture = new HoldOrDoubleTap(() => ({
      holdMs: this._config?.num.ui.hold_ms ?? 550,
      doubleTapMs: this._config?.num.ui.double_tap_ms ?? 400,
    }));

    carDown = (): void => {
      this._carGesture.start(() => this.openCarLink());
    };

    carRelease = (): void => {
      this._carGesture.release();
    };

    carCancel = (): void => {
      this._carGesture.cancel();
    };

    carClick = (event: MouseEvent): void => {
      const s = this._config;
      if (!s) return;
      // The keyboard (click without a pointer, detail 0) opens at once, like the other protected controls.
      if (event.detail === 0) {
        this._carGesture.cancel();
        this.openCarLink();
        return;
      }
      const tap = this._carGesture.tap("car", event.timeStamp);
      if (tap === "double") {
        this.openCarLink();
      } else if (tap === "single") {
        this._carHint = true;
        window.clearTimeout(this._timers.get("carhint"));
        this._timers.set("carhint", window.setTimeout(() => (this._carHint = false), s.num.ui.hint_seconds * 1000));
      }
    };

    openCarLink(): void {
      const link = this._config?.carLink;
      if (!link) return;
      this._carHint = false;
      if (link.startsWith("/")) {
        // The Home Assistant frontend listens for this event and changes its view without a reload.
        window.history.pushState(null, "", link);
        window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
      } else {
        window.open(link, "_blank", "noopener");
      }
    }

    renderCar(s: Settings, model: FlowModel): TemplateResult {
      const t = this.t;
      const e = s.entities;
      const flows = s.num.flows;
      const limit = s.num.car.charge_limit;
      const link = model.carLink;
      const charging = isOn(model.car, flows.idle_threshold) && link !== "disconnected";
      const src = sourceText(model.share, flows, t);
      const srcColor = this.sourceColor(src);
      const blocked = readText(this.hass, e.wallbox.block_charging) === "on";
      const boost = this.shown(e.wallbox.boost);
      const priorityWaiting = readText(this.hass, e.wallbox.prioritize_connected) === "on" && link === "connected" && !blocked && (model.sun ?? 0) > s.num.wallbox.priority_min_sun;

      let stateText: string | undefined;
      let stateColor: string | undefined;
      if (charging) {
        stateText = `${t.car.charging(src.text)}${boost === "on" ? ` · ${t.boostOptions.on}` : ""}`;
        stateColor = srcColor;
      } else if (link === "connected" || link === "charging") {
        stateText = t.car.connectedIdle;
        stateColor = priorityWaiting ? "var(--ed-warning)" : undefined;
      } else if (link === "disconnected") {
        stateText = t.car.disconnected;
      }
      const glow = mix(stateColor ?? "#d8d8dc", stateColor ? 42 : 28);
      const picture = entityState(this.hass, e.car.image)?.attributes?.entity_picture;
      const soc = model.carSoc;
      const unit = powerUnit([isOn(model.car, flows.idle_threshold) ? model.car : undefined], flows.kw_from);
      const hasLimit = limit < 100;
      const meterLabel = t.car.chargeLevel(soc === undefined ? t.noData : formatPercent(soc), hasLimit ? formatPercent(limit) : undefined);
      const w = e.wallbox;
      const mode = boost === "on" ? "on" : boost === "off" ? "off" : "";
      const modeOptions = this.boostOptions;
      const modeSub = boost === "on" ? t.car.modeBoost : boost === "off" ? t.car.modeSurplus : NO_DATA;

      return html`<section class="panel car-panel" aria-labelledby="h-car">
        <div class="car-top" style="height:${Math.round(168 + 40 * Math.max(0, s.num.car.image_scale - 1))}px">
          <div class="car-art" aria-hidden="true" style="transform:scale(${s.num.car.image_scale})">
            <div class="glow" style="background:radial-gradient(closest-side, ${glow}, transparent)"></div><div class="shadow"></div>
            ${typeof picture === "string" && picture ? html`<img src=${picture} alt="" />` : nothing}
          </div>
          ${s.carLink
            ? html`<div class="car-art car-hitbox" style="transform:scale(${s.num.car.image_scale})">
                <button type="button" class="car-hit" aria-label=${t.car.openDashboard} @pointerdown=${this.carDown} @pointerup=${this.carRelease} @pointercancel=${this.carCancel} @pointerleave=${this.carRelease} @contextmenu=${(event: Event) => event.preventDefault()} @click=${this.carClick}></button>
              </div>
              ${this._carHint ? html`<div class="car-hint" aria-hidden="true">${t.hint.holdOrDouble}</div>` : nothing}`
            : nothing}
          <div class="head"><h2 id="h-car">${s.titles.car ?? t.titles.car}</h2>${this.stateLine(stateText, stateColor)}</div>
          <div class="car-soc">
            <span class="soc">${soc === undefined ? NO_DATA : formatNumber(soc)}<small>${this._i18n.percent("")}</small>${soc === undefined ? html`<span class="sr-only">${t.noData}</span>` : nothing}</span>
            <span class="range">${t.car.range} <b>${model.carRange === undefined ? NO_DATA : `${formatNumber(model.carRange)} km`}</b></span>
          </div>
        </div>
        <div class="meter-wrap">
          <div class="meter" role="img" aria-label=${meterLabel}>
            <div class="fill" style="width:${clamp(soc ?? 0, 0, 100)}%"></div>
            <div class="ticks"></div>
            ${hasLimit ? html`<div class="limit" style="left:${limit}%"></div>` : nothing}
          </div>
          ${hasLimit ? html`<div class="meter-label" aria-hidden="true"><span style="left:${limit}%">${t.car.limit(formatPercent(limit))}</span></div>` : nothing}
        </div>
        ${charging ? this.renderCarSources(model, flows, formatPower(model.car ?? 0, unit)) : nothing}
        ${w.boost
          ? html`<div class="mode">
              <div class="mode-head"><span id="mode-l">${t.car.mode}</span><span class="mode-sub ${boost === "on" ? "warn" : ""}">${modeSub}</span></div>
              <ed-segmented
                guarded .options=${modeOptions} .value=${mode} label=${t.car.modeLabel} .hint=${t.hint.holdDragOrDouble} ?disabled=${boost === undefined}
                .holdMs=${s.num.ui.hold_ms} .doubleTapMs=${s.num.ui.double_tap_ms} .hintSeconds=${s.num.ui.hint_seconds}
                @hdk-select=${(event: CustomEvent<{ value: string }>) => this.setBoost("wallbox", event.detail.value === "on")}
              ></ed-segmented>
              ${this.renderPowerFold(s, boost === "on")}
            </div>`
          : nothing}
        ${this.carVisible(s, model) ? this.renderWallboxGroup(s, model, charging, srcColor, unit) : nothing}
      </section>`;
    }

    renderCarSources(model: FlowModel, flows: Settings["num"]["flows"], total: string): TemplateResult {
      const t = this.t;
      const names: Record<Source, string> = t.source;
      const parts = SOURCES.filter((source) => model.share[source] > 0.004);
      const pct = percentages(parts.map((source) => model.share[source]));
      // The grid beyond its share is a deviation: drawn in the warning colour, like in the texts.
      const colorOf = (source: Source) => (source === "grid" && model.share.grid > flows.grid_deviation_share / 100 ? "var(--ed-warning)" : `var(${SOURCE_VAR[source]})`);
      return html`<div class="mix">
        <div class="mix-head"><span>${t.car.sourcesTitle}</span><span>${total}</span></div>
        <div class="mix-bar" aria-hidden="true">${parts.map((source) => html`<div style="flex:${model.share[source]} 1 0;background:${colorOf(source)}"></div>`)}</div>
        <p class="mix-legend" role="group" aria-label=${t.car.sourcesLabel}>
          ${parts.map((source, i) => html`<span><i style="background:${colorOf(source)}"></i>${names[source]}<em>${formatPercent(pct[i])}</em></span>`)}
        </p>
      </div>`;
    }

    /** Charging power in boost: the card shows the total of all phases, the entity holds the power of one phase. */
    renderPowerFold(s: Settings, open: boolean): TemplateResult | typeof nothing {
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
          <span class="field-label">${this.t.car.power}</span><span class="field-value">${total === undefined ? NO_DATA : formatNumber(total, 1)}<small> kW</small></span>
          <ed-slider
            .min=${min} .max=${max} .step=${power_step / 1000} .value=${total ?? min}
            label=${this.t.car.powerLabel} valueText=${total === undefined ? this.t.noData : `${formatNumber(total, 1)} kW`}
            minLabel="${formatNumber(min, 1)} kW" maxLabel="${formatNumber(max, 1)} kW"
            ?disabled=${total === undefined}
            @hdk-change=${(event: CustomEvent<{ value: number }>) => this.setNumber(id, Math.round((event.detail.value * 1000) / phases), this.t.car.power)}
          ></ed-slider>
        </div>
      </div></div>`;
    }

    renderWallboxGroup(s: Settings, model: FlowModel, charging: boolean, srcColor: string, unit: PowerUnit): TemplateResult {
      const t = this.t;
      const w = s.entities.wallbox;
      const open = !!this._open.wallbox;
      const hasDetail = !!(w.block_charging || w.prioritize_connected);
      const link = model.carLink;
      const sub =
        charging
          ? html`<span>${t.wallbox.charging} </span><b style="--c:${srcColor}">${formatPower(model.car ?? 0, unit)}</b>`
          : link === "connected" || link === "charging"
            ? html`${t.wallbox.idle}`
            : link === "disconnected"
              ? html`${t.wallbox.disconnected}`
              : html`${NO_DATA}`;
      const socId = s.entities.car.state_of_charge;
      // The age of the reading; nothing for a car that reports no value.
      const age = readNumber(this.hass, socId) === undefined ? undefined : ago(entityState(this.hass, socId)?.last_updated, this._now, t);
      const block = this.shown(w.block_charging);
      const prio = this.shown(w.prioritize_connected);
      return html`<ul class="group">
        <li class=${open ? "open" : ""}>
          <button type="button" class="row row-btn" aria-expanded=${open ? "true" : "false"} ?disabled=${!hasDetail} @click=${() => this.toggle("wallbox")}>
            <span class="badge" aria-hidden="true" style=${charging ? `--bc:${srcColor}` : ""}><svg viewBox="0 0 24 24"><path d=${ICON.wallbox}></path></svg></span>
            <span class="row-text"><span class="row-title">${t.wallbox.title}</span><span class="row-sub">${sub}</span></span>
            <span class="row-aside">${age ? t.wallbox.fromCar(age) : ""}</span>
            ${hasDetail ? html`<svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d=${ICON.expand}></path></svg>` : html`<span></span>`}
          </button>
          ${hasDetail
            ? html`<div class="fold ${open ? "open" : ""}" ?inert=${!open}><div>
                ${w.block_charging ? this.switchRow(t.wallbox.block, w.block_charging, block === "on" ? t.wallbox.blockOn : t.wallbox.blockOff, block === "on") : nothing}
                ${w.prioritize_connected ? this.switchRow(t.wallbox.priority, w.prioritize_connected, prio === "on" ? t.wallbox.priorityOn : t.wallbox.priorityOff, false) : nothing}
              </div></div>`
            : nothing}
        </li>
      </ul>`;
    }
  };
